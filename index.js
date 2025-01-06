// first calculator app

const display = document.getElementById("display");

// Store the operator validation pattern
const validOperators = /[+\-*\/]/;
const validNumber = /^\d*\.?\d*$/;

function appendToDisplay(input) {
    // Prevent multiple operators in a row
    if (validOperators.test(input)) {
        const lastChar = display.value.slice(-1);
        if (validOperators.test(lastChar)) {
            return;
        }
    }
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        const expression = display.value;
        
        // Split the expression into numbers and operator
        const numbers = expression.split(/[+\-*\/]/);
        const operator = expression.match(validOperators)?.[0];
        
        // Validate input
        if (!operator || numbers.length !== 2) {
            throw new Error("Invalid expression");
        }
        
        // Convert to numbers and validate
        const num1 = parseFloat(numbers[0]);
        const num2 = parseFloat(numbers[1]);
        
        if (!validNumber.test(numbers[0]) || !validNumber.test(numbers[1])) {
            throw new Error("Invalid numbers");
        }

        // Perform calculation
        let result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    throw new Error("Division by zero");
                }
                result = num1 / num2;
                break;
            default:
                throw new Error("Invalid operator");
        }
        
        // Handle decimal places and display
        display.value = Number.isInteger(result) ? result : result.toFixed(2);
    } catch (error) {
        display.value = error.message || "Error";
        setTimeout(() => {
            display.value = "";
        }, 2000);
    }
}
