import { describe, expect, it } from "vitest";
import { enquirySchema, fieldErrors } from "@/lib/validation";

const year = new Date().getFullYear();
const valid = {
  fullName: "Asha Menon",
  mobile: "98765 43210",
  email: "",
  city: "Thiruvananthapuram",
  targetYear: String(year + 1),
  preparationStage: "Just starting",
  programme: "Prelims Hacker Program",
  contactMethod: "WhatsApp",
  message: "",
  consent: true,
};

describe("enquirySchema", () => {
  it("accepts a valid enquiry and normalises the mobile number", () => {
    const r = enquirySchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.mobile).toBe("9876543210");
      expect(r.data.targetYear).toBe(year + 1);
      expect(r.data.email).toBeUndefined();
    }
  });
  it("accepts +91-prefixed mobiles", () => {
    expect(enquirySchema.safeParse({ ...valid, mobile: "+919876543210" }).success).toBe(true);
  });
  it("rejects invalid mobile numbers", () => {
    const r = enquirySchema.safeParse({ ...valid, mobile: "12345" });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).mobile).toMatch(/mobile/i);
  });
  it("requires consent", () => {
    const r = enquirySchema.safeParse({ ...valid, consent: false });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).consent).toBeDefined();
  });
  it("requires an email when email is the preferred contact method", () => {
    const r = enquirySchema.safeParse({ ...valid, contactMethod: "Email" });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).email).toBeDefined();
  });
  it("rejects past target years", () => {
    expect(enquirySchema.safeParse({ ...valid, targetYear: String(year - 1) }).success).toBe(false);
  });
  it("rejects unknown programmes", () => {
    expect(enquirySchema.safeParse({ ...valid, programme: "Something else" }).success).toBe(false);
  });
});
