// utils_formdata.js
"use strict";

function getFormData() {
  try {
    return JSON.parse(sessionStorage.getItem('formData')) || {};
  } catch {
    return {};
  }
}

function setFormData(data) {
  try {
    sessionStorage.setItem('formData', JSON.stringify(data || {}));
  } catch {
    // no-op
  }
}

function updateFormData(newFields) {
  const current = getFormData();
  const updated = { ...current, ...newFields };
  setFormData(updated);
}
