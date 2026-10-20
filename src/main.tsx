import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/golos-text";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/literata";
import "@fontsource-variable/literata/wght-italic.css";
import "./styles/theme.css";
import "./styles/site.css";
import "./styles/stage.css";
import "./styles/trainer.css";
import "./styles/case.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
