define('DS/GetDocData/scripts/Hello', [], function() {
       "use strict";
	   var Trail = {
		   onLoad: function() {
			   widget.body.innerHTML = "<p> Hello santhosh welcome to the widget</p>" ;
		   }
	   };
  widget.addEvent('onLoad', Trail.onLoad);
}
);