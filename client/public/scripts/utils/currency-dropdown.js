import { currencies } from "../data/currencies.js";

export const initCurrencyDropdown = (root, { value = "", onChange } = {}) => {
  if (!root) return null;

  const displayValue = root.querySelector("#dropdown-value");
  const optionsContainer = root.querySelector(".dropdown-options");
  const searchInput = root.querySelector(".dropdown-search");
  const hiddenInput = root.querySelector("#currency-value");
  const helperInput = root.querySelector("#currency-helper");
  const toggle = root.querySelector(".dropdown-selected");

  let filtered = currencies.slice();

  const renderOptions = (data) => {
    if (!optionsContainer) return;
    optionsContainer.innerHTML = data
      .map(
        (currency) => `
        <div class="dropdown-option" data-code="${currency.code}">
          <strong>${currency.code}</strong><span>${currency.name}</span>
        </div>
      `
      )
      .join("");
  };

  const selectValue = (code) => {
    const match = currencies.find((item) => item.code === code);
    if (!match) return;
    hiddenInput.value = match.code;
    if (helperInput) helperInput.value = match.code;
    if (displayValue) displayValue.textContent = match.code;
    onChange?.(match.code);
    root.classList.remove("open");
  };

  const handleOptionClick = (event) => {
    const option = event.target.closest(".dropdown-option");
    if (!option) return;
    selectValue(option.dataset.code);
  };

  const handleDocumentClick = (event) => {
    if (!root.contains(event.target)) {
      root.classList.remove("open");
    }
  };

  searchInput?.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    filtered = currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(term) ||
        currency.name.toLowerCase().includes(term)
    );
    renderOptions(filtered);
  });

  optionsContainer?.addEventListener("click", handleOptionClick);
  document.addEventListener("click", handleDocumentClick);

  toggle?.addEventListener("click", () => {
    root.classList.toggle("open");
    if (root.classList.contains("open")) {
      searchInput.value = "";
      filtered = currencies.slice();
      renderOptions(filtered);
      searchInput.focus();
    }
  });

  renderOptions(filtered);
  if (value) {
    selectValue(value);
  } else if (helperInput) {
    helperInput.value = "";
  }

  return {
    setValue: selectValue,
    destroy() {
      document.removeEventListener("click", handleDocumentClick);
    }
  };
};
