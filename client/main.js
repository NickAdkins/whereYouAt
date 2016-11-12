//
//
// var success = function(data) {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function(position){
//             console.log(position)
//         })
//     }
// };
//
// var failure = function() {
// 	alert("API wasn't returned.");
// };
//
// var getMessages = function (success, failure) {
// 	var request = new XMLHttpRequest();
// 	// console.log ("broken")
// 	request.onreadystatechange = function () {
// 		if (request.readyState == XMLHttpRequest.DONE) {
// 			if(request.status >= 200 && request.status < 400) {
// 				var data = JSON.parse(request.responseText);
// 				// console.log (data)
// 				success(data);
// 			}	else {
// 				failure();
// 			}
// 		}
// 	}
// 	request.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?location");
// 	request.send();
// };

document.addEventListener('DOMContentLoaded', function (){
    if (document.querySelectorAll('#map').length > 0){
        if (document.querySelector('html').lang){
            lang = document.querySelector('html').lang;
        } else {
            lang = 'en';

        var js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&language=en';
        document.getElementsByTagName('head')[0].appendChild(js_file);
        }
    }
});

var js_file = document.createElement('script');
js_file.type = 'text/javascript';
js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&key=AIzaSyASkNSjwlMvAdP4mLFcT7qMt0E5r4k6eok&language=en';
document.getElementsByTagName('head')[0].appendChild(js_file);

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center:{
            lat: -33.866,
            lng: 151.196},
            zoom: 15
        });

}

// var latLng = (function() {
//     function latLng(element, opts) {
//         this.gMap = new google.maps.Map(element, opts);
//     }
//     latLng.prototype = {
//
//     };
//     return latLng;
// }());

// latLng.create = function(element, opts) {
//     return new latLng(element, opts);
// };
//
// window.latLng = latLng;

// var maps = function(){
//     if (google.maps.event.addListener('click')) function(e){
//     alert('click');
//     console.log(e);
// }
// }
