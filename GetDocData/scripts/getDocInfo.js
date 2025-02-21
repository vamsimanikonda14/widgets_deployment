define('DS/GetDocData/scripts/getDocInfo', ["DS/WAFData/WAFData","DS/i3DXCompassServices/i3DXCompassServices","DS/PlatformAPI/PlatformAPI"], function(WAFData, i3DXCompassServices,PlatformAPI) {
       "use strict";
       var secContext;
	   var getInfo = {
        
		   onLoad: function() {
			   //widget.body.innerHTML = "<p> Hello santhosh welcome to the widget</p>" ;
            
            var Style = document.createElement("style");
            Style.textContent =  `table {
                   width: 100%;
                   border-collapse: collapse;
               }
               th, td {
                   padding: 8px;
                   text-align: center;
                   border: 1px solid black;
               }
               th {
                  /* background-color: #4CAF50;  Green background for header
                   color: white;  White text color for header */
                   background-color: #A2CFFE; /* Baby blue background for header */
                   color: white; /* White text color for header */
               }
               td {
                   background-color: #f2f2f2; /* Light gray background for rows */
               }
               tr:nth-child(even) td {
                   background-color: #e6f7ff; /* Light blue background for even rows */
               }
               tr:nth-child(odd) td {
                   background-color: #f9f9f9; /* Light gray background for odd rows */
               }
        `;
        document.head.appendChild(Style)


                 // Create the heading for the document part information
           var heading = document.createElement("h2");
           heading.textContent = "Document Part's Information";
           
           // Creating the table structure
           var table = document.createElement("table");
           table.setAttribute("border", "1");

           // Creating table headers
           var headerRow = document.createElement("tr");
           var headers = ["S.no", "Type", "Name", "Revision", "State"];
           
           headers.forEach(function(headerText) {
               var th = document.createElement("th");
               th.textContent = headerText;
               headerRow.appendChild(th);
           });

           table.appendChild(headerRow);

           // Adding dynamic rows (Example data, you can replace this with actual data)
           var data = [
               { sno: 1, type: "Doc1", name: "DOC-123", revision: "A.1", state: "In Work" },
               { sno: 2, type: "Doc2", name: "DOC-124", revision: "B.4", state: "Frozen" },
               { sno: 3, type: "Doc3", name: "DOC-125", revision: "C.1", state: "Released" }
           ];
              //console.timeLog
              console.log("::::info:::::::",data)
           // Dynamically adding rows to the table


           getInfo.getDocInfo();



           data.forEach(function(rowData) {
               var row = document.createElement("tr");

               var cells = [
                   rowData.sno, 
                   rowData.type, 
                   rowData.name, 
                   rowData.revision, 
                   rowData.state
               ];

               cells.forEach(function(cellText) {
                   var td = document.createElement("td");
                   td.textContent = cellText;
                   row.appendChild(td);
               });

               table.appendChild(row);
           });

           // Append the heading and the table to the widget body
           widget.body.innerHTML = "";
           widget.body.appendChild(heading);
           widget.body.appendChild(table);;
           

		   },
           getDocInfo: function() {
            var docTitle = widget.getValue("documentTitle");
            console.log("docTitle::::",docTitle);
            var spaceURL = PlatformAPI.getApplicationConfiguration("app.urls.myapps"); // getting 3dspace URl from our here 
            console.log("3DSpace URL ::::::::",spaceURL);
            var dataSetSpaceURL =  spaceURL+"/resources/v1/modeler/documents/search";
            console.log("dataset URL:::::::::",dataSetSpaceURL);
            var url = dataSetSpaceURL+"?searchStr=TitleOfDocument+(current:*)&$top=30&$skip=10";
            console.log("URL ::::::::::::",url);
            WAFData.authenticatedRequest(url,
            {
                'method':'GET',
                'type':'json',
                'headers':{},



            }

            );
 


           }
	   };
  widget.addEvent('onLoad', getInfo.onLoad);
}
); 