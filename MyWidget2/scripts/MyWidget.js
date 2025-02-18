define("DS/MyWidget2/scripts/MyWidget", [], function () {
    'use strict';
    
    var myWidget = {
        onLoad: function () {
            // Creating HTML content with form-like structure
            widget.body.innerHTML = `<style>
                    .calculator {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 10px;
                        max-width: 250px;
                        margin: 0 auto;
                    }
                    .calculator button, .calculator input {
                        padding: 20px;
                        font-size: 1.5em;
                    }
                    .calculator .display {
                        grid-column: span 4;
                        text-align: right;
                        font-size: 1.2em;
                    }
                    .calculator .result {
                        grid-column: span 4;
                        text-align: right;
                        font-size: 1.5em;
                        font-weight: bold;
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
        document.querySelectorAll(".btn").forEach(button => {
            button.addEventListener("click", function () {
                expression += this.getAttribute("data-value");
                updateDisplay();
            });
        });

        // Operator Buttons
        document.querySelectorAll(".op").forEach(button => {
            button.addEventListener("click", function () {
                if (expression !== "" && !/[+\-*/]$/.test(expression)) {
                    expression += this.getAttribute("data-value");
                    updateDisplay();
                }
            });
        });

        // Clear Button
        document.getElementById("clear").addEventListener("click", function () {
            expression = "";
            updateDisplay();
        });

        // Equals Button
        document.getElementById("equals").addEventListener("click", function () {
            try {
                expression = eval(expression).toString(); // Evaluate expression
            } catch {
                expression = "Error";
            }
            updateDisplay();
        });
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
