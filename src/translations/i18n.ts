import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { en, es } from "./langs";

const resources = {
  en: { translation: en },
  es: { translation: es },
} as const;

const locale = Localization.getLocales()[0]?.languageCode || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: locale,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
