import { centeredHeader, marketingFooter } from "./layout.js";
import { getFormData, updateFormData } from "../state.js";
import { getStepNumber, renderProgressBar, syncProgressBar } from "./form-utils.js";

const formBrandView = {
  id: "form-brand",
  path: "/forms/brand",
  title: "Brand Name and Product Description",
  layout: "forms",
  template() {
    const step = getStepNumber("form-brand");
    return `
      ${centeredHeader()}
      ${renderProgressBar(step)}

      <main class="main-content" data-form-step="${step}">
        <a href="javascript:history.back()" class="back-arrow" aria-label="Volver atrás">
          &#8592;
        </a>

        <section class="section name-section">
          <div class="container">
            <span class="container-top-right">Required</span>
            <h1 for="nombre">Business Name</h1>
            <form class="text-form" id="name-form">
              <input type="text" id="nombre" name="nombre" required placeholder="Write here">
            </form>
          </div>
        </section>

        <section class="section product-section">
          <div class="container">
            <span class="container-top-right">Required</span>
            <h1>Product or Service</h1>
            <p>Put the name of your product or service.</p>
            <form class="text-form" id="product-name-form">
              <input
                type="text"
                id="productName"
                name="productName"
                required
                placeholder="Write here">
            </form>
          </div>
        </section>

        <section class="section description-section">
          <div class="container">
            <span class="container-top-right">Required</span>
            <h1 class="description-title" for="descripcion">Product or Service Description</h1>
            <p>The better you describe your product, the more exact the calculation of the price.</p>
            <form class="text-form" id="description-form" data-next="/forms/variable">
              <textarea id="descripcion" name="descripcion" required maxlength="800" placeholder="Write here (up to 800 characters)"></textarea>
              <div class="char-count-wrapper">
                <span id="char-count" class="char-count">0/800</span>
              </div>
              <button type="submit" class="btn">Next</button>
            </form>
          </div>
        </section>
      </main>

      ${marketingFooter()}
    `;
  },
  mount({ navigate }) {
    const step = getStepNumber("form-brand");
    syncProgressBar(step);

    const data = getFormData();
    const nameInput = document.getElementById("nombre");
    const productInput = document.getElementById("productName");
    const descriptionInput = document.getElementById("descripcion");
    const nameTitle = document.querySelector(".name-section h1");
    const charCount = document.getElementById("char-count");

    if (nameTitle) {
      nameTitle.textContent = data.role === "person" ? "Name" : "Business Name";
    }

    if (nameInput) {
      nameInput.value = data.nombre || "";
      nameInput.addEventListener("input", () => {
        updateFormData({ nombre: nameInput.value });
      });
    }

    if (productInput) {
      productInput.value = data.productName || "";
      productInput.addEventListener("input", () => {
        updateFormData({ productName: productInput.value });
      });
    }

    if (descriptionInput) {
      descriptionInput.value = data.descripcion || "";
      if (charCount) {
        charCount.textContent = `${descriptionInput.value.length}/800`;
      }
      descriptionInput.addEventListener("input", () => {
        updateFormData({ descripcion: descriptionInput.value });
        if (charCount) {
          charCount.textContent = `${descriptionInput.value.length}/800`;
        }
      });
    }

    const form = document.getElementById("description-form");
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!nameInput.value.trim()) {
        nameInput.reportValidity();
        return;
      }
      if (!descriptionInput.value.trim()) {
        descriptionInput.reportValidity();
        return;
      }
      updateFormData({
        nombre: nameInput.value.trim(),
        productName: productInput.value.trim(),
        descripcion: descriptionInput.value.trim()
      });
      navigate("/forms/variable");
    });
  }
};

export default formBrandView;
