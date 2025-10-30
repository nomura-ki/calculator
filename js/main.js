import {
  handleNumberClick,
  handlePointClick,
  handleOperatorClick,
  handleEqualClick,
  handleBackspaceClick,
  handleClearEntryClick,
  handleClearAllClick,
} from "./calcLogic.js";

import { ClickState } from "./state.js";

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

function KeyInput() {
  const KeyAction = {};

  for (let i = 0; i < 10; i++) {
    KeyAction[String(i)] = () => handleNumberClick(i);
  }

  KeyAction["."] = () => handlePointClick();
  KeyAction["+"] = () => handleOperatorClick("＋");
  KeyAction["-"] = () => handleOperatorClick("ー");
  KeyAction["*"] = () => handleOperatorClick("×");
  KeyAction["/"] = () => handleOperatorClick("÷");
  KeyAction["Backspace"] = () => handleBackspaceClick();
  KeyAction["Delete"] = () => handleClearEntryClick();
  KeyAction["Escape"] = () => handleClearAllClick();

  document.addEventListener("keydown", (event) => {
    if (ClickState.ClickDisabled) return;

    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("CALC_BTN_EQ").click();
      return;
    }

    if (KeyAction[event.key]) {
      KeyAction[event.key]();
    }
  });
}

KeyInput();
