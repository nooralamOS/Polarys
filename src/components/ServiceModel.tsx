"use client";

import { Check } from "lucide-react";
import { useDialKit } from "dialkit";

const FONTS: Record<string, string> = {
  "Helvetica Neue": '"Helvetica Neue", Helvetica, Arial, sans-serif',
  "Georgia":        "Georgia, serif",
  "Courier New":    '"Courier New", Courier, monospace',
  "Martian Mono":   "var(--font-martian-mono), monospace",
  "system-ui":      "system-ui, sans-serif",
};

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

export default function ServiceModel() {
  const p = useDialKit("Pricing Card", {
    card: {
      paddingX:     [63, 8, 80],
      paddingY:     [39, 8, 80],
      cornerRadius: [9, 0, 40],
      borderWidth:  [3.1, 0, 8],
      borderColor:  { type: "color", default: "#0178FA" },
      background:   { type: "color", default: "#1C1C1C" },
    },
    text: {
      font: {
        type:    "select",
        options: Object.keys(FONTS),
        default: "Martian Mono",
      },
      size:   [1.07, 0.7, 1.6],
      color:  { type: "color", default: "#EDEDED" },
    },
    button: {
      font: {
        type:    "select",
        options: Object.keys(FONTS),
        default: "Martian Mono",
      },
      fontSize:     [0.875, 0.65, 1.4],
      paddingX:     [20, 4, 64],
      paddingY:     [13, 4, 40],
      cornerRadius: [9, 0, 40],
      background:   { type: "color", default: "#0478fa" },
      color:        { type: "color", default: "#ededed" },
    },
  });

  const cardStyle = {
    borderRadius: `${p.card.cornerRadius}px`,
    background:   p.card.background,
    border:       `${p.card.borderWidth}px solid ${p.card.borderColor}`,
    padding:      `${p.card.paddingY}px ${p.card.paddingX}px`,
  };

  const textStyle = {
    fontFamily: FONTS[p.text.font] ?? FONTS["Helvetica Neue"],
    fontSize:   `${p.text.size}rem`,
    fontWeight: 700,
    color:      p.text.color,
  };

  const buttonStyle = {
    fontFamily:   FONTS[p.button.font] ?? FONTS["Helvetica Neue"],
    fontSize:     `${p.button.fontSize}rem`,
    fontWeight:   700,
    padding:      `${p.button.paddingY}px ${p.button.paddingX}px`,
    borderRadius: `${p.button.cornerRadius}px`,
    background:   p.button.background,
    color:        p.button.color,
    display:      "block",
    textAlign:    "center" as const,
    textDecoration: "none",
  };

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
                  <Check className="w-4 h-4 shrink-0" style={{ color: p.text.color }} />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6" style={{ ...textStyle, opacity: 0.9, lineHeight: 1.5 }}>
              {pricingModel.subtitle}
            </p>

            <a href="#book-call" className="mt-8 transition-opacity hover:opacity-90" style={buttonStyle}>
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
