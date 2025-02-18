define("DS/WIDGETS/scripts/widget", [], function () {
    'use strict';
   
    var Widget = {
        onLoad: function () {
            // Creating HTML content for student information form
            widget.body.innerHTML = `
                <div class='main-Container' id='mainContainer'>
                    <h3>Student Information Form</h3>
                    <form id="studentForm">
                        <label for="studentId">Student ID:</label>
                        <input type="text" id="studentId" name="studentId" placeholder="Enter Student ID"><br><br>
                       
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Enter Name"><br><br>
                       
                        <label for="age">Age:</label>
                        <input type="number" id="age" name="age" placeholder="Enter Age"><br><br>
                       
                        <label for="grade">Grade:</label>
                        <input type="text" id="grade" name="grade" placeholder="Enter Grade"><br><br>
                       
                        <button type="submit">Submit</button>
                    </form>
                </div>
            `;
        }
    };
 
    widget.addEvent('onLoad', Widget.onLoad);
});
