"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Our System", href: "#agency", center: false },
  { label: "Clients", href: "#clients", center: true },
  { label: "Your Timeline", href: "#first-7-days", center: false },
  { label: "Pricing", href: "#pricing", center: true },
];

function scrollToCenter(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/logo_png.png"
            alt="Polarys"
            width={120}
            height={40}
            className="h-5 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href, center }) => (
            <a
              key={href}
              href={href}
              className="text-xs text-secondary hover:text-foreground transition-colors px-2 py-1"
              onClick={center ? (e) => { e.preventDefault(); scrollToCenter(href); } : undefined}
            >
              {label}
            </a>
          ))}
          <a
            href="https://calendly.com/sohaib-polarys/30-minute-meeting"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#0178FA",
              color: "#EDEDED",
              fontFamily: "var(--font-martian-mono), monospace",
              fontWeight: 700,
              borderRadius: 9,
              fontSize: 13,
              padding: "8px 18px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Book Call
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-secondary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4 flex flex-col gap-2">
          {NAV_LINKS.map(({ label, href, center }) => (
            <a
              key={href}
              href={href}
              className="block mt-2 text-sm text-secondary hover:text-foreground transition-colors"
              onClick={center ? (e) => { e.preventDefault(); setOpen(false); scrollToCenter(href); } : () => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="https://calendly.com/sohaib-polarys/30-minute-meeting"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              background: "#0178FA",
              color: "#EDEDED",
              fontFamily: "var(--font-martian-mono), monospace",
              fontWeight: 700,
              borderRadius: 9,
              fontSize: 13,
              padding: "8px 18px",
              textDecoration: "none",
              display: "block",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Book Call
          </a>
        </div>
      )}
    </header>
  );
}
