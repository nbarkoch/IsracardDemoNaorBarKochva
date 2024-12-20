import { en } from "./langs";

// Derive types from the English resource
type TranslationResource = typeof en;

// Extend i18next types
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: TranslationResource;
    };
  }
}
