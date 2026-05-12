"use client";

import {useEffect} from "react";

export default function OfflineBanner() {
  useEffect(() => {
    // Register service worker for offline support
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("SW registered"))
        .catch((err) => console.log("SW registration failed:", err));
    }

    // Online / offline detection
    const setOffline = () => document.body.classList.add("offline");
    const setOnline = () => document.body.classList.remove("offline");

    if (!navigator.onLine) setOffline();

    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, []);

  return null; // The banner is purely CSS-driven via body.offline class
}
