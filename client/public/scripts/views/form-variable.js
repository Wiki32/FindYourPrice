import { centeredHeader, marketingFooter } from "./layout.js";
import { getFormData, updateFormData } from "../state.js";
import { initCurrencyDropdown } from "../utils/currency-dropdown.js";
import { getStepNumber, renderProgressBar, syncProgressBar } from "./form-utils.js";

const formVariableView = {
  id: "form-variable",
  path: "/forms/variable",
  title: "Variable Costs",
  layout: "forms",
  template() {
    const step = getStepNumber("form-variable");
    return `
      ${centeredHeader()}
      ${renderProgressBar(step)}

      <div class="main-wrapper" data-form-step="${step}">
        <a href="javascript:history.back()" class="back-arrow" aria-label="Volver atrás">&#8592;</a>
        <div class="container">
          <span class="container-top-right">Required</span>
          <h1>Do you have any variable costs?</h1>
          <p>Choose one option.</p>
          <form class="variable-choice-form" id="variable-cost-form" data-next="/forms/location">
            <div class="variable-choice-form__options">
              <label class="radio-option">
                <input type="radio" name="variable_costs_yesno" value="yes" required>
                <span>Yes</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="variable_costs_yesno" value="no">
                <span>No</span>
              </label>
            </div>
            <button type="submit" class="btn variable-choice-form__next" id="next-btn-default">Next</button>            
          </form>
        </div>

        <div class="container" id="extra-container" style="display:none;">
          <span class="container-top-right">Optional</span>
          <h1>Specify your variable costs</h1>
          <p>
            Write down your variable costs in the text area below.<br>
            The variable cost is the amount it costs to produce one unit of a product, including materials and production expenses, but excluding fixed costs like salaries or rent.
          </p>
          <form class="text-form" id="variable-costs-form">
            <div class="input-currency-row">
              <textarea id="variable-costs" name="variable-costs" maxlength="30" placeholder="Put the number here"></textarea>
              <div class="custom-dropdown" id="currency-dropdown">
                <input type="text" id="currency-helper" style="opacity:0; position:absolute; pointer-events:none; width:0; height:0; margin:0; padding:0;" required>
                <input type="hidden" name="currency" id="currency-value" value="">
                <div class="dropdown-selected" tabindex="0">
                  <span id="dropdown-value">Select one</span>
                  <span class="dropdown-arrow">&#9662;</span>
                </div>
                <div class="dropdown-list" id="dropdown-list">
                  <input type="text" class="dropdown-search" placeholder="Search">
                  <div class="dropdown-options"></div>
                </div>
              </div>
            </div>
            <button type="button" class="btn" id="next-btn-extra" data-next="/forms/location">Next</button>
          </form>
        </div>
      </div>

      ${marketingFooter()}
    `;
  },
  mount({ navigate }) {
    const step = getStepNumber("form-variable");
    syncProgressBar(step);

    const data = getFormData();
    const form = document.getElementById("variable-cost-form");
    const extraContainer = document.getElementById("extra-container");
    const defaultButton = document.getElementById("next-btn-default");
    const extraButton = document.getElementById("next-btn-extra");
    const textarea = document.getElementById("variable-costs");
    const dropdown = document.getElementById("currency-dropdown");
    const currencyValue = document.getElementById("currency-value");
    const currencyHelper = document.getElementById("currency-helper");

    const showExtra = (show) => {
      if (!extraContainer || !defaultButton) return;
      extraContainer.style.display = show ? "" : "none";
      defaultButton.style.display = show ? "none" : "";
    };

    const preselect = data.variableCostsYesNo;
    if (preselect) {
      const radio = form?.querySelector(
        `input[name="variable_costs_yesno"][value="${preselect}"]`
      );
      if (radio) radio.checked = true;
      showExtra(preselect === "yes");
    }

    if (textarea && data.variableCosts) {
      textarea.value = data.variableCosts;
    }

    initCurrencyDropdown(dropdown, {
      value: data.variableCurrency || "",
      onChange(code) {
        updateFormData({ variableCurrency: code });
      }
    });

    form?.addEventListener("change", () => {
      const selected = form.querySelector('input[name="variable_costs_yesno"]:checked');
      if (!selected) return;
      showExtra(selected.value === "yes");
      if (selected.value === "yes") {
        updateFormData({ variableCostsYesNo: "yes" });
      }
    });

    textarea?.addEventListener("input", () => {
      textarea.value = textarea.value.replace(/[^0-9.,\s]/g, "");
      updateFormData({ variableCosts: textarea.value });
    });

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = form.querySelector('input[name="variable_costs_yesno"]:checked');
      if (!selected) {
        form.reportValidity();
        return;
      }
      if (selected.value === "yes") {
        showExtra(true);
        extraButton?.focus();
        return;
      }
      updateFormData({
        variableCostsYesNo: "no",
        variableCosts: "",
        variableCurrency: ""
      });
      navigate("/forms/location");
    });

    const validateExtra = () => {
      const value = textarea.value.trim();
      const currency = currencyValue.value.trim();
      const regex = /^[0-9.,\s]+$/;

      if (value && !regex.test(value)) {
        textarea.setCustomValidity("Please enter only numbers, dots, and commas.");
        textarea.reportValidity();
        return false;
      }
      textarea.setCustomValidity("");

      if (value && regex.test(value) && !currency) {
        if (currencyHelper) {
          currencyHelper.value = "";
          currencyHelper.focus();
        }
        return false;
      }

      if (currencyHelper) currencyHelper.value = currency;
      return true;
    };

    extraButton?.addEventListener("click", () => {
      if (!validateExtra()) return;
      updateFormData({
        variableCostsYesNo: "yes",
        variableCosts: textarea.value.trim(),
        variableCurrency: currencyValue.value.trim()
      });
      navigate("/forms/location");
    });
  }
};

export default formVariableView;
