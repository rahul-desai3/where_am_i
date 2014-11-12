var map;

$.noConflict();

jQuery(document).ready(function( $ ) {

    console.log('ready');
    
    $("#search").hide();

    $("#search").click(function(){
        initialize();
        $(this).slideUp("fast");
        $("#show-hide").slideDown("fast");
    });

    $("#show-hide").click(function(){
        console.log('here');
        $(this).slideUp("fast");
        $("#search").text("Where am I now?");
        $("#search").slideDown("fast");
    });

});


function initialize() {
    var mapOptions = {
        zoom: 13
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);
            
            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: '<div style="width: 75px">You are here!</div>'
            });
            
            map.setCenter(pos);
            
            var sunCircle = {
                strokeColor: "#4196c2",
                strokeOpacity: 0.8,
                strokeWeight: 0,
                fillColor: "#E7F7FF",
                fillOpacity: 0.75,
                map: map,
                center: pos,
                radius: 1000 // in meters
            };
            cityCircle = new google.maps.Circle(sunCircle);
            cityCircle.bindTo('center', infowindow, 'position');
            
            google.maps.event.addListener(infowindow,'closeclick',function(){
                cityCircle.setMap(null);
            });
            
        }, function() {
            handleNoGeolocation(true);
        }, {
            enableHighAccuracy: true
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }    
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed. ' + errorFlag;
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }
    
    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };
    
    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);