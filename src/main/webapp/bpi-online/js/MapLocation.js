var latlng,map,marker;
        window.onload = function () {
        	
            var mapOptions = {
                center: new google.maps.LatLng(13.067439, 80.237617),
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
          // var marker;
         // var latlng={lat:18.9300,lng:72.8200};
         
            if (navigator.geolocation) {
            	
                navigator.geolocation.getCurrentPosition(function(position) {
                   latlng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };
                   
                   placeMarker();
//                   infoWindow.setPosition(pos);
//                   infoWindow.setContent('Location found.');
//                   infoWindow.open(map);
                  map.setCenter(latlng);
                  }, function() {
                  handleLocationError(true, infoWindow, map.getCenter());
                });
              } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
              }
              
            
            var lt,lg;
            var infoWindow = new google.maps.InfoWindow();
            var latlngbounds = new google.maps.LatLngBounds();
            map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
            google.maps.event.addListener(map, 'click', function (e) {            	
                alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
                lt=e.latLng.lat();
                lg=e.latLng.lng();
                latlng = {lat: lt, lng: lg};
//                alert(latlng.lat);
//                alert(latlng.lng);
//                		var marker = new google.maps.Marker({
//            			position : latlng,
//            			map : map
//                		});               		
               		placeMarker();
               		//                var marker = new google.maps.Marker({
//        			position : latlng,
//        			map : map
//        		});
        			
            });
           
            
        };
        function placeMarker() {
        	
        	if (!marker || !marker.setPosition) {
        		
        	    marker = new google.maps.Marker({
       			position : latlng,
       			map : map
           		});
       		 } else {
       			
       		   marker.setPosition(latlng);
       		 }
        	
        } 