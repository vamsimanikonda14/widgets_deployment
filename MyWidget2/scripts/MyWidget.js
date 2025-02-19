define("DS/MyWidget2/scripts/MyWidget", [], function () {
    'use strict';
    
    var myWidget = {
        onLoad: function () {
            // Creating HTML content with the calculator structure
            widget.body.innerHTML = `
                <div class="calculator" style="background-color: #333; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div class="display" id="display" style="background-color: #222; color: #fff; font-size: 2em; padding: 10px; text-align: right; border-radius: 5px; margin-bottom: 10px;">0</div>
                    <div class="buttons" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                        <button class="clear" style="background-color: #f44336; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">C</button>
                        <button class="operator" style="background-color: #ff9800; color: white; padding: 15px; font-size: 16px; cursor: pointer; border-radius: 5px;">/</button>
                        <button class="operator" style="background-color: #ff9800; color: white; padding: 15px; font-size: 16px; cursor: pointer; border-radius: 5px;">*</button>
                        <button class="operator" style="background-color: #ff9800; color: white; padding: 15px; font-size: 16px; cursor: pointer; border-radius: 5px;">-</button>
                        <button style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">7</button>
                        <button style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">8</button>
                        <button style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">9</button>
                        <button class="operator" style="background-color: #ff9800; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">+</button>
                        <button style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">4</button>
                        <button style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">5</button>
                        <button style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">6</button>
                        <button class="operator" style="background-color: #ff9800; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">%</button>
                        <button style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">1</button>
                        <button style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">2</button>
                        <button style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">3</button>
                        <button class="equals" style="background-color: #2196F3; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">=</button>
                        <button style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">0</button>
                        <button style="background-color: #4CAF50; color: white; padding: 15px; text-align: center; font-size: 16px; cursor: pointer; border-radius: 5px;">.</button>
                    </div>
                </div>
            `;

            let expression = "";

            function updateDisplay() {
                document.getElementById("display").textContent = expression || "0";
            }

            // Button Click Event Listener
            document.querySelectorAll("button").forEach(button => {
                button.addEventListener("click", function () {
                    if (this.classList.contains("clear")) {
                        expression = "";
                    } else if (this.classList.contains("equals")) {
                        try {
                            expression = eval(expression).toString(); // Evaluate expression
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
