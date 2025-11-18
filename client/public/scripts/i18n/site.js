import { dictionary } from "./dictionary.js";

let currentLocale = "en";

export const setLocale = (nextLocale) => {
  if (dictionary[nextLocale]) {
    currentLocale = nextLocale;
  }
};

export const t = (key) => {
  return dictionary[currentLocale]?.[key] ?? key;
};
