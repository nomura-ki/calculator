import { handleNumberClick } from "./calcLogic.js";

document
  .getElementById("CALC_BTN_NUM_1")
  .addEventListener("click", () => handleNumberClick(1));

document
  .getElementById("CALC_BTN_NUM_2")
  .addEventListener("click", () => handleNumberClick(2));
