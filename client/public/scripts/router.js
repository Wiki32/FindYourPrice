import views from "./views/index.js";

const routeMap = new Map();
let fallbackView = null;
let defaultView = null;

views.forEach((view) => {
  if (!view?.path) return;
  routeMap.set(view.path, view);
  if (Array.isArray(view.aliases)) {
    view.aliases.forEach((alias) => {
      if (!routeMap.has(alias)) routeMap.set(alias, view);
    });
  }
  if (view.fallback) fallbackView = view;
  if (view.default) defaultView = view;
});

if (!defaultView) {
  defaultView = routeMap.get("/home") || routeMap.values().next().value || null;
}

if (!fallbackView) {
  fallbackView = routeMap.get("/404") || defaultView;
}

const ensureHashPath = () => {
  const hash = window.location.hash;
  if (!hash || hash === "#" || hash === "#/") {
    if (defaultView?.path) {
      navigateTo(defaultView.path, { replace: true });
    }
  }
};

const normalizeHash = (hash) => {
  if (!hash) return defaultView?.path || "/home";
  const trimmed = hash.replace(/^#/, "");
  if (!trimmed) return defaultView?.path || "/home";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

const resolveView = (path) => {
  return routeMap.get(path) || fallbackView;
};

let currentView = null;

export const getCurrentView = () => currentView;

export const navigateTo = (path, { replace = false } = {}) => {
  const normalized = path.startsWith("/")
    ? path
    : `/${path.replace(/^#/, "").replace(/^\//, "")}`;
  const target = `#${normalized}`;
  if (replace) {
    window.location.replace(target);
  } else {
    window.location.hash = target;
  }
};

export const startRouter = (root) => {
  ensureHashPath();

  const render = () => {
    const path = normalizeHash(window.location.hash);
    const view = resolveView(path);
    if (!view) {
      root.innerHTML = `<div class="view-error">No view available for ${path}</div>`;
      return;
    }

    currentView = view;
    const layout = view.layout || "marketing";
    document.body.dataset.route = view.id || view.path.replace("/", "") || "";
    document.body.dataset.layout = layout;
    ensureFormsStyles(layout);
    document.title = view.title || "Find Your Price";

    root.innerHTML = view.template({ path });
    if (typeof view.mount === "function") {
      view.mount({
        navigate: navigateTo,
        path,
        view
      });
    }

    document.dispatchEvent(
      new CustomEvent("route:changed", {
        detail: { path, view }
      })
    );

    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  };

  window.addEventListener("hashchange", render);
  render();
};

const ensureFormsStyles = (layout) => {
  const existing = document.head.querySelector("link[data-forms-style]");
  if (layout === "forms") {
    if (existing) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./styles/forms.css";
    link.dataset.formsStyle = "true";
    document.head.appendChild(link);
    return;
  }
  if (existing) existing.remove();
};
