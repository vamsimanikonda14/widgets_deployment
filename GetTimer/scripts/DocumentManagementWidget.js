define("DS/GetTimer/scripts/DocumentManagementWidget", [], function () {
  "use strict";

  var rk_Widget = {
    onLoad: function () {
      // Load the login screen first
      rk_Widget.loadLoginScreen();
    },

    // Function to create the login screen
    loadLoginScreen: function () {
      widget.body.innerHTML = `
        <div class="login-container">
          <h2>🔐 Document Management Login</h2>
          <label>👤 Username:</label>
          <input type="text" id="username" placeholder="Enter username" required>
          
          <label>📂 Document Type:</label>
          <select id="docTypeSelect">
            <option value="CAD">🏗 CAD File</option>
            <option value="Specification">📜 Specification</option>
            <option value="PDF">📄 PDF Document</option>
          </select>

          <button id="loginBtn">Submit</button>
        </div>
      `;

      // Add event listener for login
      document.getElementById("loginBtn").addEventListener("click", function () {
        let username = document.getElementById("username").value;
        let docType = document.getElementById("docTypeSelect").value;

        if (username.trim() === "") {
          alert("⚠️ Please enter your username.");
          return;
        }

        // Store user details and move to document list page
        rk_Widget.loadDocumentList(username, docType);
      });
    },

    // Function to create the document list page
    loadDocumentList: function (username, docType) {
      widget.body.innerHTML = `
        <div class="container">
          <h1>📂 Document Management</h1>
          <p>Welcome, <strong>${username}</strong>! Showing documents of type: <strong>${docType}</strong></p>
          
          <div class="search-bar">
            🔍 Search: <input type="text" id="searchInput" placeholder="Search documents...">
            <button id="filterBtn">Filter</button>
            <button id="uploadBtn">Upload</button>
          </div>

          <table class="doc-table">
            <thead>
              <tr>
                <th>📄 Document Name</th>
                <th>📂 Type of Document</th>
                <th>📅 Last Modified</th>
                <th>🔄 Version</th>
              </tr>
            </thead>
            <tbody id="docList">
              <tr>
                <td>🔗 Design_Specs_V1</td>
                <td>
                  <select class="docType">
                    <option value="CAD" selected>🖥️ CAD File</option>
                    <option value="Specification">📜 Specification</option>
                    <option value="PDF">📄 PDF Document</option>
                  </select>
                </td>
                <td><input type="date" class="datePicker" value="2025-02-18"></td>
                <td>1.0</td>
              </tr>
              <tr>
                <td>📝 Requirements_Doc</td>
                <td>
                  <select class="docType">
                    <option value="CAD">🖥️ CAD File</option>
                    <option value="Specification" selected>📜 Specification</option>
                    <option value="PDF">📄 PDF Document</option>
                  </select>
                </td>
                <td><input type="date" class="datePicker" value="2025-02-17"></td>
                <td>2.1</td>
              </tr>
              <tr>
                <td>📂 Project_Plan</td>
                <td>
                  <select class="docType">
                    <option value="CAD">🖥️ CAD File</option>
                    <option value="Specification">📜 Specification</option>
                    <option value="PDF" selected>📄 PDF Document</option>
                  </select>
                </td>
                <td><input type="date" class="datePicker" value="2025-02-15"></td>
                <td>3.0</td>
              </tr>
            </tbody>
          </table>

          <div class="actions">
            <button id="previewBtn">🔍 Preview</button>
            <button id="downloadBtn">⬇️ Download</button>
            <button id="checkInBtn">🔄 Check-In</button>
			 <button id="checkOutBtn">🔄 Check-Out</button>
          </div>
        </div>
      `;

      // Add event delegation for dynamic elements
      document.body.addEventListener("change", function (event) {
        if (event.target.classList.contains("datePicker")) {
          console.log("Date changed to:", event.target.value);
        }
        if (event.target.classList.contains("docType")) {
          console.log("Document type changed to:", event.target.value);
        }
      });
    }
  };

  widget.addEvent("onLoad", rk_Widget.onLoad);
});
