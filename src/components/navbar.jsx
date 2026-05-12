"use client";
 
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
 
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
 
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("loggedIn"));
  }, [pathname]);
 
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };
 
  const navLink = (href, label) => {
    const active = pathname === href;
    return (
      <Link href={href}>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            fontWeight: active ? "600" : "400",
            color: active ? "var(--gold)" : "var(--ink)",
            borderBottom: active ? "2px solid var(--gold)" : "2px solid transparent",
            paddingBottom: "2px",
            transition: "color 0.2s, border-color 0.2s",
            cursor: "pointer",
          }}
        >
          {label}
        </span>
      </Link>
    );
  };
 
  return (
    <nav
      style={{
        background: "white",
        borderBottom: "1.5px solid #ddd8cc",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="max-w-5xl mx-auto px-5 flex items-center justify-between"
        style={{ height: "64px" }}
      >
        {/* Logo */}
        <Link href="/">
          <span
            className="font-display text-2xl"
            style={{ color: "var(--ink)", cursor: "pointer" }}
          >
            Mr. <span style={{ color: "var(--gold)" }}>Punctuation</span>
          </span>
        </Link>
 
        {/* Links */}
        <div className="flex items-center gap-6">
          {navLink("/editor", "Editor")}
          {navLink("/history", "History")}
          {navLink("/dashboard", "Dashboard")}
 
          {loggedIn ? (
            <button className="btn-outline py-1.5 px-4 text-sm" onClick={handleLogout}>
              Sign Out
            </button>
          ) : (
            <Link href="/login">
              <button className="btn-ink py-1.5 px-4 text-sm">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}