define("DS/GetDataThroughForm/scripts/MyScripts", [], function () {
    'use strict';
    var myWidget = {
        onLoad: function () {
            widget.body.innerHTML = `
                <div class='main-Container' id='mainContainer'>
                    <h1>Creation of Part</h1>
                    <form id='partForm'>
                        <label for='partName'>Name of the Part:</label>
                        <input type='text' id='partName' name='partName' required>
                        <br>
                        
                        <label for='partType'>Type:</label>
                        <input type='text' id='partType' name='partType' required>
                        <br>
                        
                        <label for='partRevision'>Revision:</label>
                        <input type='text' id='partRevision' name='partRevision' required>
                        <br>
                        
                        <label for='partQuantity'>Quantity:</label>
                        <input type='number' id='partQuantity' name='partQuantity' required>
                        <br>
                        
                        <button type='submit' id='submitBtn'>Submit</button>
                    </form>
                </div>
            `;

            // Add event listener to the Submit button
            var submitButton = document.getElementById('submitBtn');
            submitButton.addEventListener('click', function(event) {
                event.preventDefault();  // Prevent the form from submitting
                alert("Button is clicked");
            });
        }
    };
    widget.addEvent('onLoad', myWidget.onLoad);
});
