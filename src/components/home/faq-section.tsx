"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { homeFaq } from "@/content/site";
import { JsonLd, faqSchema } from "@/lib/schema";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-ink md:text-base">{q}</span>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-sand">
          <ChevronDown
            className={"size-4 text-muted transition-transform " + (open ? "rotate-180" : "")}
            aria-hidden
          />
        </span>
      </button>
      {open && (
        <div className="border-t border-line px-5 py-4">
          <p className="text-sm leading-relaxed text-muted">{a}</p>
        </div>
      )}
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-b border-line bg-sand">
      <JsonLd data={faqSchema(homeFaq.items)} />
      <div className="shell section">
        <div className="max-w-xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="display-lg mt-4">{homeFaq.heading}</h2>
          <p className="lede mt-4">
            Straight answers before you apply. Still unsure? WhatsApp us.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {homeFaq.items.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
