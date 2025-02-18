// define("DS/CA_PartsViewWidget/scripts/myWidget", [], function () {
//     'use strict';

//     var myWidget = {
//         onLoad: function () {

//             widget.body.innerHTML = "<div class='main-Container' id='mainContainer'>Hello World! SS" +
//                 "Selected Type : </div>";
//             // Create an empty container for the table
//             widget.body.innerHTML = "<div class='main-Container' id='mainContainer'></div>";

//             // Dynamically load the table.js script
//             var script = document.createElement("script");
//             script.src = "DS/CA_PartsViewWidget/scripts/table.js"; // Ensure the correct path
//             script.type = "text/javascript";
//             script.async = true;
//             document.head.appendChild(script);
//         }
//     };

//     // Attach onLoad event to widget
//     // widget.addEvent('onLoad', myWidget.onLoad);
//     return myWidget;
// });

define("DS/CA_PartsViewWidget/scripts/myWidget", [], function () {
    'use strict';

    var myWidget = {
        onLoad: function () {
            console.log("myWidget.js loaded successfully!");

            // Create a container inside the widget
            widget.body.innerHTML = "<div class='main-Container' id='mainContainer'></div>";

            // Load table.js dynamically
            var script = document.createElement("script");
            script.src = "DS/CA_PartsViewWidget/scripts/table.js"; // Ensure this path is correct
            script.type = "text/javascript";
            script.async = true;
            document.head.appendChild(script);
        }
    };

    // ✅ Ensure we return the object correctly
    return myWidget;
});
