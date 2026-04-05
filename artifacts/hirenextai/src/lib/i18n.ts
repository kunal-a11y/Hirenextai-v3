import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "hirenext_lang";

export type AppLanguage = "en" | "hi" | "bn" | "ta" | "te" | "mr";
type SupportedLanguage = AppLanguage;

const messages: Record<SupportedLanguage, {
  navFeatures: string;
  navPricing: string;
  navSignIn: string;
  navGetStarted: string;
  navGoToDashboard: string;
  footerAbout: string;
  footerSupport: string;
  footerContact: string;
  footerCopyright: string;
  account: string;
  billing: string;
  support: string;
  theme: string;
  language: string;
  light: string;
  dark: string;
  system: string;
  english: string;
  hindi: string;
}> = {
  en: {
    navFeatures: "Features",
    navPricing: "Pricing",
    navSignIn: "Sign In",
    navGetStarted: "Get Started",
    navGoToDashboard: "Go to Dashboard",
    footerAbout: "About",
    footerSupport: "Support",
    footerContact: "Contact",
    footerCopyright: "© 2026 HirenextAI. All rights reserved.",
    account: "Account",
    billing: "Billing",
    support: "Support",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    system: "System",
    english: "English",
    hindi: "Hindi",
  },
  hi: {
    navFeatures: "फ़ीचर्स",
    navPricing: "प्राइसिंग",
    navSignIn: "साइन इन",
    navGetStarted: "शुरू करें",
    navGoToDashboard: "डैशबोर्ड पर जाएँ",
    footerAbout: "हमारे बारे में",
    footerSupport: "सहायता",
    footerContact: "संपर्क",
    footerCopyright: "© 2026 HirenextAI. सर्वाधिकार सुरक्षित।",
    account: "अकाउंट",
    billing: "बिलिंग",
    support: "सपोर्ट",
    theme: "थीम",
    language: "भाषा",
    light: "लाइट",
    dark: "डार्क",
    system: "सिस्टम",
    english: "अंग्रेज़ी",
    hindi: "हिंदी",
  },
  bn: {
    navFeatures: "Features",
    navPricing: "Pricing",
    navSignIn: "Sign In",
    navGetStarted: "Get Started",
    navGoToDashboard: "Go to Dashboard",
    footerAbout: "About",
    footerSupport: "Support",
    footerContact: "Contact",
    footerCopyright: "© 2026 HirenextAI. All rights reserved.",
    account: "Account",
    billing: "Billing",
    support: "Support",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    system: "System",
    english: "English",
    hindi: "Hindi",
  },
  ta: {
    navFeatures: "Features",
    navPricing: "Pricing",
    navSignIn: "Sign In",
    navGetStarted: "Get Started",
    navGoToDashboard: "Go to Dashboard",
    footerAbout: "About",
    footerSupport: "Support",
    footerContact: "Contact",
    footerCopyright: "© 2026 HirenextAI. All rights reserved.",
    account: "Account",
    billing: "Billing",
    support: "Support",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    system: "System",
    english: "English",
    hindi: "Hindi",
  },
  te: {
    navFeatures: "Features",
    navPricing: "Pricing",
    navSignIn: "Sign In",
    navGetStarted: "Get Started",
    navGoToDashboard: "Go to Dashboard",
    footerAbout: "About",
    footerSupport: "Support",
    footerContact: "Contact",
    footerCopyright: "© 2026 HirenextAI. All rights reserved.",
    account: "Account",
    billing: "Billing",
    support: "Support",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    system: "System",
    english: "English",
    hindi: "Hindi",
  },
  mr: {
    navFeatures: "Features",
    navPricing: "Pricing",
    navSignIn: "Sign In",
    navGetStarted: "Get Started",
    navGoToDashboard: "Go to Dashboard",
    footerAbout: "About",
    footerSupport: "Support",
    footerContact: "Contact",
    footerCopyright: "© 2026 HirenextAI. All rights reserved.",
    account: "Account",
    billing: "Billing",
    support: "Support",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    system: "System",
    english: "English",
    hindi: "Hindi",
  },
};

function normalizeLanguage(raw?: string | null): AppLanguage {
  return (["en", "hi", "bn", "ta", "te", "mr"].includes(String(raw)) ? raw : "en") as AppLanguage;
}

export function setAppLanguage(lang: AppLanguage) {
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent("hirenext:language-change", { detail: lang }));
}

export function getAppLanguage(): AppLanguage {
  return normalizeLanguage(localStorage.getItem(STORAGE_KEY));
}

export function getRawAppLanguage(): SupportedLanguage {
  return normalizeLanguage(localStorage.getItem(STORAGE_KEY));
}

export function useAppLanguage() {
  const [language, setLanguageState] = useState<AppLanguage>(() => getAppLanguage());

  const setLanguage = useCallback((lang: AppLanguage) => {
    const normalized = normalizeLanguage(lang);
    setLanguageState(normalized);
    setAppLanguage(normalized);
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setLanguageState(normalizeLanguage(event.newValue));
      }
    };
    const onLanguageEvent = (event: Event) => {
      const customEvent = event as CustomEvent<AppLanguage>;
      setLanguageState(normalizeLanguage(customEvent.detail));
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("hirenext:language-change", onLanguageEvent as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("hirenext:language-change", onLanguageEvent as EventListener);
    };
  }, []);

  const t = useMemo(() => messages[language], [language]);
  return { language, setLanguage, t };
}
