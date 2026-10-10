/** Add verified faculty here. Empty list = the page explains mentorship without inventing names. */
export type Faculty = { name: string; role: string; subjects: string[]; bio: string; image?: string };
export const faculty: Faculty[] = [];

/** Add verified student experiences only (with written consent). */
export type Testimonial = { name: string; context: string; quote: string; verified: true };
export const testimonials: Testimonial[] = [];
