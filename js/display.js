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
}

export function updateSubDisplay(expression) {
  const subDis = document.getElementById("CALC_LBL_SDIS");
  subDis.textContent = expression;
}

export function clearDisplay(type) {
  const mainDis = document.getElementById("CALC_LBL_MDIS");
  const subDis = document.getElementById("CALC_LBL_SDIS");

  switch (type) {
    case "main":
      mainDis.textContent = "0";
      break;

    case "sub":
      subDis.textContent = "";
      break;

    case "all":
    default:
      mainDis.textContent = "0";
      subDis.textContent = "";
      break;
  }
}
