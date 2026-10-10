/**
 * Single source of truth for academy identity.
 * Only facts that have been verified belong here. Everything that still needs
 * confirmation from the academy is marked `null` and the UI hides it.
 */
export const site = {
  name: "Dakshina Learnings",
  legalName: "Dakshina Learnings Civil Service Academy",
  shortTagline: "Civil Services Academy",
  tagline: "Building Tomorrow's Civil Servants",
  city: "Thiruvananthapuram",
  region: "Kerala",
  country: "IN",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dakshinalearnings.com").replace(/\/$/, ""),
  description:
    "Dakshina Learnings is a UPSC Civil Services preparation academy in Thiruvananthapuram, Kerala — activity-based learning, current-affairs analysis, test series and expert mentoring.",
  /** Verified from the academy's Instagram profile. */
  instagram: { handle: "dakshinalearnings", url: "https://www.instagram.com/dakshinalearnings/" },
  threads: { handle: "dakshinalearnings", url: "https://www.threads.net/@dakshinalearnings" },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Programmes", href: "/programmes" },
  { label: "Prelims Hacker", href: "/prelims-hacker" },
  { label: "Current Affairs", href: "/current-affairs" },
  { label: "Method", href: "/learning-method" },
  { label: "Library", href: "/library" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Academy",
    items: [
      { label: "About Dakshina", href: "/about" },
      { label: "Learning Methodology", href: "/learning-method" },
      { label: "Faculty & Mentorship", href: "/faculty" },
      { label: "Results & Experiences", href: "/results" },
      { label: "Library & Reading Room", href: "/library" },
    ],
  },
  {
    title: "Prepare",
    items: [
      { label: "UPSC Programmes", href: "/programmes" },
      { label: "Prelims Hacker Program", href: "/prelims-hacker" },
      { label: "Daily News Desk", href: "/current-affairs" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "Admissions & Enquiry", href: "/admissions" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];
