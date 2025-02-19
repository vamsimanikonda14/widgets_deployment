define("DS/PartsWidget/scripts/PartsWidget", ["DS/WAFData/WAFData"], function (WAFData) {
    'use strict';

    var myWidget = {
        onLoad: function () {
            // Adding a button and table container
            document.body.innerHTML =  
                "<button id='partsButton'>Parts</button>" + // Add button
                "<div id='tableContainer'></div>"; // Container for table

            // Button click event
            $('#partsButton').on('click', function () {
                myWidget.fetchData();
            });
        },

        fetchData: function () {
            let dataSetSpaceUrl = "https://vdemopro1161dsy.extranet.3ds.com/3DSpace/resources/v1/modeler/dseng/dseng:EngItem/search";
            var url = dataSetSpaceUrl + "?$searchStr=VPMReference&$mask=dsmveng:EngItemMask.Details";
    
            WAFData.authenticatedRequest(url, {
                method: "GET",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "SecurityContext": "VPLMAdmin.Company Name.Default"
                },
                type: 'json',
                onComplete: function (data) {
                    console.log("On complete", data);
                    if (data && data.member) {
                        myWidget.renderTable(data.member); // Ensure data.member exists
                    }
                },
                onFailure: function (error) {
                    console.log("Request failed:", error);
                }
            });
        },

        renderTable: function (data) {
            var tableHtml = "<table border='1'>" +
                            "<thead>" +
                            "<tr><th>Type</th><th>Name</th><th>Revision</th><th>Maturity</th></tr>" + // Table headers
                            "</thead><tbody>";

            // Loop through the API data to generate table rows
            data.forEach(function (part) {
                tableHtml += "<tr>" +
                             "<td>" + (part.type || 'N/A') + "</td>" + // Handle missing values
                             "<td>" + (part.name || 'N/A') + "</td>" + // Handle missing values
                             "<td>" + (part.revision || 'N/A') + "</td>" + // Handle missing values
                             "<td>" + (part.state || 'N/A') + "</td>" + // Handle missing values
                             "</tr>";
            });

            tableHtml += "</tbody></table>";

            // Inject the table HTML into the table container
            $('#tableContainer').html(tableHtml);
        }
    };

    // Initialize the widget when it's ready
    return myWidget;
});
