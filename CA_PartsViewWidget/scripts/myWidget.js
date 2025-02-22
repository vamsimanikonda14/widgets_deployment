define("DS/CA_PartsViewWidget/scripts/MyWidget", [], function () {
    'use strict';

    var myWidget = {
        onLoad: function () {
            widget.body.innerHTML = "Helloooooooooooooooooooooo";
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
