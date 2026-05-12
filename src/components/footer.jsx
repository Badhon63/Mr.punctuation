export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1.5px solid #ddd8cc",
        background: "white",
        padding: "1.5rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.82rem",
          color: "var(--muted)",
        }}
      >
        © 2026 <span style={{ color: "var(--gold)", fontWeight: 600 }}>Mr. Punctuation</span>
        {" "}— Grammar correction made simple.
      </p>
    </footer>
  );
}