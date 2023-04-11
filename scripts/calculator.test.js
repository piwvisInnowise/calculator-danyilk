const { Calculator, CalculatorHistory } = require("./calculator.js");

test("add 100", () => {
  const calculator = new Calculator();
  const calculatorHistory = new CalculatorHistory("jest");
  calculator.operation(calculatorHistory, "+", 100);
  expect(calculatorHistory.currentValue).toBe(100);
});

test("minus 10", () => {
  const calculator = new Calculator();
  const calculatorHistory = new CalculatorHistory("jest");
  calculator.operation(calculatorHistory, "-", 10);
  expect(calculatorHistory.currentValue).toBe(-10);
});
