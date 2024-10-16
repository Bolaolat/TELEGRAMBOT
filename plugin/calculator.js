// plugin/calculator.js

// Function to evaluate mathematical expressions
function calculate(expression) {
    // Check if the expression contains invalid characters
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        throw new Error("Invalid characters in expression. Only numbers and +, -, *, /, (, ) are allowed.");
    }

    try {
        // Use JavaScript's built-in eval function to calculate the expression
        const result = eval(expression);
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Calculation error. Please check your input.");
        }
        return result;
    } catch (error) {
        throw new Error("Invalid expression. Please enter a valid mathematical expression.");
    }
}

module.exports = calculate;
