/**
 * Contact channels. Values come from NEXT_PUBLIC_* environment variables so the
 * academy can supply verified numbers without code changes. Anything empty is
 * treated as "not verified" and the related UI is not rendered.
 */

const clean = (v: string | undefined): string | null => {
  const t = (v ?? "").trim();
  return t.length ? t : null;
};

/** Digits only, international format (e.g. 919876543210). Returns null if implausible. */
export function normalisePhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return null;
  return digits.length === 10 ? `91${digits}` : digits;
}

export function formatPhoneDisplay(digits: string): string {
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}

export const contact = {
  phone: normalisePhone(clean(process.env.NEXT_PUBLIC_PHONE)),
  whatsapp: normalisePhone(clean(process.env.NEXT_PUBLIC_WHATSAPP) ?? clean(process.env.NEXT_PUBLIC_PHONE)),
  email: clean(process.env.NEXT_PUBLIC_EMAIL),
  addressLine: clean(process.env.NEXT_PUBLIC_ADDRESS_LINE),
  mapsUrl: clean(process.env.NEXT_PUBLIC_MAPS_URL),
  youtube: clean(process.env.NEXT_PUBLIC_YOUTUBE_URL),
  facebook: clean(process.env.NEXT_PUBLIC_FACEBOOK_URL),
} as const;

export const DEFAULT_WA_MESSAGE =
  "Hello Dakshina Learnings, I would like to know more about your UPSC preparation programmes.";

export function whatsappLink(number: string | null, message: string = DEFAULT_WA_MESSAGE): string | null {
  const n = normalisePhone(number);
  if (!n) return null;
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

export function telLink(number: string | null): string | null {
  const n = normalisePhone(number);
  return n ? `tel:+${n}` : null;
}

export function programmeMessage(programmeTitle: string): string {
  return `Hello Dakshina Learnings, I would like to know more about the ${programmeTitle}. Could you share batch details?`;
}

/** Instagram profile and direct-message deep links (verified handle). */
export const instagram = {
  handle: "dakshinalearnings",
  profile: "https://www.instagram.com/dakshinalearnings/",
  dm: "https://ig.me/m/dakshinalearnings",
} as const;

/** Builds the WhatsApp message sent from the enquiry form. */
export function enquiryMessage(d: {
  fullName: string;
  mobile: string;
  email?: string;
  city: string;
  targetYear: number;
  preparationStage: string;
  programme: string;
  contactMethod: string;
  message?: string;
}): string {
  const lines = [
    "Hello Dakshina Learnings, I would like to enquire about admission.",
    "",
    `Name: ${d.fullName}`,
    `Mobile: ${d.mobile}`,
    d.email ? `Email: ${d.email}` : null,
    `City: ${d.city}`,
    `Target exam year: ${d.targetYear}`,
    `Preparation stage: ${d.preparationStage}`,
    `Interested in: ${d.programme}`,
    `Preferred contact: ${d.contactMethod}`,
    d.message ? `\nQuestion: ${d.message}` : null,
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}
