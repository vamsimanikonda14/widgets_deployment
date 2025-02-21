define("DS/MyWidget2/scripts/MyWidget", [], function () {
    'use strict';

    var myWidget = {
        onLoad: function () {

            fetch("scripts/table.html")
                .then((tfile) => tfile.text).
                then((html) => { widget.body.innerHTML = html })
        }

    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
