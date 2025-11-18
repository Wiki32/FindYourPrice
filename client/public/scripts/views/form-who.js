import { centeredHeader, marketingFooter } from "./layout.js";
import { getFormData, updateFormData } from "../state.js";
import { getStepNumber, renderProgressBar, syncProgressBar } from "./form-utils.js";

const formWhoView = {
  id: "form-who",
  path: "/forms/who",
  title: "¿Quién eres?",
  layout: "forms",
  template() {
    const step = getStepNumber("form-who");
    return `
      ${centeredHeader()}
      ${renderProgressBar(step)}

      <div class="main-wrapper" data-form-step="${step}">
        <a href="javascript:history.back()" class="back-arrow" aria-label="Volver atrás">
          &#8592;
        </a>
        <div class="container">
          <span class="container-top-right">Required</span>
          <h1>Who are you?</h1>
          <p>Are you selling as an individual or a business?</p>
          <div class="role-choice-form">
            <form id="role-form" data-next="/forms/brand">
              <div class="role-choice-form__options">
                <label class="radio-option">
                  <input type="radio" name="role" value="business" required>
                  <span>Business</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="role" value="person">
                  <span>Person</span>
                </label>
              </div>
              <button type="submit" class="btn role-choice-form__next" id="nextBtn">Next</button>            
            </form>
          </div>
        </div>
      </div>
      ${marketingFooter()}
    `;
  },
  mount({ navigate }) {
    const step = getStepNumber("form-who");
    syncProgressBar(step);
    const data = getFormData();
    if (data.role) {
      const preset = document.querySelector(`input[name="role"][value="${data.role}"]`);
      if (preset) preset.checked = true;
    }

    const form = document.getElementById("role-form");
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = form.querySelector('input[name="role"]:checked');
      if (!selected) {
        form.reportValidity();
        return;
      }
      updateFormData({ role: selected.value });
      navigate("/forms/brand");
    });
  }
};

export default formWhoView;
