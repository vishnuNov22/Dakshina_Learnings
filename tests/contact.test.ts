import { describe, expect, it } from "vitest";
import { enquiryMessage, formatPhoneDisplay, normalisePhone, programmeMessage, telLink, whatsappLink } from "@/lib/contact";

describe("contact helpers", () => {
  it("normalises 10-digit Indian numbers to international format", () => {
    expect(normalisePhone("98765 43210")).toBe("919876543210");
    expect(normalisePhone("+91 98765-43210")).toBe("919876543210");
  });
  it("rejects implausible numbers", () => {
    expect(normalisePhone("12345")).toBeNull();
    expect(normalisePhone("")).toBeNull();
    expect(normalisePhone(null)).toBeNull();
  });
  it("builds WhatsApp links with an encoded message", () => {
    const link = whatsappLink("9876543210", "Hello & welcome");
    expect(link).toBe("https://wa.me/919876543210?text=Hello%20%26%20welcome");
  });
  it("returns null links when no verified number is configured", () => {
    expect(whatsappLink(null)).toBeNull();
    expect(telLink(null)).toBeNull();
  });
  it("builds tel: links", () => {
    expect(telLink("9876543210")).toBe("tel:+919876543210");
  });
  it("formats numbers for display", () => {
    expect(formatPhoneDisplay("919876543210")).toBe("+91 98765 43210");
  });
  it("includes the programme in programme messages", () => {
    expect(programmeMessage("Prelims Hacker Program")).toContain("Prelims Hacker Program");
  });
  it("writes every enquiry field into the WhatsApp message and skips empty optional ones", () => {
    const msg = enquiryMessage({
      fullName: "Asha",
      mobile: "9876543210",
      city: "Thiruvananthapuram",
      targetYear: 2027,
      preparationStage: "Just starting",
      programme: "Prelims Hacker Program",
      contactMethod: "WhatsApp",
    });
    expect(msg).toContain("Name: Asha");
    expect(msg).toContain("Target exam year: 2027");
    expect(msg).not.toContain("Email:");
    expect(msg).not.toContain("Question:");
  });
});
