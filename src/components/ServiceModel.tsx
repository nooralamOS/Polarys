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

export default function ServiceModel() {
  const noteTextColor = "#EDEDED";
  const cardBackground = "#1C1C1C";
  const cornerRadius = 9;

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
          <div
            className="p-8 shadow-lg shadow-accent/15"
            style={{
              borderRadius: `${cornerRadius}px`,
              background: cardBackground,
              border: "2px solid #0178FA",
            }}
          >
            <h3
              className="mb-2"
              style={{
                fontFamily: "var(--font-martian-mono), monospace",
                fontWeight: 700,
                fontSize: "2rem",
                color: noteTextColor,
                lineHeight: 1.1,
              }}
            >
              {pricingModel.title}
            </h3>
            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-martian-mono), monospace",
                fontSize: "0.95rem",
                color: noteTextColor,
                opacity: 0.9,
                lineHeight: 1.5,
              }}
            >
              {pricingModel.subtitle}
            </p>

            <p
              className="mb-4 uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-martian-mono), monospace",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: noteTextColor,
                opacity: 0.95,
              }}
            >
              Ideal for
            </p>
            <ul className="space-y-3">
              {pricingModel.audience.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3"
                  style={{
                    color: noteTextColor,
                    fontFamily: "var(--font-martian-mono), monospace",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                  }}
                >
                  <Check className="w-4 h-4 shrink-0" style={{ color: noteTextColor }} />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#book-call"
              className="mt-8 block text-center font-semibold text-sm px-6 py-3 transition-colors hover:opacity-95"
              style={{
                borderRadius: `${cornerRadius}px`,
                fontFamily: "var(--font-martian-mono), monospace",
                background: noteTextColor,
                color: "#111",
              }}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
