import { Hero } from "@/components/hero/Hero";
import { BookLibrary } from "@/components/books/BookLibrary";
import { ActivityLearning } from "@/components/storytelling/ActivityLearning";
import { NewsDesk } from "@/components/storytelling/NewsDesk";
import { PrelimsTeaser } from "@/components/storytelling/PrelimsTeaser";
import { JourneyTimeline } from "@/components/storytelling/JourneyTimeline";
import { IdentityTransform } from "@/components/storytelling/IdentityTransform";
import {
  AcademyIntro,
  EnquiryCta,
  ExperiencesSection,
  FaqSection,
  FeaturedProgrammes,
  MentorshipSection,
  ReadingRoomSection,
  ResourcesSection,
} from "@/components/home/Sections";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { homeFaqs } from "@/data/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AcademyIntro />
      <BookLibrary />
      <ActivityLearning />
      <NewsDesk />
      <PrelimsTeaser />
      <JourneyTimeline />
      <FeaturedProgrammes />
      <ReadingRoomSection />
      <MentorshipSection />
      <ExperiencesSection />
      <ResourcesSection />
      <FaqSection />
      <IdentityTransform />
      <EnquiryCta />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
