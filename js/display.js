import { ClickState } from "./state.js";

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
  document.getElementById("CALC_BTN_POINT").disabled = true;
  document.getElementById("CALC_BTN_OPS_ADD").disabled = true;
  document.getElementById("CALC_BTN_OPS_SUB").disabled = true;
  document.getElementById("CALC_BTN_OPS_MUL").disabled = true;
  document.getElementById("CALC_BTN_OPS_DIV").disabled = true;
  document.getElementById("CALC_BTN_BKSP").disabled = true;
  document.getElementById("CALC_BTN_CE").disabled = true;
  document.getElementById("CALC_BTN_CLR").disabled = true;
  ClickState.ClickDisabled = true;

  document
    .getElementById("CALC_BTN_EQ")
    .addEventListener("click", () => exitErrorMode(), { once: true });
}

function enableButtons() {
  for (let i = 0; i < 10; i++) {
    document.getElementById(`CALC_BTN_NUM_${i}`).disabled = false;
  }
  document.getElementById("CALC_BTN_POINT").disabled = false;
  document.getElementById("CALC_BTN_OPS_ADD").disabled = false;
  document.getElementById("CALC_BTN_OPS_SUB").disabled = false;
  document.getElementById("CALC_BTN_OPS_MUL").disabled = false;
  document.getElementById("CALC_BTN_OPS_DIV").disabled = false;
  document.getElementById("CALC_BTN_BKSP").disabled = false;
  document.getElementById("CALC_BTN_CE").disabled = false;
  document.getElementById("CALC_BTN_CLR").disabled = false;
  ClickState.ClickDisabled = false;
}

export function exitErrorMode() {
  enableButtons();
  updateMainDisplay("0");
}
