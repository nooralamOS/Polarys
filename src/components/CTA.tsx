export default function CTA() {
  return (
    <section id="book-call" className="grid-pattern grid-pattern-right py-24 px-4 bg-black/30">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Ready to Turn LinkedIn Into Your{" "}
          <span className="text-accent">#1 Growth Channel?</span>
        </h2>
        <p className="text-muted mb-10 max-w-xl mx-auto">
          Book a free strategy call and we will show you exactly how we can
          help you book 2-4 qualified calls per week from LinkedIn.
        </p>
        <a
          href="#"
          className="inline-block bg-accent hover:bg-accent-dark text-white font-bold text-lg px-10 py-4 rounded-none transition-colors shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
        >
          Book Your Free Call
        </a>
        <p className="mt-4 text-xs text-muted">
          No commitment required. 100% free strategy session.
        </p>
      </div>
    </section>
  );
}
