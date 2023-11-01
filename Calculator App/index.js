document.addEventListener("DOMContentLoaded", function () {
    let displayValue = "0";
    let memory = '';
    let operator = "";
    let firstOperand = "";
    let secondOperand = "";
    let pendingOperation = false;
    let showBinary = false; // Flag to indicate binary mode
  
    const display = document.getElementById("rsult_txt");
  
    
    // Function to update the display
    function updateDisplay() {
    if (displayValue.length > 12) {
        displayValue = parseFloat(displayValue).toExponential(2); // Convert to scientific notation
    }
    display.textContent = displayValue;
    }

  
    // Function to clear the calculator
    function clearCalculator() {
      displayValue = "0";
      operator = "";
      firstOperand = "";
      secondOperand = "";
      pendingOperation = false;
      updateDisplay();
    }
  
    // Handle digit buttons
    document.querySelectorAll(".digit").forEach((button) => {
      button.addEventListener("click", () => {
        if (pendingOperation) {
          displayValue = "";
          pendingOperation = false;
        }
        if (displayValue.length < 12) {
          if (displayValue !== "0" || button.textContent !== "0") {
            displayValue += button.textContent;
          }
          updateDisplay();
        }
      });
    });
  
    // Handle operator buttons
    document.querySelectorAll(".operator").forEach((button) => {
      button.addEventListener("click", () => {
        if (operator && firstOperand && displayValue) {
          secondOperand = displayValue;
          firstOperand = operate(firstOperand, secondOperand, operator);
          displayValue = firstOperand;
          pendingOperation = true;
          operator = button.textContent;
        } else {
          firstOperand = displayValue;
          operator = button.textContent;
          pendingOperation = true;
        }
        updateDisplay();
      });
    });
  
    // Handle equals button
    document.getElementById("equal").addEventListener("click", () => {
      if (operator && firstOperand && displayValue) {
        secondOperand = displayValue;
        firstOperand = operate(firstOperand, secondOperand, operator);
        displayValue = firstOperand;
        operator = "";
        pendingOperation = true;
        updateDisplay();
      }
    });
  
    // Handle clear button
    document.getElementById("clear").addEventListener("click", () => {
      clearCalculator();
    });
  
    // Handle backspace button
    document.getElementById("backspace").addEventListener("click", () => {
      if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
      } else {
        displayValue = "0";
      }
      updateDisplay();
    });
  
    // Handle binary operator
    document.getElementById("binary").addEventListener("click", () => {
      showBinary = !showBinary;
      if (showBinary) {
        displayValue = (+displayValue).toString(2);
      } else {
        displayValue = parseInt(displayValue, 2).toString();
      }
      updateDisplay();
    });
  
    // Memory functions
    document.getElementById("m-plus").addEventListener("click", () => {
      memory += parseFloat(displayValue);
    });
  
    document.getElementById("m-minus").addEventListener("click", () => {
      memory -= parseFloat(displayValue);
    });
  
    document.getElementById("m-rec").addEventListener("click", () => {
      displayValue = memory.toString();
      updateDisplay();
      pendingOperation = true;
    });
  
    document.getElementById("m-clear").addEventListener("click", () => {
      memory = 0;
    });
  
    // Function to perform basic operations
    function operate(a, b, op) {
      a = parseFloat(a);
      b = parseFloat(b);
      switch (op) {
        case "+":
          return (a + b).toString();
        case "-":
          return (a - b).toString();
        case "x":
          return (a * b).toString();
        case "÷":
          return b === 0 ? "Error" : (a / b).toString();
        default:
          return b;
      }
    }
  
    updateDisplay();
  });
  