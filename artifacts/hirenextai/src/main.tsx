import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { getAppLanguage } from "./lib/i18n";

const root = document.documentElement;
const persistedTheme = localStorage.getItem("hirenext_theme") ?? "system";
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const shouldUseDark = persistedTheme === "dark" || (persistedTheme === "system" && prefersDark);
root.classList.toggle("dark", shouldUseDark);
root.lang = getAppLanguage();

createRoot(document.getElementById("root")!).render(<App />);
