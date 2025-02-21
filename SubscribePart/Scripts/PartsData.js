define( "DS/SubscribePart/Scripts/PartsData", ["DS/PlatformAPI/PlatformAPI"], function ( PlatformAPI) {
    'use strict';
    
    var secContext = "";
    var myWidget = {
        
        onLoad: function () {
            var sub ;
     
            sub = API.subscribe("PartsDataPublish", function (data) {
               //Do the work ...  
               console.log('Received from: ',data );
              
               // Unsubscribing sub to avoid getting more messages
               API.unsubscribe(sub);
            });
        } 

         
    };
    widget.addEvent('onLoad',  myWidget.onLoad);
    
    
});


 