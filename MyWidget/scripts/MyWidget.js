define("DS/MyWidget/scripts/MyWidget", ['DS/DataDragAndDrop/DataDragAndDrop', 'DS/PlatformAPI/PlatformAPI', 'DS/WAFData/WAFData'], function (DataDragAndDrop, PlatformAPI, WAFData) {
    'use strict';

    var myWidget = {
        onLoad: function () {
            // Creating HTML content with form-like structure
            widget.body.innerHTML = "<div class='main-Container' id='mainContainer' style='width: 100%; height: 100%;text-align: center; background-color:#005685;color:#ffffff;'>" +
                                        "<h1>Drop</h1>" +
                                        "<div id='responseForm' style='display:none; margin-top: 20px; background-color:#ffffff; color:#333; padding: 20px; border-radius: 10px;'></div>" +
                                     "</div>";

            var theInput = document.querySelector('#mainContainer');
            DataDragAndDrop.droppable(theInput, {
                drop: function (data) {
                    theInput.value = data;
                    console.log(data);
                    var dataJSON = JSON.parse(data);
                    var objectId = dataJSON.data.items[0].objectId;
                    var objectType = dataJSON.data.items[0].objectType;
                    alert("type: " + objectType);
                    var securityContext = dataJSON.data.items[0].contextId;
                    console.log("type", objectType + objectId + securityContext);
                    // Call the web service
                    myWidget.callWebService(objectId, securityContext);
                },
            });
        },

        callWebService: function (objectId, securityContext) {
            let spaceUrl = PlatformAPI.getApplicationConfiguration("app.urls.myapps");
            var resource = '/resources/v1/modeler/dseng/dseng:EngItem/' + objectId;
            
            // Using WAFData to make an authenticated request
            WAFData.authenticatedRequest(spaceUrl + resource, {
                method: "GET",
                headers: {
                    "SecurityContext": securityContext,
                    'Content-Type': 'application/json',
                },
                type: 'json',
                onComplete: function (rs) {
                    console.log("Response received", rs);
                    myWidget.displayResponseForm(rs); // Pass the response to display
                },
                onFailure: function (error) {
                    console.log("Error occurred", error);
                    // Handle error here (e.g., show an alert to the user)
                    alert('An error occurred while fetching the data.');
                }
            });
        },

        displayResponseForm: function (response) {
            // Hide the "drop" area and show the response form
            document.querySelector('#mainContainer').style.display = 'none';
            var responseForm = document.querySelector('#responseForm');
            responseForm.style.display = 'block';

            // Create and populate the form elements dynamically based on the response
            var formHTML = "<h2>Response Data</h2>";

            if (response && response.data) {
                formHTML += "<p><strong>Object ID:</strong> " + response.data.items[0].objectId + "</p>";
                formHTML += "<p><strong>Object Type:</strong> " + response.data.items[0].objectType + "</p>";
                formHTML += "<p><strong>Security Context:</strong> " + response.data.items[0].contextId + "</p>";
                // Add more fields based on your response structure
                formHTML += "<p><strong>Description:</strong> " + (response.data.items[0].description || 'No description available') + "</p>";
            } else {
                formHTML += "<p>No data available</p>";
            }

            responseForm.innerHTML = formHTML;
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
