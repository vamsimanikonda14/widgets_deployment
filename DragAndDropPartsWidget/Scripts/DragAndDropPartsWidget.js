 define("DS/DragAndDropPartsWidget/Scripts/DragAndDropPartsWidget", ["DS/DragAndDrop/DragAndDrop"], function (DragAndDrop) {
        'use strict';
        var secContext = "";
        var myWidget = {

            onLoad: function () {
                var html_before_drop = "<div class='main-Container' id='mainContainer'>" +
                    "<h1>Drop here</h1>" +
                    "</div>";
                widget.body.innerHTML = html_before_drop;
                var theDropElt = document.querySelector('#mainContainer');

                DragAndDrop.droppable(theDropElt, {
                    drop: function (data) {
                        console.log("data----------->> ", data);
                        var rs = JSON.parse(data);
                        if (rs && rs.data && Array.isArray(rs.data.items) && rs.data.items.length > 0) {
                            var parsedData = rs.data.items[0]; // Extract the first item from the data array

                            // Create the table structure with some styles
                            var tableHtml = `
                                <style>
                                    table {
                                        width: 100%;
                                        border-collapse: collapse;
                                        margin: 20px 0;
                                        font-family: Arial, sans-serif;
                                        background-color: #f9f9f9;
                                    }
                                    th, td {
                                        padding: 12px 15px;
                                        text-align: left;
                                        border: 1px solid #ddd;
                                    }
                                    th {
                                        background-color: #4CAF50;
                                        color: white;
                                    }
                                    tr:nth-child(even) {
                                        background-color: #f2f2f2;
                                    }
                                    tr:hover {
                                        background-color: #ddd;
                                    }
                                </style>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Context ID</th>
                                            <th>Object ID</th>
                                            <th>Object Type</th>
                                            <th>Display Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${parsedData.contextId}</td>
                                            <td>${parsedData.objectId}</td>
                                            <td>${parsedData.objectType}</td>
                                            <td>${parsedData.displayName}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            `;

                            // Insert the table into the widget body
                            widget.body.innerHTML = tableHtml;
                        } else {
                            console.error("Invalid data format:", rs);
                        }
                    }
                });
            }
        };
        widget.addEvent('onLoad', myWidget.onLoad);
    });

    define("DS/DropAndDragParts/Scripts/PartsData", ["DS/DataDragAndDrop/DataDragAndDrop"], function (DataDragAndDrop) {
        'use strict';
        var secContext = "";
        var myWidget = {

            onLoad: function () {
                widget.body.innerHTML =
                    "<div id='tableContainer'></div>" +         // Container for table
                    "<div id='dragContainer' style='width:300px;height:200px;border:1px solid black;'>Drag Part Here</div>"; // Drag and drop container
            },

            dragPart: function () {
                DataDragAndDrop.droppable(inputData, {
                    drop: function (data) {
                        try {
                            var dataJSON = JSON.parse(data);
                            if (dataJSON && dataJSON.Sender && dataJSON.Sender === "CAADragAndDropExample") {
                                inputData.innerHTML = dataJSON.ObjectName;
                            }
                        } catch (e) {
                            console.log("Getting error :: ", e);
                        }
                    }
                });
            },

            fetchData: function () {
                var spaceURL = PlatformAPI.getApplicationConfiguration("app.urls.myapps"); // getting 3dspace URL
                console.log("spaceURL :: ", spaceURL);
                let dataSetSpaceUrl = spaceURL + "/resources/v1/modeler/dseng/dseng:EngItem/search";
                var url = dataSetSpaceUrl + "?$searchStr=VPMReference&$mask=dsmveng:EngItemMask.Details";
                var request = url;

                i3DXCompassServices.getPlatformServices({
                    onComplete: function (rs) {
                        rs = rs.trim();
                        if (rs && rs.startsWith('{') && rs.endsWith('}')) {
                            var jsonRes = JSON.parse(rs);
                            console.log('getPlatformServices', jsonRes);
                            console.log('3d space url ', jsonRes[0]);
                        } else {
                            console.error('Invalid JSON response:', rs);
                        }
                    }
                });

                myWidget.requestPersonData(spaceURL);

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
                        myWidget.renderTable(data);
                    },
                    onFailure: function (error) {
                        console.log("fail: " + error);
                    }
                });
            },

            requestPersonData: function (spaceURL, callback) {
                console.log("requestPersonData called");
                var url = spaceURL + "/resources/modeler/pno/person?current=true&select=firstname&select=lastname&select=collabspaces&select=preferredcredentials";
                var data = {};
                var header = {};
                var method = "GET";
                myWidget.sendRequest(url, data, header, method, callback);
            },

            sendRequest: function (url, data, header, method, callback) {
                console.log("sendRequest called");
                WAFData.authenticatedRequest(url, {
                    method: method,
                    data: data,
                    headers: header,
                    type: 'json',
                    onComplete: function (data) {
                        console.log("data ---------::: ", data);
                        this.secContext = myWidget.getSecurityContext(data);
                        console.log("securitycontext : : ", this.secContext);
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
                    var organizationName = obj.organization.name;
                    var collab = obj.collabspace.name;
                    sctx = "ctx::" + rolename + "." + organizationName + "." + collab;
                } else {
                    var obj = data.collabspaces[0];
                    var collab = obj.name;
                    var organizationName = obj.couples[0].organization.name;
                    var rolename = obj.couples[0].role.name;
                    sctx = "ctx::" + rolename + "." + organizationName + "." + collab;
                }
                return sctx;
            },

            renderTable: function (data) {
                var tableHtml = "<table border='1'>" +
                    "<thead>" +
                    "<tr><th>Type</th><th>Name</th><th>Revision</th><th>Maturity</th></tr>" +
                    "</thead><tbody>";

                data.member.forEach(function (part) {
                    tableHtml += "<tr>" +
                        "<td>" + part.type + "</td>" +
                        "<td>" + part.name + "</td>" +
                        "<td>" + part.revision + "</td>" +
                        "<td>" + part.state + "</td>" +
                        "</tr>";
                });

                tableHtml += "</tbody></table>";
                $('#tableContainer').html(tableHtml);
            }
        };

        widget.addEvent('onLoad', myWidget.onLoad);
    });