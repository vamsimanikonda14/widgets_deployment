define("DS/PartsWidget/scripts/SubscriberWidget", [], function () {
    'use strict';

    var subscriberWidget = {
        onLoad: function () {
            // Add a container to show the message or data
            document.body.innerHTML = "<div id='subscriberData'>Waiting for data...</div>";
            
            // Subscribe to the "partsDataUpdated" event
            window.addEventListener("partsDataUpdated", function (event) {
                subscriberWidget.updateData(event.detail); // Handle the data when received
            });
        },

        updateData: function (data) {
            var subscriberDataDiv = document.getElementById('subscriberData');
            subscriberDataDiv.innerHTML = "<strong>Received Data:</strong><pre>" + JSON.stringify(data, null, 2) + "</pre>";
        }
    };

    // Return the widget object to be used in the main script
    return subscriberWidget;
});
