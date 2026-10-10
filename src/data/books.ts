/**
 * Commonly used UPSC preparation resources, shown as illustrative references.
 * Covers rendered on the site are original typographic designs — not publisher artwork.
 * Inclusion does not mean the academy officially prescribes a title.
 */
export type SubjectVisual = "polity" | "geography" | "history" | "economy" | "environment" | "news";

export type BookRef = {
  id: string;
  subject: string;
  title: string;
  author: string;
  publisherNote: string;
  colour: string;
  ink: string;
  visual: SubjectVisual;
  concepts: string[];
  annotation: string;
};

export const books: BookRef[] = [
  {
    id: "polity",
    subject: "Polity",
    title: "Indian Polity",
    author: "M. Laxmikanth",
    publisherNote: "McGraw Hill",
    colour: "#244C76",
    ink: "#F5F0E6",
    visual: "polity",
    concepts: ["Separation of powers", "Fundamental Rights & DPSP", "Parliament ↔ Executive accountability", "Federalism & Centre–State relations"],
    annotation: "Read every Article as a relationship between institutions.",
  },
  {
    id: "history",
    subject: "Modern History",
    title: "A Brief History of Modern India",
    author: "Rajiv Ahir (Spectrum)",
    publisherNote: "Spectrum Books",
    colour: "#8E3935",
    ink: "#F5F0E6",
    visual: "history",
    concepts: ["1857 and its aftermath", "Moderates to Gandhian mass movements", "Constitutional developments 1909–1947", "Social reform movements"],
    annotation: "History is a chain of causes — draw the arrows.",
  },
  {
    id: "geography",
    subject: "Geography",
    title: "Certificate Physical and Human Geography",
    author: "Goh Cheng Leong",
    publisherNote: "Oxford University Press",
    colour: "#3F5B3A",
    ink: "#F5F0E6",
    visual: "geography",
    concepts: ["Landforms & geomorphic processes", "Climate systems & monsoon", "Soils and natural vegetation", "Human settlement patterns"],
    annotation: "Always ask: where, why there, and what follows?",
  },
  {
    id: "economy",
    subject: "Economy",
    title: "Indian Economy",
    author: "Ramesh Singh",
    publisherNote: "McGraw Hill",
    colour: "#B79A62",
    ink: "#101C2C",
    visual: "economy",
    concepts: ["Growth vs development", "Inflation & monetary policy", "Fiscal policy & the Budget", "External sector & trade"],
    annotation: "Every policy has a trade-off. Name it.",
  },
  {
    id: "environment",
    subject: "Environment",
    title: "Environment",
    author: "Shankar IAS Academy",
    publisherNote: "Shankar IAS Academy",
    colour: "#2F5D57",
    ink: "#F5F0E6",
    visual: "environment",
    concepts: ["Ecosystem structure & energy flow", "Biodiversity & protected areas", "Climate change frameworks", "Pollution & environmental law"],
    annotation: "Link each species or treaty to a process, not a list.",
  },
  {
    id: "ancient",
    subject: "Ancient History",
    title: "India's Ancient Past",
    author: "R. S. Sharma",
    publisherNote: "Oxford University Press",
    colour: "#6B4A2E",
    ink: "#F5F0E6",
    visual: "history",
    concepts: ["Harappan civilisation", "Vedic society & polity", "Mauryan administration", "Gupta age & cultural developments"],
    annotation: "Sources first: inscriptions, coins, texts.",
  },
  {
    id: "news",
    subject: "Current Affairs",
    title: "The Hindu & official publications",
    author: "Newspaper · PIB · Yojana",
    publisherNote: "Daily reading",
    colour: "#151515",
    ink: "#E5D7BC",
    visual: "news",
    concepts: ["What happened — and why now", "Constitutional & legal background", "Stakeholders and trade-offs", "Answer-writing hooks"],
    annotation: "Don't collect news. Connect it.",
  },
];
