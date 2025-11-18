import { footerLinks, navLinks } from "../data/seed.js";

const logoWebsite = "./assets/find_your_price_logo_website.png";
const logoFooter = "./assets/find_your_price_logo_footer.png";
const logoCentered = "./assets/find_your_price_logo_centered.png";

export const marketingHeader = (activePath = "/home") => `
  <header class="header">
    <div class="header-left">
      <div class="logo">
        <a href="#/home" data-reset-form>
          <img src="${logoWebsite}" alt="Find Your Price" class="logo-img" />
        </a>
      </div>
    </div>
    <nav class="navbar">
      ${navLinks
        .map((link) => {
          const resetAttr = link.path === "/home" ? " data-reset-form" : "";
          return `
        <a href="#${link.path}" class="nav-link${link.path === activePath ? " active" : ""}" data-nav="${link.path}"${resetAttr}>
          ${link.label}
        </a>
      `;
        })
        .join("")}
    </nav>
    <div class="header-right">
      <a href="#/forms/who" class="button_header" data-reset-form>Find Your Costs</a>
    </div>
  </header>
`;

export const marketingFooter = () => `
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <a href="#/home" data-reset-form>
          <img src="${logoFooter}" alt="Find Your Price" class="footer-logo-img" />
        </a>
      </div>
      <div class="footer-links">
        ${footerLinks
          .map((link) => `<a href="#${link.path}" data-nav="${link.path}">${link.label}</a>`)
          .join("")}
      </div>
    </div>
  </footer>
`;

export const centeredHeader = () => `
  <header class="header header-simple">
    <div class="header-center">
      <a href="#/home" data-reset-form>
        <img src="${logoCentered}" alt="Find Your Price" class="header-logo-centered" />
      </a>
    </div>
  </header>
`;
