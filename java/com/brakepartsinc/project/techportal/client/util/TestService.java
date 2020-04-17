package com.brakepartsinc.project.techportal.client.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.codec.binary.Base64;

import com.brakepartsinc.project.techportal.dao.ConnectionManager;
import com.brakepartsinc.project.techportal.dao.OracleConnectionManager;
import com.brakepartsinc.project.techportal.dto.CAPAddEditUserObject;
import com.brakepartsinc.project.techportal.dto.ChevyTruckPromoDetailsObject;
import com.brakepartsinc.project.techportal.dto.CustomerObject;
import com.brakepartsinc.project.techportal.dto.DashboardObject;
import com.brakepartsinc.project.techportal.dto.PRIPromoDetailsObject;
import com.brakepartsinc.project.techportal.dto.PromoBusinessDetailsObject;
import com.brakepartsinc.project.techportal.dto.RoleObject;
import com.brakepartsinc.project.techportal.dto.TCUserProfileObject;
import com.brakepartsinc.project.techportal.login.LoginResult;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;

public class TestService {

	public static int testVerifyLoginService(String userid, String password) {
		int loginStatus=0;
		String url = TPConstants.LOGIN_VERIFICATION_SERVICE;
		String authString = userid + ":" + password;
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
				// String obj = json.get("object").getAsString();
				// JsonObject userObj = (JsonObject) parser.parse(obj);
				loginStatus=1;
				System.out.println("Valid Username and Password:"+1);
			} else if (status == LoginResult.STATUS_INVALID_USERNAME) {
				System.out.println("Invalid Username");
			} else if (status == LoginResult.STATUS_INVALID_PASSWORD) {
				System.out.println("Invalid Password");
			} else if (status == LoginResult.STATUS_USER_INACTIVE) {
				System.out.println("Inactive User");
			} else {
				String errorMessage = json.get("errorMessage").getAsString();
				System.out.println("ErrorMessage:" + errorMessage);
			}
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

