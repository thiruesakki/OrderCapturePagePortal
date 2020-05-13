package com.brakepartsinc.project.techportal.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.commons.codec.binary.Base64;

import com.brakepartsinc.project.techportal.client.util.EmailService;
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

public class DataHandler {

	public UserObject GetUser(String usr) throws Exception {
		UserObject userObject = null;
		ConnectionManager cmanager = null;
		Connection connection = null;

		String queryString = " Select id,confirmed,approved,status,email,password,firstname,lastname,phone1,phone2"
				+ ",address,city,country,lang,remarks,interest_in_communication,timezone"
				+ ",firstaccess,lastaccess,lastlogin,currentlogin,lastip,secret,picture,url"
				+ ",description,years_of_experience,area_of_speciality,bays_in_shop,brake_jobs_in_a_month"
				+ ",list_in_find_a_shop,currently_using_raybestos_products,mailformat"
				+ ",maildisplay,htmleditor,shopowner,timemodified,nickname,keepShopPrivate,KeepEmployeePrivate,iscustomer, "
				+ " referedby  from dbo.bpi_user where email = '";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString + usr + "'");

			while (rs.next()) {
				userObject = new UserObject();
				userObject.setEmail(rs.getString("email"));
				userObject.setPassword(rs.getString("password"));
				userObject.setFirstName(rs.getString("firstname"));

				userObject.setActiveStatus(rs.getString("status"));
				userObject.setApprovedStatus(rs.getString("approved"));
				userObject.setConfirmedStatus(rs.getString("confirmed"));

				userObject.setId(rs.getString("id"));
				userObject.setLastname(rs.getString("lastname"));
				userObject.setPhone1(rs.getString("phone1"));
				userObject.setPhone2(rs.getString("phone2"));
				userObject.setAddress(rs.getString("address"));
				userObject.setCity(rs.getString("city"));
				userObject.setCountry(rs.getString("country"));
				userObject.setLang(rs.getString("lang"));
				userObject.setRemarks(rs.getString("remarks"));
				userObject.setInterest_in_communication(rs
						.getString("interest_in_communication"));
				userObject.setTimezone(rs.getString("timezone"));
				userObject.setFirstaccess(rs.getString("firstaccess"));
				userObject.setLastaccess(rs.getString("lastaccess"));
				userObject.setLastlogin(rs.getString("lastlogin"));
				userObject.setCurrentlogin(rs.getString("currentlogin"));
				userObject.setLastip(rs.getString("lastip"));
				userObject.setSecret(rs.getString("secret"));
				userObject.setPicture(rs.getString("picture"));
				userObject.setUrl(rs.getString("url"));
				userObject.setDescription(rs.getString("description"));
				userObject.setYears_of_experience(rs
						.getString("years_of_experience"));
				userObject.setArea_of_speciality(rs
						.getString("area_of_speciality"));
				userObject.setBays_in_shop(rs.getString("bays_in_shop"));
				userObject.setBrake_jobs_in_a_month(rs
						.getString("brake_jobs_in_a_month"));
				userObject.setList_in_find_a_shop(rs
						.getString("list_in_find_a_shop"));
				userObject.setCurrently_using_raybestos_products(rs
						.getString("currently_using_raybestos_products"));
				userObject.setMailformat(rs.getString("mailformat"));
				userObject.setMaildisplay(rs.getString("maildisplay"));
				userObject.setHtmleditor(rs.getString("htmleditor"));
				userObject.setShopOwner(rs.getString("shopowner"));
				userObject.setTimemodified(rs.getString("timemodified"));

				userObject.setNickname(rs.getString("nickname"));
				userObject.setKeepShopPrivate(rs.getString("keepshopprivate"));
				userObject.setKeepEmployeePrivate(rs
						.getString("Keepemployeeprivate"));
				userObject.setIscustomer(rs.getInt("iscustomer"));
				userObject.setReferedby(rs.getString("referedby"));

				if (userObject.getLastaccess() != null
						&& userObject.getLastaccess().equals("") == false) {
					userObject
							.setIsFirstAccess(TPServerConstants.FIRSTACCESS_NO);
				}
			}

		} catch (Exception e) {
			System.err.println("DB ERROR: Method GetUser() : "+e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		System.out.println(userObject.toString());
		return userObject;
	}

	public String verifyEmail(String email) throws Exception {
		String userID = "";
		ConnectionManager cmanager = null;
		Connection connection = null;

		String queryString = "Select id from dbo.bpi_user where email = '";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString + email + "'");

			while (rs.next()) {
				userID = rs.getString("id");
			}

		} catch (Exception e) {
			System.err.println("DB ERROR: Method GetUser() : "+e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return userID;
	}
	
	
	public String verifyEmailForgot(String email,String domainName) throws Exception {
		int status = -1;
		String errorMessage = "";
		String userID = "";
		String secretkey = "";
		ConnectionManager cmanager = null;
		Connection connection = null;

		String queryString = "Select id from dbo.bpi_user where email = '";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString + email + "'");

			while (rs.next()) {
				userID = rs.getString("id");
			}
			
			if (userID != null && "".equals(userID) == false) {
				secretkey = UUID.randomUUID().toString();
				status = 0;
				errorMessage= "Email is valid";
				
			} else {
				status = 1;
				errorMessage = "Invalid Email";
			}

		} catch (Exception e) {
			System.err.println("DB ERROR: Method GetUser() : "+e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		
		if (status == 0) {
			int insertcount = saveResetPswdKey(userID, secretkey);
//			System.out.println("insertcount:"+insertcount);
//			if(insertcount > 0) {
				try {
				
			        boolean mailSent =	EmailService.sendMail(email, secretkey, domainName);
				if ( mailSent == false) {
					status = 0;
					errorMessage= "Reset password Link is sent to your email";
					
				} else {
					status = 1;
					errorMessage="unable to send the reset password link";
					
				}
				} catch (Exception e) {
					status = 1;
					errorMessage="unable to send the reset password link";
					
				}
//			}
		}
		
		return userID;
	}
	
	
	public List<OrganizationObject> GetOrganization() throws Exception {
		List<OrganizationObject> list = new ArrayList<OrganizationObject>();
		OrganizationObject organizationObject = null;
		ConnectionManager cmanager = null;
		Connection connection = null;

		String queryString = "select orgid,orgname,phone1,phone2,email,website,lang ,confirmed,approved,isdistributor, "
				+ " status,remarks from dbo.bpi_organization where status = 1 and approved=1 ";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				organizationObject = new OrganizationObject();
				organizationObject.setOrg_id(rs.getString("orgid"));
				organizationObject.setOrg_name(rs.getString("orgname"));

				organizationObject.setPhone1(rs.getString("phone1"));
				organizationObject.setPhone2(rs.getString("phone2"));
				organizationObject.setEmail(rs.getString("email"));
				organizationObject.setWebsite(rs.getString("website"));
				organizationObject.setLang(rs.getString("lang"));
				organizationObject.setConfirmed(rs.getString("confirmed"));
				organizationObject.setApproved(rs.getString("approved"));
				organizationObject.setIsDistributor(rs
						.getString("isDistributor"));
				organizationObject.setRemarks(rs.getString("remarks"));
				list.add(organizationObject);
				System.out.println("Organization retrieved:" + organizationObject.toString());

			}

		} catch (Exception e) {
			System.err.println("DB ERROR: Method GetOrganization() : "+e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}

	public String decodePassword(String authString) {

		String decodedAuth = "";

		byte[] bytes = null;
		bytes = new Base64().decode(authString);
		decodedAuth = new String(bytes);
		// System.out.println(decodedAuth +"- Decoding done");
		return decodedAuth;
	}

	public String encodePassword(String pwd) {

		byte[] authStringEnc = new Base64().encode(pwd.getBytes());
		String encodedString = new String(authStringEnc);
		System.out.println("start " + encodedString);

		return encodedString;
	}

	public List<JobTitleObject> GetJobTitle() throws Exception {
		List<JobTitleObject> list = new ArrayList<JobTitleObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = "Select jobcategoryid,JobTitle,JobDescription from dbo.bpi_jobcategory where status = 1 ";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				JobTitleObject obj = new JobTitleObject();
				obj.setId(rs.getString("jobcategoryid"));
				obj.setJobTitle(rs.getString("JobTitle"));
				obj.setJobDescription(rs.getString("JobDescription"));
				list.add(obj);
			}

		} catch (Exception e) {
			System.err.println("DB ERROR: Method GetJobTitle() : "+e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}

	public StatusObject createOrganization(RegisterOrganizationObject ro)
			throws Exception {
		CallableStatement callableStatement = null;
		ConnectionManager cmanager = null;
		Connection connection = null;
		// String insertStoreProc =
		// "{call create_bpi_organization_details(?,?,?,?,?,?,?,?,?,?,?,?,?    ,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		String insertStoreProc = "{call dbo.create_bpi_organization_details(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

		StatusObject sObject = new StatusObject();
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			callableStatement = connection.prepareCall(insertStoreProc);
			callableStatement.setString(1, ro.getOrgname());
			callableStatement.setString(2, ro.getPhone1());
			callableStatement.setString(3, ro.getPhone2());
			callableStatement.setString(4, ro.getEmail());
			callableStatement.setString(5, ro.getWebsite());
			callableStatement.setString(6, ro.getLang());
			callableStatement.setString(7, ro.getAddress());
			callableStatement.setString(8, ro.getCity());
			callableStatement.setString(9, ro.getState());
			callableStatement.setString(10, ro.getCountry());
			callableStatement.setString(11, ro.getZipcode());
			callableStatement.setInt(12, ro.getIsdistributor());
			callableStatement.setString(13, ro.getConfirmed());
			callableStatement.setString(14, ro.getApproved());
			callableStatement.setString(15, ro.getStatus());
			callableStatement.setString(16, ro.getRemarks());
			// callableStatement
			// .setString(13, TPServerConstants.Register_LATITUDE);
			// callableStatement.setString(14,
			// TPServerConstants.Register_LONGITUDE);

			callableStatement.executeUpdate();
			// System.out.println("Organization Record inserted into DBUSER table!");
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_SUCCESS); 

			if (callableStatement != null) {
				callableStatement.close();
				// System.out.println("callableStatement Closed");
			}

		} catch (Exception e) {
			System.err.println("Error in inserting organization : " + e);
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_FAILURE);
			sObject.setStatusMessage(e.getMessage());
//			return 1;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return sObject;
	}

	public StatusObject createUser(RegisterUserObject udo) throws Exception {
		StatusObject sObject = new StatusObject();
		String insertStoreProc = "{call dbo.create_bpi_user_details(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = null;
		ConnectionManager cmanager = null;
		Connection connection = null;
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			callableStatement = connection.prepareCall(insertStoreProc);
			callableStatement.setString(1, udo.getConfirmed());
			callableStatement.setString(2, udo.getApproved());
			callableStatement.setString(3, udo.getStatus());
			callableStatement.setString(4, udo.getEmail());
			callableStatement.setString(5, udo.getPassword());
			callableStatement.setString(6, udo.getFirstName());
			callableStatement.setString(7, udo.getLastname());
			callableStatement.setString(8, udo.getPhone1());
			callableStatement.setString(9, udo.getPhone2());
			callableStatement.setString(10, udo.getAddress());
			callableStatement.setString(11, udo.getCity());
			callableStatement.setString(12, udo.getCountry());
			callableStatement.setString(13, udo.getLang());
			callableStatement.setString(14, udo.getRemarks());
			callableStatement.setInt(15, udo.getInterest_in_communication());
			callableStatement.setString(16, udo.getTimezone());
			callableStatement.setString(17, udo.getFirstaccess());
			callableStatement.setString(18, null);
			callableStatement.setString(19, null);
			callableStatement.setString(20, null);
			callableStatement.setString(21, udo.getLastip());
			callableStatement.setString(22, udo.getSecret());
			callableStatement.setInt(23, udo.getPicture());
			callableStatement.setString(24, udo.getUrl());
			callableStatement.setString(25, udo.getDescription());
			callableStatement.setString(26, udo.getYears_of_experience());
			callableStatement.setString(27, udo.getArea_of_speciality());
			callableStatement.setString(28, udo.getBays_in_shop());
			callableStatement.setString(29, udo.getBrake_jobs_in_a_month());
			callableStatement.setInt(30, udo.getList_in_find_a_shop());
			callableStatement.setInt(31,
					udo.getCurrently_using_raybestos_products());
			callableStatement.setInt(32, udo.getMailformat());
			callableStatement.setInt(33, udo.getMaildisplay());
			callableStatement.setInt(34, udo.getHtmleditor());
			callableStatement.setInt(35, udo.getAutosubscribe());

			callableStatement.setString(36, udo.getFirstaccess());
			callableStatement.setString(37, udo.getNickname());
			callableStatement.setInt(38, udo.getKeepShopPrivate());
			callableStatement.setInt(39, udo.getKeepEmployeePrivate());
			callableStatement.setInt(40, udo.getIscustomer());
			callableStatement.setString(41, udo.getReferedby());
			callableStatement.setString(42, udo.getOrgid());
			callableStatement.setString(43, udo.getJobcategoryid());

			callableStatement.executeUpdate();

			if (callableStatement != null) {
				callableStatement.close();
			}
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_SUCCESS); 

		} catch (Exception e) {
			System.err.println("Error inserting BPI user" + e.getMessage());
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_FAILURE);
			sObject.setStatusMessage(e.getMessage());
