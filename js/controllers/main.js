'use strict';
var initApp = angular.module('initApp.controllers',  ['LocalStorageModule']);

initApp.controller('pointController', function ($scope, geolocation, camera, device, localStorageService, points) {

	$scope.refreshLocation = function() {
	 geolocation.getCurrentPosition(function (position) {
	   $scope.position = position;
	    $scope.map = "http://staticmap.openstreetmap.de/staticmap.php?center=" + position.coords.latitude  + ',' +position.coords.longitude + "&zoom=20&size=300x200&maptype=mapnik&markers="+ position.coords.latitude + ',' +position.coords.longitude +",lightblue1";
	    points.setLocation(position.coords);
	    // alert(position);
	    // console.log(position);
	 });
	};

	$scope.takepic = function() {
	camera.getPicture(function (image) {
	  points.setPhoto(image);
	  $scope.photo = points.photo;
	  // points.submit(function(){
	    window.location.hash ="take-photo";
	  // });
	});
	};



	$scope.wait = false;
	$scope.submitPoint = function() {
		document.querySelector(".lading").style.display = "block";
		$scope.wait = true;
		points.setTag($scope.tag);
		points.submit(function(){
			document.querySelector(".lading").style.display = "none";
	  		window.location.hash ="finish";
		});
	};



	$scope.refreshLocation();
	$scope.photo = points.photo;
	
	var doc = document;
	
	angular.element(document).ready(function () {
		doc.querySelector("#wrapper").style.height = (doc.documentElement.clientHeight - doc.querySelector(".main-header").clientHeight) + "px";

		var paddingBottom = parseFloat(window.getComputedStyle(doc.querySelector("#scroller"),null).getPropertyValue('padding-bottom'));
		
		setTimeout(function(){
			doc.querySelector(".overflow-auto").style.height = (doc.querySelector("#scroller").clientHeight - paddingBottom) + "px";
		},1000);
	});

});
