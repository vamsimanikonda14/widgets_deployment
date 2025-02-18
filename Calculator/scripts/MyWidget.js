define("DS/Calculator/scripts/MyWidget",[],
    function () {
        'use strict';
        var mywidget = {
            onLoad: function () {
                widget.body.innerHTML = `
                <div class='main-Container' id='mainContainer' style="text-align:center; font-family:Arial;">
                    <h2>Real-Time Calculator</h2>
                    <div id="calculator" style="display:inline-block; padding:20px; border:2px solid #333; border-radius:10px; background:#f4f4f4;">
                        <input type="text" id="display" readonly style="width:100%; height:50px; font-size:20px; text-align:right; margin-bottom:10px; border-radius:5px; border:1px solid #ccc; padding:5px;">
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
           
        }
    };
            }
        };
        widget.addEvent('onLoad', mywidget.onLoad);
});
