var web_mssql_api_url	= "/REST/WebService/";
var review_recaptcha_widget;

$(window).on('load', function() {
	
})

var onloadCallback = function() {
	if ($('#captcha_div').length) {
		review_recaptcha_widget = grecaptcha.render('captcha_div', {
			'sitekey' : '6LdP_UwUAAAAAGDIAfq3P8CF1R0PDisjpiTpP_oi'
		});
	}
};
onloadCallback();

function validateRecaptchaResponse() {
	if (grecaptcha.getResponse() == "") {
		alert("ReCaptcha Response Not Received");
	} else {
		var captchaRresponse = grecaptcha.getResponse();
		// console.log('RESPONSE:[', captchaRresponse, ']');
		recaptchaVerification(captchaRresponse);
	}
}

function recaptchaVerification(captchaResponse) {

	// var url = web_mssql_api_url+"verifyCaptcha";
	var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/verifyCaptcha";
	jQuery.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		type : "POST",
		url : url,
		data : JSON.stringify(captchaResponse),
		success : function(data) {
			console.log("verifyCaptcha response from web service:", data);
			handleCaptchaResponse(data);
		},
		error : function(msg) {
			console.log("verifyCaptcha record not added:", msg.status, ": ",
					msg.statusText);
			handleCaptchaResponse(msg);
		}
	});
}

function handleCaptchaResponse(data) {
	var status = data.status;
	if (status == 0) {
		var obj = data.object;
		var success = obj.success;
		if (success == true) {
			console.log('validateRecaptchaResponse Received', success);
			chevyTruckPromoSubmitAction();
		} else {
			alert("Recaptcha Verification Failed");
		}
	} else {
		alert("ReCaptcha Response Not Received");
	}
}
	
