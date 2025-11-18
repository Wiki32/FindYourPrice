export const qs = (selector, scope = document) => scope.querySelector(selector);

export const qsa = (selector, scope = document) =>
  Array.from(scope.querySelectorAll(selector));

export const on = (root, eventName, selector, handler) => {
  root.addEventListener(eventName, (event) => {
    const target = event.target.closest(selector);
    if (target) handler(event, target);
  });
};

export const html = (strings, ...values) => {
  const template = document.createElement("template");
  template.innerHTML = strings
    .map((chunk, index) => `${chunk}${values[index] ?? ""}`)
    .join("");
  return template.content.cloneNode(true);
};

export const setText = (selector, value, scope = document) => {
  const el = qs(selector, scope);
  if (el) el.textContent = value;
};
