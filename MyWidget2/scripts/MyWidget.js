define("DS/MyWidget2/scripts/MyWidget", [], function () {
    'use strict';
    
    var myWidget = {
        onLoad: function () {
            // Creating HTML content with form-like structure
            widget.body.innerHTML = `<div id='mainContainer'>
            <div id="calculator" >
                <input type="text" id="display" readonly>
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
