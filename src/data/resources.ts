export type Resource = { title: string; description: string; href: string; kind: "Official" | "Reading" | "Practice"; external: boolean };

/** Official/public resources only. Academy-authored downloads can be added here once authorised. */
export const resources: Resource[] = [
  { title: "UPSC — Official website", description: "Notifications, examination calendar, syllabus and previous question papers.", href: "https://upsc.gov.in", kind: "Official", external: true },
  { title: "UPSC — Previous year question papers", description: "Download question papers directly from the Commission's archive.", href: "https://upsc.gov.in/examinations/previous-question-papers", kind: "Practice", external: true },
  { title: "Press Information Bureau (PIB)", description: "Primary source for government announcements, schemes and data releases.", href: "https://pib.gov.in", kind: "Official", external: true },
  { title: "NCERT textbooks", description: "Free online NCERT textbooks — the foundation of most GS subjects.", href: "https://ncert.nic.in/textbook.php", kind: "Reading", external: true },
  { title: "Union Budget & Economic Survey", description: "Budget documents and the Economic Survey from the Ministry of Finance.", href: "https://www.indiabudget.gov.in", kind: "Official", external: true },
  { title: "PRS Legislative Research", description: "Bill summaries and parliamentary analysis for Polity & Governance.", href: "https://prsindia.org", kind: "Reading", external: true },
  { title: "India Code", description: "The official repository of central and state Acts.", href: "https://www.indiacode.nic.in", kind: "Official", external: true },
  { title: "The Constitution of India", description: "The full text of the Constitution from the Legislative Department.", href: "https://legislative.gov.in/constitution-of-india/", kind: "Official", external: true },
];
