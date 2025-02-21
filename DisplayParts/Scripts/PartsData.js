define("DS/DisplayParts/Scripts/PartsData", ["DS/WAFData/WAFData", "DS/PlatformAPI/PlatformAPI", "DS/i3DXCompassServices/i3DXCompassServices"], function (WAFData, PlatformAPI, i3DXCompassServices) {
    'use strict';
    var secContext;
    var myWidget = {
        onLoad: function () {

            // fetch("Scripts/table.html")
            //     .then((tfile) => tfile.text())  // <-- Missing parentheses ()
            //     .then((html) => { widget.body.innerHTML = html });

            // this.WAFData = WAFData;
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
        fetchData: function () {
            var spaceURL = PlatformAPI.getApplicationConfiguration("app.urls.myapps");// getting 3dspace url
            console.log("spaceURL :: ", spaceURL);
            // let dataSetSpaceUrl =  "https://vdemopro1161dsy.extranet.3ds.com/3DSpace"+"/resources/v1/modeler/dseng/dseng:EngItem/search";
            let dataSetSpaceUrl = spaceURL + "/resources/v1/modeler/dseng/dseng:EngItem/search";
            var url = dataSetSpaceUrl + "?$searchStr=VPMReference&$mask=dsmveng:EngItemMask.Details";
            var request = url;
            i3DXCompassServices.getPlatformServices({
                onComplete: function (rs) {
                    // rs = rs.trim();
                    console.log('getPlatformServices', rs);
                    console.log('3d space url ', rs[0]);


                }
            });

            myWidget.requestPersonData(spaceURL, function (data) {
                // Now you can safely access secContext after the request has completed
                console.log("data::::::::::: ", data);
                console.log("securitycontext : authenticatedRequest : ", secContext);

                //let that = this;
                WAFData.authenticatedRequest(request, {
                    method: "GET",
                    //  data: JSON.stringify(_data),
                    headers: {
                        "Accept": "*/*",
                        "Content-Type": "application/json",
                        // "Cache-Control": "no-cache",
                        "SecurityContext": secContext//"VPLMAdmin.Company Name.Default"
                    },
                    type: 'json',
                    onComplete: function (data) {
                        console.log("On complete", data);
                        myWidget.renderTable(data);
                    },
                    onFailure: function (error) {
                        console.log("fail: " + error);
                    }
                });
            });



        },
        requestPersonData: function (spaceURL, callback) {
            console.log("requestPersonData called");
            var url = spaceURL + "/resources/modeler/pno/person?current=true&select=firstname&select=lastname&select=collabspaces&select=preferredcredentials";
            var data = {
            };
            var header = {
            };
            var method = "GET";
            myWidget.sendRequest(url, data, header, method, callback);
        },
        sendRequest: function (url, data, header, method, callback) {
            console.log("sendRequest called");
            //var t0 = performance.now();
            WAFData.authenticatedRequest(url, {
                method: method,
                data: data,
                headers: header,
                type: 'json',
                onComplete: function (data) {
                    console.log("data ---------::: ", data);
                    // var t1 = performance.now();
                    // console.log("Time to process person request: " + (t1 - t0) + " milliseconds.");//test perfoprmance
                    secContext = myWidget.getSecurityContext(data);
                    console.log("securitycontext : : ", secContext);
                    // data.securitycontext = securitycontext;
                    callback(data);
                },
                onFailure: function (error) {
                    console.log("fail: " + error);
                    callback();
                }
            });
        },
        getSecurityContext: function (data) {
            console.log("getSecurityContext ---------::: ", data);
            var sctx;
            if (data.preferredcredentials) {
                var obj = data.preferredcredentials;
                var rolename = obj.role.name;
                var oraganizationName = obj.organization.name;
                var collab = obj.collabspace.name;
                sctx = "ctx::" + rolename + "." + oraganizationName + "." + collab;
            }
            else {
                var obj = data.collabspaces[0];
                var collab = obj.name;
                var oraganizationName = obj.couples[0].organization.name;
                var rolename = obj.couples[0].role.name;
                sctx = "ctx::" + rolename + "." + oraganizationName + "." + collab;
            }
            return sctx;
        },

        renderTable: function (data) {
            // Add the CSS styles dynamically
            var styles = `
            <style>
                .styled-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    font-family: Arial, sans-serif;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
    
                .styled-table th {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 15px;
                    text-align: left;
                }
    
                .styled-table td {
                    padding: 10px 15px;
                    text-align: left;
                    border: 1px solid #ddd;
                }
    
                .styled-table tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
    
                .styled-table tr:hover {
                    background-color: #ddd;
                }
    
                .styled-table {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                }
    
                #tableContainer {
                    max-width: 100%;
                    overflow-x: auto;
                }
            </style>
        `;

            // Inject the CSS styles into the head of the document
            $('head').append(styles);

            // Dynamically generate the table based on the fetched data
            var tableHtml = "<table class='styled-table'>" +
                "<thead>" +
                "<tr><th>Type</th><th>Name</th><th>Revision</th><th>Maturity</th></tr>" + // Table headers
                "</thead><tbody>";

            // Loop through the API data to generate table rows
            data.member.forEach(function (part) {
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
