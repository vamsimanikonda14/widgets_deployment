define("DS/CA_PartsViewWidget/scripts/MyWidget", [], function () {
    'use strict';

    var myWidget = {
        onLoad: function () {
            widget.body.innerHTML = `
                <style>
                    table {
                        width: 60%;
                        border-collapse: collapse;
                        margin: 20px auto;
                        font-family: Arial, sans-serif;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 10px;
                        text-align: left;
                    }
                    th {
                        background-color: #4CAF50;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                </style>
                
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Revision</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Document</td><td>Project Plan</td><td>Rev 1.2</td></tr>
                        <tr><td>Blueprint</td><td>Building Layout</td><td>Rev 3.0</td></tr>
                        <tr><td>Code</td><td>Software Module</td><td>Rev 2.5</td></tr>
                        <tr><td>Specification</td><td>API Guide</td><td>Rev 1.0</td></tr>
                        <tr><td>Manual</td><td>User Guide</td><td>Rev 4.1</td></tr>
                    </tbody>
                </table>`;
        }
    };

    return myWidget;
});
