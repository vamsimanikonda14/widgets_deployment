define("DS/CA_PartsViewWidget/scripts/MyWidget", [], function () {
    'use strict';

    var myWidget = {
        onLoad: function () {
            // Adding CSS styles
            widget.body.innerHTML = `<div>
            <button class="clear">C</button>
                        <button class="operator">/</button>
                        <button class="operator">*</button>
                        <button class="operator">-</button>
            </div>`




        }

    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
