define("DS/DroupAndDragParts/Scripts/PartsData", ["DS/DataDragAndDrop/DataDragAndDrop"], function (DataDragAndDrop) {
    'use strict';
    
    var secContext = "";
    var myWidget = {
        
        onLoad: function () {
            var html_before_drop = "<div class='main-Container' id='mainContainer'>"+
            "<h1>Droup here</h1>"+"</div>";
            widget.body.innerHTML=html_before_drop ;
            var theDropElt = document.querySelector('#mainContainer');

            DataDragAndDrop.droppable( theDropElt , {  
                drop : function(data) {		
                    console.log("data----------->> ",data);
                    var  rs = JSON.parse(data);
                    if (rs && rs.data && Array.isArray(rs.data.items) && rs.data.items.length > 0) {
                        var parsedData = rs.data.items[0];  // Extract the first item from the data array
            
                        // Create the table structure
                        var tableHtml = "<table border='1'><thead><tr><th>Context ID</th><th>Object ID</th><th>Object Type</th><th>Display Name</th></tr></thead><tbody>";
                        
                        // Add a row with the data values
                        tableHtml += "<tr>" +
                            "<td>" + parsedData.contextId + "</td>" +
                            "<td>" + parsedData.objectId + "</td>" +
                            "<td>" + parsedData.objectType + "</td>" +
                            "<td>" + parsedData.displayName + "</td>" +
                            "</tr>";
                        
                        tableHtml += "</tbody></table>";
                        
                        // Insert the table into the widget body
                        widget.body.innerHTML = tableHtml;
                    } else {
                        console.error("Invalid data format:", rs);
                    }
                    
                    // Insert the table into the widget body
                    widget.body.innerHTML = tableHtml;					    
  
                } 
            }) ;	
        },

         
    };
    widget.addEvent('onLoad',  myWidget.onLoad);
    
    
});


/*define("DS/DroupAndDragParts/Scripts/PartsData", ["DS/DataDragAndDrop/DataDragAndDrop"], function (DataDragAndDrop ) {
    'use strict';
    var secContext = "";
    var myWidget = {
        
        onLoad: function () {
           // this.WAFData = WAFData;
            widget.body.innerHTML =  
            "<div id='tableContainer'></div>" +         // Container for table
            "<div id='dragContainer' style='width:300px;height:200px;border:1px solid black;'>Drag Part Here</div>"; // Drag and drop container
        

            
           
        },

        daragPart : function(){
        DataDragAndDrop.droppable( inputData , {  
            drop : function(data) {
                try {
                    var dataJSON=JSON.parse(data);
                    if ( dataJSON && dataJSON.Sender && dataJSON.Sender === "CAADragAndDropExample") {
                       //Our choice to control where come from the dragged element. 
                       inputData.innerHTML(dataJSON.ObjectName );
                    
                    }	
                }	
                catch (e) {
                     console.log("Getting error :: ",e);
                }					
            } 
        } ); 
    },
       fetchData: function() {
                    var spaceURL = PlatformAPI.getApplicationConfiguration("app.urls.myapps");// getting 3dspace url
                    console.log("spaceURL :: ",spaceURL);
                   // let dataSetSpaceUrl =  "https://vdemopro1161dsy.extranet.3ds.com/3DSpace"+"/resources/v1/modeler/dseng/dseng:EngItem/search";
                   let dataSetSpaceUrl =  spaceURL+"/resources/v1/modeler/dseng/dseng:EngItem/search"; 
                   var url = dataSetSpaceUrl+ "?$searchStr=VPMReference&$mask=dsmveng:EngItemMask.Details" ;
                    var request = url;
                    i3DXCompassServices.getPlatformServices({
                        onComplete: function(rs) {
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
                    
            //let that = this;
            WAFData.authenticatedRequest(request, {
                method: "GET",
              //  data: JSON.stringify(_data),
                headers: {
                    "Accept": "*//*",
                  /*  "Content-Type": "application/json",
                   // "Cache-Control": "no-cache",
                    "SecurityContext": "VPLMAdmin.Company Name.Default"
                },
                type: 'json',
                onComplete: function (data) {
                    console.log("On complete",data);
                    myWidget.renderTable(data);
                },
                onFailure: function (error) {
                    console.log("fail: " + error);
                }
            }); 
    
    
     
    },
      requestPersonData : function (spaceURL,callback) {
        console.log("requestPersonData called");
        var url = spaceURL + "/resources/modeler/pno/person?current=true&select=firstname&select=lastname&select=collabspaces&select=preferredcredentials";
        var data = {
        };
        var header = {
        };
        var method = "GET";
        myWidget.sendRequest(url, data, header, method, callback);
    },
      sendRequest : function (url, data, header, method, callback) {
        console.log("sendRequest called");
        //var t0 = performance.now();
        WAFData.authenticatedRequest(url, {
            method: method,
            data: data,
            headers: header,
            type: 'json',
            onComplete: function (data) {
                console.log("data ---------::: ",data);
               // var t1 = performance.now();
               // console.log("Time to process person request: " + (t1 - t0) + " milliseconds.");//test perfoprmance
               this.secContext= myWidget.getSecurityContext(data);
                console.log("securitycontext : : ",this.secContext);
               // data.securitycontext = securitycontext;
                callback(data); 
            },
            onFailure: function (error) {
                console.log("fail: " + error);
                callback();
            }
        });
    },
      getSecurityContext :function(data){
        console.log("getSecurityContext ---------::: ",data);
        var sctx;
        if(data.preferredcredentials){    
            var obj = data.preferredcredentials;
            var rolename = obj.role.name;
            var oraganizationName =obj.organization.name;
            var collab =obj.collabspace.name;
            sctx = "ctx::"+rolename+"."+oraganizationName+"."+collab; 
        }
        else{
            var obj = data.collabspaces[0]; 
            var collab = obj.name;
            var oraganizationName =obj.couples[0].organization.name;
            var rolename =obj.couples[0].role.name;
            sctx = "ctx::"+rolename+"."+oraganizationName+"."+collab;
        } 
        return sctx;
    },

        renderTable: function (data) {
            // Dynamically generate a table based on the fetched data
            var tableHtml = "<table border='1'>" +
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
});*/
