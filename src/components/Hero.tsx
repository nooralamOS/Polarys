"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
const STATS_STYLE = {
  numberSize: 51,
  labelSize: 19,
  labelPaddingTop: 13,
  numberLabelGap: 5,
  statGap: 38,
  plus: { size: 56, paddingRight: 4, paddingBottom: 0, offsetY: -4 },
}
const STATS_STYLE_MOBILE = {
  numberSize: 30,
  labelSize: 11,
  labelPaddingTop: 8,
  numberLabelGap: 3,
  statGap: 20,
  plus: { size: 33, paddingRight: 2, paddingBottom: 0, offsetY: -2 },
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const p = isMobile ? STATS_STYLE_MOBILE : STATS_STYLE

  const d = { letterSpacing: 0.035, symbolGap: 0.095 };

  const dial = { offsetY: 0 };

const params = {
    padding: { top: 150, bottom: 0 },
    svg: {
      widthPx:    isMobile ? 1600 : 990,
      opacity:    isMobile ? 0.14 : 0.2,
      left:       isMobile ? -200 : -80,
      translateY: isMobile ? -49  : -50,
    },
  }

  return (
    <section
      className="hero grid-pattern grid-pattern-right px-4 relative overflow-hidden"
      style={{
        paddingTop: params.padding.top,
        paddingBottom: params.padding.bottom,
      }}
    >
      {/* Decorative logo outline */}
      <Image
        src="/logo-outline.svg"
        alt=""
        aria-hidden="true"
        width={418}
        height={421}
        className="absolute pointer-events-none select-none z-[1] h-auto"
        style={{
          width: `${params.svg.widthPx}px`,
          opacity: params.svg.opacity,
          left: params.svg.left,
          top: "50%",
          transform: `translateY(${params.svg.translateY}%)`,
        }}
        priority
      />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          <span className="sm:hidden">
            We turn your<br />LinkedIn into a<br /><span className="highlight">consistent revenue</span><br />machine.
          </span>
          <span className="hidden sm:inline">
            We turn your LinkedIn<br />into a <span className="highlight">consistent revenue</span> machine.
          </span>
        </h1>

        {/* Social proof bar */}
        <div className="mt-10 mb-12" style={{ transform: `translateY(${dial.offsetY}px)` }}>
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-2 px-4 py-1 sm:px-6">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <span className="font-semibold uppercase tracking-[0.24em] text-muted whitespace-nowrap" style={{ fontSize: "clamp(0.6rem, 2.2vw, 0.75rem)" }}>
                Trusted by founders backed by
              </span>
              <div className="flex items-center" style={{ gap: isMobile ? 23 : 12 }}>
                <Image
                  src="/backed_by/Y_Combinator_logo.svg.png"
                  alt="Y Combinator"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <Image
                  src="/backed_by/speedinvest_logo.png"
                  alt="Speedinvest"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <Image
                  src="/backed_by/a16z_logo.jpg"
                  alt="a16z"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <Image
                  src="/backed_by/softbank.png"
                  alt="SoftBank"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
            </div>

            <div className="h-px w-full max-w-md bg-border/70" />

            <div
              className="flex flex-nowrap items-start justify-center"
              style={{ gap: p.statGap }}
            >
              {[
                { number: '+40',  label: 'TRUSTED\nFOUNDERS' },
                { number: '+$50M', label: 'PIPELINE\nGENERATED' },
              ].map(({ number, label }) => (
                <div
                  key={label}
                  className="flex items-start text-left leading-none"
                  style={{ gap: p.numberLabelGap }}
                >
                  <p
                    className="font-extrabold text-foreground"
                    style={{ fontSize: p.numberSize, letterSpacing: `${d.letterSpacing}em`, whiteSpace: 'nowrap' }}
                  >
                    <span
                      className="text-accent inline-block"
                      style={{
                        fontSize: p.plus.size,
                        paddingRight: p.plus.paddingRight,
                        paddingBottom: p.plus.paddingBottom,
                        transform: `translateY(${p.plus.offsetY}px)`,
                      }}
                    >+</span>{(() => {
                      const text = number.replace('+', '');
                      if (!text.startsWith('$')) return text;
                      return <>
                        <span style={{ letterSpacing: `${d.symbolGap}em` }}>$</span>{text.slice(1)}
                      </>;
                    })()}
                  </p>
                  <p
                    className="font-bold uppercase tracking-[0.08em] text-foreground leading-[0.95]"
                    style={{ fontSize: p.labelSize, paddingTop: p.labelPaddingTop }}
                  >
                    {label.split('\n').map((line, i) => (
                      <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a
          href="https://calendly.com/sohaib-polarys/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#0178FA",
            color: "#EDEDED",
            fontFamily: "var(--font-martian-mono), monospace",
            fontWeight: 700,
            borderRadius: 9,
            fontSize: 16,
            padding: "14px 32px",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: 64,
          }}
        >
          Book Call
        </a>

      </div>
    </section>
  );
}
