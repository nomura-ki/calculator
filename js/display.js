import { ClickState } from "./state.js";

const BtnAction = [
  "CALC_BTN_POINT",
  "CALC_BTN_OPS_ADD",
  "CALC_BTN_OPS_SUB",
  "CALC_BTN_OPS_MUL",
  "CALC_BTN_OPS_DIV",
  "CALC_BTN_BKSP",
  "CALC_BTN_CE",
  "CALC_BTN_CLR",
];

export function updateMainDisplay(value) {
  let mainDisVal;

  if (typeof value === "number") {
    mainDisVal = value.toLocaleString("ja-JP", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 10,
    });
  } else {
    mainDisVal = String(value);
  }

  const mainDis = document.getElementById("CALC_LBL_MDIS");
  mainDis.textContent = mainDisVal;

  AdjustFontSize(mainDis, 45, 16);
}

export function updateSubDisplay(expression) {
  const subDis = document.getElementById("CALC_LBL_SDIS");
  subDis.textContent = expression;

  AdjustFontSize(subDis, 25, 10);
}

function AdjustFontSize(element, maxPx, minPx) {
  element.style.fontSize = maxPx + "px";

  while (element.scrollWidth > element.clientWidth && maxPx > minPx) {
    maxPx--;
    element.style.fontSize = maxPx + "px";
  }
}

export function disabledButton() {
  for (let i = 0; i < 10; i++) {
    document.getElementById(`CALC_BTN_NUM_${i}`).disabled = true;
  }

  for (let i = 0; i < BtnAction.length; i++) {
    document.getElementById(BtnAction[i]).disabled = true;
  }

  ClickState.ClickDisabled = true;

  document
    .getElementById("CALC_BTN_EQ")
    .addEventListener("click", () => exitErrorMode(), { once: true });
}

function enableButtons() {
  for (let i = 0; i < 10; i++) {
    document.getElementById(`CALC_BTN_NUM_${i}`).disabled = false;
  }

  for (let i = 0; i < BtnAction.length; i++) {
    document.getElementById(BtnAction[i]).disabled = false;
  }

  ClickState.ClickDisabled = false;
}

export function exitErrorMode() {
  enableButtons();
  updateMainDisplay("0");
}
