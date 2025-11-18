import { resetFormData } from "./state.js";

export const registerGlobalEvents = () => {
  document.addEventListener("click", (event) => {
    const resetTarget = event.target.closest("[data-reset-form]");
    if (resetTarget) {
      resetFormData();
    }

    const scrollTarget = event.target.closest("[data-scroll]");
    if (scrollTarget) {
      event.preventDefault();
      const selector = scrollTarget.getAttribute("data-scroll");
      const el = selector ? document.querySelector(selector) : null;
      el?.scrollIntoView({ behavior: "smooth" });
    }
  });

  document.addEventListener("route:changed", handleRouteChange);
};

const handleRouteChange = (event) => {
  const path = event.detail?.path;
  if (!path) return;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const target = link.getAttribute("data-nav");
    if (!target) return;

    const isActive = target === path;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};
