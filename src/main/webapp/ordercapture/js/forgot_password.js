$(document)
		.ready(
				function() {
					
$('#f_submit').click(function() {
	
	var forgotEmailAddress = $("#f_emailAddress").val();
		//	console.log(forgotEmailAddress);
	
	if (forgotEmailAddress == "") {
	     alert("Enter the Valid email address");
    }
	
	else {
		
			var url = "/OrderCapturePortal/REST/WebService/VerifyEmailForgot?email=" + forgotEmailAddress;
			console.log("VerifyEmailForgot url"+url);	
			jQuery.ajax({
				url : url,
				type : 'GET',
				dataType : 'json',
				cache : 'false',
				success : function(data) {
//					var obj=JSON.parse(data.object);
//					 var userID = obj.userID;
//					 console.log("user ID"+userID);
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


$('#reset_submit').click(
		
function() {
	
	var newPassword = $("#new_password").val();
	var confirmPassword = $("#confirm_password").val();
	var newPasswordLength = $("#new_password").val().length;
	var minlength=7;
	var maxlength=10
		//	alert("newPassword"+newPassword+" "+confirmPassword);
	
	if (newPassword == "") {
		alert("Enter the Password");
	}
	
	else if (confirmPassword == "") {
		alert("Enter the confirm Password");
	}  
	else if (confirmPassword !==newPassword){
		alert("Your password and confirmation password shoud be same");
	}
	
	else if(newPasswordLength < minlength ){
		alert("Your password must be at least 7 characters long");
	}
	else if(newPasswordLength > maxlength ){
		alert("Your password must be maximum of 10 characters long");
	}
	
	else {
		
				var url = window.location.href;
				var queryString = url ? url.split('?')[1] : window.location.search
						.slice(1);
				var reset_code = queryString.split('=')[1];
			
				const
				encodedData = window
						.btoa("new_password:"
								+ new_password); 
					
//					alert("reset_code"+reset_code);
					$.ajax({
						type : "POST",
						cache: false,
						url : "/OrderCapturePortal/REST/WebService/VerifyResetPswdLink?secret=" + reset_code,
						contentType : 'application/json',
						success : function(data) {
							
			//				console.log("obj"+data.userID);
							var userid=data.userID;
							if (data.status == 0) {
							    console.log("verification url"+url)
								$.ajax({
										type : "POST",
										url : "/OrderCapturePortal/REST/WebService/ResetPassword",
										cache : 'false',
										beforeSend : function(
												xhr) {
											xhr
													.setRequestHeader(
															"Authorization",
															"Basic "
																	+ btoa(userid
																			+ ":"
																			+ newPassword));
										},
										xhrFields : {
											withCredentials : true
										},
										crossDomain : true,
										contentType : 'application/json',
									success : function(data) {
										if (data.status == 0) {
											alert("Updated Successfully");
											location.href = "http://localhost:8080/OrderCapturePortal/";
										} else {
											alert(data.errorMessage);
										}
									} ,
									error : function(msg) {
										alert("unable to update the password");
									}
								});
			
							} else {
								alert(data.errorMessage);
							}
						},
						error : function(msg) {
							alert("unable to verify reset link");
						}
					});
	      }
     });
});
