import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-brand-dark px-[var(--gutter)] pt-[var(--header-h)] text-center">
      <div>
        <p className="eyebrow text-brand">404 · Page not found</p>
        <h1 className="mt-6 text-step-5">This page isn&rsquo;t <span className="accent">on the syllabus.</span></h1>
        <Link href="/" className={buttonClass("brand", "mt-10")}>Back to home</Link>
      </div>
    </section>
  );
}
