import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import App from "./App";
import "./styles.css";

// Dev only: open with ?static to jump every animation to its end state (for screenshots).
if (import.meta.env.DEV && new URLSearchParams(location.search).has("static")) {
  gsap.globalTimeline.timeScale(100);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
