"use strict";

class CalculatorCommand {
  constructor(operation, calculator, value) {
    this.operation = operation;
    this.calculator = calculator;
    this.value = value;
  }
}

class CalculatorHistory {
  constructor(name) {
    this.name = name;
    this.currentValue = 0;
    CalculatorHistory.collection.set(name, this);
  }

  static find(name) {
    return CalculatorHistory.collection.get(name);
  }
}

CalculatorHistory.collection = new Map();

const operations = {
  plus: {
    execute: (command) => {
      const calculatorHistory = CalculatorHistory.find(command.calculator);
      calculatorHistory.currentValue += command.value;
    },
    undo: (command) => {
      const calculatorHistory = CalculatorHistory.find(command.calculator);
      calculatorHistory.currentValue -= command.value;
    },
  },
  minus: {
    execute: (command) => {
      const calculatorHistory = CalculatorHistory.find(command.calculator);
      calculatorHistory.currentValue -= command.value;
    },
    undo: (command) => {
      const calculatorHistory = CalculatorHistory.find(command.calculator);
      calculatorHistory.currentValue += command.value;
    },
  },
};

class Calculator {
  constructor() {
    this.commands = [];
  }

  operation(calculatorHistory, sign, amount) {
    const operation = sign === "+" ? "plus" : "minus";
    const { execute } = operations[operation];
    const command = new CalculatorCommand(
      operation,
      calculatorHistory.name,
      amount
    );
    this.commands.push(command);
    console.dir({ command });
    execute(command);
  }

  undo(count) {
    for (let i = 0; i < count; i++) {
      const command = this.commands.pop();
      const { operation } = command;
      const { undo } = operations[operation];
      undo(command);
    }
  }

  showOperations() {
    console.table(this.commands);
  }
}

// Usage

/*const calculator = new Calculator();
const calculatorHistory = new CalculatorHistory("test");
calculator.operation(calculatorHistory, "+", 100);
calculator.operation(calculatorHistory, "-", 40);
calculator.showOperations();
console.table([calculatorHistory]);
calculator.undo(1);
calculator.showOperations();
console.table([calculatorHistory]);*/

module.exports = { Calculator, CalculatorHistory };
