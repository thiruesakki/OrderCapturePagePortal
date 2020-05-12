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


//$('#reset_submit').click(
//function() {
//	var url = window.location.href;
//	var queryString = url ? url.split('?')[1] : window.location.search
//			.slice(1);
//	var reset_code = queryString.split('=')[1];
////	if ($('#resetform').valid()) {
//		var newPassword = $("#new_password").val();
//		var confirmPassword = $("#confirm_password").val();
//		
//		alert("reset_code"+reset_code);
//		$.ajax({
//			type : "POST",
//			cache: false,
//			url : "verifyResetPasswordLink?secret=" + reset_code,
//			contentType : 'application/json',
//			success : function(data) {
//				if (data.status == 0) {
//					var userid = data.errorMessage;
//					console.log("verification url"+url)
//					$.ajax({
//						type : "POST",
//						cache: false,
//						url : "updatePassword?reg_id=" + userid
//								+ "&new_password=" + newPassword,
//						contentType : 'application/json',
//						success : function(data) {
//							if (data.status == 0) {
//								alert("Updated Successfully");
//								location.href = "index.jsp";
//							} else {
//								alert(data.status);
//							}
//						} ,
//						error : function(msg) {
//							alert("unable to update the password");
//						}
//					});
//
//				} else {
//					alert(data.statusMessage);
//				}
//			},
//			error : function(msg) {
//				alert("unable to verify reset link");
//			}
//		});
////	}
//
//});

});