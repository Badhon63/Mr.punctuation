"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [stats, setStats] = useState({corrections: 0, saved: 0});
  const [latestText, setLatestText] = useState("");
  const router = useRouter();

  useEffect(() => {
    // ── Auth check ──
    if (!localStorage.getItem("loggedIn")) {
      router.replace("/login");
      return;
    }

    setUserEmail(localStorage.getItem("userEmail") || "");

    // ── HISTORY (MAIN SOURCE OF TRUTH) ──
    const history = JSON.parse(localStorage.getItem("history") || "[]");

    setStats({
      corrections: history.length,
      saved: history.length,
    });

    // ── latest correction ──
    if (history.length > 0) {
      setLatestText(history[history.length - 1].corrected);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  return (
    <div
      className="min-h-screen px-4 py-12"
      style={{backgroundColor: "var(--cream)"}}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-5xl" style={{color: "var(--ink)"}}>
              Your Workspace
            </h1>

            {userEmail && (
              <p className="mt-2 text-sm" style={{color: "var(--muted)"}}>
                Signed in as <strong>{userEmail}</strong>
              </p>
            )}
          </div>

          <button className="btn-outline" onClick={handleLogout}>
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="card-paper p-6">
            <p className="text-xs uppercase" style={{color: "var(--muted)"}}>
              Corrections
            </p>
            <p className="font-display text-5xl" style={{color: "var(--gold)"}}>
              {stats.corrections}
            </p>
          </div>

          <div className="card-paper p-6">
            <p className="text-xs uppercase" style={{color: "var(--muted)"}}>
              Saved Files
            </p>
            <p className="font-display text-5xl" style={{color: "var(--ink)"}}>
              {stats.saved}
            </p>
          </div>

          <div className="card-paper p-6 flex flex-col justify-between">
            <p className="text-xs uppercase" style={{color: "var(--gold)"}}>
              Quick Actions
            </p>

            <Link href="/editor">
              <button className="btn-gold w-full mt-3">Open Editor</button>
            </Link>
          </div>
        </div>

        {/* Latest */}
        <div className="card-paper p-7">
          <h2 className="font-display text-2xl mb-4">Latest Correction</h2>

          <div
            className="p-5 rounded-md whitespace-pre-wrap"
            style={{background: "var(--cream-dark)", minHeight: "80px"}}
          >
            {latestText || "No corrections yet. Go to Editor to start."}
          </div>
        </div>
      </div>
    </div>
  );
}
