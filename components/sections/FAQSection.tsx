"use client";

import { useState } from "react";
import { faq } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

function FAQItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="pixel-border bg-ink">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="font-pixel text-[11px] text-white sm:text-xs">{question}</span>
        <span className={`shrink-0 font-pixel text-lime text-lg transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div className="accordion-content" data-open={open}>
        <div>
          <p className="px-4 pb-5 text-sm leading-relaxed text-white/55 sm:px-6">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-line bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader eyebrow="Questions" title="FAQ" />
        <div className="mt-12 flex flex-col gap-3">
          {faq.map((item, i) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
