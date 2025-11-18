import { centeredHeader, marketingFooter } from "./layout.js";
import { getFormData, updateFormData } from "../state.js";
import { getStepNumber, renderProgressBar, syncProgressBar } from "./form-utils.js";
import { sellingSites } from "../data/seed.js";

const formSellingView = {
  id: "form-selling",
  path: "/forms/selling",
  title: "Where are you selling?",
  layout: "forms",
  template() {
    const step = getStepNumber("form-selling");
    return `
      ${centeredHeader()}
      ${renderProgressBar(step)}

      <div class="main-wrapper" data-form-step="${step}">
        <a href="javascript:history.back()" class="back-arrow" aria-label="Volver atrás">
          &#8592;
        </a>
        <div class="container container-selling">
          <span class="container-top-right">Required</span>
          <h1>Where are you selling?</h1>
          <p>The more specific you are the better the price!</p>
          <form class="single-choice-form" id="selling-site-form">
            ${sellingSites
              .map(
                (site, index, arr) => `
              <label class="radio-option${index === arr.length - 1 ? " center-last" : ""}">
                <input type="radio" name="role" value="${site.id}" ${index === 0 ? "required" : ""}>
                <span>${site.label}</span>
              </label>
            `
              )
              .join("")}
            <div id="custom-input-container" style="width:100%; display:none; grid-column: 1 / -1; margin-top:18px;">
              <input
                type="text"
                id="custom-input"
                name="custom-input"
                placeholder="Add more details..."
                maxlength="200"
                style="width:100%; max-width:800px; padding:12px; border-radius:12px; border:2px solid #dbe2e9; font-size:1.1rem;"
              >
              <div style="display:flex; justify-content: flex-end; margin-top: 4px;">
                <span id="char-count" style="color:#4a90e2; font-size:0.98rem;">0/200</span>
              </div>
            </div>
            <button type="button" id="send-to-chatgpt" class="btn">Calculate</button>           
          </form>
        </div>
      </div>

      ${marketingFooter()}
    `;
  },
  mount() {
    const step = getStepNumber("form-selling");
    syncProgressBar(step);

    const data = getFormData();
    const radios = document.querySelectorAll('.radio-option input[type="radio"]');
    const inputContainer = document.getElementById("custom-input-container");
    const customInput = document.getElementById("custom-input");
    const charCount = document.getElementById("char-count");
    const button = document.getElementById("send-to-chatgpt");

    const updatePlaceholder = (label) => {
      if (customInput) {
        customInput.placeholder = `Add details for "${label}" (Optional)`;
      }
    };

    const showInput = (label) => {
      if (!inputContainer) return;
      inputContainer.style.display = "block";
      updatePlaceholder(label);
    };

    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        const label = radio.parentElement.querySelector("span")?.innerText || "";
        showInput(label);
        if (radio.value !== data.sellingSite) {
          customInput.value = "";
          if (charCount) charCount.textContent = "0/200";
        }
        updateFormData({ sellingSite: radio.value });
      });
    });

    if (data.sellingSite) {
      const preset = document.querySelector(
        `.radio-option input[value="${data.sellingSite}"]`
      );
      if (preset) {
        preset.checked = true;
        const label = preset.parentElement.querySelector("span")?.innerText || "";
        showInput(label);
      }
    }

    if (customInput && data.siteDetails) {
      customInput.value = data.siteDetails;
      if (charCount) charCount.textContent = `${customInput.value.length}/200`;
    }

    customInput?.addEventListener("input", () => {
      if (charCount) charCount.textContent = `${customInput.value.length}/200`;
      updateFormData({ siteDetails: customInput.value });
    });

    button?.addEventListener("click", () => {
      const selected = document.querySelector(
        '.radio-option input[name="role"]:checked'
      );
      if (!selected) {
        const form = document.getElementById("selling-site-form");
        form?.reportValidity();
        return;
      }
      updateFormData({
        sellingSite: selected.value,
        siteDetails: customInput?.value || ""
      });
      window.location.href = "oauth/index.html";
    });
  }
};

export default formSellingView;
