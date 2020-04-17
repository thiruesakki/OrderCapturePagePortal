package com.brakepartsinc.project.techportal.login;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;

import com.brakepartsinc.project.techportal.client.util.TPConstants;
import com.brakepartsinc.project.techportal.dto.CustomerObject;
import com.brakepartsinc.project.techportal.util.TPServerConstants;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;

public class TPLogin implements LoginHandler {

	public static final String PARAMETER_USER_ID = "mgnlUserId";

	public static final String PARAMETER_PSWD = "mgnlUserPSWD";

	public LoginResult handle(HttpServletRequest request,
			HttpServletResponse response) {
		String userid = request.getParameter(PARAMETER_USER_ID);
		if (userid != null && "".equals(userid) == false) {
			String pswd = request.getParameter(PARAMETER_PSWD);
			if (userid != null && "".equals(userid) == false) {
				LoginResult result = authenticateUser(userid, pswd);
				return result;
			}
			return LoginResult.INVALID_PASSWORD;
		}
		return LoginResult.INVALID_USERNAME;
	}

	private LoginResult authenticateUser(String userid, String password) {
		LoginResult result = null;

		String url = TPConstants.LOGIN_SERVICE;
		String authString = userid;
		System.out.println("before encoding - User:" + authString);
		String authStringEnc = new Base64().encodeAsString(authString
				.getBytes());
		System.out.println("Base64 encoded auth string: " + authStringEnc);

		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.accept("application/json")
				.header("Authorization", "Basic " + authStringEnc)
				.get(ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
			JsonParser parser = new JsonParser();
			JsonObject json = (JsonObject) parser.parse(output);
			int status = json.get("status").getAsInt();
			System.out.println("Status:" + status);
			if (status == LoginResult.STATUS_SUCCEEDED) {
				String obj = json.get("object").getAsString();
				JsonObject userObj = (JsonObject) parser.parse(obj);
				System.out.println("JsonObject:" + userObj);
				result = validatePassword(userObj, password);
			} else if (status == LoginResult.STATUS_INVALID_USERNAME) {
				result = LoginResult.INVALID_USERNAME;
			} else {
				String errorMessage = json.get("errorMessage").getAsString();
				System.out.println("ErrorMessage:" + errorMessage);
				result = new LoginResult(LoginResult.STATUS_SERVER_ERROR);
			}
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
			result = new LoginResult(LoginResult.STATUS_SERVER_ERROR);
		}

		System.out.println("Final Result:" + result.toString());
		return result;
	}

	private LoginResult validateUserStatus(JsonObject userObj) {
		int confirmed = userObj.get("confirmedStatus").getAsInt();
		int approved = userObj.get("approvedStatus").getAsInt();
		int active = userObj.get("activeStatus").getAsInt();
		// System.out.println(confirmed +"  -  "+ approved +"  -  "+ active );
		if (confirmed == 0) {
			return new LoginResult(LoginResult.STATUS_USER_EMAIL_NOTVERIFIED);
		}
		if (approved == 0) {
			return new LoginResult(LoginResult.STATUS_USER_UNAPPROVED);
		}
		if (active == 0) {
			return new LoginResult(LoginResult.STATUS_USER_INACTIVE);
		}

		LoginResult result = new LoginResult(LoginResult.STATUS_SUCCEEDED);
		int firstAccess = userObj.get("isFirstAccess").getAsInt();
		if(firstAccess == 1){
			result.setFirstAccess(true);
		}
		
		int isCustomer = userObj.get("iscustomer").getAsInt();
		if(isCustomer == 1){
			result.setCustomer(true);
			int userID = userObj.get("id").getAsInt();
			getUserRoles(userID, result);
		}
		return result;
	}

	private void getUserRoles(int userID, LoginResult result) {
		String url = TPConstants.GET_USERROLE_CUSTOMER_DETAIL_SERVICE
				+ "?userID=" + userID;
		// System.out.println("getUserRoles:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
			JsonParser parser = new JsonParser();
			JsonObject json = (JsonObject) parser.parse(output);
			int status = json.get("status").getAsInt();
			System.out.println("*** Status:" + status);
			if (status == 0) {
				if (json.get("object") != null
						&& json.get("object").equals("") == false) {
					JsonObject obj = json.get("object").getAsJsonObject();
					if (obj.get("roles") != null
							&& obj.get("roles").equals("") == false) {
						JsonArray roles = obj.get("roles").getAsJsonArray();
						List<String> roleNames = new ArrayList<String>();
						for (int i = 0; i < roles.size(); i++) {
							JsonObject object = roles.get(i).getAsJsonObject();
							String name = object.get("roleName").getAsString();
							roleNames.add(name);
							System.out.println("Name:" + name);
						}
						System.out.println("*** Roles:" + roles);
						result.setRoleNames(roleNames);
					}

//					if (obj.get("customer") != null
//							&& obj.get("customer").equals("") == false) {
//						String customer = obj.get("customer").getAsString();
//						System.out.println("*** Customer:" + customer);
//						CustomerObject object = new CustomerObject();
//						object.setUserID(String.valueOf(userID));
//						JsonObject customerObj = (JsonObject) parser
//								.parse(customer);
//						String accountNo = customerObj.get("accountNo")
//								.getAsString();
//						System.out.println("*** Customer Acc No:" + accountNo);
//						object.setAccountNo(accountNo);
//						String customerID = customerObj.get("customerID")
//								.getAsString();
//						object.setCustomerID(customerID);
//						String billToSiteID = customerObj.get("billToSiteID")
//								.getAsString();
//						object.setBillToSiteID(billToSiteID);
//						String shipToSiteID = customerObj.get("shipToSiteID")
//								.getAsString();
//						object.setShipToSiteID(shipToSiteID);
//						result.setCustomerObject(object);
//
//					}

				}
			}
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	private LoginResult validatePassword(JsonObject userObj, String pswd) {
		String password = userObj.get("password").getAsString();
		String decryptPswd = decodePassword(password);
		if (decryptPswd.equals(pswd)) {
			return validateUserStatus(userObj);
		}
		return new LoginResult(LoginResult.STATUS_INVALID_PASSWORD);
	}

	public String decodePassword(String authString) {

		String decodedAuth = "";

		byte[] bytes = null;
		bytes = new Base64().decode(authString);
		decodedAuth = new String(bytes);
		// System.out.println(decodedAuth +"- Decoding done");
		return decodedAuth;
	}
}
