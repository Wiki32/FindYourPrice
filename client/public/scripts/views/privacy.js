import { centeredHeader, marketingFooter } from "./layout.js";

const privacyView = {
  id: "privacy",
  path: "/privacy",
  title: "Privacy Policy | Find Your Price",
  layout: "legal",
  template() {
    return `
      ${centeredHeader()}
      <main class="main-content">
        <div class="legal-container">
          <a href="javascript:history.back()" class="back-arrow" aria-label="Go back">&#8592;</a>
          <div class="legal-header">
            <h1>Privacy Policy</h1>
            <p>Last updated: January 1, 2024</p>
          </div>

          <section class="legal-section">
            <h2>1. General Information</h2>
            <p>This policy describes how Find Your Price collects, uses, and protects personal data while providing transparency and control to users.</p>
          </section>

          <section class="legal-section">
            <h2>2. Data We Collect</h2>
            <p>We collect information when you interact with our forms or services.</p>
            <ul>
              <li>Identification and contact details.</li>
              <li>Professional information and project-related data.</li>
              <li>Technical data from web usage (IP address, browser, operating system).</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>3. Purposes of Processing</h2>
            <p>We use your data to:</p>
            <ul>
              <li>Respond to inquiries and provide tailored estimates.</li>
              <li>Send relevant communications and updates about our services.</li>
              <li>Comply with legal and security obligations.</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>4. Legal Basis</h2>
            <p>Processing is based on:</p>
            <ul>
              <li>Your explicit consent.</li>
              <li>Performance of a pre-contract or contract.</li>
              <li>Legitimate interest in improving our services.</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2>5. Data Retention</h2>
            <p>Data is kept for the time needed to fulfill the purposes described and is then restricted according to legal retention periods.</p>
          </section>

          <section class="legal-section">
            <h2>6. Your Rights</h2>
            <div class="highlight-box">
              <p>You can exercise your rights of access, rectification, erasure, objection, restriction, and portability by writing to <a href="mailto:privacy@findyourprice.com">privacy@findyourprice.com</a>.</p>
            </div>
          </section>

          <section class="legal-section">
            <h2>7. Security Measures</h2>
            <p>We implement technical and organizational measures to protect your information against unauthorized access, loss, or alteration.</p>
          </section>

          <section class="legal-section">
            <h2>8. International Transfers</h2>
            <p>When data is transferred outside the European Economic Area, we ensure compliance with applicable regulations through standard contractual clauses or other approved mechanisms.</p>
          </section>

          <section class="legal-section">
            <h2>9. Updates</h2>
            <p>We reserve the right to amend this policy by publishing a new version on this website.</p>
          </section>
        </div>
      </main>
      ${marketingFooter()}
    `;
  }
};

export default privacyView;
