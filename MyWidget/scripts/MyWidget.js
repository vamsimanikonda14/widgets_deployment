define("DS/MyWidget/scripts/MyWidget", ['DS/DataDragAndDrop/DataDragAndDrop'], function (DataDragAndDrop) {
    'use strict';
    
    var myWidget = {
        onLoad: function () {
            // Creating HTML content with form-like structure
            widget.body.innerHTML = "<div class='main-Container' id='mainContainer' style='width: 100%; height: 100%;text-align: center; background-color:#005685;color:#ffffff;'><h1>Drop</h1></div>";

            var theInput = document.querySelector('#mainContainer');
            DataDragAndDrop.droppable(theInput, {
                drop: function (data) {
                    theInput.value = data;
                    console.log(data);
                    var dataJSON = JSON.parse(data);
                    var objectId = dataJSON.data.items[0].objectId;
                    var objectType = dataJSON.data.items[0].objectType;
                    alert("type"+objectType);
                        
                },
            });
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
