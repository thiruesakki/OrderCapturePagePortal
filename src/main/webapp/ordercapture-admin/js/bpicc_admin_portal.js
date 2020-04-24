var orgID="";
$(window).on(
		'load',
		function() {

			$(".adminUserDetailBlock").show();
			$(".addUserBlock").hide();
			$(".editUserBlock").hide();

			getCAPUsers();
			
			$('#search_user').on(
					'click',
					function(e) {
						e.preventDefault();
						var searchType = $(
								"input:radio[name=adminuser]:checked").val();
						var searchKey = $("#search").val();
						console.log("User clicked on Search button - Type:",
								searchType, ",SearchKey:", searchKey);
						if (searchKey != null && users != undefined) {
							BpiccAdmin.getMatchingRecordsFromDB(searchType,
									searchKey);
						}
					});
			
			$('#search').keypress(function (e) {
				 	var key = e.which;
				 	if(key == 13){  // the enter key code
				 		e.preventDefault();
				 		var searchType = $(
				 			"input:radio[name=adminuser]:checked").val();
				 		var searchKey = $("#search").val();
				 		console.log("User pressed Enter key - Type:",
							searchType, ",SearchKey:", searchKey);
				 		if (searchKey != null && users != undefined) {
				 			BpiccAdmin.getMatchingRecordsFromDB(searchType,
								searchKey);
				 		}
				 	}
			}); 

			$('#useridRadio').click(function(){
				$('#search').val('');
                 });

            $('#billToRadio').click(function(){
				$('#search').val('');
				});
            
			$('#shipToRadio').click(function(){
				$('#search').val('');
				}); 
				
			$('#add-user').on('click', function(e) {
				e.preventDefault();
				BpiccAdmin.loadAddUserPage();
				console.log("Add New User button clicked");
			});

			$('#add-user_edit').on('click', function(e) {
				e.preventDefault();
				BpiccAdmin.loadAddUserPage();
				console.log("Add New User button clicked");
			});

			$('#cancel-button_add').on('click', function(e) {
				e.preventDefault();
				BpiccAdmin.loadUserListPage();
				console.log("Cancel button clicked");

			});

			$('#cancel-button_edit').on('click', function(e) {
				e.preventDefault();
				BpiccAdmin.loadUserListPage();
				console.log("Edit Page - Cancel button clicked");

			});
			
			$('.billtoShipto').on('click', '#btn1', function() {
				billToShipToRowNo++;
		        $(this).attr('id','minus');
		        $(this).removeClass('fa-plus-square').addClass('fa-minus-square');
		        $(".billtoShipto ul").append('<li id="Row' + billToShipToRowNo + '"><div class="row bill"> <div class="col-md-3 ShipTo"><span>Ship To</span><input type="text" class="form-control" id="shipto_add_row' + billToShipToRowNo + '" name="shipto"  onfocusout="shipToFocusLost(\'' + billToShipToRowNo
						+ '\')" ></div><div class="col-md-3 billTo"><span>Bill To</span><input type="text" class="form-control" id="billto_add_row' + billToShipToRowNo + '" name="billto" disabled="disabled"></div><div class="col-md-5 address" style="display: block"><input type="text" id="account_add_row' + billToShipToRowNo + '" style="display:none"><input type="text" class="form-control" id="accountNo_add_row' + billToShipToRowNo + '" disabled="disabled"></div><div class="col-md-1 icons"><i class="fa fa-plus-square"  id="btn1" aria-hidden="true"></i></div></div></li>');
		        
		    });
		    $('.billtoShipto').on('click', '#minus', function() {
		        $(this).parent().parent().remove();
		    });

		    $('.billtoShipto').on('click', '#btn1_edit', function() {
				billToShipToRowNo_Edit++;
		        $(this).attr('id','minus_edit');
		        $(this).removeClass('fa-plus-square').addClass('fa-minus-square');
		        $(".billtoShipto ul").append('<li id="EditRow' + billToShipToRowNo_Edit + '"><div class="row bill"> <div class="col-md-3 ShipTo"><span>Ship To</span><input type="text" class="form-control" id="shipto_edit_row' + billToShipToRowNo_Edit + '" name="shipto"  onfocusout="shipToFocusLost_edit(this)"></div><div class="col-md-3 billTo"><span>Bill To</span><input type="text" class="form-control" id="billto_edit_row' + billToShipToRowNo_Edit + '" name="billto" disabled="disabled"></div><div class="col-md-5 address" style="display: block"><input type="text" id="account_edit_row' + billToShipToRowNo_Edit + '" style="display:none"><input type="text" class="form-control" id="accountNo_edit_row' + billToShipToRowNo_Edit + '" disabled="disabled"></div><div class="col-md-1 icons"><i class="fa fa-plus-square"  id="btn1_edit" aria-hidden="true"></i></div></div>');
		        
		    });
		    
		    $('.billtoShipto').on('click', '#minus_edit', function() {
		        $(this).parent().parent().remove();
		    });
			
//			$(".shipto_add").focusout(function(){
////			    $(this).css("background-color", "#FF0000");
//				var id = $(this).attr('id');  
//				var value = $(this).val(); 
//				console.log(id, " ShipTo Value:", value);
//			});
//			$('#submit-button_add').on('click', function(e) {
//				e.preventDefault();
//				console.log("Add Page - Submit button clicked");
//				BpiccAdmin.addNewUser();
//			});
		    orgID=getCookie("selected_org_id");
		})

shipToFocusLost = function(rowID) {
	console.log("Focus Lost on Row No:", rowID);
	var id = "#shipto_add_row" + rowID;  
	var value = $(id).val(); 
	console.log(id, " ShipTo Value:[", value, "]");
	if(value != null && value != undefined && value != ""){
		var id1 = "#billto_add_row" + rowID;  
		$(id1).val(''); 
		var id2 = "#accountNo_add_row" + rowID;  
		$(id2).val('');
		BpiccAdmin.getBillToForEnteredShipTo(value, rowID, true, false);
	}
};

