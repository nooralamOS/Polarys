'use client'

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    day: 'Day 1',
    title: 'Kickoff Alignment Call',
    description:
      'We align on goals, positioning, and target audience to build a tailored strategy.',
    dates: [9],
  },
  {
    day: 'Day 2',
    title: 'Account & Competitor Audits',
    description:
      'Deep dive into your profile, competitors, and market to find untapped opportunities.',
    dates: [10],
  },
  {
    day: 'Day 3',
    title: 'Positioning & Messaging',
    description:
      'Refine your personal brand messaging to resonate with your ideal clients.',
    dates: [11],
  },
  {
    day: 'Day 4',
    title: 'Live Profile Updates',
    description:
      'We optimize your LinkedIn profile — headline, about section, featured, and banner.',
    dates: [14],
  },
  {
    day: 'Day 5–6',
    title: 'First Content Published',
    description:
      'Your first batch of content goes live — posts, carousels, or video tailored to your voice.',
    dates: [15, 16],
  },
  {
    day: 'Day 7',
    title: 'Outreach Campaign Launch',
    description:
      'Personalized outreach begins — connecting with ideal prospects at scale.',
    dates: [17],
  },
];

const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// April 2026 — starts on Wednesday (col index 3)
const APRIL_ROWS: (number | null)[][] = [
  [null, null, null,    1,    2,    3,    4],
  [   5,    6,    7,    8,    9,   10,   11],
  [  12,   13,   14,   15,   16,   17,   18],
  [  19,   20,   21,   22,   23,   24,   25],
  [  26,   27,   28,   29,   30, null, null],
];

const ALL_STEP_DATES = new Set([9, 10, 11, 14, 15, 16, 17]);
const TODAY = 8;
const CARD_BLUE = '#0178FA';
const CARD_TEXT = '#EDEDED';
const STEP_SCROLL_THRESHOLD_PX = 120;
const STEP_CHANGE_COOLDOWN_MS = 260;
const EDGE_PAUSE_MS = 650;

type CellStatus = 'empty' | 'active' | 'done' | 'upcoming' | 'today' | 'past' | 'neutral';

function getCellClass(status: CellStatus): string {
  switch (status) {
    case 'active':   return 'bg-accent text-white font-bold';
    case 'done':     return 'text-accent/50 font-semibold';
    case 'upcoming': return 'text-foreground/50 font-medium';
    case 'today':    return 'text-muted/50';
    case 'past':     return 'text-muted/20';
    default:         return 'text-muted/25';
  }
}

