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
                    that.callWebService(objectId,securityContext);
                        
                },
            });
        },
        callWebService: function (objectId,securityContext) {
            let that = this;
            let spaceUrl =  PlatformAPI.getApplicationConfiguration("app.urls.myapps");
            var resource = '/resources/v1/modeler/dseng/dseng:EngItem/'+objectId;
            WAFData.authenticatedRequest(spaceUrl + resource, {
                method: "GET",
                headers: {
                    "SecurityContext": securityContext,
                    'Content-Type': 'application/json',
                },
                type: 'json',
                onComplete: function (rs) {
                    console.log("TICKET PUT", rs);
                    promise.resolve();
                },
                onFailure: function (error) {
                    console.log("TICKET PUT ERR", error);
                    promise.reject();
                }

            });
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
