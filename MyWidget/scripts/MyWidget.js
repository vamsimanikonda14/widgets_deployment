define("DS/MyWidget/scripts/MyWidget", ['DS/DataDragAndDrop/DataDragAndDrop', 'DS/PlatformAPI/PlatformAPI', 'DS/WAFData/WAFData'], function (DataDragAndDrop, PlatformAPI, WAFData) {
    'use strict';

    var myWidget = {
        onLoad: function () {
            // Creating HTML content with form-like structure
            widget.body.innerHTML = "<div class='main-Container' id='mainContainer' style='width: 100%; height: 100%;text-align: center; background-color:#005685; color: #ffffff; padding: 40px;'>" +
                                        "<h1>Drag and Drop Data</h1>" +
                                        "<div id='responseForm' style=' margin-top: 20px; background-color:#ffffff; color:#333; padding: 40px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); width: 80%; max-width: 800px; margin: 0 auto;'>" +
                                            "<h2 style='color: #005685;'>Response Data</h2>" +
                                            "<div id='responseContent'></div>" +
                                            "<button id='returnBtn' style='margin-top: 20px; padding: 10px 20px; background-color: #005685; color: #fff; border: none; border-radius: 5px; cursor: pointer;'>Return to Drop Area</button>" +
                                        "</div>" +
                                     "</div>";

            var theInput = document.querySelector('#mainContainer');
            DataDragAndDrop.droppable(theInput, {
                drop: function (data) {
                    theInput.value = data;
                    console.log(data);
                    var dataJSON = JSON.parse(data);
                    var objectId = dataJSON.data.items[0].objectId;
                    var objectType = dataJSON.data.items[0].objectType;
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
            var responseForm = document.querySelector('#responseForm');
            var responseContent = document.querySelector('#responseContent');
            
            // Clear previous content before adding new content
            responseContent.innerHTML = '';
            var inputs = responseForm.querySelectorAll('input, textarea, select');
            inputs.forEach(function(input) {
                input.value = '';  // Clear the input value
            });
            // Check if there is a valid response and the 'member' array is populated
            if (response && response.member && response.member.length > 0) {
                var item = response.member[0]; // Since there is only 1 item in the member array
                
                // Create a form for displaying the data
                responseContent.innerHTML += "<form class='response-form'>";
            
                // Name and Title will have inputs (text fields)
                responseContent.innerHTML += "<div class='response-item'><strong>Name:</strong> <input type='text' value='" + item.name + "' readonly /></div>";
                responseContent.innerHTML += "<div class='response-item'><strong>Title:</strong> <input type='text' value='" + item.title + "' readonly /></div>";
                
                // Description can have an input or textarea depending on length
                responseContent.innerHTML += "<div class='response-item'><strong>Description:</strong> <textarea readonly>" + (item.description || 'No description available') + "</textarea></div>";
                
                // Other fields like ID and Type, etc., will be in input fields
                responseContent.innerHTML += "<div class='response-item'><strong>ID:</strong> <input type='text' value='" + item.id + "' readonly /></div>";
                responseContent.innerHTML += "<div class='response-item'><strong>Type:</strong> <input type='text' value='" + item.type + "' readonly /></div>";
                
                // Date fields (Modified, Created) - assuming they are strings, they can go in text fields
                responseContent.innerHTML += "<div class='response-item'><strong>Modified:</strong> <input type='text' value='" + item.modified + "' readonly /></div>";
                responseContent.innerHTML += "<div class='response-item'><strong>Created:</strong> <input type='text' value='" + item.created + "' readonly /></div>";
                
                // Revision, State, Owner, Organization, etc., will also use text inputs
                responseContent.innerHTML += "<div class='response-item'><strong>Revision:</strong> <input type='text' value='" + item.revision + "' readonly /></div>";
                responseContent.innerHTML += "<div class='response-item'><strong>State:</strong> <input type='text' value='" + item.state + "' readonly /></div>";
                responseContent.innerHTML += "<div class='response-item'><strong>Owner:</strong> <input type='text' value='" + item.owner + "' readonly /></div>";
                responseContent.innerHTML += "<div class='response-item'><strong>Organization:</strong> <input type='text' value='" + item.organization + "' readonly /></div>";
                responseContent.innerHTML += "<div class='response-item'><strong>Collaboration Space:</strong> <input type='text' value='" + item.collabspace + "' readonly /></div>";
                responseContent.innerHTML += "<div class='response-item'><strong>Cestamp:</strong> <input type='text' value='" + item.cestamp + "' readonly /></div>";
                
                // Close the form
                responseContent.innerHTML += "</form>";
            } else {
                responseContent.innerHTML += "<div>No data available</div>";
            }
            

            // Optionally, add labels if available
            if (response && response.nlsLabel) {
                responseContent.innerHTML += "<hr><h3>Field Labels:</h3>";
                for (var key in response.nlsLabel) {
                    responseContent.innerHTML += "<div><strong>" + response.nlsLabel[key] + ":</strong> " + key + "</div>";
                }
            }

            
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
