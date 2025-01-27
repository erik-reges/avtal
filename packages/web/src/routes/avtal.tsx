import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loader2Icon,
  Building2Icon,
  UserIcon,
  FileTextIcon,
  InfoIcon,
  CheckSquareIcon,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MultiSelect } from "@/components/ui/multi-select";

// Schema validering med Zod
const formSchema = z.object({
  companyName: z.string().min(2, "Företagsnamn måste vara minst 2 tecken"),
  orgNumber: z.string().length(10, "Ogiltigt organisationsnummer"),
  personalNumber: z
    .string()
    .regex(/^\d{8}-\d{4}$/, "Ogiltigt personnummer (ååååmmdd-xxxx)"),
  employeeName: z.string().min(2, "Ange fullständigt namn"),
  role: z.string().min(2, "Ange roll/titel"),
  salary: z.number().min(25000, "Lön måste vara minst 25 000 kr"),
  industry: z.enum([
    "IT",
    "restaurang",
    "bygg",
    "handel",
    "sjukvård",
    "utbildning",
    "transport",
  ]),
  employmentType: z.enum([
    "provanställning",
    "tillsvidare",
    "visstid",
    "praktik",
  ]),
  hoursPerWeek: z.number().min(10).max(40),
  startDate: z
    .date()
    .refine((date) => date > new Date(), "Datumet måste vara i framtiden"),
  workLocation: z.string().min(2, "Ange arbetsplats"),
  terminationNotice: z.string().min(2, "Ange uppsägningstid"),
  vacationDays: z.number().min(25, "Minst 25 semesterdagar krävs").max(35),
  collectiveAgreement: z.string().optional(),
  customClauses: z.string().max(1000, "Max 1000 tecken").optional(),
  benefits: z
    .array(
      z.enum([
        "friskvårdsbidrag",
        "tjänstebil",
        "bonus",
        "flexibel arbetstid",
        "hemarbete",
        "pension",
      ]),
    )
    .optional(),
});

const benefitOptions = [
  { value: "friskvårdsbidrag", label: "Friskvårdsbidrag" },
  { value: "tjänstebil", label: "Tjänstebil" },
  { value: "bonus", label: "Bonusordning" },
  { value: "flexibel arbetstid", label: "Flexibel arbetstid" },
  { value: "hemarbete", label: "Möjlighet till hemarbete" },
  { value: "pension", label: "Pensionsavsättning" },
];

export const Route = createFileRoute("/avtal")({
  component: AvtalComponent,
});

function AvtalComponent() {
  const { api } = Route.useRouteContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "IT",
      employmentType: "tillsvidare",
      hoursPerWeek: 40,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("test");
      const { data, error } = await api.generate.agreement.post({
        ...values,
        startDate: values.startDate.toISOString(),
      });

      if (error) {
        throw new Error(error.value?.message || "failed to generate pdf");
      }

      if (!data || !(data instanceof Response)) {
        throw new Error("invalid response");
      }

      const pdfBlob = await data.blob();
      const url = window.URL.createObjectURL(pdfBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `avtal-${values.employeeName.replace(" ", "-")}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("generation failed:", error);
    }
  }

  return (
    <div className="">
      <div className="max-w-3xl mx-auto p-4 pt-0 space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Skapa ditt anställningsavtal
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Generera ett professionellt anställningsavtal anpassat efter dina
            behov.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Företags- och Anställd information - Uppdaterad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Företagsinformation - Uppdaterad med nya fält */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                  <Building2Icon className="h-4 w-4" /> Företagsinformation
                </h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Företagsnamn</FormLabel>
                        <FormControl>
                          <Input placeholder="ACME AB" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="orgNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Organisationsnummer
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="5561234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="workLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Arbetsplats</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Adress, kontor, distans..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Anställd information - Uppdaterad med nya fält */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                  <UserIcon className="h-4 w-4" /> Anställd information
                </h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="employeeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Namn på den anställde
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Anna Andersson" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personalNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Personnummer</FormLabel>
                        <FormControl>
                          <Input placeholder="ååååmmdd-xxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Roll/Titel</FormLabel>
                        <FormControl>
                          <Input placeholder="Utvecklare" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Avtalsdetaljer - Uppdaterad med nya fält */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                <FileTextIcon className="h-4 w-4" /> Avtalsvillkor
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Månadslön</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ange bruttobelopp"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vacationDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Semesterdagar/år
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="25"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-sm">Startdatum</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className="pl-3 text-left font-normal"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Välj ett datum</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="terminationNotice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Uppsägningstid
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="ex. 3 månader" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="collectiveAgreement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Kollektivavtal (valfri)
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="ex. Unionen, Almega" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Ny sektion för tillval */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                <CheckSquareIcon className="h-4 w-4" /> Tillval & Förmåner
              </h2>

              <FormField
                control={form.control}
                name="benefits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm flex items-center gap-2">
                      Välj förmåner
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 opacity-70" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px]">
                          Välj de förmåner som ska ingå i avtalet
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={benefitOptions}
                        onValueChange={field.onChange}
                        defaultValue={field.value || []}
                        placeholder="Välj förmåner"
                        variant="inverted"
                        animation={2}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Ny sektion för anpassade klausuler */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                <FileTextIcon className="h-4 w-4" /> Anpassade Klausuler
              </h2>

              <FormField
                control={form.control}
                name="customClauses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Egna tillägg</FormLabel>
                    <FormDescription className="mb-2">
                      Lägg till egna klausuler eller specialvillkor (max 1000
                      tecken)
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="ex. Specifika sekretessavtal, konkurrensklausuler eller andra specialvillkor..."
                        className="h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-200"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center">
                  <Loader2Icon className="animate-spin mr-2" />
                  Genererar avtal...
                </span>
              ) : (
                "Generera avtal nu →"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
