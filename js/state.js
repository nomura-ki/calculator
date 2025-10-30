let operandA = "0";
let operandB = "";
let operator = null;
let phase = "EnteringA";

export function setPhase(newPhase) {
  phase = newPhase;
}

export function getPhase() {
  return phase;
}

export function setOperandA(value) {
  operandA = value;
}

export function getOperandA() {
  return operandA;
}

export function setOperandB(value) {
  operandB = value;
}

export function getOperandB() {
  return operandB;
}

export function setOperator(op) {
  operator = op;
}

export function getOperator() {
  return operator;
}

export const ClickState = {
  ClickDisabled: false,
};
