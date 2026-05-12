"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import jsPDF from "jspdf";

export default function Editor() {
  const [text, setText] = useState("");
  const [corrected, setCorrected] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // ── Auth guard ──────────────────────────────────────────────
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.replace("/login");
    }
  }, [router]);

  // ── Grammar correction ──────────────────────────────────────
  const checkGrammar = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({text, language: "en-US"}),
      });

      const data = await res.json();
      let updated = text;

      // Apply corrections
      const sorted = [...data.matches].sort((a, b) => b.offset - a.offset);

      sorted.forEach((item) => {
        if (item.replacements.length > 0) {
          updated =
            updated.substring(0, item.offset) +
            item.replacements[0].value +
            updated.substring(item.offset + item.length);
        }
      });

      setCorrected(updated);

      // ── Save latest text ──
      localStorage.setItem("latestText", updated);
      localStorage.setItem("latestOriginal", text);

      // ── HISTORY SAVE (FIX ADDED HERE) ──
      const history = JSON.parse(localStorage.getItem("history") || "[]");

      history.push({
        original: text,
        corrected: updated,
        date: new Date().toISOString(),
      });

      localStorage.setItem("history", JSON.stringify(history));

      // ── Optional counter for dashboard ──
      localStorage.setItem("correctionCount", String(history.length));

      // ── Backend save (non-blocking) ──
      fetch("/api/save", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          originalText: text,
          correctedText: updated,
        }),
      }).catch(() => {});
    } catch (err) {
      alert("Could not reach grammar service. Check your internet connection.");
    }

    setLoading(false);
  };

  // ── Download PDF ────────────────────────────────────────────
  const downloadPDF = () => {
    const doc = new jsPDF({unit: "pt", format: "a4"});
    const margin = 60;
    const maxWidth = doc.internal.pageSize.width - margin * 2;
    const lineHeight = 18;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Mr. Punctuation — Corrected Text", margin, margin);

    doc.setDrawColor(201, 168, 76);
    doc.setLineWidth(1.5);
    doc.line(
      margin,
      margin + 12,
      doc.internal.pageSize.width - margin,
      margin + 12,
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const lines = doc.splitTextToSize(corrected, maxWidth);
    let y = margin + 38;

    lines.forEach((line) => {
      if (y > doc.internal.pageSize.height - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save("corrected-text.pdf");
  };

  // ── Download TXT ────────────────────────────────────────────
  const downloadTXT = () => {
    const blob = new Blob([corrected], {type: "text/plain"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "corrected-text.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  // ── Copy text ───────────────────────────────────────────────
  const copyText = () => {
    navigator.clipboard.writeText(corrected);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-screen px-4 py-12"
      style={{backgroundColor: "var(--cream)"}}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 fade-up">
          <span className="badge-gold mb-3 inline-block">Editor</span>
          <h1 className="font-display text-5xl" style={{color: "var(--ink)"}}>
            Grammar Editor
          </h1>
          <p className="mt-2 text-sm" style={{color: "var(--muted)"}}>
            Paste or type your text below, then click Correct Grammar.
          </p>
        </div>

        {/* Input */}
        <div className="card-paper p-7 mb-6 fade-up-delay">
          <textarea
            className="textarea-paper"
            style={{minHeight: "240px"}}
            placeholder="Write or paste your text here…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="flex items-center justify-between mt-5 flex-wrap gap-3">
            <span className="text-xs" style={{color: "var(--muted)"}}>
              {text.length} characters ·{" "}
              {text.trim() ? text.trim().split(/\s+/).length : 0} words
            </span>

            <button
              className="btn-gold"
              onClick={checkGrammar}
              disabled={loading || !text.trim()}
              style={{opacity: loading || !text.trim() ? 0.6 : 1}}
            >
              {loading ? "Checking…" : "Correct Grammar →"}
            </button>
          </div>
        </div>

        {/* Output */}
        {corrected && (
          <div className="card-paper p-7 fade-up">
            <h2
              className="font-display text-2xl mb-4"
              style={{color: "var(--ink)"}}
            >
              Corrected Text
            </h2>

            <div
              className="whitespace-pre-wrap p-5 rounded-md"
              style={{background: "var(--cream-dark)", color: "var(--ink)"}}
            >
              {corrected}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button className="btn-sage" onClick={copyText}>
                {copied ? "✓ Copied!" : "Copy Text"}
              </button>

              <button className="btn-outline" onClick={downloadTXT}>
                Download TXT
              </button>

              <button className="btn-ink" onClick={downloadPDF}>
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
