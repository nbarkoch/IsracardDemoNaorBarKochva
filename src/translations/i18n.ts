import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { en, es, he, zh } from "./langs";
import { I18nManager } from "react-native";

const resources = {
  en: { translation: en },
  es: { translation: es },
  he: { translation: he },
  iw: { translation: he },
  zh: { translation: zh },
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
