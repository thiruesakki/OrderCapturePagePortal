/**
 * 
 */

$(document)
		.ready(
				function() {
$('#f_submit').click(function() {
	var forgotEmailAddress = $("#f_emailAddress").val();
//	console.log(forgotEmailAddress);
	
	if (forgotEmailAddress == "") {
	alert("Enter the Valid email address");
    }
	else{
		
	var url = "/OrderCapturePortal/REST/WebService/VerifyEmailForgot?email=" + forgotEmailAddress;
	console.log("Email url"+url);	
	jQuery.ajax({
		url : url,
		type : 'GET',
		dataType : 'json',
		cache : 'false',
		success : function(data) {
//			  			   console.log("data"+JSON.stringify(data));
				if (data.status == 0) {
					alert("Reset Password Link is sent to the email");
				} else if (data.status == 1) {
					alert(data.errorMessage);
				}
		},
		error: function (msg) {
			  alert("Unable to verify Email");
//			  alert("Failed1: " + msg.status + ": " + msg.statusText);
		}
	}); 

	}
                 });


});