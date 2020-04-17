var latlng, map, marker, mapOptions, circle1, radius1;
var miles_5 = 8046.72; // Converted to meters
var miles_10 = 16093.4; // Converted to meters
var miles_25 = 40233.6; // Converted to meters
var miles_50 = 80467.2; // Converted to meters
var userID = '2289';
var categoryID = '6';
var selectedMiles = 5;
var isFavoritePage = false;
var distributors = [];
var currentDistributors = [];
var favoriteDistributors = [];
var initialLatlng/*, mapOpt*/;
var searchKey;

window.onload = function() {

//	tpDistributor.getAllDistributors();
//	tpDistributor.getUserFavoritesDetails(userID, categoryID, true);

	if (inlineRadio1.checked) {
		radius1 = 8046.72;
	}
	
	$("#useCurrentLocationButton").click(function() {
//		alert("User location button clicked");	
		geoLocation(false);
		tpDistributor.filterDistributorsInThisLocation(distributors);
		$("#cityZipCode").val("");
		$("#search_keyword").text("");
	});


	$('#cityZipCode').keypress(function(e) {
		var key = e.which;
		if (key == 13) // the enter key code
		{
			searchKey = $("#cityZipCode").val();
			console.log('Enter button clicked on Addr. search:', searchKey);
			searchDistributor(searchKey);
		}
	});
	
	$('#searchIcon').click(function(){
		searchKey = $("#cityZipCode").val();
		console.log('Enter button clicked on Addr. search:', searchKey);
		searchDistributor(searchKey);
	});
	

		function searchDistributor(searchKey) {
		$('#search_keyword').text(searchKey);
		if (searchKey != "") {
			if (isZipCode(searchKey)) {
				console.log('Zip Code search triggerred');
				tpDistributor.getAllDistributorByZipcode(searchKey);
			} else {
				console.log('City Distributor search triggerred');
				tpDistributor.getAllDistributorByCity(searchKey);
			}
		} else {
			alert("Please enter city name or Zipcode");
		}
	}
	mapOptions = {
		center : new google.maps.LatLng(42.309456, -88.281),
		zoom : 14,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	/*mapOpt = {
			center : new google.maps.LatLng(41.803001, -88.132641),
			zoom : 14,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		}; */
	
	var infoWindow = new google.maps.InfoWindow();
	var latlngbounds = new google.maps.LatLngBounds();
	map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

	geoLocation(true);

	/*if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(function(position) {
			latlng = {
				lat : position.coords.latitude,
				lng : position.coords.longitude
			};
//			alert("Latitude: " + latlng.lat + "\r\nLongitude: " + latlng.lng);
			placeMarker();
			circle();

			map.setCenter(latlng);
			var lt, lg;
			tpDistributor.getAllDistributors();

			google.maps.event.addListener(map, 'click', function(e) {
				alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: "
						+ e.latLng.lng());

				lt = e.latLng.lat();
				lg = e.latLng.lng();
				latlng = {
					lat : lt,
					lng : lg
				};
				circle();
				placeMarker();
			});

		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}*/

}

function handleLocationError(browserHasGeolocation, infoWindow, latlng) {
//	alert("test");
    infoWindow.setPosition(latlng);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: CANNOT ACCESS YOUR LOCATION,PLEASE ENABLE GPS ' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
   


} 

function geoLocation(initial){
	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(function(position) {
			latlng = {
				lat : position.coords.latitude,
				lng : position.coords.longitude
			};
			initialLatlng =latlng;
//			alert("Latitude: " + latlng.lat + "\r\nLongitude: " + latlng.lng);
			placeMarker();
			circle();

			map.setCenter(latlng);
			var lt, lg;
			if(initial){
				tpDistributor.getAllDistributors();
			}

			google.maps.event.addListener(map, 'click', function(e) {
				alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: "
						+ e.latLng.lng());

				lt = e.latLng.lat();
				lg = e.latLng.lng();
				latlng = {
					lat : lt,
					lng : lg
				};
				circle();
				placeMarker();
			});

		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

tpDistributorClass = function() {
//	this.distributors = [];
//	this.currentDistributors = [];
//	this.favoriteDistributors = [];

}
tp_distributors_obj = new tpDistributorClass();

tpDistributor = {
	getAllDistributors : function() {
//		isFavoritePage = false;
		// var url = bpi_com_obj.web_mssql_api_url+"GetDistributors";
		var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/GetDistributors";
		jQuery.ajax({
			type : "GET",
			url : url,
			success : function(data) {
				console.log("Distributors records received:", data);
				var status = data.status;
				if (status == 0) {
					distributors = data.object;
					tpDistributor.getUserFavoritesDetails(userID, categoryID, true);
				}
			},
			error : function(msg) {
				console.log("Result returned from GetDistributors():", msg);
			}
		});

	},

	getAllDistributorByCity : function(city) {
		$(".loader").show();
		// var url = bpi_com_obj.web_mssql_api_url+"GetAllDistributorByCity";
		var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/GetAllDistributorByCity";
		jQuery.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			data : "city=" + city,
			success : function(data) {
				console.log("Result returned from GetAllDistributorByCity():",
						data);
				tpDistributor.setDistributorsInView(data);
			},
			error : function(msg) {
				console.log("Distributors By City not available", msg);
			}
		});
	},

	getAllDistributorByZipcode : function(zipCode) {
		$(".loader").show();
		// var url = bpi_com_obj.web_mssql_api_url+"GetAllDistributorByZipcode";
		var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/GetAllDistributorByZipcode";
		jQuery.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			data : "zipcode=" + zipCode,
			success : function(data) {
				console.log(
						"Result returned from GetAllDistributorByZipcode():",
						data);
				tpDistributor.setDistributorsInView(data);
			},
			error : function(msg) {
				console.log("Distributors By zipcode not available", msg);
			}
		});
	},

	getUserFavoritesDetails : function(userID, categoryID, isInitial) {
		console.log("getUserFavoritesDetails() for userID:", userID,
				",categoryID:", categoryID);
		$(".loader").show();
		// var url =
		// bpi_com_obj.web_mssql_api_url+"GetUserFavoritesDistributors";
		var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/GetUserFavoritesDistributors";
		jQuery.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			data : {
				userID : userID,
				categoryID : categoryID
			},
			success : function(data) {
				console.log(
						"Result returned from GetUserFavoritesDistributors():",
						data);
				var status = data.status;
				if (status == 0) {
					favoriteDistributors = data.object;
					if(isInitial == false){
						tpDistributor.setFavoriteDistributorsInView(favoriteDistributors, isInitial);
					}
				} else {
					$(".loader").hide();
					console.log("No records found; Error from backend:",
							data.errorMessage);
					alert("No records found; Error from backend:", data.errorMessage);
				}
				if(isInitial){
					tpDistributor.filterDistributorsInThisLocation(distributors);
				}
			},
			error : function(msg) {
				console.log("User Favorites Details not found", msg);
			}
		});
	},

	saveUserFavorites : function(distributorID) {
		console.log("saveUserFavorites() for distributorID:", distributorID);
		$(".loader").show();
		var id = distributorID.substring(3);
		console.log('Distributor ID:', id);
		// var url = bpi_com_obj.web_mssql_api_url+"SaveUserFavorites";
		var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/SaveUserFavorites";
		url += "?userID=" + userID + "&categoryID=" + categoryID
				+ "&resourceID=" + id + "&rating=" + null + "&status=" + 1;
		jQuery
				.ajax({
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					type : "POST",
					url : url,
					dataType : "json",
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
					// data : JSON.stringify(saveData),
					success : function(data1) {
						console.log(
								"Result returned from SaveUserFavorites():",
								data1);
						tpDistributor.handleSaveFavoriteResponse(data1, true);
					},
					error : function(msg) {
						console.log("User Favorites Details not found", msg);
					}
				});
	},

	removeUserFavorites : function(distributorID) {
		console.log("removeUserFavorites() for distributorID:", distributorID);
		$(".loader").show();
		var id = distributorID.substring(3);
		console.log('Distributor ID:', id);
		// var url = bpi_com_obj.web_mssql_api_url+"SaveUserFavorites";
		var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/SaveUserFavorites";
		url += "?userID=" + userID + "&categoryID=" + categoryID
				+ "&resourceID=" + id + "&rating=" + null + "&status=" + 0;
		jQuery
				.ajax({
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					type : "POST",
					url : url,
					dataType : "json",
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
					success : function(data1) {
						console.log(
								"Result returned from SaveUserFavorites():",
								data1);
						tpDistributor.handleSaveFavoriteResponse(data1, false);
					},
					error : function(msg) {
						console.log("User Favorites Details not found", msg);
					}
				});
	},

	handleSaveFavoriteResponse : function(response, isSave) {
		console.log("Save / Remove Favorite response from web service:",
				response);
		var status = response.status;
		if (status == 0) {
			alert("Save/Remove Favorite updated successfully");
		} else {
			console.log("Save/Remove Favorite: ", status, ": ",
					response.errorMessage);
			alert("Save/Remove Favorite not updated: " + response.errorMessage);
		}
		tpDistributor.loadFavoritesDistributors();
	},

	setDistributorsInView : function(data) {
		console.log(data);
		var status = data.status;
		if (status == 0) {
			var rownum = 1;
			$("#distributorScrollPane li").remove();
			currentDistributors = data.object;
			if (currentDistributors != null && currentDistributors != undefined
					&& currentDistributors.length > 0) {
				html = "";
				for ( var i in currentDistributors) {
					var distributor = currentDistributors[i];
					var id = currentDistributors[i].orgid;
					var name = currentDistributors[i].orgname;
					var address = currentDistributors[i].address;
					var city = currentDistributors[i].city;
					var state = currentDistributors[i].state;
					var country = currentDistributors[i].country;
					var zipcode = currentDistributors[i].zipcode;
					var phone1 = currentDistributors[i].phone1;
					// var phone2 = distributors[i].phone2;
					// var email = distributors[i].email;
					var website = currentDistributors[i].website;
					var latitude = currentDistributors[i].latitude;
					var longitude = currentDistributors[i].longitude;
					console
							.log('latitude:', latitude, ",longitude:",
									longitude);

					var distAddress = address + ", " + city + ", " + state
							+ " " + zipcode;
					var miles = distance(longitude, latitude);
					if (miles < selectedMiles) {
						var selectClass = '';
						var isFavoriteSet = tpDistributor.isFavoriteDistributor(distributor);
						if(isFavoriteSet == true){
							console.log("Distributor set as favorite:", name);
							selectClass = 'yellowIcon';
						} 
						
						$("#distributorScrollPane")
						.append(
								'<li id="'
								+ id
								+ '"><span id="data_row'
								+ rownum
								+ '" class="number">'+rownum+'</span><span class="distName"><span id="name_row'
								+ rownum
								+ '" class="distributor">'+name+'</span></span><div class="miles"><span class="img1"><img src="images/distributorimage.png" alt="Distributor-search" /></span><span id="distance_row'
								+ rownum
								+ '" class="distance">'+miles+' miles</span></div><span id="address_row'
								+ rownum
								+ '" class="distributorName">'+distAddress+'</span><span class="coloredstar"><input id="fav'
								+ id
								+ '" type="checkbox" class="favouriteStart"><i  class="fa fa-star ' + selectClass + '" aria-hidden="true"></i></span><span class="contact">Contact <span id="phone_row'
								+ rownum
								+ '" class="phone">'+phone1+'</span></span><span class="website">Website <span id="website_row'
								+ rownum
								+ '" class="url"></span><a href="http://'
								+ website + '">' + website
								+ '</a></span > </li>');
//						$('#data_row' + rownum).text(rownum);
//						$('#name_row' + rownum).text(name);
//						$('#distName_row' + rownum).text("");
//						$('#distance_row' + rownum).text("");
//						$('#address_row' + rownum).text(distAddress);
//						$('#phone_row' + rownum).text(phone1);
						// $('#website_row' + rownum).text(website);
						if(isFavoriteSet == true){
							$('#fav' + id).prop("checked", true);
						}
						rownum++;
					}
					i++;
				}
			} else {
				console.log("error:", distributors);
				// Display error
			}
			$("#distributorScrollPane").append(html);
			$('.favouriteStart').on(
					'change',
					function() {
						if ($(this).is(':checked')) {
							$(this).closest('span').find('.fa-star').addClass(
									'yellowIcon');
							var id = $(this).attr('id');
							console.log("Save Favorite ID:", id);
							tpDistributor.saveUserFavorites(id);
						} else {
							$(this).siblings().removeClass('yellowIcon');
							var id = $(this).attr('id');
							console.log("Remove Favorite ID:", id);
							tpDistributor.removeUserFavorites(id);
						}
					});
			$(".loader").hide();
		} else {
			$(".loader").hide();
			console.log("No records found; Error from backend:",
					data.errorMessage);
			alert("No records found; Error from backend:", data.errorMessage);
		}

	},

	getDistributor : function(id) {
		// var url = bpi_com_obj.web_mssql_api_url+"GetDistributor";
		var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/GetDistributor";
		jQuery.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			data : "id=" + id,
			success : function(data) {
				console.log("Result returned from GetDistributor():", data);
				return data;
			},
			error : function(msg) {
				console.log("Distributor matching id not available", msg);
				return {
					"status" : 1,
					"errorMessage" : "Distributor matching id not available",
					"object" : null
				};
			}
		});
	},

	setFavoriteDistributorsInView : function(data, isInitial) {
		console.log(data);
//		var status = data.status;
//		if (status == 0) {
//			currentDistributors = data.object;
			$("#favDistributorScrollPane li").remove();
			if (data != null && data != undefined
					&& data.length > 0) {
				if(isInitial == false){
					var rownum = 1;
					html = "";
					console.log("currentDistributors:", data);
					for ( var i in data) {
						var distributor = data[i];
						var id = distributor.orgid;
						var name = distributor.orgname;
						var address = distributor.address;
						var city = distributor.city;
						var state = distributor.state;
						var country = distributor.country;
						var zipcode = distributor.zipcode;
						var phone1 = distributor.phone1;
						// var phone2 = distributor.phone2;
						// var email = distributor.email;
						var website = distributor.website;
						var latitude = distributor.latitude;
						var longitude = distributor.longitude;
						console.log('latitude:', latitude, ",longitude:", longitude);
						console.log('phone1:', phone1);

						var distAddress = address + ", " + city + ", " + state
								+ " " + zipcode;
						console.log("currentDistributors address:", distAddress);

						$("#favDistributorScrollPane")
								.append(
										'<li class="distributorInfo"><span class="distributorName"><p id="name_row'
												+ rownum
												+ '">' + name+ '</p></span><span class="distributorAddress"><p id="address_row'
												+ rownum
												+ '">'+ distAddress+'</p><a href="#" data-toggle="modal" data-target="#getDirection" onclick="initMap(\'' + distAddress+ '\',\''+name+'\')">Get Directions</a></span><span class="phone"><span id="phone_row'
												+ rownum
												+ '"></span>' + phone1+ '</span><span class="visitwebsite"><a href="http://'
												+ website
												+ '">Visit Website</a></span><span class="star"><span class="coloredstar"><input id="fav'
												+ id
												+ '" type="checkbox" checked="checked" class="favouriteStart"><i class="fa fa-star yellowIcon" aria-hidden="true"></i></span></span></li>');
//						$('#name_row' + rownum).text(name);
//						$('#distName_row' + rownum).text("");
//						$('#address_row' + rownum).text(distAddress);
//						$('#phone_row' + rownum).text(phone1);

						rownum++;
						i++;
					}
					$('.favouriteStart').on(
							'change',
							function() {
								if ($(this).is(':checked')) {
									$(this).closest('span').find('.fa-star').addClass(
									'yellowIcon');
									var id = $(this).attr('id');
									console.log("Save Favorite ID:", id);
									tpDistributor.saveUserFavorites(id);
								} else {
									$(this).siblings().removeClass('yellowIcon');
									var id = $(this).attr('id');
									console.log("Remove Favorite ID:", id);
									tpDistributor.removeUserFavorites(id);
								}
							});
					$(".loader").hide();
				}
			} else {
				console.log("No matching data available:", data);
				// Display error
			}
		/*} else {
			$(".loader").hide();
			console.log("No records found; Error from backend:",
					data.errorMessage);
			alert("No records found; Error from backend:", data.errorMessage);
		}*/

	},

	filterDistributorsInThisLocation : function(allDistributors) {
		if (allDistributors != null && allDistributors != undefined
				&& allDistributors.length > 0) {
			html = "";
			var rownum = 1;
			$("#distributorScrollPane li").remove();
			for ( var i in allDistributors) {
				var distributor = allDistributors[i];
				var id = allDistributors[i].orgid;
				var name = allDistributors[i].orgname;
				var address = allDistributors[i].address;
				var city = allDistributors[i].city;
				var state = allDistributors[i].state;
				var country = allDistributors[i].country;
				var zipcode = allDistributors[i].zipcode;
				var phone1 = allDistributors[i].phone1;
				// var phone2 = allDistributors[i].phone2;
				// var email = allDistributors[i].email;
				var website = allDistributors[i].website;
				var latitude = allDistributors[i].latitude;
				var longitude = allDistributors[i].longitude;
				var distAddress = address + ", " + city + ", " + state + " " + zipcode;
				console.log("currentDistributors address:", distAddress);
				// alert(latitude);
				// alert(longitude);
				// var lat2=latitude;
				// var lon2=longitude.longitude;
				// var lat1 = latlng.lat;
				// var lon1 = latlng.lng;
//				distance(-88.30766600556671, 42.23362188144542);
				var miles = distance(longitude, latitude);
				if (miles < selectedMiles) {
					var selectClass = '';
					var isFavoriteSet = tpDistributor.isFavoriteDistributor(distributor);
					if(isFavoriteSet == true){
						console.log("Distributor set as favorite:", name);
						selectClass = 'yellowIcon';
					} 
					$("#distributorScrollPane")
					.append(
							'<li id="'
									+ id
									+ '"><span id="data_row'
									+ rownum
									+ '" class="number">'+rownum+'</span><span class="distName"><span id="name_row'
									+ rownum
									+ '" class="distributor">'+name+'</span></span><div class="miles"><span class="img1"><img src="images/distributorimage.png" alt="Distributor-search" /></span><span id="distance_row'
									+ rownum
									+ '" class="distance">'+miles+' miles</span></div><span id="address_row'
									+ rownum
									+ '" class="distributorName">'+distAddress+'</span><span class="coloredstar"><input id="fav'
									+ id
									+ '" type="checkbox" class="favouriteStart"><i  class="fa fa-star ' + selectClass + '" aria-hidden="true"></i></span><span class="contact">Contact <span id="phone_row'
									+ rownum
									+ '" class="phone">'+phone1+'</span></span><span class="website">Website <span id="website_row'
									+ rownum
									+ '" class="url"></span><a href="http://'
									+ website + '">' + website
									+ '</a></span > </li>');
//			$('#data_row' + rownum).text(rownum);
//			$('#name_row' + rownum).text(name);
//			$('#distName_row' + rownum).text("");
//			$('#distance_row' + rownum).text(miles);
//			$('#address_row' + rownum).text(distAddress);
//			$('#phone_row' + rownum).text(phone1);
			if(isFavoriteSet == true){
				$('#fav' + id).prop("checked", true);
			}
					rownum++;
				}
				i++;
			}
			$('.favouriteStart').on(
					'change',
					function() {
						if ($(this).is(':checked')) {
							$(this).closest('span').find('.fa-star').addClass(
							'yellowIcon');
							var id = $(this).attr('id');
							console.log("Save Favorite ID:", id);
							tpDistributor.saveUserFavorites(id);
						} else {
							$(this).siblings().removeClass('yellowIcon');
							var id = $(this).attr('id');
							console.log("Remove Favorite ID:", id);
							tpDistributor.removeUserFavorites(id);
						}
					});
		} else {
			console.log("error:", distributors);
			// Display error
		}
	},
	
	loadFavoritesDistributors : function() {
//		alert("loadFavoritesDistributors");
		isFavoritePage = true;
		$(".distributorSearch").hide();
		$(".maxdistance").hide();
		$(".col-md-8").hide(); 
		$("#cityZipCode").val("");
		$("#search_keyword").text("");
		tpDistributor.getUserFavoritesDetails(userID, categoryID, false);
	},
	
	loadAllDistributors : function() {
//		alert("loadAllDistributors");
		isFavoritePage = false;
		$(".distributorSearch").show();
		$(".maxdistance").show();
		$(".col-md-8").show(); 
		$("#cityZipCode").val("");
		$("#search_keyword").text("");
		tpDistributor.getAllDistributors();
	},

	isFavoriteDistributor : function(distributor) {
		console.log('isFavoriteDistributor:', distributor);
		if (favoriteDistributors == null || favoriteDistributors == undefined
				|| favoriteDistributors.length == 0) {
			return false;
		}
		for ( var i in favoriteDistributors) {
			var id = favoriteDistributors[i].orgid;
			if (id == distributor.orgid) {
				console.log('ID matches:', id);
				return true;
			}
		}
		return false;
	},
	
	getFavDistributorByZipcode : function(searchKey) {
		console.log('getFavDistributorByZipcode:', searchKey);
		var matchingDistributors = [];
		if (favoriteDistributors != null && favoriteDistributors != undefined
				&& favoriteDistributors.length > 0) {
			for ( var i in favoriteDistributors) {
				var distributor = favoriteDistributors[i];
				var zip = distributor.zipcode;
				if (zip == searchKey) {
					console.log('zipcode matches:', zip);
					matchingDistributors.push(distributor);
				}
			}
		}
		tpDistributor.setFavoriteDistributorsInView(matchingDistributors, false);
	},
	

	getFavDistributorByCity : function(searchKey) {
		console.log('getFavDistributorByCity:', searchKey);
		var matchingDistributors = [];
		if (favoriteDistributors != null && favoriteDistributors != undefined
				&& favoriteDistributors.length > 0) {
			for ( var i in favoriteDistributors) {
				var distributor = favoriteDistributors[i];
				var city = distributor.city;
				if (city == searchKey) {
					console.log('city matches:', city);
					matchingDistributors.push(distributor);
				}
			}
		}
		tpDistributor
				.setFavoriteDistributorsInView(matchingDistributors, false);
	}

}

