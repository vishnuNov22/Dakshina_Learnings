/**
 * Photography manifest — real photographs under the Unsplash licence
 * (free for commercial use, no permission needed). Replace any entry with the
 * academy's own photos by changing `src` (local files go in /public/images).
 */
export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** focal point for object-position, e.g. "50% 30%" */
  focus?: string;
  credit?: string;
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const photos = {
  heroPoster: { src: u("1544456203-0af5a69f5789"), alt: "An aspirant reading quietly at a long table in a library", width: 4000, height: 2667, focus: "50% 45%" },
  readingStudent: { src: u("1617009762269-c062aaf6b3a0"), alt: "A student in glasses absorbed in a book", width: 4000, height: 2667, focus: "60% 35%" },
  studentsBooks: { src: u("1637589316488-6d4c41b335cd"), alt: "Two students discussing a passage in a book", width: 3000, height: 2000, focus: "50% 30%" },
  focusedStudent: { src: u("1637589308599-3478cc55510d"), alt: "A young man studying at his desk with books and a laptop", width: 3000, height: 2000, focus: "40% 40%" },
  grandLibrary: { src: u("1501503069356-3c6b82a17d89"), alt: "A grand reading hall with rows of study tables and lamps", width: 5472, height: 3648, focus: "50% 50%" },
  libraryShelves: { src: u("1481627834876-b7833e8f5570"), alt: "Tall wooden bookshelves lit by warm lamps", width: 4000, height: 3000, focus: "50% 50%" },
  lectureHall: { src: u("1722573783625-eceb04251036"), alt: "Students attending a lecture in front of a projector screen", width: 4000, height: 2667, focus: "50% 50%" },
  newspaper: { src: u("1623039405147-547794f92e9e"), alt: "A newspaper with reading glasses and a cup of coffee", width: 4000, height: 2667, focus: "50% 50%" },
  newsReader: { src: u("1495020689067-958852a7765e"), alt: "A man reading a newspaper on a bench", width: 4000, height: 2667, focus: "50% 40%" },
  answerWriting: { src: u("1726831662518-c48d983f9b86"), alt: "A hand writing an answer on paper", width: 4000, height: 2667, focus: "50% 50%" },
  writingDesk: { src: u("1434030216411-0b793f4b4173"), alt: "Writing notes at a wooden desk beside a coffee mug", width: 4000, height: 2667, focus: "50% 50%" },
  indiaGate: { src: u("1705927122615-02dcef3b1465"), alt: "India Gate in New Delhi against a clear sky", width: 4000, height: 6000, focus: "50% 40%" },
  indiaGateDusk: { src: u("1587474260584-136574528ed5"), alt: "India Gate at dusk under a pink and purple sky", width: 4000, height: 2667, focus: "50% 50%" },
  portrait: { src: u("1637589308599-3478cc55510d"), alt: "", width: 3000, height: 2000, focus: "52% 22%" },
} satisfies Record<string, Photo>;

/** Self-hosted hero video (see /public/videos/README.txt). */
export const heroVideo = { desktop: "/videos/hero.mp4", mobile: "/videos/hero-mobile.mp4" } as const;
