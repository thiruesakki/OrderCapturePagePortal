var web_mssql_api_url	= "/REST/WebService/";

$(window).on('load', function() {

	// TODO if any values to be set on load
})

$('#SubmitPromo').on('click', function(e) {
	e.preventDefault();
	promoSubmitAction();
});

function promoSubmitAction() {
	console.log("Submit button clicked on Promo page");
	var id = '';
	// var emailid = $("#email").val();
	// var fName = $("#fname").val();
	// var lName = $("#lname").val();

	// TODO Comment the below hardcoded values and get the values from the
	// component to set as given above
//	var promoID = "RBrake1";
//	var promoName = "RBrake1 promotion";
//	var fName = "Test";
//	var lName = "User";
//	var emailid = "test@ennvee.com";
//	var businessName = "Testing";
//	var ownerName = "Tester";
//	var address1 = "11 Crown street";
//	var address2 = "";
//	var city = "Naperville";
//	var state = "Illinois";
//	var zipCode = "650041";
//	var country = "USA";
//	var phoneNo = "+81356978212";
//	var website = "www.ennvee.com";
//	var receiveCommunication = 1;
//	var remarks = "";
	
	var promoID = "RBrake1";
	var promoName = "RBrake1 promotion";
//	var fName = "Test";
//	var lName = "User";
//	var emailid = "test@ennvee.com";
//	var businessName = "Testing";
//	var ownerName = "Tester";
//	var address1 = "11 Crown street";
//	var address2 = "";
//	var city = "Naperville";
//	var state = "Illinois";
//	var zipCode = "650041";
//	var country = "USA";
//	var phoneNo = "+81356978212";
//	var website = "www.ennvee.com";
//	var receiveCommunication = 1;
//	var remarks = "";
	
	var fName = $("#inputName").val();
	var lName = $("#inputLastName").val();
	var emailid = $("#inputEmail").val();
	var businessName = $("#inputBusName").val();
	var ownerName = $("#inputOwnersName").val();
	var address1 = $("#inputBusAddr").val();
	var address2 = $("#inputBusAddr2").val();
	var city = $("#inputCity").val();
	var state = $("#inputState").val();
	var zipCode = $("#inputZipCode").val();
	var country = "USA";
	var phoneNo = $("#inputPhone").val();
	var website = $("#inputWebsite").val();
//	var receiveCommunication = 1;
//	var remarks = "";
	
//	var promoID = document.querySelector('#promotionId').value || ""
//	var promoName = document.querySelector('#promotionName').value || ""
//	var fName = document.querySelector('#inputName').value || ""
//	var lName = document.querySelector('#inputLastName').value || ""
//	var emailid = document.querySelector('#inputEmail').value || ""
//	var businessName = document.querySelector('#inputBusName').value || ""
//	var ownerName = document.querySelector('#inputOwnersName').value || ""
//	var address1 = document.querySelector('#inputBusAddr').value || ""
//	var address2 = document.querySelector('#inputBusAddr2').value || ""
//	var city = document.querySelector('#inputCity').value || ""
//	var state = document.querySelector('#inputState').value || ""
//	var zipCode = document.querySelector('#inputZipCode').value || ""
//	var country = "USA";
//	var phoneNo = document.querySelector('#inputPhone').value || ""
//	var website = document.querySelector('#inputWebsite').value || ""
	var receiveCommunication = 0

	if (document.querySelector('#checkboxFuture').checked) {
		console.log("Future Communications Checkbox checked");
		receiveCommunication = 1
	}

	var remarks = "";


	var businessObj = {};
	businessObj.id = id;
	businessObj.promoID = promoID;
	businessObj.promoName = promoName;
	businessObj.firstName = fName;
	businessObj.lastname = lName;
	businessObj.email = emailid;
	businessObj.businessName = businessName;
	businessObj.ownersName = ownerName;
	businessObj.address1 = address1;
	businessObj.address2 = address2;
	businessObj.city = city;
	businessObj.state = state;
	businessObj.zipCode = zipCode;
	businessObj.country = country;
	businessObj.phoneNo = phoneNo;
	businessObj.website = website;
	businessObj.receiveCommunications = receiveCommunication;
	businessObj.remarks = remarks;
	console.log("submitBusinessDetailsService web service called:",
					businessObj);
	submitBusinessDetailsService(businessObj);

}

function submitBusinessDetailsService(businessDetailsObj) {
//	var url = web_mssql_api_url+"AddPromoBusinessDetail";
	var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/AddPromoBusinessDetail";
	jQuery.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		type : "POST",
		url : url,
		data : JSON.stringify(businessDetailsObj),
		success : function(data1) {
			console.log("Add PromoBusinessDetail response from web service:", data1);
			handleAddBusinessResponse(data1);
		},
		error : function(msg) {
			handleAddBusinessResponse(msg);
			 console.log("PromoBusinessDetail record not added:", msg.status, ": ", msg.statusText);
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