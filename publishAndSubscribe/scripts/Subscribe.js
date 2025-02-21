define("DS/publishAndSubscribe/scripts/Subscribe", [], function () {
    'use strict';

    var subscriberWidget = {
        onLoad: function () {
               var sub ;
     
			sub = API.subscribe("publishedData", function (data) {
					//Do the work ...  
					console.log('Received from: ',data);
      
					// Unsubscribing sub to avoid getting more messages
					API.unsubscribe(sub);
			});
           
        }

         
	}
	Widget.addEvent('onLoad',subscriberWidget.onLoad);
});
