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
            
                // Create a table for displaying the data
                responseContent.innerHTML += "<table class='response-table'>";
                
                // Table headers
                responseContent.innerHTML += "<thead><tr>";
                responseContent.innerHTML += "<th>Name</th><th>Title</th><th>Description</th><th>ID</th><th>Type</th><th>Modified</th><th>Created</th><th>Revision</th><th>State</th><th>Owner</th><th>Organization</th><th>Collaboration</th><th>Cestamp</th>";
                responseContent.innerHTML += "</tr></thead>";
                
                // Table body with item data
                responseContent.innerHTML += "<tbody><tr>";
                responseContent.innerHTML += "<td>" + item.name + "</td>";
                responseContent.innerHTML += "<td>" + item.title + "</td>";
                responseContent.innerHTML += "<td>" + (item.description || 'No description available') + "</td>";
                responseContent.innerHTML += "<td>" + item.id + "</td>";
                responseContent.innerHTML += "<td>" + item.type + "</td>";
                responseContent.innerHTML += "<td>" + item.modified + "</td>";
                responseContent.innerHTML += "<td>" + item.created + "</td>";
                responseContent.innerHTML += "<td>" + item.revision + "</td>";
                responseContent.innerHTML += "<td>" + item.state + "</td>";
                responseContent.innerHTML += "<td>" + item.owner + "</td>";
                responseContent.innerHTML += "<td>" + item.organization + "</td>";
                responseContent.innerHTML += "<td>" + item.collabspace + "</td>";
                responseContent.innerHTML += "<td>" + item.cestamp + "</td>";
                responseContent.innerHTML += "</tr></tbody>";
                
                // Close the table
                responseContent.innerHTML += "</table>";
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
