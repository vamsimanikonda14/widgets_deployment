define("DS/MyWidget/scripts/MyWidget", ['DS/DataDragAndDrop/DataDragAndDrop','DS/PlatformAPI/PlatformAPI','DS/WAFData/WAFData'], function (DataDragAndDrop,PlatformAPI,WAFData) {
    'use strict';
    
    var myWidget = {
        onLoad: function () {
            widget.body.innerHTML = "<div class='main-Container' id='mainContainer'></div>";

            var theInput = document.querySelector('#mainContainer');
            DataDragAndDrop.droppable(theInput, {
                drop: function (data) {
                    theInput.value = data;
                    console.log(data);
                    var dataJSON = JSON.parse(data);
                    var objectId = dataJSON.data.items[0].objectId;
                    var objectType = dataJSON.data.items[0].objectType;
                    var securityContext = dataJSON.data.items[0].contextId;
                    alert("type"+objectType+objectId+securityContext);
                    //that.callWebService(objectId,securityContext);
                        
                },
            });
        }
        
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
