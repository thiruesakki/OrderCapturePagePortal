var web_mssql_api_url	= "/REST/WebService/";

$(window).on('load', function() {

	// TODO if any values to be set on load
})

$('#SubmitPromo').on('click', function(e) {
	e.preventDefault();
	// console.log("Submit button clicked on Promo page");
	promoSubmitAction();
});

function promoSubmitAction() {
	var id = '';
	// var emailid = $("#email").val();
	// var fName = $("#fname").val();
	// var lName = $("#lname").val();

	// TODO Comment the below hardcoded values and get the values from the
	// component to set as given above
	var promoID = "RBrake1";
	var promoName = "RBrake1 promotion";
	var fName = "Test";
	var lName = "User";
	var emailid = "test@ennvee.com";
	var businessName = "Testing";
	var ownerName = "Tester";
	var address1 = "11 Crown street";
	var address2 = "";
	var city = "Naperville";
	var state = "Illinois";
	var zipCode = "650041";
	var country = "USA";
	var phoneNo = "+81356978212";
	var website = "www.ennvee.com";
	var receiveCommunication = 1;
	var remarks = "";

	var businessObj = {};
	businessObj.id = id;
	businessObj.promoID = promoID;
	businessObj.promoName = promoName;
	businessObj.firstName = fName;
	businessObj.lastname = lName;
	businessObj.email = emailid;
	businessObj.businessName = businessName;
	businessObj.ownerName = ownerName;
	businessObj.address1 = address1;
	businessObj.address2 = address2;
	businessObj.city = city;
	businessObj.state = state;
	businessObj.zipCode = zipCode;
	businessObj.country = country;
	businessObj.phoneNo = phoneNo;
	businessObj.website = website;
	businessObj.receiveCommunication = receiveCommunication;
	businessObj.remarks = remarks;
//	console.log("submitBusinessDetailsService web service called:",
//					businessObj);
	submitBusinessDetailsService(businessObj);

}

function submitBusinessDetailsService(businessDetailsObj) {
	var url = web_mssql_api_url+"AddPromoBusinessDetail";
//	var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/AddPromoBusinessDetail";
	jQuery.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		type : "POST",
		url : url,
		data : JSON.stringify(businessDetailsObj),
		success : function(data1) {
			// console.log("Add PromoBusinessDetail response from web service:",
			// data1);
			handleAddBusinessResponse(data1);
		},
		error : function(msg) {
			handleAddBusinessResponse(msg);
			// console.log("PromoBusinessDetail record not added:", msg.status,
			// ": ",
			// msg.statusText);
		}
	});

}

function handleAddBusinessResponse(response) {
	// console.log("handleAddBusinessResponse response from web service:",
	// response);
	var status = response.status;
	if (status == 0) {
		alert("Promo Submission done successfully." + response.errorMessage);
	} else {
		alert("Promo Submission not done - " + response.errorMessage);
	}
}