		// System.out.println("Final Result:" + result.toString());
		return loginStatus;
	}

	public static void testJobService() {

		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.GET_JOBTITLE_SERVICE);
		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	} 
	
	public static void testVerifyOrganizationService() {
		String orgName = "ennvee solution pvt ltd";
		 
		 
		String authStringEnc = new Base64().encodeAsString(orgName
				.getBytes());
		System.out.println("testVerifyOrganizationService:  " + authStringEnc);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.VERIFY_ORGANIZATION_SERVICE);
		ClientResponse response = resource.accept("application/json")
				.header("Authorization", "Basic " + authStringEnc)
				.post(ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	}
	
	

	public static void testOrganizationService() {

		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.GET_ORGANIZATION_SERVICE);
		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	}

	public static void testCreateUser() {

		String email = "user.test@ennvee.net";
		String password = "test"; 
		String firstname="Testing"  ;
		String firstname_encode = "";
		try {
			 firstname_encode = URLEncoder.encode(firstname ,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.out.println("firstname not assigned"); 
		} 
		 
		String lastname="User";
		String  lastname_encode ="";
		
		try {
			lastname_encode = URLEncoder.encode(lastname ,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.out.println("lastname is not assinged");;
		}
		
		String interestincommunication = "0";

		String referredby = "";
		String referredby_encode = "";
		
		try {
			referredby_encode = URLEncoder.encode(referredby, "UTF-8");
		} catch (UnsupportedEncodingException e) { 
			System.out.println("referredby is not assinged");;
		}
		
		String iscustomer = "0";
		String uuid = "UU1234";
		String jobtitles = "1:2";
		String organisations = "22:32";
		  
		String setUsetDetailUrl = TPConstants.CREATE_USER_SERVICE + "?email="
				+ email + "&password=" + password + "&firstname=" + firstname_encode
				+ "&lastname=" + lastname_encode + "&interestincommunication="
				+ interestincommunication + "&referredby=" + referredby_encode
				+ "&iscustomer=" + iscustomer + "&uuid=" + uuid + "&jobtitles="
				+ jobtitles + "&organisations=" + organisations;

		Client restClient1 = Client.create();
		com.sun.jersey.api.client.WebResource resource1 = restClient1
				.resource(setUsetDetailUrl);

		// System.out.println("User testData:  " + userDetailString);
		ClientResponse response = resource1.type("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response testCreateUser .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error codetestCreateUser : "
					+ response.getStatus());
		}
	}

	public static void testCreateOrg() {
		String organizationname = "ENNVEE Solutions US";
		String organizationname_encode = "";
		try {
			organizationname_encode = URLEncoder.encode(organizationname,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.err.println("Error while encoding.");
		}
		
		String phone1 = "+91 080 41116219";
		String phone1_encode="";
		try {
			phone1_encode = URLEncoder.encode(phone1 ,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.err.println("Error while encoding.");
		}
		
		String phone2 = "+91 098844 54321";
		String phone2_encode="";
		try {
			phone2_encode = URLEncoder.encode( phone2,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.err.println("Error while encoding.");
		}
		
		String address = "53 Chennamma Kalyana Manatapa Rd., R M V 2nd Stage";
		String address_encode="";
		try {
			address_encode = URLEncoder.encode(address ,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.err.println("Error while encoding.");
		}
		
		String city= "Bangalore";
		String city_encode="";
		try {
			city_encode = URLEncoder.encode( city,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.err.println("Error while encoding.");
		}
		
		String  state= "Karnataka";
		String state_encode="";
		try {
			state_encode = URLEncoder.encode( state,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.err.println("Error while encoding.");
		}
		
		String country = "India";
		String country_encode="";
		try {
			country_encode = URLEncoder.encode( country,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.err.println("Error while encoding.");
		}
		
		String  zipcode= "560094";
		String zipcode_encode="";
		try {
			zipcode_encode = URLEncoder.encode(zipcode ,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.err.println("Error while encoding.");
		}
		
		String  email= "sales@ennvee.net";
		String  website= "www.ennvee.net";
		
		String url = TPConstants.CREATE_ORGANIZATION_SERVICE
				+ "?organizationname="+ organizationname_encode
				+ "&phone1="+phone1_encode
				+ "&phone2="+phone2_encode
				+ "&address="+address_encode
				+ "&city="+city_encode
				+ "&state="+state_encode
				+ "&country="+country_encode
				+ "&email="+email
				+ "&zipcode="+zipcode_encode
				+ "&website="+ website ;

		Client restClient1 = Client.create();
		com.sun.jersey.api.client.WebResource resource1 = restClient1
				.resource(url);
		ClientResponse response = resource1.type("application/json").post(
				ClientResponse.class);

		System.out.println("create org:  " + url);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response create org .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testVerifyEmailService() {
		String emailID = "test000@ennvee.net";
		String emailTestService = TPConstants.EMAIL_VERIFICATION_SERVICE 
				+ "?email=" + emailID;

		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(emailTestService);

		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);

		System.out.println("testVerifyEmailService:" + emailID);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testEmailVerificationService() {
		String secretKey = "UU4321";
		String emailTestService = TPConstants.Check_Email_Verification_link 
				+ "?secret=" + secretKey;

		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(emailTestService);

		// String emailSecretlSting = "{\"secretkey\":\"1001\"}";
		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class);

		System.out.println("testEmailVerificationService:" + secretKey);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	}

	public static void testResetPswdKeySaveService() {
		String key = "Test0404";
		String userID = "2";
		String url = TPConstants.RESET_PASSWORD_SECRETKEY_SAVE_SERVICE
				+ "?secret=" + key + "&userid=" + userID;
		System.out.println("testResetPswdKeySaveService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	}

	public static void testResetPswdVerificationService() {
		String key = "Test0404";
		String url = TPConstants.RESET_PASSWORD_SECRETKEY_VERIFY_SERVICE
				+ "?secret=" + key;
		System.out.println("testResetPswdVerificationService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testResetPswdUpdateService() {
		String userID = "2";
		String password = "testing";
		String authString = userID + ":" + password;
		String authStringEnc = new Base64().encodeAsString(authString
				.getBytes());
		System.out.println("testResetPswdUpdateService:  " + authStringEnc);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.RESET_PASSWORD_SERVICE);
		ClientResponse response = resource.accept("application/json")
				.header("Authorization", "Basic " + authStringEnc)
				.post(ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	}

	public static void testChangePswdService() {
		String userID = "2";
		String password = "nithya";
		String authString = userID + ":" + password;
		String authStringEnc = new Base64().encodeAsString(authString
				.getBytes());
		System.out.println("testResetPswdUpdateService:  " + authStringEnc);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.CHANGE_PASSWORD_SERVICE);
		ClientResponse response = resource.accept("application/json")
				.header("Authorization", "Basic " + authStringEnc)
				.post(ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	}

	public static void testGetUserProfileService() {
		String userID = "1";
		String url = TPConstants.GET_USER_PROFILE_SERVICE + "?userID=" + userID;
		System.out.println("testGetUserProfileService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}


	public static void testUpdateUserProfileService() { 

		String  userID= "101";
		String  email= "testing@ennvee.net";
		String  password= "test"; 
		 
		String  firstname= "enn vee";
		String firstname_encode="";
		try {
			 firstname_encode = URLEncoder.encode(firstname,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("firstname is not assinged");
		}

		String  lastname= "software solution";
		String lastname_encode = "";
		try {
			 lastname_encode = URLEncoder.encode(lastname,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("lastname is not assinged");
		}

		String  phone1= "9840 654321";
		String phone1_encode="";
		try {
			 phone1_encode = URLEncoder.encode(phone1,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("phone1 is not assinged");
		}

		String phone2= "9840 654321";
		String phone2_encode="";
		try {
			  phone2_encode = URLEncoder.encode(phone2,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("phone2 is not assinged");
		}

		String address= "SRP Tools, Adayar";
		String address_encode="";
		try {
			 address_encode = URLEncoder.encode(address,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("address is not assinged");
		}

		String city= "chennai";
		String city_encode ="";
		try {
			 city_encode = URLEncoder.encode(city,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("city is not assinged");;
		}

		String  state= "Tamilnadu";
		String state_encode ="";
		try {
			 state_encode = URLEncoder.encode(state,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("state is not assinged");
		}

		String country = "in";
		String country_encode = "";
		try {
			 country_encode = URLEncoder.encode(country,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("country is not assinged");
		}

		String nickname= "enn";
		String nickname_encode = "";
		try {
			 nickname_encode = URLEncoder.encode(nickname,"UTF-8");
		} catch (UnsupportedEncodingException e) { 
			System.out.println("nickname is not assinged");
		}

		String  profilepic= "0";
		String  url= "www.picturelink.com";
		String	yearsofexperience 	= "2";
		String	areaofspeciality 	= "3";
		String	interestincommunication = "0";
		String	baysinshop 	= "1";
		String	brakejobsinamonth= "1";
		String	listinfindashop	= "1";
		String	currentlyusingraybestosproducts = "1";
		String	keepshopprivate	= "0";
		String	keepemployeeprivate	= "0"; 
		   
		List jobTtitleList = new ArrayList();
		jobTtitleList.add(3);
		jobTtitleList.add(4);
		jobTtitleList.add(5);
		
		List organizationId = new ArrayList();
		organizationId.add(2);
		organizationId.add(3);
		organizationId.add(4);
		
		System.out.println("testUpdateUserProfileService:  " + userID);
		String authStringEnc = new Base64().encodeAsString(password
				.getBytes());
		
		TCUserProfileObject tpo = new TCUserProfileObject();
		tpo.setId(userID);
		tpo.setEmail(email);
		tpo.setPassword(authStringEnc); // password
		tpo.setPhone1(phone1_encode);
		tpo.setPhone2(phone2_encode);
		tpo.setAddress(address_encode);
		tpo.setCity(city_encode);
		tpo.setState(state_encode);
		tpo.setCountry(country_encode);
		tpo.setNickname(nickname_encode);
		tpo.setPicture(profilepic);
		tpo.setUrl(url);
		tpo.setYears_of_experience(yearsofexperience);
		tpo.setArea_of_speciality(areaofspeciality);
		tpo.setInterest_in_communication(interestincommunication);
		tpo.setBays_in_shop(baysinshop);
		tpo.setBrake_jobs_in_a_month(brakejobsinamonth);
		tpo.setList_in_find_a_shop(listinfindashop);
		tpo.setCurrently_using_raybestos_products(currentlyusingraybestosproducts);
		tpo.setKeepShopPrivate(keepshopprivate);
		tpo.setKeepEmployeePrivate(keepemployeeprivate);
		tpo.setJobTitleID(jobTtitleList);
		tpo.setOrganizationID(organizationId);
		
		Gson gson = new Gson();
		String tpoJson = gson.toJson(tpo); 

		System.out.println("test UserUpdateService:  " + TPConstants.UPDATE_USER_PROFILE_SERVICE);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.UPDATE_USER_PROFILE_SERVICE);

		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class, tpoJson);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	 
	// /////////////////////////// BPI ONLINE CHECK
	// //////////////////////////////////////////

//	public static void testCreateUserRoleService() {
//		String roleName = "admin";
//		String roleDesc = "officeAdmin";
//		int userID = 1; // userid
//
//		System.out.println("testCreateUserRoleService:  " + roleName);
//		String url = TPConstants.CREATE_USER_ROLE_SERVICE + "?userID=" + userID
//				+ "&roleName=" + roleName + "&roleDesc=" + roleDesc;
//
//		System.out.println("test CreateUserRole:  " + url);
//		Client restClient = Client.create();
//		com.sun.jersey.api.client.WebResource resource = restClient
//				.resource(url);
//
//		ClientResponse response = resource.type("application/json").get(
//				ClientResponse.class);
//
//		if (response.getStatus() == 200) {
//			String output = response.getEntity(String.class);
//			System.out
//					.println("Response from Webservice ..CreateUserRole.. \n");
//			System.out.println(output);
//		} else {
//			System.out.println("Failed : HTTP error code : "
//					+ response.getStatus());
//		}
//	}

//	public static void testUpdateUserRoleService() {
//		int userID = 1; // userid
//		String roleName = "admin";
//		String roleDesc = "office Admin";
//		System.out.println("UpdateUserRole:  " + userID);
//		String url = TPConstants.UPDATE_USER_ROLE_SERVICE + "?userID=" + userID
//				+ "&roleName=" + roleName + "&roleDesc=" + roleDesc;
//
//		System.out.println("test UpdateUserRole:  " + url);
//		Client restClient = Client.create();
//		com.sun.jersey.api.client.WebResource resource = restClient
//				.resource(url);
//
//		ClientResponse response = resource.type("application/json").get(
//				ClientResponse.class);
//
//		if (response.getStatus() == 200) {
//			String output = response.getEntity(String.class);
//			System.out
//					.println("Response from Webservice ..UpdateUserRole.. \n");
//			System.out.println(output);
//		} else {
//			System.out.println("Failed : HTTP error code : "
//					+ response.getStatus());
//		}
//	}

	public static void testGetRoleDetailsService() {
		String roleID = "1";
		String url = TPConstants.GET_ROLE_DETAIL_SERVICE + "?roleID=" + roleID;
		System.out.println("testGetRoleDetailsService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testGetUserRolenCustomerDetailsService() {
		String userID = "75";
		String url = TPConstants.GET_USERROLE_CUSTOMER_DETAIL_SERVICE
				+ "?userID=" + userID;
		System.out.println("testGetUserRolenCustomerDetailsService:  " + url);
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
				JsonObject obj = json.get("object").getAsJsonObject();
				JsonArray roles = obj.get("roles").getAsJsonArray();
				List<String> roleNames = new ArrayList<String>();
				for (int i = 0; i < roles.size(); i++) {
					JsonObject object = roles.get(i).getAsJsonObject();
					String name = object.get("roleName").getAsString();
					roleNames.add(name);
					System.out.println("Name:" + name);

				}
				System.out.println("*** Roles:" + roles);
				// String customer = obj.get("customer").getAsString();
				// System.out.println("*** Customer:" + customer);
				// JsonObject customerObj = (JsonObject) parser.parse(customer);
				// String accountNo =
				// customerObj.get("accountNo").getAsString();
				// System.out.println("*** Customer Acc No:" + accountNo);
				JsonArray customerArray = obj.get("customer").getAsJsonArray();
				List<String> customerList = new ArrayList<String>();
				for (int j = 0; j < customerArray.size(); j++) {
					JsonObject customer = customerArray.get(j)
							.getAsJsonObject();
					String billToSiteID = customer.get("billToSiteID")
							.getAsString();
					customerList.add(billToSiteID);
					System.out.println("billToSiteID:" + billToSiteID);
				}
			}
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testCountriesService() {
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.GET_STATE_COUNTRY_LIST_SERVICE);
		System.out.println("Webservice URL:["
				+ TPConstants.GET_STATE_COUNTRY_LIST_SERVICE + "]");
		ClientResponse response = resource.accept("application/json").get(
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
				JsonArray obj = json.get("object").getAsJsonArray();
				// JsonArray roles = obj.get("roles").getAsJsonArray();
				List<String> countries = new ArrayList<String>();
				for (int i = 0; i < obj.size(); i++) {
					JsonObject object = obj.get(i).getAsJsonObject();
					String name = object.get("name").getAsString();
					countries.add(name);
					System.out.println("Name:" + name);
				}
				System.out.println("*** countries:" + countries);
			}
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	}

	public static void testShippingMethodTypesService() {
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.GET_SHIPPING_METHOD_TYPES_SERVICE);
		ClientResponse response = resource.accept("application/json").get(
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
				JsonArray obj = json.get("object").getAsJsonArray();
				List<String> methods = new ArrayList<String>();
				for (int i = 0; i < obj.size(); i++) {
					JsonObject object = obj.get(i).getAsJsonObject();
					String description = object.get("description")
							.getAsString();
					methods.add(description);
					System.out.println("Description:" + description);
				}
				System.out.println("*** Shipping Methods:" + methods);
			}
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	}

	public static void testChangePswdWithOldPswdService() {
		String userID = "12";
		String oldpassword = "test1";
		String password = "test123";
		String authString = userID + ":" + oldpassword + ":" + password;

		System.out.println(oldpassword + ":" + password);

		String authStringEnc = new Base64().encodeAsString(authString
				.getBytes());

		System.out.println("testChangeOldPswdService:  " + authStringEnc);

		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.CHANGE_OLD_PASSWORD_SERVICE);
		ClientResponse response = resource.accept("application/json")
				.header("Authorization", "Basic " + authStringEnc)
				.post(ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	}

	public static void testCategoryListService() {
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.GET_CATEGORY_LIST_SERVICE);
		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	}

	public static void testUserFavoritesListService() {
		String userID = "2288";
		String categoryID = "2";

		Client restClient = Client.create();

		String url = TPConstants.GET_USER_FAVORITES_LIST_SERVICE + "?userID="
				+ userID + "&categoryID=" + categoryID;

		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testUpdateUserLoginInfoService()
			throws UnsupportedEncodingException {
		String userID = "1";
		String lastIP = "210.18.160.205";

		String url = TPConstants.UPDATE_USER_LOGIN_DETAILS + "?userID="
				+ userID + "&lastIP=" + lastIP;
		System.out.println("test UpdateUserLoginInfoService:  " + url);

		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testUpdateUserLogoutInfoService()
			throws UnsupportedEncodingException {
		String userID = "1";

		String url = TPConstants.UPDATE_USER_LOGOUT_DETAILS + "?userID="
				+ userID;
		System.out.println("test UpdateUserLogoutInfoService:  " + url);

		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testSetUserApprovalService()
			throws UnsupportedEncodingException {
		String userID = "3";
		String url = TPConstants.SET_USER_APPROVAL_DETAILS + "?userID="
				+ userID;

		System.out.println("test testSetUserApprovalService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out
					.println("Failed : testSetUserApprovalService HTTP error code : "
							+ response.getStatus());
		}
	}

	public static void testSetOrganizationApprovalService()
			throws UnsupportedEncodingException {
		String orgID = "28";
		String url = TPConstants.SET_ORGANIZATION_APPROVAL_DETAILS + "?orgID="
				+ orgID;

		System.out.println("test testSetOrganizationApprovalService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testSaveDashboardPreferenceService()
			throws UnsupportedEncodingException {

		/*String userID = "2";
		String categoryID = "1";
		String sortorder = "1";
		String remarks = "";*/
		
		List <DashboardObject> dashboardList = new ArrayList<DashboardObject>();
		
		DashboardObject dashboardObject1 = new DashboardObject();
		dashboardObject1.setUserID("1");
		dashboardObject1.setCategoryID("1");
		dashboardObject1.setSortorder("2");
		dashboardObject1.setRemarks("");
		dashboardList.add(dashboardObject1);
		
		DashboardObject dashboardObject2 = new DashboardObject();
		dashboardObject2.setUserID("1");
		dashboardObject2.setCategoryID("2");
		dashboardObject2.setSortorder("3");
		dashboardObject2.setRemarks("");
		dashboardList.add(dashboardObject2);

		DashboardObject dashboardObject3 = new DashboardObject();
		dashboardObject3.setUserID("1");
		dashboardObject3.setCategoryID("3");
		dashboardObject3.setSortorder("4");
		dashboardObject3.setRemarks("");
		dashboardList.add(dashboardObject3);
		
		
	/*	String url = TPConstants.SET_DASHBOARD_DETAILS + "?userID=" + userID
				+ "&categoryID=" + categoryID + "&sortorder=" + sortorder
				+ "&remarks=" + remarks;*/

	//	System.out.println("test testSaveDashboardPreferenceService:  " + url);
		
		Gson gson = new Gson();
		String dashBoardJson = gson.toJson(dashboardList);
		
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.SET_DASHBOARD_DETAILS);
		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class, dashBoardJson);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testGetDashboardPreferenceService()
			throws UnsupportedEncodingException {
		String userID = "1";
		String url = TPConstants.GET_DASHBOARD_DETAILS + "?userID=" + userID;

		System.out.println("test testGetDashboardDetailsService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testSaveVideoDetailService()
			throws UnsupportedEncodingException {
		String userID = "1";
		String resourceID = "1";
		String percentageviewed = "60";

		String status = "1";
		String remarks = "";

		// String firstname_encode = URLEncoder.encode(firstname,"UTF-8");
		String url = TPConstants.SET_VIDEO_VIEW_DETAILS + "?userID=" + userID
				+ "&resourceID=" + resourceID + "&percentageviewed="
				+ percentageviewed + "&status=" + status + "&remarks="
				+ remarks;

		System.out.println("test testSetVideoViewDetailsService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testGetVideoViewDetailsService()
			throws UnsupportedEncodingException {
		String userID = "1";
		// String firstname_encode = URLEncoder.encode(firstname,"UTF-8");
		String url = TPConstants.GET_VIDEO_VIEW_DETAILS + "?userID=" + userID;
		System.out.println("test testGetVideoViewDetailsService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	 public static void testSaveUserFavoritesService() throws UnsupportedEncodingException {  
	  	String  userID= "2";   
	  	String  categoryID= "7";  
		String  resourceID="1";
		String  rating=null;
		String  status="0";
	  
	  	//String firstname_encode = URLEncoder.encode(firstname,"UTF-8");   
	  		String url = TPConstants.SET_USER_FAVORITES_DETAILS     
	  			+ "?userID=" + userID 
	  			+ "&categoryID=" + categoryID   
	  			+ "&resourceID=" + resourceID   
	  			+ "&rating=" + rating  
	  			+ "&status=" + status ;
	  		
	  		System.out.println("test testUserFavoritesService:  " + url);   
	  		Client restClient = Client.create(); 
	  		com.sun.jersey.api.client.WebResource resource = restClient.resource(url); 
	  		ClientResponse response = resource.type("application/json").post(ClientResponse.class); 
	  		if (response.getStatus() == 200) { 
	  			String output = response.getEntity(String.class);  
	  			System.out.println(output); 
	  		} else { 
	  			System.out.println("Failed : HTTP error code : " + response.getStatus()); 
	  		}  
	 }
	 
	public static void testGetDistributorsService()
			throws UnsupportedEncodingException {

		String url = TPConstants.GET_DISTRIBUTOR_LIST;

		System.out.println("test testGetDistributorsService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static List<RoleObject> testGetAllCAPRolesService()
			throws UnsupportedEncodingException {
		List<RoleObject> rolesList = new ArrayList<RoleObject>();
		String url = TPConstants.GET_CAP_ROLE_LIST;

		System.out.println("testGetAllCAPRolesService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
			JsonParser parser = new JsonParser();
			JsonObject json = (JsonObject) parser.parse(output);
			int status = json.get("status").getAsInt();
			System.out.println("Status:" + status);
			if (status == 0) {
				JsonArray roles = json.get("object").getAsJsonArray();
				for (int i = 0; i < roles.size(); i++) {
					JsonObject object = roles.get(i).getAsJsonObject();
					String roleID = object.get("roleID").getAsString();
					String roleName = object.get("roleName").getAsString();
					String roleDesc = object.get("roleDesc").getAsString();
					String isActive = object.get("isActive").getAsString();
					
					RoleObject roleObject = new RoleObject();
					roleObject.setRoleID(roleID);
					roleObject.setRoleName(roleName);
					roleObject.setRoleDesc(roleDesc);
					roleObject.setIsActive(isActive);
					rolesList.add(roleObject);
					System.out.println("Role:" + roleObject.toString());
				}
				System.out.println("*** Roles Count:" + rolesList.size());
			}
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
		return rolesList;
	}
	
	public static void testGetAllCAPUsersService()
			throws UnsupportedEncodingException {

		String url = TPConstants.GET_CAP_USER_LIST;

		System.out.println("testGetAllCAPUsersService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
			JsonParser parser = new JsonParser();
			JsonObject json = (JsonObject) parser.parse(output);
			int status = json.get("status").getAsInt();
			System.out.println("Status:" + status);
			if (status == 0) {
				JsonArray users = json.get("object").getAsJsonArray();
				List<String> usersList = new ArrayList<String>();
				for (int i = 0; i < users.size(); i++) {
					JsonObject object = users.get(i).getAsJsonObject();
					String email = object.get("email").getAsString();
					System.out.println("EmailID:" + email);
					usersList.add(email);
				}
				System.out.println("*** Users Count:" + usersList.size());
			}
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testAddCAPUser(){
		String email = "testuser@ennvee.com";
		String password = "testing";
		String firstname = "Test";
		String lastname = "User";
		int activeStatus = 1;
		int isCustomer = 1;
		
		List<RoleObject> roles = null;
		try {
			roles = testGetAllCAPRolesService();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
//		roles.add();
//		roles.add();
		
		List<CustomerObject> customerRows = new ArrayList<CustomerObject>(); 
		CustomerObject object = new CustomerObject();
		object.setUserID("149");
		object.setAccountNo("NONE");
		object.setBillToSiteID("1234");
		object.setShipToSiteID("1234");
		object.setStatus("1");
		customerRows.add(object);
		
		CustomerObject object1 = new CustomerObject();
		object1.setUserID("149");
		object1.setAccountNo("NONE");
		object1.setBillToSiteID("6393");
		object1.setShipToSiteID("6393");
		object1.setStatus("1");
		customerRows.add(object1);
		
		CAPAddEditUserObject userObj = new CAPAddEditUserObject();
		userObj.setEmail(email);
		userObj.setFirstName(firstname);
		userObj.setLastname(lastname);
		userObj.setPassword(password);
		userObj.setActiveStatus(activeStatus);
		userObj.setIscustomer(isCustomer);
		userObj.setRoles(roles);
		userObj.setCustomer(customerRows);
		
		Gson gson = new Gson();
		String userJson = gson.toJson(userObj);
		
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.ADD_CAP_USER);
		ClientResponse response = resource.type("application/json").post(ClientResponse.class, userJson);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testEditCAPUser(){
		String email = "testuser@ennvee.com";
		String password = "testing123";
		String firstname = "Test";
		String lastname = "User";
		int activeStatus = 1;
		int isCustomer = 1;
		
		List<RoleObject> roles = null;
		try {
			roles = testGetAllCAPRolesService();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
//		roles.add();
//		roles.add();
		
		List<CustomerObject> customerRows = new ArrayList<CustomerObject>(); 
		CustomerObject object = new CustomerObject();
		object.setUserID("149");
		object.setAccountNo("NONE");
		object.setBillToSiteID("1234");
		object.setShipToSiteID("1234");
		object.setStatus("1");
		customerRows.add(object);
		
		CustomerObject object1 = new CustomerObject();
		object1.setUserID("149");
		object1.setAccountNo("NONE1");
		object1.setBillToSiteID("6393");
		object1.setShipToSiteID("6393");
		object1.setStatus("1");
		customerRows.add(object1);
		
		CAPAddEditUserObject userObj = new CAPAddEditUserObject();
		userObj.setId("149");
		userObj.setEmail(email);
		userObj.setFirstName(firstname);
		userObj.setLastname(lastname);
		userObj.setPassword(password);
		userObj.setActiveStatus(activeStatus);
		userObj.setIscustomer(isCustomer);
		userObj.setRoles(roles);
		userObj.setCustomer(customerRows);
		
		Gson gson = new Gson();
		String userJson = gson.toJson(userObj);
		
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.EDIT_CAP_USER);
		ClientResponse response = resource.type("application/json").post(ClientResponse.class, userJson);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testGetCAPUserForEmailSearchService()
			throws UnsupportedEncodingException {
		String searchString = "bill";

		String url = TPConstants.GET_CAP_USER_EMAIL_SEARCH + "?email=" + searchString;

		System.out.println("testGetCAPUserForEmailSearchService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
			JsonParser parser = new JsonParser();
			JsonObject json = (JsonObject) parser.parse(output);
			int status = json.get("status").getAsInt();
			System.out.println("Status:" + status);
			if (status == 0) {
				JsonArray users = json.get("object").getAsJsonArray();
				List<String> usersList = new ArrayList<String>();
				for (int i = 0; i < users.size(); i++) {
					JsonObject object = users.get(i).getAsJsonObject();
					String email = object.get("email").getAsString();
					System.out.println("EmailID:" + email);
					usersList.add(email);
				}
				System.out.println("*** Users Count:" + usersList.size());
			}
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testGetCAPUserForBilltoShipToSearchService()
			throws UnsupportedEncodingException {
		String searchType = "b";
		String searchString = "5909";

		String url = TPConstants.GET_CAP_USER_BILLTO_SHIPTO_SEARCH + "?searchType=" + searchType + "&searchString=" + searchString;

		System.out.println("testGetCAPUserForBilltoShipToSearchService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
			JsonParser parser = new JsonParser();
			JsonObject json = (JsonObject) parser.parse(output);
			int status = json.get("status").getAsInt();
			System.out.println("Status:" + status);
			if (status == 0) {
				JsonArray users = json.get("object").getAsJsonArray();
				List<String> usersList = new ArrayList<String>();
				for (int i = 0; i < users.size(); i++) {
					JsonObject object = users.get(i).getAsJsonObject();
					String email = object.get("email").getAsString();
					System.out.println("EmailID:" + email);
					usersList.add(email);
				}
				System.out.println("*** Users Count:" + usersList.size());
			}
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	public static void testGetAllJobTitleForSingleUser() {
		String userID = "2";
		Client restClient = Client.create();
		System.out.println("testGetAllJobTitleForSingleUser \n");
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.GET_ALL_JOB_TITLE_FOR_SINGLE_USER+"?userID="+userID);
		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}

	} 
	public static void testGetAllOrganizationForSingleUser() {
		String userID = "1253";
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.GET_ALL_ORGANIZATION_FOR_SINGLE_USER+"?userID="+userID);
		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	} 
	
	public static void testUpdateUserOrganizationMapping() {

		String userID = "165";
		String orgID = "1:2:3";

		String url = TPConstants.UPDATE_BPI_USER_ORG_MAPPING
				+ "?userID=" + userID + "&orgID=" + orgID;

		Client restClient1 = Client.create();
		com.sun.jersey.api.client.WebResource resource1 = restClient1
				.resource(url);

		ClientResponse response = resource1.type("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response testUpdateUser .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error codetestUpdateUser : "
					+ response.getStatus());
		}
	}
	
	public static void testGetUnapprovedTCUsersService()
			throws UnsupportedEncodingException {

		String url = TPConstants.GET_UNAPPROVED_TC_USER_LIST;

		System.out.println("testGetUnapprovedTCUsersService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);
		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
			JsonParser parser = new JsonParser();
			JsonObject json = (JsonObject) parser.parse(output);
			int status = json.get("status").getAsInt();
			System.out.println("Status:" + status);
			if (status == 0) {
				JsonArray users = json.get("object").getAsJsonArray();
				List<String> usersList = new ArrayList<String>();
				for (int i = 0; i < users.size(); i++) {
					JsonObject object = users.get(i).getAsJsonObject();
					String email = object.get("email").getAsString();
					System.out.println("EmailID:" + email);
					usersList.add(email);
				}
				System.out.println("*** Users Count:" + usersList.size());
			}
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testSaveTipsAndTricksService()
			throws UnsupportedEncodingException {

		String userID = "2";
		String categoryID = "1";
		String tipstricks = "Tips & Tricks2";
		String remarks="" ;  
		
		try {
			tipstricks = URLEncoder.encode(tipstricks,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.out.println("tipstricks is not assinged");
		}
		
		String url = TPConstants.SET_TIPS_TRICKS_DETAILS 
				+ "?userID=" + userID
				+ "&categoryID=" + categoryID
				+ "&tipstricks=" + tipstricks				
				+ "&remarks=" + remarks;  
		System.out.println("testSaveTipsAndTricksService:  " + url); 
	  
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class); 
 
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}	 
	}
	
	public static void testGetTipsAndTricksService() {
		String categoryID = "1";
		String url = TPConstants.GET_TIPS_TRICKS_DETAILS + "?categoryID=" + categoryID;
		System.out.println("testGetTipsAndTricksService:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	/*public static void testUpdateTipsAndTricksService() { 
 
		String userID = "3";
		String categoryID = "1";
		String tipstricks = "Tricks1";
		String submittedon ="2017-05-18 07:31:08.573";
		String submittedBy = "88"; 
		String approvedon="2017-05-19 07:31:08.573" ;  
		String approvedby="88" ; 
		String remarks="test" ;  
		
		try {
			submittedon = URLEncoder.encode(submittedon,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("submittedon is not assinged");
		} 
		
		try {
			approvedon = URLEncoder.encode(approvedon,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("approvedon is not assinged");
		} 
		 
		try {
			remarks = URLEncoder.encode(remarks,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("remarks is not assinged");
		}
		
		String url = TPConstants.UPDATE_TIPS_TRICKS_DETAILS 
				+ "?userID=" + userID
				+ "&categoryID=" + categoryID
				+ "&tipstricks=" + tipstricks				
				+ "&submittedon=" + submittedon
				+ "&submittedBy=" + submittedBy
				+ "&approvedon=" + approvedon
				+ "&approvedby=" + approvedby
				+ "&remarks=" + remarks;  
		System.out.println("testUpdateTipsAndTricksService:  " + url); 
	  
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url); 
		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class);
		 
 
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}*/ 

	public static void testGetAllDistributorByCity() {
		String city = "chennai";
		String url = TPConstants.GET_ALL_DISTRIBUTOR_BY_CITY + "?city=" + city;
		System.out.println("testGetAllDistributorByCity:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	
	public static void testGetAllDistributorByZipcode() {
		String zipcode = "600041";
		String url = TPConstants.GET_ALL_DISTRIBUTOR_BY_ZIPCODE + "?zipcode=" + zipcode;
		System.out.println("testGetAllDistributorByZipcode:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testGetDistributor() {
		String id = "1";
		String url = TPConstants.GET_DISTRIBUTOR+ "?id=" + id;
		System.out.println("testGetAllDistributorByZipcode:  " + url);
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.type("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response from Webservice .... \n");
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testUserFavoritesDistributorsService() {
		String userID = "2289";
		String categoryID = "6";

		Client restClient = Client.create();

		String url = TPConstants.GET_FAVORITE_DISTRIBUTORS + "?userID="
				+ userID + "&categoryID=" + categoryID;

		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testgetUnapprovedTipsNTricks() { 
		String categoryID = "1";
		Client restClient = Client.create();
		String url = TPConstants.GET_UNAPPROVED_TIPS_TRICKS  + "?categoryID=" + categoryID ;

		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
			
	public static void testTipsAndTricksApproval() {
		
		String approvedStatus = "4"; // reject is "2"
		String ID = "1";    		
		String userID = "2288";
		String reference = "Node1";
		String remarks = ""; 
		try {
			remarks = URLEncoder.encode(remarks,"UTF-8");
		} catch (UnsupportedEncodingException e) { 
			System.out.println("remarks is not assinged");
		}

		Client restClient = Client.create();

		String url = TPConstants.TIPS_AND_TRICKS_APPROVAL 
				+ "?approvedStatus="+ approvedStatus 
				+ "&ID=" + ID
				+ "&userID=" + userID
				+ "&reference=" + reference
				+ "&remarks=" + remarks 	; 

		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testGETAllTPActiveUsers() { 

		Client restClient = Client.create(); 
		
		String url = TPConstants.GET_ALL_TP_ACTIVE_USERS ; 
		
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testGetUserFavoritesTipsnTricksService() {
		String userID = "2288";
		String categoryID = "1";

		Client restClient = Client.create();

		String url = TPConstants.GET_FAVORITE_TIPS_AND_TRICKS + "?userID="
				+ userID + "&categoryID=" + categoryID;

		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testSaveUserFavoritePlaceService() {
		String userID = "2289";
		String favoriteplace = "Chicago"; 
		String status = "1";

		try {
			favoriteplace = URLEncoder.encode(favoriteplace,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			 
			System.out.println("favoriteplace is not assinged");
		} 
		
		Client restClient = Client.create();

		String url = TPConstants.SET_USER_FAVORITES_PLACE + "?userID="
				+ userID + "&favoriteplace=" + favoriteplace+"&status="+status;

		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}	
	
	public static void testGetUserFavoritePlaceService() {
		String userID = "2289"; 
		
		Client restClient = Client.create();

		String url = TPConstants.GET_USER_FAVORITES_PLACE + "?userID="
				+ userID ;
		System.out.println(url);
		
		com.sun.jersey.api.client.WebResource resource = restClient.resource(url);

		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testSaveRewardProgramService() {
		String programname = "SubmitIdea";
		String programdesc = "Share an Idea submission";
		String createdby = "2";
		try {
			programname = URLEncoder.encode(programname, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.out.println("program name is not assinged");
		}

		try {
			programdesc = URLEncoder.encode(programdesc, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.out.println("program desc is not assinged");
		}
		String url = TPConstants.SET_REWARD_PROGRAMS + "?programname="
				+ programname + "&programdesc=" + programdesc + "&createdby="
				+ createdby;

		Client restClient1 = Client.create();
		com.sun.jersey.api.client.WebResource resource1 = restClient1
				.resource(url);

		ClientResponse response = resource1.type("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response testSaveRewardProgramService .... \n");
			System.out.println(output);
		} else {
			System.out
					.println("Failed : HTTP error testSaveRewardProgramService : "
							+ response.getStatus());
		}
	}

	public static void testGetRewardProgramService() {
		String programid = "";

		Client restClient = Client.create();

		String url = TPConstants.GET_REWARD_PROGRAMS + "?programID="
				+ programid;
		System.out.println(url);

		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out
					.println("Failed : HTTP error code testGetRewardProgramService: "
							+ response.getStatus());
		}
	}

	public static void testSaveRewardEventsService() {
		String programid = "1";
		String eventname = "Submission";
		String eventdesc = "Submitting TipsnTricks";
		String startdate = "2017-06-20 14:42:37.730";
		String enddate = "2027-06-20 14:42:37.730";
		String eventpoints = "100";
		String approvalrequired = "1";
		String createdby = "2";

		try {
			eventname = URLEncoder.encode(eventname, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.out.println("Event name is not assinged");
		}

		try {
			eventdesc = URLEncoder.encode(eventdesc, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.out.println("Event name is not assinged");
		}

		try {
			startdate = URLEncoder.encode(startdate, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.out.println("Event name is not assinged");
		}

		try {
			enddate = URLEncoder.encode(enddate, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.out.println("Event name is not assinged");
		}
		String url = TPConstants.SET_REWARD_EVENTS + "?programID=" + programid
				+ "&eventName=" + eventname + "&eventDesc=" + eventdesc
				+ "&startDate=" + startdate + "&endDate=" + enddate
				+ "&eventPoints=" + eventpoints + "&approvalRequired="
				+ approvalrequired + "&createdBy=" + createdby;

		Client restClient1 = Client.create();
		com.sun.jersey.api.client.WebResource resource1 = restClient1
				.resource(url);

		ClientResponse response = resource1.type("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response testSaveRewardEventsService .... \n");
			System.out.println(output);
		} else {
			System.out
					.println("Failed : HTTP error testSaveRewardEventsService : "
							+ response.getStatus());
		}
	}

	public static void testGetRewardEventsService() {
		String eventid = "-1";

		Client restClient = Client.create();

		String url = TPConstants.GET_REWARD_EVENTS + "?eventid=" + eventid;
		System.out.println(url);

		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testSaveRewardsTransactionService() {
		String userid = "2288";
		String categorycode = "1";
		String categoryname = "Submit TipsnTricks";
		String eventtype = "0";
		String eventpoints = "30";
		String approvalrequired = "1";

		try {
			categoryname = URLEncoder.encode(categoryname, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.out.println("fromdate is not assinged");
		}

		String url = TPConstants.SAVE_REWARD_TRANSACTION + "?categorycode="
				+ categorycode + "&categoryname=" + categoryname + "&userid="
				+ userid + "&eventtype=" + eventtype + "&eventpoints="
				+ eventpoints + "&approvalrequired=" + approvalrequired;

		Client restClient1 = Client.create();
		com.sun.jersey.api.client.WebResource resource1 = restClient1
				.resource(url);

		ClientResponse response = resource1.type("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out
					.println("Response testSaveRewardsTransactionService .... \n");
			System.out.println(output);
		} else {
			System.out
					.println("Failed : HTTP error testSaveRewardsTransactionService : "
							+ response.getStatus());
		}
	}

	public static void testSaveRewardsApprovalService() {
		String transactionID = "1";
		String points = "30";
		String approvedStatus = "1"; // 1 - approved / 2 - rejected
		String userid = "2";

		String url = TPConstants.UPDATE_REWARD_APPROVAL + "?transactionID="
				+ transactionID + "&points=" + points + "&approvedStatus="
				+ approvedStatus + "&userid=" + userid;

		Client restClient1 = Client.create();
		com.sun.jersey.api.client.WebResource resource1 = restClient1
				.resource(url);

		ClientResponse response = resource1.type("application/json").post(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println("Response testSaveRewardProgramService .... \n");
			System.out.println(output);
		} else {
			System.out
					.println("Failed : HTTP error testSaveRewardProgramService : "
							+ response.getStatus());
		}
	}

	public static void testGetRewardsPendingApprovalService() {
		String userid = "-1";

		Client restClient = Client.create();

		String url = TPConstants.GET_PENDING_REWARDS_APPROVAL + "?userid="
				+ userid;
		System.out.println(url);

		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testGetRewardTransactionForPeriodService() {
		String userid = "2288";
		String fromdate = "2017-06-10";
		String todate = "2017-06-30";

		try {
			fromdate = URLEncoder.encode(fromdate, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.out.println("fromdate is not assinged");
		}

		try {
			todate = URLEncoder.encode(todate, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.out.println("todate is not assinged");
		}
		Client restClient = Client.create();

		String url = TPConstants.GET_REWARD_TRANSACTION_FOR_PERIOD + "?userid="
				+ userid + "&fromdate=" + fromdate + "&todate=" + todate;

		System.out.println(url);

		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}

	public static void testGetRewardsSummaryService() {
		String userid = "2288";

		Client restClient = Client.create();

		String url = TPConstants.GET_REWARD_SUMMARY + "?userid=" + userid;

		System.out.println(url);

		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(url);

		ClientResponse response = resource.accept("application/json").get(
				ClientResponse.class);

		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testAddPromoBusinessDetail(){
		String promoID = "RBrake1";
		String promoName = "RBrake1 promotion";
		String firstname = "Test";
		String lastname = "User";
		String email = "testuser@ennvee.com";
		String businessName = "Testing";
		String ownerName = "Tester";
		String address1 = "11 Crown street";
		String address2 = "";
		String city = "Naperville";
		String state = "Illinois";
		String zipCode = "650041";
		String country = "USA";
		String phoneNo = "+81356978212";
		String website = "www.ennvee.com";
		int receiveCommunication = 1;
		String remarks = "";
		
		PromoBusinessDetailsObject businessObj = new PromoBusinessDetailsObject();
		businessObj.setPromoID(promoID);
		businessObj.setPromoName(promoName);
		businessObj.setFirstName(firstname);
		businessObj.setLastname(lastname);
		businessObj.setEmail(email);
		businessObj.setBusinessName(businessName);
		businessObj.setOwnersName(ownerName);
		businessObj.setAddress1(address1);
		businessObj.setAddress2(address2);
		businessObj.setCity(city);
		businessObj.setState(state);
		businessObj.setZipCode(zipCode);
		businessObj.setCountry(country);
		businessObj.setPhoneNo(phoneNo);
		businessObj.setWebsite(website);
		businessObj.setReceiveCommunications(receiveCommunication);
		businessObj.setRemarks(remarks);
		
		Gson gson = new Gson();
		String businessJson = gson.toJson(businessObj);
		
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.ADD_PROMO_BUSINESS_DETAIL);
		ClientResponse response = resource.type("application/json").post(ClientResponse.class, businessJson);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testAddPRIPromoDetail(){
		String promoID = "PRIPromo";
		String promoName = "PRI promotion";
		String fullName = "Testing Add";
		String email = "test@ennvee.com";
		String phoneNo = "(813)123-2121";
		String title = "Distributor";
		int interestedIn = 9;
		int receiveCommunication = 1;
		String remarks = "";
		
		PRIPromoDetailsObject businessObj = new PRIPromoDetailsObject();
		businessObj.setPromoID(promoID);
		businessObj.setPromoName(promoName);
		businessObj.setFullName(fullName);
		businessObj.setEmail(email);
		businessObj.setPhoneNo(phoneNo);
		businessObj.setTitle(title);
		businessObj.setInterestedIn(interestedIn);
		businessObj.setReceiveCommunications(receiveCommunication);
		businessObj.setRemarks(remarks);
		
		Gson gson = new Gson();
		String businessJson = gson.toJson(businessObj);
		
		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.ADD_PRI_PROMO_DETAIL);
		ClientResponse response = resource.type("application/json").post(ClientResponse.class, businessJson);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testChevyTruckpromoDetails() {
		String promoID = "RBrake1";
		String promoName = "RBrake1 promotion";
		String firstname = "Test";
		String lastname = "User";
		String email = "testuser@ennvee.com";
		String businessName = "Testing";
		String ownerName = "Tester";
		String address1 = "11 Crown street";
		String address2 = "";
		String city = "Naperville";
		String state = "Illinois";
		String zipCode = "650041";
		String country = "USA";
		String phoneNo = "+81356978212";
		String website = "www.ennvee.com";
		String homeaddress1 = "11 Crown street";
		String homeaddress2 = "";
		String homecity = "Naperville";
		String homestate = "Illinois";
		String homezipCode = "650041";
		String homecountry = "USA";
		String homephoneNo = "+81356978212";
		int receiveCommunication = 1;
		String remarks = "";
		String jobTitle = "Distributor";
		String points = "5";
		String uniqueCode = "";

		ChevyTruckPromoDetailsObject businessObj = new ChevyTruckPromoDetailsObject();
		businessObj.setPromoID(promoID);
		businessObj.setPromoName(promoName);
		businessObj.setFirstName(firstname);
		businessObj.setLastname(lastname);
		businessObj.setEmail(email);
		businessObj.setBusinessName(businessName);
		businessObj.setOwnersName(ownerName);
		businessObj.setAddress1(address1);
		businessObj.setAddress2(address2);
		businessObj.setCity(city);
		businessObj.setState(state);
		businessObj.setZipCode(zipCode);
		businessObj.setCountry(country);
		businessObj.setPhoneNo(phoneNo);
		businessObj.setWebsite(website);
		businessObj.setHomeAddress1(homeaddress1);
		businessObj.setHomeAddress2(homeaddress2);
		businessObj.setHomeCity(homecity);
		businessObj.setHomeState(homestate);
		businessObj.setHomeZipCode(homezipCode);
		businessObj.setHomeCountry(homecountry);
		businessObj.setHomePhoneNo(homephoneNo);
		businessObj.setReceiveCommunications(receiveCommunication);
		businessObj.setJobTitle(jobTitle);
		businessObj.setRemarks(remarks);
		businessObj.setPoints(points);
		businessObj.setUniqueCode(uniqueCode);

		Gson gson = new Gson();
		String businessJson = gson.toJson(businessObj);

		Client restClient = Client.create();
		com.sun.jersey.api.client.WebResource resource = restClient
				.resource(TPConstants.CHEVY_TRUCK_PROMO_DETAILS);
		ClientResponse response = resource.type("application/json").post(
				ClientResponse.class, businessJson);
		if (response.getStatus() == 200) {
			String output = response.getEntity(String.class);
			System.out.println(output);
		} else {
			System.out.println("Failed : HTTP error code : "
					+ response.getStatus());
		}
	}
	
	public static void testDBConnectivity() {
		OracleConnectionManager cmanager = null;
		Connection connection = null;
		try{
//			Class.forName("oracle.jdbc.driver.OracleDriver");  
//			Connection conn=DriverManager.getConnection(  
//			"jdbc:oracle:thin:@150.136.207.205:1528:ebsdemo2","apps","apps");  
//		  String commandText = "{call invoice_details(?,?,?,?,?,?,?,?,?,?)}";
//			CallableStatement stmt = conn.prepareCall(commandText);
////			PrintWriter out = response.getWriter();  
//			ResultSet rs;
//		  stmt.setObject(1,"151266");
//		  stmt.setObject(2,996);
//		  stmt.registerOutParameter(3, Types.INTEGER);
//		  stmt.registerOutParameter(4, Types.VARCHAR);
//		  stmt.registerOutParameter(5, Types.INTEGER);
//		  stmt.registerOutParameter(6, Types.INTEGER);
//		  stmt.registerOutParameter(7, Types.VARCHAR);
//		  stmt.registerOutParameter(8, Types.VARCHAR);
//		  stmt.registerOutParameter(9, Types.INTEGER);
//		  stmt.registerOutParameter(10, Types.INTEGER);
//		   rs =stmt.executeQuery();  
//		 
//		   System.out.println("<html>"+stmt.getString(4));
			cmanager = new OracleConnectionManager();
			connection = cmanager.GetConnection();
//			DatabaseMetaData dm=(DatabaseMetaData) connection.getMetaData();
//			System.out.println("Driver name: "+ dm.getDriverName());
//			System.out.println("Driver version: "+dm.getDriverVersion());
//			System.out.println("Product name: "+dm.getDatabaseProductName());
//			System.out.println("Product version: "+ dm.getDatabaseProductVersion());
			System.out.println("Database name:"+ connection.getCatalog());
		}catch(Exception e){
		e.printStackTrace();
		}finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
}
	
}
