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

            // Check if there is a valid response and the 'member' array is populated
            if (response && response.member && response.member.length > 0) {
                var item = response.member[0]; // Since there is only 1 item in the member array

                formHTML += "<p><strong>Name:</strong> " + item.name + "</p>";
                formHTML += "<p><strong>Title:</strong> " + item.title + "</p>";
                formHTML += "<p><strong>Description:</strong> " + (item.description || 'No description available') + "</p>";
                formHTML += "<p><strong>ID:</strong> " + item.id + "</p>";
                formHTML += "<p><strong>Type:</strong> " + item.type + "</p>";
                formHTML += "<p><strong>Modified:</strong> " + item.modified + "</p>";
                formHTML += "<p><strong>Created:</strong> " + item.created + "</p>";
                formHTML += "<p><strong>Revision:</strong> " + item.revision + "</p>";
                formHTML += "<p><strong>State:</strong> " + item.state + "</p>";
                formHTML += "<p><strong>Owner:</strong> " + item.owner + "</p>";
                formHTML += "<p><strong>Organization:</strong> " + item.organization + "</p>";
                formHTML += "<p><strong>Collaboration Space:</strong> " + item.collabspace + "</p>";
                formHTML += "<p><strong>Cestamp:</strong> " + item.cestamp + "</p>";
            } else {
                formHTML += "<p>No data available</p>";
            }

            // Add labels for each field (optional)
            if (response && response.nlsLabel) {
                formHTML += "<hr><h3>Field Labels:</h3>";
                for (var key in response.nlsLabel) {
                    formHTML += "<p><strong>" + response.nlsLabel[key] + ":</strong> " + key + "</p>";
                }
            }

            responseForm.innerHTML = formHTML;
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
