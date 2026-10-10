/**
 * Programme catalogue. Edit this file to update programme content.
 * Fields set to `null` render as "Shared on enquiry" — never fill them with
 * guesses. Set `confirmed: true` only after the academy signs off the copy.
 */
export type Programme = {
  slug: string;
  title: string;
  shortTitle: string;
  kicker: string;
  summary: string;
  confirmed: boolean;
  audience: string[];
  objectives: string[];
  curriculum: { title: string; points: string[] }[];
  approach: string[];
  duration: string | null;
  mode: string | null;
  batch: string | null;
  fees: string | null;
  faqs: { q: string; a: string }[];
  accent: "gold" | "blue" | "red";
};

export const programmes: Programme[] = [
  {
    slug: "upsc-cse-comprehensive",
    title: "UPSC Civil Services Comprehensive Preparation",
    shortTitle: "UPSC CSE Preparation",
    kicker: "Foundation → Prelims → Mains",
    summary:
      "Structured, subject-wise preparation for the Civil Services Examination with activity-based classes, current-affairs integration and regular evaluation.",
    confirmed: false,
    audience: [
      "Graduates and final-year students beginning UPSC preparation",
      "Aspirants who want a structured, mentored routine",
      "Working professionals planning a disciplined attempt",
    ],
    objectives: [
      "Build conceptual clarity across the GS syllabus",
      "Connect static subjects with current affairs",
      "Develop analytical answer-writing for Mains",
      "Create a sustainable revision and testing rhythm",
    ],
    curriculum: [
      { title: "General Studies foundations", points: ["Polity & Governance", "History & Culture", "Geography", "Economy", "Environment & Ecology", "Science & Technology"] },
      { title: "Current affairs integration", points: ["Daily news analysis", "Monthly consolidation", "Issue mapping to syllabus"] },
      { title: "Evaluation", points: ["Topic tests", "Answer-writing practice", "Individual feedback"] },
    ],
    approach: ["Activity-based classroom sessions", "Discussion-led concept building", "Mentor check-ins"],
    duration: null,
    mode: null,
    batch: null,
    fees: null,
    faqs: [
      { q: "Is this suitable for complete beginners?", a: "The programme is designed to start from fundamentals. Speak to the academy about the current batch's starting point." },
    ],
    accent: "blue",
  },
  {
    slug: "prelims-hacker",
    title: "Prelims Hacker Program",
    shortTitle: "Prelims Hacker",
    kicker: "Strategy-first Prelims preparation",
    summary:
      "A focused programme on how Prelims is actually set: previous-year question analysis, topic trends, elimination techniques and revision priorities.",
    confirmed: false,
    audience: ["Aspirants appearing for the upcoming Prelims", "Repeaters who want to improve accuracy", "Aspirants who have covered the basics"],
    objectives: [
      "Understand question patterns from previous-year papers",
      "Prioritise high-yield topics",
      "Master option-elimination and probability techniques",
      "Build exam-day temperament through timed practice",
    ],
    curriculum: [
      { title: "PYQ intelligence", points: ["Year-wise question analysis", "Topic and sub-topic mapping", "Recurring themes"] },
      { title: "Technique", points: ["Elimination strategies", "Statement-based question handling", "Managing negative marking"] },
      { title: "Practice workflow", points: ["Timed sectional tests", "Full-length mocks", "Error logs and revision loops"] },
    ],
    approach: ["Question-first classes", "Live solving and discussion", "Revision sprints"],
    duration: null,
    mode: null,
    batch: null,
    fees: null,
    faqs: [
      { q: "Does the programme include mock tests?", a: "Practice and testing are core to the programme. Confirm the current test schedule with the academy." },
    ],
    accent: "red",
  },
  {
    slug: "current-affairs-news-desk",
    title: "Current Affairs & Daily News Desk",
    shortTitle: "Daily News Desk",
    kicker: "News → Concepts → Answers",
    summary:
      "Daily analysis that connects the news to the syllabus — including The Hindu analysis in Malayalam — so current affairs become usable answer material.",
    confirmed: false,
    audience: ["All UPSC aspirants", "Malayalam-medium learners who prefer analysis in Malayalam", "Aspirants who struggle to make notes from newspapers"],
    objectives: ["Read the newspaper selectively", "Link stories to GS papers", "Build issue-wise notes", "Convert news into Mains arguments"],
    curriculum: [
      { title: "Daily", points: ["Newspaper analysis", "Key terms and facts", "Syllabus mapping"] },
      { title: "Weekly / monthly", points: ["Consolidation", "Practice questions", "Revision notes"] },
    ],
    approach: ["Editorial-style breakdowns", "Bilingual explanation where useful", "Answer-writing hooks"],
    duration: null,
    mode: null,
    batch: null,
    fees: null,
    faqs: [{ q: "Is the analysis available in Malayalam?", a: "The academy reports The Hindu analysis in Malayalam. Confirm the current timing and format when you enquire." }],
    accent: "gold",
  },
  {
    slug: "mains-answer-writing",
    title: "Mains Answer-Writing Practice",
    shortTitle: "Answer Writing",
    kicker: "Think · Structure · Write",
    summary:
      "Guided practice in structuring balanced, multi-dimensional answers under time pressure, with evaluation and feedback.",
    confirmed: false,
    audience: ["Aspirants preparing for GS Mains", "Prelims-qualified candidates", "Anyone who finds it hard to start an answer"],
    objectives: ["Decode directive words", "Structure introduction, body and conclusion", "Use data, examples and diagrams", "Write within word and time limits"],
    curriculum: [
      { title: "Frameworks", points: ["Question decoding", "Dimension mapping", "Balanced conclusions"] },
      { title: "Practice", points: ["Regular writing sessions", "Peer discussion", "Evaluator feedback"] },
    ],
    approach: ["Notebook-based activity sessions", "Model-answer discussion", "Individual feedback"],
    duration: null,
    mode: null,
    batch: null,
    fees: null,
    faqs: [],
    accent: "blue",
  },
  {
    slug: "test-series-mentorship",
    title: "Test Series & Mentorship",
    shortTitle: "Tests & Mentorship",
    kicker: "Measure · Reflect · Improve",
    summary:
      "Regular tests paired with expert mentoring to track progress, diagnose weak areas and keep your preparation on schedule.",
    confirmed: false,
    audience: ["Self-studying aspirants who want accountability", "Aspirants in the revision phase"],
    objectives: ["Benchmark performance regularly", "Identify and fix weak topics", "Plan realistic weekly targets"],
    curriculum: [
      { title: "Tests", points: ["Topic tests", "Full-length tests", "Discussion sessions"] },
      { title: "Mentorship", points: ["Study planning", "Progress reviews", "Strategy adjustments"] },
    ],
    approach: ["Data-informed feedback", "One-to-one guidance"],
    duration: null,
    mode: null,
    batch: null,
    fees: null,
    faqs: [],
    accent: "gold",
  },
];

export const getProgramme = (slug: string) => programmes.find((p) => p.slug === slug);

export const programmeHref = (slug: string) => (slug === "prelims-hacker" ? "/prelims-hacker" : `/programmes/${slug}`);

/** Maps a programme slug to the enquiry-form option. */
export const programmeOptionBySlug: Record<string, string> = {
  "upsc-cse-comprehensive": "UPSC CSE Comprehensive",
  "prelims-hacker": "Prelims Hacker Program",
  "current-affairs-news-desk": "Current Affairs & News Desk",
  "mains-answer-writing": "Mains Answer Writing",
  "test-series-mentorship": "Test Series",
  library: "Library & Reading Room",
};
