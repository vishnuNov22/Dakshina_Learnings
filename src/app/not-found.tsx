import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-navy px-[var(--gutter)] pt-[var(--header-h)] text-center">
      <div>
        <p className="eyebrow text-gold">404 · Page not found</p>
        <h1 className="mt-6 text-step-5">This page isn&rsquo;t <em className="text-gold-soft">on the syllabus.</em></h1>
        <Link href="/" className={buttonClass("gold", "mt-10")}>Back to home</Link>
      </div>
    </section>
  );
}
