import { marketingFooter, marketingHeader } from "./layout.js";

const blogView = {
  id: "blog",
  path: "/blog",
  title: "Find Your Price Blog",
  layout: "marketing",
  template() {
    return `
      ${marketingHeader("/blog")}
      <main class="blog-main">
        <section class="blog-hero">
          <div class="blog-hero__content">
            <h1>Ideas and Insights on Pricing Smarter</h1>
            <p>Actionable stories, experiments, and strategies to help you price with clarity and confidence.</p>
          </div>
        </section>
        <section class="blog-featured">
          <article class="featured-article">
            <div class="featured-article__tag">Featured Playbook</div>
            <h2>The 5-Step Pricing Sprint for New Products</h2>
            <p>Condense market research, cost validation, and willingness-to-pay testing into a one-week sprint any team can run.</p>
            <a href="#" class="text-link">Read the playbook</a>
          </article>
          <aside class="featured-aside">
            <h3>Latest Research</h3>
            <p>How scaling SaaS teams capture 12% more revenue by pairing price localization with granular cost visibility.</p>
            <a href="#" class="text-link">Download the report</a>
          </aside>
        </section>
        <section class="blog-listing">
          <div class="blog-listing__header">
            <h2>Fresh From the Blog</h2>
            <a href="#" class="text-link">View all posts</a>
          </div>
          <div class="posts-grid">
            <article class="post-card">
              <div class="post-label">Case Study</div>
              <h3>How a D2C Brand Lifted Margins 18% Without Losing Customers</h3>
              <p>Inside the experiments that helped a premium beverage company balance subscription and retail pricing.</p>
              <div class="post-meta">
                <span>April 17, 2024</span>
                <a href="#" class="text-link">Read more</a>
              </div>
            </article>
            <article class="post-card">
              <div class="post-label">Guide</div>
              <h3>Pricing Metrics That Make Sense to Your Customers</h3>
              <p>Swap confusing tiers for value-based metrics that align with how people measure impact.</p>
              <div class="post-meta">
                <span>April 12, 2024</span>
                <a href="#" class="text-link">Read more</a>
              </div>
            </article>
            <article class="post-card">
              <div class="post-label">Playbook</div>
              <h3>Building a Pricing Committee That Actually Ships Decisions</h3>
              <p>Set clear roles, cadence, and data rituals so pricing updates move at the speed of your roadmap.</p>
              <div class="post-meta">
                <span>April 4, 2024</span>
                <a href="#" class="text-link">Read more</a>
              </div>
            </article>
            <article class="post-card">
              <div class="post-label">Research</div>
              <h3>What Customers Expect to See in a Pricing Calculator</h3>
              <p>Survey insights on transparency, scenario planning, and willingness to pay for proactive advice.</p>
              <div class="post-meta">
                <span>March 26, 2024</span>
                <a href="#" class="text-link">Read more</a>
              </div>
            </article>
          </div>
        </section>
        <section class="blog-subscribe">
          <div class="subscribe-card">
            <h2>Stay Ahead of Price Trends</h2>
            <p>Get weekly insights on pricing experiments, customer psychology, and product positioning.</p>
            <form class="subscribe-form">
              <label for="email" class="sr-only">Email address</label>
              <input type="email" id="email" name="email" placeholder="you@company.com">
              <button type="submit">Join the newsletter</button>
            </form>
            <small>No spam. Just pricing tactics used by growing teams.</small>
          </div>
        </section>
      </main>
      ${marketingFooter()}
    `;
  }
};

export default blogView;
