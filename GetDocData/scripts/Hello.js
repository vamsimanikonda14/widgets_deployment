define(['DS/GetDocData/scripts/Hello'], [], function() {
       
	   var getData = {
		   onLoad: function() {
			   widget.body.innerHTML = "<p> Hello santhosh welcome to the widget</p>" ;
		   }
	   };
  widget.addEvent('onLoad', getData.onLoad);
}
);