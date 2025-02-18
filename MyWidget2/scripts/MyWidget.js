define("DS/MyWidget2/scripts/MyWidget", [], function () {
    'use strict';
    
    var myWidget = {
        onLoad: function () {
            // Creating HTML content with a more compact form-like structure
            widget.body.innerHTML = `
                <style>
                    .calculator {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 5px; /* Reduced gap between buttons */
                        max-width: 230px; /* Smaller width */
                        margin: 0 auto;
                        padding: 10px; /* Added padding for better appearance */
                    }
                    .calculator button, .calculator input {
                        padding: 15px; /* Reduced padding for buttons */
                        font-size: 1.3em; /* Slightly smaller font */
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        background-color: #f4f4f4;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }
                    .calculator button:hover {
                        background-color: #ddd; /* Button hover effect */
                    }
                    .calculator .display {
                        grid-column: span 4;
                        text-align: right;
                        font-size: 1.5em;
                        padding: 10px;
                        background-color: #f9f9f9;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                    .calculator .result {
                        grid-column: span 4;
                        text-align: right;
                        font-size: 1.5em;
                        font-weight: bold;
                        padding: 10px;
                        background-color: #f9f9f9;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                </style>
                <div class="calculator">
                    <input type="text" id="display" class="display" disabled>
                    <input type="text" id="result" class="result" disabled>
                    <button data-value="7">7</button>
                    <button data-value="8">8</button>
                    <button data-value="9">9</button>
                    <button data-value="/">/</button>
                    <button data-value="4">4</button>
                    <button data-value="5">5</button>
                    <button data-value="6">6</button>
                    <button data-value="*">*</button>
                    <button data-value="1">1</button>
                    <button data-value="2">2</button>
                    <button data-value="3">3</button>
                    <button data-value="-">-</button>
                    <button data-value="0">0</button>
                    <button data-value=".">.</button>
                    <button id="equals">=</button>
                    <button data-value="+">+</button>
                    <button id="clear">C</button>
                    <button id="backspace">⌫</button>
                </div>
            `;

            let expression = "";

            function updateDisplay() {
                document.getElementById("display").value = expression;
            }

            // Button Click Event Listener
            document.querySelectorAll("button").forEach(button => {
                button.addEventListener("click", function () {
                    if (this.id === "clear") {
                        expression = "";
                    } else if (this.id === "equals") {
                        try {
                            expression = eval(expression).toString(); // Evaluate expression
                        } catch {
                            expression = "Error";
                        }
                    } else {
                        expression += this.getAttribute("data-value") || this.textContent;
                    }
                    updateDisplay();
                });
            });
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
