"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const ROTATIONS = [-3.5, 1.8, -1.2, 2.8, -2.4];
const Y_OFFSETS = [12, -6, 18, -10, 8];

const services = [
  {
    number: 1,
    title: "Founder Interviews",
    description:
      "We interview founders monthly to extract unique insights, stories, and perspectives that fuel authentic content.",
  },
  {
    number: 2,
    title: "Content Planning & Publishing",
    description:
      "Strategic content planning, copywriting, design, and scheduling — all done for you on a weekly cadence.",
  },
  {
    number: 3,
    title: "DM Management & Appointment Setting",
    description:
      "We manage your LinkedIn inbox, qualify leads, and book calls directly onto your calendar.",
  },
  {
    number: 4,
    title: "Targeted LinkedIn Ads",
    description:
      "Low-cost, high-impact LinkedIn ad campaigns that boost your best content to ideal prospects.",
  },
  {
    number: 5,
    title: "Hyper-Personalized Outreach",
    description:
      "Scaled outbound campaigns that feel personal — targeting decision makers with tailored messaging.",
  },
];

export default function FullSystem() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const noteTextColor = "#EDEDED";
  const width = 310;
  const height = 280;
  const cornerRadius = 9;
  const paddingX = 20;
  const paddingY = 27;
  const cardGap = 2;
  const rowGap = -80;
  const titleSize = 16;
  const bodySize = 22;
  const cardBackground = "#0178FA";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const renderCard = (service: (typeof services)[number], index: number) => (
    <div
      key={service.title}
      className={`sticky-note ${isVisible ? "is-visible" : ""}`}
      style={
        {
          "--note-rotation": `${ROTATIONS[index]}deg`,
          "--note-y-offset": `${Y_OFFSETS[index]}px`,
          "--note-delay": `${index * 120}ms`,
          width: `${width}px`,
          height: `${height}px`,
          minHeight: "unset",
          borderRadius: `${cornerRadius}px`,
          padding: `${paddingY}px ${paddingX}px`,
          background: cardBackground,
        } as CSSProperties
      }
    >
      {/* Header: badge + underlined monospace title */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "1.25rem" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: noteTextColor,
            color: "#111",
            fontFamily: "var(--font-martian-mono), monospace",
            fontWeight: 700,
            fontSize: titleSize - 2,
            borderRadius: 0,
            width: `${titleSize + 10}px`,
            height: `${titleSize + 10}px`,
            padding: 0,
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          #{service.number}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-martian-mono), monospace",
            fontWeight: 700,
            fontSize: titleSize,
            color: noteTextColor,
            borderBottom: `2px solid ${noteTextColor}`,
            paddingBottom: "2px",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {service.title}
        </h3>
      </div>

      {/* Large bold body text */}
      <p
        style={{
          fontWeight: 700,
          fontSize: bodySize,
          lineHeight: 1.35,
          color: noteTextColor,
          margin: 0,
        }}
      >
        {service.description}
      </p>
    </div>
  );

  return (
    <section ref={sectionRef} id="agency" className="hero-left grid-pattern grid-pattern-left py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Our <span className="highlight">System</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Everything you need to turn LinkedIn into a predictable, profitable
            channel — without lifting a finger.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${rowGap}px`,
          }}
        >
          <div
            className="sticky-note-board"
            style={{
              gap: `${cardGap}px`,
              flexWrap: "nowrap",
              width: `${width * 3 + cardGap * 2}px`,
              maxWidth: "100%",
              margin: "0 auto",
              padding: 0,
            }}
          >
            {services.slice(0, 3).map((service, index) => renderCard(service, index))}
          </div>

          <div
            className="sticky-note-board"
            style={{
              gap: `${cardGap}px`,
              flexWrap: "nowrap",
              width: `${width * 2 + cardGap}px`,
              maxWidth: "100%",
              margin: "0 auto",
              padding: 0,
            }}
          >
            {services.slice(3).map((service, index) => renderCard(service, index + 3))}
          </div>
        </div>
      </div>
    </section>
  );
}
