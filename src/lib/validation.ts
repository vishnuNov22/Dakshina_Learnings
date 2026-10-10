import { z } from "zod";

export const PREPARATION_STAGES = [
  "Just starting",
  "Studying the basics (NCERT stage)",
  "Preparing for Prelims",
  "Preparing for Mains",
  "Repeat attempt",
  "Working professional",
] as const;

export const CONTACT_METHODS = ["Phone call", "WhatsApp", "Email"] as const;

export const PROGRAMME_OPTIONS = [
  "UPSC CSE Comprehensive",
  "Prelims Hacker Program",
  "Current Affairs & News Desk",
  "Mains Answer Writing",
  "Test Series",
  "Mentorship",
  "Library & Reading Room",
  "Not sure yet",
] as const;

const currentYear = new Date().getFullYear();

const indianMobile = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s\-()]/g, ""))
  .refine((v) => /^(\+?91)?[6-9]\d{9}$/.test(v), {
    message: "Enter a valid 10-digit Indian mobile number",
  })
  .transform((v) => v.replace(/^\+?91/, ""));

export const enquirySchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name")
      .max(120, "Name is too long")
      .regex(/^[\p{L}\p{M} .'-]+$/u, "Use letters only"),
    mobile: indianMobile,
    email: z
      .string()
      .trim()
      .max(160)
      .email("Enter a valid email address")
      .optional()
      .or(z.literal("").transform(() => undefined)),
    city: z.string().trim().min(2, "Please enter your city").max(80),
    targetYear: z.coerce
      .number({ invalid_type_error: "Choose a target year" })
      .int()
      .min(currentYear, "Choose a current or future year")
      .max(currentYear + 6, "Choose a year within the next six years"),
    preparationStage: z.enum(PREPARATION_STAGES, { errorMap: () => ({ message: "Choose your preparation stage" }) }),
    programme: z.enum(PROGRAMME_OPTIONS, { errorMap: () => ({ message: "Choose a programme" }) }),
    contactMethod: z.enum(CONTACT_METHODS, { errorMap: () => ({ message: "Choose how we should contact you" }) }),
    message: z.string().trim().max(2000, "Please keep it under 2000 characters").optional().or(z.literal("")),
    consent: z.literal(true, { errorMap: () => ({ message: "Please agree before sending your details" }) }),
  })
  .superRefine((v, ctx) => {
    if (v.contactMethod === "Email" && !v.email) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: "Add an email address to be contacted by email" });
    }
  });

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;

export function targetYearOptions(): number[] {
  return Array.from({ length: 5 }, (_, i) => currentYear + i);
}

/** Flatten zod errors into a { field: message } map for inline display. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

