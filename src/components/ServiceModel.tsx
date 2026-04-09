"use client";

import { Check } from "lucide-react";

const pricingModel = {
  title: "Done For You",
  subtitle:
    "A fully managed LinkedIn growth system where we own strategy, content, outreach, and pipeline execution end-to-end.",
  audience: [
    "$100k+/mo agencies",
    "$30k+/mo coaches & consultants",
    "Investor-backed SaaS founders",
  ],
};

const cardStyle = {
  borderRadius: "9px",
  background:   "#1C1C1C",
  border:       "3.1px solid #0178FA",
  padding:      "clamp(24px, 5vw, 39px) clamp(20px, 8vw, 63px)",
};

const textStyle = {
  fontFamily: "var(--font-martian-mono), monospace",
  fontSize:   "1.07rem",
  fontWeight: 700,
  color:      "#EDEDED",
};

const buttonStyle = {
  fontFamily:     "var(--font-martian-mono), monospace",
  fontSize:       "0.875rem",
  fontWeight:     700,
  padding:        "13px 20px",
  borderRadius:   "9px",
  background:     "#0478fa",
  color:          "#ededed",
  display:        "block",
  textAlign:      "center" as const,
  textDecoration: "none",
};

export default function ServiceModel() {
  return (
    <section id="pricing" className="grid-pattern grid-pattern-right py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            <span className="highlight">Pricing</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            One premium engagement for teams that want a complete LinkedIn
            revenue engine built and operated for them.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="shadow-lg shadow-accent/15" style={cardStyle}>
            <p
              className="mb-4 uppercase tracking-widest"
              style={{ ...textStyle, fontSize: "0.75rem", opacity: 0.95 }}
            >
              Ideal for
            </p>

            <ul className="space-y-3">
              {pricingModel.audience.map((item) => (
                <li key={item} className="flex items-center gap-3" style={textStyle}>
                  <Check className="w-4 h-4 shrink-0" style={{ color: "#EDEDED" }} />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6" style={{ ...textStyle, opacity: 0.9, lineHeight: 1.5 }}>
              {pricingModel.subtitle}
            </p>

            <a
              href="https://calendly.com/sohaib-polarys/30-minute-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 transition-opacity hover:opacity-90"
              style={buttonStyle}
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
