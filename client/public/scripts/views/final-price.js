import { registerGlobalEvents } from "../events.js";
import { getFormData } from "../state.js";

registerGlobalEvents();

const PRICE_API_URL = (() => {
  if (typeof window !== "undefined") {
    if (window.PRICE_API_URL) return window.PRICE_API_URL;

    const meta = typeof document !== "undefined"
      ? document.querySelector('meta[name="price-api-url"]')
      : null;

    const { protocol, hostname, port } = window.location || {};
    const isDevFileProtocol = protocol === "file:";
    const isLocalHost = hostname === "127.0.0.1" || hostname === "localhost";
    const isLocalStaticServer = isLocalHost && port !== "3000";

    const metaUrl = meta?.content?.trim();
    if (metaUrl) {
      const isAbsoluteMeta = /^https?:/i.test(metaUrl);
      if (!isAbsoluteMeta && (isDevFileProtocol || isLocalStaticServer)) {
        return "http://localhost:3000/api/calculate-price";
      }
      return metaUrl;
    }

    if (isDevFileProtocol || isLocalStaticServer) {
      return "http://localhost:3000/api/calculate-price";
    }
  }
  return "/api/calculate-price";
})();

const MIN_LOADER_MS = 600;

const showLoader = (label = "Calculating price") => {
  const el = document.getElementById("chat-loader");
  if (el) {
    el.hidden = false;
    el.style.display = "grid";
    const lbl = el.querySelector(".loader-label");
    if (lbl) lbl.textContent = label;
  }
  document.body.classList.add("is-loading");
};

const hideLoader = () => {
  const el = document.getElementById("chat-loader");
  if (el) {
    el.hidden = true;
    el.style.display = "none";
  }
  document.body.classList.remove("is-loading");
};

const buildPricingPrompt = (data = {}) => {
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

  const systemContent = [
    'Eres "PriceGuru", un consultor de pricing y marketing de primer nivel internacional.',
    "Objetivo: sugerir un precio de venta óptimo basándote estrictamente en los datos que recibas; si falta algún dato, decide con la mejor suposición experta.",
    "Proceso: 1) Calcula un precio base con las variables disponibles. 2) Ajusta usando PSICOLOGÍA DE PRECIOS para maximizar conversión sin comprometer rentabilidad: identifica el umbral superior cercano (10, 20, 50, 100, 200, 500, 1000…) y adecúa el precio al tipo de cliente inferido; compara competidores del mismo canal y zona cuando se conozcan o se puedan inferir y ancla ±1–5% según posicionamiento; integra impuestos/gravámenes del sector incluyendo IVA/IGIC/tasas en B2C/PVP y dejando neto en B2B o cuando se especifique «sin impuestos».",
    "3) Elige modalidad de pago (1–2 palabras, minúsculas) con criterio psicológico: usa subscription para uso recurrente y reducir el dolor de pago (interpreta el número como mensual), one-time para compra puntual con propiedad y bajo soporte, freemium cuando el valor emerja con uso/efecto red o exista alta fricción de entrada; ante fuerte estacionalidad o alto CAPEX del cliente valora subscription.",
    "Reglas de salida: devuelve solo dos elementos en una línea separados por un espacio: precio numérico con hasta 2 decimales y sin símbolo de divisa, seguido de la modalidad en minúsculas; no añadas texto extra, títulos, etiquetas, saltos de línea ni comas y usa punto como separador decimal."
  ].join(" ");

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
    has_variable_costs: variableCostsYesNo
  });

  return [
    { role: "system", content: systemContent },
    { role: "user", content: userPayload }
  ];
};

const toNumber = (v) =>
  parseFloat(String(v).replace(",", ".").replace(/[^0-9.]+/g, "")) || 0;

document.addEventListener("DOMContentLoaded", async () => {
  const priceEl = document.getElementById("final-price");
  if (!priceEl) return;

  const data = getFormData();
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
  } = {
    ...data,
    variableCosts: toNumber(data.variableCosts)
  };

  const variableCostsValue = toNumber(data.variableCosts);
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
      variableCosts: variableCostsValue,
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

    const m = content.match(/^(-?\d+(?:\.\d{1,2})?)\s+([a-z][a-z\-]{0,30})/i);
    if (m) {
      gptPrice = parseFloat(m[1]);
      paymentMode = String(m[2] || "").toLowerCase();
    } else {
      const parts = content.split(/\s+/);
      gptPrice = parseFloat(parts[0]);
      paymentMode = String(parts[1] || "").toLowerCase();
    }

    const dt = performance.now() - t0;
    if (dt < MIN_LOADER_MS) {
      await new Promise((r) => setTimeout(r, MIN_LOADER_MS - dt));
    }
  } catch (err) {
    console.error("GPT pricing failed:", err);
    priceEl.textContent = "Error fetching price. Please try again later.";
  } finally {
    hideLoader();
  }

  const finalPrice = Number.isFinite(gptPrice) ? gptPrice : variableCostsValue + 10;

  priceEl.textContent = `${finalPrice.toFixed(2)} ${currency || ""}`.trim();

  const modeEl = document.getElementById("payment-mode");
  if (modeEl && paymentMode) modeEl.textContent = paymentMode;

  const varEl = document.getElementById("variable-costs");
  if (varEl) varEl.textContent = `${variableCostsValue.toFixed(2)} ${variableCurrency || ""}`.trim();

  const prodEl = document.getElementById("productName");
  if (prodEl) prodEl.textContent = productName ? productName.toLowerCase() : "";

  const loca = document.getElementById("location");
  if (loca) loca.textContent = location;

  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.dataset.field;
    if (data[key] !== undefined) el.textContent = data[key];
  });

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
    variableCosts: variableCostsValue,
    variableCurrency,
    finalPrice,
    paymentMode
  };
  console.log("Form data vars →", window.formDataVars);
});
