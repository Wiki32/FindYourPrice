// ===============================================================
// calculate_price.js
// – Lee datos guardados en sessionStorage
// – Construye el prompt «PriceGuru»
// – Solicita a GPT-4o-mini el precio óptimo y la modalidad de pago
// – Muestra loader ("Calculating price") mientras carga
// – Pinta #final-price (y opcionalmente #payment-mode) en el DOM
// – Exporta window.formDataVars
// ---------------------------------------------------------------
"use strict";

const PRICE_API_URL = (() => {
  if (typeof window !== "undefined") {
    if (window.PRICE_API_URL) return window.PRICE_API_URL;
    const meta = typeof document !== "undefined"
      ? document.querySelector('meta[name="price-api-url"]')
      : null;
    if (meta?.content) return meta.content;
  }
  return "/api/calculate-price";
})();

const MIN_LOADER_MS = 600; // evita "flash" del loader

function showLoader(label = "Calculating price") {
  const el = document.getElementById('chat-loader');
  if (el) {
    el.hidden = false;
    el.style.display = 'grid';
    const lbl = el.querySelector('.loader-label');
    if (lbl) lbl.textContent = label;
  }
  document.body.classList.add('is-loading');
}

function hideLoader() {
  const el = document.getElementById('chat-loader');
  if (el) {
    el.hidden = true;
    el.style.display = 'none';
  }
  document.body.classList.remove('is-loading');
}

/* ----------------------------------------------------------------
 * buildPricingPrompt(data) → messages[]
 * ---------------------------------------------------------------- */
function buildPricingPrompt(data = {}) {
  const {
    role = "",
    nombre = "",
    productName = "",
    descripcion = "",
    location = "",
    currency = "",
    sellingSite = "",
    siteDetails = "",
    variableCostsYesNo = "",
    variableCosts = 0,
    variableCurrency = ""
  } = data;

  const systemContent = ``;

  const userPayload = JSON.stringify({
    role,
    name: nombre,
    product_name: productName,
    description: descripcion,
    location,
    target_currency: currency,
    selling_site: sellingSite,
    site_details: siteDetails,
    variable_costs: variableCosts,
    variable_costs_currency: variableCurrency,
    has_variable_costs: variableCostsYesNo // "yes" | "no"
  });

  return [
    { role: "system", content: systemContent },
    { role: "user", content: userPayload }
  ];
}

/* ----------------------------------------------------------------
 * Utilidad: conversión segura a número
 * ---------------------------------------------------------------- */
const toNumber = (v) =>
  parseFloat(String(v).replace(",", ".").replace(/[^0-9.]+/g, "")) || 0;

// ===============================================================
// Main
// ===============================================================
document.addEventListener("DOMContentLoaded", async () => {
  // 1) Carga completa
  const data = getFormData();

  // 2) Destructuring básico
  const {
    role = "",
    nombre = "",
    productName = "",
    descripcion = "",
    location = "",
    currency = "",
    sellingSite = "",
    siteDetails = "",
    ["variable_costs_yesno"]: variableCostsYesNo = "", // "yes" | "no"
    ["variable-costs"]: rawVariableCosts = 0,
    ["variable-costs-currency"]: variableCurrency = ""
  } = data;

  const variableCosts = toNumber(rawVariableCosts);

  // 3) Llamada a GPT-4o-mini
  let gptPrice = null;
  let paymentMode = "";

  try {
    const messages = buildPricingPrompt({
      role,
      nombre,
      productName,
      descripcion,
      location,
      currency,
      sellingSite,
      siteDetails,
      variableCostsYesNo,
      variableCosts,
      variableCurrency
    });

    const t0 = performance.now();
    showLoader("Calculating price");

    const response = await fetch(PRICE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages,
        max_tokens: 20,
        temperature: 0.2
      })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const json = await response.json();
    if (json?.error) throw new Error(json.error.message || "Price API error");
    const content = (json?.choices?.[0]?.message?.content || "").trim();

    // Formato esperado: "12.34 subscription"
    const m = content.match(/^(-?\d+(?:\.\d{1,2})?)\s+([a-z][a-z\-]{0,30})/i);
    if (m) {
      gptPrice = parseFloat(m[1]);
      paymentMode = String(m[2] || "").toLowerCase();
    } else {
      const parts = content.split(/\s+/);
      gptPrice = parseFloat(parts[0]);
      paymentMode = String(parts[1] || "").toLowerCase();
    }

    // Mantener el loader visible al menos MIN_LOADER_MS
    const dt = performance.now() - t0;
    if (dt < MIN_LOADER_MS) {
      await new Promise((r) => setTimeout(r, MIN_LOADER_MS - dt));
    }
  } catch (err) {
    console.error("GPT pricing failed:", err);
    const priceEl = document.getElementById("final-price");
    if (priceEl) {
      priceEl.textContent = "Error fetching price. Please try again later.";
    }
  } finally {
    hideLoader();
  }

  // 4) Fallback si GPT falla
  const finalPrice = Number.isFinite(gptPrice) ? gptPrice : variableCosts + 10;

  // 5) Pintar en el DOM
  const priceEl = document.getElementById("final-price");
  if (priceEl) priceEl.textContent = `${finalPrice.toFixed(2)} ${currency || ""}`.trim();

  const modeEl = document.getElementById("payment-mode");
  if (modeEl && paymentMode) modeEl.textContent = paymentMode;

  const varEl = document.getElementById("variable-costs");
  if (varEl) varEl.textContent = `${variableCosts.toFixed(2)} ${variableCurrency || ""}`.trim();

  const prodEl = document.getElementById("productName");
  if (prodEl) prodEl.textContent = productName ? productName.toLowerCase() : "";

  const loca = document.getElementById("location");
  if (loca) loca.textContent = location;

  // 6) Inyección automática para cualquier <span data-field="…">
  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.dataset.field;
    if (data[key] !== undefined) el.textContent = data[key];
  });

  // 7) Exportar
  window.formDataVars = {
    role,
    nombre,
    productName,
    descripcion,
    location,
    currency,
    sellingSite,
    siteDetails,
    variableCostsYesNo,
    variableCosts,
    variableCurrency,
    finalPrice,
    paymentMode
  };
  console.log("Form data vars →", window.formDataVars);
});
