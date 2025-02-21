define( "DS/SubscribePart/Scripts/PartsData", ["DS/PlatformAPI/PlatformAPI"], function ( PlatformAPI) {
    'use strict';
    
    var secContext = "";
    var myWidget = {
        
        onLoad: function () {
            var sub ;
     
            sub = PlatformAPI.subscribe("PartsDataPublish", function (data) {
               //Do the work ...  
               console.log('Received from: ',data );
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
               // Unsubscribing sub to avoid getting more messages
               PlatformAPI.unsubscribe(sub);
            });
        } 

         
    };
    widget.addEvent('onLoad',  myWidget.onLoad);
    
    
});


 