import { centeredHeader, marketingFooter } from "./layout.js";

const cookiesView = {
  id: "cookies",
  path: "/cookies",
  title: "Cookie Policy | Find Your Price",
  layout: "legal",
  template() {
    return `
      ${centeredHeader()}
      <main class="main-content">
        <div class="legal-container">
          <a href="javascript:history.back()" class="back-arrow" aria-label="Go back">&#8592;</a>
          <div class="legal-header">
            <h1>Cookie Policy</h1>
            <p>Last updated: January 1, 2024</p>
          </div>

          <section class="legal-section">
            <h2>1. What Are Cookies?</h2>
            <p>Cookies are small files stored on your device that remember information about your browsing activity and improve your experience.</p>
          </section>

          <section class="legal-section">
            <h2>2. Types of Cookies We Use</h2>
            <ul>
              <li><strong>Technical cookies:</strong> required for the basic functioning of the website.</li>
              <li><strong>Analytics cookies:</strong> help us understand site usage and improve our services.</li>
              <li><strong>Preference cookies:</strong> allow us to remember your settings.</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>3. Managing Cookies</h2>
            <p>You can configure your browser to accept, block, or delete cookies. Each browser handles these settings differently.</p>
            <div class="highlight-box">
              <p>If you disable cookies, some services may not function correctly.</p>
            </div>
          </section>

          <section class="legal-section">
            <h2>4. Third-Party Cookies</h2>
            <p>We work with providers who may set cookies on your device. Review their policies for detailed information.</p>
          </section>

          <section class="legal-section">
            <h2>5. Policy Updates</h2>
            <p>We may update this policy to reflect regulatory changes or adjustments to our website. Changes will be published on this page.</p>
          </section>
        </div>
      </main>
      ${marketingFooter()}
    `;
  }
};

export default cookiesView;
