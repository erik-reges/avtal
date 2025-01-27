import Elysia, { t } from "elysia";
import { auth } from "../plugins/auth";
import { db } from "../plugins/db";
import OpenAI from "openai";
import PDFDocument from "pdfkit";
import { systemPromptShort } from "../lib/prompt";
import compression from "elysia-compress";

const PDF_CONFIG = {
  margins: { top: 72, bottom: 72, left: 72, right: 72 },
  styles: {
    title: { font: "Times-Roman", size: 20 },
    sectionHeader: { font: "Times-Bold", size: 14 },
    subsectionHeader: { font: "Times-Bold", size: 12 },
    body: { font: "Times-Roman", size: 10 },
    signature: { font: "Times-Italic", size: 12 },
  },
};

const OPENAI_CONFIG = {
  baseURL: "https://api.deepseek.com",
  model: "deepseek-chat",
  temperature: 0.3,
};

// Locked enums
const industryEnum = t.Union([
  t.Literal("IT"),
  t.Literal("restaurang"),
  t.Literal("bygg"),
  t.Literal("handel"),
  t.Literal("sjukvård"),
  t.Literal("utbildning"),
  t.Literal("transport"),
]);

const employmentTypeEnum = t.Union([
  t.Literal("provanställning"),
  t.Literal("tillsvidare"),
  t.Literal("visstid"),
  t.Literal("praktik"),
]);

const benefitsEnum = t.Union([
  t.Literal("friskvårdsbidrag"),
  t.Literal("tjänstebil"),
  t.Literal("bonus"),
  t.Literal("flexibel arbetstid"),
  t.Literal("hemarbete"),
  t.Literal("pension"),
]);

// Enhanced agreement schema with transforms
const agreementSchema = t.Object({
  companyName: t.String({ minLength: 2 }),
  orgNumber: t.String({
    pattern: "^\\d{6}-\\d{4}$", // Changed from 8 to 6 digits
    transform: ({ value }: { value: string }) => {
      if (!validateOrgNumber(value)) {
        throw new Error("invalid organization number");
      }
      return value;
    },
  }),
  personalNumber: t.String({
    pattern: "^(19|20)?\\d{6}-?\\d{4}$",
    transform: ({ value }: { value: string }) => {
      if (!validatePersonalNumber(value)) {
        throw new Error("Ogiltigt personnummer");
      }
      return value.replace("-", "");
    },
  }),
  employeeName: t.String({ minLength: 2 }),
  role: t.String({ minLength: 2 }),
  salary: t.Number({ minimum: 25000 }),
  industry: industryEnum,
  employmentType: employmentTypeEnum,
  hoursPerWeek: t.Number({ minimum: 10, maximum: 40 }),
  startDate: t.String({
    format: "date-time",
    transform: ({ value }: { value: any }) => new Date(value),
  }),
  workLocation: t.String({ minLength: 2 }),
  terminationNotice: t.String({ minLength: 2 }),
  vacationDays: t.Number({ minimum: 25, maximum: 35 }),
  collectiveAgreement: t.Optional(t.String()),
  customClauses: t.Optional(t.String({ maxLength: 1000 })),
  benefits: t.Optional(t.Array(benefitsEnum)),
});

const openai = new OpenAI({
  baseURL: OPENAI_CONFIG.baseURL,
  apiKey: process.env.DEEPSEEK_API_KEY || "",
});
const generatePDF = (text: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margins: PDF_CONFIG.margins,
      bufferPages: true,
    });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Add title
    doc
      .font(PDF_CONFIG.styles.title.font)
      .fontSize(PDF_CONFIG.styles.title.size)
      .text("ANSTÄLLNINGSAVTAL", { align: "center", underline: true })
      .moveDown(2);

    // Process content
    text.split("\n").forEach((line) => {
      if (doc.y > doc.page.height - 100) doc.addPage();

      const isSection = /^\d+\.\s/.test(line);
      const isSubsection = /^\d+\.\d+\s/.test(line);

      if (isSection) {
        doc
          .font(PDF_CONFIG.styles.sectionHeader.font)
          .fontSize(PDF_CONFIG.styles.sectionHeader.size)
          .text(line, { underline: true })
          .moveDown(0.5);
      } else if (isSubsection) {
        doc
          .font(PDF_CONFIG.styles.subsectionHeader.font)
          .fontSize(PDF_CONFIG.styles.subsectionHeader.size)
          .text(line, { indent: 15 })
          .moveDown(0.5);
      } else {
        doc
          .font(PDF_CONFIG.styles.body.font)
          .fontSize(PDF_CONFIG.styles.body.size)
          .text(line, { align: "justify", indent: 20 })
          .moveDown(0.5);
      }
    });

    // Add signatures
    if (doc.y > doc.page.height - 150) doc.addPage();
    doc
      .font(PDF_CONFIG.styles.signature.font)
      .fontSize(PDF_CONFIG.styles.signature.size)
      .text("_________________________", 72, doc.y + 20)
      .text("Arbetsgivare", 72, doc.y)
      .moveDown(2)
      .text("_________________________", 72, doc.y)
      .text("Arbetstagare", 72, doc.y);

    // Add page numbers
    const { start: firstPage, count: totalPages } = doc.bufferedPageRange();
    for (let i = firstPage; i < firstPage + totalPages; i++) {
      doc.switchToPage(i);
      doc
        .fontSize(8)
        .text(
          `Sida ${i + 1} av ${totalPages}`,
          doc.page.width - 100,
          doc.page.height - 30,
        );
    }

    doc.end();
  });
};

