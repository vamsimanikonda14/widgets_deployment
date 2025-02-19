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
            
                // Define the CSS styles
                var style = `
                <style>
                    .response-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                        font-family: Arial, sans-serif;
                    }
            
                    .response-table th,
                    .response-table td {
                        padding: 12px;
                        text-align: left;
                        border: 1px solid #ddd;
                    }
            
                    .response-table th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }
            
                    .response-table tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
            
                    .response-table tr:hover {
                        background-color: #e9e9e9;
                    }
            
                    .response-table td {
                        word-wrap: break-word;
                    }
                </style>
                `;
            
                // Create a table for displaying the data
                var tableHTML = "<table class='response-table'>";
            
                // Table headers
                tableHTML += "<thead><tr>";
                tableHTML += "<th>Name</th><th>Title</th><th>Description</th><th>ID</th><th>Type</th><th>Modified</th><th>Created</th><th>Revision</th><th>State</th><th>Owner</th><th>Organization</th><th>Collaboration</th><th>Cestamp</th>";
                tableHTML += "</tr></thead>";
            
                // Table body with item data
                tableHTML += "<tbody><tr>";
                tableHTML += "<td>" + item.name + "</td>";
                tableHTML += "<td>" + item.title + "</td>";
                tableHTML += "<td>" + (item.description || 'No description available') + "</td>";
                tableHTML += "<td>" + item.id + "</td>";
                tableHTML += "<td>" + item.type + "</td>";
                tableHTML += "<td>" + item.modified + "</td>";
                tableHTML += "<td>" + item.created + "</td>";
                tableHTML += "<td>" + item.revision + "</td>";
                tableHTML += "<td>" + item.state + "</td>";
                tableHTML += "<td>" + item.owner + "</td>";
                tableHTML += "<td>" + item.organization + "</td>";
                tableHTML += "<td>" + item.collabspace + "</td>";
                tableHTML += "<td>" + item.cestamp + "</td>";
                tableHTML += "</tr></tbody>";
            
                // Close the table
                tableHTML += "</table>";
            
                // Insert the style and the table into the responseContent element
                responseContent.innerHTML = style + tableHTML;
            } else {
                responseContent.innerHTML = "<div>No data available</div>";
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
