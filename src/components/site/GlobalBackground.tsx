import { useEffect } from "react";

export function GlobalBackground() {
  useEffect(() => {
    // Force dark mode permanently
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -50,
        pointerEvents: "none",
        background: "#0A0A0B",
      }}
    />
  );
}