shipToFocusLost_edit = function(element) {
	console.log("Focus Lost on Row No:", element.value);
	var value = element.value;
	var id = element.id;
	var rowID = id.substring(15);
	console.log(rowID, " ShipTo Value:[", value, "]");
//	var id = "#shipto_edit_row" + rowID;  
//	var value = $(id).val();
//	var id = "shipto_edit_row" + rowID;
//	var value = document.getElementById(id).innerHTML; 
//	var value = $(id).attr('value');
	if(value != null && value != undefined && value != ""){
		var id1 = "#billto_edit_row" + rowID;  
		$(id1).val(''); 
		var id2 = "#accountNo_edit_row" + rowID;  
		$(id2).val('');
		BpiccAdmin.getBillToForEnteredShipTo(value, rowID, false, false);
	}
};

BpiccAdminClass = function() {
	this.users = [];
	this.roles = [];
	
	var billToShipToRowNo = 1;
	var billToShipToRowNo_Edit = 1;
	var currentEditUserID = '';
}
bpi_admin_obj = new BpiccAdminClass();

function getCAPUsers() {
	$(".loader").show();
	//	var url = bpi_com_obj.web_mssql_api_url+"GetAllCAPUsers";
	var url = "http://localhost:8080/OrderCapturePortal/REST/WebService/GetAllCAPUsers";
	jQuery.ajax({
		type : "GET",
		url : url,
		success : function(data1) {
			console.log("User records received:", data1);
			setUsersInView(data1);
		},
		error : function(msg) {
			$(".loader").hide();
			console.log("No User available to display:", msg);
		}
	});

}

function setUsersInView(data) {
	var status = data.status;
	if (status == 0) {
		users = data.object;
		if (users != null && users != undefined && users.length > 0) {
			html = "";
			for ( var i in users) {
				var user = users[i];
				var id = users[i].id;
				var email = users[i].email;
				var password = users[i].password;
				var firstName = users[i].firstName;
				var lastName = users[i].lastname;
				var status = users[i].activeStatus;
				var isCustomer = users[i].iscustomer;

//				console.log("Add User rows:", user);
				// Add Rows
				html += "<tr id=" + id + ">"
				html += '<td><a href="#" onclick="BpiccAdmin.loadEditUser(\'' + id
						+ '\');">' + email + ' </td>';
				html += '<td>' + firstName + '</a></td>';
				html += '<td>' + lastName + '</td>';
				html += '<td><a href="#" onclick="BpiccAdmin.loadEditUser(\''
						+ id
						+ '\');"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span><a></td>';
				html += "</tr>";
				i++;
			}
			$("#user_list_tbl tbody tr").remove();
			$("#user_list_tbl tbody").append(html);
		} else {
			console.log("error:", users);
			// Display error
		}
		$(".loader").hide();
	} else {
		$(".loader").hide();
		console.log("No records found; Error from backend:", data.errorMessage);
		alert("Unable to fetch user records");
	}

}