function chevyTruckPromoSubmitAction() {

//	console.log("Submit button clicked on chevytruckPromo page");
	var id = '';
	var promoID = "RBrake1";
	var promoName = "RBrake1 promotion";
	var fName = $("#ctinputfirstName").val();
	var lName = $("#ctinputLastName").val();
	var emailid = $("#ctinputEmail").val();
	var businessName = $("#ctinputBusName").val();
	var ownerName = $("#ctinputOwnersName").val();
	var address1 = $("#ctinputBusAddr").val();
	var address2 = $("#ctinputBusAddr2").val();
	var country = $("#ctinputcountry").val();
	var city = $("#ctinputCity").val();
	var state = $("#ctinputState").val();
	var zipCode = $("#ctinputZipCode").val();
	var phoneNo = $("#ctinputPhone").val();
	var website = $("#ctinputWebsite").val();
	var homeAddress1 = $("#ctinputhomeAddr").val();
	var homeAddress2 = $("#ctinputhomeAddr2").val();
	var homeCountry = $("#ctinputhomecountry").val();
	var homeCity = $("#ctinputhomeCity").val();
	var homeState = $("#ctinputhomeState").val();
	var homeZipCode = $("#ctinputhomeZipCode").val();
	var homePhoneNo = $("#ctinputhomePhone").val();
	var jobTitle = $("#ctinputjobtitle").val();
	var uniqueCode = $("#ctuniquecode").val();
	
	var points = '';
	if (uniqueCode != '' && uniqueCode != null && uniqueCode != undefined) {
		points = $("#ctinputpoints").val();
	} 
	
	var receiveCommunication = 0

	if (document.querySelector('#ctcheckboxFuture').checked) {
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
	businessObj.country = country;
	businessObj.city = city;
	businessObj.state = state;
	businessObj.zipCode = zipCode;
	businessObj.phoneNo = phoneNo;
	businessObj.website = website;
	businessObj.homeAddress1 = homeAddress1;
	businessObj.homeAddress2 = homeAddress2;
	businessObj.homeCity = homeCity;
	businessObj.homeState = homeState;
	businessObj.homeZipCode = homeZipCode;
	businessObj.homeCountry = homeCountry;
	businessObj.homePhoneNo = homePhoneNo;
	businessObj.jobTitle = jobTitle;
	businessObj.uniqueCode = uniqueCode;
	businessObj.points = points;
	businessObj.receiveCommunications = receiveCommunication;
	businessObj.remarks = remarks;
	console.log("submitBusinessDetailsService web service called:",
					businessObj);
	submitChevyTruckPromoDetails(businessObj);

}

function submitChevyTruckPromoDetails(businessDetailsObj) {

	// var url = web_mssql_api_url+"AddPromoBusinessDetail";
	var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/AddChevyTruckPromoDetails";
	jQuery.ajax({
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		type : "POST",
		url : url,
		data : JSON.stringify(businessDetailsObj),
		success : function(data1) {
			console.log("Add ChevyTruckDetails response from web service:", data1);
			handleChevyTruckResponse(data1);
		},
		error : function(msg) {
			handleChevyTruckResponse(msg);
			 console.log("ChevyTruckDetails record not added:", msg.status, ": ", msg.statusText);
		}
	});
}



function handleChevyTruckResponse(response) {
	var status = response.status;
	if (status == 0) {
		alert("ChevyTruckPromo Submission done successfully." + response.errorMessage);
	} else {
		alert("CheckTruckPromo Submission not done - " + response.errorMessage);
	}
}


var form;
$(function() {
    form=$("form[name='ctpromotions']").validate({
        rules : {
            ctinputName : {
                required : true,
                maxlength : 20
            },
            ctinputLastName : {
                required : true,
                maxlength : 20
            },
            ctinputEmail : {
                required : true,
                email : true
            },
            ctinputBusName : {
                required : true,
            }, 
            ctinputOwnersName : {
                required : true,
            },
            ctinputBusAddr : {
                required : true,
            }, 
            ctinputcountry : {
            	required:true,
            },
            ctinputCity : {
                required : true,
            }, 
            ctinputState : {
                required : true,
             }, 
             ctinputZipCode : {
                 required : true,
             },
             ctinputPhone : {
                 required : true,
                 minlength: 10,
                 digits: true ,
             }, 
             ctinputWebsite : {
                 required : true,
             },
             ctinputhomeAddr : {
                 required : true,
             }, 
             ctinputhomecountry : {
             	required:true,
             },
             ctinputhomeCity : {
                 required : true,
             }, 
             ctinputhomeState : {
                 required : true,
              }, 
              ctinputhomeZipCode : {
                  required : true,
              },
              ctinputhomePhone : {
                  required : true,
                  minlength: 10,
                  digits: true ,
              }, 
	         ctinputjobtitle : {
	        	 required:true,
		     },
        }, 
        
// Specify validation error messages
       messages: {
           ctinputName: {
               required:"Please Enter First Name",
               maxlength: "maximum characters is 20"
            },
            
            ctinputLastName: {
                required:"Please Enter Last Name",
                maxlength: "maximum characters is 20"
             },
    
            ctinputEmail : "Please Enter a Valid Email Address",
  
            ctinputBusName: {
                 required:"Please Enter Your Business Name",
            },
  
            ctinputOwnersName: {
                required:"Please Enter Your Owners Name",
            },
            
            ctinputBusAddr: {
                required:"Please Enter Your address",
            },
    
            ctinputcountry : {
            	required:"Please Select Country",
            },
            
            ctinputCity: {
                required:"Please Fill the City",
            },
            
            ctinputState: {
                required:"Please Fill the State",
             },
             
            ctinputZipCode: {
                required:"Please Enter a Zipcode",
            },
            
            ctinputPhone: {
                required: "Please Enter a Phone Number",
                minlength: "Phone number must be at least 10 digits long",
                digits:"Phone number must be digits"
            },
    
            ctinputWebsite: {
                required:"Please Enter Your Website",
            },
            
            ctinputhomeAddr: {
                required:"Please Enter Your Address",
            },
    
            ctinputhomecountry : {
            	required:"Please Select Country",
            },
            
            ctinputhomeCity: {
                required:"Please Fill the City",
            },
            
            ctinputhomeState: {
                required:"Please Fill the State",
             },
             
            ctinputhomeZipCode: {
                required:"Please Enter a Zipcode",
            },
            
            ctinputhomePhone: {
                required: "Please enter valid a  Phone Number",
                minlength: "Phone number must be at least 10 digits long",
                digits:"Phone number must be digits"
            },
            ctinputjobtitle : {
                required:"Please Select Jobtitle",
             },
       },
       submitHandler: function(form) {
    	   validateRecaptchaResponse();
       }
    });
});

$('#ctresetPromo').on('click', function(e) {
form.resetForm();
});

	

