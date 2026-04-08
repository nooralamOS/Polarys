import Image from "next/image";

const STATS_STYLE = {
  numberSize: 51,
  labelSize: 19,
  labelPaddingTop: 13,
  numberLabelGap: 5,
  statGap: 38,
  plus: { size: 56, paddingRight: 4, paddingBottom: 0, offsetY: -4 },
}

export default function Hero() {
  const p = STATS_STYLE

  return (
    <section className="hero grid-pattern grid-pattern-right pt-28 pb-16 md:pt-36 md:pb-24 px-4 relative overflow-hidden">
      {/* Decorative logo outline */}
      <Image
        src="/logo-outline.svg"
        alt=""
        aria-hidden="true"
        width={418}
        height={421}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[40vw] max-w-[980px] h-auto opacity-10 pointer-events-none select-none z-[1]"
        priority
      />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          We turn your LinkedIn
          <br />
          into a <span className="highlight">consistent revenue</span> machine.
        </h1>

        {/* Social proof bar */}
        <div className="mt-10 mb-12">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 px-4 py-3 sm:px-6">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted text-center sm:text-left">
                Trusted by founders backed by
              </span>
              <div className="flex items-center gap-3">
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
              className="flex flex-wrap items-start justify-center"
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
                    className="font-extrabold tracking-tight text-foreground"
                    style={{ fontSize: p.numberSize }}
                  >
                    <span
                      className="text-accent inline-block"
                      style={{
                        fontSize: p.plus.size,
                        paddingRight: p.plus.paddingRight,
                        paddingBottom: p.plus.paddingBottom,
                        transform: `translateY(${p.plus.offsetY}px)`,
                      }}
                    >+</span>{number.replace('+', '')}
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

      </div>
    </section>
  );
}
