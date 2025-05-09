import { createI18n } from "vue-i18n";
import enMessages from "../localization/en.json";
import laMessages from "../localization/la.json";
import thMessages from "../localization/th.json";

const locale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  legacy: false,
  locale: locale, // set locale
  fallbackLocale: "en", // set fallback locale
  messages: {
    en: enMessages,
    la: laMessages,
    th: thMessages,
  }, // set locale messages
});

export default i18n;
