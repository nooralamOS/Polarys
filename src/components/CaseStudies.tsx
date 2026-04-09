"use client";

import { useState } from "react";
import { ChevronDown, Play } from "lucide-react";

const caseStudies = [
  {
    result: "$1M in revenue",
    type: "B2B Paid Ads Agency",
    audience: "E-commerce brands doing $1M+/yr",
    description:
      "Transformed their LinkedIn presence from zero to a consistent lead generation machine in under 6 months.",
  },
  {
    result: "$600k in 90 days",
    type: "Business Consultant",
    audience: "Series A-C funded startups",
    description:
      "Leveraged founder-led content and targeted outreach to fill the pipeline with high-ticket consulting clients.",
  },
  {
    result: "$400k pipeline",
    type: "Lead Generation Agency",
    audience: "SaaS companies with 50-200 employees",
    description:
      "Built a repeatable system of content + outreach that generated a $400k pipeline within the first quarter.",
  },
  {
    result: "$300k closed",
    type: "eCommerce Agency",
    audience: "D2C brands scaling past $5M/yr",
    description:
      "Positioned the founder as a thought leader, driving inbound leads that converted at 3x their previous rate.",
  },
  {
    result: "$250k revenue",
    type: "Advertising Agency",
    audience: "B2B SaaS marketing teams",
    description:
      "Combined LinkedIn Lives with a micro-offer strategy that consistently filled their webinar pipeline.",
  },
  {
    result: "$100k ARR",
    type: "Startup SaaS",
    audience: "Angel investors and early adopters",
    description:
      "Used personal brand content to attract both users and investors, closing a seed round alongside customer growth.",
  },
];

export default function CaseStudies() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="resources" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Real <span className="highlight">Results</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Don&apos;t take our word for it. Here are real outcomes from real
            clients.
          </p>
        </div>

        <div className="space-y-4">
          {caseStudies.map((study, i) => (
            <div
              key={study.result}
              className="bg-surface border border-border rounded-none overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 bg-accent-light rounded-none flex items-center justify-center shrink-0">
                    <Play className="w-4 h-4 text-accent ml-0.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-lg font-bold whitespace-nowrap">{study.result}</span>
                      <span className="text-sm text-muted whitespace-nowrap">
                        — {study.type}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`accordion-content ${openIndex === i ? "open" : ""}`}
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Video placeholder */}
                    <div className="w-full sm:w-64 h-36 bg-surface-light rounded-none flex items-center justify-center shrink-0 border border-border">
                      <Play className="w-8 h-8 text-muted" />
                    </div>
                    <div>
                      <p className="text-sm text-secondary mb-3">
                        {study.description}
                      </p>
                      <p className="text-xs text-muted">
                        <span className="font-semibold text-secondary">
                          Target audience:
                        </span>{" "}
                        {study.audience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
