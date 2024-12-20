import { BaseTranslation } from "./langs";

// Extend i18next types
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: BaseTranslation;
    };
  }
}
