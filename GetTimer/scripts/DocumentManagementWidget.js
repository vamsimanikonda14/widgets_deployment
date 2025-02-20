define("DS/GetTimer/scripts/DocumentManagementWidget", [""], function () {
  "use strict";
  var rk_Widget = {
    onLoad: function () {
      widget.body.innerHTML =
        '<div class="container"> \ 
            <h1>📂 Document Management</h1> \ 
            <div class="search-bar"> \ 
                🔍 Search: <input type="text" id="searchInput" placeholder="Search documents..."> \ 
                <button id="filterBtn">Filter</button> \ 
                <button id="uploadBtn">Upload</button> \ 
            </div> \ 
            <table class="doc-table"> \ 
                <thead> \ 
                    <tr> \ 
                        <th>📄 Document Name</th> \ 
                        <th>📂 Type of Document</th> \ 
                        <th>📅 Last Modified</th> \ 
                        <th>🔄 Version</th> \ 
                    </tr> \ 
                </thead> \ 
                <tbody id="docList"> \ 
                    <tr> \ 
                        <td>🔗 Design_Specs_V1</td> \ 
                        <td> \ 
                            <select class="docType"> \ 
                                <option value="CAD">🏗 CAD File</option> \ 
                                <option value="Specification">📜 Specification</option> \ 
                                <option value="PDF">📄 PDF Document</option> \ 
                            </select> \ 
                        </td> \ 
                        <td><input type="date" class="datePicker" value="2025-02-18"></td> \ 
                        <td>1.0</td> \ 
                    </tr> \ 
                    <tr> \ 
                        <td>📝 Requirements_Doc</td> \ 
                        <td> \ 
                            <select class="docType"> \ 
                                <option value="CAD">🏗 CAD File</option> \ 
                                <option value="Specification" selected>📜 Specification</option> \ 
                                <option value="PDF">📄 PDF Document</option> \ 
                            </select> \ 
                        </td> \ 
                        <td><input type="date" class="datePicker" value="2025-02-17"></td> \ 
                        <td>2.1</td> \ 
                    </tr> \ 
                    <tr> \ 
                        <td>📂 Project_Plan</td> \ 
                        <td> \ 
                            <select class="docType"> \ 
                                <option value="CAD">🏗 CAD File</option> \ 
                                <option value="Specification">📜 Specification</option> \ 
                                <option value="PDF" selected>📄 PDF Document</option> \ 
                            </select> \ 
                        </td> \ 
                        <td><input type="date" class="datePicker" value="2025-02-15"></td> \ 
                        <td>3.0</td> \ 
                    </tr> \ 
                </tbody> \ 
            </table> \ 
            <div class="actions"> \ 
                <button id="previewBtn">🔍 Preview</button> \ 
                <button id="downloadBtn">⬇️ Download</button> \ 
                <button id="checkInOutBtn">🔄 Check-In/Out</button> \ 
            </div> \ 
        </div>';

      document.querySelectorAll(".datePicker").forEach(function (input) {
        input.addEventListener("change", function () {
          console.log("Date changed to: ", this.value);
        });
      });
      
      document.querySelectorAll(".docType").forEach(function (select) {
        select.addEventListener("change", function () {
          console.log("Document type changed to: ", this.value);
        });
      });
    }
  };
  
  widget.addEvent("onLoad", rk_Widget.onLoad);
});
