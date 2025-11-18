import { startRouter } from "./router.js";
import { registerGlobalEvents } from "./events.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");
  if (!root) throw new Error("Missing #app container");
  registerGlobalEvents();
  startRouter(root);
});
