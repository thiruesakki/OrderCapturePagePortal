$(window).on('load', function() {

	getActiveUsers();
	getPendingUsers();
	GetTipsAndTricks(categoryID);
	GetUnapprovedTipsNTricks(categoryID);
})

function getActiveUsers() {
	$(".loader").show();
	// var url = bpi_com_obj.web_mssql_api_url+"GetAllCAPUsers";
	var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/GETAllTPActiveUsers";
	jQuery.ajax({
		type : "GET",
		url : url,
		success : function(data1) {
			console.log("User records received:", data1);
			setActiveUsersInView(data1);
		},
		error : function(msg) {
			$(".loader").hide();
			console.log("No User available to display:", msg);
		}
	});

}

function setActiveUsersInView(data) {
	var status = data.status;
	if (status == 0) {
		users = data.object;
		if (users != null && users != undefined && users.length > 0) {
			html = "";
			for ( var i in users) {
				var user = users[i];
				var id = user.id;
				var email = user.email;
				var password = user.password;
				var firstName = user.firstName;
				var lastName = user.lastname;
				var status = user.activeStatus;
				var approved = user.approvedStatus;
				var confirmed = user.confirmedStatus;
				var phone1 = user.phone1;
				var phone2 = user.phone2;
				var address = user.address;
				var city = user.city;
				var country = user.country;
				var firstaccess = user.firstaccess;
				var lastaccess = user.lastaccess;
				var lastlogin = user.lastlogin;
				if (lastaccess == undefined || lastaccess == null) {
					lastaccess = '';
				}
				if (confirmed == 1) {
					confirmed = "Yes";
				} else {
					confirmed = "No";
				}
				var name = firstName + " " + lastName;
				var timemodified = user.timemodified;
				var jobtitle = user.jobtitleList;

				var title = '';
				if (jobtitle != null && jobtitle != undefined
						&& jobtitle.length > 0) {

					var job = jobtitle[0];
					title = job.name;

				}

				var organization = user.organizationList;
				var shopname = '';
				if (organization != null && organization != undefined
						&& organization.length > 0) {

					var org = organization[0];
					shopname = org.name;

				}

				html += "<tr id=" + id + ">"
				html += '<td>' + email + ' </td>';
				html += '<td>' + name + '</a></td>';
				html += '<td>' + title + '</td>';
				html += '<td>' + shopname + '</td>';
				html += '<td>' + confirmed + '</td>';
				html += '<td>' + lastaccess + '</td>';
				html += '<td>' + firstaccess + '</td>';
				i++;
			}
			$("#activeusers tbody tr").remove();
			$("#activeusers tbody").append(html);
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

function getPendingUsers() {
	$(".loader").show();
	console.log("User records ");
	// var url = bpi_com_obj.web_mssql_api_url+"GetAllCAPUsers";
	var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/GetUnapprovedTCUsers";
	jQuery.ajax({
		type : "GET",
		url : url,

		success : function(data1) {
			console.log("User records received:", data1);
			setPendingUsersInView(data1);
		},
		error : function(msg) {
			$(".loader").hide();
			console.log("No User available to display:", msg);
		}
	});

}

function setPendingUsersInView(data) {
	var status = data.status;
	if (status == 0) {
		users = data.object;
		console.log("Adding User records:", users);
		if (users != null && users != undefined && users.length > 0) {
			html = "";
			for ( var i in users) {
				var user = users[i];
				var id = user.id;
				var email = user.email;
				var password = user.password;
				var firstName = user.firstName;
				var lastName = user.lastname;
				var status = user.activeStatus;
				var approved = user.approvedStatus;
				var confirmed = user.confirmedStatus;
				var phone1 = user.phone1;
				var phone2 = user.phone2;
				var address = user.address;
				var city = user.city;
				var country = user.country;
				var firstaccess = user.firstaccess;
				var lastaccess = user.lastaccess;
				var lastlogin = user.lastlogin;
				
				if (lastlogin == undefined || lastlogin == null) {
					lastlogin = '';
				}
				
				var name = firstName + " " + lastName;
				var timemodified = user.timemodified;
				var jobtitle = user.jobtitle;
				
				if (jobtitle == undefined || jobtitle == null) {
					jobtitle = '';
				}
				
				var organization = user.organizationList;
				var shopname = '';
				
				if (organization != null && organization != undefined
						&& organization.length > 0) {
					var org = organization[0];
					shopname = org.name;
				}

				if (status == 1) {
					status = "Active";
				} else {
					status = "Inactive";
				}
				
				// TODO 1. Shop Address to be added in web service  2. Action to be set based on the status  3. Status text to be set based on the combination of the status fields - approved, confirmed, status

				console.log("Add User row:", user);
				// Add Rows
				html += "<tr id=" + id + ">";
				html += '<td>' + email + ' </td>';
				html += '<td>' + name + '</a></td>';
				html += '<td>' + shopname + '</td>';
				html += '<td>' + firstaccess + '</td>';
				html += '<td>' + status + '</td>';

				i++;
				console.log("end of html");
			}
			$("#pendingusers tbody tr").remove();
			$("#pendingusers tbody").append(html);
			console.log("end");
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

function GetUnapprovedTipsNTricks(categoryID) {
	$(".loader").show();
	console.log("User records ");
	// var url = bpi_com_obj.web_mssql_api_url+"GetAllCAPUsers";
	var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/GetUnapprovedTipsNTricks";
	jQuery.ajax({
		type : "GET",
		url : url,
		data : "categoryID=" + categoryID,
		success : function(data1) {
			console.log("GetUnapprovedTipsNTricks :", data1);
			setUnapprovedTipsNTricksInView(data1);
		},
		error : function(msg) {
			$(".loader").hide();
			console.log("GetUnapprovedTipsNTricks  ERROR:", msg);
		}
	});

}
function setUnapprovedTipsNTricksInView(data) {
	var status = data.status;
	if (status == 0) {
		users = data.object;
		console.log("Adding User records:", users);
		if (users != null && users != undefined && users.length > 0) {
			html = "";
			for ( var i in users) {
				var user = users[i];
				var id = user.id;
				var email = user.email;
				var firstName = user.firstname;
				var lastName = user.lastname;
				var status = user.status;
				var approved = user.approvedStatus;
				var submittedOn = user.submittedOn;
				var firstaccess = user.firstaccess;
				var lastaccess = user.lastaccess;
				var lastlogin = user.lastlogin;
				
				if (lastlogin == undefined || lastlogin == null) {
					lastlogin = '';
				}
				
				var name = firstName + " " + lastName;
				var jobtitle = user.jobtitle;
				
				if (jobtitle == undefined || jobtitle == null) {
					jobtitle = '';
				}
				
				var organization = user.organization;
				
				if (organization == undefined || organization == null) {
					organization = '';
				}

				if (status == 0) {
					status = "Approved";
				} else if (status == 1) {
					status = "Not Approved";
				} else {
					status = "Rejected";
				}
				
				// TODO 1. Shop Name to be added in web service 2. Action to be added

				console.log("Add User row:", user);
				// Add Rows
				html += "<tr id=" + id + ">";
				html += '<td>' + email + ' </td>';
				html += '<td>' + name + '</a></td>';
				html += '<td>' + organization + '</td>';
				html += '<td>' + submittedOn + '</td>';
				html += '<td>' + status + '</td>';

				i++;
				console.log("end of html");
			}
			$("#pendingTipsTricks tbody tr").remove();
			$("#pendingTipsTricks tbody").append(html);
			console.log("end");
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
var categoryID = 1;
function GetTipsAndTricks(categoryID) {
	$(".loader").show();
	// var url = bpi_com_obj.web_mssql_api_url+"GetAllCAPUsers";
	var url = "http://localhost:8080/BPITechnicianPortal/REST/WebService/GetTipsAndTricks";
	jQuery.ajax({
		type : "GET",
		url : url,
		data : "categoryID=" + categoryID,
		success : function(data1) {
			console.log("GetTipsAndTricks :", data1);
			setGetTipsAndTricksInView(data1);
		},
		error : function(msg) {
			$(".loader").hide();
			console.log("GetTipsAndTricks  ERROR:", msg);
		}
	});

}

function setGetTipsAndTricksInView(data) {
	var status = data.status;
	if (status == 0) {
		users = data.object;
		console.log("Adding User records:", users);
		if (users != null && users != undefined && users.length > 0) {
			html = "";

			for ( var i in users) {
				var user = users[i];
				var id = user.id;
				var email = user.email;
				var firstName = user.firstname;
				var lastName = user.lastname;
				var status = user.status;
				var submittedOn = user.submittedOn;
				var updatedOn = user.updatedOn;
				var name = firstName + " " + lastName;

				if (updatedOn == undefined || updatedOn == null) {
					updatedOn = '';
				}

				if (status == 1) {
					status = "Active";
				} else {
					status = "Inactive";
				}

				console.log("Add User row:", user);
				// Add Rows
				html += "<tr id=" + id + ">";
				html += '<td>' + email + ' </td>';
				html += '<td>' + name + '</a></td>';
				html += '<td>' + submittedOn + '</td>';
				html += '<td>' + updatedOn + '</td>';

				i++;

				console.log("end of html");
			}
			$("#allIdeas tbody tr").remove();
			$("#allIdeas tbody").append(html);
			console.log("end");
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

$("#btnActive").click(function() {
	getActiveUsers();
	$("#firstDashboardActiveUsers").show();
	$("#firstDashboardPendingUsers").hide();
});

$("#btnPending").click(function() {
	getPendingUsers();
	$("#firstDashboardPendingUsers").show();
	$("#firstDashboardActiveUsers").hide();
});

$("#btnAllIdeas").click(function() {
	// getPendingUsers();
	$("#thirdDashboardIdea").show();
	$("#thirdDashboardPendingUsers").hide();
	$("#newSubmissionsTab").hide();
});

$("#btnTATPending").click(function() {
	// getPendingUsers();
	$("#thirdDashboardPendingUsers").show();
	$("#thirdDashboardIdea").hide();
	$("#newSubmissionsTab").hide();
});

$("#btnNewSubmissions").click(function() {
	// getPendingUsers();
	$("#newSubmissionsTab").show();
	$("#thirdDashboardIdea").hide();
	$("#thirdDashboardPendingUsers").hide();
});
