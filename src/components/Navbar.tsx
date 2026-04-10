"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";

export default function Navbar() {
  const logoParams = { logoSize: 23, offsetX: 8, offsetY: -1 };
  const [isIOSWebKit, setIsIOSWebKit] = useState(false);

  useEffect(() => {
    // iOS browsers (including Chrome/Firefox) run on WebKit and do not
    // reliably support backdrop-filter with SVG URL references.
    setIsIOSWebKit(/iP(hone|ad|od)/.test(navigator.userAgent));
  }, []);
  const getNavbarHeight = () =>
    document.getElementById("site-navbar")?.getBoundingClientRect().height ?? 0;

  const scrollToSection = (sectionId: string, align: "center" | "below-navbar") => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const navbarHeight = getNavbarHeight();
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + sectionRect.top;
    let targetY = sectionTop - navbarHeight;

    if (align === "center") {
      // Place the section midpoint at the viewport midpoint.
      const sectionMidpoint = sectionTop + sectionRect.height / 2;
      targetY = sectionMidpoint - window.innerHeight / 2;
    }

    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const clampedY = Math.min(Math.max(0, targetY), Math.max(0, maxY));

    window.history.pushState(null, "", `#${sectionId}`);
    window.scrollTo({ top: clampedY, behavior: "smooth" });
  };

  const handleSectionClick =
    (sectionId: string, align: "center" | "below-navbar") =>
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      scrollToSection(sectionId, align);
    };

  return (
    <>
      {/* SVG filter for ASCII pixelation backdrop */}
      <svg
        aria-hidden="true"
        style={{ position: "fixed", width: 0, height: 0, overflow: "hidden", top: 0, left: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="ascii-pixelate"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feFlood x="2" y="3" height="1" width="1" />
            <feComposite width="5" height="8" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="2 3" />
          </filter>
        </defs>
      </svg>

      <header
        id="site-navbar"
        className="fixed top-0 left-0 right-0 z-50 border-b border-border overflow-hidden"
        style={{
          backdropFilter: isIOSWebKit ? "blur(2px) contrast(1.08)" : "url(#ascii-pixelate)",
          WebkitBackdropFilter: isIOSWebKit ? "blur(2px) contrast(1.08)" : "url(#ascii-pixelate)",
          background: "rgba(12, 12, 12, 0.88)",
        }}
      >
        {/* Character-cell grid overlay — horizontal rows + vertical columns at ASCII proportions */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: [
              "repeating-linear-gradient(0deg, transparent 0px, transparent 7px, rgba(166,166,166,0.05) 7px, rgba(166,166,166,0.15) 8px)",
              "repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(166,166,166,0.03) 4px, rgba(166,166,166,0.13) 5px)",
            ].join(", "),
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/logo_png.png"
              alt="Polarys"
              width={416}
              height={416}
              style={{
                height: logoParams.logoSize,
                width: logoParams.logoSize,
                transform: `translate(${logoParams.offsetX}px, ${logoParams.offsetY}px)`,
              }}
            />
          </a>

          <div className="ml-auto flex items-center gap-9">
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center justify-end gap-6">
              <a href="#agency" onClick={handleSectionClick("agency", "center")} className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace", fontSize: 12 }}>Our System</a>
              <a href="#clients" onClick={handleSectionClick("clients", "center")} className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace", fontSize: 12 }}>Clients</a>
              <a href="#first-7-days" onClick={handleSectionClick("first-7-days", "below-navbar")} className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace", fontSize: 12 }}>Your Timeline</a>
              <a href="#pricing" onClick={handleSectionClick("pricing", "center")} className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace", fontSize: 12 }}>Pricing</a>
            </nav>

            {/* Book Call */}
            <a
              href="https://calendly.com/sohaib-polarys/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#0178FA",
                color: "#EDEDED",
                fontFamily: "var(--font-martian-mono), monospace",
                fontWeight: 700,
                fontSize: 12,
                padding: "7px 12px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Book Call
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
