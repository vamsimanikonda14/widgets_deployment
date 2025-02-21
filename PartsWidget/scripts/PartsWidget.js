define("DS/PartsWidget/scripts/PartsWidget", ["DS/WAFData/WAFData","DS/PlatformAPI/PlatformAPI], function (WAFData,API) {
    'use strict';

    var myWidget = {
        currentPage: 1,
        rowsPerPage: 10, // Number of rows to show per page

        onLoad: function () {
            // Add button and table container to the body
            document.body.innerHTML =  
                "<button id='partsButton'>Load Parts</button>" + // Add button
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
						var topicName = 'CAAMyApp';
						 API.publish(topicName, data );
                    }
                },
                onFailure: function (error) {
                    console.log("Request failed:", error);
                }
            });
        },

        renderTable: function (data) {
            // Paginate the data
            var startIndex = (this.currentPage - 1) * this.rowsPerPage;
            var endIndex = startIndex + this.rowsPerPage;
            var pageData = data.slice(startIndex, endIndex);

            var tableHtml = "<table>" +
                            "<thead>" +
                            "<tr><th>Type</th><th>Name</th><th>Revision</th><th>Maturity</th></tr>" + // Table headers
                            "</thead><tbody>";

            // Loop through the paginated data to generate table rows
            pageData.forEach(function (part) {
                tableHtml += "<tr>" +
                             "<td>" + (part.type || 'N/A') + "</td>" + // Handle missing values
                             "<td>" + (part.name || 'N/A') + "</td>" + // Handle missing values
                             "<td>" + (part.revision || 'N/A') + "</td>" + // Handle missing values
                             "<td>" + (part.state || 'N/A') + "</td>" + // Handle missing values
                             "</tr>";
            });

            tableHtml += "</tbody></table>";

            // Create Pagination controls
            var totalPages = Math.ceil(data.length / this.rowsPerPage);
            var paginationHtml = "<div class='pagination'>";

            if (this.currentPage > 1) {
                paginationHtml += "<button id='prevPage'>Previous</button>";
            }

            if (this.currentPage < totalPages) {
                paginationHtml += "<button id='nextPage'>Next</button>";
            }

            paginationHtml += "</div>";

            // Inject the table and pagination HTML into the table container
            $('#tableContainer').html(tableHtml + paginationHtml);

            // Bind pagination events
            $('#prevPage').on('click', function () {
                if (myWidget.currentPage > 1) {
                    myWidget.currentPage--;
                    myWidget.renderTable(data); // Re-render table with new page
                }
            });

            $('#nextPage').on('click', function () {
                var totalPages = Math.ceil(data.length / myWidget.rowsPerPage);
                if (myWidget.currentPage < totalPages) {
                    myWidget.currentPage++;
                    myWidget.renderTable(data); // Re-render table with new page
                }
            });
        }
    };

    // Return the widget object to be used in the main script
    return myWidget;
});
