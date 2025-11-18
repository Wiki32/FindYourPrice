import { marketingFooter, marketingHeader } from "./layout.js";

const solutionsView = {
  id: "solutions",
  path: "/solutions",
  title: "Find Your Price Solutions",
  layout: "marketing",
  template() {
    return `
      ${marketingHeader("/solutions")}
      <main class="solutions-main">
        <section class="solutions-hero">
          <div class="solutions-hero__text">
            <p class="eyebrow">AI price calculator</p>
            <h1>Find Your Price is the AI interview that returns your ideal price</h1>
            <p>Answer a short sequence of forms about who you are, what you sell, your costs, and where you sell. Those answers are sent straight to our AI model, which produces one recommended amount and payment mode when you finish.</p>
            <ul class="solutions-hero__bullets">
              <li>5 guided steps: role, business info, costs, location, and sales channel.</li>
              <li>No spreadsheets or guesswork—only the AI output based on your entries.</li>
              <li>The last screen shows the AI-calculated amount plus the payment mode.</li>
            </ul>
            <div class="solutions-hero__ctas">
              <a href="#/forms/who" class="btn" data-reset-form>Start AI questionnaire</a>
              <a href="#solution-flow" class="btn btn-secondary">See how it works</a>
            </div>
          </div>
          <div class="solutions-hero__panel" aria-hidden="true">
            <div class="panel-card">
              <p class="panel-label">AI generated final price</p>
              <p class="panel-value">$248.00</p>
              <div class="panel-sparkline"></div>
            </div>
            <div class="panel-card panel-card--compact">
              <p>Payment mode shown</p>
              <strong>subscription</strong>
            </div>
            <div class="panel-card panel-card--compact">
              <p>Variable costs reference</p>
              <strong>$102.00</strong>
            </div>
          </div>
        </section>

        <section class="solutions-section" id="solution-flow">
          <header class="section-header">
            <p class="eyebrow">How it works</p>
            <h2>The questionnaire gathers exactly what the AI needs</h2>
            <p>Your answers are the only source the model uses to calculate the final recommendation. No external data or assumptions are injected.</p>
          </header>
          <div class="solutions-grid">
            <article class="solution-card">
              <div class="solution-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="22" />
                  <polyline points="16 24 22 30 34 18" />
                </svg>
              </div>
              <div>
                <h3 class="solution-title">Profile & offer</h3>
                <p class="solution-description">Choose if you sell as a business or a person, name your brand, and describe the product or service so the AI understands your context.</p>
              </div>
            </article>
            <article class="solution-card">
              <div class="solution-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="22" />
                  <path d="M16 30h16M16 24h16M16 18h16M20 14v20" />
                </svg>
              </div>
              <div>
                <h3 class="solution-title">Costs, location & currency</h3>
                <p class="solution-description">State whether you have variable costs, enter the number if applicable, and pick the currency and location the AI must respect.</p>
              </div>
            </article>
            <article class="solution-card">
              <div class="solution-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="22" />
                  <path d="M16 30h16l-6 6m0-24-6 6h16" />
                </svg>
              </div>
              <div>
                <h3 class="solution-title">Sales channel details</h3>
                <p class="solution-description">Select the marketplace, website, or store category where you sell and add optional notes so the recommendation matches that channel.</p>
              </div>
            </article>
          </div>
        </section>

        <section class="solutions-section solutions-section--muted">
          <div class="stats-grid">
            <article>
              <p class="stat-label">Step 01</p>
              <p class="stat-value">Answer</p>
              <p class="stat-helper">Move through five short forms: who you are, your product, costs, location, and sales channel.</p>
            </article>
            <article>
              <p class="stat-label">Step 02</p>
              <p class="stat-value">Send</p>
              <p class="stat-helper">When you click “Calculate”, your exact answers are sent to the AI price calculator without any edits.</p>
            </article>
            <article>
              <p class="stat-label">Step 03</p>
              <p class="stat-value">Read</p>
              <p class="stat-helper">The final page shows the AI-recommended price, payment mode, and lets you start over if you want to tweak something.</p>
            </article>
          </div>
        </section>

        <section class="solutions-section" id="final-output">
          <div class="playbooks">
            <header>
              <p class="eyebrow">Final screen</p>
              <h2>What the AI recommendation includes</h2>
              <p>Everything stays in plain language. You only see the information you provided and the calculated price.</p>
            </header>
            <div class="playbooks-list">
              <article>
                <h3>Product and place</h3>
                <p>The title reminds you which product or service and which location the price refers to.</p>
              </article>
              <article>
                <h3>Recommended number</h3>
                <p>You receive one AI-generated amount plus the payment mode (subscription, one-time, etc.) so you know how to present it.</p>
              </article>
              <article>
                <h3>Run it again</h3>
                <p>A “Calculate Another Price” button is always available to repeat the flow with different inputs.</p>
              </article>
            </div>
          </div>
        </section>

        <section class="solutions-cta">
          <p class="eyebrow">Ready to get your price?</p>
          <h2>Run the AI-powered questionnaire</h2>
          <p>Start the guided flow, share the details you already know, and receive the AI recommended amount and payment mode in a single view.</p>
          <a href="#/forms/who" class="btn" data-reset-form>Start the AI questionnaire</a>
        </section>
      </main>
      ${marketingFooter()}
    `;
  }
};

export default solutionsView;
