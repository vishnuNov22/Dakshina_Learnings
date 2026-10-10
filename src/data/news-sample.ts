export type Story = {
  slug: string;
  headline: string;
  summary: string;
  whatHappened: string;
  whyItMatters: string;
  background: string;
  subjects: string[];
  dimensions: string[];
  answerLinks: string[];
  sourceName: string | null;
  sourceUrl: string | null;
  language: "en" | "ml";
  publishedAt: string | null;
  isSample: boolean;
};

/**
 * A FORMAT SAMPLE — not a news report. It shows how the Daily News Desk breaks
 * a theme down for UPSC. Add real stories to `stories` below (newest first).
 */
export const sampleStory: Story = {
  slug: "sample-how-to-read-an-urban-policy-story",
  headline: "Reading an urban-policy story the UPSC way",
  summary:
    "A worked format showing how the News Desk turns any city-governance headline into Prelims facts, Mains dimensions and answer-writing material.",
  whatHappened:
    "Imagine a headline about a state announcing a new framework for city transport and housing. The first task is to separate the event (who decided what, under which law or scheme) from commentary.",
  whyItMatters:
    "Urban governance links GS Paper I (urbanisation), GS Paper II (local self-government, 74th Amendment) and GS Paper III (infrastructure, investment models). One story can serve three papers.",
  background:
    "The 74th Constitutional Amendment Act, 1992 gave constitutional status to urban local bodies and added the Twelfth Schedule listing 18 functional items. Most policy debates trace back to how far those functions, funds and functionaries have actually been devolved.",
  subjects: ["Polity", "Geography", "Economy"],
  dimensions: ["Constitutional", "Fiscal", "Social", "Environmental", "Administrative"],
  answerLinks: [
    "Introduce with the scale of urbanisation rather than an opinion",
    "Use the 74th Amendment as the institutional anchor",
    "Balance opportunities (agglomeration, jobs) with challenges (informality, climate stress)",
    "Conclude with a forward-looking, implementable suggestion",
  ],
  sourceName: null,
  sourceUrl: null,
  language: "en",
  publishedAt: null,
  isSample: true,
};

/** Edit this list to publish analyses. Keep the sample until real stories are added. */
export const stories: Story[] = [sampleStory];
export const getStory = (slug: string) => stories.find((s) => s.slug === slug) ?? null;
