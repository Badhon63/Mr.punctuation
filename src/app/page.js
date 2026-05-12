import Link from "next/link";
 
export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Background decorative element */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--ink) 0, var(--ink) 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
 
      <div className="max-w-3xl w-full text-center relative fade-up">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="badge-gold">Free Grammar Tool</span>
        </div>
 
        {/* Headline */}
        <h1
          className="font-display text-7xl md:text-8xl leading-none mb-6"
          style={{ color: "var(--ink)" }}
        >
          Mr.
          <br />
          <span style={{ color: "var(--gold)" }}>Punctuation</span>
        </h1>
 
        <div className="divider-gold max-w-xs mx-auto" />
 
        <p
          className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto fade-up-delay"
          style={{ color: "var(--muted)" }}
        >
          Fix grammar, punctuation, and sentence structure instantly.
          Download corrected text as PDF or TXT — works offline too.
        </p>
 
        <div className="flex flex-wrap gap-4 justify-center fade-up-delay-2">
          <Link href="/login">
            <button className="btn-ink text-base px-8 py-3">
              Get Started →
            </button>
          </Link>
          <Link href="/editor">
            <button className="btn-outline text-base px-8 py-3">
              Try Editor
            </button>
          </Link>
        </div>
 
        {/* Feature pills */}
        <div className="flex flex-wrap gap-3 justify-center mt-14 fade-up-delay-2">
          {["AI-Powered Corrections", "PDF Download", "Works Offline", "Free to Use"].map(
            (f) => (
              <span
                key={f}
                className="text-sm px-4 py-1.5 rounded-full"
                style={{
                  border: "1.5px solid #ccc6b8",
                  color: "var(--muted)",
                  background: "white",
                }}
              >
                {f}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}