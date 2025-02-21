define("DS/WidgetIntraction/Scripts/PartsData", ["DS/DataDragAndDrop/DataDragAndDrop","DS/PlatformAPI/PlatformAPI"], function (DataDragAndDrop,PlatformAPI) {
    'use strict';
    
    var secContext = "";
    var myWidget = {
        
        onLoad: function () {
            var html_before_drop = "<div class='main-Container' id='mainContainer'>"+
            "<h1>Droup here</h1>"+"</div>";
            widget.body.innerHTML=html_before_drop ;
            var theDropElt = document.querySelector('#mainContainer');

            DataDragAndDrop.droppable(theDropElt, {
                drop: function(data) {
                    console.log("data----------->> ", data);
                    PlatformAPI.publish("PartsData", data );
                       
                }
            });
                
        },

         
    };
    widget.addEvent('onLoad',  myWidget.onLoad);
    
    
});


 