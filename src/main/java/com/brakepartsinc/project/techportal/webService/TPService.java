package com.brakepartsinc.project.techportal.webService;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.apache.commons.codec.binary.Base64;

import com.brakepartsinc.project.techportal.dao.DataHandler;
import com.brakepartsinc.project.techportal.dto.CAPAddEditUserObject;
import com.brakepartsinc.project.techportal.dto.CAPUserObject;
import com.brakepartsinc.project.techportal.dto.CategoryObject;
import com.brakepartsinc.project.techportal.dto.ChevyTruckPromoDetailsObject;
import com.brakepartsinc.project.techportal.dto.CountryObject;
import com.brakepartsinc.project.techportal.dto.CustomerObject;
import com.brakepartsinc.project.techportal.dto.DashboardObject;
import com.brakepartsinc.project.techportal.dto.DistributorDetailObject;
import com.brakepartsinc.project.techportal.dto.JobTitleObject;
import com.brakepartsinc.project.techportal.dto.OrganizationObject;
import com.brakepartsinc.project.techportal.dto.PRIPromoDetailsObject;
import com.brakepartsinc.project.techportal.dto.PromoBusinessDetailsObject;
import com.brakepartsinc.project.techportal.dto.RegisterOrganizationObject;
import com.brakepartsinc.project.techportal.dto.RegisterUserObject;
import com.brakepartsinc.project.techportal.dto.RewardEventsObject;
import com.brakepartsinc.project.techportal.dto.RewardProgramsObject;
import com.brakepartsinc.project.techportal.dto.RewardSummaryObject;
import com.brakepartsinc.project.techportal.dto.RewardTransactionObject;
import com.brakepartsinc.project.techportal.dto.RoleObject;
import com.brakepartsinc.project.techportal.dto.ShippingMethodObject;
import com.brakepartsinc.project.techportal.dto.SingleUserOrganization;
import com.brakepartsinc.project.techportal.dto.StateObject;
import com.brakepartsinc.project.techportal.dto.TCUserProfileObject;
import com.brakepartsinc.project.techportal.dto.TipsAndTricksObject;
import com.brakepartsinc.project.techportal.dto.UserFavoritePlaceObject;
import com.brakepartsinc.project.techportal.dto.UserFavoritesObject;
import com.brakepartsinc.project.techportal.dto.UserObject;
import com.brakepartsinc.project.techportal.dto.VideoDetailsObject;
import com.brakepartsinc.project.techportal.util.StatusObject;
import com.brakepartsinc.project.techportal.util.TPServerConstants;
import com.brakepartsinc.project.techportal.util.TPUtility;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

@Path("/WebService")
public class TPService {