//			return 1;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return sObject;
	}

	public OrganizationObject checkOrganizationExists(String organization)
			throws Exception {
		OrganizationObject organizationObject = null;
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = " Select orgid,orgname, status from dbo.bpi_organization where status=1 and orgname = '"
				+ organization + "'";
		System.out.println(queryString);
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);
			while (rs.next()) {
				organizationObject = new OrganizationObject();
				organizationObject.setOrg_id(rs.getString("orgid"));
				organizationObject.setOrg_name(rs.getString("orgname"));
				organizationObject.setStatus(rs.getString("status"));
			}
		} catch (Exception e) {
			System.err.println("DB ERROR: Method checkOrganizationExists() : "+e);
			throw e;
		}
		return organizationObject;
	}
 
	public StatusObject checkEmailLinkValidity(String secretkey) throws Exception {
		//String statusString = "-1:null";
		ConnectionManager cmanager = null;
		Connection connection = null;
		StatusObject statusObject = new StatusObject();
		String insertStoreProc = "{call checkEmailVerificationLink(?,?,?)}";
		CallableStatement callableStatement = null;
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			callableStatement = connection.prepareCall(insertStoreProc);
			callableStatement.setString(1, secretkey);
			callableStatement.registerOutParameter(2, Types.INTEGER);
			callableStatement.registerOutParameter(3, Types.VARCHAR);

			callableStatement.execute();
			// System.out.println( callableStatement.getString(2));
			// System.out.println( callableStatement.getString(3));
			int statuscode = callableStatement.getInt(2);
			String errormsg = callableStatement.getString(3);
			//statusString = statuscode + ":" + errormsg;
			
			statusObject.setStatusCode( statuscode);
			statusObject.setStatusMessage(errormsg);
			// System.out.println("out : " + statusString);

			if (callableStatement != null) {
				callableStatement.close();
			}

			// if (connection != null) {
			// connection.close();
			// }
		} catch (Exception e) {
			System.err.println("Error checkEmailLinkValidity() : " + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			 
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;
	}
 
	public int saveResetPswdKey(String userID, String secretkey)
			throws Exception {
		int status = -1;
		Statement statement = null;
		ConnectionManager cmanager = null;
		Connection connection = null;

		String SQL1 = "   UPDATE dbo.bpi_user_resetpassword set status=0 where status=1 and userid='"
				+ userID + "'";

		String SQL2 = " INSERT INTO dbo.bpi_user_resetpassword (userid,resetLinkCode,status,Remarks)"
				+ " VALUES(" + userID + ",'" + secretkey + "',1,'')";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();
			connection.setAutoCommit(false);

			statement.addBatch(SQL1);
			System.out.println(SQL1);

			statement.addBatch(SQL2);
			System.out.println(SQL2);

			int[] count = statement.executeBatch();

			connection.commit();
			System.out.println("count[0] - First stmt values update :" + count[0]);
			System.out.println("count[1] - Second stmt values update :" + count[1]);

			if (statement != null) {
				statement.close();
			}

			if (count[1] >= 1)
				status = 0;
			else
				status = 2;  // Data not Inserted

		} catch (Exception e) {
			System.err.println(" Error in saveResetPswdKey in Datahandler");
			status = 1;
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		System.out.println("Status returned:" + status);
		return status;
	}
	
 
	public StatusObject verifyResetPasswordLink(String secretkey) throws Exception {
		//String statusString = "-1:null";
		ConnectionManager cmanager = null;
		Connection connection = null;
		StatusObject statusObject = new StatusObject();
		String insertStoreProc = "{call checkVerifyResetPassword(?,?,?,?)}";
		CallableStatement callableStatement = null;
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			callableStatement = connection.prepareCall(insertStoreProc);
			callableStatement.setString(1, secretkey);
			callableStatement.registerOutParameter(2, Types.INTEGER);
			callableStatement.registerOutParameter(3, Types.VARCHAR);
			callableStatement.registerOutParameter(4, Types.INTEGER);

			callableStatement.execute();
			// System.out.println( callableStatement.getString(2));
			// System.out.println( callableStatement.getString(3));
			int statuscode = callableStatement.getInt(2);
			String errormsg = callableStatement.getString(3);
			int userID = callableStatement.getInt(4);
			 
			statusObject.setStatusCode(statuscode);
			statusObject.setStatusMessage(errormsg);
			statusObject.setUserID(userID);
			// System.out.println("out : " + statusString);

			if (callableStatement != null) {
				callableStatement.close();
			}

		} catch (Exception e) {
			System.err.println("Error inserting BPI user" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			 
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;
	}

	public StatusObject updatePassword(String userid, String password) throws Exception {
		StatusObject statusObject  = new StatusObject();
		ConnectionManager cmanager = null;
		Connection connection = null;
		// String SQL1 = "UPDATE  dbo.bpi_user  set password = '" + password
		// + "'  where  bpi_user.id=" + userid;

		String SQL1 = "UPDATE  dbo.bpi_user  set password = '"
				+ password
				+ "', timemodified=GETDATE() where  bpi_user.id= "
				+ userid
				+ " AND  ( Select count( status) from dbo.bpi_user_resetpassword  where userid = "
				+ userid + " and  status = 1)= 1";

		String SQL2 = "UPDATE dbo.bpi_user_resetpassword set status = 0  where status = 1 and userid = "
				+ userid;
		Statement statement = null;

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();
			connection.setAutoCommit(false);

			statement.addBatch(SQL1);
			System.out.println(SQL1);

			statement.addBatch(SQL2);
			System.out.println(SQL2);

			int[] count = statement.executeBatch();
			connection.commit();
			System.out.println("First stmt count[0] :" + count[0]);
			System.out.println(" Second stmt count[1] :" + count[1]);

			if (count[1] >= 1){ 
				statusObject.setStatusCode(0);
				statusObject.setStatusMessage(""); 
			}else{
				statusObject.setStatusCode(2);
				statusObject.setStatusMessage("User not available");
			}
		} catch (Exception e) {
			System.err.println(" Error in saveResetPswdKey in Datahandler");
			statusObject.setStatusCode(1); // 
			statusObject.setStatusMessage(e.getMessage()); 
			 
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		System.out.println("Status returned:" + statusObject.getStatusMessage());
		return statusObject;
	}

	public int changePassword(String userid, String password) throws Exception {
		int status = -1;
		String SQL = "UPDATE dbo.bpi_user set timemodified=GETDATE(), password = '" + password
				+ "'  where  bpi_user.id=" + userid;
		Statement statement = null;

		ConnectionManager cmanager  = null;
		Connection connection =null;
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection(); 	
			statement = connection.createStatement();
			connection.setAutoCommit(false);

			statement.addBatch(SQL);
			System.out.println(SQL);
			int[] count = statement.executeBatch();
			connection.commit();
//			System.out.println(" 1 stmt :" + count[0]);

			if (count[0] >= 1){
				status = 0;
			}else{
				status = 2; // No user available
			}
		} catch (Exception e) {
			System.err.println("Error in change password in Datahandler");
			status = 1;			 
		} 	finally {
		if(connection!=null){
				try{
					connection.close();
				} catch(Exception e){
					
				}
			}
		}
//		System.out.println("Status returned:" + status);
		return status;
	}


	public StatusObject checkOldPassword(String userid, String oldpassword) throws Exception {
		String SQLQueryString = "select password from dbo.bpi_user where id =" + userid;
		
		StatusObject statusObject = new StatusObject();
		statusObject.setStatusCode(1);
		statusObject.setStatusMessage("Invalid User");
		
		ConnectionManager cmanager  = null;
		Connection connection =null;
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection(); 	
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(SQLQueryString);
			while (rs.next()) {
				String password = rs.getString("password");
				if(password.equals(oldpassword)){
//					System.out.println("Old Password is correct");
					statusObject.setStatusCode(0);
					statusObject.setStatusMessage("");
				} else {
//					System.out.println("Old Password is NOT correct");
					statusObject.setStatusCode(1);
					statusObject.setStatusMessage("Invalid old password");
				}
			}
		} catch (Exception e) {
			System.err.println("DBError:checkOldPassword "+e);
		} 	finally {
		if(connection!=null){
				try{
					connection.close();
				} catch(Exception e){
					
				}
			}
		}		
		
		return statusObject ;	
	}

 
	public UserObject GetUserProfile(String usr) throws Exception {
		UserObject userObject = null;
		ConnectionManager cmanager = null;
		Connection connection = null;
		System.out.println("before query");

		String queryString = "Select distinct u.id,u.confirmed,u.approved,u.status,u.email,u.firstname,u.lastname, "
				+ " u.phone1,u.phone2,u.address,u.city,u.country,u.lang,u.remarks,u.interest_in_communication,"
				+ " u.timezone,u.firstaccess,u.lastaccess,u.lastlogin,u.currentlogin,u.lastip,u.secret,u.picture,url"
				+ " ,u.description,u.years_of_experience,u.area_of_speciality,u.bays_in_shop,u.brake_jobs_in_a_month"
				+ " ,u.list_in_find_a_shop,u.currently_using_raybestos_products,u.mailformat ,u.maildisplay,"
				+ " u.htmleditor,u.shopowner,u.timemodified,u.nickname,u.keepShopPrivate,u.KeepEmployeePrivate,"
				+ " u.iscustomer, u.referedby, isNull(dbo.CombineJobCatValues(u.id),'') jobtitle, isNull(dbo.CombineOrgValues(u.id),'') organization "
				+ " FROM dbo.bpi_user u where u.id  =  " +usr;

	//	System.out.println("Record set in UserObject:QueryString: "  + queryString);
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);
		//	System.out.println("before query1");
			while (rs.next()) {
		//		System.out.println("before query2");
				userObject = new UserObject();
				userObject.setEmail(rs.getString("email"));
//				userObject.setPassword(rs.getString("password"));
				userObject.setFirstName(rs.getString("firstname"));

				userObject.setActiveStatus(rs.getString("status"));
				userObject.setApprovedStatus(rs.getString("approved"));
				userObject.setConfirmedStatus(rs.getString("confirmed"));

				userObject.setId(rs.getString("id"));
				userObject.setLastname(rs.getString("lastname"));
				userObject.setPhone1(rs.getString("phone1"));
				userObject.setPhone2(rs.getString("phone2"));
				userObject.setAddress(rs.getString("address"));
				userObject.setCity(rs.getString("city"));
				userObject.setCountry(rs.getString("country"));
				userObject.setLang(rs.getString("lang"));
				userObject.setRemarks(rs.getString("remarks"));
				userObject.setInterest_in_communication(rs
						.getString("interest_in_communication"));
				userObject.setTimezone(rs.getString("timezone"));
				userObject.setFirstaccess(rs.getString("firstaccess"));
				userObject.setLastaccess(rs.getString("lastaccess"));
				userObject.setLastlogin(rs.getString("lastlogin"));
				userObject.setCurrentlogin(rs.getString("currentlogin"));
				userObject.setLastip(rs.getString("lastip"));
				userObject.setSecret(rs.getString("secret"));
				userObject.setPicture(rs.getString("picture"));
				userObject.setUrl(rs.getString("url"));
				userObject.setDescription(rs.getString("description"));
				userObject.setYears_of_experience(rs
						.getString("years_of_experience"));
				userObject.setArea_of_speciality(rs
						.getString("area_of_speciality"));
				userObject.setBays_in_shop(rs.getString("bays_in_shop"));
				userObject.setBrake_jobs_in_a_month(rs
						.getString("brake_jobs_in_a_month"));
				userObject.setList_in_find_a_shop(rs
						.getString("list_in_find_a_shop"));
				userObject.setCurrently_using_raybestos_products(rs
						.getString("currently_using_raybestos_products"));
				userObject.setMailformat(rs.getString("mailformat"));
				userObject.setMaildisplay(rs.getString("maildisplay"));
				userObject.setHtmleditor(rs.getString("htmleditor"));
				userObject.setShopOwner(rs.getString("shopowner"));
				userObject.setTimemodified(rs.getString("timemodified"));

				userObject.setNickname(rs.getString("nickname"));
				userObject.setKeepShopPrivate(rs.getString("keepshopprivate"));
				userObject.setKeepEmployeePrivate(rs
						.getString("Keepemployeeprivate"));
				userObject.setIscustomer(rs.getInt("iscustomer"));
				userObject.setReferedby(rs.getString("referedby"));
				userObject.setJobtitleList(TPUtility.StringToJobTitleObject(rs.getString("jobtitle")));
				userObject.setOrganizationList(TPUtility.StringToOrganizationObject(rs.getString("organization"))); 
				if (userObject.getLastaccess() != null
						&& userObject.getLastaccess().equals("") == false) {
					userObject
							.setIsFirstAccess(TPServerConstants.FIRSTACCESS_NO);
				} 
			 	System.out.println("Record set in UserObject:"
				 		+ userObject.toString());

			}
		} catch (Exception e) {
			System.err.println("ERROR IN DB" + e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return userObject;
	}
	
	public StatusObject updateUserProfile(TCUserProfileObject updateuserObject) throws Exception {
		
		int statuscode = 0;
		String errormsg = "";
		
		String decodedAuth = "";
		int isPasswordSet = 0;  // false
		 
		byte[] bytes = null;
		bytes = new Base64().decode(updateuserObject.getPassword());
		decodedAuth = new String(bytes);
		
		if(!decodedAuth.equals("")){			
			isPasswordSet = 1 ;
		} else{
			errormsg = "Password Not Set";
		}
		
		System.out.println("decodedAuth : "+decodedAuth);

		List jobTitleList = updateuserObject.getJobTitleID() ; 
		List orgIdList = updateuserObject.getOrganizationID();

		String jobTitleString = "";
		String orgIdString = ""; 
		 
		for (int r = 0; r < jobTitleList.size(); r++) { 
			jobTitleString = jobTitleString + ":" +jobTitleList.get(r) ;
		}

		if (jobTitleString.length() > 1) {
			jobTitleString = jobTitleString.substring(1, jobTitleString.length());
		} 
		 
		for (int c = 0; c < orgIdList.size(); c++) { 
			orgIdString = orgIdString + ":" + orgIdList.get(c) ;
		}

		if (orgIdString.length() > 1) {
			orgIdString = orgIdString.substring(1,
					orgIdString.length());
		} 
		
	//	System.out.println("encryptedPassword: " + encryptedPassword); 
		System.out.println("jobTitleString: " + jobTitleString);
		System.out.println("orgIdString: " + orgIdString);
		
		ConnectionManager cmanager = null;
		Connection connection = null; 
		CallableStatement callableStatement = null;
		  
		StatusObject statusObject  = new StatusObject();  
		String insertStoreProc = "{call updateUserProfile(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		 
		System.out.println("ruo.getId() : " + updateuserObject.getId());
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			callableStatement = connection.prepareCall(insertStoreProc);
			
			callableStatement.registerOutParameter(1, Types.INTEGER);
			callableStatement.registerOutParameter(2, Types.VARCHAR);
			callableStatement.setString(3, updateuserObject.getId());
			callableStatement.setString(4, updateuserObject.getEmail());

			callableStatement.setString(5, updateuserObject.getPassword());
			callableStatement.setString(6, updateuserObject.getFirstName());
			callableStatement.setString(7, updateuserObject.getLastname());
			callableStatement.setString(8, updateuserObject.getPhone1());
			callableStatement.setString(9, updateuserObject.getPhone2());
			callableStatement.setString(10, updateuserObject.getAddress());
			callableStatement.setString(11, updateuserObject.getCity());
			callableStatement.setString(12, updateuserObject.getCountry());
			callableStatement.setString(13, updateuserObject.getNickname());
			callableStatement.setInt(14, Integer.parseInt(updateuserObject.getPicture()));
			callableStatement.setString(15, updateuserObject.getUrl());
			callableStatement.setString(16, updateuserObject.getYears_of_experience());
			callableStatement.setString(17, updateuserObject.getArea_of_speciality());

			callableStatement.setInt(18,
					Integer.parseInt(updateuserObject.getInterest_in_communication()));
			callableStatement.setString(19, updateuserObject.getBays_in_shop());
			callableStatement.setString(20, updateuserObject.getBrake_jobs_in_a_month());
			callableStatement.setInt(21,
					Integer.parseInt(updateuserObject.getList_in_find_a_shop()));
			callableStatement.setInt(22, Integer.parseInt(updateuserObject
					.getCurrently_using_raybestos_products()));
			callableStatement.setInt(23,
					Integer.parseInt(updateuserObject.getKeepShopPrivate()));
			callableStatement.setInt(24,
					Integer.parseInt(updateuserObject.getKeepEmployeePrivate()));
			callableStatement.setString(25, updateuserObject.getState());
			callableStatement.setString(26,jobTitleString );
			callableStatement.setString(27,orgIdString);
			callableStatement.setInt(28,isPasswordSet);
			
			callableStatement.execute();			

			statuscode = callableStatement.getInt(1);
			errormsg = callableStatement.getString(2);
			
			statusObject.setStatusCode(statuscode);
			statusObject.setStatusMessage(errormsg);
			
			System.out.println("updateUserProfile : " + statusObject.getStatusMessage());

			if (callableStatement != null) {
				callableStatement.close();
			}

		} catch (Exception e) {
			System.err.println("DB Error updateUserProfile" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			 
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;
	}

	
	public RoleObject GetRoleDetails(String roleID) throws Exception {
		RoleObject roleObject = null;
		ConnectionManager cmanager = null;
		Connection connection = null;

		String queryString = "SELECT role_id,role_name ,role_desc,isActive,CreatedBy,CreatedDate,UpdatedBy,UpdatedDate FROM dbo.bpi_role WHERE role_id = '";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString + roleID + "'");

			while (rs.next()) {
				roleObject = new RoleObject();
				roleObject.setRoleID(rs.getString("role_id"));
				roleObject.setRoleName(rs.getString("role_name"));
				roleObject.setRoleDesc(rs.getString("role_desc"));
				roleObject.setIsActive(rs.getString("isActive"));
				roleObject.setCreatedBy(rs.getString("CreatedBy"));
				roleObject.setCreatedDate(rs.getString("CreatedDate"));
				roleObject.setModifiedBy(rs.getString("UpdatedBy"));
				roleObject.setModifiedDate(rs.getString("UpdatedDate"));
				System.out.println("Values set in the Object: "
						+ roleObject.toString());
			}
		} catch (Exception e) {
			System.err.println("ERROR IN DB Role retrieval" + e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return roleObject;
	}

	public List<RoleObject> GetUserRoleDetails(String userID) throws Exception {
		System.out.println("userID"+userID);
		List<RoleObject> list = new ArrayList<RoleObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = "SELECT rl.role_id,rl.role_name,rl.role_desc,rl.isActive,rl.CreatedBy,rl.CreatedDate,rl.UpdatedBy,rl.UpdatedDate "
				+ "FROM dbo.bpi_role rl INNER JOIN dbo.bpi_user_role_mapping map ON map.role_id = rl.role_id "
				+ "where rl.isactive=1 and map.status = 1 and map.user_id = '";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString + userID + "'");

			while (rs.next()) {
				RoleObject obj = new RoleObject();
				obj.setRoleID(rs.getString("role_id"));
				obj.setRoleName(rs.getString("role_name"));
				obj.setRoleDesc(rs.getString("role_desc"));
				obj.setIsActive(rs.getString("isActive"));
				obj.setCreatedBy(rs.getString("CreatedBy"));
				obj.setCreatedDate(rs.getString("CreatedDate"));
				obj.setModifiedBy(rs.getString("UpdatedBy"));
				obj.setModifiedDate(rs.getString("UpdatedDate"));
				System.out.println("User Role:" + obj.toString());
				list.add(obj);
			}

		} catch (Exception e) {
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}

		return list;
	}

	public CustomerObject GetCustomerDetails(String userID) throws Exception {
		CustomerObject object = null;
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = "SELECT id,user_id,account_number,billto_site_id,shipto_site_id,status FROM dbo.bpi_customer WHERE status = 1 and user_id = '";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString + userID + "'");

			while (rs.next()) {
				object = new CustomerObject();
				object.setCustomerID(rs.getString("id"));
				object.setUserID(rs.getString("user_id"));
				object.setAccountNo(rs.getString("account_number"));
				object.setBillToSiteID(rs.getString("billto_site_id"));
				object.setShipToSiteID(rs.getString("shipto_site_id"));
				object.setStatus(rs.getString("status"));
				System.out.println("Values set in the Object: "
						+ object.toString());
			}
		} catch (Exception e) {
			System.err.println("ERROR IN DB Customer retrieval" + e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return object;
	}

	public List<CustomerObject> GetCustomerDetailsList(String userID)
			throws Exception {
		List<CustomerObject> customerList = new ArrayList<CustomerObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = "SELECT id,user_id,account_number,billto_site_id,shipto_site_id,status,org_id FROM dbo.bpi_customer WHERE status = 1 and user_id = '";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString + userID + "'");

			while (rs.next()) {
				CustomerObject object = new CustomerObject();
				object.setCustomerID(rs.getString("id"));
				object.setUserID(rs.getString("user_id"));
				object.setAccountNo(rs.getString("account_number"));
				object.setBillToSiteID(rs.getString("billto_site_id"));
				object.setShipToSiteID(rs.getString("shipto_site_id"));
				object.setStatus(rs.getString("status"));
				object.setOrgID(rs.getString("org_id"));
				System.out.println("Values set in the Object: "
						+ object.toString());
				customerList.add(object);
			}
		} catch (Exception e) {
			System.err.println("ERROR IN DB Customer retrieval" + e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return customerList;
	}

	public List<CountryObject> GetCountriesStatesList() throws Exception {
		List<CountryObject> list = new ArrayList<CountryObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = "SELECT id,country_name,country_desc,active FROM dbo.bpi_country where active =1";
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				CountryObject countryObject = new CountryObject();
				countryObject.setId(rs.getString("id"));
				String country = rs.getString("country_name");
				countryObject.setName(country);
				countryObject.setDescription(rs.getString("country_desc"));
				// System.out.println("Country Object:" +
				// countryObject.toString());
				list.add(countryObject);
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		// System.out.println("Final Country List Size:" + list.size());
		return list;
	}

	public List<StateObject> GetStatesList(String countryID) throws Exception {
		List<StateObject> states = new ArrayList<StateObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String stateQueryString = "SELECT id,country_id,state_name,state_desc FROM dbo.bpi_state where active =1 and country_id= '";
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt
					.executeQuery(stateQueryString + countryID + "'");

			while (rs.next()) {
				StateObject stateObject = new StateObject();
				stateObject.setCountryID(rs.getString("country_id"));
				stateObject.setId(rs.getString("id"));
				stateObject.setName(rs.getString("state_name"));
				stateObject.setDescription(rs.getString("state_desc"));
				// System.out
				// .println("State Object:" + stateObject.toString());
				states.add(stateObject);
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return states;
	}

	public List<ShippingMethodObject> GetShippingMethodTypes() throws Exception {
		List<ShippingMethodObject> list = new ArrayList<ShippingMethodObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		// String queryString =
		// "SELECT scac_id,scac_seq_no,scac,entity,description,order_type,scac_default,status "
		// + "FROM dbo.bpi_scac where status = 1";
		String queryString = "SELECT id,ship_method_code,freight_code,display description,status FROM dbo.bpi_scac where status = 1";
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				ShippingMethodObject obj = new ShippingMethodObject();
				obj.setId(rs.getString("id"));
				obj.setShipMethodCode(rs.getString("ship_method_code"));
				obj.setFreightCode(rs.getString("freight_code"));
				obj.setDescription(rs.getString("description"));
				obj.setStatus(rs.getString("status"));

				list.add(obj);
			}

		} catch (Exception e) {
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}

		return list;
	}

	public List<CategoryObject> getCategoryList() throws Exception {
		List<CategoryObject> list = new ArrayList<CategoryObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = "SELECT category_id,catagory_name,startdate,enddate,status  FROM  "
				+ "dbo.bpi_category where getDate() between startdate and enddate ";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				CategoryObject obj = new CategoryObject();
				obj.setCategoryId(rs.getString("category_id"));
				obj.setCatagoryName(rs.getString("catagory_name"));
				obj.setStartDate(rs.getString("startdate"));
				obj.setEndDate(rs.getString("enddate"));
				obj.setStatus(rs.getString("status"));
				list.add(obj);
			}

		} catch (Exception e) {
			System.err.println("DBError: getCategoryList():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}

	public List<UserFavoritesObject> getUserFavoritesDetails(String userID,
			String categoryID) throws Exception {
		List<UserFavoritesObject> list = new ArrayList<UserFavoritesObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String queryString = " SELECT id,userid,categoryid,resourceid,rating,savedon,status,remarks "
				+ " FROM  bpi_User_favorites WHERE  userid="
				+ userID
				+ "  and categoryid =" + categoryID +" and status=1";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				UserFavoritesObject obj = new UserFavoritesObject();
				obj.setId(rs.getString("id"));
				obj.setUserID(rs.getString("userid"));
				obj.setCategoryID(rs.getString("categoryid"));
				obj.setResourceID(rs.getString("resourceid"));
				obj.setRating(rs.getString("rating"));
				obj.setSavedon(rs.getString("savedon"));
				obj.setStatus(rs.getString("status"));
				obj.setRemarks(rs.getString("remarks"));
				list.add(obj);
			}

		} catch (Exception e) {
			System.err.println("DBError: getUserFavoritesDetails():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}

	public StatusObject updateUserLoginDetails(String userID, String lastIP)
			throws Exception {
		StatusObject statusObject = new StatusObject();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String SQLQueryString = "UPDATE dbo.bpi_user SET timemodified=GETDATE(), currentlogin = GETDATE(),lastip='"
				+ lastIP + "' where id =" + userID;
		Statement statement = null;

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();
			connection.setAutoCommit(false);

			statement.addBatch(SQLQueryString); // System.out.println(SQLQueryString);

			int[] sqlExecuteCount = statement.executeBatch();
			connection.commit();

			// System.out.println(" updateUserLoginDetails -DB Status :" +
			// sqlExecuteCount[0]);

			if (sqlExecuteCount[0] >= 1) {
				statusObject.setStatusCode(0);
				statusObject.setStatusMessage("");

			} else {
				statusObject.setStatusCode(2);
				statusObject.setStatusMessage("UserLogin Details Not Updated");
			}

		} catch (Exception e) {
			System.err.println("DBError: updateUserLoginDetails() :" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			return statusObject;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;
	}

	public StatusObject updateUserLogoutDetails(String userID) throws Exception {
		StatusObject statusObject = new StatusObject();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String SQLQueryString = "UPDATE dbo.bpi_user SET lastaccess = GETDATE(),lastlogin = GETDATE() WHERE id ="
				+ userID;
		Statement statement = null;

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();
			connection.setAutoCommit(false);

			statement.addBatch(SQLQueryString); // System.out.println(SQLQueryString);

			int[] sqlExecuteCount = statement.executeBatch();
			connection.commit();
			// System.out.println(" updateUserLogoutDetails count[0] :" +
			// sqlExecuteCount[0]);

			if (sqlExecuteCount[0] >= 1) {
				statusObject.setStatusCode(0);
				statusObject.setStatusMessage("");

			} else {
				statusObject.setStatusCode(2);
				statusObject
						.setStatusMessage("UserLogout Details Not Updated ! ");
			}

		} catch (Exception e) {
			System.err.println("DBError: updateUserLogoutDetails() :" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			return statusObject;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;
	}

	public List<DashboardObject> GetDashboardPreference(String userID)
			throws Exception {
		List<DashboardObject> dashboardList = new ArrayList<DashboardObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String dashbordQueryString = "SELECT id,userID,categoryID,sortorder,savedon,remarks  FROM  dbo.bpi_user_dashboard_Preference where userid= '";
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt
					.executeQuery(dashbordQueryString + userID + "'");

			while (rs.next()) {
				DashboardObject dashboardObject = new DashboardObject();
				dashboardObject.setId(rs.getString("id"));
				dashboardObject.setUserID(rs.getString("userID"));
				dashboardObject.setCategoryID(rs.getString("categoryID"));

				dashboardObject.setSortorder(rs.getString("sortorder"));
				dashboardObject.setSavedon(rs.getString("savedon"));
				dashboardObject.setRemarks(rs.getString("remarks"));

				dashboardList.add(dashboardObject);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetDashboardPreference():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return dashboardList;
	}

	public List<VideoDetailsObject> GetVideoDetail(String userID)
			throws Exception {
		List<VideoDetailsObject> videoViewList = new ArrayList<VideoDetailsObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String videoViewQueryString = "SELECT   id,userID,resourceID,percentageviewed,viewedon,status,remarks  FROM "
				+ " dbo.bpi_user_video_view where status =1 and userID= '"
				+ userID + "'";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(videoViewQueryString);

			while (rs.next()) {
				VideoDetailsObject videoViewObject = new VideoDetailsObject();
				videoViewObject.setId(rs.getString("id"));
				videoViewObject.setUserid(rs.getString("userID"));
				videoViewObject.setResourceid(rs.getString("resourceID"));
				videoViewObject.setPercentageViewed(rs
						.getString("percentageViewed"));
				videoViewObject.setViewedon(rs.getString("viewedon"));

				videoViewObject.setStatus(rs.getString("status"));
				videoViewObject.setRemarks(rs.getString("remarks"));

				videoViewList.add(videoViewObject);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetVideoDetail():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return videoViewList;
	}

	public StatusObject setUserApproval(String userID) throws Exception {
		StatusObject statusObject = new StatusObject();
		ConnectionManager cmanager = null;
		Connection connection = null;
		Statement statement = null;

		String SQLQueryString1 = "UPDATE dbo.bpi_user SET approved = 1 , timemodified = GETDATE() where id ="
				+ userID;
		
		String SQLQueryString2 = "UPdate A SET A.status=1 , A.approved =1 FROM  dbo.bpi_organization A "
			+	"INNER JOIN dbo.bpi_user_organization_mapping B ON A.orgid = B.orgid "
			+	"INNER JOIN dbo.bpi_user C ON C.id =  B.userid "
			+	"WHERE  C.id= " + userID;
				  
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();
			connection.setAutoCommit(false);

			statement.addBatch(SQLQueryString1); // System.out.println(SQLQueryString);
			int[] sqlExecuteCount1 = statement.executeBatch();
			
			
			statement.addBatch(SQLQueryString2); // System.out.println(SQLQueryString);
			int[] sqlExecuteCount2 = statement.executeBatch();
			
			connection.commit();
			// System.out.println(" setUserApproval Status  :" +
			// sqlExecuteCount[0]);

			if (sqlExecuteCount2[0] >= 1) {
				statusObject.setStatusCode(0);
				statusObject
						.setStatusMessage("User and Organization Status Approved");

			} else {
				statusObject.setStatusCode(2);
				statusObject.setStatusMessage("User and Organization Status Not Approved or No Record(s)");
			}

		} catch (Exception e) {
			System.err.println("DBError: setUserApproval() :" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			return statusObject;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;
	}

	public StatusObject setOrganizationApproval(String orgId) throws Exception {
		StatusObject statusObject = new StatusObject();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String SQLQueryString = "UPDATE dbo.bpi_organization SET approved = 1  where  orgid ="
				+ orgId;
		Statement statement = null;
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();

			connection.setAutoCommit(false);
			statement.addBatch(SQLQueryString); // System.out.println(SQLQueryString);
			int[] sqlExecuteCount = statement.executeBatch();
			connection.commit();

			// System.out.println(" setOrganizationApproval status :" +
			// sqlExecuteCount[0]);

			if (sqlExecuteCount[0] >= 1) {
				statusObject.setStatusCode(0);
				statusObject
						.setStatusMessage("Organization  Approved status updated");

			} else {
				statusObject.setStatusCode(2);
				statusObject.setStatusMessage("Organization Approved status not updated");
			}

		} catch (Exception e) {
			System.err.println("DBError: setOrganizationApproval() :" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			return statusObject;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;
	}

	public StatusObject SaveDashboardPreference(List<DashboardObject> dashboardList )
			throws Exception { 
	 
		/*String SQLQueryString = "INSERT INTO dbo.bpi_user_dashboard_Preference  (userID ,categoryID  ,sortorder  ,savedon   ,remarks) values "
		+ " ("+ userID+ ","+ categoryID+ ","+ sortorder+ ",getDate(),'" + remarks + "')";
*/ 	  	  
		int statuscode = 0;
		String errormsg ="";
		String UserId ="";  // to be created 
		
		String dashboardString = ""; 
		DashboardObject DashObj = null; 
		
		for (int c = 0; c < dashboardList.size(); c++) { 
			DashObj = (DashboardObject) dashboardList.get(c);
			dashboardString = dashboardString + ":" + DashObj.getUserID() + "~"
					+ DashObj.getCategoryID() + "~" + DashObj.getSortorder() + "~"
					+ DashObj.getRemarks() ;
		}

		if (dashboardString.length() > 1) {
			dashboardString = dashboardString.substring(1,
					dashboardString.length());
		}

		System.out.println("dashboardString : " + dashboardString); 
		
		StatusObject statusObject = new StatusObject();
		ConnectionManager cmanager = null;
		Connection connection = null; 
		CallableStatement callableStatement = null; 
		 
		String insertStoreProc = "{call updateDashboardDetail(?,?,?)}";
		
		
		//String insertStoreProc = "{call updateUserProfile(?,?,?)}";
		 
		 
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			callableStatement = connection.prepareCall(insertStoreProc);
			
			callableStatement.registerOutParameter(1, Types.INTEGER);
			callableStatement.registerOutParameter(2, Types.VARCHAR);
			callableStatement.setString(3, dashboardString); 
			 
			callableStatement.execute();			

			statuscode = callableStatement.getInt(1);
			errormsg = callableStatement.getString(2);
			
			statusObject.setStatusCode(statuscode);
			statusObject.setStatusMessage(errormsg);
			
			System.out.println("SaveDashboardPreference : " + statusObject.getStatusMessage());

			if (callableStatement != null) {
				callableStatement.close();
			}

		} catch (Exception e) {
			System.err.println("DB Error SaveDashboardPreference" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			 
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;
	}

	public StatusObject SaveVideoDetail(String userID, String resourceID,
			String percentageviewed, String status, String remarks)
			throws Exception {
		ConnectionManager cmanager = null;
		Connection connection = null;

		String SQLUeryString = "INSERT INTO dbo.bpi_user_video_view (userID ,resourceID ,percentageviewed ,viewedon  ,status ,remarks) 	VALUES "
				+ "('"
				+ userID
				+ "','"
				+ resourceID
				+ "','"
				+ percentageviewed
				+ "' , getDate() ,1,'" + remarks + "' )";
		StatusObject statusObject = new StatusObject();
		Statement statement = null;

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();

			connection.setAutoCommit(false);
			statement.addBatch(SQLUeryString); // System.out.println(SQLUeryString);
			int[] sqlExecuteCount = statement.executeBatch();
			connection.commit();
			// System.out.println("SetVideoViewDetail() Status :" +
			// sqlExecuteCount[0]);

			if (sqlExecuteCount[0] >= 1) {
				statusObject.setStatusCode(0);
				statusObject
						.setStatusMessage("Video detail added");

			} else {
				statusObject.setStatusCode(2);
				statusObject
						.setStatusMessage("Video detail Not Added");
			}

		} catch (Exception e) {
			System.err.println("DBError: SaveVideoDetail() :" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			return statusObject;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;
	}

	/*public StatusObject SaveUserFavorites(String userId, String categoryid,
			String resourceid, String rating, String status) throws Exception {
		ConnectionManager cmanager = null;
		Connection connection = null;
		String SQLQueryString = "INSERT INTO dbo.bpi_user_favorites (userid,categoryid,resourceid,rating,savedon,status,remarks)"
				+ " VALUES ("
				+ userId
				+ ","
				+ categoryid
				+ ",'"
				+ resourceid
				+ "' ," + rating + ",getDate(),"+status+",'')";
		StatusObject statusObject = new StatusObject();
		Statement statement = null;

		System.out.println("recordCount save SaveUserFavorites: "
				+ SQLQueryString);

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();

			connection.setAutoCommit(false);

			statement.addBatch(SQLQueryString); // System.out.println(SQLQueryString);
			int[] sqlExecuteCount = statement.executeBatch();
			connection.commit();

			// System.out.println("setDashboardDetail status :" +
			// sqlExecuteCount[0]);

			if (sqlExecuteCount[0] >= 1) {
				statusObject.setStatusCode(0);
				statusObject
						.setStatusMessage("User Favorites Added");

			} else {
				statusObject.setStatusCode(2);
				statusObject
						.setStatusMessage("User Favorites Not Added");
			}

		} catch (Exception e) {
			System.err.println("DBError: SaveUserFavorites() :" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			return statusObject;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}

		return statusObject;
	}*/
	
	public StatusObject SaveUserFavorites(String userId, String categoryid,
			String resourceid, String rating, String status) throws Exception {
		StatusObject sObject = new StatusObject();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String insertStoreProc = "{call dbo.create_bpi_user_favorites(?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = null;

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			callableStatement = connection.prepareCall(insertStoreProc);
			callableStatement.setString(1, userId);
			callableStatement.setString(2, categoryid);
			callableStatement.setString(3, resourceid);
			callableStatement.setInt(4, TPUtility.getValidIntFromJSON(rating));
			callableStatement.setString(5, status);
			callableStatement.setString(6, "");
			callableStatement.registerOutParameter(7, Types.INTEGER);
			callableStatement.registerOutParameter(8, Types.VARCHAR);

			callableStatement.execute();

			int statuscode = callableStatement.getInt(7);
			String errormsg = callableStatement.getString(8);

			System.out.println("statuscode: " + statuscode);
			System.out.println("errormsg: " + errormsg);
			sObject.setStatusCode(statuscode);
			sObject.setStatusMessage(errormsg);

			if (callableStatement != null) {
				callableStatement.close();
			}

		} catch (Exception e) {
			System.err.println("DB:Error SaveUserFavorites"
					+ e.getMessage());
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_FAILURE);
			sObject.setStatusMessage(e.getMessage());
			// return 1;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		

		return sObject;
	}
	
	public List<DistributorDetailObject> GetDistributors() throws Exception {
		List<DistributorDetailObject> distributorList = new ArrayList<DistributorDetailObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String QueryString = " Select  B.orgid,B.orgname,A.address,A.city,A.state,A.country,A.zipcode, A.latitude, A.longitude, B.phone1,B.phone2,B.email,B.website"
				+ " from  bpi_organization_address_mapping C"
				+ " INNER JOIN dbo.bpi_organization_address A ON A.id = C.addressid"
				+ " INNER JOIN dbo.bpi_organization B ON B.orgid = C.organizationid"
				+ " WHERE  B.isdistributor = 1";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(QueryString);

			while (rs.next()) {
				DistributorDetailObject distributorDetailObject = new DistributorDetailObject();
				distributorDetailObject.setOrgid(rs.getString("orgid"));
				distributorDetailObject.setOrgname(rs.getString("orgname"));
				distributorDetailObject.setAddress(rs.getString("address"));
				distributorDetailObject.setCity(rs.getString("city"));
				distributorDetailObject.setState(rs.getString("state"));
				distributorDetailObject.setCountry(rs.getString("country"));
				distributorDetailObject.setZipcode(rs.getString("zipcode"));
				distributorDetailObject.setLatitude(rs.getString("latitude"));
				distributorDetailObject.setLongitude(rs.getString("longitude"));
				distributorDetailObject.setPhone1(rs.getString("phone1"));
				distributorDetailObject.setPhone2(rs.getString("phone2"));
				distributorDetailObject.setEmail(rs.getString("email"));
				distributorDetailObject.setWebsite(rs.getString("website"));
				distributorList.add(distributorDetailObject);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetDistributorList():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return distributorList;
	}
	
	public List<RoleObject> GetAllCAPRoles() throws Exception {
		List<RoleObject> roleList = new ArrayList<RoleObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String QueryString = "SELECT role_id,role_name ,role_desc,isActive FROM dbo.bpi_role where isActive = 1";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(QueryString);

			while (rs.next()) {
				RoleObject roleObject = new RoleObject();
				roleObject.setRoleID(rs.getString("role_id"));
				roleObject.setRoleName(rs.getString("role_name"));
				roleObject.setRoleDesc(rs.getString("role_desc"));
				roleObject.setIsActive(rs.getString("isActive"));
				roleList.add(roleObject);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetAllCAPRoles():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return roleList;
	}
	
	public List<CAPUserObject> GetAllCAPUsers() throws Exception {
		List<CAPUserObject> userList = new ArrayList<CAPUserObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String QueryString = "Select id,status,email,firstname,lastname from dbo.bpi_user where iscustomer = 1";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(QueryString);

			while (rs.next()) {
				CAPUserObject CAPUserObject = new CAPUserObject();
				CAPUserObject.setId(rs.getString("id"));
				CAPUserObject.setEmail(rs.getString("email"));
//				CAPUserObject.setPassword(TPUtility.decodePassword(rs.getString("password")));
				CAPUserObject.setFirstName(rs.getString("firstname"));
				CAPUserObject.setLastname(rs.getString("lastname"));
				CAPUserObject.setActiveStatus(rs.getString("status"));
				userList.add(CAPUserObject);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetAllCAPUsers():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return userList;
	}
	
	public StatusObject addCAPUser(CAPAddEditUserObject userObject)
			throws Exception {
		StatusObject sObject = new StatusObject();

		// User Insert query part
		String encryptedPassword = new Base64().encodeAsString(userObject
				.getPassword().getBytes());
		String insertUserDetail = " INSERT INTO dbo.bpi_user    (confirmed ,approved ,status  ,email  ,password ,firstname  ,lastname     ,interest_in_communication"
				+ " ,firstaccess  ,timemodified   ,keepShopPrivate   ,KeepEmployeePrivate   ,iscustomer) values "
				+ "(1, 1, 1, '"
				+ userObject.getEmail()
				+ "', '"
				+ encryptedPassword
				+ "',  '"
				+ userObject.getFirstName()
				+ "', '"
				+ userObject.getLastname()
				+ "' ,  0, getdate(), getdate(), 0, 0, 1)";

		// Customer Insert query part
		List<CustomerObject> customerObjects = userObject.getCustomer();
		CustomerObject uco = null;
		// System.out.println(" customerObject.size(): " +
		// customerObject.size());
//		int customerCount = customerObjects.size();
		String insertcustomerDetail = "";
		if (customerObjects != null && customerObjects.size() > 0) {
			insertcustomerDetail = " INSERT INTO dbo.bpi_customer (user_id  ,account_number  ,billto_site_id  ,shipto_site_id  ,status) ";

			for (int i = 0; i < customerObjects.size(); i++) {
				uco = customerObjects.get(i);
				if (i != 0) {
					insertcustomerDetail = insertcustomerDetail + "  UNION ";
				}

				insertcustomerDetail = insertcustomerDetail
						+ " SELECT  U.id ,'" + TPUtility.getValidAccountName(uco.getAccountNo()) + "', '"
						+ uco.getBillToSiteID() + "', '"
						+ uco.getShipToSiteID()
						+ "', 1 From bpi_user U WHERE U.email = '"
						+ userObject.getEmail() + "' ";

			}
		}
		System.out.println("Customer Details Insert Query: ["
				+ insertcustomerDetail + "]");

		List<RoleObject> roleObject = userObject.getRoles();
//		int roleCount = roleObject.size();
		String insertRoleMappingDetail = "";
		if (roleObject != null && roleObject.size() > 0) {
			insertRoleMappingDetail = "INSERT INTO dbo.bpi_user_role_mapping (user_id   ,role_id  ,status)";

			for (int y = 0; y < roleObject.size(); y++) {
				RoleObject role = roleObject.get(y);
				if (y != 0) {
					insertRoleMappingDetail = insertRoleMappingDetail
							+ " UNION ";
				}
				insertRoleMappingDetail = insertRoleMappingDetail
						+ " SELECT  U.id , " + role.getRoleID()
						+ ", 1 FROM bpi_user U WHERE U.email = '"
						+ userObject.getEmail() + "' ";

			}
		}
		System.out.println("Roles to be added query : "
				+ insertRoleMappingDetail);

		ConnectionManager cmanager = null;
		Connection connection = null;

		Statement statement = null;

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();
			connection.setAutoCommit(false);

			statement.addBatch(insertUserDetail);
			// System.out.println(insertUserDetail);

			if (insertcustomerDetail != null
					&& insertcustomerDetail.equals("") == false) {
				statement.addBatch(insertcustomerDetail);
				// System.out.println(insertcustomerDetail);
			}

			if (insertRoleMappingDetail != null
					&& insertRoleMappingDetail.equals("") == false) {
				statement.addBatch(insertRoleMappingDetail);
				// System.out.println(insertRoleMappingDetail);
			}

			int[] sqlExecuteCount = statement.executeBatch();
			connection.commit();

			if (sqlExecuteCount[0] == 1) {
				sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_SUCCESS);
				System.out.println("User records inserted successfully");

			} else {
				System.out.println("Failed to insert the user records");
				sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_FAILURE);
				sObject.setStatusMessage("Failed to insert the user records");
			}

		} catch (Exception e) {
			System.err.println("DBError: insertUserDetails() :" + e);
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_FAILURE);
			sObject.setStatusMessage(TPUtility.getErrorMessage(e.getMessage()));
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return sObject;
	}
	
	public StatusObject editCAPUser(CAPAddEditUserObject userObject)
			throws Exception {
		StatusObject sObject = new StatusObject();
		String encryptedPassword = new Base64().encodeAsString(userObject
				.getPassword().getBytes());

		List roles = userObject.getRoles();
		List customer = userObject.getCustomer();

		String rolesString = "";
		String customerString = "";

		RoleObject ro = null;

		// converting List to Sring for Customer Object
		for (int r = 0; r < roles.size(); r++) {
			ro = (RoleObject) roles.get(r);
			rolesString = rolesString + ":" + ro.getRoleID();
		}

		if (rolesString.length() > 1) {
			rolesString = rolesString.substring(1, rolesString.length());
		}

		// converting List to Sring for Customer Object
		CustomerObject co = null;
		for (int c = 0; c < customer.size(); c++) {
			co = (CustomerObject) customer.get(c);
			customerString = customerString + ":" + co.getUserID() + "~"
					+ co.getAccountNo() + "~" + co.getBillToSiteID() + "~"
					+ co.getShipToSiteID() + "~" + co.getStatus();
		}

		if (customerString.length() > 1) {
			customerString = customerString.substring(1,
					customerString.length());
		}

		System.out.println("userObject.getEmail(): " + userObject.getEmail());
		System.out.println("encryptedPassword: " + encryptedPassword);
		System.out.println("userObject.getFirstName(): "
				+ userObject.getFirstName());

		System.out.println("rolesString: " + rolesString);
		System.out.println("customerString: " + customerString);
		ConnectionManager cmanager = null;
		Connection connection = null;

		CallableStatement callableStatement = null;
		String insertStoreProc = "{call EditNSaveUserDetail(?,?,?,?,?,?,?,?,?,?)}";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();

			callableStatement = connection.prepareCall(insertStoreProc);
			callableStatement.setString(1, userObject.getId());
			callableStatement.setString(2, userObject.getEmail());
			callableStatement.setString(3, encryptedPassword);
			callableStatement.setString(4, userObject.getFirstName());
			callableStatement.setString(5, userObject.getLastname());
			callableStatement.setInt(6, userObject.getActiveStatus());
			callableStatement.setString(7, rolesString);
			callableStatement.setString(8, customerString);
			callableStatement.registerOutParameter(9, Types.INTEGER);
			callableStatement.registerOutParameter(10, Types.VARCHAR);

			// callableStatement
			// .setString(13, TPServerConstants.Register_LATITUDE);
			// callableStatement.setString(14,
			// TPServerConstants.Register_LONGITUDE);

			callableStatement.execute();
			// executeupdate(//;)

			int statuscode = callableStatement.getInt(9);
			String errormsg = callableStatement.getString(10);

			System.out.println("statuscode: " + statuscode);
			System.out.println("errormsg: " + errormsg);
			sObject.setStatusCode(statuscode);
			sObject.setStatusMessage(errormsg);
			// System.out.println("Organization Record inserted into DBUSER table!");
			// sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_SUCCESS);

			if (callableStatement != null) {
				callableStatement.close();
				// System.out.println("callableStatement Closed");
			}

		} catch (Exception e) {
			System.err.println("DBError: editUserDetails() :" + e);
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_FAILURE);
			sObject.setStatusMessage(TPUtility.getErrorMessage(e.getMessage()));
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return sObject;
	}
	
	public List<CAPUserObject> GetCAPUserForEmailSearch(String email) throws Exception {
		List<CAPUserObject> userList = new ArrayList<CAPUserObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String QueryString = "Select id,status,email,firstname,lastname from dbo.bpi_user where iscustomer = 1 and email LIKE CONCAT('%','";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(QueryString + email + "','%')");

			while (rs.next()) {
				CAPUserObject user = new CAPUserObject();
				user.setId(rs.getString("id"));
				user.setEmail(rs.getString("email"));
//				user.setPassword(TPUtility.decodePassword(rs.getString("password")));
				user.setFirstName(rs.getString("firstname"));
				user.setLastname(rs.getString("lastname"));
				user.setActiveStatus(rs.getString("status"));
				userList.add(user);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetCAPUserForEmailSearch():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return userList;
	}
	
	public List<CAPUserObject> GetCAPUserForBilltoShiptoSearch(String searchType, String searchString) throws Exception {
		List<CAPUserObject> userList = new ArrayList<CAPUserObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String QueryString = "select u.id, u.firstname, u.lastname, u.email, u.status from bpi_user u join bpi_customer c on c.user_id = u.id where c.billto_site_id = '";
		if(searchType.equals("S")){
			QueryString = "select u.id, u.firstname, u.lastname, u.email, u.status from bpi_user u join bpi_customer c on c.user_id = u.id where c.shipto_site_id = '";
		}

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(QueryString + searchString + "'");

			while (rs.next()) {
				CAPUserObject user = new CAPUserObject();
				user.setId(rs.getString("id"));
				user.setEmail(rs.getString("email"));
//				user.setPassword(TPUtility.decodePassword(rs.getString("password")));
				user.setFirstName(rs.getString("firstname"));
				user.setLastname(rs.getString("lastname"));
				user.setActiveStatus(rs.getString("status"));
				userList.add(user);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetCAPUserForEmailSearch():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return userList;
	}

	public List<JobTitleObject> getAllJobTitleForSingleUser(String userID) throws Exception {
		List<JobTitleObject> list = new ArrayList<JobTitleObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		
		String queryString = "Select cat.jobcategoryid,cat.JobTitle,cat.JobDescription, map.userid "
			+"from dbo.bpi_jobcategory cat "
			+	"inner join dbo.bpi_job_user_mapping map on map.jobcategoryid = cat.jobcategoryid "
			+	"Inner join dbo.bpi_user usr on map.userid = usr.id "
			+	"where  map.status=1 and usr.id = "+userID ;  

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				JobTitleObject obj = new JobTitleObject();
				obj.setId(rs.getString("jobcategoryid"));
				obj.setJobTitle(rs.getString("JobTitle"));
				obj.setJobDescription(rs.getString("JobDescription"));
				list.add(obj);
			}

		} catch (Exception e) {
			System.err.println("DB ERROR: Method GetAllJobTitleForSingleUser() : "+ e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}
	
	public List<SingleUserOrganization> getAllOrganizationForSingleUser(
			String userID) throws Exception {
		List<SingleUserOrganization> list = new ArrayList<SingleUserOrganization>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = " Select org.orgid,org.orgname,org.phone1,org.phone2,org.email,org.website,org.lang,org.isdistributor,org.remarks"
				+ " ,adr.address,	adr.city,	adr.state,	adr.country,	adr.zipcode,	adr.latitude,	adr.longitude"
				+ " from dbo.bpi_organization org"
				+ " inner join dbo.bpi_user_organization_mapping map on map.orgid = org.orgid"
				+ " Inner join dbo.bpi_user usr on map.userid = usr.id "
				+ " Inner join bpi_organization_address_mapping maporg on maporg.organizationid = org.orgid"
				+ " inner join bpi_organization_address adr ON adr.id =  maporg.addressid"
				+ " where   map.status=1 and usr.id = " + userID;

		// org.orgid,org.orgname,org.phone1,org.phone2,org.email,org.website,org.lang,org.isdistributor,org.remarks
		// ,adr.address, adr.city, adr.state, adr.country, adr.zipcode,
		// adr.latitude, adr.longitude
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				SingleUserOrganization suo = new SingleUserOrganization();
				suo.setOrgid(rs.getString("orgid"));
				suo.setOrgname(rs.getString("orgname"));
				suo.setPhone1(rs.getString("phone1"));
				suo.setPhone1(rs.getString("phone2"));
				suo.setEmail(rs.getString("email"));
				suo.setWebsite(rs.getString("website"));
				suo.setLang(rs.getString("lang"));
				suo.setIsdistributor(rs.getString("isdistributor"));
				suo.setRemarks(rs.getString("remarks"));
				suo.setAddress(rs.getString("address"));
				suo.setCity(rs.getString("city"));
				suo.setState(rs.getString("state"));
				suo.setCountry(rs.getString("country"));
				suo.setZipcode(rs.getString("zipcode"));
				suo.setLatitude(rs.getString("latitude"));
				suo.setLongitude(rs.getString("longitude"));
				list.add(suo);
			}

		} catch (Exception e) {
			System.err
					.println("DB ERROR: Method GetAllOrganizationForSingleUser() : "
							+ e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}
	
	public StatusObject updateUserOrganizationMapping(String userID,
			String orgID) throws Exception {
		StatusObject sObject = new StatusObject();
		String insertStoreProc = "{call dbo.create_bpi_user_org_mapping(?,?)}";
		CallableStatement callableStatement = null;
		ConnectionManager cmanager = null;
		Connection connection = null;

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			callableStatement = connection.prepareCall(insertStoreProc);
			callableStatement.setString(1, userID);
			callableStatement.setString(2, orgID);

			callableStatement.executeUpdate();

			if (callableStatement != null) {
				callableStatement.close();
			}
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_SUCCESS);

		} catch (Exception e) {
			System.err.println("DB:Error CreateUserOrganizationMapping"
					+ e.getMessage());
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_FAILURE);
			sObject.setStatusMessage(e.getMessage());
			// return 1;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return sObject;
	}
	
	public List<UserObject> getUnapprovedTCUsers() throws Exception {
		List<UserObject> users = new ArrayList<UserObject>();
		ConnectionManager cmanager = null;
		Connection connection = null; 

	/*	String queryString = "Select id,confirmed,approved,status,email,password,firstname,lastname,phone1,phone2"
				+ ",address,city,country,lang,remarks,interest_in_communication,timezone"
				+ ",firstaccess,lastaccess,lastlogin,currentlogin,lastip,secret,picture,url"
				+ ",description,years_of_experience,area_of_speciality,bays_in_shop,brake_jobs_in_a_month"
				+ ",list_in_find_a_shop,currently_using_raybestos_products,mailformat"
				+ ",maildisplay,htmleditor,autosubscribe,timemodified,nickname,keepShopPrivate,KeepEmployeePrivate,iscustomer, "
				+ " referedby  from dbo.bpi_user where iscustomer = 0 and approved = 0 and status = 1";*/
		
		String queryString = "Select distinct u.id,u.confirmed,u.approved,u.status,u.email,u.firstname,u.lastname,"
				+ " u.phone1,u.phone2,u.address,u.city,u.country,u.lang,u.remarks,u.interest_in_communication,"
				+ " u.timezone,u.firstaccess,u.lastaccess,u.lastlogin,u.currentlogin,u.lastip,u.secret,u.picture,url"
				+ " ,u.description,u.years_of_experience,u.area_of_speciality,u.bays_in_shop,u.brake_jobs_in_a_month"
				+ " ,u.list_in_find_a_shop,u.currently_using_raybestos_products,u.mailformat ,u.maildisplay,"
				+ " u.htmleditor,u.shopowner,u.timemodified,u.nickname,u.keepShopPrivate,u.KeepEmployeePrivate,"
				+ " u.iscustomer, u.referedby, isNull(dbo.CombineJobCatValues(u.id),'') jobtitle, isNull(dbo.CombineOrgValues(u.id),'') organization "
				+ " FROM bpi_user u where  u.iscustomer = 0 and u.approved = 0 and u.status = 1";	
		 
		System.out.println("queryString: "+queryString);
		
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				UserObject userObject = new UserObject();
				userObject.setEmail(rs.getString("email"));
//				userObject.setPassword(rs.getString("password"));
				userObject.setFirstName(rs.getString("firstname"));

				userObject.setActiveStatus(rs.getString("status"));
				userObject.setApprovedStatus(rs.getString("approved"));
				userObject.setConfirmedStatus(rs.getString("confirmed"));

				userObject.setId(rs.getString("id"));
				userObject.setLastname(rs.getString("lastname"));
				userObject.setPhone1(rs.getString("phone1"));
				userObject.setPhone2(rs.getString("phone2"));
				userObject.setAddress(rs.getString("address"));
				userObject.setCity(rs.getString("city"));
				userObject.setCountry(rs.getString("country"));
				userObject.setLang(rs.getString("lang"));
				userObject.setRemarks(rs.getString("remarks"));
				userObject.setInterest_in_communication(rs
						.getString("interest_in_communication"));
				userObject.setTimezone(rs.getString("timezone"));
				userObject.setFirstaccess(rs.getString("firstaccess"));
				userObject.setLastaccess(rs.getString("lastaccess"));
				userObject.setLastlogin(rs.getString("lastlogin"));
				userObject.setCurrentlogin(rs.getString("currentlogin"));
				userObject.setLastip(rs.getString("lastip"));
				userObject.setSecret(rs.getString("secret"));
				userObject.setPicture(rs.getString("picture"));
				userObject.setUrl(rs.getString("url"));
				userObject.setDescription(rs.getString("description"));
				userObject.setYears_of_experience(rs
						.getString("years_of_experience"));
				userObject.setArea_of_speciality(rs
						.getString("area_of_speciality"));
				userObject.setBays_in_shop(rs.getString("bays_in_shop"));
				userObject.setBrake_jobs_in_a_month(rs
						.getString("brake_jobs_in_a_month"));
				userObject.setList_in_find_a_shop(rs
						.getString("list_in_find_a_shop"));
				userObject.setCurrently_using_raybestos_products(rs
						.getString("currently_using_raybestos_products"));
				userObject.setMailformat(rs.getString("mailformat"));
				userObject.setMaildisplay(rs.getString("maildisplay"));
				userObject.setHtmleditor(rs.getString("htmleditor"));
				userObject.setShopOwner(rs.getString("shopowner"));
				userObject.setTimemodified(rs.getString("timemodified"));

				userObject.setNickname(rs.getString("nickname"));
				userObject.setKeepShopPrivate(rs.getString("keepshopprivate"));
				userObject.setKeepEmployeePrivate(rs
						.getString("Keepemployeeprivate"));
				userObject.setIscustomer(rs.getInt("iscustomer"));
				userObject.setReferedby(rs.getString("referedby"));
				userObject.setJobtitleList(TPUtility.StringToJobTitleObject(rs.getString("jobtitle")));
				userObject.setOrganizationList(TPUtility.StringToOrganizationObject(rs.getString("organization")));

				if (userObject.getLastaccess() != null
						&& userObject.getLastaccess().equals("") == false) {
					userObject
							.setIsFirstAccess(TPServerConstants.FIRSTACCESS_NO);
				}
				users.add(userObject);
			}

		} catch (Exception e) {
			System.err.println("DB ERROR: Method getUnapprovedTCUsers() : "+e.getMessage());
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return users;
	}
	
	public StatusObject SaveTipsAndTricks(String userID, String categoryID, String tipstricks, String remarks)
			throws Exception {
 
		StatusObject statusObject = new StatusObject();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String SQLQueryString = "insert into bpi_Tips_Tricks(categoryid,tipstricks,submittedOn,submittedBy,approvedStatus,remarks,Status) values "
				+ "("
				+ categoryID
				+ ",'"
				+ tipstricks
				+ "',getDate(),"
				+ userID
				+ ",0,'"
				+ remarks
				+ "',1)";

		System.out.println("SQLQueryString: " + SQLQueryString);
		Statement statement = null;
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();

			connection.setAutoCommit(false);
			statement.addBatch(SQLQueryString); 
			int[] sqlExecuteCount = statement.executeBatch();
			connection.commit();

			if (sqlExecuteCount[0] >= 1) {
				statusObject.setStatusCode(0);
				statusObject.setStatusMessage("");
			} else {
				statusObject.setStatusCode(2);
				statusObject
						.setStatusMessage("TipsnTricks Details not Saved");
			}

		} catch (Exception e) {
			System.err.println("DBError: SaveTipsAndTricks() :" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			return statusObject;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;
	}  

	public List<TipsAndTricksObject> GetTipsAndTricks(String categoryID) throws Exception {
		TipsAndTricksObject tat= null;
		ConnectionManager cmanager = null;
		Connection connection = null; 

		List<TipsAndTricksObject> tipsList = new ArrayList<TipsAndTricksObject>() ;

		String queryString = "SELECT t.id,t.categoryid,t.tipstricks,t.submittedOn,t.submittedBy,t.approvedStatus,t.approvedOn,"
				+ "t.approvedBy,t.remarks,t.updatedBy,t.updatedOn,t.status,u.email,u.firstname,u.lastname FROM  dbo.bpi_Tips_Tricks t "
				+ "join dbo.bpi_user u on t.submittedBy = u.id where categoryid = " +categoryID;
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);
		 
			while (rs.next()) {
		 
				tat = new TipsAndTricksObject();
				tat.setId(rs.getString("id"));
				tat.setCategoryid(rs.getString("categoryid"));
				tat.setTipstricks(rs.getString("tipstricks"));
				tat.setSubmittedOn(rs.getString("submittedOn"));
				tat.setSubmittedBy(rs.getString("submittedBy"));
				tat.setApprovedStatus(rs.getString("approvedStatus"));
				tat.setApprovedOn(rs.getString("approvedOn"));
				tat.setApprovedBy(rs.getString("approvedBy"));
				tat.setRemarks(rs.getString("remarks"));
				tat.setUpdatedBy(rs.getString("updatedBy"));
				tat.setUpdatedOn(rs.getString("updatedOn"))	 ;
				tat.setStatus(rs.getString("status")) ;
				tat.setEmail(rs.getString("email")) ;
				tat.setFirstname(rs.getString("firstname")) ;
				tat.setLastname(rs.getString("lastname")) ;
				tipsList.add(tat); 

			}
		} catch (Exception e) {
			System.err.println("ERROR IN DB" + e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return tipsList;
	}

	public StatusObject UpdateTipsAndTricks(String userID,String  categoryID,String tipstricks,String  submittedon, String submittedBy, String approvedon,String approvedby,String remarks  ) throws Exception {

		StatusObject statusObject = new StatusObject();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String SQLQueryString = "UPDATE dbo.bpi_Tips_Tricks SET  "
										+"tipstricks='"+tipstricks
										+"',submittedon='"+submittedon
										+"',submittedBy="+submittedBy
										+",approvedon='"+approvedon
										+"',approvedby="+approvedby
										+",remarks='"+remarks
										+"' where userid="+userID
										+" and categoryid="+categoryID ;
		
		System.out.println("SQLQueryString: "+SQLQueryString);
		Statement statement = null;
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();

			connection.setAutoCommit(false);
			statement.addBatch(SQLQueryString); // System.out.println(SQLQueryString);
			int[] sqlExecuteCount = statement.executeBatch();
			connection.commit(); 

			if (sqlExecuteCount[0] >= 1) {
				statusObject.setStatusCode(0);
				statusObject
						.setStatusMessage("Tips and Tricks Details updated"); 
			} else {
				statusObject.setStatusCode(2);
				statusObject.setStatusMessage("Tips and Tricks Details not updated");
			}

		} catch (Exception e) {
			System.err.println("DBError: UpdateTipsAndTricks() :" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			return statusObject;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;		 
	}
	
	public List<DistributorDetailObject> GetAllDistributorByCity(String city) throws Exception {
		List<DistributorDetailObject> distributorList = new ArrayList<DistributorDetailObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String QueryString = "Select B.orgid,B.orgname,A.address,A.city,A.state,A.country,A.zipcode,A.latitude, A.longitude,B.phone1,B.phone2,B.email,B.website"
				+ " from  bpi_organization_address_mapping C"
				+ " INNER JOIN dbo.bpi_organization_address A ON A.id = C.addressid"
				+ " INNER JOIN dbo.bpi_organization B ON B.orgid = C.organizationid"
				+ " WHERE  B.isdistributor = 1 and A.city = '"+city+"'";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(QueryString);

			while (rs.next()) {
				DistributorDetailObject distributorDetailObject = new DistributorDetailObject();
				distributorDetailObject.setOrgid(rs.getString("orgid"));
				distributorDetailObject.setOrgname(rs.getString("orgname"));
				distributorDetailObject.setAddress(rs.getString("address"));
				distributorDetailObject.setCity(rs.getString("city"));
				distributorDetailObject.setState(rs.getString("state"));
				distributorDetailObject.setCountry(rs.getString("country"));
				distributorDetailObject.setZipcode(rs.getString("zipcode"));
				distributorDetailObject.setLatitude(rs.getString("latitude"));
				distributorDetailObject.setLongitude(rs.getString("longitude"));
				distributorDetailObject.setPhone1(rs.getString("phone1"));
				distributorDetailObject.setPhone2(rs.getString("phone2"));
				distributorDetailObject.setEmail(rs.getString("email"));
				distributorDetailObject.setWebsite(rs.getString("website"));
				distributorList.add(distributorDetailObject);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetAllDistributorByCity():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return distributorList;
	}
	public List<DistributorDetailObject> GetAllDistributorByZipcode(String zipcode) throws Exception {
		List<DistributorDetailObject> distributorList = new ArrayList<DistributorDetailObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String QueryString = "Select B.orgid,B.orgname,A.address,A.city,A.state,A.country,A.zipcode,A.latitude, A.longitude,B.phone1,B.phone2,B.email,B.website"
				+ " from  bpi_organization_address_mapping C"
				+ " INNER JOIN dbo.bpi_organization_address A ON A.id = C.addressid"
				+ " INNER JOIN dbo.bpi_organization B ON B.orgid = C.organizationid"
				+ " WHERE  B.isdistributor = 1 and A.zipcode = '"+zipcode+"'";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(QueryString);

			while (rs.next()) {
				DistributorDetailObject distributorDetailObject = new DistributorDetailObject();
				distributorDetailObject.setOrgid(rs.getString("orgid"));
				distributorDetailObject.setOrgname(rs.getString("orgname"));
				distributorDetailObject.setAddress(rs.getString("address"));
				distributorDetailObject.setCity(rs.getString("city"));
				distributorDetailObject.setState(rs.getString("state"));
				distributorDetailObject.setCountry(rs.getString("country"));
				distributorDetailObject.setZipcode(rs.getString("zipcode"));
				distributorDetailObject.setLatitude(rs.getString("latitude"));
				distributorDetailObject.setLongitude(rs.getString("longitude"));
				distributorDetailObject.setPhone1(rs.getString("phone1"));
				distributorDetailObject.setPhone2(rs.getString("phone2"));
				distributorDetailObject.setEmail(rs.getString("email"));
				distributorDetailObject.setWebsite(rs.getString("website"));
				distributorList.add(distributorDetailObject);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetAllDistributorByZipcode():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return distributorList;
	}

	public DistributorDetailObject GetDistributor(String id) throws Exception {
		DistributorDetailObject distributorDetailObject = null;
		ConnectionManager cmanager = null;
		Connection connection = null;

		String QueryString = " Select  B.orgid,B.orgname,A.address,A.city,A.state,A.country,A.zipcode, A.latitude, A.longitude, B.phone1,B.phone2,B.email,B.website"
				+ " from  bpi_organization_address_mapping C"
				+ " INNER JOIN dbo.bpi_organization_address A ON A.id = C.addressid"
				+ " INNER JOIN dbo.bpi_organization B ON B.orgid = C.organizationid"
				+ " WHERE  B.isdistributor = 1 and B.orgid = '"+id+"'";

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(QueryString);

			while (rs.next()) {
				distributorDetailObject = new DistributorDetailObject();
				distributorDetailObject.setOrgid(rs.getString("orgid"));
				distributorDetailObject.setOrgname(rs.getString("orgname"));
				distributorDetailObject.setAddress(rs.getString("address"));
				distributorDetailObject.setCity(rs.getString("city"));
				distributorDetailObject.setState(rs.getString("state"));
				distributorDetailObject.setCountry(rs.getString("country"));
				distributorDetailObject.setZipcode(rs.getString("zipcode"));
				distributorDetailObject.setLatitude(rs.getString("latitude"));
				distributorDetailObject.setLongitude(rs.getString("longitude"));
				distributorDetailObject.setPhone1(rs.getString("phone1"));
				distributorDetailObject.setPhone2(rs.getString("phone2"));
				distributorDetailObject.setEmail(rs.getString("email"));
				distributorDetailObject.setWebsite(rs.getString("website"));
			}
		} catch (Exception e) {
			System.err.println("DBError: GetDistributor():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return distributorDetailObject;
	}
	
	public List<TipsAndTricksObject> GetUnapprovedTipsNTricks(String categoryID) throws Exception {
		TipsAndTricksObject tat= null;
		ConnectionManager cmanager = null;
		Connection connection = null; 

		List<TipsAndTricksObject> tipsList = new ArrayList<TipsAndTricksObject>() ;

		String queryString = "SELECT t.id,t.categoryid,t.tipstricks,t.submittedOn,t.submittedBy,t.approvedStatus,t.approvedOn,"
				+ "t.approvedBy,t.remarks,t.updatedBy,t.updatedOn,t.status,u.email,u.firstname,u.lastname FROM  dbo.bpi_Tips_Tricks t "
				+ "join dbo.bpi_user u on t.submittedBy=u.id where approvedStatus = 0 and categoryid = " +categoryID;

		
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);
		 
			while (rs.next()) {
		 
				tat = new TipsAndTricksObject();
				tat.setId(rs.getString("id"));
				tat.setCategoryid(rs.getString("categoryid"));
				tat.setTipstricks(rs.getString("tipstricks"));
				tat.setSubmittedOn(rs.getString("submittedOn"));
				tat.setSubmittedBy(rs.getString("submittedBy"));
				tat.setApprovedStatus(rs.getString("approvedStatus"));
				tat.setApprovedOn(rs.getString("approvedOn"));
				tat.setApprovedBy(rs.getString("approvedBy"));
				tat.setRemarks(rs.getString("remarks"));
				tat.setUpdatedBy(rs.getString("updatedBy"));
				tat.setUpdatedOn(rs.getString("updatedOn"))	 ;
				tat.setStatus(rs.getString("status"));
				tat.setEmail(rs.getString("email")) ;
				tat.setFirstname(rs.getString("firstname")) ;
				tat.setLastname(rs.getString("lastname")) ;
				tipsList.add(tat); 

			}
		} catch (Exception e) {
			System.err.println("ERROR IN DB" + e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return tipsList;
	}
	
	public StatusObject TipsAndTricksApproval(String approvedStatus, String ID,String userID, String reference, String remarks ) throws Exception {
		StatusObject statusObject = new StatusObject();
		ConnectionManager cmanager = null;
		Connection connection = null;
		
		String approvedDescription = TPServerConstants.TIPS_TRICKS_STATUS.get(approvedStatus);
		
		String SQLQueryString = "UPDATE dbo.bpi_Tips_Tricks SET"
				+ " approvedStatus=" + approvedStatus + ", approvedDescription='"
				+ approvedDescription + "', approvedOn=getDate()"
				+ ", approvedBy=" + userID + ", reference='" + reference
				+ "', remarks='" + remarks + "', UpdatedBy=" + userID
				+ ", UpdatedOn=getDate()" + " where id=" + ID;
		
//		System.out.println("SQLQueryString: "+SQLQueryString);
		Statement statement = null;
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();

			connection.setAutoCommit(false);
			statement.addBatch(SQLQueryString); 
			int[] sqlExecuteCount = statement.executeBatch();
			connection.commit(); 

			if (sqlExecuteCount[0] >= 1) {
				statusObject.setStatusCode(0);
				statusObject
						.setStatusMessage("TipsAndTricksApproval Details updated"); 
			} else {
				statusObject.setStatusCode(2);
				statusObject.setStatusMessage("TipsAndTricksApproval Details not updated");
			}

		} catch (Exception e) {
			System.err.println("DBError: TipsAndTricksApproval() :" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			return statusObject;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;		 
	}  
	 
	public List<UserObject> GETAllTPActiveUsers() throws Exception {
		List<UserObject> users = new ArrayList<UserObject>();
		ConnectionManager cmanager = null;
		Connection connection = null; 
		 
		String queryString = "Select distinct u.id,u.confirmed,u.approved,u.status,u.email,u.firstname,u.lastname,"
				+ " u.phone1,u.phone2,u.address,u.city,u.country,u.lang,u.remarks,u.interest_in_communication,"
				+ " u.timezone,u.firstaccess,u.lastaccess,u.lastlogin,u.currentlogin,u.lastip,u.secret,u.picture,url"
				+ " ,u.description,u.years_of_experience,u.area_of_speciality,u.bays_in_shop,u.brake_jobs_in_a_month"
				+ " ,u.list_in_find_a_shop,u.currently_using_raybestos_products,u.mailformat ,u.maildisplay,"
				+ " u.htmleditor,u.shopowner,u.timemodified,u.nickname,u.keepShopPrivate,u.KeepEmployeePrivate,"
				+ " u.iscustomer, u.referedby, isNull(dbo.CombineJobCatValues(u.id),'') jobtitle, isNull(dbo.CombineOrgValues(u.id),'') organization "
				+ " FROM bpi_user u where  u.iscustomer = 0 and  u.confirmed = 1 and u.approved = 1 and u.status = 1";	
		 
		System.out.println("queryString: "+queryString);
		
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				UserObject userObject = new UserObject();
				userObject.setEmail(rs.getString("email")); 
				userObject.setFirstName(rs.getString("firstname"));

				userObject.setActiveStatus(rs.getString("status"));
				userObject.setApprovedStatus(rs.getString("approved"));
				userObject.setConfirmedStatus(rs.getString("confirmed"));

				userObject.setId(rs.getString("id"));
				userObject.setLastname(rs.getString("lastname"));
				userObject.setPhone1(rs.getString("phone1"));
				userObject.setPhone2(rs.getString("phone2"));
				userObject.setAddress(rs.getString("address"));
				userObject.setCity(rs.getString("city"));
				userObject.setCountry(rs.getString("country"));
				userObject.setLang(rs.getString("lang"));
				userObject.setRemarks(rs.getString("remarks"));
				userObject.setInterest_in_communication(rs
						.getString("interest_in_communication"));
				userObject.setTimezone(rs.getString("timezone"));
				userObject.setFirstaccess(rs.getString("firstaccess"));
				userObject.setLastaccess(rs.getString("lastaccess"));
				userObject.setLastlogin(rs.getString("lastlogin"));
				userObject.setCurrentlogin(rs.getString("currentlogin"));
				userObject.setLastip(rs.getString("lastip"));
				userObject.setSecret(rs.getString("secret"));
				userObject.setPicture(rs.getString("picture"));
				userObject.setUrl(rs.getString("url"));
				userObject.setDescription(rs.getString("description"));
				userObject.setYears_of_experience(rs
						.getString("years_of_experience"));
				userObject.setArea_of_speciality(rs
						.getString("area_of_speciality"));
				userObject.setBays_in_shop(rs.getString("bays_in_shop"));
				userObject.setBrake_jobs_in_a_month(rs
						.getString("brake_jobs_in_a_month"));
				userObject.setList_in_find_a_shop(rs
						.getString("list_in_find_a_shop"));
				userObject.setCurrently_using_raybestos_products(rs
						.getString("currently_using_raybestos_products"));
				userObject.setMailformat(rs.getString("mailformat"));
				userObject.setMaildisplay(rs.getString("maildisplay"));
				userObject.setHtmleditor(rs.getString("htmleditor"));
				userObject.setShopOwner(rs.getString("shopowner"));
				userObject.setTimemodified(rs.getString("timemodified"));

				userObject.setNickname(rs.getString("nickname"));
				userObject.setKeepShopPrivate(rs.getString("keepshopprivate"));
				userObject.setKeepEmployeePrivate(rs
						.getString("Keepemployeeprivate"));
				userObject.setIscustomer(rs.getInt("iscustomer"));
				userObject.setReferedby(rs.getString("referedby"));
				userObject.setJobtitleList(TPUtility.StringToJobTitleObject(rs.getString("jobtitle")));
				userObject.setOrganizationList(TPUtility.StringToOrganizationObject(rs.getString("organization")));

				if (userObject.getLastaccess() != null
						&& userObject.getLastaccess().equals("") == false) {
					userObject
							.setIsFirstAccess(TPServerConstants.FIRSTACCESS_NO);
				}
				users.add(userObject);
			} 
		} catch (Exception e) {
			System.err.println("DB ERROR: Method GETAllTPActiveUsers() : "+e.getMessage()); 
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return users;
	}

	public TipsAndTricksObject GetTipsnTricks(String id) throws Exception {
		TipsAndTricksObject tat = null;
		ConnectionManager cmanager = null;
		Connection connection = null;

		String queryString = "SELECT id,categoryid,tipstricks,submittedOn,submittedBy,approvedStatus,approvedOn,approvedBy,"
				+ "remarks,updatedBy,updatedOn,status FROM  dbo.bpi_Tips_Tricks where id=" + id;
		
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				tat = new TipsAndTricksObject();
				tat.setId(rs.getString("id"));
				tat.setCategoryid(rs.getString("categoryid"));
				tat.setTipstricks(rs.getString("tipstricks"));
				tat.setSubmittedOn(rs.getString("submittedOn"));
				tat.setSubmittedBy(rs.getString("submittedBy"));
				tat.setApprovedStatus(rs.getString("approvedStatus"));
				tat.setApprovedOn(rs.getString("approvedOn"));
				tat.setApprovedBy(rs.getString("approvedBy"));
				tat.setRemarks(rs.getString("remarks"));
				tat.setUpdatedBy(rs.getString("updatedBy"));
				tat.setUpdatedOn(rs.getString("updatedOn"))	 ;
				tat.setStatus(rs.getString("status")) ;
			}

		} catch (Exception e) {
			System.err.println("DBError: GETAllTipsNTricks():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return tat;
	} 
 
	
	public StatusObject SaveUserFavoritePlace(String userID,
			String favoriteplace, String status) throws Exception {

		StatusObject statusObject = new StatusObject();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String SQLQueryString = "insert into bpi_user_favorites_place(userid,favoriteplace,savedon,status,remarks) values "
				+ "("
				+ userID
				+ ",'"
				+ favoriteplace
				+ "',getDate(),"
				+ status
				+ ",'')";

		System.out.println("SQLQueryString: " + SQLQueryString);
		Statement statement = null;
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();

			connection.setAutoCommit(false);
			statement.addBatch(SQLQueryString); // System.out.println(SQLQueryString);
			int[] sqlExecuteCount = statement.executeBatch();
			connection.commit();

			if (sqlExecuteCount[0] >= 1) {
				statusObject.setStatusCode(0);
				statusObject.setStatusMessage("");
			} else {
				statusObject.setStatusCode(2);
				statusObject
						.setStatusMessage("UserFavoritePlace Details not Saved");
			}

		} catch (Exception e) {
			System.err.println("DBError: SaveUserFavoritePlace() :" + e);
			statusObject.setStatusCode(1);
			statusObject.setStatusMessage(e.getMessage());
			return statusObject;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return statusObject;
	}
	
	public List<UserFavoritePlaceObject> GetUserFavoritePlace(String userID)
			throws Exception {
		List<UserFavoritePlaceObject> list = new ArrayList<UserFavoritePlaceObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String queryString = " SELECT id,userid,favoriteplace,savedon,status,remarks FROM dbo.bpi_user_favorites_place where status=1 and  userid = "
				+ userID;

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				UserFavoritePlaceObject obj = new UserFavoritePlaceObject();
				obj.setId(rs.getString("id"));
				obj.setUserid(rs.getString("userid"));
				obj.setFavoriteplace(rs.getString("favoriteplace"));
				obj.setSavedOn(rs.getString("savedon"));
				obj.setStatus(rs.getString("status"));
				obj.setRemarks(rs.getString("remarks"));
				list.add(obj);
			}

		} catch (Exception e) {
			System.err.println("DBError: GetUserFavoritePlace():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}
	
	public StatusObject SaveRewardPrograms(String programname,
			String programdesc, String createdby) throws Exception {

		StatusObject sObject = new StatusObject();
		Statement statement = null;
		ConnectionManager cmanager = null;
		Connection connection = null;

		String SQL1 = " INSERT INTO dbo.bpi_rewards_programs (program_name, program_desc, status, remarks, createdby, createddate)"
				+ " VALUES('"
				+ programname
				+ "','"
				+ programdesc
				+ "',1,'',"
				+ createdby + ",getDate())";
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();
			connection.setAutoCommit(false);

			statement.addBatch(SQL1);
			System.out.println(SQL1);
			int[] count = statement.executeBatch();

			connection.commit();
			System.out.println("count[0] :" + count[0]);

			if (statement != null) {
				statement.close();
			}

			if (count[0] >= 1) {
				sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_SUCCESS);
				sObject.setStatusMessage("");
			} else {
				sObject.setStatusCode(2);
				sObject.setStatusMessage("Reward Programs not saved");
			}

		} catch (Exception e) {
			System.err.println("DBError in SaveRewardPrograms():"
					+ e.getMessage());
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_FAILURE);
			sObject.setStatusMessage(e.getMessage());
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return sObject;
	}

	public List<RewardProgramsObject> GetRewardPrograms(String programid)
			throws Exception {

		List<RewardProgramsObject> list = new ArrayList<RewardProgramsObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = "";

		if (programid == null || "".equals(programid) || programid.equals("-1")) {
			queryString = "SELECT id, program_name, program_desc, status, remarks, createdby, createddate, modifiedby, modifieddate"
					+ " FROM dbo.bpi_rewards_programs where status = 1";
		} else {
			queryString = "SELECT id, program_name, program_desc, status, remarks, createdby, createddate, modifiedby, modifieddate"
					+ "  FROM dbo.bpi_rewards_programs where status = 1 and id ="
					+ programid;
		}
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				RewardProgramsObject obj = new RewardProgramsObject();
				obj.setId(rs.getString("id"));
				obj.setProgramName(rs.getString("program_name"));
				obj.setProgramDesc(rs.getString("program_desc"));
				obj.setStatus(rs.getString("status"));
				obj.setRemarks(rs.getString("remarks"));
				obj.setCreatedBy(rs.getString("createdby"));
				obj.setCreatedDate(rs.getString("createddate"));
				obj.setModifiedBy(rs.getString("modifiedby"));
				obj.setModifiedDate(rs.getString("modifieddate"));
				list.add(obj);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetRewardPrograms():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}

	public StatusObject SaveRewardEvents(String programid, String eventname,
			String eventdesc, String startdate, String enddate,
			String eventpoints, String approvalrequired, String createdby)
			throws Exception {

		StatusObject sObject = new StatusObject();
		Statement statement = null;
		ConnectionManager cmanager = null;
		Connection connection = null;

		String SQL1 = " INSERT INTO dbo.bpi_rewards_events (programid, eventname, eventdesc, startdate, enddate, eventpoints, "
				+ "approvalrequired, status, remarks, createdby, createddate)"
				+ " VALUES("
				+ programid
				+ ",'"
				+ eventname
				+ "','"
				+ eventdesc
				+ "','"
				+ startdate
				+ "','"
				+ enddate
				+ "',"
				+ eventpoints
				+ ","
				+ approvalrequired
				+ ",1,'',"
				+ createdby
				+ " ,getDate())";
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();
			connection.setAutoCommit(false);

			statement.addBatch(SQL1); // System.out.println(SQL1);
			int[] count = statement.executeBatch();

			connection.commit();
			// System.out.println("count[0] :" + count[0]);

			if (statement != null) {
				statement.close();
			}

			if (count[0] >= 1) {
				sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_SUCCESS);
				sObject.setStatusMessage("");
			} else {
				sObject.setStatusCode(2);
				sObject.setStatusMessage("RewardPrograms not Saved");
			}

		} catch (Exception e) {
			System.err.println("DBError in SaveRewardEvents()");
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_FAILURE);
			sObject.setStatusMessage(e.getMessage());
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return sObject;
	}

	public List<RewardEventsObject> GetRewardEvents(String eventid)
			throws Exception {

		List<RewardEventsObject> list = new ArrayList<RewardEventsObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = "";

		if (eventid == null || "".equals(eventid) || eventid.equals("-1")) {
			queryString = "SELECT id, programid, eventname, eventdesc, startdate, enddate, eventpoints, approvalrequired, status, remarks, "
					+ "createdby, createddate, modifiedby, modifieddate FROM dbo.bpi_rewards_events where status=1";

		} else {
			queryString = "SELECT id, programid, eventname, eventdesc, startdate, enddate, eventpoints, approvalrequired, status, remarks, "
					+ "createdby, createddate, modifiedby, modifieddate FROM dbo.bpi_rewards_events where status=1 and id ="
					+ eventid;
		}

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				RewardEventsObject obj = new RewardEventsObject();
				obj.setId(rs.getString("id"));
				obj.setProgramId(rs.getString("programid"));
				obj.setEventName(rs.getString("eventname"));
				obj.setEventDesc(rs.getString("eventdesc"));
				obj.setStartDate(rs.getString("startdate"));
				obj.setEndDate(rs.getString("enddate"));
				obj.setEventPoints(rs.getString("eventpoints"));
				obj.setApprovalRequired(rs.getString("approvalrequired"));
				obj.setStatus(rs.getString("status"));
				obj.setRemarks(rs.getString("remarks"));
				obj.setCreatedBy(rs.getString("createdby"));
				obj.setCreatedDate(rs.getString("createddate"));
				obj.setModifiedBy(rs.getString("modifiedby"));
				obj.setModifiedDate(rs.getString("modifieddate"));
				list.add(obj);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetRewardPoints():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}

	public StatusObject SaveRewardTransaction(String userid,
			String categorycode, String categoryname, String eventtype,
			String eventpoints, String approvalrequired) throws Exception {
		StatusObject sObject = new StatusObject();
		Statement statement = null;
		ConnectionManager cmanager = null;
		Connection connection = null;

		String approvalstatus = "9";
		String approvedPoints = eventpoints;
		if (approvalrequired.equals("1")) {
			approvalstatus = "0";
			approvedPoints = "0";
		}

		String SQL1 = "insert into  dbo.bpi_rewards_transaction (categorycode, categoryname, userid, eventtype, eventdate, eventpoints, "
				+ "approvalrequired, approvalstatus, approvedpoints, approvedby, status, remarks) values ("
				+ categorycode
				+ ",'"
				+ categoryname
				+ "',"
				+ userid
				+ ","
				+ eventtype
				+ ",getDate(), "
				+ eventpoints
				+ ","
				+ approvalrequired
				+ ","
				+ approvalstatus
				+ ","
				+ approvedPoints + ",NULL,1,'')";
		System.out.println(SQL1);

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();
			connection.setAutoCommit(false);

			statement.addBatch(SQL1); // System.out.println(SQL1);
			int[] count = statement.executeBatch();

			connection.commit();
			// System.out.println("count[0] :" + count[0]);

			if (statement != null) {
				statement.close();
			}

			if (count[0] >= 1) {
				sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_SUCCESS);
				sObject.setStatusMessage("");
			} else {
				sObject.setStatusCode(2);
				sObject.setStatusMessage("Reward Transaction not saved");
			}

		} catch (Exception e) {
			System.err.println("DBError in SaveRewardTransaction()");
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_FAILURE);
			sObject.setStatusMessage(e.getMessage());
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return sObject;
	}

	public StatusObject UpdateRewardApprovalStatus(String transactionID,
			String points, String approvedStatus, String userid)
			throws Exception {

		StatusObject sObject = new StatusObject();
		Statement statement = null;
		ConnectionManager cmanager = null;
		Connection connection = null;

		String SQL = "update dbo.bpi_rewards_transaction SET approvalstatus ="
				+ approvedStatus + ", approvedpoints =" + points
				+ ",	approvedby =" + userid + ",	approveddate = GETDATE() "
				+ " where  ID = " + transactionID;

		System.out.println("SQL1: " + SQL);

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			statement = connection.createStatement();
			connection.setAutoCommit(false);

			statement.addBatch(SQL); // System.out.println(SQL1);
			int[] count = statement.executeBatch();

			connection.commit();
			// System.out.println("count[0] :" + count[0]);

			if (statement != null) {
				statement.close();
			}

			if (count[0] >= 1) {
				sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_SUCCESS);
				sObject.setStatusMessage("");
			} else {
				sObject.setStatusCode(2);
				sObject.setStatusMessage("Rewards Approval not saved");
			}

		} catch (Exception e) {
			System.err.println("DBError in UpdateRewardApprovalStatus()");
			sObject.setStatusCode(TPServerConstants.QUERY_EXECUTION_FAILURE);
			sObject.setStatusMessage(e.getMessage());
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return sObject;
	}

	public List<RewardTransactionObject> GetRewardPendingApproval(String userid)
			throws Exception {

		List<RewardTransactionObject> list = new ArrayList<RewardTransactionObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = "SELECT id,categorycode,categoryname,userid,eventtype,eventdate,eventpoints,approvalrequired,approvalstatus,approvedpoints"
				+ ",approvedby,approveddate,status,remarks FROM dbo.bpi_rewards_transaction where status=1 and approvalstatus=0 ";

		if (userid.equals("-1") == false) {
			queryString = "SELECT id,categorycode,categoryname,userid,eventtype,eventdate,eventpoints,approvalrequired,approvalstatus,approvedpoints"
					+ ",approvedby,approveddate,status,remarks FROM dbo.bpi_rewards_transaction where status=1 and approvalstatus=0and userid="
					+ userid;
		}

		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				RewardTransactionObject obj = new RewardTransactionObject();
				obj.setId(rs.getString("id"));
				obj.setCategoryCode(rs.getString("categorycode"));
				obj.setCategoryName(rs.getString("categoryname"));
				obj.setUserID(rs.getString("userid"));
				obj.setEventType(rs.getString("eventtype"));
				obj.setEventDate(rs.getString("eventdate"));
				obj.setEventPoints(rs.getString("eventpoints"));

				obj.setApprovalRequired(rs.getString("approvalrequired"));
				obj.setApprovalStatus(rs.getString("approvalstatus"));
				obj.setApprovedPoints(rs.getString("approvedpoints"));
				obj.setApprovedBy(rs.getString("approvedby"));
				obj.setApprovedDate(rs.getString("approveddate"));

				obj.setStatus(rs.getString("status"));
				obj.setRemarks(rs.getString("remarks"));

				list.add(obj);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetRewardPoints():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}
	
	public List<RewardTransactionObject> GetRewardTransactionForPeriod(
			String userid, String fromdate, String todate) throws Exception {
		List<RewardTransactionObject> list = new ArrayList<RewardTransactionObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;
		String queryString = "SELECT id, categorycode, categoryname, userid, eventtype, convert(varchar(20),eventdate,105) eventdate, eventpoints, approvalrequired, approvalstatus,"
				+ " approvedpoints, approvedby, REPLACE(ISNULL(CONVERT(DATE, approveddate), ''), '1900-01-01', '') approveddate, status, remarks FROM dbo.bpi_rewards_transaction where status=1 and userid="
				+ userid
				+ " and eventdate >= '"
				+ fromdate
				+ "' and eventdate <= '" + todate + "'";
		System.out.println(queryString);
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				RewardTransactionObject obj = new RewardTransactionObject();
				obj.setId(rs.getString("id"));
				obj.setCategoryCode(rs.getString("categorycode"));
				obj.setCategoryName(rs.getString("categoryname"));
				obj.setUserID(rs.getString("userid"));
				obj.setEventType(rs.getString("eventtype"));
				obj.setEventDate(rs.getString("eventdate"));
				obj.setEventPoints(rs.getString("eventpoints"));

				obj.setApprovalRequired(rs.getString("approvalrequired"));
				obj.setApprovalStatus(rs.getString("approvalstatus"));
				obj.setApprovedPoints(rs.getString("approvedpoints"));
				obj.setApprovedBy(rs.getString("approvedby"));
				obj.setApprovedDate(rs.getString("approveddate"));

				obj.setStatus(rs.getString("status"));
				obj.setRemarks(rs.getString("remarks"));

				list.add(obj);
			}
		} catch (Exception e) {
			System.err.println("DBError: GetRewardTransactionForPeriod():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}

	public RewardSummaryObject GetRewardSummary(String userid) throws Exception {
		ConnectionManager cmanager = null;
		Connection connection = null;
		RewardSummaryObject obj = null;
		String queryString = "SELECT sum(Case when ( approvalstatus=1 OR approvalstatus=9 ) THEN approvedpoints ELSE 0 END) totalPoints,  "
				+ "sum(Case when approvalstatus=0 THEN eventpoints ELSE 0 END) pendingPoints, "
				+ "SUM(Case when eventtype=0 and ( approvalstatus=1 OR approvalstatus=9 ) THEN approvedpoints ELSE 0 END) - "
				+ "SUM(Case when eventtype=1 and ( approvalstatus=1 OR approvalstatus=9 ) THEN approvedpoints ELSE 0 END) currentpoints "
				// + ", dbo.CombineRewardPoints(" + userid + ") rewardList "
				+ "FROM dbo.bpi_rewards_transaction where status=1 and userid="
				+ userid + " group by userid ";

		System.out.println(queryString);
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				obj = new RewardSummaryObject();
				obj.setTotalPoints(rs.getString("totalPoints"));
				obj.setPendingPoints(rs.getString("pendingPoints"));
				obj.setCurrentPoints(rs.getString("currentPoints"));
			}
		} catch (Exception e) {
			System.err.println("DBError: GetRewardSummary():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return obj;
	}
	
	public List<RewardTransactionObject> GetRewardSummaryList(String userid)
			throws Exception { 
		List<RewardTransactionObject> list = new ArrayList<RewardTransactionObject>();
		ConnectionManager cmanager = null;
		Connection connection = null;

		String queryString = "SELECT id, categorycode, categoryname, userid, eventtype, eventdate, eventpoints, approvalrequired"
				+ ",approvalstatus, approvedpoints, approvedby, approveddate, status, remarks "
				+ "FROM dbo.bpi_rewards_transaction where status=1 and ( approvalstatus=1  OR approvalstatus=9) and userid="
				+ userid + " order by userid ";

		System.out.println(queryString);
		try {
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			Statement stmt = connection.createStatement();
			ResultSet rs = stmt.executeQuery(queryString);

			while (rs.next()) {
				RewardTransactionObject obj = new RewardTransactionObject();
				obj.setId(rs.getString("id"));
				obj.setCategoryCode(rs.getString("categorycode"));
				obj.setCategoryName(rs.getString("categoryname"));
				obj.setUserID(rs.getString("userid"));
				obj.setEventType(rs.getString("eventtype"));
				obj.setEventDate(rs.getString("eventdate"));
				obj.setEventPoints(rs.getString("eventpoints"));
				obj.setApprovalRequired(rs.getString("approvalrequired"));
				obj.setApprovalStatus(rs.getString("approvalstatus"));
				obj.setApprovedPoints(rs.getString("approvedpoints"));
				obj.setApprovedBy(rs.getString("approvedby"));
				obj.setApprovedDate(rs.getString("approveddate"));
				obj.setStatus(rs.getString("status"));
				obj.setRemarks(rs.getString("remarks"));
				list.add(obj);
			}
		} catch (Exception e) {
			System.err.println("DBError: RewardSummaryList():" + e);
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return list;
	}
	
	public StatusObject addPromoBusinessDetail(PromoBusinessDetailsObject businessObject)
 throws Exception {

		ConnectionManager cmanager = null;
		Connection connection = null;
		CallableStatement callableStatement = null;

		StatusObject statusObject = new StatusObject();
		
		String insertStoreProc = "{call create_bpi_promo_businessrecord(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

		System.out.println("Business Details Object received : "
				+ businessObject);
		try {
//			String uniqueCode = TPUtility.generateUniqueCode(
//					businessObject.getPromoID(), businessObject.getFirstName());
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			callableStatement = connection.prepareCall(insertStoreProc);

			callableStatement.registerOutParameter(1, Types.INTEGER);
			callableStatement.registerOutParameter(2, Types.VARCHAR);
			callableStatement.setString(3, businessObject.getPromoID());
			callableStatement.setString(4, businessObject.getPromoName());
			callableStatement.setString(5, businessObject.getFirstName());
			callableStatement.setString(6, businessObject.getLastname());
			callableStatement.setString(7, businessObject.getEmail());
			callableStatement.setString(8, businessObject.getBusinessName());
			callableStatement.setString(9, businessObject.getOwnersName());
			callableStatement.setString(10, businessObject.getAddress1());
			callableStatement.setString(11, businessObject.getAddress2());
			callableStatement.setString(12, businessObject.getCity());
			callableStatement.setString(13, businessObject.getState());
			callableStatement.setString(14, businessObject.getZipCode());
			callableStatement.setString(15, businessObject.getCountry());
			callableStatement.setString(16, businessObject.getPhoneNo());
			callableStatement.setString(17, businessObject.getWebsite());
			callableStatement.setInt(18,
					businessObject.getReceiveCommunications());
			callableStatement.setString(19, businessObject.getRemarks());

			callableStatement.execute();

			statusObject.setStatusCode(callableStatement.getInt(1));
			statusObject.setStatusMessage(callableStatement.getString(2));

			System.out.println("addPromoBusinessDetail : "
					+ statusObject.getStatusMessage());

			if (callableStatement != null) {
				callableStatement.close();
			}

		} catch (Exception e) {
			System.err.println("DBError: addPromoBusinessDetail() :" + e);
			statusObject.setStatusCode(2);
			statusObject.setStatusMessage(e.getMessage());
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return statusObject;
	}

	public StatusObject addPRIPromoDetail(PRIPromoDetailsObject businessObject)
			throws Exception {

		ConnectionManager cmanager = null;
		Connection connection = null;
		CallableStatement callableStatement = null;

		StatusObject statusObject = new StatusObject();

		String insertStoreProc = "{call Create_bpi_PRIPromotionRecord(?,?,?,?,?,?,?,?,?,?,?)}";

		System.out.println("PRI Promo Business Details Object received : "
				+ businessObject);
		try {
			// String uniqueCode = TPUtility.generateUniqueCode(
			// businessObject.getPromoID(), businessObject.getFirstName());
			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			callableStatement = connection.prepareCall(insertStoreProc);

			callableStatement.registerOutParameter(1, Types.INTEGER);
			callableStatement.registerOutParameter(2, Types.VARCHAR);
			callableStatement.setString(3, businessObject.getPromoID());
			callableStatement.setString(4, businessObject.getPromoName());
			callableStatement.setString(5, businessObject.getTitle());
			callableStatement.setString(6, businessObject.getFullName());
			callableStatement.setString(7, businessObject.getEmail());
			callableStatement.setString(8, businessObject.getPhoneNo());
			callableStatement.setInt(9,
					businessObject.getReceiveCommunications());
			callableStatement.setString(10, businessObject.getRemarks());
			callableStatement.setInt(11, businessObject.getInterestedIn());

			callableStatement.execute();

			statusObject.setStatusCode(callableStatement.getInt(1));
			statusObject.setStatusMessage(callableStatement.getString(2));

			System.out.println("addPRIPromoDetail : "
					+ statusObject.getStatusMessage());

			if (callableStatement != null) {
				callableStatement.close();
			}

		} catch (Exception e) {
			System.err.println("DBError: addPRIPromoDetail() :" + e);
			statusObject.setStatusCode(2);
			statusObject.setStatusMessage(e.getMessage());
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return statusObject;
	}
	
	public StatusObject addChevyTruckPromoDetails(ChevyTruckPromoDetailsObject businessObject) throws Exception {

		ConnectionManager cmanager = null;
		Connection connection = null;
		CallableStatement callableStatement = null;

		StatusObject statusObject = new StatusObject();

		String insertStoreProc = "{call create_bpi_chevytruckpromo_businessrecord(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

		System.out.println("Business Details Object received : "
				+ businessObject);

		try {

			cmanager = new ConnectionManager();
			connection = cmanager.GetConnection();
			callableStatement = connection.prepareCall(insertStoreProc);

			callableStatement.registerOutParameter(1, Types.INTEGER);
			callableStatement.registerOutParameter(2, Types.VARCHAR);
			callableStatement.setString(3, businessObject.getPromoID());
			callableStatement.setString(4, businessObject.getPromoName());
			callableStatement.setString(5, businessObject.getFirstName());
			callableStatement.setString(6, businessObject.getLastname());
			callableStatement.setString(7, businessObject.getEmail());
			callableStatement.setString(8, businessObject.getBusinessName());
			callableStatement.setString(9, businessObject.getOwnersName());
			callableStatement.setString(10, businessObject.getAddress1());
			callableStatement.setString(11, businessObject.getAddress2());
			callableStatement.setString(12, businessObject.getCity());
			callableStatement.setString(13, businessObject.getState());
			callableStatement.setString(14, businessObject.getZipCode());
			callableStatement.setString(15, businessObject.getCountry());
			callableStatement.setString(16, businessObject.getPhoneNo());
			callableStatement.setString(17, businessObject.getWebsite());
			callableStatement.setString(18, businessObject.getHomeAddress1());
			callableStatement.setString(19, businessObject.getHomeAddress2());
			callableStatement.setString(20, businessObject.getHomeCity());
			callableStatement.setString(21, businessObject.getHomeState());
			callableStatement.setString(22, businessObject.getHomeZipCode());
			callableStatement.setString(23, businessObject.getHomeCountry());
			callableStatement.setString(24, businessObject.getHomePhoneNo());
			callableStatement.setInt(25,
					businessObject.getReceiveCommunications());
			callableStatement.setString(26, businessObject.getJobTitle());
			callableStatement.setString(27, businessObject.getRemarks());
			callableStatement.setString(28, businessObject.getUniqueCode());
			callableStatement.setString(29, businessObject.getPoints());

			callableStatement.execute();

			statusObject.setStatusCode(callableStatement.getInt(1));
			statusObject.setStatusMessage(callableStatement.getString(2));

			System.out.println("chevyTruckPromoDetails : " + statusObject.getStatusMessage());

			if (callableStatement != null) {
				callableStatement.close();
			}

		} catch (Exception e) {
			System.err.println("DBError: chevyTruckPromoDetails() :" + e);
			statusObject.setStatusCode(-1);
			statusObject.setStatusMessage(e.getMessage());

		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return statusObject;
	}
	
	//###########################################################################################################//

	// TEST STUB METHODS START
	public UserObject GetUser_Test(String usr) throws Exception {
		UserObject userObject = null;
		if (usr.equals("test@ennvee.com")) {
			userObject = new UserObject();
			userObject.setEmail("test@ennvee.com");
			userObject.setPassword("test");
			userObject.setFirstName("Testing");
			userObject.setActiveStatus("1");
			userObject.setApprovedStatus("1");
			userObject.setConfirmedStatus("1");
			userObject.setIscustomer(1);
		}
		return userObject;
	}

	public List<JobTitleObject> getJobTitle_Test() {
		List<JobTitleObject> list = new ArrayList<JobTitleObject>();
		JobTitleObject obj = new JobTitleObject();
		obj.setId("1");
		obj.setJobTitle("Shop Owner");
		obj.setJobDescription("Test");
		list.add(obj);

		JobTitleObject obj1 = new JobTitleObject();
		obj1.setId("2");
		obj1.setJobTitle("Technician");
		obj1.setJobDescription("Testing");
		list.add(obj1);

		return list;
	}

	public List<OrganizationObject> getOrganization_Test() {
		List<OrganizationObject> list = new ArrayList<OrganizationObject>();
		OrganizationObject obj = new OrganizationObject();
		obj.setOrg_id("1");
		obj.setOrg_name("bpi");
		obj.setPhone1("5467839788");
		obj.setPhone2("3426586543");
		obj.setEmail("abc@gmail.com");
		obj.setWebsite("www.xyz.com");
		obj.setLang("en");
		obj.setConfirmed("1");
		obj.setApproved("1");
		obj.setIsDistributor("0");

		obj.setRemarks("completed");
		list.add(obj);

		OrganizationObject obj1 = new OrganizationObject();
		obj1.setOrg_id("2");
		obj1.setOrg_name("ennvee");
		obj1.setPhone1("5467839788");
		obj1.setPhone2("3426586543");
		obj1.setEmail("def@gmail.com");
		obj1.setWebsite("www.xyz.com");
		obj1.setLang("en");
		obj1.setConfirmed("1");
		obj1.setApproved("1");
		obj1.setIsDistributor("0");
		obj1.setRemarks("completed");
		list.add(obj1);
		return list;
	}

	public OrganizationObject checkIfOrganizationExists_Test(String orgName) {
		OrganizationObject organizationObject = null;
		if (orgName.equals("ennvee")) {
			organizationObject = new OrganizationObject();
			organizationObject.setOrg_id("2");
			organizationObject.setOrg_name("ennvee");
			organizationObject.setStatus("0");
		}
		return organizationObject;
	}

	public List<RoleObject> GetUserRoleDetails_Test(String userID) {
		List<RoleObject> list = new ArrayList<RoleObject>();
		RoleObject obj = new RoleObject();
		obj.setRoleID("1");
		obj.setRoleName("StockCheck");
		obj.setRoleDesc("Stock Check");
		obj.setIsActive("1");
		obj.setCreatedBy("1");
		obj.setCreatedDate("24/02/2017");
		obj.setModifiedBy("1");
		obj.setModifiedDate("24/02/2017");
		list.add(obj);

		RoleObject obj1 = new RoleObject();
		obj1.setRoleID("2");
		obj1.setRoleName("PlaceOrder");
		obj1.setRoleDesc("Place Order");
		obj1.setIsActive("1");
		obj1.setCreatedBy("1");
		obj1.setCreatedDate("24/02/2017");
		obj1.setModifiedBy("1");
		obj1.setModifiedDate("24/02/2017");
		list.add(obj1);
		return list;
	}

	public CustomerObject GetCustomerDetails_Test(String userID) {
		CustomerObject object = null;
		if (userID.equals("1")) {
			object = new CustomerObject();
			object.setCustomerID("1");
			object.setUserID(userID);
			object.setAccountNo("C0001");
			object.setBillToSiteID("B0021");
			object.setShipToSiteID("S0021");
			object.setStatus("0");
		}
		return object;
	}

	public List<CountryObject> GetCountriesStatesList_Test() {
		List<CountryObject> list = new ArrayList<CountryObject>();
		CountryObject obj = new CountryObject();
		obj.setId("1");
		obj.setName("US");
		obj.setDescription("United States");

		List<StateObject> sList = new ArrayList<StateObject>();
		StateObject sObj = new StateObject();
		sObj.setCountryID("1");
		sObj.setId("1");
		sObj.setName("TX");
		sObj.setDescription("Texas");
		sList.add(sObj);

		StateObject sObj1 = new StateObject();
		sObj1.setCountryID("1");
		sObj1.setId("2");
		sObj1.setName("FL");
		sObj1.setDescription("Florida");
		sList.add(sObj1);
		obj.setStates(sList);

		list.add(obj);

		CountryObject obj1 = new CountryObject();
		obj1.setId("2");
		obj1.setName("CA");
		obj1.setDescription("Canada");

		List<StateObject> sList1 = new ArrayList<StateObject>();
		StateObject sObj2 = new StateObject();
		sObj2.setCountryID("2");
		sObj2.setId("3");
		sObj2.setName("ON");
		sObj2.setDescription("Ontario");
		sList1.add(sObj2);

		StateObject sObj3 = new StateObject();
		sObj3.setCountryID("2");
		sObj3.setId("4");
		sObj3.setName("AB");
		sObj3.setDescription("Alberta");
		sList1.add(sObj3);

		obj1.setStates(sList1);
		list.add(obj1);
		return list;
	}

	public List<ShippingMethodObject> GetShippingMethodTypes_Test() {
		List<ShippingMethodObject> list = new ArrayList<ShippingMethodObject>();
		ShippingMethodObject obj = new ShippingMethodObject();
		obj.setId("1");
		obj.setShipMethodCode("000001_UPS_P_1DA");
		obj.setFreightCode("UPS");
		obj.setDescription("UPS Next Day Air ");
		obj.setStatus("1");
		list.add(obj);

		ShippingMethodObject obj1 = new ShippingMethodObject();
		obj1.setId("2");
		obj1.setShipMethodCode("000001_UPS_P_2DA");
		obj1.setFreightCode("UPS");
		obj1.setDescription("UPS  2nd Day Air ");
		obj1.setStatus("1");
		list.add(obj1);

		ShippingMethodObject obj2 = new ShippingMethodObject();
		obj2.setId("3");
		obj2.setShipMethodCode("000001_UPS_P_3DS");
		obj2.setFreightCode("UPS");
		obj2.setDescription("UPS 3 Day Select");
		obj2.setStatus("1");
		list.add(obj2);

		return list;
	}

	public UserObject GetUserProfile_Test(String usr) throws Exception {
		UserObject userObject = null;
		if (usr.equals("test@ennvee.com")) {
			userObject = new UserObject();
			userObject.setId("1");
			userObject.setEmail("test@ennvee.com");
			userObject.setPassword("test");
			userObject.setFirstName("Testing");
			userObject.setActiveStatus("1");
			userObject.setApprovedStatus("1");
			userObject.setConfirmedStatus("1");
			userObject.setLastname("Pace");
			userObject.setPhone1("+18003230354");
			userObject.setPhone2("+18153639000");
			userObject.setAddress("4400 Prime Parkway");
			userObject.setCity("McHenry");
			userObject.setState("IL");
			userObject.setCountry("US");
			userObject.setLang("en");
			userObject.setRemarks("");
			userObject.setInterest_in_communication("0");
			userObject.setTimezone("");
			userObject.setFirstaccess("2017-03-17 15:42:49.770");
			userObject.setLastaccess("");
			userObject.setLastlogin("");
			userObject.setCurrentlogin("");
			userObject.setLastip("");
			userObject.setSecret("");
			userObject.setPicture("");
			userObject.setUrl("");
			userObject.setDescription("");
			userObject.setYears_of_experience("");
			userObject.setArea_of_speciality("");
			userObject.setBays_in_shop("");
			userObject.setBrake_jobs_in_a_month("");
			userObject.setList_in_find_a_shop("");
			userObject.setCurrently_using_raybestos_products("0");
			userObject.setMailformat("0");
			userObject.setMaildisplay("0");
			userObject.setHtmleditor("0");
			userObject.setShopOwner("0");
			userObject.setTimemodified("2017-03-17 15:42:49.770");
			userObject.setNickname("");
			userObject.setKeepShopPrivate("0");
			userObject.setKeepEmployeePrivate("0");
			userObject.setIscustomer(1);
			userObject.setVerificationlinksenttime("2017-03-17 15:42:49.770");
			userObject.setReferedby("");

		}
		return userObject;
	}

	public RoleObject GetRoleDetails_Test(String roleID) throws Exception {

		RoleObject roleObject = new RoleObject();
		roleObject.setRoleID("1");
		roleObject.setRoleName("StockOrder");
		roleObject.setRoleDesc("Place Stock Order");
		roleObject.setIsActive("1");
		roleObject.setCreatedBy(null);
		roleObject.setCreatedDate("2017-03-17 15:48:15.810");
		roleObject.setModifiedBy("0");
		roleObject.setModifiedDate(null);
		return roleObject;
	}

	public List<CategoryObject> getCategoryList_Test() throws Exception {
		List<CategoryObject> list = new ArrayList<CategoryObject>();
		CategoryObject obj = new CategoryObject();
		obj.setCategoryId("4");
		obj.setCatagoryName("Video");
		obj.setStartDate("2017-03-08 14:37:28.480");
		obj.setEndDate("2017-03-18 14:37:28.480");
		obj.setStatus("1");
		list.add(obj);

		CategoryObject obj1 = new CategoryObject();
		obj1.setCategoryId("5");
		obj1.setCatagoryName("Bulletin");
		obj1.setStartDate("2017-02-08 14:37:28.480");
		obj1.setEndDate("2017-02-18 14:37:28.480");
		obj1.setStatus("1");
		list.add(obj1);

		CategoryObject obj2 = new CategoryObject();
		obj2.setCategoryId("6");
		obj2.setCatagoryName("Tips");
		obj2.setStartDate("2017-01-08 14:37:28.480");
		obj2.setEndDate("2017-01-18 14:37:28.480");
		obj2.setStatus("1");
		list.add(obj2);

		return list;
	}

}
