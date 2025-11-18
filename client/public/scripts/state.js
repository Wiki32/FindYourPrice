const STORAGE_KEY = "formData";

const safeStorage = (() => {
  try {
    const { sessionStorage } = window;
    const testKey = "__fyp__";
    sessionStorage.setItem(testKey, "1");
    sessionStorage.removeItem(testKey);
    return sessionStorage;
  } catch {
    return null;
  }
})();

const load = () => {
  if (!safeStorage) return {};
  try {
    const raw = safeStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

let formData = load();

const persist = () => {
  if (!safeStorage) return;
  try {
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch {
    /* no-op */
  }
};

export const getFormData = () => ({ ...formData });

export const setFormData = (next) => {
  formData = { ...(next || {}) };
  persist();
  document.dispatchEvent(
    new CustomEvent("formdata:change", { detail: { formData } })
  );
};

export const updateFormData = (patch = {}) => {
  setFormData({ ...formData, ...patch });
};

export const resetFormData = () => {
  setFormData({});
};
