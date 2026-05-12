"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 
  const loginUser = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
 
    setLoading(true);
 
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
 
      const data = await res.json();
 
      if (data.success) {
        // Save session info
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userEmail", email);
        // Redirect to editor
        router.push("/editor");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Check your connection.");
    }
 
    setLoading(false);
  };
 
  const handleKey = (e) => {
    if (e.key === "Enter") loginUser();
  };
 
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Left decorative stripe */}
      <div
        className="fixed left-0 top-0 bottom-0 w-2 hidden md:block"
        style={{ background: "var(--gold)" }}
      />
 
      <div className="w-full max-w-md fade-up">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/">
            <h1 className="font-display text-5xl" style={{ color: "var(--ink)" }}>
              Mr. <span style={{ color: "var(--gold)" }}>Punctuation</span>
            </h1>
          </Link>
          <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
            Sign in to continue to your workspace
          </p>
        </div>
 
        {/* Card */}
        <div className="card-paper p-8">
          <h2 className="font-display text-2xl mb-6" style={{ color: "var(--ink)" }}>
            Welcome back
          </h2>
 
          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--ink)" }}
            >
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input-paper"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
 
          {/* Password */}
          <div className="mb-7">
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--ink)" }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-paper"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
 
          {/* Submit */}
          <button
            className="btn-ink w-full py-3 text-base"
            onClick={loginUser}
            disabled={loading}
            style={{ width: "100%", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </div>
 
        <p className="text-center mt-5 text-sm" style={{ color: "var(--muted)" }}>
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium"
            style={{ color: "var(--gold)" }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}