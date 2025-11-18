import { formSteps } from "../data/seed.js";

export const renderProgressBar = (step) => `
  <div class="progress-bar-container" data-progress-step="${step}">
    <div class="progress-bar"></div>
  </div>
`;

export const syncProgressBar = (step) => {
  const total = formSteps.total;
  const bar = document.querySelector(".progress-bar");
  if (!bar) return;
  const percent = Math.round((step / total) * 100);
  bar.style.width = `${percent}%`;
};

export const getStepNumber = (viewId) => {
  return formSteps.order.find((item) => item.id === viewId)?.step ?? 1;
};
