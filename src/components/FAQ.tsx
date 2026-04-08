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
    a: "We combine founder-led content, outbound outreach, and low-cost LinkedIn ads into one unified system. Most agencies only do one of these — we do all three, and they compound together.",
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
    a: "Content strategy, copywriting, design, scheduling, DM management, appointment setting, LinkedIn ads, outreach campaigns, and monthly reporting — all included.",
  },
  {
    q: "How do you manage my DMs?",
    a: "We use a shared system where our team manages initial conversations, qualifies leads based on your criteria, and books calls directly onto your calendar.",
  },
  {
    q: "Do you manage LinkedIn ad campaigns?",
    a: "Yes. We create, manage, and optimize LinkedIn ad campaigns designed to boost your highest-performing organic content to your ideal prospects.",
  },
  {
    q: "What type of content will you create?",
    a: "Text posts, carousels, infographics, short-form video scripts, and lead magnets — all crafted in your authentic voice from founder interviews.",
  },
  {
    q: "How does the lead magnet strategy work?",
    a: "We create high-value free resources (guides, templates, frameworks) that drive inbound connections and newsletter signups from your ideal clients.",
  },
  {
    q: "How do you ensure lead quality?",
    a: "Through precise targeting, custom qualification criteria, and a multi-touch nurture process. We only book calls with prospects who match your ideal client profile.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="grid-pattern grid-pattern-left py-20 px-4 bg-surface">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Frequently Asked{" "}
            <span className="highlight">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-surface-light rounded-none border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`accordion-content ${openIndex === i ? "open" : ""}`}
              >
                <div className="px-5 pb-5 pt-0">
                  <p className="text-sm text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
