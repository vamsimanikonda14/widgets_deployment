define("DS/MyWidget2/scripts/MyWidget", [], function () {
    'use strict';
    
    var myWidget = {
        onLoad: function () {
            // Creating HTML content with the calculator structure
            widget.body.innerHTML = `
                <div class="calculator">
                    <div class="display" id="display">0</div>
                    <div class="buttons">
                        <button class="clear">C</button>
                        <button class="operator">/</button>
                        <button class="operator">*</button>
                        <button class="operator">-</button>
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                        <button class="operator">+</button>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                        <button class="operator">%</button>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button class="equals">=</button>
                        <button>0</button>
                        <button>.</button>
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
