let activeToast = null;

export const showToast = (message, timeout = 3000) => {
  hideToast();
  activeToast = document.createElement("div");
  activeToast.className = "toast";
  activeToast.textContent = message;
  document.body.appendChild(activeToast);
  requestAnimationFrame(() => activeToast.classList.add("is-visible"));
  setTimeout(hideToast, timeout);
};

export const hideToast = () => {
  if (!activeToast) return;
  activeToast.classList.remove("is-visible");
  activeToast.addEventListener(
    "transitionend",
    () => {
      activeToast?.remove();
      activeToast = null;
    },
    { once: true }
  );
};
