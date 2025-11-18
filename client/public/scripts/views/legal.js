import { centeredHeader, marketingFooter } from "./layout.js";

const legalView = {
  id: "legal",
  path: "/legal",
  title: "Legal Notice | Find Your Price",
  layout: "legal",
  template() {
    return `
      ${centeredHeader()}
      <main class="main-content">
        <div class="legal-container">
          <a href="javascript:history.back()" class="back-arrow" aria-label="Go back">&#8592;</a>
          <div class="legal-header">
            <h1>Legal Notice</h1>
            <p>Last updated: January 1, 2024</p>
          </div>

          <section class="legal-section">
            <h2>1. Owner Identification</h2>
            <p>Find Your Price, headquartered in Madrid (Spain), owns this website and is responsible for the published content.</p>
          </section>

          <section class="legal-section">
            <h2>2. Terms of Use</h2>
            <p>Accessing and using this website implies acceptance of these terms. If you disagree, please refrain from using the site.</p>
            <ul>
              <li>The site must not be used for unlawful activities.</li>
              <li>Users must not damage or interfere with site systems.</li>
              <li>Find Your Price may update content without prior notice.</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>3. Intellectual Property</h2>
            <p>All content (text, images, logos, design) is protected by intellectual property rights. Reproduction without prior authorization is prohibited.</p>
          </section>

          <section class="legal-section">
            <h2>4. Liability</h2>
            <p>Find Your Price does not guarantee uninterrupted availability of the service and assumes no liability for damages arising from website use.</p>
            <div class="highlight-box">
              <p>External links are provided for convenience only. We accept no responsibility for the content of third-party sites.</p>
            </div>
          </section>

          <section class="legal-section">
            <h2>5. Governing Law</h2>
            <p>Use of this site is governed by Spanish law, and any dispute shall be submitted to the courts of Madrid.</p>
          </section>
        </div>
      </main>
      ${marketingFooter()}
    `;
  }
};

export default legalView;
