define("DS/MyWidget2/scripts/MyWidget", [], function () {
    'use strict';
    
    var myWidget = {
        onLoad: function () {
            // Creating HTML content with a more compact form-like structure
            widget.body.innerHTML = `
                <div style="text-align: center;">
                    <input type="text" id="display" disabled style="width: 230px; font-size: 1.5em; padding: 10px; text-align: right; margin-bottom: 10px;">
                    <br>
                    <input type="text" id="result" disabled style="width: 230px; font-size: 1.5em; padding: 10px; text-align: right; margin-bottom: 10px;">
                    <div>
                        <button data-value="7" style="padding: 10px; font-size: 1.3em;">7</button>
                        <button data-value="8" style="padding: 10px; font-size: 1.3em;">8</button>
                        <button data-value="9" style="padding: 10px; font-size: 1.3em;">9</button>
                        <button data-value="/" style="padding: 10px; font-size: 1.3em;">/</button>
                    </div>
                    <div>
                        <button data-value="4" style="padding: 10px; font-size: 1.3em;">4</button>
                        <button data-value="5" style="padding: 10px; font-size: 1.3em;">5</button>
                        <button data-value="6" style="padding: 10px; font-size: 1.3em;">6</button>
                        <button data-value="*" style="padding: 10px; font-size: 1.3em;">*</button>
                    </div>
                    <div>
                        <button data-value="1" style="padding: 10px; font-size: 1.3em;">1</button>
                        <button data-value="2" style="padding: 10px; font-size: 1.3em;">2</button>
                        <button data-value="3" style="padding: 10px; font-size: 1.3em;">3</button>
                        <button data-value="-" style="padding: 10px; font-size: 1.3em;">-</button>
                    </div>
                    <div>
                        <button data-value="0" style="padding: 10px; font-size: 1.3em;">0</button>
                        <button data-value="." style="padding: 10px; font-size: 1.3em;">.</button>
                        <button id="equals" style="padding: 10px; font-size: 1.3em;">=</button>
                        <button data-value="+" style="padding: 10px; font-size: 1.3em;">+</button>
                    </div>
                    <div>
                        <button id="clear" style="padding: 10px; font-size: 1.3em;">C</button>
                        <button id="backspace" style="padding: 10px; font-size: 1.3em;">⌫</button>
                    </div>
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
