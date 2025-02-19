define('DS/GetDocData/scripts/getDocInfo', [], function() {
       "use strict";
	   var Trail = {
		   onLoad: function() {
			   //widget.body.innerHTML = "<p> Hello santhosh welcome to the widget</p>" ;
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

           // Dynamically adding rows to the table
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
           

		   }
	   };
  widget.addEvent('onLoad', Trail.onLoad);
}
);