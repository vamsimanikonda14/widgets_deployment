define("DS/DisplayParts/Scripts/PartsData", ["DS/WAFData/WAFData"], function (WAFData) {
    'use strict';
    var myWidget = {
        onLoad: function () {
            _this.WAFData = WAFData;
            widget.body.innerHTML =  
                "<button id='partsButton'>Parts</button>" + // Add button
                "<div id='tableContainer'></div>"; // Container for table

            // Button click event
            $('#partsButton').on('click', function () {
                myWidget.fetchData();
            });
        },

      /*  fetchData: function () {
            // Example API endpoint
            var apiUrl = 'https://api.example.com/parts'; // Replace with your actual API endpoint

            // Fetch data from the API
            $.ajax({
                url: apiUrl,
                method: 'GET',
                success: function (data) {
                    myWidget.renderTable(data); // Call the function to render the table with data
                },
                error: function (err) {
                    console.error('Error fetching data:', err);
                }
            });
        },*/
        fetchData: function() {
             
                    let dataSetSpaceUrl =  "https://vdemopro1161dsy.extranet.3ds.com/3DSpace"+"/resources/v1/modeler/dseng/dseng:EngItem/search";
                    var url = dataSetSpaceUrl+ "?$searchStr=VPMReference&$mask=dsmveng:EngItemMask.Details" ;
                    var request = url;
    
            //let that = this;
            this.WAFData.authenticatedRequest(request, {
                method: "GET",
              //  data: JSON.stringify(_data),
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                   // "Cache-Control": "no-cache",
                    "SecurityContext ": "dsmveng:EngItemMask.Details"
                },
                type: 'json',
                onComplete: function (data) {
                    console.log("On complete",rs);
                    myWidget.renderTable(data);
                },
                onFailure: function (error) {
                    console.log("fail: " + error);
                }
            }); 
    
    
     
    },

        renderTable: function (data) {
            // Dynamically generate a table based on the fetched data
            var tableHtml = "<table border='1'>" +
                            "<thead>" +
                            "<tr><th>Type</th><th>Name</th><th>Revision</th><th>Maturity</th></tr>" + // Table headers
                            "</thead><tbody>";

            // Loop through the API data to generate table rows
            data.forEach(function (part) {
                tableHtml += "<tr>" +
                             "<td>" + part.type + "</td>" +
                             "<td>" + part.name + "</td>" +
                             "<td>" + part.revision + "</td>" +
                             "<td>" + part.state + "</td>" +
                             "</tr>";
            });

            tableHtml += "</tbody></table>";

            // Inject the table HTML into the table container
            $('#tableContainer').html(tableHtml);
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
