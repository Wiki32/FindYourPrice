import { marketingFooter, marketingHeader } from "./layout.js";

const homeView = {
  id: "home",
  path: "/home",
  title: "Calcula el mejor precio para tu producto",
  layout: "marketing",
  default: true,
  template() {
    return `
      ${marketingHeader("/home")}
      <div class="main-wrapper">
        <div class="container">
          <h1>Calculate the best price for your product or service</h1>
          <p>Discover your ideal price in seconds.<br>For the visionary, the precise, the perfectionist.</p>
          <a href="#/forms/who" class="btn" data-reset-form>Start Now</a>
        </div>
      </div>
      ${marketingFooter()}
    `;
  }
};

export default homeView;
