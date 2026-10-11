/**
 * Commonly used UPSC preparation books. Cover images come from the Open Library
 * Covers API (covers.openlibrary.org) and remain the property of their publishers;
 * they are shown only to identify the books. Inclusion is illustrative and does not
 * mean the academy prescribes a title — confirm the reading list with the academy.
 */
export type BookRef = {
  id: string;
  subject: string;
  title: string;
  author: string;
  publisher: string;
  cover: string;
  spine: string;
  concepts: string[];
  note: string;
};

const ol = (id: number) => `https://covers.openlibrary.org/b/id/${id}-L.jpg`;

export const books: BookRef[] = [
  {
    id: "polity",
    subject: "Polity & Governance",
    title: "Indian Polity",
    author: "M. Laxmikanth",
    publisher: "McGraw Hill",
    cover: ol(11412890),
    spine: "#1b2a4a",
    concepts: ["Separation of powers", "Fundamental Rights & DPSP", "Parliament and executive accountability", "Centre–State relations"],
    note: "Read every Article as a relationship between institutions.",
  },
  {
    id: "modern",
    subject: "Modern History",
    title: "A Brief History of Modern India",
    author: "Rajiv Ahir",
    publisher: "Spectrum Books",
    cover: ol(10241995),
    spine: "#2b2b2b",
    concepts: ["1857 and its aftermath", "From the Moderates to mass movements", "Constitutional developments, 1909–1947", "Social reform movements"],
    note: "History is a chain of causes — draw the arrows.",
  },
  {
    id: "geography",
    subject: "Geography",
    title: "Certificate Physical and Human Geography",
    author: "Goh Cheng Leong",
    publisher: "Oxford University Press",
    cover: ol(13295168),
    spine: "#2f5d3a",
    concepts: ["Landforms and geomorphic processes", "Climate systems and the monsoon", "Soils and natural vegetation", "Human settlement patterns"],
    note: "Always ask: where, why there, and what follows?",
  },
  {
    id: "economy",
    subject: "Economy",
    title: "Indian Economy",
    author: "Ramesh Singh",
    publisher: "McGraw Hill",
    cover: ol(12377074),
    spine: "#e9e4ee",
    concepts: ["Growth versus development", "Inflation and monetary policy", "Fiscal policy and the Budget", "External sector and trade"],
    note: "Every policy has a trade-off. Name it.",
  },
  {
    id: "ancient",
    subject: "Ancient History",
    title: "India's Ancient Past",
    author: "R. S. Sharma",
    publisher: "Oxford University Press",
    cover: ol(128274),
    spine: "#7a5a3a",
    concepts: ["Harappan civilisation", "Vedic society and polity", "Mauryan administration", "The Gupta age"],
    note: "Sources first: inscriptions, coins, texts.",
  },
  {
    id: "culture",
    subject: "Art & Culture",
    title: "Indian Art and Culture",
    author: "Nitin Singhania",
    publisher: "McGraw Hill",
    cover: ol(10485365),
    spine: "#2a2a2a",
    concepts: ["Architecture and sculpture", "Classical dance and music", "Painting traditions", "Religion and philosophy"],
    note: "Link every monument to its dynasty and style.",
  },
];