BpiccAdmin = {
	loadEditUser : function(id) {
		console.log("User clicked on Row:", id);
		$(".loader").show();
		billToShipToRowNo_Edit = 1;
		$("label.error").remove();
		currentEditUserID = id;
		var user = BpiccAdmin.getSelectedUser(id);
		console.log("User object for selected Row:", user);
		var email = user.email;
		var password = user.password;
		var firstName = user.firstName;
		var lastName = user.lastname;
		var status = user.activeStatus;
		$("#email_edit").val(email);
		$("#password_edit").val(password);
		$("#fname_edit").val(firstName);
		$("#lname_edit").val(lastName);
		if(status == 1){
			$("#active_edit").prop("checked", true);
		} else {
			$("#inactive_edit").prop("checked", true);
		}
//		var url = bpi_com_obj.web_mssql_api_url+"GetUserRoleDetails";
		var url = "http://localhost:8080/OrderCapturePortal/REST/WebService/GetUserRoleDetails";
		jQuery.ajax({
			type : "GET",
			url : url,
			dataType: "json",
			data:"userID="+id,
			success : function(data) {
				console.log("User ROLES and Customer Data received:", data);
//				BpiccAdmin.setUserRoleSelected(data);
				var userRoles = null;
				var customerData = null;
				var status = data.status;
				if (status == 0) {
					userRoles = data.object['roles'];
					customerData = data.object['customer'];
				}
				BpiccAdmin.loadCAPRoles(false, userRoles);
				console.log("customerData:"+customerData);
				BpiccAdmin.updateBillToShipToInView_Edit(customerData);
			},
			error : function(msg) {
				console.log("No CAP ROLES available to display:", msg);
				BpiccAdmin.loadCAPRoles(false, null);
			}
		});

		$(".editUserBlock").show();
		$(".adminUserDetailBlock").hide();
		$(".addUserBlock").hide();
		$(".loader").hide();
	},
	
	getSelectedUser : function(userid){
		if (users != null && users != undefined && users.length > 0) {
			for ( var i in users) {
				var user = users[i];
				var id = users[i].id;
				if(userid == id){
					return user;
				}
			}
		}
	},

	addNewUser : function() {
		/*to clear error messages on entering input text box  */
		$(document).on("keyup", "input.error", function(){
		    $(this).next(".error").hide();
		});
		var id = '';
		var emailid = $("#email").val();
		var pswd = $("#password").val();
		var fName = $("#fname").val();
		var lName = $("#lname").val(); 
		var status = $("input[name='inlineRadioOptions']:checked").val();
		console.log("Selected Status:", status);
		var iscustomer = 1;
		var user = {};
		user.id = id;
		user.email = emailid;
		user.password = pswd;
		user.firstName = fName;
		user.lastname = lName;
		user.activeStatus = status;
		user.iscustomer = iscustomer;
		user.fRoles = new Array();
		user.fCustomers = new Array();
		var selectedRoles = [];
		$('ul#role_list_tbl input[type=checkbox]').each(function() {
			   if ($(this).is(":checked")) {
				   var id = $(this).attr('id');
				   var name = $(this).attr('name');
				   var value = $(this).attr('value');
				   if(id == 1){
					   value = "Place Stock Order";
					   var role = {"roleID" : id, "roleName" : name, "roleDesc" : value, "isActive" : 1, "createdBy" : "", "createdDate" : "", "modifiedBy" : "", "modifiedDate" : ""}
					   console.log(id, " Selected Role name:", name, ", Value:", value);
				       selectedRoles.push(role);
				       var role2 = {"roleID" : 2, "roleName" : "EmergencyOrder", "roleDesc" : "Place Emergency Order", "isActive" : 1, "createdBy" : "", "createdDate" : "", "modifiedBy" : "", "modifiedDate" : ""}
				       selectedRoles.push(role2);
				       var role3 = {"roleID" : 3, "roleName" : "DropShip", "roleDesc" : "Drop Ship", "isActive" : 1, "createdBy" : "", "createdDate" : "", "modifiedBy" : "", "modifiedDate" : ""}
				       selectedRoles.push(role3);
					} else if (id == 2 || id == 3) {
							// DONOT do anything.
					} else {
					   var role = {"roleID" : id, "roleName" : name, "roleDesc" : value, "isActive" : 1, "createdBy" : "", "createdDate" : "", "modifiedBy" : "", "modifiedDate" : ""}
					   console.log(id, " Selected Role name:", name, ", Value:", value);
					   selectedRoles.push(role);
				   }
			   }
			});
		console.log("Selected Roles:", selectedRoles);
		user.fRoles = selectedRoles;
		
		var customerAccounts = [];
		var invalidShiptos = [];
		$('ul#shipToRows li').each(function() {
			var id = $(this).attr('id');
			console.log("TESTING:", id);
			var rowNo = id.substring(3);
			var id1 = "#shipto_add_row" + rowNo;
			var shipTo = $(id1).val();
			console.log("rowNo:", rowNo, "shipTo:", shipTo);
			var id2 = "#billto_add_row" + rowNo;
			var billTo = $(id2).val();
			var id3 = "#accountNo_add_row" + rowNo;
			var accNo = $(id3).val();
			if(billTo != undefined && billTo != '' && accNo != undefined && accNo != ''){
				var customer = {"customerID" : "", "userID" : "",  "status" : "1", "accountNo" : accNo, "billToSiteID" : billTo, "shipToSiteID" : shipTo };
				customerAccounts.push(customer);
			} else {
				if(shipTo != undefined && shipTo != ''){
					invalidShiptos.push(shipTo);
					console.log(shipTo + "Invalid shipto added:" + invalidShiptos);
				}
			}
			});
		
		user.fCustomers = customerAccounts;
		console.log("User to be inserted:", user);
		console.log("Invalid shipto array size:" + invalidShiptos.length);
		if(invalidShiptos.length > 0){
			var errorString = 'The following accounts are inactive or invalid. To save changes delete the rows with invalid accounts before clicking Update: ' + invalidShiptos.toString();
			console.log(errorString);
			alert(errorString);
		} else {
			//		var url = bpi_com_obj.web_mssql_api_url+"AddCAPUser";
			var url = "http://localhost:8080/OrderCapturePortal/REST/WebService/AddCAPUser";
			jQuery.ajax({
				headers : {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				},
				type : "POST",
				url : url,
//			dataType : "application/json",
				data : JSON.stringify(user),
				success : function(data1) {
//				console.log("Add New User response from web service:", data1);
					BpiccAdmin.handleAddUserResponse(data1);
				},
				error : function(msg) {
					BpiccAdmin.handleAddUserResponse(msg);
//				console.log("User record not added:", msg.status, ": ",
//						msg.statusText);
				}
			});
			
		}

	},

	handleAddUserResponse : function(response) {
		console.log("Add New User response from web service:", response);
		var status = response.status;
		if(status == 0){
			alert("User added successfully");
			BpiccAdmin.loadUserListPage();
		} else {
			console.log("User record not added: ", status, ": ",
					response.errorMessage);
			alert("User not added: " + response.errorMessage);
		}
	},
	
	editUser : function() {
//		var id = '';
		var emailid = $("#email_edit").val();
		var pswd = $("#password_edit").val();
		var fName = $("#fname_edit").val();
		var lName = $("#lname_edit").val(); 
		var status = $("input[name='inlineRadioOptions_edit']:checked").val();
		console.log("Selected Status:", status);
		$(document).on("keyup", "input.error", function(){
		    $(this).next(".error").hide();
		});
		var iscustomer = 1;
		var user = {};
		user.id = currentEditUserID;
		user.email = emailid;
		user.password = pswd;
		user.firstName = fName;
		user.lastname = lName;
		user.activeStatus = status;
		user.iscustomer = iscustomer;
		user.fRoles = new Array();
		user.fCustomers = new Array();
		var selectedRoles = [];
		$('ul#role_list_tbl_edit input[type=checkbox]').each(function() {
			   if ($(this).is(":checked")) {
				   var id = $(this).attr('id');
				   var name = $(this).attr('name');
				   var value = $(this).attr('value');
				   if(id == 1){
					   value = "Place Stock Order";
					   var role = {"roleID" : id, "roleName" : name, "roleDesc" : value, "isActive" : 1, "createdBy" : "", "createdDate" : "", "modifiedBy" : "", "modifiedDate" : ""}
					   console.log(id, " Selected Role name:", name, ", Value:", value);
				       selectedRoles.push(role);
				       var role2 = {"roleID" : 2, "roleName" : "EmergencyOrder", "roleDesc" : "Place Emergency Order", "isActive" : 1, "createdBy" : "", "createdDate" : "", "modifiedBy" : "", "modifiedDate" : ""}
				       selectedRoles.push(role2);
				       var role3 = {"roleID" : 3, "roleName" : "DropShip", "roleDesc" : "Drop Ship", "isActive" : 1, "createdBy" : "", "createdDate" : "", "modifiedBy" : "", "modifiedDate" : ""}
				       selectedRoles.push(role3);
				   } else if (id == 2 || id == 3) {
						// DONOT do anything.
					} else {
					   var role = {"roleID" : id, "roleName" : name, "roleDesc" : value, "isActive" : 1, "createdBy" : "", "createdDate" : "", "modifiedBy" : "", "modifiedDate" : ""}
					   console.log(id, " Selected Role name:", name, ", Value:", value);
					   selectedRoles.push(role);
				   }
			   }
			});
		console.log("Selected Roles:", selectedRoles);
		user.fRoles = selectedRoles;
		
		var customerAccounts = [];
		var invalidShiptos = [];
		$('ul#shipToRows_Edit li').each(function() {
			var id = $(this).attr('id');
			console.log("TESTING:", id);
			var rowNo = id.substring(7);
			var id1 = "#shipto_edit_row" + rowNo;
			var element = $('ul#shipToRows_Edit li').find(id1);
//			console.log("Edit shipTo Element:", element);
			var shipTo = element.prop('value');
//			var shipTo = $(id1).val();
			var id2 = "#billto_edit_row" + rowNo;
			var element1 = $('ul#shipToRows_Edit li').find(id2);
//			console.log("Edit billTo Element:", element1);
			var billTo = element1.prop('value');
//			var billTo = $(id2).val();
			var id3 = "#accountNo_edit_row" + rowNo;
			var element2 = $('ul#shipToRows_Edit li').find(id3);
//			console.log("Edit billTo Element:", element2);
			var accNo = element2.prop('value');
//			var accNo = $(id3).val();
			console.log("rowNo:", rowNo, ",shipTo:", shipTo, ",billTo:", billTo, ",accNo:", accNo);
			if(shipTo != undefined && shipTo != '' && billTo != undefined && billTo != '' && accNo != undefined && accNo != ''){
				var customer = {"customerID" : "", "userID" : currentEditUserID,  "status" : "1", "accountNo" : accNo, "billToSiteID" : billTo, "shipToSiteID" : shipTo };
				customerAccounts.push(customer);
			} else {
				if(shipTo != undefined && shipTo != ''){
					invalidShiptos.push(shipTo);
					console.log(shipTo + "Invalid shipto added:" + invalidShiptos);
				}
			}
			});
		user.fCustomers = customerAccounts;
		console.log("User to be updated:", user);
		console.log("Invalid shipto array size:" + invalidShiptos.length);
		if(invalidShiptos.length > 0){
			var errorString = 'The following accounts are inactive or invalid. To save changes delete the rows with invalid accounts before clicking Update: ' + invalidShiptos.toString();
			console.log(errorString);
			alert(errorString);
		} else {
			//		var url = bpi_com_obj.web_mssql_api_url+"EditCAPUser";
			var url = "http://localhost:8080/OrderCapturePortal/REST/WebService/EditCAPUser";
			jQuery.ajax({
				headers : {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				},
				type : "POST",
				url : url,
//			dataType : "application/json",
				data : JSON.stringify(user),
				success : function(data1) {
					BpiccAdmin.handleEditUserResponse(data1);
//				console.log("Edit CAP User response from web service:", data1);
//				BpiccAdmin.loadUserListPage();
				},
				error : function(msg) {
					BpiccAdmin.handleEditUserResponse(msg);
//				console.log("EditCAPUser - User record not updated:", msg.status, ": ",
//						msg.statusText);
				}
			});
		}

	},
	
	handleEditUserResponse : function(response) {
		console.log("Edit User response from web service:", response);
		var status = response.status;
		if(status == 0){
			alert("User updated successfully");
			BpiccAdmin.loadUserListPage();
		} else {
			console.log("User record not updated:", status, ": ",
					response.errorMessage);
			alert("User not updated: " + response.errorMessage);
		}
	},
	
	getMatchingRecordsFromDB : function(searchType, searchKey) {
		//		var url = bpi_com_obj.web_mssql_api_url+"GetCAPUserForEmailSearch";
		var url = "http://localhost:8080/OrderCapturePortal/REST/WebService/GetCAPUserForEmailSearch";
		if (searchType == 'userid') {
			jQuery.ajax({
				type : "GET",
				url : url,
				dataType : "json",
				data : "email=" + searchKey,
				success : function(data1) {
					console.log("User records received on search:", data1);
					BpiccAdmin.updateUsersInView(data1);
				},
				error : function(msg) {
					console
							.log("No User available matching the criteria:",
									msg);
				}
			});
		} else {
			//			url = bpi_com_obj.web_mssql_api_url+"GetCAPUserForBilltoShiptoSearch";
			url = "http://localhost:8080/OrderCapturePortal/REST/WebService/GetCAPUserForBilltoShiptoSearch";
			var type = 'B';
			if (searchType == 'shipto') {
				type = 'S';
			}
			jQuery.ajax({
				type : "GET",
				url : url,
				dataType : "json",
				data : {
					searchType : type,
					searchString : searchKey
				},
				success : function(data1) {
					console.log("User records received on search:", data1);
					BpiccAdmin.updateUsersInView(data1);
				},
				error : function(msg) {
					console
							.log("No User available matching the criteria:",
									msg);
				}
			});
		}

	},

	updateUsersInView : function(data) {
		var status = data.status;
		if (status == 0) {
			var userSelected = data.object;
			if (userSelected != null && userSelected != undefined
					&& userSelected.length > 0) {
				console.log("Search user records:", userSelected);
				html = "";
				$("#user_list_tbl tbody tr").remove();
				for ( var j in userSelected) {
					var id = userSelected[j].id;
					var email = userSelected[j].email;
					var password = userSelected[j].password;
					var firstName = userSelected[j].firstName;
					var lastName = userSelected[j].lastname;
					var status = userSelected[j].activeStatus;
					var isCustomer = userSelected[j].iscustomer;

					console.log("Adding User row for:", email);
					// Add Rows
					html += "<tr id=" + id + ">"
					html += '<td><a href="#" onclick="BpiccAdmin.loadEditUser(\''
							+ id + '\');">' + email + ' </td>';
					html += '<td>' + firstName + '</a></td>';
					html += '<td>' + lastName + '</td>';
					html += '<td><a href="#" onclick="BpiccAdmin.loadEditUser(\''
							+ id
							+ '\');"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span><a></td>';
					html += "</tr>";
					j++;
				}
				$("#user_list_tbl tbody").append(html);
			} else {
				console.log("error:", users);
				// Display error
			}

		} else {
			console.log("No matching records found; Error from backend:",
					data.errorMessage);
			alert("No matching records found");
		}

	},

	loadAddUserPage : function() {
		console.log("loadAddUserPage");
//		var validator = $( "#userdetailsForm" ).validate();
//		validator.destroy();
		$(".loader").show();
		$("label.error").remove();
		billToShipToRowNo = 1;
		BpiccAdmin.clearExistingRows(true);
		BpiccAdmin.loadCAPRoles(true, null);
		$(".addUserBlock").show();
		$(".adminUserDetailBlock").hide();
		$(".editUserBlock").hide();
		$(".loader").hide();
	},

	loadUserListPage : function() {
		console.log("loadUserListPage");
		$(".adminUserDetailBlock").show();
		$(".addUserBlock").hide();
		$(".editUserBlock").hide();
		getCAPUsers();
		$("#search").val('');
		$("#useridRadio").prop("checked", true);
		if( $("#useridRadio").is(':checked') ) {
	      $(".searchBlock #search").attr("placeholder", "Enter User Email OR UserID");
	    }
	},

	// Get Billto info from Oracle web service
	getBillToForEnteredShipTo : function(shipTo, rowNo, isAdd, isEditInitialLoad) {
		console.log(rowNo, " getBillToForEnteredShipTo called for shipTo:", shipTo);
		xml_request_data = '';
		xml_request_data += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
		xml_request_data += '<soap:Header xmlns:ns1="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/">';
		xml_request_data += '<ns1:SOAHeader>';
		xml_request_data += '<ns1:Responsibility>BPI_WEB_SERVICE_USER</ns1:Responsibility>';
		xml_request_data += '<ns1:RespApplication>XXBPI</ns1:RespApplication>';
		xml_request_data += '<ns1:SecurityGroup>STANDARD</ns1:SecurityGroup>';
		xml_request_data += '<ns1:NLSLanguage>AMERICAN</ns1:NLSLanguage>';
		xml_request_data += '<ns1:Org_Id>82</ns1:Org_Id>';
		xml_request_data += ' </ns1:SOAHeader>';
		xml_request_data += '<wsrm:Request xmlns:wsrm="http://www.oasis-open.org/committees/wsrm/schema/1.1/SOAP1.1" xmlns:SOAP="http://schemas/xmlsoap.org/soap/envelope/" SOAP:mustUnderstand="1"><wsrm:MessageId groupId="20170321-224426-176.1@uswodapp013.brakepartsinc.com"/><wsrm:ExpiryTime>2017-03-21T22:44:36</wsrm:ExpiryTime><wsrm:ReplyPattern><wsrm:Value>Poll</wsrm:Value></wsrm:ReplyPattern><wsrm:AckRequested/><wsrm:DuplicateElimination/></wsrm:Request><wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" soap:mustUnderstand="1"><wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:Username>'
				+ bpi_com_obj.api_usr
				+ '</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'
				+ bpi_com_obj.api_pwd
				+ '</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header>';
		xml_request_data += '<soap:Body xmlns:get="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/get_shipto_billto_info/">';
		xml_request_data += ' <get:InputParameters>';
		xml_request_data += '<get:P_SHIP_TO>';

		xml_request_data += shipTo;

		xml_request_data += '</get:P_SHIP_TO>';
		xml_request_data += ' </get:InputParameters>';
		xml_request_data += ' </soap:Body>';
		xml_request_data += '</soap:Envelope>';

		console.log("XML REQUEST:", xml_request_data);

//		var url = bpi_com_obj.web_api_url;
//		var url="http://uswodsvr702v:9080/OracleApiServlet";
//		url = "http://localhost:8080/BPITechnicianPortal/OracleApiServlet";
//		console.log("URL: "+url);
//		jQuery.ajax({
//			type : "POST",
//			url : url,
//			data : "xml_data=" + xml_request_data,
//			dataType : "xml",
//			crossDomain : true,
//			processData : false,
//
//			success : function(data) {
//				console.log("Data received from Oracle api:", data);
//				BpiccAdmin.setBillToAccNoInView(data, rowNo, isAdd, isEditInitialLoad);
//			},
//			error : function(msg) {
//				console.log('Error from Oracle Api:', msg.statusText);
//				alert("Failedss: " + msg.status + ": " + msg.statusText);
//			}
//		});
		
		
	    
	
		var url = bpi_com_obj.web_oracle_api_url + "GetShipToAddress?org_id="
		+ orgID + "&ship_to_location=" + shipTo;
//        console.log("GetShipToAddress url:"+url);
		jQuery.ajax({
			type: "POST",
			url: url,
//			data: 
	    	dataType: "json",
			crossDomain: true,
			processData: false,
			// contentType: "text/xml; charset=\"utf-8\"",
			 
			success: function (data) {
//				 console.log("Result Success:"+JSON.stringify(data));
//				 SelectAccount.ProcessGetMultipleShiptoAddressForShipTo(data);
				 var obj=JSON.parse(data.object);
//				 var billTo=obj.x_bill_to;
	
//					console.log(JSON.stringify(obj));
//					var listObj=obj.x_ship_to_address;
//					for (var i = 0; i < listObj.length; i++) {
//						  var xmlobject = listObj [i];
//						  console.log(xmlobject.BILL_TO);
//						  console.log	("object"+JSON.stringify(xmlobject));
//						  
//					}
//				 var shipToAdressList=obj.x_ship_to_address;
				 if(obj!=null){
					 BpiccAdmin.setBillToAccNoInView(obj, rowNo, isAdd, isEditInitialLoad);
					
				 }else{
					
					 alert('ShipTo address is not found');
				 }
				 
				 
			},
			error: function (msg) {
					 
				alert("Failed: " + msg.status + ": " + msg.statusText);
			}
		});

	},

	setBillToAccNoInView : function(obj, rowNo, isAdd, isEditInitialLoad){
		X_RESPONSE_STATUS = obj.x_response_status;
		if(X_RESPONSE_STATUS == 'S'){

//			console.log("x_response_message"+obj.x_response_message);
			var listObj=obj.x_ship_to_address;
			for (var i = 0; i < listObj.length; i++) {
				  var xmlobject = listObj [i];
//				  console.log(xmlobject.BILL_TO);
//				  console.log	("object"+JSON.stringify(xmlobject));
//				  
			X_BILLTO = xmlobject.BILL_TO;
			ACCT_NUM =  xmlobject.ACCOUNT_NUMBER;
			ACCT_NAME = xmlobject.ACCOUNT_NAME;
			console.log(rowNo, " Response Status:", X_RESPONSE_STATUS, "BillTo:",
					X_BILLTO, "Account No:", ACCT_NUM);
			
			var id = "#billto_add_row" + rowNo;
			if(isAdd == false){
				id = "#billto_edit_row" + rowNo;
				var element = $('ul#shipToRows_Edit li').find(id);
				console.log("Edit Billto Element:", element);
				element.attr('value', X_BILLTO);
			}
			$(id).val(X_BILLTO); 
			console.log("Value set:", $(id).val());
			
			var id1 = "#accountNo_add_row" + rowNo;
			if(isAdd == false){
				id1 = "#accountNo_edit_row" + rowNo;
				var element = $('ul#shipToRows_Edit li').find(id1);
				console.log("Edit AccNo Element:", element);
				element.attr('value', ACCT_NAME);
			}
			$(id1).val(ACCT_NAME);
			console.log(id1, "Value set:", $(id1).val());
			
			var id2 = "#account_add_row" + rowNo;
			if(isAdd == false){
				id2 = "#account_edit_row" + rowNo;
				var element = $('ul#shipToRows_Edit li').find(id2);
				console.log("Edit Account Element:", element);
				element.attr('value', ACCT_NUM);
			}
			$(id2).val(ACCT_NUM);
			console.log(id2, "Value set:", $(id2).val());
			
		} 
			
		}
			else {
			X_RESPONSE_MESSAGE = obj.x_response_message;
			if(isEditInitialLoad == false){
				alert(X_RESPONSE_MESSAGE);
			}
			console.log("Invalid Shipto. Error received from Oracle API:", X_RESPONSE_MESSAGE);
		}
		
	},
	
	loadCAPRoles : function(isAddPage, userRoles) {
		//		var url = bpi_com_obj.web_mssql_api_url+"GetAllCAPRoles";
		var url = "http://localhost:8080/OrderCapturePortal/REST/WebService/GetAllCAPRoles";
		jQuery.ajax({
			type : "GET",
			url : url,
			success : function(data3) {
				console.log("User CAP ROLES received:", data3);
				if (isAddPage) {
					BpiccAdmin.updateRolesInView(data3);
				} else {
					var status = data3.status;
					if (status == 0) {
						roles = data3.object;
						BpiccAdmin.updateRolesInView_Edit(roles, userRoles);
						BpiccAdmin.setUserRolesChecked(userRoles);
					} else {
						console.log("No records found; Error from backend:",
								data.errorMessage);
						alert("Unable to fetch roles");
					}
				}
			},
			error : function(msg) {
				console.log("No CAP ROLES available to display:", msg);
			}
		});

	},

	updateRolesInView : function(data) {
		var status = data.status;
		if (status == 0) {
			roles = data.object;
			if (roles != null && roles != undefined && roles.length > 0) {
				html = "";

				$("#role_list_tbl li").remove();
				for ( var k in roles) {
					var roleid = roles[k].roleID;
					var rolename = roles[k].roleName;
					var roledesc = roles[k].roleDesc;
					var status = roles[k].isActive;

//					console.log("Add User roledesc:", roledesc);

					if(roleid == 2 || roleid == 3 || roleid == 9){
						html += '<li style="display:none"><span><input type="checkbox"   id='
							+ roleid
							+ ' name="checkRoles" value="'
							+ roledesc
							+ '" class="checkRoles"><i class="fa fa-check-circle" aria-hidden="true"></i></span><span class="rolename">'
							+ roledesc + '</span></li>'
					} else if(roleid == 1){
						roledesc = "Place Order";
						html += '<li><span><input type="checkbox"   id='
							+ roleid
							+ ' name="checkRoles" value="'
							+ roledesc
							+ '" class="checkRoles"><i class="fa fa-check-circle" aria-hidden="true"></i></span><span class="rolename">'
							+ roledesc + '</span></li>'
					} else {
						html += '<li><span><input type="checkbox"   id='
							+ roleid
							+ ' name="checkRoles" value="'
							+ roledesc
							+ '" class="checkRoles"><i class="fa fa-check-circle" aria-hidden="true"></i></span><span class="rolename">'
							+ roledesc + '</span></li>'
					}
					k++;
				}
				$("#role_list_tbl").append(html);
				
				$('.checkRoles').on('change',function() {
				    if( $(this).is(':checked') ) {
				        $(this).closest('span').find('.fa-check-circle').addClass('greenIcon');
				        
				    }
					  else
						  {
							  $(this).siblings().removeClass('greenIcon'); 
						  }
				});
			} else {
				console.log("error:", users);
				// Display error
			}
		} else {
			console.log("No records found; Error from backend:",
					data.errorMessage);
			alert("Unable to fetch user roles records");
		}

	},
	
	updateRolesInView_Edit : function(roles, userRoles) {
			if (roles != null && roles != undefined && roles.length > 0) {
				html = "";
				$("#role_list_tbl_edit li").remove();
				for ( var k in roles) {
					var roleid = roles[k].roleID;
					var rolename = roles[k].roleName;
					var roledesc = roles[k].roleDesc;
					var status = roles[k].isActive;

					console.log("Edit User roledesc:", roledesc);
					var isRoleSet = BpiccAdmin.isRoleSetForUser(userRoles, roleid);
					var selectClass = '';
					if(isRoleSet == true){
						console.log("Edit User Role SET for User:", roledesc);
						selectClass = 'greenIcon';
					} 
					
					if(roleid == 2 || roleid == 3 || roleid == 9){
						html += '<li style="display:none"><span><input type="checkbox"   id='
							+ roleid
							+ ' name="checkRoles" value="'
							+ roledesc
							+ '" class="checkRoles"><i class="fa fa-check-circle" aria-hidden="true"></i></span><span class="rolename">'
							+ roledesc + '</span></li>'
					} else if(roleid == 1){
						roledesc = "Place Order";
						html += '<li><span><input type="checkbox"   id='
							+ roleid
							+ ' name="checkRoles" value="'
							+ roledesc
							+ '" class="checkRoles"><i class="fa fa-check-circle ' + selectClass + '" + aria-hidden="true"></i></span><span class="rolename">'
							+ roledesc + '</span></li>'
					} else {
						html += '<li><span><input type="checkbox"   id='
							+ roleid
							+ ' name="checkRoles" value="'
							+ roledesc
							+ '" class="checkRoles"><i class="fa fa-check-circle ' + selectClass + '" + aria-hidden="true"></i></span><span class="rolename">'
							+ roledesc + '</span></li>'
					}
					k++;
				}
				$("#role_list_tbl_edit").append(html);
				
				$('.checkRoles').on('change',function() {
				    if( $(this).is(':checked') ) {
				        $(this).closest('span').find('.fa-check-circle').addClass('greenIcon');
				        
				    }
					  else
						  {
							  $(this).siblings().removeClass('greenIcon'); 
						  }
				});
			} else {
				console.log("error:", users);
				// Display error
			}
	},
	
	setUserRolesChecked : function(userRoles){
		console.log('setUserRolesChecked...', userRoles)
		if (userRoles != null && userRoles != undefined && userRoles.length > 0) {
			for ( var y in userRoles) {
				var rid = userRoles[y].roleID;
				var rdesc = userRoles[y].roleDesc;
				console.log("ID Set for User:", rid);
				var id = "#" + rid;
				var element = $('ul#role_list_tbl_edit li').find(id);
				console.log("Edit ROLE Element:", element);
				element.attr('checked', 'checked');

			}
		}
	},
		
	isRoleSetForUser : function(userRoles, roleid){
		console.log('Checking Role for ', roleid)
			if (userRoles != null && userRoles != undefined && userRoles.length > 0) {
				for ( var k in userRoles) {
					var id = userRoles[k].roleID;
					if(id == roleid){
						console.log("ID Set for User:", roleid);
						return true;
					}
				}
			}
			return false;
		},
		
		clearExistingRows : function(isAdd){
			if(isAdd){
				$(".billtoShipto ul li").remove(); 
				$("#email").val('');
				$("#password").val('');
				$("#fname").val('');
				$("#lname").val('');
				$("#inlineRadio1").prop("checked", true);
				$(".billtoShipto ul").append('<li id="Row1"><div class="row bill"> <div class="col-md-3 ShipTo"><span>Ship To</span><input type="text" class="form-control" id="shipto_add_row' + billToShipToRowNo + '" name="shipto"  onfocusout="shipToFocusLost(\'' + billToShipToRowNo
                        + '\')" ></div><div class="col-md-3 billTo"><span>Bill To</span><input type="text" class="form-control" id="billto_add_row' + billToShipToRowNo + '" name="billto" disabled="disabled"></div><div class="col-md-5 address" style="display: block"><input type="text" id="account_add_row' + billToShipToRowNo + '" style="display:none"><input type="text" class="form-control" id="accountNo_add_row' + billToShipToRowNo + '" disabled="disabled"></div><div class="col-md-1 icons"><i class="fa fa-plus-square"  id="btn1" aria-hidden="true"></i></div></div></li>'); 
			} 
		},
		
		addBillToShipToRows : function(row, islastRow, shipto, billto, accNo){
			billToShipToRowNo_Edit = row;
			if(row == 2){
				console.log('222 Row:');
				if ( $(".col-md-1.icons").is("#btn_row1") ) {
					$( ".fa").removeClass('fa-plus-square').addClass('fa-minus-square');
					$("#btn_row1 #btn1_edit:first-child").attr('id','minus_edit');
				} 
			}
			if(islastRow == true){
				$(".billtoShipto ul").append('<li id="EditRow' + billToShipToRowNo_Edit + '"><div class="row bill"> <div class="col-md-3 ShipTo"><span>Ship To</span><input type="text" class="form-control" id="shipto_edit_row' + billToShipToRowNo_Edit + '" name="shipto"  onfocusout="shipToFocusLost_edit(this)" value="' + shipto + '"></div><div class="col-md-3 billTo"><span>Bill To</span><input type="text" class="form-control" id="billto_edit_row' + billToShipToRowNo_Edit + '" name="billto" disabled="disabled" value="' + billto + '"></div><div class="col-md-5 address" style="display: block"><input type="text" id="account_edit_row' + billToShipToRowNo_Edit + '" style="display:none"><input type="text" class="form-control" id="accountNo_edit_row' + billToShipToRowNo_Edit + '" value="' + accNo + '"></div><div class="col-md-1 icons"><i class="fa fa-plus-square"  id="btn1_edit" aria-hidden="true"></i></div></div>');
			} else {
				$(".billtoShipto ul").append('<li id="EditRow' + billToShipToRowNo_Edit + '"><div class="row bill"> <div class="col-md-3 ShipTo"><span>Ship To</span><input type="text" class="form-control" id="shipto_edit_row' + billToShipToRowNo_Edit + '" name="shipto"  onfocusout="shipToFocusLost_edit(this)" value="' + shipto + '"></div><div class="col-md-3 billTo"><span>Bill To</span><input type="text" class="form-control" id="billto_edit_row' + billToShipToRowNo_Edit + '" name="billto" disabled="disabled" value="' + billto + '"></div><div class="col-md-5 address" style="display: block"><input type="text" id="account_edit_row' + billToShipToRowNo_Edit + '" style="display:none"><input type="text" class="form-control" id="accountNo_edit_row' + billToShipToRowNo_Edit + '" value="' + accNo + '"></div><div class="col-md-1 icons"><i class="fa fa-minus-square"  id="minus_edit" aria-hidden="true"></i></div></div>');
			}
	        
		},
		
		updateBillToShipToInView_Edit : function(customers){
//			BpiccAdmin.clearExistingRows(false);
			$(".billtoShipto ul li").remove();
			if (customers != null && customers != undefined && customers.length > 0) {
				for ( var k in customers) {
					var rowID = Number(k)+1;
					console.log(rowID, " Customer:", customers[k]);
					var shipto = customers[k].shipToSiteID;
					var billto = '';
					var accName = '';
					BpiccAdmin.getBillToForEnteredShipTo(shipto, rowID, false, true);
					if (k > 0) {
						var islastRow = false;
						if(rowID == customers.length){
//							console.log('Yes. Last Row:', rowID);
							islastRow = true;
						}
						BpiccAdmin.addBillToShipToRows(rowID, islastRow, shipto, billto, accName);
					} else {
						$(".billtoShipto ul").append('<li id="EditRow' + billToShipToRowNo_Edit + '"><div class="row bill"> <div class="col-md-3 ShipTo"><span>Ship To</span><input type="text" class="form-control" id="shipto_edit_row' + billToShipToRowNo_Edit + '" name="shipto"  onfocusout="shipToFocusLost_edit(this)" value="' + shipto + '"></div><div class="col-md-3 billTo"><span>Bill To</span><input type="text" class="form-control" id="billto_edit_row' + billToShipToRowNo_Edit + '" name="billto" disabled="disabled" value="' + billto + '"></div><div class="col-md-5 address" style="display: block"><input type="text" id="account_edit_row' + billToShipToRowNo_Edit + '" style="display:none"><input type="text" class="form-control" id="accountNo_edit_row' + billToShipToRowNo_Edit + '" disabled="disabled" value="' + accName + '"></div><div class="col-md-1 icons" id="btn_row1"><i class="fa fa-plus-square"  id="btn1_edit" aria-hidden="true"></i></div></div>');
					} 
//					console.log("shipToSiteID:", shipto);
//					var id = "#shipto_edit_row" + rowID;
//					$(id).val(shipto);
//					var id1 = "#billto_edit_row" + rowID;
//					$(id1).val(billto);
//					var id2 = "#accountNo_edit_row" + rowID;
//					$(id2).val(accNo);
//					BpiccAdmin.getBillToForEnteredShipTo(shipto, rowID, false);
				}
				
			}  else {
				console.log('No Customer Records found, hence default row is added.');
				$(".billtoShipto ul").append('<li id="EditRow' + billToShipToRowNo_Edit + '"><div class="row bill"> <div class="col-md-3 ShipTo"><span>Ship To</span><input type="text" class="form-control" id="shipto_edit_row' + billToShipToRowNo_Edit + '" name="shipto"  onfocusout="shipToFocusLost_edit(this)" </div><div class="col-md-3 billTo"><span>Bill To</span><input type="text" class="form-control" id="billto_edit_row' + billToShipToRowNo_Edit + '" name="billto" disabled="disabled"></div><div class="col-md-5 address" style="display: block"><input type="text" id="account_edit_row' + billToShipToRowNo_Edit + '" style="display:none"><input type="text" class="form-control" id="accountNo_edit_row' + billToShipToRowNo_Edit + '" </div><div class="col-md-1 icons" id="btn_row1"><i class="fa fa-plus-square"  id="btn1_edit" aria-hidden="true"></i></div></div>');
			}
		}
		
		

}
