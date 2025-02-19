define("DS/PartsWidget/scripts/PartsWidget", [], function () {
    'use strict';

    var PartsWidget = {
        onLoadWidget: function () {
            console.log("Widget Loaded");
        },

        // Function to display the table when the button is clicked
        displayTable: function () {
            // Example fetch URL for retrieving parts data
            fetch('https://api.example.com/getParts')  // Replace with actual URL
                .then(response => response.json())  // Parse the JSON data
                .then(data => {
                    // Check if data.parts exists and has any data
                    if (data.parts && data.parts.length > 0) {
                        // Create the table HTML structure
                        var tableHtml = `
                            <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; margin-top: 20px;">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Name</th>
                                        <th>Revision</th>
                                        <th>Maturity State</th>
                                    </tr>
                                </thead>
                                <tbody>
                        `;

                        // Loop through the data and generate rows for the table
                        data.parts.forEach(function (part) {
                            tableHtml += `
                                <tr>
                                    <td>${part.type}</td>
                                    <td>${part.name}</td>
                                    <td>${part.revision}</td>
                                    <td>${part.maturityState}</td>
                                </tr>
                            `;
                        });

                        // Close the table body and table tag
                        tableHtml += `</tbody></table>`;

                        // Insert the generated table HTML into the container
                        document.getElementById("tableContainer").innerHTML = tableHtml;
                    } else {
                        // If no data is available, show a default message with the header
                        var defaultHtml = `
                            <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; margin-top: 20px;">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Name</th>
                                        <th>Revision</th>
                                        <th>Maturity State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="4" style="text-align: center; font-style: italic;">No data available</td>
                                    </tr>
                                </tbody>
                            </table>
                        `;
                        // Insert the default HTML structure
                        document.getElementById("tableContainer").innerHTML = defaultHtml;
                    }
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);

                    // Create error message and apply styles
                    var errorMessage = document.createElement("div");
                    errorMessage.innerHTML = 'Failed to load data.';
                    errorMessage.style.position = "fixed";
                    errorMessage.style.left = "50%";
                    errorMessage.style.top = "50%";
                    errorMessage.style.transform = "translate(-50%, -50%)";  // Center it vertically and horizontally
                    errorMessage.style.padding = "10px 20px";
                    errorMessage.style.backgroundColor = "#f44336";  // Red background for error
                    errorMessage.style.color = "white";
                    errorMessage.style.borderRadius = "5px";
                    errorMessage.style.fontSize = "16px";
                    errorMessage.style.textAlign = "center";
                    errorMessage.style.zIndex = "1000";  // Ensure the error message is on top

                    // Append the error message to the body
                    document.body.appendChild(errorMessage);
                });
        }
    };

    return PartsWidget;
});
