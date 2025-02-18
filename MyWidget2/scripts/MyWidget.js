define("DS/MyWidget2/scripts/MyWidget", [], function () {
    'use strict';
    
    var myWidget = {
        onLoad: function () {
            // Creating HTML content with form-like structure
            widget.body.innerHTML = `
            <div id='mainContainer' style="height:100vh; width:100vw; display:flex; justify-content:center; align-items:center; font-family:Arial;">
                <div id="calculator" style="width:100%; max-width:500px; height:100%; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
                    <input type="text" id="display" readonly style="width:100%; height:70px; font-size:30px; text-align:right; margin-bottom:20px; padding:10px; border:none; background:#fff; box-shadow:0 0 5px rgba(0, 0, 0, 0.1);">
                    <div id="buttons">
                    <div id="buttons">
                        <button class="btn" data-value="7">7</button>
                        <button class="btn" data-value="8">8</button>
                        <button class="btn" data-value="9">9</button>
                        <button class="btn op" data-value="/">÷</button><br>

                        <button class="btn" data-value="4">4</button>
                        <button class="btn" data-value="5">5</button>
                        <button class="btn" data-value="6">6</button>
                        <button class="btn op" data-value="*">×</button><br>

                        <button class="btn" data-value="1">1</button>
                        <button class="btn" data-value="2">2</button>
                        <button class="btn" data-value="3">3</button>
                        <button class="btn op" data-value="-">−</button><br>

                        <button class="btn" data-value="0">0</button>
                        <button class="btn" data-value=".">.</button>
                        <button class="btn op" data-value="+">+</button>
                        <button id="clear" style="background:#ff6666;">C</button><br>

                        <button id="equals" style="width:100%; margin-top:10px; background:#4CAF50; color:white;">=</button>
                    </div>
                </div>
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
