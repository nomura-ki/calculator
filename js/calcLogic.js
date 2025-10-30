import {
  setPhase,
  getPhase,
  setOperandA,
  getOperandA,
  setOperandB,
  getOperandB,
  setOperator,
  getOperator,
} from "./state.js";

import { updateMainDisplay, updateSubDisplay } from "./display.js";

//共有ユーティリティ
const MaxNumber = 16;

function isOverMaxNumber(mn) {
  const Number = String(mn).replace(".", "");
  return Number.length > MaxNumber;
}

function activeName() {
  return getPhase() === "EnteringA" ? "operandA" : "operandB";
}

function getActive() {
  return activeName() === "operandA" ? getOperandA() : getOperandB();
}

function setActive(value) {
  return activeName() === "operandA" ? setOperandA(value) : setOperandB(value);
}

function refreshSubDisplay(withEqual) {
  if (withEqual === undefined) {
    withEqual = false;
  }

  const oprdA = getOperandA();
  const oprdB = getOperandB();
  const op = getOperator();

  if (op === null) {
    updateSubDisplay("");
    return;
  }

  const left = oprdA === "" ? "0" : oprdA;
  const right = oprdB === "" ? (withEqual ? left : "0") : oprdB;

  if (withEqual === true) {
    updateSubDisplay(`${left} ${op} ${right} =`);
  } else if (withEqual === false && oprdB === "") {
    updateSubDisplay(`${left} ${op}`);
  } else {
    updateSubDisplay(`${left} ${op}`);
  }
}

//イベント
export function handleNumberClick(n) {
  if (getPhase() === "ResultShown") {
    setOperandA("");
    setOperandB("");
    setOperator(null);
    setPhase("EnteringA");
    updateSubDisplay("");
  }

  let getOperand = getActive();

  if (getOperand === "" || getOperand === "0") {
    getOperand = String(n);
  } else {
    getOperand = String(getOperand) + String(n);
  }

  if (isOverMaxNumber(getOperand)) {
    return;
  }

  setActive(getOperand);
  updateMainDisplay(getOperand);
  refreshSubDisplay();
}

export function handlePointClick() {
  if (getPhase() === "ResultShown") {
    setOperandA("0");
    setOperandB("");
    setOperator(null);
    setPhase("EnteringA");
    updateSubDisplay("");
  }

  let getOperand = getActive();

  if (getOperand.includes(".")) {
    return;
  } else if (getOperand === "" || getOperand === undefined) {
    getOperand = `0.`;
  } else {
    getOperand = `${getOperand}.`;
  }

  setActive(getOperand);
  updateMainDisplay(getOperand);
  refreshSubDisplay();
}

export function handleOperatorClick(op) {
  if (getOperandA() === "") {
    setOperandA("0");
  }

  if (getPhase() === "ResultShown") {
    setPhase("EnteringB");
    setOperator(op);
    setOperandB("");
    updateMainDisplay(getOperandA());
    refreshSubDisplay();
    return;
  }

  if (getPhase() === "EnteringB" && getOperandB() === "") {
    setOperator(op);
    refreshSubDisplay();
    return;
  } else if (getPhase() === "EnteringB") {
    const oldOp = getOperator();
    const oprdA = getOperandA() || "0";
    const oprdB = getOperandB() || "0";

    const A = parseFloat(oprdA);
    const B = parseFloat(oprdB);

    if (oldOp === "÷" && B === 0) {
      setOperandA("0");
      setOperandB("");
      setOperator(null);
      updateMainDisplay("0で割ることはできません");
      updateSubDisplay("");
      setPhase(ResultShown);
      return;
    }

    let calc = 0;
    switch (oldOp) {
      case "＋":
        calc = A + B;
        break;

      case "ー":
        calc = A - B;
        break;

      case "×":
        calc = A * B;
        break;

      case "÷":
        calc = A / B;
        break;

      default:
        return;
    }

    const dispCalc = isOverMaxNumber(calc) ? calc.toExponential() : calc;

    setOperandA(dispCalc);
    setOperandB("");
    setOperator(op);
    setPhase("EnteringB");
    refreshSubDisplay();
    updateMainDisplay(dispCalc);
    return;
  }

  setOperator(op);
  setPhase("EnteringB");
  setOperandB("");
  refreshSubDisplay();
  updateMainDisplay(getOperandA());
}

export function handleEqualClick() {
  const op = getOperator();
  const oprdA = getOperandA() || "0";
  const oprdB = getOperandB() || (getPhase() === "EnteringB" ? oprdA : "");

  if (op === null || op === undefined) {
    return;
  }

  const A = parseFloat(oprdA);
  const B = parseFloat(oprdB === "" ? "0" : oprdB);

  if (op === "÷" && B === 0) {
    setOperandA("0");
    setOperandB("");
    setOperator(null);
    updateMainDisplay("0で割ることはできません");
    updateSubDisplay("");
    setPhase(ResultShown);
    return;
  }

  let calc = 0;
  switch (op) {
    case "＋":
      calc = A + B;
      break;

    case "ー":
      calc = A - B;
      break;

    case "×":
      calc = A * B;
      break;

    case "÷":
      calc = A / B;
      break;

    default:
      return;
  }

  const dispCalc = isOverMaxNumber(calc) ? calc.toExponential() : calc;

  refreshSubDisplay(true);
  setOperandA(String(dispCalc));
  setOperandB("");
  setOperator(null);
  setPhase("ResultShown");
  updateMainDisplay(dispCalc);
}

export function handleBackspaceClick() {
  if (getPhase() === "ResultShown") {
    updateSubDisplay("");
    setPhase("EnteringA");
    return;
  }

  if (getPhase() === "EnteringB" || getOperandB() === "") return;

  let calc = getActive() ?? "0";

  if (calc.length < 2) {
    calc = "0";
  } else {
    calc = calc.slice(0, -1);
  }

  setActive(calc);
  updateMainDisplay(calc);
  refreshSubDisplay();
}

export function handleClearEntryClick() {
  if (getPhase() === "ResultShown") {
    setOperandA("0");
    setOperandB("");
    setOperator(null);
    setPhase("EnteringA");
    updateMainDisplay("0");
    refreshSubDisplay();
    return;
  }

  let calc = getActive() ?? "0";

  calc = "";

  setActive(calc);
  updateMainDisplay("0");
  refreshSubDisplay();
}

export function handleClearAllClick() {
  setOperandA("0");
  setOperandB("");
  setOperator(null);
  setPhase("EnteringA");
  updateMainDisplay("0");
  refreshSubDisplay();
}
