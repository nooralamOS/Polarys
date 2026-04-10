"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
const faqs = [
  {
    q: "How quickly can I expect results?",
    a: "Most clients start seeing engagement within the first 2 weeks. Qualified calls typically start coming in within 30-60 days, depending on your niche and offer.",
  },
  {
    q: "What makes you different from other LinkedIn agencies?",
    a: "We combine founder-led content and outbound outreach into one unified system. Most agencies only do one or the other — ours work together and compound together.",
  },
  {
    q: "Will this work in my niche?",
    a: "If your ideal client is on LinkedIn (B2B founders, executives, decision-makers), yes. We have proven results across SaaS, agencies, consulting, coaching, and more.",
  },
  {
    q: "Do I need to be a celebrity or influencer?",
    a: "Not at all. Our system is built for founders and operators, not influencers. You just need expertise and a willingness to share it authentically.",
  },
  {
    q: "What is included in the service?",
    a: "Content strategy, copywriting, design, scheduling, outreach campaigns, and monthly reporting — all included.",
  },
  {
    q: "What type of content will you create?",
    a: "Text posts, carousels, infographics — all crafted in your authentic voice from founder interviews.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const params = {
    layout: { borderRadius: 14, gap: 12 },
    spacing: { paddingX: 19, paddingY: 20 },
    typography: { questionSize: 17, answerSize: 16 },
  };

  return (
    <section className="grid-pattern grid-pattern-left py-20 px-4 bg-surface">
      {/* position + z-index lifts content above the ::before grid overlay */}
      <div className="max-w-3xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Frequently Asked{" "}
            <span className="highlight">Questions</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: params.layout.gap }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderRadius: params.layout.borderRadius,
                  overflow: "hidden",
                  background: "#1c1c1c",
                  boxShadow: isOpen ? "0 4px 24px rgba(0,0,0,0.45)" : "none",
                  transition: "box-shadow 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                  style={{
                    background: "transparent",
                    padding: `${params.spacing.paddingY}px ${params.spacing.paddingX}px`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 700,
                      fontSize: params.typography.questionSize,
                      lineHeight: 1.4,
                      paddingRight: "1rem",
                      color: "#ffffff",
                    }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className="w-4 h-4 shrink-0"
                    style={{
                      color: "#ffffff",
                      transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div
                      style={{
                        padding: `0 ${params.spacing.paddingX}px ${params.spacing.paddingY}px`,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                          fontWeight: 700,
                          fontSize: params.typography.answerSize,
                          lineHeight: 1.6,
                          color: "#ffffff",
                          margin: 0,
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
