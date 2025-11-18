import { marketingFooter, marketingHeader } from "./layout.js";

const contactView = {
  id: "contact",
  path: "/contact",
  title: "Contact Find Your Price",
  layout: "marketing",
  template() {
    return `
      ${marketingHeader("/contact")}
      <main class="contact-main">
        <section class="contact-wrapper">
          <div class="contact-info">
            <p class="eyebrow">Contact</p>
            <h1>Let’s talk about your needs</h1>
          </div>
          <div class="contact-form-card" id="contact-form">
            <form class="contact-form">
              <div class="contact-form__row contact-form__row--triple">
                <div class="contact-form__field">
                  <label for="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Alex" required>
                </div>
                <div class="contact-form__field">
                  <label for="surname">Surname</label>
                  <input type="text" id="surname" name="surname" placeholder="Johnson" required>
                </div>
                <div class="contact-form__field">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="alex@company.com" required>
                </div>
              </div>

              <div class="contact-form__row contact-form__row--triple">
                <div class="contact-form__field">
                  <label for="company">Company</label>
                  <input type="text" id="company" name="company" placeholder="Your company" required>
                </div>
                <div class="contact-form__field">
                  <label for="category">Category</label>
                  <select id="category" name="category" required>
                    <option value="" disabled selected>Select a category</option>
                    <option value="support">Support</option>
                    <option value="partnerships">Partnerships</option>
                    <option value="press">Press &amp; media</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="contact-form__field">
                  <label for="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Reason for your message" required>
                </div>
              </div>

              <div class="contact-form__row contact-form__row--full">
                <div class="contact-form__field">
                  <label for="message">Message</label>
                  <textarea id="message" name="message" rows="5" maxlength="1000" placeholder="Tell us how we can help (max 1000 characters)" required></textarea>
                </div>
              </div>

              <button type="submit" class="btn">Send message</button>
            </form>
          </div>
        </section>
      </main>
      ${marketingFooter()}
    `;
  }
};

export default contactView;