const industrySpecificClauses: Record<string, string> = {
  IT: "12.4 Arbetstagaren åtar sig att följa bolagets datasäkerhetspolicy",
  sjukvård: "12.4 Sekretess enligt patientdatalagen (2008:355)",
  restaurang: "12.4 Hygienbestämmelser enligt livsmedelslagen",
  bygg: "12.4 Säkerhetsbestämmelser enligt arbetsmiljölagen",
  handel: "12.4 Kunddataskydd enligt GDPR",
  utbildning: "12.4 Sekretess enligt skollagen",
  transport: "12.4 Säkerhetsbestämmelser enligt transportlagen",
};

export const generateRouter = new Elysia({ prefix: "/generate" }).use(db).post(
  "/agreement",
  async ({ body, set }) => {
    try {
      if (!process.env.DEEPSEEK_API_KEY) {
        set.status = 500;
        return { error: "Server configuration error" };
      }

      const startDate = new Date(body.startDate);
      if (startDate <= new Date()) {
        set.status = 400;
        return { error: "Startdatum måste vara i framtiden" };
      }

      const contractData = {
        companyName: body.companyName as string,
        orgNumber: body.orgNumber as string,
        employeeName: body.employeeName as string,
        personalNumber: body.personalNumber as string,
        startDate: startDate.toISOString().split("T")[0],
        role: body.role as string,
        salary: `${(body.salary as number).toFixed(2)} SEK`,
        workLocation: body.workLocation as string,
        vacationDays: (body.vacationDays as number).toString(),
        industryClause:
          industrySpecificClauses[body.industry as string] ||
          "12.4 Allmänna sekretessbestämmelser gäller",
        benefits:
          (body.benefits as string[] | undefined)?.join(", ") ||
          "Inga specifika förmåner",
        collectiveAgreement: body.collectiveAgreement as string | undefined,
        customClauses: body.customClauses as string | undefined,
      };

      const completion = await openai.chat.completions.create({
        model: OPENAI_CONFIG.model,
        temperature: OPENAI_CONFIG.temperature,
        messages: [
          { role: "system", content: systemPromptShort },
          { role: "user", content: JSON.stringify(contractData) },
        ],
        response_format: { type: "text" },
      });

      const agreementText = completion.choices[0].message.content;
      if (!agreementText) {
        throw new Error("Failed to generate agreement text");
      }

      const pdfBuffer = await generatePDF(agreementText);

      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(pdfBuffer);
            controller.close();
          },
        }),
        {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="avtal-${body.employeeName.replace(/ /g, "_")}.pdf"`,
          },
        },
      );
    } catch (error) {
      console.error("Generation error:", error);
      set.status = 500;
      return {
        error: "Kunde inte generera avtal. Vänligen kontrollera uppgifterna.",
      };
    }
  },
  {
    body: agreementSchema,
    error({ error }) {
      const message = error instanceof Error ? error.message : String(error);
      return { error: `Valideringsfel: ${message}` };
    },
  },
);

const validateOrgNumber = (orgNumber: string) => {
  const regex = /^\d{8}-\d{4}$/;
  if (!regex.test(orgNumber)) {
    throw new Error("Ogiltigt organisationsnummer");
  }
  return orgNumber;
};

const validatePersonalNumber = (pn: string): boolean =>
  /^(19|20)?\d{6}-?\d{4}$/.test(pn) && luhnAlgorithmCheck(pn.replace("-", ""));

const luhnAlgorithmCheck = (num: string): boolean => {
  const digits = num.split("").reverse().map(Number);
  const sum = digits.reduce((acc, d, i) => {
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    return acc + d;
  }, 0);
  return sum % 10 === 0;
};
