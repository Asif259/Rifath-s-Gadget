import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig, MotionGlobalConfig } from "motion/react";
import App from "./App";
import "./styles.css";

// Dev only: open with ?static to jump every animation to its end state (for screenshots).
if (import.meta.env.DEV && new URLSearchParams(location.search).has("static")) {
  MotionGlobalConfig.skipAnimations = true;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
