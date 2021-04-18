import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

import { languages } from "./../i18n/index";
import { defaultLocale } from "../i18n/index";
const messages = Object.assign(languages);

export default new VueI18n({
  locale: defaultLocale,
  fallbackLocale: "es",
  messages,
});