export default function First7Days() {
  const sectionRef = useRef<HTMLElement>(null);
  const wheelAccumRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const stepCooldownUntilRef = useRef(0);
  const edgePauseUntilRef = useRef(0);
  const edgePauseDirectionRef = useRef<1 | -1 | 0>(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = steps.length - 1;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const isSectionEngaged = () => {
      const section = sectionRef.current;
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      const topLockLine = window.innerHeight * 0.2;
      const bottomLockLine = window.innerHeight * 0.8;
      return rect.top <= topLockLine && rect.bottom >= bottomLockLine;
    };

    const applyStepDelta = (deltaY: number) => {
      if (!isSectionEngaged() || deltaY === 0) return false;

      const direction: 1 | -1 = deltaY > 0 ? 1 : -1;
      const now = Date.now();
      const currentIndex = activeIndexRef.current;

      // Hold at boundaries to let the final/first state breathe before release.
      const edgePauseStillActive = now < edgePauseUntilRef.current;
      if (edgePauseStillActive && edgePauseDirectionRef.current === direction) {
        return true;
      }

      // If the edge pause is done and user keeps moving in that direction, release scroll.
      if (direction === 1 && currentIndex === lastIndex) return false;
      if (direction === -1 && currentIndex === 0) return false;

      wheelAccumRef.current += deltaY;

      // Prevent rapid-fire skipping on high momentum scroll devices.
      if (now < stepCooldownUntilRef.current) return true;

      if (Math.abs(wheelAccumRef.current) >= STEP_SCROLL_THRESHOLD_PX) {
        const nextIndex =
          wheelAccumRef.current > 0
            ? Math.min(lastIndex, currentIndex + 1)
            : Math.max(0, currentIndex - 1);

        if (nextIndex !== currentIndex) {
          setActiveIndex(nextIndex);
          activeIndexRef.current = nextIndex;
          stepCooldownUntilRef.current = now + STEP_CHANGE_COOLDOWN_MS;
        }

        wheelAccumRef.current = 0;

        // Pause briefly at both ends before unlocking page scroll.
        if (nextIndex === lastIndex && direction === 1) {
          edgePauseUntilRef.current = now + EDGE_PAUSE_MS;
          edgePauseDirectionRef.current = 1;
        } else if (nextIndex === 0 && direction === -1) {
          edgePauseUntilRef.current = now + EDGE_PAUSE_MS;
          edgePauseDirectionRef.current = -1;
        } else {
          edgePauseDirectionRef.current = 0;
        }
      }

      return true;
    };

    const onWheel = (event: WheelEvent) => {
      const didCapture = applyStepDelta(event.deltaY);
      if (didCapture) event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const keyToDelta: Record<string, number> = {
        ArrowDown: 80,
        PageDown: 120,
        ' ': event.shiftKey ? -120 : 120,
        ArrowUp: -80,
        PageUp: -120,
      };

      const delta = keyToDelta[event.key];
      if (delta === undefined) return;

      const didCapture = applyStepDelta(delta);
      if (didCapture) event.preventDefault();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      if (currentY == null || touchStartYRef.current == null) return;
      const deltaY = touchStartYRef.current - currentY;
      const didCapture = applyStepDelta(deltaY);
      if (didCapture) {
        event.preventDefault();
        touchStartYRef.current = currentY;
      }
    };

    const onScroll = () => {
      // Reset accumulation when outside section to avoid stale momentum jumps.
      if (!isSectionEngaged()) {
        wheelAccumRef.current = 0;
        edgePauseDirectionRef.current = 0;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [lastIndex]);

  const step = steps[activeIndex];
  const activeDates = new Set(step.dates);

  const doneDates = new Set<number>();
  steps.slice(0, activeIndex).forEach(s => s.dates.forEach(d => doneDates.add(d)));

  const getCellStatus = (day: number | null): CellStatus => {
    if (day === null)         return 'empty';
    if (activeDates.has(day)) return 'active';
    if (doneDates.has(day))   return 'done';
    if (day === TODAY)        return 'today';
    if (day < TODAY)          return 'past';
    if (ALL_STEP_DATES.has(day)) return 'upcoming';
    return 'neutral';
  };

  return (
    <section
      ref={sectionRef}
      id="first-7-days"
      className="grid-pattern grid-pattern-left relative overflow-visible pt-20 pb-4 px-4"
    >
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          The <span className="highlight">First 7 Days</span>
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          A day-by-day launch sequence that takes your LinkedIn from setup to outreach in one focused week.
        </p>
      </div>

      <div className="sticky top-16 z-10 min-h-[84vh] flex items-center">
        <div className="max-w-6xl mx-auto w-full border border-border bg-black/35 backdrop-blur-[1px] overflow-hidden shadow-[0_24px_65px_rgba(0,0,0,0.45)]">
          <div className="flex min-h-[560px] overflow-hidden">

            {/* ── Left panel ── */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-8 lg:p-10 xl:p-12 border-r border-border bg-black/10">
              <div
                className="w-full max-w-[510px] p-6 md:p-8 lg:p-9 shadow-[0_14px_40px_rgba(0,0,0,0.30)]"
                style={{
                  borderRadius: 10,
                  background: CARD_BLUE,
                }}
              >

                {/* Static eyebrow */}
                <p
                  className="text-xs font-bold uppercase tracking-[0.18em] mb-7"
                  style={{ fontFamily: 'var(--font-subtext)', color: 'rgba(237,237,237,0.8)' }}
                >
                  Your First 7 Days
                </p>

                {/* Animated day content */}
                <div key={activeIndex} className="seven-days-enter">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="inline-flex items-center justify-center text-sm font-bold"
                      style={{
                        width: 32,
                        height: 32,
                        color: '#111',
                        background: CARD_TEXT,
                        fontFamily: 'var(--font-martian-mono), monospace',
                      }}
                    >
                      #{activeIndex + 1}
                    </span>
                    <p
                      className="font-semibold leading-none tracking-tight"
                      style={{
                        color: CARD_TEXT,
                        fontFamily: 'var(--font-martian-mono), monospace',
                        fontSize: '1.15rem',
                        borderBottom: `2px solid ${CARD_TEXT}`,
                        paddingBottom: 2,
                      }}
                    >
                      {step.day}
                    </p>
                  </div>

                  {/* Info card */}
                  <div className="border border-white/30 bg-black/10 px-5 py-4">
                    <h3
                      className="font-semibold tracking-tight mb-2 leading-tight"
                      style={{
                        color: CARD_TEXT,
                        fontFamily: 'var(--font-martian-mono), monospace',
                        fontSize: '1.2rem',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="leading-relaxed font-semibold" style={{ color: CARD_TEXT, fontSize: '1.12rem' }}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="flex gap-2 mt-8">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className="h-[2px] transition-all duration-500"
                      style={{
                        width: i === activeIndex ? 44 : 18,
                        background:
                          i < activeIndex
                            ? 'rgba(237,237,237,0.62)'
                            : i === activeIndex
                              ? CARD_TEXT
                              : 'rgba(237,237,237,0.25)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right panel — Calendar ── */}
            <div className="flex-1 hidden md:flex items-center justify-center p-6 md:p-8 lg:p-10 xl:p-12 bg-black/20">
              <div
                className="w-full max-w-[350px] p-6 border border-white/20 bg-black/15"
                style={{ borderRadius: 10 }}
              >
                {/* Month header */}
                <div className="flex items-center justify-between mb-8">
                  <button
                    disabled
                    className="text-muted/35 cursor-default text-2xl select-none leading-none"
                    aria-hidden="true"
                  >
                    ‹
                  </button>
                  <span className="text-[1.8rem] font-semibold tracking-tight" style={{ color: CARD_TEXT }}>
                    April 2026
                  </span>
                  <button
                    disabled
                    className="text-muted/35 cursor-default text-2xl select-none leading-none"
                    aria-hidden="true"
                  >
                    ›
                  </button>
                </div>

                {/* Day-of-week headers */}
                <div className="grid grid-cols-7 mb-2">
                  {WEEK_DAYS.map(d => (
                    <div
                      key={d}
                      className="text-center text-[11px] font-bold tracking-[0.14em] py-1"
                      style={{ fontFamily: 'var(--font-subtext)', color: 'rgba(237,237,237,0.58)' }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Date grid */}
                {APRIL_ROWS.map((row, ri) => (
                  <div key={ri} className="grid grid-cols-7">
                    {row.map((day, ci) => {
                      const status = getCellStatus(day);
                      if (status === 'empty') return <div key={`${ri}-${ci}`} />;

                      return (
                        <div key={`${ri}-${ci}`} className="flex flex-col items-center py-[3px]">
                          <div
                            className={`w-10 h-10 flex items-center justify-center text-lg transition-all duration-300 ${getCellClass(status)}`}
                          >
                            {day}
                          </div>
                          {status === 'today' && (
                            <div
                              style={{
                                width: 3,
                                height: 3,
                                background: 'var(--text-muted)',
                                opacity: 0.45,
                                marginTop: 2,
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
