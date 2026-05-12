import Footer from "@/components/footer";
import "./globals.css";
import Navbar from "@/components/navbar";
import OfflineBanner from "@/components/offlineBanner";

export const metadata = {
  title: "Mr. Punctuation",
  description: "Grammar and punctuation correction tool",
  manifest: "/manifest.json",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a2e" />
      </head>
      <body>
        <div id="offline-banner">
          ⚠️ You are offline. Some features may not be available.
        </div>
        <Navbar />
        <main
          className="min-h-screen"
          style={{backgroundColor: "var(--cream)"}}
        >
          {children}
        </main>
        <Footer />
        <OfflineBanner />
      </body>
    </html>
  );
}
