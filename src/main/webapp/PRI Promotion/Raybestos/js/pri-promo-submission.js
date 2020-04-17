var web_mssql_api_url	= "/REST/WebService/";

$(window).on('load', function() {

	// TODO if any values to be set on load
})

//$('#submitPromo').on('click', function(e) {
//	e.preventDefault();
//	priPromoSubmitAction();
//});

function priPromoSubmitAction() {
	console.log("Submit button clicked on PRI Promo page");
	var id = '';
	var promoID = "PRIPromo";
	var promoName = "PRI promotion";
	
	var fullName = $("#inputName").val();
	var emailid = $("#inputEmail").val();
	var phoneNo = $("#inputPhone").val();
	var title = $("#inputDescribesYou").val();
	
	var interestedIn = 0
	if (document.querySelector('#racing').checked) {
		console.log("Racing selected");
		interestedIn = 1;
	} else if(document.querySelector('#performance').checked){
		console.log("performance selected");
		interestedIn = 2;
	} else if(document.querySelector('#both').checked){
		console.log("both selected");
		interestedIn = 9;
	}
	
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
	businessObj.fullName = fullName;
	businessObj.email = emailid;
	businessObj.phoneNo = phoneNo;
	businessObj.title = title;
	businessObj.interestedIn = interestedIn;
	businessObj.receiveCommunications = receiveCommunication;
	businessObj.remarks = remarks;
	console.log("submitBusinessDetailsService web service called:",
					businessObj);
	submitBusinessDetailsService(businessObj);

}

function submitBusinessDetailsService(businessDetailsObj) {
//	var url = web_mssql_api_url+"AddPRIPromoDetail";
	var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/AddPRIPromoDetail";
	jQuery.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		type : "POST",
		url : url,
		data : JSON.stringify(businessDetailsObj),
		success : function(data1) {
			console.log("Add PRI PromoBusinessDetail response from web service:", data1);
			handleAddBusinessResponse(data1);
		},
		error : function(msg) {
			handleAddBusinessResponse(msg);
			 console.log("PRI PromoBusinessDetail record not added:", msg.status, ": ", msg.statusText);
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
var form;
$(function() {
	form=$("form[name='priPromotions']").validate({
        rules: {
            inputName: "required",
            inputEmail: {
                required: true,
                email: true
            },
            inputPhone: {
                required: true,
                minlength: 10,
                digits: true ,
            },
			
            inputDescribesYou: {
            	dropdown:true
            },
            interestedIn:{
            	required: true,
            }
        },
        // Specify validation error messages
        messages: {
            inputName: "Please enter the name",
            inputEmail: "Please enter valid Email Address",
            inputPhone:{
                required: "Please enter valid Phone Number",
                minlength: "Phone number must be at least 10 digits long",
                digits:"Phone number must be digits"
            },
            interestedIn : "Please select your interest" 
            
        },
        submitHandler: function(form) {
//            form.submit();
        	priPromoSubmitAction();
        }
    });
});
$('#resetPromo').on('click', function(e) {
	form.resetForm();
});
   $.validator.addMethod("dropdown", function(value, element) {
	  return this.optional( element ) ||value!='Select Title';
	}, 'Please select any title.');

