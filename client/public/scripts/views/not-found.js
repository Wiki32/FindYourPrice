const notFoundView = {
  id: "not-found",
  path: "/404",
  title: "Página no encontrada",
  layout: "marketing",
  fallback: true,
  template() {
    return `
      <section class="main-wrapper">
        <div class="container">
          <h1>404</h1>
          <p>The page you’re looking for is not available.</p>
          <a href="#/home" class="btn">Go back home</a>
        </div>
      </section>
    `;
  }
};

export default notFoundView;
