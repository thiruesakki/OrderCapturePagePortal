
//-------------------------------------------------------------------------
function getCountryStatesList() {
	$(".loader").show();
//	var url = bpi_tc_common_obj.web_mssql_api_url+"GetCountriesStatesList";
	var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/GetCountriesStatesList";
	jQuery.ajax({
		type : "GET",
		url : url,
		success : function(data) {
//			console.log("GetCountriesStatesList - Result returned:", data);
			var status = data.status;
			if (status == 0) {
				var countries = data.object;
				if (countries != null && countries != undefined
						&& countries.length > 0) {
					countryData = countries;
					setStates(countryData);
				}
			}
		},
		error : function(msg) {
			console.log("GetCountriesStatesList - ERROR Result returned:", msg);
		}
	});
	$(".loader").hide();
}


$(window).on('load', function() {
	getCountryStatesList();
});


function setStates(data) {
	console.log('Country State Data received:', data);
	html = "";
	countryHtml = "";
	if (data != null && data != undefined && data.length > 0) {
		for ( var k in data) {
			var countryid = data[k].id;
			var countryname = data[k].name;
			countryHtml += '<option  countryid=' + countryid
					+ ' name="userCountry" value="' + countryname + '">'
					+ countryname + '</option>';
			if (countryname == "US") {
				var states = data[k].fStates;
			//	 console.log("states:", states);
				for ( var z in states) {
					var id = states[z].id;
					var name = states[z].name;
	//				 console.log("Add State :", name);
					html += '<option  id=' + id
							+ ' name="userState" value="' + name + '">'
							+ name + '</option>';
					z++;
				}
			}
			k++;
		}
		//Chevy promo business address
		$("#ctinputcountry").append(countryHtml);
		$("#ctinputState").append(html);
		
		//Chevy promo Home address
		$("#ctinputhomecountry").append(countryHtml);
		$("#ctinputhomeState").append(html);
		
		uiChanges()				
									  
	}
}



    //States for Business Adddress
function setSelectedCountryStates(countryselected, stateId){
    html = "";
    $(stateId).empty();
    for ( var k in countryData) {
        var country = countryData[k].name;
        if (country == countryselected) {
            var states = countryData[k].fStates;
            console.log("states:", states);
            for ( var z in states) {
                var id = states[z].id;
                var name = states[z].name;
            //  console.log("Add State :", name);
                html += '<option  id=' + id
                        + ' name="ctinputState" value="' + name
                        + '">' + name + '</option>';
                z++;
            }
            break;
        }
        k++;
    }
 
    $("#ctinputState").append(html);				
	uiChanges()						
}

/* Set states for Home Address */
function setHomeAddressCountryStates(countryselected){
    html = "";
    $("#ctinputhomeState").empty();
    for ( var k in countryData) {
        var country = countryData[k].name;
        if (country == countryselected) {
            var states = countryData[k].fStates;
             console.log("states:", states);
            for ( var z in states) {
                var id = states[z].id;
                var name = states[z].name;
            //  console.log("Add State :", name);
                html += '<option  id=' + id
                        + ' name="ctinputhomeState" value="' + name
                        + '">' + name + '</option>';
                z++;
            }
            break;
        }
        k++;
    }
    $("#ctinputhomeState").append(html);
    uiChanges();
}


$('#ctinputcountry').on('change', function() {
            var countryselected = $("#ctinputcountry option:selected")
                    .text();
            if(countryselected=="Canada") countryselected = "CA";
            setSelectedCountryStates(countryselected,'#ctinputState');
           // uiChanges();
        });
        
$('#ctinputhomecountry').on('change', function() {

    var countryselected = $("#ctinputhomecountry option:selected")
                    .text();
    if(countrySelected=="Canada") countrySelected = "CA";
    setHomeAddressCountryStates(countryselected, '#ctinputhomeState');
    //uiChanges()
});

function uiChanges(){
	$("select option[value='HI']").remove(); /* Remove Hawaii state options */
	$("select option[value='AK']").remove(); /* Remove Hawaii state options */

	/* Spell out Canda in dropdown */
	$('#ctinputcountry option:contains("CA")').text('Canada');
	$('#ctinputhomecountry option:contains("CA")').text('Canada');

}