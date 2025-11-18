import { setLocale, t as translate } from "../i18n/site.js";

export const t = (key) => translate(key);

export const useLocale = (next) => setLocale(next);
