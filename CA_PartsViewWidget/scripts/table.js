console.log("table.js loaded successfully!");

// Function to create and insert a table
function createTable() {
    var container = document.getElementById("mainContainer");

    if (container) {
        // Create table element
        var table = document.createElement("table");
        table.classList.add("custom-table");

        // Add table header
        var headerRow = table.insertRow(0);
        var headers = ["ID", "Name", "Category"];
        headers.forEach(function (text, index) {
            var th = document.createElement("th");
            th.innerHTML = text;
            headerRow.appendChild(th);
        });

        // Add sample data
        var data = [
            [1, "Part A", "Category 1"],
            [2, "Part B", "Category 2"],
            [3, "Part C", "Category 3"]
        ];

        data.forEach(function (rowData) {
            var row = table.insertRow();
            rowData.forEach(function (cellData) {
                var cell = row.insertCell();
                cell.innerHTML = cellData;
            });
        });

        // Append table to container
        container.appendChild(table);
    }
}

// Ensure the table loads after the DOM is ready
document.addEventListener("DOMContentLoaded", createTable);