function initMap(distAddress, name) {
	$('#distributorname').text(name);
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var map2 = new google.maps.Map(document.getElementById("dvMap2"),{
	zoom:14,
	center : new google.maps.LatLng(41.803001, -88.132641),
	mapTypeId : google.maps.MapTypeId.ROADMAP 
	});
	directionsDisplay.setMap(map2);
	calculateAndDisplayRoute(directionsService, directionsDisplay, distAddress);
	google.maps.event.addListenerOnce(map2, 'idle', function() {
	google.maps.event.trigger(map2, 'resize');
	map2.setCenter(initialLatlng);
	map2.setZoom(12);
	}); 
}


function calculateAndDisplayRoute(directionsService, directionsDisplay,
	distAddress) {
	directionsService.route({
	origin : initialLatlng,
	destination : distAddress, 
	travelMode : google.maps.DirectionsTravelMode.DRIVING 
	}, function(response, status) {
	if (status === 'OK') {
		directionsDisplay.setDirections(response);
	} else {
		window.alert('Directions request failed due to ' + status);
	}
});
}

  
function distance(/* lon1, lat1, */ longitude, latitude) {

	var lon1 = latlng.lng;
	var lat1 = latlng.lat;

//	 alert(longitude);
//	 alert(latitude);
	var R = 6371; // Radius of the earth in km
	var dLat = toRad(latitude - lat1); // Javascript functions in radians
//	alert(dLat);
	var dLon = toRad(longitude - lon1);
//	alert("test"+ Math.sin(dLat / 2));
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1))
			* Math.cos(toRad(latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	//alert("a");
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//	 alert(c);
	var d = R * c; // Distance in km

//	alert("distance"+d);
	var distInMiles = d/1.6; // TO BE CHECKED
	var milesIndist = parseFloat(distInMiles).toFixed(1);
	return milesIndist;
}

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

function placeMarker() {

	if (!marker || !marker.setPosition) {

		marker = new google.maps.Marker({
			position : latlng,
			map : map
		});
		circle();
	} else {

		marker.setPosition(latlng);
	}
}

function circle() {

	// var cityCircle;
	// cityCircle = new google.maps.Circle(circle1);
	if (!circle1 || !circle1.setCenter) {
		// alert("circle entry");
		circle1 = new google.maps.Circle({
			map : map,
			radius : 2000, // 10 miles in metres
			center : latlng

		});

		google.maps.event.addListener(circle1, 'click', function(er) {
			// alert("Latitude: " + er.latLng.lat() + "\r\nLongitude: "
			// + er.latLng.lng());

			lt = er.latLng.lat();
			lg = er.latLng.lng();
			latlng = {
				lat : lt,
				lng : lg
			};
			placeMarker();
		});

	} else {
		circle1.setMap(null);
		// alert("circle entry else");
		circle1 = new google.maps.Circle({
			map : map,
			radius : radius1, // 10 miles in metres
			strokeColor : 'white',
			strokeOpacity : 0.1,
			strokeWeight : 0.1,
			fillColor : null,
			fillOpacity : 0.1,
			center : latlng

		});
		google.maps.event.addListener(circle1, 'click', function(r) {
			// alert("Latitude: " + r.latLng.lat() + "\r\nLongitude: "
			// + r.latLng.lng());

			lt = r.latLng.lat();
			lg = r.latLng.lng();
			latlng = {
				lat : lt,
				lng : lg
			};
			placeMarker();

		});
		circle1.setCenter(latlng);
	}

}

$('#inlineRadio1').click(function() {
	selectedMiles = 5;
	radius(miles_5);
	getCurrentDistributors();
//	tpDistributor.filterDistributorsInThisLocation(distributors);
});
$('#inlineRadio2').click(function() {
	selectedMiles = 10;
	radius(miles_10);
	getCurrentDistributors();
//	tpDistributor.filterDistributorsInThisLocation(distributors);
});
$('#inlineRadio3').click(function() {
	selectedMiles = 25;
	radius(miles_25);
	getCurrentDistributors();
//	tpDistributor.filterDistributorsInThisLocation(distributors);
});
$('#inlineRadio4').click(function() {
	selectedMiles = 50;
	radius(miles_50);
	getCurrentDistributors();
//	tpDistributor.filterDistributorsInThisLocation(distributors);
});

function radius(r) {
	var rad = r;
	//	alert("radius:" + rad);
	radius1 = rad;
	// alert(radius);
	circle();

}

function userLocation() {
	alert("Use current location button clicked");
	tpDistributor.filterDistributorsInThisLocation(distributors);
}

function isZipCode(value) {
	return !isNaN(value) && parseInt(Number(value)) == value
			&& !isNaN(parseInt(value, 10));
}

function getCurrentDistributors() {
	if (searchKey == undefined || searchKey == "") {
		tpDistributor.filterDistributorsInThisLocation(distributors);
	} else {
		tpDistributor.filterDistributorsInThisLocation(currentDistributors);
	}
}
