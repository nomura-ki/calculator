import {
  handleNumberClick,
  handlePointClick,
  handleOperatorClick,
  handleEqualClick,
  handleBackspaceClick,
  handleClearEntryClick,
  handleClearAllClick,
} from "./calcLogic.js";

for (let i = 0; i < 10; i++) {
  document
    .getElementById(`CALC_BTN_NUM_${i}`)
    .addEventListener("click", () => handleNumberClick(i));
}

document
  .getElementById("CALC_BTN_POINT")
  .addEventListener("click", () => handlePointClick());

document
  .getElementById("CALC_BTN_OPS_ADD")
  .addEventListener("click", () => handleOperatorClick("＋"));

document
  .getElementById("CALC_BTN_OPS_SUB")
  .addEventListener("click", () => handleOperatorClick("ー"));

document
  .getElementById("CALC_BTN_OPS_MUL")
  .addEventListener("click", () => handleOperatorClick("×"));

document
  .getElementById("CALC_BTN_OPS_DIV")
  .addEventListener("click", () => handleOperatorClick("÷"));

document
  .getElementById("CALC_BTN_EQ")
  .addEventListener("click", () => handleEqualClick());

document
  .getElementById("CALC_BTN_BKSP")
  .addEventListener("click", () => handleBackspaceClick());

document
  .getElementById("CALC_BTN_CE")
  .addEventListener("click", () => handleClearEntryClick());

document
  .getElementById("CALC_BTN_CLR")
  .addEventListener("click", () => handleClearAllClick());
