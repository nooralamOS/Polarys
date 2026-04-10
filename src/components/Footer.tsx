import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row items-center justify-between md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4" style={{ paddingLeft: 8 }}>
              <Image
                src="/logo_png.png"
                alt="Polarys"
                width={120}
                height={40}
                className="h-5 w-auto"
              />
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2" style={{ paddingRight: 8 }}>
            <a
              href="https://www.linkedin.com/company/polarysio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-muted hover:text-foreground transition-colors"
              aria-label="Polarys on LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.33 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted">
            &copy; Polarys 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
