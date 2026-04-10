'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  {
    day: 'Day 1',
    title: 'Kickoff Alignment Call',
    description:
      'We align on goals, positioning, and target audience to build a tailored strategy.',
  },
  {
    day: 'Day 2',
    title: 'Account & Competitor Audits',
    description:
      'Deep dive into your profile, competitors, and market to find untapped opportunities.',
  },
  {
    day: 'Day 3',
    title: 'Positioning & Messaging',
    description:
      'Refine your personal brand messaging to resonate with your ideal clients.',
  },
  {
    day: 'Day 4',
    title: 'Live Profile Updates',
    description:
      'We optimize your LinkedIn profile — headline, about section, featured, and banner.',
  },
  {
    day: 'Day 5–6',
    title: 'First Content Published',
    description:
      'Your first batch of content goes live — posts, carousels, or video tailored to your voice.',
  },
  {
    day: 'Day 7',
    title: 'Outreach Campaign Launch',
    description:
      'Personalized outreach begins — connecting with ideal prospects at scale.',
  },
];

const CARD_BG = '#1C1C1C';
const CARD_TEXT = '#EDEDED';
const BADGE_BG = '#0178FA';
const BADGE_TEXT = '#EDEDED';
const LINE_COLOR = '#0178FA';

function CardContent({ item }: { item: typeof steps[0] }) {
  return (
    <>
      <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
        <span
          className="inline-flex items-center justify-center leading-none font-bold whitespace-nowrap flex-shrink-0"
          style={{
            color: BADGE_TEXT,
            background: BADGE_BG,
            fontFamily: 'var(--font-martian-mono), monospace',
            fontSize: 14,
            padding: '8px 8px',
          }}
        >
          {item.day}
        </span>
        <h3
          className="font-semibold tracking-tight"
          style={{
            color: CARD_TEXT,
            fontFamily: 'var(--font-martian-mono), monospace',
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          {item.title}
        </h3>
      </div>
      <p
        style={{
          color: CARD_TEXT,
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontWeight: 700,
          fontSize: 22,
          lineHeight: 1.4,
        }}
      >
        {item.description}
      </p>
    </>
  );
}

export default function First7Days() {
  const params = { cardGap: 50 };

  const mobile = { containerPaddingX: 11, cardGap: 18, rowGap: 17, cardPadding: 26 };


  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = i % 2 === 0;
        const dot = dotRefs.current[i];

        gsap.set(card, {
          x: isLeft ? -70 : 70,
          opacity: 0,
          rotateX: 18,
          transformPerspective: 900,
        });
        if (dot) gsap.set(dot, { scale: 0, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });

        if (dot) {
          tl.to(dot, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2.5)' });
        }
        tl.to(
          card,
          { x: 0, opacity: 1, rotateX: 0, duration: 0.75, ease: 'power3.out' },
          dot ? '-=0.15' : 0,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Position line from first dot center to last dot center
  useEffect(() => {
    const position = () => {
      const firstRow = rowRefs.current[0];
      const lastRow = rowRefs.current[steps.length - 1];
      const container = stepsContainerRef.current;
      const line = lineRef.current;
      if (!firstRow || !lastRow || !container || !line) return;

      const containerTop = container.getBoundingClientRect().top;
      const firstRowRect = firstRow.getBoundingClientRect();
      const lastRowRect = lastRow.getBoundingClientRect();
      const containerHeight = container.getBoundingClientRect().height;

      const lineTop = firstRowRect.top - containerTop + firstRowRect.height / 2;
      const lineBottom = containerHeight - (lastRowRect.top - containerTop + lastRowRect.height / 2);

      line.style.top = `${lineTop}px`;
      line.style.bottom = `${lineBottom}px`;
    };

    position();
    window.addEventListener('resize', position);
    return () => window.removeEventListener('resize', position);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="first-7-days"
      className="hero-left grid-pattern grid-pattern-left relative pt-20 pb-28 px-4"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.18)',
        borderBottom: '1px solid rgba(255,255,255,0.18)',
      }}
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Your <span className="highlight">Timeline</span>
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          A day-by-day launch sequence that takes your LinkedIn from setup to outreach in one focused week.
        </p>
      </div>

      {/* Mobile timeline — single column, no GSAP */}
      <div
        className="md:hidden mx-auto w-full"
        style={{ maxWidth: 576, paddingLeft: mobile.containerPaddingX, paddingRight: mobile.containerPaddingX }}
      >
        {steps.map((item, i) => (
          <div key={item.day} className="flex" style={{ gap: mobile.rowGap }}>
            {/* Dot + connecting lines column */}
            <div className="flex flex-col items-center" style={{ flexShrink: 0, width: 20 }}>
              {/* Top connector — transparent for first item so no line above first dot */}
              <div style={{ width: 2, height: 20, flexShrink: 0, background: i === 0 ? 'transparent' : LINE_COLOR }} />
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: LINE_COLOR,
                  border: '3px solid #111',
                  boxShadow: `0 0 0 2px ${LINE_COLOR}, 0 0 12px ${LINE_COLOR}66`,
                  flexShrink: 0,
                }}
              />
              {/* Bottom connector — fills remaining height, transparent after last dot */}
              <div style={{ flex: 1, width: 2, background: i < steps.length - 1 ? LINE_COLOR : 'transparent' }} />
            </div>
            {/* Card */}
            <div className="flex-1" style={{ paddingBottom: i < steps.length - 1 ? mobile.cardGap : 0 }}>
              <article
                style={{
                  padding: mobile.cardPadding,
                  borderRadius: 12,
                  background: CARD_BG,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.4)',
                  transform: `translateY(-14px)`,
                }}
              >
                <CardContent item={item} />
              </article>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop timeline — alternating left/right with GSAP */}
      <div ref={stepsContainerRef} className="hidden md:block max-w-5xl mx-auto w-full relative">
        {/* Vertical blue line — JS-positioned from first to last dot center */}
        <div
          ref={lineRef}
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2"
          style={{ width: 2, background: LINE_COLOR, position: 'absolute' }}
        />

        <div className="flex flex-col" style={{ gap: params.cardGap }}>
          {steps.map((item, i) => (
            <div
              key={item.day}
              ref={el => { rowRefs.current[i] = el; }}
              className="relative flex items-center"
            >
              {/* Left half */}
              <div className="flex-1 flex justify-end" style={{ paddingRight: 36 }}>
                {i % 2 === 0 && (
                  <article
                    ref={el => { cardRefs.current[i] = el; }}
                    style={{
                      maxWidth: 420,
                      width: '100%',
                      padding: 26,
                      borderRadius: 12,
                      background: CARD_BG,
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.4)',
                    }}
                  >
                    <CardContent item={item} />
                  </article>
                )}
              </div>

              {/* Center dot */}
              <div className="relative z-10 flex-shrink-0" style={{ width: 20 }}>
                <div
                  ref={el => { dotRefs.current[i] = el; }}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: LINE_COLOR,
                    border: '3px solid #111',
                    boxShadow: `0 0 0 2px ${LINE_COLOR}, 0 0 12px ${LINE_COLOR}66`,
                    margin: '0 auto',
                  }}
                />
              </div>

              {/* Right half */}
              <div className="flex-1 flex justify-start" style={{ paddingLeft: 36 }}>
                {i % 2 !== 0 && (
                  <article
                    ref={el => { cardRefs.current[i] = el; }}
                    style={{
                      maxWidth: 420,
                      width: '100%',
                      padding: 26,
                      borderRadius: 12,
                      background: CARD_BG,
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.4)',
                    }}
                  >
                    <CardContent item={item} />
                  </article>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
