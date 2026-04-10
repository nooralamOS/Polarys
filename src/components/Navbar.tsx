"use client";

import Image from "next/image";

export default function Navbar() {
  const params = { logoHeight: 23, offsetX: 8, offsetY: -1 };

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
            style={{ height: params.logoHeight, width: "auto", transform: `translate(${params.offsetX}px, ${params.offsetY}px)` }}
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#system" className="text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace" }}>Our System</a>
          <a href="#clients" className="text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace" }}>Clients</a>
          <a href="#timeline" className="text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace" }}>Your Timeline</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-martian-mono), monospace" }}>Pricing</a>
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
    </header>
  );
}
