import Elysia, { t } from "elysia";
import { auth } from "../plugins/auth";
import { db } from "../plugins/db";
import OpenAI from "openai";
import PDFDocument from "pdfkit";
import { systemPrompt } from "../lib/prompt";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY!,
});

// Locked enums matching frontend
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

// Schema with proper transforms and validation
const agreementSchema = t.Object({
  companyName: t.String({ minLength: 2 }),
  orgNumber: t.String({ length: 10 }),
  personalNumber: t.String({ pattern: "^\\d{8}-\\d{4}$" }),
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

const validateFutureDate = (date: Date) => date > new Date();

export const generateRouter = new Elysia({ prefix: "/generate" })
  .use(auth)
  .use(db)
  .post(
    "/agreement",
    async ({ body, user, set }) => {
      try {
        // Date handling with proper parsing
        const startDate = new Date(body.startDate);
        if (!validateFutureDate(startDate)) {
          set.status = 400;
          return { error: "startdate gotta be future fam" };
        }

        // GPT-4 turbo with structured input
        const completion = await openai.chat.completions.create({
          model: "gpt-4-turbo-preview",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: JSON.stringify({
                ...body,
                startDate: startDate.toISOString().split("T")[0],
              }),
            },
          ],
          temperature: 0.1,
          response_format: { type: "text" },
        });

        const agreementText = completion.choices[0].message.content;

        // PDF generation that slaps
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on("data", (chunk) => buffers.push(chunk));
        doc.text(agreementText || "error generating text", {
          align: "left",
          lineGap: 5,
        });
        doc.end();

        // Stream that PDF like a boss
        return new Response(
          new ReadableStream({
            async start(controller) {
              while (buffers.length === 0)
                await new Promise((resolve) => setTimeout(resolve, 10));

              for (const buffer of buffers) controller.enqueue(buffer);
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
      } catch (e) {
        console.error("big oof:", e);
        set.status = 500;
        return { error: "server meltdown - try again maybe?" };
      }
    },
    {
      body: agreementSchema,
      error({ code, error }) {
        return { error: `invalid data: ${error}` };
      },
    },
  );
