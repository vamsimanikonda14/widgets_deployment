define("DS/PartsWidget/scripts/PartsWidget", ["DS/WAFData/WAFData"], function (WAFData) {
    'use strict';

    var PartsWidget = {
        onLoadWidget: function () {
            console.log("Widget Loaded");
        },

        // Function to fetch data from the API
        fetchData: function() {
            let dataSetSpaceUrl = "https://vdemopro1161dsy.extranet.3ds.com/3DSpace/resources/v1/modeler/dseng/dseng:EngItem/search";
            var url = dataSetSpaceUrl + "?$searchStr=VPMReference&$mask=dsmveng:EngItemMask.Details";
            var request = url;

            WAFData.authenticatedRequest(request, {
                method: "GET",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "SecurityContext": "VPLMAdmin.Company Name.Default"
                },
                type: 'json',
                onComplete: function (data) {
                    console.log("On complete", data);
                    PartsWidget.renderTable(data);  // Call renderTable function to display data
                },
                onFailure: function (error) {
                    console.log("fail: " + error);
                    PartsWidget.handleError(error);  // Handle the error in a dedicated function
                }
            });
        },

        // Function to render the table with data
        renderTable: function (data) {
            // Check if parts data exists and has data
            if (data && data.parts && data.parts.length > 0) {
                var tableHtml = `
                    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; margin-top: 20px;">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Revision</th>
                                <th>Maturity State</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.parts.forEach(function (part) {
                    tableHtml += `
                        <tr>
                            <td>${part.type}</td>
                            <td>${part.name}</td>
                            <td>${part.revision}</td>
                            <td>${part.maturityState}</td>
                        </tr>
                    `;
                });

                tableHtml += `</tbody></table>`;

                document.getElementById("tableContainer").innerHTML = tableHtml;
            } else {
                var defaultHtml = `
                    <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; margin-top: 20px;">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Revision</th>
                                <th>Maturity State</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="4" style="text-align: center; font-style: italic;">No data available</td>
                            </tr>
                        </tbody>
                    </table>
                `;
                document.getElementById("tableContainer").innerHTML = defaultHtml;
            }
        },

        // Function to handle errors and display them in a user-friendly way
        handleError: function(error) {
            var errorMessage = document.createElement("div");
            errorMessage.innerHTML = 'Failed to load data.';
            errorMessage.style.position = "fixed";
            errorMessage.style.left = "50%";
            errorMessage.style.top = "50%";
            errorMessage.style.transform = "translate(-50%, -50%)";  // Center it vertically and horizontally
            errorMessage.style.padding = "10px 20px";
            errorMessage.style.backgroundColor = "#f44336";  // Red background for error
            errorMessage.style.color = "white";
            errorMessage.style.borderRadius = "5px";
            errorMessage.style.fontSize = "16px";
            errorMessage.style.textAlign = "center";
            errorMessage.style.zIndex = "1000";  // Ensure the error message is on top

            document.body.appendChild(errorMessage);
        },

        // Function to trigger the fetchData when needed (like button click or event)
        displayTable: function () {
            this.fetchData();  // Call fetchData when the button is clicked or widget is triggered
        }
    };

    // Ensuring the button click binds properly to the displayTable method
    document.getElementById("yourButtonId").addEventListener('click', function() {
        PartsWidget.displayTable();  // Call displayTable when button is clicked
    });

    return PartsWidget;
});
