export const autoResize = (textarea) => {
  if (!textarea) return;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
};

export const attachAutoResize = (textarea) => {
  if (!textarea) return;
  autoResize(textarea);
  textarea.addEventListener("input", () => autoResize(textarea));
};
