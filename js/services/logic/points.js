'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('initApp.services', ['LocalStorageModule', 'ngResource'])
.value('version', '0.1')
.service('points', function ($rootScope, $http, localStorageService, $resource,device) {
  return {
    photo: '',
    location: {},
    tag: '',
    dataURL : '',
     setTag: function (tag) {
      this.tag = tag;
    },
    setLocation: function (location) {
      this.location = location;
    },
     setPhoto: function (photo) {
      this.photo = photo;
      self = this;
      var img = new Image();
      img.onload = function(){
        // Create an empty canvas element
       var canvas = document.createElement("canvas");
       canvas.width = img.width;
       canvas.height = img.height;
       // // Copy the image contents to the canvas
       var ctx = canvas.getContext("2d");
       ctx.drawImage(img, 0, 0);

       self.dataURL = canvas.toDataURL("image/jpeg");
       alert(self.dataURL);
      };
      img.src = this.photo;



    },
    submit:function (callback){

      var createService ="http://patrimonio-cultural.elauria.com/api/v1/points/create";

alert(this.dataURL);
        var newpoint ={ photo: this.dataURL,
          latitude:  this.location.latitude,
          longitude : this.location.longitude,
          tag :this.tag};
        $http.post(createService, newpoint ).success(function(data) {
           callback();
        });


    }
  };
});

