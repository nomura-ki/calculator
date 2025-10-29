import {
  setPhase,
  getPhase,
  setOperandA,
  getOperandA,
  setOperandB,
  getOperandB,
  setOperator,
  getOperator,
  clearEntry,
  resetAll,
} from "./state.js";

import {
  updateMainDisplay,
  updateSubDisplay,
  clearDisplay,
} from "./display.js";

//共有ユーティリティ
const MaxNumber = 12;

function isOverMaxNumber(mn) {
  const Number = String(mn).replace("-", "").replace(".", "");
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
  const right = oprdB === "" ? "0" : oprdB;

  if (withEqual === true) {
    updateSubDisplay(`${left} ${op} ${right} =`);
  } else if (withEqual === false && oprdB === "") {
    updateSubDisplay(`${left} ${op}`);
  } else {
    updateSubDisplay(`${left} ${op} ${right}`);
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
    getOperand = n;
  } else {
    getOperand += n;
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
  if (getPhase() === "ResultShown") {
    setPhase("EnteringB");
    setOperator(op);
    setOperandB("");
    updateMainDisplay(getOperandA());
    refreshSubDisplay();
    return;
  }

  if (phase === "EnteringB" && getOperandB() === "") {
    setOperator(op);
    refreshSubDisplay();
    return;
  }

  setOperator(op);
  setPhase("EnteringB");
  setOperandB("");
  refreshSubDisplay();
  updateMainDisplay(getOperandA());
}

export function handleEqualClick() {
  const oprdA = getOperandA() || "0";
  const oprdB =
    getOperandB() || (getPhase() === "EnteringB" ? getOperandA() : "");
  const op = getOperator();

  if (op === null || op === undefined) {
    return;
  }

  const A = parseFloat(oprdA);
  const B = parseFloat(oprdB === "" ? "0" : oprdB);
}
