"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import clsx from "clsx";
import { Check, Copy, Instagram, MessageCircle, Phone } from "lucide-react";
import {
  CONTACT_METHODS,
  PREPARATION_STAGES,
  PROGRAMME_OPTIONS,
  enquirySchema,
  fieldErrors,
  targetYearOptions,
} from "@/lib/validation";
import { enquiryMessage, instagram, whatsappLink } from "@/lib/contact";

type Errors = Record<string, string>;

const input =
  "w-full min-w-0 rounded-xl border bg-white/80 px-4 py-3.5 text-[1rem] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/35 focus:border-blue focus:ring-4 focus:ring-blue/15";

function Field({ id, label, error, hint, optional, children }: { id: string; label: string; error?: string; hint?: string; optional?: boolean; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
        {label}
        {optional ? <span className="font-mono text-[0.65rem] font-normal uppercase tracking-[0.14em] text-ink/45">Optional</span> : null}
      </label>
      {children}
      {hint && !error ? <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink/50">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Admission enquiry. There is no server: on submit the details are validated and
 * handed to WhatsApp as a pre-filled message to the academy. The visitor confirms
 * by tapping Send in WhatsApp — the UI says exactly that, never "submitted".
 */
export function EnquiryForm({ whatsapp, phoneHref, defaultProgramme }: { whatsapp: string | null; phoneHref: string | null; defaultProgramme?: string }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<{ message: string; link: string | null } | null>(null);
  const [copied, setCopied] = useState(false);

  const describedBy = (n: string) => (errors[n] ? `${id(n)}-error` : undefined);
  const cls = (n: string) => clsx(input, errors[n] ? "border-red" : "border-ink/15");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = enquirySchema.safeParse({ ...raw, consent: fd.get("consent") === "on" });
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = Object.keys(errs)[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    const message = enquiryMessage(parsed.data);
    const link = whatsappLink(whatsapp, message);
    setResult({ message, link });
    if (link) window.open(link, "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  if (result) {
    return (
      <div className="rounded-2xl bg-white/80 p-6 ring-1 ring-ink/10 sm:p-8" role="status" aria-live="polite">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white">
          <MessageCircle size={22} aria-hidden />
        </span>
        <h3 className="mt-5 text-step-3 text-ink">{result.link ? "Almost done — send it in WhatsApp" : "Your enquiry is ready to send"}</h3>
        <p className="mt-3 text-ink/70">
          {result.link
            ? "We opened WhatsApp with your details filled in. Tap Send there so the academy receives your enquiry. If WhatsApp didn't open, use the button below."
            : "Copy your details and send them to the academy on Instagram, or call directly."}
        </p>
        <pre className="mt-5 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-ink/[0.04] p-4 font-mono text-xs leading-relaxed text-ink/80">{result.message}</pre>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {result.link ? (
            <a href={result.link} target="_blank" rel="noopener noreferrer" className="tap inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white">
              <MessageCircle size={18} aria-hidden /> Open WhatsApp
            </a>
          ) : null}
          <button type="button" onClick={copy} className="tap inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-ink ring-1 ring-ink/25 hover:bg-ink/5">
            {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />} {copied ? "Copied" : "Copy details"}
          </button>
          <a href={instagram.dm} target="_blank" rel="noopener noreferrer" className="tap inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-ink ring-1 ring-ink/25 hover:bg-ink/5">
            <Instagram size={18} aria-hidden /> Instagram DM
          </a>
          {phoneHref ? (
            <a href={phoneHref} className="tap inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-ink ring-1 ring-ink/25 hover:bg-ink/5">
              <Phone size={18} aria-hidden /> Call
            </a>
          ) : null}
        </div>
        <button type="button" onClick={() => setResult(null)} className="mt-6 text-sm text-ink/60 underline underline-offset-4 hover:text-ink">
          Edit my details
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" aria-describedby={id("intro")}>
      <p id={id("intro")} className="sr-only">
        All fields except email and questions are required. Submitting opens WhatsApp with your details.
      </p>
      <Field id={id("fullName")} label="Full name" error={errors.fullName}>
        <input id={id("fullName")} name="fullName" autoComplete="name" className={cls("fullName")} aria-invalid={!!errors.fullName} aria-describedby={describedBy("fullName")} />
      </Field>
      <Field id={id("mobile")} label="Mobile number" error={errors.mobile} hint="10-digit Indian mobile">
        <input
          id={id("mobile")}
          name="mobile"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98765 43210"
          className={cls("mobile")}
          aria-invalid={!!errors.mobile}
          aria-describedby={describedBy("mobile") ?? `${id("mobile")}-hint`}
        />
      </Field>
      <Field id={id("email")} label="Email address" optional error={errors.email}>
        <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" className={cls("email")} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} />
      </Field>
      <Field id={id("city")} label="City" error={errors.city}>
        <input id={id("city")} name="city" autoComplete="address-level2" className={cls("city")} aria-invalid={!!errors.city} aria-describedby={describedBy("city")} />
      </Field>
      <Field id={id("targetYear")} label="Target examination year" error={errors.targetYear}>
        <select id={id("targetYear")} name="targetYear" defaultValue="" className={cls("targetYear")} aria-invalid={!!errors.targetYear} aria-describedby={describedBy("targetYear")}>
          <option value="" disabled>Select year</option>
          {targetYearOptions().map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </Field>
      <Field id={id("preparationStage")} label="Preparation stage" error={errors.preparationStage}>
        <select id={id("preparationStage")} name="preparationStage" defaultValue="" className={cls("preparationStage")} aria-invalid={!!errors.preparationStage} aria-describedby={describedBy("preparationStage")}>
          <option value="" disabled>Select stage</option>
          {PREPARATION_STAGES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>
      <Field id={id("programme")} label="Interested programme" error={errors.programme}>
        <select id={id("programme")} name="programme" defaultValue={defaultProgramme ?? ""} className={cls("programme")} aria-invalid={!!errors.programme} aria-describedby={describedBy("programme")}>
          <option value="" disabled>Select programme</option>
          {PROGRAMME_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>
      <fieldset className="min-w-0">
        <legend className="mb-2 text-sm font-semibold text-ink">Preferred contact method</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_METHODS.map((m, n) => (
            <label key={m} className="tap relative inline-flex cursor-pointer items-center">
              <input type="radio" name="contactMethod" value={m} defaultChecked={n === 1} className="peer sr-only" />
              <span className="rounded-full px-4 py-2.5 text-sm text-ink/70 ring-1 ring-ink/20 transition-colors peer-checked:bg-ink peer-checked:text-ivory peer-focus-visible:ring-2 peer-focus-visible:ring-blue">
                {m}
              </span>
            </label>
          ))}
        </div>
        {errors.contactMethod ? <p role="alert" className="mt-1.5 text-sm text-red">{errors.contactMethod}</p> : null}
      </fieldset>
      <div className="sm:col-span-2">
        <Field id={id("message")} label="Additional questions" optional error={errors.message}>
          <textarea id={id("message")} name="message" rows={4} maxLength={2000} className={cls("message")} aria-invalid={!!errors.message} aria-describedby={describedBy("message")} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/75">
          <input type="checkbox" name="consent" className="mt-0.5 h-5 w-5 shrink-0 accent-[#244C76]" aria-invalid={!!errors.consent} aria-describedby={describedBy("consent")} />
          <span>
            I agree to share these details with Dakshina Learnings so they can contact me about admissions. See the{" "}
            <a href="/privacy-policy" className="underline">privacy policy</a>.
          </span>
        </label>
        {errors.consent ? <p id={`${id("consent")}-error`} role="alert" className="mt-1.5 text-sm text-red">{errors.consent}</p> : null}
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="tap inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-semibold text-white shadow-[0_10px_30px_-12px_rgba(37,211,102,0.8)] hover:brightness-105">
          <MessageCircle size={18} aria-hidden /> {whatsapp ? "Send enquiry on WhatsApp" : "Prepare my enquiry"}
        </button>
        <p className="text-xs text-ink/55">Your details are sent only when you tap Send in WhatsApp. Nothing is stored on this website.</p>
      </div>
    </form>
  );
}
