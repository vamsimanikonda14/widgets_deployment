define("DS/CA_PartsViewWidget/scripts/MyWidget", [], function () {
    'use strict';

    var myWidget = {
        onLoad: function () {
            // Adding CSS styles
            widget.body.innerHTML =
                `<style>
                    .calculator {
                        background-color: #333;
                        border-radius: 10px;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .display {
                        background-color: #222;
                        color: #fff;
                        font-size: 2em;
                        padding: 10px;
                        text-align: right;
                        border-radius: 5px;
                        margin-bottom: 10px;
                    }
                    .buttons {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 10px;
                    }
                    button {
                        padding: 15px;
                        text-align: center;
                        font-size: 16px;
                        cursor: pointer;
                        border-radius: 5px;
                        color: white;
                    }
                    .clear {
                        background-color: #f44336;
                    }
                    .operator {
                        background-color: #ff9800;
                    }
                    .equals {
                        background-color: #2196F3;
                    }
                    .number {
                        background-color: #4CAF50;
                    }
                </style>
                <div class="calculator">
                    <div class="display" id="display">0</div>
                    <div class="buttons">
                        <button class="clear">C</button>
                        <button class="operator">/</button>
                        <button class="operator">*</button>
                        <button class="operator">-</button>
                        <button class="number">7</button>
                        <button class="number">8</button>
                        <button class="number">9</button>
                        <button class="operator">+</button>
                        <button class="number">4</button>
                        <button class="number">5</button>
                        <button class="number">6</button>
                        <button class="operator">%</button>
                        <button class="number">1</button>
                        <button class="number">2</button>
                        <button class="number">3</button>
                        <button class="equals">=</button>
                        <button class="number">0</button>
                        <button class="number">.</button>
                    </div>
                </div>`
                ;

            let expression = "";

            function updateDisplay() {
                document.getElementById("display").textContent = expression || "0";
            }

            // Button Click Event Listener
            document.querySelectorAll("button").forEach(button => {
                button.addEventListener("click", function () {
                    if (this.classList.contains("clear")) {
                        expression = "0";
                    } else if (this.classList.contains("equals")) {
                        try {
                            expression = b(expression).toString(); // Evaluate expression
                        } catch {
                            expression = "Error";
                        }
                    } else {
                        expression += this.textContent || this.getAttribute("data-value");
                    }
                    updateDisplay();
                });
            });
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
