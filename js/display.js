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
