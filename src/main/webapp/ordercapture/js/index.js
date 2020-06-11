/**
 * 
 */

$(document)
		.ready(
				function() {
					$('#cancel').click(function() {
						$("#mgnlUserId").val('');
						$("#mgnlUserPSWD").val('');
					});

					$('#loginButton')
							.click(
									function() {
										// if ($('#loginform').valid()) {
										var loginEmailAddress = $("#mgnlUserId")
												.val();
										var loginPassword = $("#mgnlUserPSWD")
												.val();
										const
										encodedData = window
												.btoa(loginEmailAddress + ":"
														+ loginPassword); // encode
																			// a
																			// string
										// console.log("loginEmailAddress"+"
										// "+loginEmailAddress);
										// console.log("loginPassword"+"
										// "+loginPassword+"");
										// const decodedData =
										// window.atob(encodedData);
										// console.log("encodedData"+encodedData);
										// console.log("decodedData"+decodedData);

										if (loginEmailAddress == ""
												&& loginPassword == "") {
											alert("Enter Username and Password");
										} else if (loginEmailAddress == "") {
											alert("Enter the Username")
										} else if (loginPassword == "") {
											alert("Enter the Password")
										}
										var validationFlag = 0;
										if (loginEmailAddress != ""
												&& loginPassword != "") {
											validationFlag = 1;
										}

										if (validationFlag == 1) {

											var url = "/OrderCapturePortal/REST/WebService/VerifyLogin";
											$
													.ajax({
														url : url,
														type : 'GET',
														dataType : 'json',
														cache : 'false',
														beforeSend : function(
																xhr) {
															xhr
																	.setRequestHeader(
																			"Authorization",
																			"Basic "
																					+ btoa(loginEmailAddress
																							+ ":"
																							+ loginPassword));
														},
														xhrFields : {
															withCredentials : true
														},
														crossDomain : true,
														success : function(json) {
															var obj = JSON
																	.parse(json.object);
															if (json.status == 0) {
																var userID = obj.id;
																setCookie("userID",obj.id);
																setCookie("isadmin",obj.isadmin);
																BpiccCommon.GetUserRoleDetails(1);
																alert("Login Successfully");
//																url = 'bpionline-mexico/selectAccount.html?q='
//																		+ encodeURIComponent(Encoding(userID));
																url = 'ordercapture/selectAccount.html';
																location.href = url;
															} else if (json.status > 0) {
																alert(json.errorMessage);
															}

														},
														error : function(
																XMLHttpRequest,
																textStatus,
																errorThrown) {
															// alert(textStatus,
															// errorThrown);
															console
																	.log(errorThrown);
														},

													});
										}
										//	};
									});
				});

//$(function() {
//    $("#loginform").validate({
//        rules : {
//        	mgnlUserId : {
//                required : true,
//
//            },
//            mgnlUserPSWD : {
//                required : true,
//
//            }
//        },
//        messages : {
//        	mgnlUserId : {
//                required : "Please enter a Valid Email Address",
//            },
//            mgnlUserPSWD : {
//                required : "Please enter Password",
//            },
//        },
//        submitHandler : function(form) {
//            // console.log("Submitted");
//        }
//    });
//
//});  

