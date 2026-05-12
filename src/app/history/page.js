"use client";
 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
 
export default function History() {
  const [corrected, setCorrected] = useState("");
  const [original, setOriginal] = useState("");
  const router = useRouter();
 
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      router.replace("/login");
      return;
    }
    setCorrected(localStorage.getItem("latestText") || "");
    setOriginal(localStorage.getItem("latestOriginal") || "");
  }, [router]);
 
  return (
    <div
      className="min-h-screen px-4 py-12"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-4xl mx-auto">
 
        {/* Header */}
        <div className="mb-8 fade-up">
          <span className="badge-gold mb-3 inline-block">History</span>
          <h1 className="font-display text-5xl" style={{ color: "var(--ink)" }}>
            Last Session
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Your most recent correction is saved here automatically.
          </p>
        </div>
 
        <div className="divider-gold" />
 
        {corrected ? (
          <div className="grid md:grid-cols-2 gap-6 fade-up-delay">
            {/* Original */}
            <div className="card-paper p-6">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--muted)" }}
              >
                Original Text
              </p>
              <div
                className="whitespace-pre-wrap text-sm leading-relaxed"
                style={{ color: "var(--ink)" }}
              >
                {original || "—"}
              </div>
            </div>
 
            {/* Corrected */}
            <div className="card-paper p-6" style={{ borderColor: "var(--gold)" }}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--gold)" }}
              >
                Corrected Text
              </p>
              <div
                className="whitespace-pre-wrap text-sm leading-relaxed"
                style={{ color: "var(--ink)" }}
              >
                {corrected}
              </div>
            </div>
          </div>
        ) : (
          <div className="card-paper p-10 text-center fade-up-delay">
            <p className="font-display text-2xl mb-3" style={{ color: "var(--muted)" }}>
              No history yet
            </p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Go to the Editor and correct some text — it will appear here.
            </p>
            <button
              className="btn-ink mt-6"
              onClick={() => router.push("/editor")}
            >
              Open Editor →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}