	@POST
	@Path("/RegisterUser")
	@Produces(MediaType.APPLICATION_JSON)
	public String createUser(
			@QueryParam("email") String email,
			@QueryParam("password") String password,
			@QueryParam("firstname") String firstname,
			@QueryParam("lastname") String lastname,
			@QueryParam("interestincommunication") String interest_in_communication,
			@QueryParam("referredby") String referredby,
			@QueryParam("iscustomer") String isCustomer,
			@QueryParam("uuid") String secretKey,
			@QueryParam("jobtitles") String jobtitles,
			@QueryParam("organisations") String organisations) {
		JsonObject jsonResult = new JsonObject();
		int status = -1;
		String errorMessage = "";
//		int userDetailFlag = -1;

		RegisterUserObject udo = new RegisterUserObject();
//		System.out.println("createUser Service - Data Received from Client:"
//				+ email);

		try {
			udo.setEmail(TPUtility.getValidString(email));
			String validPswd = TPUtility.getValidString(password);
			String encodedPswd = TPUtility.encodePassword(validPswd);
			udo.setPassword(encodedPswd);
			udo.setFirstName(TPUtility.getValidString(firstname));
			udo.setLastname(TPUtility.getValidString(lastname));
			udo.setSecret(TPUtility.getValidString(secretKey));
			udo.setIscustomer(TPUtility.getValidInt(isCustomer));
			udo.setReferedby(TPUtility.getValidString(referredby));
			udo.setOrgid(organisations);
			udo.setJobcategoryid(jobtitles);

			udo.setConfirmed(TPServerConstants.Register_NOT_CONFIRMED);
			udo.setApproved(TPServerConstants.Register_NOT_APPROVED);
			udo.setStatus(TPServerConstants.Register_STATUS_ACTIVE_STRING);
			udo.setRemarks("");
			udo.setMailformat(TPServerConstants.User_MAILFORMAT_TEXT);
			udo.setMaildisplay(TPServerConstants.User_NOT_MAILDISPLAY);
			udo.setHtmleditor(TPServerConstants.User_NOT_HTMLEDITOR);
			udo.setAutosubscribe(TPServerConstants.User_AUTO_NOT_SUBSCRIBE);

		} catch (Exception e) {
			System.out.println("Exception while User data is set in Object: "
					+ e.getMessage());
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", "User Data not inserted:" + e.getMessage());
			jsonResult.addProperty("object", "");
			return jsonResult.toString();
		}

		try {
			DataHandler dataHandler = new DataHandler();
			StatusObject sObject = dataHandler.createUser(udo);

			status = sObject.getStatusCode();
			errorMessage = sObject.getStatusMessage();
//			if (userDetailFlag == 0) {
//				status = 0;
//			} else {
//				status = 1;
//				errorMessage = "User not added in the database";
//			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", "");
			System.out.println("Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", "");
			System.out.println("Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@POST
	@Path("/RegisterOrganization")
	@Produces("application/json")
	public String createOrganization(
			@QueryParam("organizationname") String organizationname,
			@QueryParam("phone1") String phone1,
			@QueryParam("phone2") String phone2,
			@QueryParam("address") String address,
			@QueryParam("city") String city, @QueryParam("state") String state,
			@QueryParam("country") String country,
			@QueryParam("zipcode") String zipcode,
			@QueryParam("email") String email,
			@QueryParam("website") String website) {

		RegisterOrganizationObject rgo = new RegisterOrganizationObject();

		JsonObject jsonResult = new JsonObject();
		int status = -1;
		String errorMessage = "";

		System.out.println("Registeration Data  : " + organizationname);
		rgo.setOrgname(TPUtility.getValidString(organizationname));
		rgo.setPhone1(TPUtility.getValidString(phone1));
		rgo.setPhone2(TPUtility.getValidString(phone2));
		rgo.setEmail(TPUtility.getValidString(email));
		rgo.setWebsite(TPUtility.getValidString(website));
		// rgo.setLang(lang);
		// rgo.setIsdistributor(isdistributor);
		// rgo.setRemarks(remarks);
		rgo.setAddress(TPUtility.getValidString(address));
		rgo.setCity(TPUtility.getValidString(city));
		rgo.setCountry(TPUtility.getValidString(country));
		rgo.setZipcode(TPUtility.getValidString(zipcode));
		rgo.setLatitude("");
		rgo.setLongitude("");
		rgo.setConfirmed(TPServerConstants.Register_NOT_CONFIRMED); 
		rgo.setApproved(TPServerConstants.Register_NOT_APPROVED);
		rgo.setStatus(TPServerConstants.Register_STATUS_ACTIVE_STRING);
		rgo.setRemarks("");
		try {
			DataHandler dataHandler = new DataHandler();
			StatusObject sObject = dataHandler.createOrganization(rgo);

			status = sObject.getStatusCode();
			errorMessage = sObject.getStatusMessage();

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult
					.addProperty("object", "");
			System.out.println("Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", "");
			System.out.println("Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/VerifyEmail")
	@Produces("application/json")
	public String verifyEmail(@QueryParam("email") String email) {
		JsonObject jsonResult = new JsonObject();
		String userJson = null;
		int status = -1;
		String errorMessage = "";
		String userID = null;

		try {
			DataHandler dataHandler = new DataHandler();
			userID = dataHandler.verifyEmail(email);

			if (userID != null && "".equals(userID) == false) {
				status = 0;
				JsonObject value = new JsonObject();
				value.addProperty("userID", userID);
				Gson gson = new Gson();
				userJson = gson.toJson(value);
			} else {
				status = 1;
				errorMessage = "Invalid Email";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", userJson);
			System.out.println("VerifyEmail - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", userJson);
			System.out.println("VerifyEmail - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@GET
	@Path("/VerifyEmailForgot")
	@Produces("application/json")
	public String verifyEmailForgot(@QueryParam("email") String email) {
		JsonObject jsonResult = new JsonObject();
		String userJson = null;
		int status = -1;
		String errorMessage = "";
		String userID = null;

		try {
			
			String domainName = "http://" + "localhost"
					+ ":8080/OrderCapturePortal/ordercapture";
//			String domainName = request.getScheme() + "://" + // "http" + "://
//					request.getServerName() + // "myhost"
//					":" + // ":"
//					request.getServerPort() + request.getContextPath();
			
			DataHandler dataHandler = new DataHandler();
			userID = dataHandler.verifyEmailForgot(email,domainName);

			if (userID != null && "".equals(userID) == false) {
				status = 0;
				JsonObject value = new JsonObject();
				value.addProperty("userID", userID);
				Gson gson = new Gson();
				userJson = gson.toJson(value);
			} else {
				status = 1;
				errorMessage = "Invalid Email";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", userJson);
			System.out.println("VerifyEmail - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", userJson);
			System.out.println("VerifyEmail - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@GET
	@Path("/VerifyUser")
	@Produces("application/json")
	public String verifyUser(
			/* @PathParam("logintxt") String user, */@HeaderParam("Authorization") String authString) {
		System.out.println("Verify user");
		JsonObject jsonResult = new JsonObject();
		String userJson = null;
		int status = -1;
		String errorMessage = "";
		UserObject userObject = null;
		String decryptedUser = isUserAuthenticated(authString);

		try {
			DataHandler dataHandler = new DataHandler();
			userObject = dataHandler.GetUser(decryptedUser);
			// userObject = dataHandler.GetUser_Test(decryptedUser);
			System.out.println("userobj"+userObject);
			if (userObject != null) {
				status = 0;
				Gson gson = new Gson();
				userJson = gson.toJson(userObject);
			} else {
				status = 1;
				errorMessage = "User not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", userJson);
			System.out.println("VerifyUser - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", userJson);
			System.out.println("VerifyUser - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@GET
	@Path("/VerifyLogin")
	@Produces("application/json")
	public String verifyLogin(@HeaderParam("Authorization") String authString) {
		JsonObject jsonResult = new JsonObject();
		String userJson = null;
		int status = -1;
		String errorMessage = "";
		UserObject userObject = null;
		String decryptedUser = isUserAuthenticated(authString);
		String[] values = decryptedUser.split(":");
		System.out.println("values:[" + values[0] + "][" + values[1] + "]");
		String user = values[0];
		String password = values[1];

		try {
			DataHandler dataHandler = new DataHandler();
			userObject = dataHandler.GetUser(user);
//			userObject = dataHandler.GetUser_Test(decryptedUser);
			System.out.println("UserID:"+userObject.getId());

			if (userObject != null) {
				String encryptedPassword = userObject.getPassword();
				String decryptedPassword = TPUtility
						.decodePassword(encryptedPassword);//old source code
//				String decryptedPassword = encryptedPassword;//changed source code
				int active = Integer.parseInt(userObject.getActiveStatus());
				if (decryptedPassword.equals(password)) {
					if (active == TPServerConstants.Register_STATUS_ACTIVE) {
						status = 0;
					} else {
						status = 3;
						errorMessage = "User status is inactive";
					}
				} else {
					status = 2;
					errorMessage = "Invalid Password";
				}
				Gson gson = new Gson();
				userJson = gson.toJson(userObject);
			} else {
				status = 1;
				errorMessage = "User not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", userJson);
			System.out.println("Result to be returned:" + jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
//			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("errorMessage","Invalid Username or Password"); 
			jsonResult.addProperty("object", userJson);
			System.out.println("Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@GET
	@Path("/GetOrganizationList")
	@Produces("application/json")
	// @Produces("text/plain")
	public String getOrganizations() {
		JsonObject jsonResult = new JsonObject();
		JsonArray orgJson = null;
		int status = -1;
		String errorMessage = "";
		List<OrganizationObject> OrganizationObjects = null;

		try {
			DataHandler dataHandler = new DataHandler();
			OrganizationObjects = dataHandler.GetOrganization();
			// OrganizationObjects = dataHandler.getOrganization_Test();

			if (OrganizationObjects != null && OrganizationObjects.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(OrganizationObjects,
						new TypeToken<List<OrganizationObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("GetOrganizationList - Failed to create JSON");
				}
				orgJson = element.getAsJsonArray();
			} else {
				status = 1;
				errorMessage = "Organization not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", orgJson);
			System.out.println("GetOrganizationList - Result to be returned:" + jsonResult);
		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", orgJson);
			System.out.println("GetOrganizationList - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@GET
	@Path("/GetJobTitleList")
	@Produces("application/json")
	// @Produces("text/plain")
	public String getJobtitles() {
		JsonObject jsonResult = new JsonObject();
		JsonArray jobJson = null;
		int status = -1;
		String errorMessage = "";
		List<JobTitleObject> jobTitleObjects = null;

		try {
			DataHandler dataHandler = new DataHandler();
			jobTitleObjects = dataHandler.GetJobTitle();
//			jobTitleObjects = dataHandler.getJobTitle_Test();
			if (jobTitleObjects != null && jobTitleObjects.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(jobTitleObjects,
						new TypeToken<List<JobTitleObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("GetJobTitleList - Failed to create JSON");
				}

				jobJson = element.getAsJsonArray();
				System.out.println("JsonArray:" + jobJson);

			} else {
				status = 1;
				errorMessage = "Job Category not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", jobJson);
			System.out.println("GetJobTitleList - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", jobJson);
			System.out.println("GetJobTitleList - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@POST
	@Path("/CheckEmailVerificationLink")
	// @Consumes(MediaType.APPLICATION_JSON)
	public String checkEmailVerificationLink(
			@QueryParam("secret") String secretKey) {
		JsonObject jsonResult = new JsonObject();
		StatusObject statusObject =new StatusObject(); 

		System.out.println("CheckEmailVerificationLink key from Client:"
				+ secretKey);

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.checkEmailLinkValidity(secretKey); 
			
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", statusObject.getStatusMessage() );
			jsonResult.add("object", null);
			System.out.println("CheckEmailVerificationLink - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out.println("CheckEmailVerificationLink - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@POST
	@Path("/ResetPswdSaveKey")
	@Produces(MediaType.APPLICATION_JSON)
	// @Consumes(MediaType.APPLICATION_JSON)
	public String saveResetPasswordKey(@QueryParam("secret") String secretKey,
			@QueryParam("userid") String userID) {
		JsonObject jsonResult = new JsonObject();
		int status = -1;
		String errorMessage = "";

		System.out.println("saveResetPasswordKey from Client:" + secretKey
				+ "; UserID:" + userID);

		try {
			DataHandler dataHandler = new DataHandler();
			status = dataHandler.saveResetPswdKey(secretKey, userID);
			System.out.println("Status:" + status);

			if (status != 0) {
				errorMessage = "Reset Password Key not saved in the Database";
			}
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", null);
			System.out.println("ResetPswdSaveKey - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out.println("ResetPswdSaveKey - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@POST
	@Path("/VerifyResetPswdLink")
	@Produces(MediaType.APPLICATION_JSON)
	// @Consumes(MediaType.APPLICATION_JSON)
	public String verifyResetPasswordLink(@QueryParam("secret") String secretKey) { 
		 
		JsonObject jsonResult = new JsonObject();  
		StatusObject statusObject = new StatusObject();
		System.out.println("verifyResetPasswordLink from Client:" + secretKey);

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.verifyResetPasswordLink(secretKey);
			//System.out.println("Status:" + status);
  
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", statusObject.getStatusMessage());
			jsonResult.addProperty("userID", statusObject.getUserID());
			jsonResult.add("object", null);
			System.out.println("VerifyResetPswdLink - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("userID", statusObject.getUserID());
			jsonResult.add("object", null);
			System.out.println("VerifyResetPswdLink - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@POST
	@Path("/ResetPassword")
	@Produces("application/json")
	public String resetPassword(@HeaderParam("Authorization") String authString) {
		JsonObject jsonResult = new JsonObject();
		StatusObject statusObject  = new StatusObject();
		 
		String decryptedUser = isUserAuthenticated(authString);
		String[] values = decryptedUser.split(":");
//		System.out.println("values:[" + values[0]+"][" + values[1] +"]");
		String user = values[0];
		//String password = values[1];
		String encryptedPassword = new Base64().encodeAsString(values[1]
				.getBytes());
		System.out.println("UserID:" + user + ";Password:" + encryptedPassword);

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.updatePassword(user, encryptedPassword);

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", statusObject.getStatusMessage());
			jsonResult.add("object", null);
			System.out.println("ResetPassword - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out.println("ResetPassword - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@POST
	@Path("/ChangePassword")
	@Produces("application/json")
	public String changePassword(@HeaderParam("Authorization") String authString) {
		JsonObject jsonResult = new JsonObject();
		int status = -1;
		String errorMessage = "";
		String decryptedUser = isUserAuthenticated(authString);
		String[] values = decryptedUser.split(":");
//		System.out.println("values:[" + values[0]+"][" + values[1] +"]");
		String user = values[0];
//		String password = values[1];
		String encryptedPassword = new Base64().encodeAsString(values[1].getBytes());
//		System.out.println("UserID:" + user + ";Password:" + encryptedPassword);

		try {
			DataHandler dataHandler = new DataHandler();
			status = dataHandler.changePassword(user, encryptedPassword);

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", null);
			System.out.println("ChangePassword - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out.println("ChangePassword - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}
	
	@POST
	@Path("/ChangePasswordWithOld")
	@Produces("application/json")
	public String changeOldPassword(@HeaderParam("Authorization") String authString) {
		
		JsonObject jsonResult = new JsonObject();
		StatusObject statusObject = new StatusObject();
		
		int status = -1;
		String decryptedUser = isUserAuthenticated(authString);
		String[] values = decryptedUser.split(":");
//		System.out.println("values:[" + values[0]+"][" + values[1] +"]");
		String user = values[0];
		String oldEncryptedPassword = new Base64().encodeAsString(values[1]
				.getBytes());
		String encryptedPassword = new Base64().encodeAsString(values[2]
				.getBytes());
		System.out.println("UserID:" + user + ";oldPassword:"
				+ oldEncryptedPassword + ";Password:" + encryptedPassword);

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.checkOldPassword(user,
					oldEncryptedPassword);
			// System.out.println("CheckOldPassword - Status:" +
			// statusObject.toString());
			if (statusObject.getStatusCode() == 0) {
				status = dataHandler.changePassword(user, encryptedPassword);
//				System.out.println("Password Change - Status:" + status);
				if(status != 0){
					statusObject.setStatusCode(status);
					statusObject.setStatusMessage("Password not updated");
				}
			}

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", statusObject.getStatusMessage());
			jsonResult.add("object", null); 

		} catch (Exception e) {
			jsonResult.addProperty("status", 1);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null); 
		}
		System.out.println("Result returned from changeOldPassword(): "
				+ jsonResult.toString());
		return jsonResult.toString();
	}


	private String isUserAuthenticated(String authString) {
		String decodedAuth = "";
		// Header is in the format "Basic 5tyc0uiDat4"
		// We need to extract data before decoding it back to original string
		String[] authParts = authString.split("\\s+");
		String authInfo = authParts[1];
		// Decode the data back to original string
		byte[] bytes = null;
		bytes = new Base64().decode(authInfo);
		decodedAuth = new String(bytes);
		System.out.println(decodedAuth + "- Decoding done");

		return decodedAuth;
	}

	@POST
	@Path("/VerifyOrganization")
	@Produces("application/json")
	// @Produces("text/plain")
	public String verifyOrganization(
			@HeaderParam("Authorization") String orgName) {
		JsonObject jsonResult = new JsonObject();
		String organizationJson = null;
		int status = -1;
		String errorMessage = "";
		OrganizationObject organizationObject = null;
		String decryptedorg = isUserAuthenticated(orgName);
		System.out.println("Organization to check:" + decryptedorg);

		try {
			DataHandler dataHandler = new DataHandler();
			// organizationObject =
			organizationObject = dataHandler
					.checkOrganizationExists(decryptedorg);
			// organizationObject = dataHandler
			// .checkIfOrganizationExists_Test(orgName);
			System.out.println(organizationObject);

			if (organizationObject != null) {
				status = 0;
				Gson gson = new Gson();
				organizationJson = gson.toJson(organizationObject);
			} else {
				status = 1;
				errorMessage = "Organization not found";
			}
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", organizationJson);
		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", organizationJson);
		}
		System.out.println("VerifyOrganization - Result to be returned:" + jsonResult);
		return jsonResult.toString();
	}

	@GET
	@Path("/GetUserProfile")
	@Produces("application/json")
	public String getUserProfile(@QueryParam("userID") String userID) {
		JsonObject jsonResult = new JsonObject();
		String userJson = null;
		int status = -1;
		String errorMessage = "";
		UserObject userObject = null;
		System.out.println("GetUserProfile - Profile is retrieved for UserID:" + userID);

		try {
			DataHandler dataHandler = new DataHandler();
			userObject = dataHandler.GetUserProfile(userID);
			
		//	System.out.println("GetUserProfile 111- return values from bean:"); // + userObject.getFirstName());

			if (userObject != null) {
				status = 0;
				Gson gson = new Gson();
				userJson = gson.toJson(userObject);
			} else {
				status = 1;
				errorMessage = "User not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", userJson);
			System.out.println("GetUserProfile - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", userJson);
			System.out.println("GetUserProfile - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@POST
	@Path("/UpdateUserProfile")
	@Consumes("application/json")
	@Produces("application/json")
	public String UpdateUserProfile(String tpoDetails) {
		JsonObject jsonResult = new JsonObject();
		String userJson = null;
		int status = -1;
		String errorMessage = "";

		Gson gson = new Gson();
		TCUserProfileObject udo = gson.fromJson(tpoDetails,
				TCUserProfileObject.class);
		////URLDecoder.decode(udo.getFirstName(),"UTF-8")
		
		try {
			udo.setFirstName( URLDecoder.decode(udo.getFirstName(),"UTF-8"));
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("setFirstName is not decoded properly" +e1);
		}
		
		try {
			udo.setLastname( URLDecoder.decode(udo.getLastname(),"UTF-8"));
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("setLastname is not decoded properly" +e1);
		}
		
		try {
			udo.setPhone1( URLDecoder.decode(udo.getPhone1(),"UTF-8"));
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("setPhone1 is not decoded properly" +e1);
		}
		
		try {
			udo.setPhone2( URLDecoder.decode(udo.getPhone2(),"UTF-8"));
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("setPhone2 is not decoded properly" +e1);
		}
		
		try {
			udo.setAddress( URLDecoder.decode(udo.getAddress(),"UTF-8"));
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("setAddress is not decoded properly" +e1);
		}	
		
		try {
			udo.setCity( URLDecoder.decode(udo.getCity(),"UTF-8"));
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("setCity is not decoded properly" +e1);
		}			
		
		try {
			udo.setState( URLDecoder.decode(udo.getState(),"UTF-8"));
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("setState is not decoded properly" +e1);
		}	
		
		try {
			udo.setCountry( URLDecoder.decode(udo.getCountry(),"UTF-8"));
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("setCountry is not decoded properly" +e1);
		}			

		try {
			udo.setNickname( URLDecoder.decode(udo.getNickname(),"UTF-8"));
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("setNickname is not decoded properly" +e1);
		}	

		StatusObject statusObject = new StatusObject();
		System.out.println("UpdateUserProfile - Parameter:" + udo.toString());

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.updateUserProfile(udo);

			System.out.println("Status:" + statusObject.getStatusMessage());

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", userJson);
			System.out.println("UpdateUserProfile - Result to be returned:"
					+ jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", userJson);
			System.out
					.println("UpdateUserProfile - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
	}

	/*
	 * @GET
	 * 
	 * @Path("/GetUserRoleDetails")
	 * 
	 * @Produces("application/json") public String
	 * getUserRolenCustomerDetails(@QueryParam("userID") String userID) {
	 * JsonObject jsonResult = new JsonObject(); String json = ""; JsonArray
	 * roleJson = null; String customerJson = ""; JsonObject jObject = new
	 * JsonObject(); int status = -1; String errorMessage = ""; List<RoleObject>
	 * userRoles = null; CustomerObject customerObject = null;
	 * System.out.println("GetUserRoleDetails for userID:" + userID);
	 * 
	 * try { DataHandler dataHandler = new DataHandler(); userRoles =
	 * dataHandler.GetUserRoleDetails(userID); // userRoles =
	 * dataHandler.GetUserRoleDetails_Test(userID);
	 * System.out.println("GetUserRoleDetails - roles:" + userRoles);
	 * 
	 * customerObject = dataHandler.GetCustomerDetails(userID); //
	 * customerObject = dataHandler.GetCustomerDetails_Test(userID);
	 * System.out.println("GetUserRoleDetails - Customer Details:" +
	 * customerObject.toString());
	 * 
	 * Gson gson = new Gson(); if (userRoles != null) { status = 0; JsonElement
	 * element = gson.toJsonTree(userRoles, new TypeToken<List<RoleObject>>() {
	 * }.getType());
	 * 
	 * if (!element.isJsonArray()) {
	 * System.out.println("GetUserRoleDetails - Failed to create JSON"); }
	 * roleJson = element.getAsJsonArray(); jObject.add("roles", roleJson);
	 * if(customerObject != null){ customerJson = gson.toJson(customerObject);
	 * jObject.addProperty("customer", customerJson); } } else { status = 1;
	 * errorMessage = "Role not assigned for user"; }
	 * 
	 * jsonResult.addProperty("status", status);
	 * jsonResult.addProperty("errorMessage", errorMessage);
	 * jsonResult.add("object", jObject);
	 * System.out.println("GetUserRoleDetails - Result to be returned:" +
	 * jsonResult);
	 * 
	 * } catch (Exception e) { status = 100; // errorMessage =
	 * TPServerConstants.SQL_CONNECTION_ERROR; jsonResult.addProperty("status",
	 * status); jsonResult.addProperty("errorMessage", e.getMessage());
	 * jsonResult.addProperty("object", json);
	 * System.out.println("GetUserRoleDetails - ERROR Result to be returned:" +
	 * jsonResult); } return jsonResult.toString(); }
	 */

	@GET
	@Path("/GetUserRoleDetails")
	@Produces("application/json")
	public String getUserRolenCustomerDetails(
			@QueryParam("userID") String userID) {
		System.out.println("UserID service:"+userID);
		JsonObject jsonResult = new JsonObject();
		String json = "";
		JsonArray roleJson = new JsonArray();
		String customerJson = "";
		JsonObject jObject = new JsonObject();
		int status = -1;
		String errorMessage = "";
		List<RoleObject> userRoles = null;
		List<CustomerObject> customerObjectList = null;
		JsonArray customerArray = new JsonArray();
		boolean roleDataAvailable = true;
		boolean customerDataAvailable = true;
//		CustomerObject customerObject = null;
		System.out.println("GetUserRoleDetails Details retrieved for ID:" + userID);

		try {
			DataHandler dataHandler = new DataHandler();
			userRoles = dataHandler.GetUserRoleDetails(userID);
//			userRoles = dataHandler.GetUserRoleDetails_Test(userID);
//			System.out.println("GetUserRoleDetails return value:" + userRoles);
			
//			customerObject = dataHandler.GetCustomerDetails(userID);
//			customerObject = dataHandler.GetCustomerDetails_Test(userID);
			customerObjectList = dataHandler.GetCustomerDetailsList(userID);
//			System.out.println("Customer Details:" + customerObject.toString());

			Gson gson = new Gson();
			if (userRoles.size() > 0) {
				status = 0;
				JsonElement element = gson.toJsonTree(userRoles,
						new TypeToken<List<RoleObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				roleJson = element.getAsJsonArray();
//				if(customerObject != null){
//					customerJson = gson.toJson(customerObject);
//					jObject.addProperty("customer", customerJson);
//				}
			} else {
//				System.out.println("Role not available for user");
				roleDataAvailable = false;
//				status = 1;
//				errorMessage = "Role not assigned for user";
			}
			jObject.add("roles", roleJson);
			if (customerObjectList.size() > 0) {
				status = 0;
				JsonElement element2 = gson.toJsonTree(customerObjectList,
						new TypeToken<List<CustomerObject>>() {
						}.getType());

				if (!element2.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				customerArray = element2.getAsJsonArray();

			} else {
				customerDataAvailable = false;
			}
			jObject.add("customer", customerArray);
			if (roleDataAvailable == false && customerDataAvailable == false) {
				status = 1;
				errorMessage = "Role & Customer information for the user is not available";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", jObject);
			System.out.println("Result to be returned:" + jsonResult);

		} catch (Exception e) {
			status = 100;
			// errorMessage = TPServerConstants.SQL_CONNECTION_ERROR;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", json);
			System.out.println("ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@GET
	@Path("/GetRoleDetails")
	@Produces("application/json")
	public String getRoleDetails(@QueryParam("roleID") String roleID) {
		JsonObject jsonResult = new JsonObject();
		String roleJson = null;
		int status = -1;
		String errorMessage = "";
		RoleObject roleObject = null;
		System.out.println("GetRoleDetails retrieved for ID:" + roleID);

		try {
			DataHandler dataHandler = new DataHandler();
			roleObject = dataHandler.GetRoleDetails(roleID);

			// System.out.println("return values from bean:" +
			// roleObject.getRoleName());

			if (roleObject != null) {
				status = 0;
				Gson gson = new Gson();
				roleJson = gson.toJson(roleObject);
			} else {
				status = 1;
				errorMessage = "Role not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", roleJson);
			System.out.println("GetRoleDetails - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			status = 100;
//			errorMessage = TPServerConstants.SQL_CONNECTION_ERROR;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", roleJson);
			System.out.println("GetRoleDetails - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@GET
	@Path("/GetCountriesStatesList")
	@Produces("application/json")
	public String getCountriesStatesList() {
		JsonObject jsonResult = new JsonObject();
		String json = "";
		JsonArray countriesJson = null;
		int status = -1;
		String errorMessage = "";
		List<CountryObject> countries = null;

		try {
			DataHandler dataHandler = new DataHandler();
			countries = dataHandler.GetCountriesStatesList();
//			countries = dataHandler.GetCountriesStatesList_Test();
//			System.out.println("GetCountriesStatesList return value:" + countries);
			
			Gson gson = new Gson();
			if (countries != null && countries.size() > 0) {
				for (int i = 0; i < countries.size(); i++) {
					CountryObject obj = countries.get(i);
					if (obj != null) {
						String countryID = obj.getId();
						// System.out.println("@@@ Calling states get() for Country:"
						// + obj.getName());
						List<StateObject> states = dataHandler
								.GetStatesList(countryID);
						obj.setStates(states);
					}
					// System.out
					// .println("Final Country Object:" + obj.toString());
				}
				status = 0;
				JsonElement element = gson.toJsonTree(countries,
						new TypeToken<List<CountryObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				countriesJson = element.getAsJsonArray();
			} else {
				status = 1;
				errorMessage = "Country, State List not available";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", countriesJson);
			System.out.println("GetCountriesStatesList - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			status = 100;
//			errorMessage = TPServerConstants.SQL_CONNECTION_ERROR;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", json);
			System.out.println("GetCountriesStatesList - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@GET
	@Path("/GetShippingMethodTypes")
	@Produces("application/json")
	public String getShippingMethodTypes() {
		JsonObject jsonResult = new JsonObject();
		JsonArray shippingMethodsJson = null;
		int status = -1;
		String errorMessage = "";
		List<ShippingMethodObject> shippingMethods = null;

		try {
			DataHandler dataHandler = new DataHandler();
			shippingMethods = dataHandler.GetShippingMethodTypes();
//			shippingMethods = dataHandler.GetShippingMethodTypes_Test();
			
//			System.out.println("ShippingMethodTypes:" + shippingMethods.size());

			if (shippingMethods != null && shippingMethods.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(shippingMethods,
						new TypeToken<List<ShippingMethodObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}

				shippingMethodsJson = element.getAsJsonArray();
//				System.out.println("JsonArray:" + shippingMethodsJson);

			} else {
				status = 1;
				errorMessage = "Shipping Methods Data not found in Database";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", shippingMethodsJson);
			System.out.println("GetShippingMethodTypes - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			status = 100;
//			errorMessage = TPServerConstants.SQL_CONNECTION_ERROR;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", shippingMethodsJson);
			System.out.println("GetShippingMethodTypes - ERROR Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@GET
	@Path("/GetCategoryList")
	@Produces("application/json")
	public String getCategoryList() {
		JsonObject jsonResult = new JsonObject();
		JsonArray jobJson = null;
		int status = -1;
		String errorMessage = "";
		List<CategoryObject> categoryListObject = null;

		try {
			DataHandler dataHandler = new DataHandler();
			categoryListObject = dataHandler.getCategoryList();
			// categoryListObject = dataHandler.getCategoryList_Test();
			if (categoryListObject != null && categoryListObject.size() > 0) {
				status = 0;
				errorMessage = "";
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(categoryListObject,
						new TypeToken<List<CategoryObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out
							.println("getCategoryList(): Failed to create JSON");
				}

				jobJson = element.getAsJsonArray();
				System.out.println("getCategoryList(): JsonArray:" + jobJson);

			} else {
				status = 1;
				errorMessage = "Category not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", jobJson);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e
					+ " in TPService :getCategoryList:" + errorMessage);
			jsonResult.add("object", jobJson);
		}
		System.out.println("Result returned from getCategoryList():"
				+ jsonResult);
		return jsonResult.toString();
	}

	@GET
	@Path("/GetUserFavoritesDetails")
	@Produces("application/json")
	public String getUserFavoritesDetails(@QueryParam("userID") String userID,
			@QueryParam("categoryID") String categoryID) {
		JsonObject jsonResult = new JsonObject();
		JsonArray jobJson = null;
		int status = -1;
		String errorMessage = "";
		List<UserFavoritesObject> userFavoritesListObject = null;

		try {
			DataHandler dataHandler = new DataHandler();
			userFavoritesListObject = dataHandler.getUserFavoritesDetails(
					userID, categoryID);
			// userFavoritesListObject =
			// dataHandler.getUserFavoritesDetails_Test();
			if (userFavoritesListObject != null
					&& userFavoritesListObject.size() > 0) {
				status = 0;
				errorMessage = "";
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(userFavoritesListObject,
						new TypeToken<List<UserFavoritesObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out
							.println(" getUserFavoritesDetails() Failed to create JSON");
				}

				jobJson = element.getAsJsonArray();
				System.out.println("getUserFavoritesDetails() JsonArray:"
						+ jobJson);

			} else {
				status = 1;
				errorMessage = "User Favorites Details not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", jobJson);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e
					+ " in TPService : getUserFavoritesDetails :"
					+ errorMessage);
			jsonResult.add("object", jobJson);
		}
		System.out.println("Result returned from getUserFavoritesDetails():"
				+ jsonResult);
		return jsonResult.toString();
	}

	@POST
	@Path("/UpdateUserLoginDetails")
	@Produces("application/json")
	public String updateUserLoginDetails(@QueryParam("userID") String userID,
			@QueryParam("lastIP") String lastIP) {
		JsonObject jsonResult = new JsonObject();
		StatusObject statusObject = new StatusObject();
		String userJson = null;

		System.out
				.println("updateUserLoginDetails(): @QueryParam for userID is :"
						+ userID);

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.updateUserLoginDetails(userID, lastIP);

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", userJson);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", userJson);
		}
		System.out
				.println("Result returned from TPService :updateUserLoginDetails:"
						+ jsonResult.toString());
		return jsonResult.toString();
	}

	@POST
	@Path("/UpdateUserLogoutDetails")
	@Produces("application/json")
	public String updateUserLogoutDetails(@QueryParam("userID") String userID) {

		StatusObject statusObject = new StatusObject();
		JsonObject jsonResult = new JsonObject();
		String userJson = null;

		System.out.println("updateUserLogoutDetails() @QueryParam for UserID :"
				+ userID);
		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.updateUserLogoutDetails(userID);

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", userJson);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", userJson);
		}
		System.out
				.println("Result returned from TPService :updateUserLogoutDetails:"
						+ jsonResult.toString());
		return jsonResult.toString();
	}

	@GET
	@Path("/GetDashboardPreference")
	@Produces("application/json")
	public String GetDashboardPreference(@QueryParam("userID") String userID) {

		JsonObject jsonResult = new JsonObject();
		JsonArray dashBoardJson = null;
		int status = -1;
		String errorMessage = "";
		List<DashboardObject> dashboardObject = null;

		System.out.println("GetDashboardPreference() @QueryParam for userID:"
				+ userID);

		try {
			DataHandler dataHandler = new DataHandler();
			dashboardObject = dataHandler.GetDashboardPreference(userID);

			if (dashboardObject != null && dashboardObject.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(dashboardObject,
						new TypeToken<List<DashboardObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				dashBoardJson = element.getAsJsonArray();

			} else {
				status = 1;
				errorMessage = "Dashboard Preference not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", dashBoardJson);

		} catch (Exception e) {
			status = 100;
			// errorMessage = TPServerConstants.SQL_CONNECTION_ERROR;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", dashBoardJson);
		}
		System.out.println("ERROR Result to be returned:"
				+ jsonResult.toString());
		return jsonResult.toString();
	}

	@GET
	@Path("/GetVideoDetail")
	@Produces("application/json")
	public String GetVideoDetail(@QueryParam("userID") String userID) {

		JsonObject jsonResult = new JsonObject();
		JsonArray videoJson = null;

		int status = -1;
		String errorMessage = "";
		List<VideoDetailsObject> videoViewObject = null;

		System.out.println("GetVideoDetail @QueryParam for userID:" + userID);

		try {
			DataHandler dataHandler = new DataHandler();
			videoViewObject = dataHandler.GetVideoDetail(userID);

			if (videoViewObject != null && videoViewObject.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(videoViewObject,
						new TypeToken<List<VideoDetailsObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				videoJson = element.getAsJsonArray();

			} else {
				status = 1;
				errorMessage = "Video not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", videoJson);

		} catch (Exception e) {
			status = 100;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", videoJson);
		}
		System.out.println("Result returned from GetVideoDetail():"
				+ jsonResult);
		return jsonResult.toString();
	}

	@POST
	@Path("/SetUserApproval")
	@Produces("application/json")
	public String setUserApproval(@QueryParam("userID") String userID) {

		StatusObject statusObject = new StatusObject();
		JsonObject jsonResult = new JsonObject();
		String userJson = null;

		System.out.println("setUserApproval()  @QueryParam for UserID: "
				+ userID);

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.setUserApproval(userID);

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", userJson);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty(
					"errorMessage", e.getMessage() );
			jsonResult.addProperty("object", userJson);
		}
		System.out.println("Result returned from TPService :setUserApproval :"
				+ jsonResult.toString());
		return jsonResult.toString();
	}

	@POST
	@Path("/SetOrganizationApproval")
	@Produces("application/json")
	public String setOrganizationApproval(@QueryParam("orgID") String orgID) {

		JsonObject jsonResult = new JsonObject();
		StatusObject statusObject = new StatusObject();
		String orgJson = null;

		System.out.println("setOrganizationApproval  @QueryParam for  orgID:"
				+ orgID);

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.setOrganizationApproval(orgID);

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", orgJson);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", orgJson);
		}
		System.out
				.println("Result returned from TPService : setOrganizationApproval :"
						+ jsonResult.toString());
		return jsonResult.toString();
	}

	@POST
	@Path("/SaveDashboardPreference")
	@Produces("application/json")
	/*public String SaveDashboardPreference(@QueryParam("userID") String userID,
			@QueryParam("categoryID") String categoryID,
			@QueryParam("sortorder") String sortorder,
			@QueryParam("remarks") String remarks) {*/
		
		public String SaveDashboardPreference(String strDashBoard){
		
		JsonObject jsonResult = new JsonObject();
		StatusObject statusObject = new StatusObject();
		int status = -1;
		String errorMessage = "";

		System.out.println("SaveDashboardPreference() strDashBoard:"
						+ strDashBoard);
		Gson gson = new Gson();
		TypeToken<List<DashboardObject>> token = new TypeToken<List<DashboardObject>>(){};
		List<DashboardObject> dashList = gson.fromJson(strDashBoard, token.getType());
		 

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.SaveDashboardPreference(dashList);

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", "");

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", "");
		}
		System.out.println("Result from: SaveDashboardPreference :"
				+ jsonResult.toString());
		return jsonResult.toString();
	}

	@POST
	@Path("/SaveVideoDetail")
	@Produces("application/json")
	public String SaveVideoDetail(@QueryParam("userID") String userID,
			@QueryParam("resourceID") String resourceID,
			@QueryParam("percentageviewed") String percentageviewed,
			@QueryParam("status") String status,
			@QueryParam("remarks") String remarks) {

		JsonObject jsonResult = new JsonObject();
		StatusObject statusObject = new StatusObject();
		String videoJson = null;

		System.out.println("SaveVideoDetail @QueryParam for userID:" + userID);

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.SaveVideoDetail(userID, resourceID,
					percentageviewed, status, remarks);

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", videoJson);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", videoJson);
		}
		System.out.println("Result returned from TPService : SaveVideoDetail :"
				+ jsonResult.toString());
		return jsonResult.toString();
	}

	@POST
	@Path("/SaveUserFavorites")
	@Produces("application/json")
	public String SaveUserFavorites(@QueryParam("userID") String userId,
			@QueryParam("categoryID") String categoryid,
			@QueryParam("resourceID") String resourceid,
			@QueryParam("rating") String rating,
			@QueryParam("status") String status) {

		StatusObject statusObject = new StatusObject();
		JsonObject jsonResult = new JsonObject();
		String userJson = null;

		System.out.println("SaveUserFavorites()  @QueryParam for UserID: "
				+ userId);

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.SaveUserFavorites(userId, categoryid,
					resourceid, rating, status);

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", userJson);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", userJson);
		}
		System.out
				.println("Result returned from TPService :SaveUserFavorites :"
						+ jsonResult.toString());
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetDistributors")
	@Produces("application/json")
	public String GetDistributors() {
		JsonObject jsonResult = new JsonObject();
		JsonArray distributorJson = null;
		int status = -1;
		String errorMessage = "";
		List<DistributorDetailObject> distributorList = null;

		try {
			DataHandler dataHandler = new DataHandler();
			distributorList = dataHandler.GetDistributors();

			if (distributorList != null
					&& distributorList.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(distributorList,
						new TypeToken<List<DistributorDetailObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				distributorJson = element.getAsJsonArray();

			} else {
				status = 1;
				errorMessage = "Distributors not available";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", distributorJson);

		} catch (Exception e) {
			status = 1;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", distributorJson);
		}
		System.out.println("Result returned from GetDistributors():"
				+ jsonResult);
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetAllCAPUsers")
	@Produces("application/json")
	public String getAllCAPUsers() {
		JsonObject jsonResult = new JsonObject();
		JsonArray userJson = null;
		int status = -1;
		String errorMessage = "";
		List<CAPUserObject> CAPUsers = null;

		try {
			DataHandler dataHandler = new DataHandler();
			CAPUsers = dataHandler.GetAllCAPUsers();

			if (CAPUsers != null && CAPUsers.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(CAPUsers,
						new TypeToken<List<CAPUserObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				userJson = element.getAsJsonArray();

			} else {
				status = 1;
				errorMessage = "Users not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", userJson);
			System.out.println("Result to be returned:" + jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", userJson);
			System.out.println("Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetAllCAPRoles")
	@Produces("application/json")
	public String getAllCAPRoles() {
		JsonObject jsonResult = new JsonObject();
		JsonArray roleJson = null;
		int status = -1;
		String errorMessage = "";
		List<RoleObject> CAPRoles = null;

		try {
			DataHandler dataHandler = new DataHandler();
			CAPRoles = dataHandler.GetAllCAPRoles();

			if (CAPRoles != null && CAPRoles.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(CAPRoles,
						new TypeToken<List<RoleObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				roleJson = element.getAsJsonArray();

			} else {
				status = 1;
				errorMessage = "Roles not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", roleJson);
			System.out.println("Result to be returned:" + jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", roleJson);
			System.out.println("Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}
	
	@POST
	@Path("/AddCAPUser")
	@Consumes("application/json")
	@Produces("application/json")
	public String addCAPUser(String userDetails) {
		JsonObject jsonResult = new JsonObject();
		StatusObject statusObj = null;
		int status = -1;
		String errorMessage = "";
		
		System.out.println("JSON:" + userDetails);
		Gson gson = new Gson();
		CAPAddEditUserObject userObject = gson.fromJson(userDetails, CAPAddEditUserObject.class); 
		System.out.println("AddUser Service - Parameter:" + userObject.toString());

		try {
			DataHandler dataHandler = new DataHandler();
			statusObj = dataHandler.addCAPUser(userObject);

			jsonResult.addProperty("status", statusObj.getStatusCode());
			jsonResult.addProperty("errorMessage", statusObj.getStatusMessage());
			jsonResult.add("object", null);

		} catch (Exception e) {
			status = 1;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
		}
		System.out.println("Result returned from addUser():"
				+ jsonResult);
		return jsonResult.toString();
	}

	@POST
	@Path("/EditCAPUser")
	@Consumes("application/json")
	@Produces("application/json")
	public String editCAPUser(String userDetails) {
		JsonObject jsonResult = new JsonObject();
		StatusObject statusObj = null;
		int status = -1;
		
		System.out.println("EditUser Service - JSON:" + userDetails);
		Gson gson = new Gson();
		CAPAddEditUserObject userObject = gson.fromJson(userDetails, CAPAddEditUserObject.class); 
		System.out.println("EditUser Service - Parameter:" + userObject.toString());

		try {
			DataHandler dataHandler = new DataHandler();
			statusObj = dataHandler.editCAPUser(userObject);

			jsonResult.addProperty("status", statusObj.getStatusCode());
			jsonResult.addProperty("errorMessage", statusObj.getStatusMessage());
			jsonResult.add("object", null);

		} catch (Exception e) {
			status = 1;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
		}
		System.out.println("Result returned from EditUser():"
				+ jsonResult);
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetCAPUserForEmailSearch")
	@Produces("application/json")
	public String getCAPUserForEmailSearch(@QueryParam("email") String email) {
		JsonObject jsonResult = new JsonObject();
		JsonArray userJson = null;
		int status = -1;
		String errorMessage = "";
		List<CAPUserObject> CAPUsers = null;

		try {
			DataHandler dataHandler = new DataHandler();
			CAPUsers = dataHandler.GetCAPUserForEmailSearch(email);

			if (CAPUsers != null && CAPUsers.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(CAPUsers,
						new TypeToken<List<CAPUserObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				userJson = element.getAsJsonArray();

			} else {
				status = 1;
				errorMessage = "User not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", userJson);
			System.out.println("Result to be returned:" + jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", userJson);
			System.out.println("Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetCAPUserForBilltoShiptoSearch")
	@Produces("application/json")
	public String getCAPUserForBilltoShiptoSearch(@QueryParam("searchType") String searchType, @QueryParam("searchString") String searchString) {
		JsonObject jsonResult = new JsonObject();
		JsonArray userJson = null;
		int status = -1;
		String errorMessage = "";
		List<CAPUserObject> CAPUsers = null;

		try {
			DataHandler dataHandler = new DataHandler();
			CAPUsers = dataHandler.GetCAPUserForBilltoShiptoSearch(searchType, searchString);

			if (CAPUsers != null && CAPUsers.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(CAPUsers,
						new TypeToken<List<CAPUserObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				userJson = element.getAsJsonArray();

			} else {
				status = 1;
				errorMessage = "User not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", userJson);
			System.out.println("Result to be returned:" + jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", userJson);
			System.out.println("Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetAllJobTitleForSingleUser")
	@Produces("application/json")
	// @Produces("text/plain")
	public String getAllJobTitleForSingleUser(
			@QueryParam("userID") String userID) {
		JsonObject jsonResult = new JsonObject();
		JsonArray jobJson = null;
		int status = -1;
		String errorMessage = "";
		List<JobTitleObject> jobTitleObjects = null;

		try {
			DataHandler dataHandler = new DataHandler();
			jobTitleObjects = dataHandler.getAllJobTitleForSingleUser(userID);
			// jobTitleObjects = dataHandler.getAllJobTitleForSingleUser_Test();
			if (jobTitleObjects != null && jobTitleObjects.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(jobTitleObjects,
						new TypeToken<List<JobTitleObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out
							.println("getAllJobTitleForSingleUser - Failed to create JSON");
				}

				jobJson = element.getAsJsonArray();
				System.out.println("JsonArray:" + jobJson);

			} else {
				status = 1;
				errorMessage = "Job Category not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", jobJson);
			System.out
					.println("getAllJobTitleForSingleUser - Result to be returned:"
							+ jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", jobJson);
			System.out
					.println("getAllJobTitleForSingleUser - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
	}

	@GET
	@Path("/GetAllOrganizationForSingleUser")
	@Produces("application/json")
	// @Produces("text/plain")
	public String getAllOrganizationForSingleUser(
			@QueryParam("userID") String userID) {
		JsonObject jsonResult = new JsonObject();
		JsonArray jobJson = null;
		int status = -1;
		String errorMessage = "";
		List<SingleUserOrganization> OrgObjects = null;

		try {
			DataHandler dataHandler = new DataHandler();
			OrgObjects = dataHandler.getAllOrganizationForSingleUser(userID);
			// jobTitleObjects =
			// dataHandler.GetAllOrganizationForSingleUser_Test();
			if (OrgObjects != null && OrgObjects.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(OrgObjects,
						new TypeToken<List<SingleUserOrganization>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out
							.println("GetAllOrganizationForSingleUser - Failed to create JSON");
				}

				jobJson = element.getAsJsonArray();
				System.out.println("JsonArray:" + jobJson);

			} else {
				status = 1;
				errorMessage = "Organization not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", jobJson);
			System.out
					.println("GetAllOrganizationForSingleUser - Result to be returned:"
							+ jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", jobJson);
			System.out
					.println("GetAllOrganizationForSingleUser - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
	}
	
	@POST
	@Path("/UpdateUserOrganizationMapping")
	@Produces(MediaType.APPLICATION_JSON)
	public String updateUserOrganizationMapping(
			@QueryParam("userID") String userID,
			@QueryParam("orgID") String orgID) {
		JsonObject jsonResult = new JsonObject();
		int status = -1;
		String errorMessage = "";

		try {
			DataHandler dataHandler = new DataHandler();
			StatusObject sObject = dataHandler.updateUserOrganizationMapping(
					userID, orgID);

			status = sObject.getStatusCode();
			errorMessage = sObject.getStatusMessage();

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", "");
			System.out.println("Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", "");
			System.out.println("Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetUnapprovedTCUsers")
	@Produces("application/json")
	public String getUnapprovedTCUsers() {
		JsonObject jsonResult = new JsonObject();
		JsonArray userJson = null;
		int status = -1;
		String errorMessage = "";
		List<UserObject> users = null;

		try {
			DataHandler dataHandler = new DataHandler();
			users = dataHandler.getUnapprovedTCUsers();

			if (users != null && users.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(users,
						new TypeToken<List<UserObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				userJson = element.getAsJsonArray();

			} else {
				status = 1;
				errorMessage = "Unapproved users not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", userJson);
			System.out.println("getUnapprovedTCUsers - Result to be returned:" + jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", userJson);
			System.out.println("getUnapprovedTCUsers - Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}
	
	 
	@POST
	@Path("/SaveTipsAndTricks")
	@Consumes("application/json") 
		public String SaveTipsAndTricks(@QueryParam("userID") String userID,
				@QueryParam("categoryID") String categoryID,
				@QueryParam("tipstricks") String tipstricks,			
				@QueryParam("remarks") String remarks ){
		
		System.out.println("SaveTipsAndTricks:  "+ userID);
		JsonObject jsonResult = new JsonObject();
		
		try {
			tipstricks =  URLDecoder.decode(tipstricks,"UTF-8");
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("tipstricks is not decoded properly" +e1);
		} 

		StatusObject statusObject = new StatusObject();
		System.out.println("SaveTipsAndTricks - Parameter:" + tipstricks);
		
		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.SaveTipsAndTricks(userID, categoryID, tipstricks, remarks);

			System.out.println("Status:" + statusObject.getStatusMessage());

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", "");
			System.out.println("SaveTipsAndTricks:"
					+ jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", "");
			System.out
					.println("SaveTipsAndTricks - ERROR:"
							+ jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetTipsAndTricks")
	@Produces("application/json")
	public String GetTipsAndTricks(@QueryParam("categoryID") String categoryID) {
		JsonObject jsonResult = new JsonObject();
		JsonArray tipsJson = null;
		int status = -1;
		String errorMessage = "";
		List<TipsAndTricksObject> tipsList = null;
		
				System.out.println("GetTipsAndTricks - categoryID:" + categoryID); 
		try {
			DataHandler dataHandler = new DataHandler();
			tipsList = dataHandler.GetTipsAndTricks(categoryID);
			
			if (tipsList != null && tipsList.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(tipsList,
						new TypeToken<List<TipsAndTricksObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("GetTipsAndTricks - Failed to create JSON");
				}
				tipsJson = element.getAsJsonArray();
			} else {
				status = 1;
				errorMessage = "GetTipsAndTricks not found";
			} 

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", tipsJson);
			System.out.println("GetTipsAndTricks :" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", tipsJson);
			System.out.println("GetTipsAndTricks  ERROR:" + jsonResult);
		}
		return jsonResult.toString();
	}
	
	@POST
	@Path("/UpdateTipsAndTricks")
	@Consumes("application/json") 
	public String UpdateTipsAndTricks(@QueryParam("userID") String userID,
			@QueryParam("categoryID") String categoryID,
			@QueryParam("tipstricks") String tipstricks,			
			@QueryParam("submittedon") String submittedon,
			@QueryParam("submittedBy") String submittedBy,
			@QueryParam("approvedon") String approvedon,
			@QueryParam("approvedby") String approvedby,
			@QueryParam("remarks") String remarks ) {
		
		System.out.println("UpdateTipsAndTricks:  "+ userID);
		JsonObject jsonResult = new JsonObject(); 
		
		try {
			submittedon =  URLDecoder.decode(submittedon,"UTF-8");
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("submittedon is not decoded properly" +e1);
		}
		
		try {
			approvedon =  URLDecoder.decode(approvedon,"UTF-8");
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("approvedon is not decoded properly" +e1);
		}
		
		try {
			remarks =  URLDecoder.decode(remarks,"UTF-8");
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("remarks is not decoded properly" +e1);
		} 

		StatusObject statusObject = new StatusObject();
		System.out.println("UpdateTipsAndTricks - Parameter:" + remarks);

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.UpdateTipsAndTricks(userID, categoryID,tipstricks, submittedon, submittedBy, approvedon,approvedby,remarks  );

			System.out.println("Status:" + statusObject.getStatusMessage());

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", "");
			System.out.println("UpdateTipsAndTricks - Result to be returned:"
					+ jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", "");
			System.out
					.println("UpdateTipsAndTricks - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetAllDistributorByCity")
	@Produces("application/json")
	public String GetAllDistributorByCity(@QueryParam("city") String city) {
		JsonObject jsonResult = new JsonObject();
		JsonArray distributorJson = null;
		int status = -1;
		String errorMessage = "";
		List<DistributorDetailObject> distributorList = null;

		try {
			DataHandler dataHandler = new DataHandler();
			distributorList = dataHandler.GetAllDistributorByCity(city);

			if (distributorList != null
					&& distributorList.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(distributorList,
						new TypeToken<List<DistributorDetailObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				distributorJson = element.getAsJsonArray();

			} else {
				status = 1;
				errorMessage = "Distributors By City not available";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", distributorJson);

		} catch (Exception e) {
			status = 1;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", distributorJson);
		}
		System.out.println("Result returned from GetAllDistributorByCity():"
				+ jsonResult);
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetAllDistributorByZipcode")
	@Produces("application/json")
	public String GetAllDistributorByZipcode(@QueryParam("zipcode") String zipcode) {
		JsonObject jsonResult = new JsonObject();
		JsonArray distributorJson = null;
		int status = -1;
		String errorMessage = "";
		List<DistributorDetailObject> distributorList = null;

		try {
			DataHandler dataHandler = new DataHandler();
			distributorList = dataHandler.GetAllDistributorByZipcode(zipcode);

			if (distributorList != null
					&& distributorList.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(distributorList,
						new TypeToken<List<DistributorDetailObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				distributorJson = element.getAsJsonArray();

			} else {
				status = 1;
				errorMessage = "Distributors By zipcode not available";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", distributorJson);

		} catch (Exception e) {
			status = 1;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", distributorJson);
		}
		System.out.println("Result returned from GetAllDistributorByZipcode():"
				+ jsonResult);
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetDistributor")
	@Produces("application/json")
	public String GetDistributor(@QueryParam("id") String id) {
		JsonObject jsonResult = new JsonObject();
		String distributorJson = null;
		int status = -1;
		String errorMessage = "";
		DistributorDetailObject distributor = null;

		try {
			DataHandler dataHandler = new DataHandler();
			distributor = dataHandler.GetDistributor(id);

			if (distributor != null) {
				status = 0;
				Gson gson = new Gson();
				distributorJson = gson.toJson(distributor);

			} else {
				status = 1;
				errorMessage = "Distributor matching id is not available";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", distributorJson);

		} catch (Exception e) {
			status = 1;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", distributorJson);
		}
		System.out.println("Result returned from GetDistributor():"
				+ jsonResult);
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetUserFavoritesDistributors")
	@Produces("application/json")
	public String getUserFavoritesDistributors(@QueryParam("userID") String userID,
			@QueryParam("categoryID") String categoryID) {
		JsonObject jsonResult = new JsonObject();
		JsonArray favoriteJson = null;
		int status = -1;
		String errorMessage = "";
		List<UserFavoritesObject> userFavoritesListObject = null;

		try {
			DataHandler dataHandler = new DataHandler();
			userFavoritesListObject = dataHandler.getUserFavoritesDetails(
					userID, categoryID);
			System.out.println("User Favorite Distributors:" + userFavoritesListObject);
			if (userFavoritesListObject != null
					&& userFavoritesListObject.size() > 0) {
				List<DistributorDetailObject> distributors = new ArrayList<DistributorDetailObject>();
				for(int i = 0; i<userFavoritesListObject.size();i++){
					UserFavoritesObject favObject = userFavoritesListObject.get(i);
					String id = favObject.getResourceID();
					DistributorDetailObject object = dataHandler.GetDistributor(id);
					System.out.println(id + ": Distributor Object :" + object);
					if (object != null) {
						distributors.add(object);
					}
				}
				status = 0;
				errorMessage = "";
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(distributors,
						new TypeToken<List<DistributorDetailObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out
							.println(" getUserFavoritesDistributors() Failed to create JSON");
				}

				favoriteJson = element.getAsJsonArray();
				System.out.println("getUserFavoritesDistributors() JsonArray:"
						+ favoriteJson);

			} else {
				status = 1;
				errorMessage = "User Favorite Distributors not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", favoriteJson);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e
					+ " in TPService : getUserFavoritesDistributors :"
					+ errorMessage);
			jsonResult.add("object", favoriteJson);
		}
		System.out.println("Result returned from getUserFavoritesDistributors():"
				+ jsonResult);
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetUnapprovedTipsNTricks")
	@Produces("application/json")
	public String GetUnapprovedTipsNTricks(@QueryParam("categoryID") String categoryID) {
		JsonObject jsonResult = new JsonObject();
		JsonArray tipsJson = null;
		int status = -1;
		String errorMessage = "";
		List<TipsAndTricksObject> tipsList = null;
		
				System.out.println("GetUnapprovedTipsNTricks :" ); 
		try {
			DataHandler dataHandler = new DataHandler();
			tipsList = dataHandler.GetUnapprovedTipsNTricks(categoryID);
			
			if (tipsList != null && tipsList.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(tipsList,
						new TypeToken<List<TipsAndTricksObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("GetUnapprovedTipsNTricks - Failed to create JSON");
				}
				tipsJson = element.getAsJsonArray();
			} else {
				status = 1;
				errorMessage = "GetUnapprovedTipsNTricks not found";
			} 

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", tipsJson);
			System.out.println("GetUnapprovedTipsNTricks :" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", tipsJson);
			System.out.println("GetUnapprovedTipsNTricks  ERROR:" + jsonResult);
		}
		return jsonResult.toString();
	}
	
	@POST
	@Path("/TipsAndTricksApproval")
	@Consumes("application/json") 
		public String TipsAndTricksApproval(@QueryParam("approvedStatus") String approvedStatus ,
				@QueryParam("ID") String ID ,
				@QueryParam("userID") String userID ,
				@QueryParam("reference") String reference ,
				@QueryParam("remarks") String remarks ){ 
		try {
			remarks =  URLDecoder.decode(remarks,"UTF-8");
		} catch (UnsupportedEncodingException e1) {  
			System.out.println("remarks is not decoded properly" +e1);
		}
		
		System.out.println("approvedStatus ID:  "+ approvedStatus);
		JsonObject jsonResult = new JsonObject();  
		StatusObject statusObject = new StatusObject(); 
		
		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.TipsAndTricksApproval(approvedStatus,ID,userID,reference, remarks );

			System.out.println("Status:" + statusObject.getStatusMessage());

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", "");
			System.out.println("TipsAndTricksApproval:"
					+ jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", "");
			System.out
					.println("TipsAndTricksApproval - ERROR:"
							+ jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GETAllTPActiveUsers")
	@Produces("application/json")
	public String GETAllTPActiveUsers() {
		JsonObject jsonResult = new JsonObject();
		JsonArray usersJson = null;
		int status = -1;
		String errorMessage = "";
		List<UserObject> userList = null;

		try {
			DataHandler dataHandler = new DataHandler();
			userList = dataHandler.GETAllTPActiveUsers();

			if (userList != null
					&& userList.size() > 0) {
				status = 0;
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(userList,
						new TypeToken<List<UserObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out.println("Failed to create JSON");
				}
				usersJson = element.getAsJsonArray();

			} else {
				status = 1;
				errorMessage = "GETAllTPActiveUsers not available";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", usersJson);

		} catch (Exception e) {
			status = 1;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", usersJson);
		}
		System.out.println("Result returned from GETAllTPActiveUsers():"
				+ jsonResult);
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetUserFavoriteTipsNTricks")
	@Produces("application/json")
	public String GetUserFavoriteTipsNTricks(@QueryParam("userID") String userID,
		@QueryParam("categoryID") String categoryID) {
	JsonObject jsonResult = new JsonObject();
	JsonArray favoriteJson = null;
	int status = -1;
	String errorMessage = "";
	List<UserFavoritesObject> userFavoritesListObject = null;

	try {
		DataHandler dataHandler = new DataHandler();
		userFavoritesListObject = dataHandler.getUserFavoritesDetails(
				userID, categoryID);
		System.out.println("User Favorite TipsnTricks:" + userFavoritesListObject);
		if (userFavoritesListObject != null
				&& userFavoritesListObject.size() > 0) {
			List<TipsAndTricksObject> tipsntricks = new ArrayList<TipsAndTricksObject>();
			for(int i = 0; i<userFavoritesListObject.size();i++){
				UserFavoritesObject favObject = userFavoritesListObject.get(i);
				String id = favObject.getResourceID();
				TipsAndTricksObject object = dataHandler.GetTipsnTricks(id);
				System.out.println(id + ": TipsAndTricks Object :" + object);
				if (object != null) {
					tipsntricks.add(object);
				}
			}
			status = 0;
			errorMessage = "";
			Gson gson = new Gson();
			JsonElement element = gson.toJsonTree(tipsntricks,
					new TypeToken<List<TipsAndTricksObject>>() {
					}.getType());

			if (!element.isJsonArray()) {
				System.out
						.println(" GetUserFavoriteTipsNTricks() Failed to create JSON");
			}

			favoriteJson = element.getAsJsonArray();
			System.out.println("GetUserFavoriteTipsNTricks() JsonArray:"
					+ favoriteJson);

		} else {
			status = 1;
			errorMessage = "User Favorite TipsNTricks not found";
		}

		jsonResult.addProperty("status", status);
		jsonResult.addProperty("errorMessage", errorMessage);
		jsonResult.add("object", favoriteJson);

	} catch (Exception e) {
		jsonResult.addProperty("status", status);
		jsonResult.addProperty("errorMessage", e
				+ " in TPService : GetUserFavoriteTipsNTricks :"
				+ errorMessage);
		jsonResult.add("object", favoriteJson);
	}
	System.out.println("Result returned from GetUserFavoriteTipsNTricks():"
			+ jsonResult);
	return jsonResult.toString();
		
	} 
	
	@POST
	@Path("/SaveUserFavoritePlace")
	@Produces("application/json")
	public String SaveUserFavoritePlace(@QueryParam("userID") String userID,
			@QueryParam("favoriteplace") String favoriteplace,
			@QueryParam("status") String status) {

		StatusObject statusObject = new StatusObject();
		JsonObject jsonResult = new JsonObject();
		String userJson = null;

		System.out.println("SaveUserFavoritePlace()  @QueryParam for userID:"
				+ userID);

		try {
			favoriteplace = URLDecoder.decode(favoriteplace, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.out.println("favoriteplace is not decoded properly" + e1);
		}

		try {
			DataHandler dataHandler = new DataHandler();
			statusObject = dataHandler.SaveUserFavoritePlace(userID,
					favoriteplace, status);

			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage",
					statusObject.getStatusMessage());
			jsonResult.addProperty("object", userJson);

		} catch (Exception e) {
			jsonResult.addProperty("status", statusObject.getStatusCode());
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", userJson);
		}
		System.out.println("Result returned from   :SaveUserFavoritePlace :"
				+ jsonResult.toString());
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetUserFavoritePlace")
	@Produces("application/json")
	public String GetUserFavoritePlace(@QueryParam("userID") String userID) {
		JsonObject jsonResult = new JsonObject();
		JsonArray placeJson = null;
		int status = -1;
		String errorMessage = "";
		List<UserFavoritePlaceObject> userFavoriteplaceListObject = null;
		System.out.println("userID: " + userID);

		try {
			DataHandler dataHandler = new DataHandler();
			userFavoriteplaceListObject = dataHandler
					.GetUserFavoritePlace(userID);
			if (userFavoriteplaceListObject != null
					&& userFavoriteplaceListObject.size() > 0) {
				status = 0;
				errorMessage = "";
				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(
						userFavoriteplaceListObject,
						new TypeToken<List<UserFavoritePlaceObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out
							.println(" GetUserFavoritePlace() Failed to create JSON");
				}

				placeJson = element.getAsJsonArray();
				System.out.println("GetUserFavoritePlace() JsonArray:"
						+ placeJson);

			} else {
				status = 1;
				errorMessage = "User Favorites Place not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", placeJson);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e
					+ " in TPService : GetUserFavoritePlace :" + errorMessage);
			jsonResult.add("object", placeJson);
		}
		System.out.println("Result returned from GetUserFavoritePlace():"
				+ jsonResult);
		return jsonResult.toString();
	}
	
	@POST
	@Path("/SaveRewardPrograms")
	@Produces(MediaType.APPLICATION_JSON)
	public String SaveRewardPrograms(
			@QueryParam("programname") String programname,
			@QueryParam("programdesc") String programdesc,
			@QueryParam("createdby") String createdby) {
		JsonObject jsonResult = new JsonObject();
		int status = -1;
		String errorMessage = "";
		try {
			programname = URLDecoder.decode(programname, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.out.println("program name is not decoded properly" + e1);
		}

		try {
			programdesc = URLDecoder.decode(programdesc, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.out.println("program desc is not decoded properly" + e1);
		}
		try {
			DataHandler dataHandler = new DataHandler();
			StatusObject sObject = dataHandler.SaveRewardPrograms(programname,
					programdesc, createdby);

			status = sObject.getStatusCode();
			errorMessage = sObject.getStatusMessage();

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", "");
			System.out.println("Result to be returned:" + jsonResult);

		} catch (Exception e) {
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", "");
			System.out.println("Result to be returned:" + jsonResult);
		}
		return jsonResult.toString();
	}

	@GET
	@Path("/GetRewardPrograms")
	@Produces("application/json")
	public String GetRewardPrograms(@QueryParam("programID") String programid) {
		JsonObject jsonResult = new JsonObject();
		JsonArray programJson = null;
		int status = -1;
		String errorMessage = "";

		List<RewardProgramsObject> rewardProgramList = null;
		System.out.println("programid: " + programid);

		try {
			DataHandler dataHandler = new DataHandler();
			rewardProgramList = dataHandler.GetRewardPrograms(programid);
			if (rewardProgramList != null && rewardProgramList.size() > 0) {

				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(rewardProgramList,
						new TypeToken<List<RewardProgramsObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out
							.println(" GetRewardPrograms() Failed to create JSON");
				}

				programJson = element.getAsJsonArray();
				System.out.println("GetRewardPrograms() JsonArray:"
						+ programJson);

				status = TPServerConstants.QUERY_EXECUTION_SUCCESS;
				errorMessage = "";

			} else {
				status = 2;
				errorMessage = "Reward Programs not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", programJson);

		} catch (Exception e) {
			jsonResult.addProperty("status",
					TPServerConstants.QUERY_EXECUTION_FAILURE);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", programJson);
		}
		return jsonResult.toString();
	}

	@POST
	@Path("/SaveRewardEvents")
	@Produces(MediaType.APPLICATION_JSON)
	public String SaveRewardEvents(@QueryParam("programID") String programid,
			@QueryParam("eventName") String eventname,
			@QueryParam("eventDesc") String eventdesc,
			@QueryParam("startDate") String startdate,
			@QueryParam("endDate") String enddate,
			@QueryParam("eventPoints") String eventpoints,
			@QueryParam("approvalRequired") String approvalrequired,
			@QueryParam("createdBy") String createdby) {

		JsonObject jsonResult = new JsonObject();
		int status = -1;
		String errorMessage = "";

		try {
			eventname = URLDecoder.decode(eventname, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.out.println("event name is not decoded properly" + e1);
		}
		try {
			eventdesc = URLDecoder.decode(eventdesc, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.out.println("event desc is not decoded properly" + e1);
		}
		try {
			startdate = URLDecoder.decode(startdate, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.out.println("start date is not decoded properly" + e1);
		}

		try {
			enddate = URLDecoder.decode(enddate, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.out.println("end date is not decoded properly" + e1);
		}

		try {
			DataHandler dataHandler = new DataHandler();
			StatusObject sObject = dataHandler.SaveRewardEvents(programid,
					eventname, eventdesc, startdate, enddate, eventpoints,
					approvalrequired, createdby);

			status = sObject.getStatusCode();
			errorMessage = sObject.getStatusMessage();

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", "");
		} catch (Exception e) {
			jsonResult.addProperty("status",
					TPServerConstants.QUERY_EXECUTION_FAILURE);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", "");
		}
		System.out.println("Result to be returned:" + jsonResult);
		return jsonResult.toString();
	}

	@GET
	@Path("/GetRewardEvents")
	@Produces("application/json")
	public String GetRewardEvents(@QueryParam("eventid") String eventid) {
		JsonObject jsonResult = new JsonObject();
		JsonArray eventJson = null;
		int status = -1;
		String errorMessage = "";
		List<RewardEventsObject> rewardEventsObjectList = null;
		System.out.println("programid: " + eventid);

		try {
			DataHandler dataHandler = new DataHandler();
			rewardEventsObjectList = dataHandler.GetRewardEvents(eventid);
			if (rewardEventsObjectList != null
					&& rewardEventsObjectList.size() > 0) {

				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(rewardEventsObjectList,
						new TypeToken<List<RewardEventsObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out
							.println(" GetRewardEvents() Failed to create JSON");
				}

				eventJson = element.getAsJsonArray();
				System.out.println("GetRewardEvents() JsonArray:" + eventJson);
				status = TPServerConstants.QUERY_EXECUTION_SUCCESS;
				errorMessage = "";
			} else {
				status = 2;
				errorMessage = "Reward Events not found";
			}
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", eventJson);

		} catch (Exception e) {
			jsonResult.addProperty("status",
					TPServerConstants.QUERY_EXECUTION_FAILURE);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", eventJson);
		}
		return jsonResult.toString();
	}
	
	@POST
	@Path("/SaveRewardTransaction")
	@Produces(MediaType.APPLICATION_JSON)
	public String SaveRewardTransaction(
			@QueryParam("categorycode") String categorycode,
			@QueryParam("categoryname") String categoryname,
			@QueryParam("userid") String userid,
			@QueryParam("eventtype") String eventtype,
			@QueryParam("eventpoints") String eventpoints,
			@QueryParam("approvalrequired") String approvalrequired) {

		StatusObject sObject = new StatusObject();
		JsonObject jsonResult = new JsonObject();
		int status = -1;
		String errorMessage = "";

		try {
			DataHandler dataHandler = new DataHandler();
			sObject = dataHandler.SaveRewardTransaction(userid, categorycode,
					categoryname, eventtype, eventpoints, approvalrequired);

			status = sObject.getStatusCode();
			errorMessage = sObject.getStatusMessage();

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", "");
		} catch (Exception e) {
			jsonResult.addProperty("status",
					TPServerConstants.QUERY_EXECUTION_FAILURE);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", "");
		}
		System.out.println("Result to be returned:" + jsonResult);
		return jsonResult.toString();
	}

	@POST
	@Path("/UpdateRewardApprovalStatus")
	@Produces(MediaType.APPLICATION_JSON)
	public String UpdateRewardApprovalStatus(
			@QueryParam("transactionID") String transactionID,
			@QueryParam("points") String points,
			@QueryParam("approvedStatus") String approvedStatus,
			@QueryParam("userid") String userid) {

		JsonObject jsonResult = new JsonObject();
		int status = -1;
		String errorMessage = "";

		try {
			DataHandler dataHandler = new DataHandler();
			StatusObject sObject = dataHandler.UpdateRewardApprovalStatus(
					transactionID, points, approvedStatus, userid);

			status = sObject.getStatusCode();
			errorMessage = sObject.getStatusMessage();

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", "");
		} catch (Exception e) {
			jsonResult.addProperty("status",
					TPServerConstants.QUERY_EXECUTION_FAILURE);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", "");
		}
		System.out.println("Result to be returned:" + jsonResult);
		return jsonResult.toString();
	}

	@GET
	@Path("/GetPendingRewardsApproval")
	@Produces("application/json")
	public String GetRewardPendingApproval(@QueryParam("userid") String userid) {
		JsonObject jsonResult = new JsonObject();
		JsonArray eventJson = null;
		int status = -1;
		String errorMessage = "";
		List<RewardTransactionObject> rewardTransactionObjectListObject = null;
		System.out.println("User ID: " + userid);

		try {
			DataHandler dataHandler = new DataHandler();
			rewardTransactionObjectListObject = dataHandler
					.GetRewardPendingApproval(userid);
			if (rewardTransactionObjectListObject != null
					&& rewardTransactionObjectListObject.size() > 0) {

				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(
						rewardTransactionObjectListObject,
						new TypeToken<List<RewardTransactionObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out
							.println(" GetRewardPendingApproval() Failed to create JSON");
				}

				eventJson = element.getAsJsonArray();
				System.out.println("GetRewardPendingApproval() JsonArray:"
						+ eventJson);
				status = TPServerConstants.QUERY_EXECUTION_SUCCESS;
				errorMessage = "";
			} else {
				status = 2;
				errorMessage = "No Rewards Pending for Approval";
			}
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", eventJson);

		} catch (Exception e) {
			jsonResult.addProperty("status",
					TPServerConstants.QUERY_EXECUTION_FAILURE);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", eventJson);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetRewardTransactionForPeriod")
	@Produces("application/json")
	public String GetRewardTransactionForPeriod(
			@QueryParam("userid") String userid,
			@QueryParam("fromdate") String fromdate,
			@QueryParam("todate") String todate) {
		JsonObject jsonResult = new JsonObject();
		JsonArray eventJson = null;
		int status = -1;
		String errorMessage = "";
		List<RewardTransactionObject> rewardTransactionObjectListObject = null;

		System.out.println("userid: " + userid);

		try {
			fromdate = URLDecoder.decode(fromdate, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.out.println("fromdate is not decoded properly" + e1);
		}

		try {
			todate = URLDecoder.decode(todate, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			System.out.println("todate is not decoded properly" + e1);
		}

		try {
			DataHandler dataHandler = new DataHandler();
			rewardTransactionObjectListObject = dataHandler
					.GetRewardTransactionForPeriod(userid, fromdate, todate);
			if (rewardTransactionObjectListObject != null
					&& rewardTransactionObjectListObject.size() > 0) {

				Gson gson = new Gson();
				JsonElement element = gson.toJsonTree(
						rewardTransactionObjectListObject,
						new TypeToken<List<RewardTransactionObject>>() {
						}.getType());

				if (!element.isJsonArray()) {
					System.out
							.println(" GetRewardTransactionForPeriod() Failed to create JSON");
				}

				eventJson = element.getAsJsonArray();
				System.out.println("GetRewardTransactionForPeriod() JsonArray:"
						+ eventJson);
				status = TPServerConstants.QUERY_EXECUTION_SUCCESS;
				errorMessage = "";
			} else {
				status = 2;
				errorMessage = "Rewards for the Transaction period not found";
			}
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.add("object", eventJson);

		} catch (Exception e) {
			jsonResult.addProperty("status",
					TPServerConstants.QUERY_EXECUTION_FAILURE);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", eventJson);
		}
		return jsonResult.toString();
	}
 
	@GET
	@Path("/GetRewardSummary")
	@Produces("application/json")
	public String GetRewardSummary(@QueryParam("userid") String userid) { 
		JsonObject jsonResult = new JsonObject();
		String rewardJson = null;
		int status = -1;
		String errorMessage = "";
		RewardSummaryObject rewardsummaryObject = null;
		List<RewardTransactionObject> rewardTransactionListObject = null;
		System.out.println("userid: " + userid);
		
		try {

			DataHandler dataHandler = new DataHandler();
			rewardTransactionListObject = dataHandler
					.GetRewardSummaryList(userid);

			rewardsummaryObject = dataHandler.GetRewardSummary(userid);
			if (rewardsummaryObject != null) {
				if (rewardTransactionListObject != null
						&& rewardTransactionListObject.size() > 0) {

					rewardsummaryObject
							.setRewardSummaryList(rewardTransactionListObject);
					
					status = TPServerConstants.QUERY_EXECUTION_SUCCESS;
					errorMessage = "";
				}
				Gson gson = new Gson();
				rewardJson = gson.toJson(rewardsummaryObject);
				System.out.println("GetRewardSummary: " + rewardJson);

				// Gson gson = new Gson();
				// JsonElement element =
				// gson.toJsonTree(rewardSummaryListObject,
				// new TypeToken<List<RewardSummaryObject>>() {
				// }.getType());
				//
				// if (!element.isJsonArray()) {
				// System.out
				// .println(" GetRewardSummary() Failed to create JSON");
				// }
				// temparr = element.getAsJsonArray(); 
				
			} else {
				status = 2;
				errorMessage = "Reward Summary Not found";
			}
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", rewardJson);

		} catch (Exception e) {
			jsonResult.addProperty("status",
					TPServerConstants.QUERY_EXECUTION_FAILURE);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.addProperty("object", rewardJson);
		}
		return jsonResult.toString();
	}

	@POST
	@Path("/AddPromoBusinessDetail")
	@Consumes("application/json")
	@Produces("application/json")
	public String addPromoBusinessDetail(String businessDetails) {
		JsonObject jsonResult = new JsonObject();
		StatusObject statusObj = null;
		int status = -1;
		
		System.out.println("addPromoBusinessDetail JSON:" + businessDetails);
		Gson gson = new Gson();
		PromoBusinessDetailsObject businessObject = gson.fromJson(businessDetails, PromoBusinessDetailsObject.class); 
		System.out.println("addPromoBusinessDetail Service - Parameter:" + businessObject.toString());

		try {
			DataHandler dataHandler = new DataHandler();
			statusObj = dataHandler.addPromoBusinessDetail(businessObject);

			int statusCode = statusObj.getStatusCode();
			String statusMessage = "";
			String code = statusObj.getStatusMessage();
			JsonObject innerObject = new JsonObject();
			if(statusCode == TPServerConstants.QUERY_EXECUTION_SUCCESS){
				statusMessage = "Successfully registered";
				innerObject.addProperty("PromoCode", code);
			} else if(statusCode == TPServerConstants.QUERY_EXECUTION_FAILURE){
				statusMessage = "Already registered";
				innerObject.addProperty("PromoCode", code);
			} else {
				statusMessage = statusObj.getStatusMessage();
				innerObject = null;
			}
			jsonResult.addProperty("status", statusCode);
			jsonResult.addProperty("errorMessage", statusMessage);
			jsonResult.add("object", innerObject);

		} catch (Exception e) {
			status = 2;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
		}
		System.out.println("Result returned from addPromoBusinessDetail():"
				+ jsonResult);
		return jsonResult.toString();
	}
	
	@POST
	@Path("/AddPRIPromoDetail")
	@Consumes("application/json")
	@Produces("application/json")
	public String addPRIPromoDetail(String businessDetails) {
		JsonObject jsonResult = new JsonObject();
		StatusObject statusObj = null;
		int status = -1;
		
		System.out.println("addPRIPromoDetail JSON:" + businessDetails);
		Gson gson = new Gson();
		PRIPromoDetailsObject businessObject = gson.fromJson(businessDetails, PRIPromoDetailsObject.class); 
		System.out.println("addPRIPromoDetail Service - Parameter:" + businessObject.toString());

		try {
			DataHandler dataHandler = new DataHandler();
			statusObj = dataHandler.addPRIPromoDetail(businessObject);

			int statusCode = statusObj.getStatusCode();
			String statusMessage = "";
			String code = statusObj.getStatusMessage();
			JsonObject innerObject = new JsonObject();
			if(statusCode == TPServerConstants.QUERY_EXECUTION_SUCCESS){
				statusMessage = "Successfully registered";
				innerObject.addProperty("PromoCode", code);
			} else if(statusCode == TPServerConstants.QUERY_EXECUTION_FAILURE){
				statusMessage = "Already registered";
				innerObject.addProperty("PromoCode", code);
			} else {
				statusMessage = statusObj.getStatusMessage();
				innerObject = null;
			}
			jsonResult.addProperty("status", statusCode);
			jsonResult.addProperty("errorMessage", statusMessage);
			jsonResult.add("object", innerObject);

		} catch (Exception e) {
			status = 2;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
		}
		System.out.println("Result returned from addPRIPromoDetail():"
				+ jsonResult);
		return jsonResult.toString();
	}
	
	@POST
	@Path("/AddChevyTruckPromoDetails")
	@Consumes("application/json")
	@Produces("application/json")
	public String addChevyTruckPromoDetails(String businessDetails) {
		JsonObject jsonResult = new JsonObject();
		StatusObject statusObj = null;
		int status = -1;
        
		System.out.println("chevyTruckPromoDetails JSON:" + businessDetails);
		Gson gson = new Gson();
		ChevyTruckPromoDetailsObject businessObject = gson.fromJson(
				businessDetails, ChevyTruckPromoDetailsObject.class);
		System.out.println("chevyTruckPromoDetails Service - Parameter:"
				+ businessObject.toString());

		try {
			DataHandler dataHandler = new DataHandler();
			statusObj = dataHandler.addChevyTruckPromoDetails(businessObject);

			int statusCode = statusObj.getStatusCode();

			String statusMessage = statusObj.getStatusMessage();
			JsonObject innerObject = new JsonObject();

			if (statusCode == TPServerConstants.QUERY_EXECUTION_SUCCESS) {
				innerObject.addProperty("PromoCode", statusMessage);
				
			} else if (statusCode == TPServerConstants.QUERY_EXECUTION_FAILURE) {
				innerObject.addProperty("PromoCode", statusMessage);
				
			} else if (statusCode == 2) {
			    innerObject.addProperty("PromoCode", statusMessage);
				
			} else if (statusCode == 3) {
				innerObject.addProperty("PromoCode", statusMessage);
				
			} else {
			    statusMessage = statusObj.getStatusMessage();
				innerObject = null;
			}

			jsonResult.addProperty("status", statusCode);
			jsonResult.addProperty("errorMessage", statusMessage);
			jsonResult.add("object", innerObject);

		} catch (Exception e) {
			status = 4;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
		}
		System.out.println("Result returned from chevyTruckPromoDetails():"
				+ jsonResult.toString());
		
		return jsonResult.toString();
	}
	
    @POST
    @Path("/verifyCaptcha")
    @Consumes("application/json")
    @Produces("application/json")
    public String verifyCaptcha(String captchaResponse) {
        JsonObject jsonResult = new JsonObject();
        JsonObject statusObj = null;
        int status = -1;
        String errorMessage = "";
        
        String url = "https://www.google.com/recaptcha/api/siteverify";
        String secret = TPServerConstants.SECRET_KEY;
        
        try {
            URL obj = new URL(url);
            HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

            con.setRequestMethod("POST");
            con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
            String replaceStr = captchaResponse.replaceAll("\"", "");
            String postParams = "secret=" + secret + "&response=" + replaceStr;

            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(postParams);
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
//          System.out.println("\nSending 'POST' request to URL : " + url);
//          System.out.println("Post parameters : " + postParams);
//          System.out.println("Response Code : " + responseCode);

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            String result = response.toString();
            System.out.println("Result" + result);
            if (result != null) {
                status = 0;
                JsonParser parser = new JsonParser();
                statusObj = (JsonObject) parser.parse(result);
                System.out.println("JSONObject : " + statusObj);
            } else {
                status = 1;
                errorMessage = "ReCaptcha Response Not Received";
            }
            jsonResult.addProperty("status", status);
            jsonResult.addProperty("errorMessage", errorMessage);
            jsonResult.add("object", statusObj);
            System.out.println("verifyCaptcha - Result to be returned:" + jsonResult);

        } catch (Exception e) {
            e.printStackTrace();
            status = 2;
            jsonResult.addProperty("status", status);
            jsonResult.addProperty("errorMessage", e.getMessage());
            jsonResult.add("object", statusObj);
            System.out.println("verifyCaptcha - ERROR Result to be returned:" + jsonResult);
        }
        return jsonResult.toString();
    }
}
