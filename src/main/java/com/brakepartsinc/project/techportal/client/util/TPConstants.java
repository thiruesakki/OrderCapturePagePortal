package com.brakepartsinc.project.techportal.client.util;


public class TPConstants {

	public static final String HOSTNAME = "http://localhost:8080/OrderCapturePortal/REST";
	
	public static final String LOGIN_SERVICE = HOSTNAME + "/WebService/VerifyUser";
	
	public static final String LOGIN_VERIFICATION_SERVICE = HOSTNAME + "/WebService/VerifyLogin";
	
	public static final String EMAIL_VERIFICATION_SERVICE = HOSTNAME + "/WebService/VerifyEmail";
	
	public static final String CREATE_ORGANIZATION_SERVICE = HOSTNAME + "/WebService/RegisterOrganization";
	
	public static final String CREATE_USER_SERVICE = HOSTNAME + "/WebService/RegisterUser";

	public static final String GET_JOBTITLE_SERVICE = HOSTNAME + "/WebService/GetJobTitleList";

	public static final String GET_ORGANIZATION_SERVICE = HOSTNAME + "/WebService/GetOrganizationList";
	
	public static final String VERIFY_ORGANIZATION_SERVICE = HOSTNAME + "/WebService/VerifyOrganization";
	
	public static final String RESET_PASSWORD_SECRETKEY_SAVE_SERVICE = HOSTNAME + "/WebService/ResetPswdSaveKey";
	
	public static final String RESET_PASSWORD_SECRETKEY_VERIFY_SERVICE = HOSTNAME + "/WebService/VerifyResetPswdLink";
	
	
	public static final String Check_Email_Verification_link = HOSTNAME + "/WebService/CheckEmailVerificationLink";
	
	public static final String RESET_PASSWORD_SERVICE = HOSTNAME + "/WebService/ResetPassword";
	
	public static final String CHANGE_PASSWORD_SERVICE = HOSTNAME + "/WebService/ChangePassword";
	
	public static final String GET_USER_PROFILE_SERVICE = HOSTNAME + "/WebService/GetUserProfile";
	
	public static final String UPDATE_USER_PROFILE_SERVICE = HOSTNAME + "/WebService/UpdateUserProfile";
		
	public static final String CREATE_USER_ROLE_SERVICE = HOSTNAME + "/WebService/CreateUserRole";	
	
	public static final String UPDATE_USER_ROLE_SERVICE = HOSTNAME + "/WebService/UpdateUserRole";
	
	public static final String GET_USER_ROLE_SERVICE = HOSTNAME + "/WebService/GetUserRole";
	
	public static final String GET_ROLE_DETAIL_SERVICE = HOSTNAME + "/WebService/GetRoleDetails";
	
	public static final String GET_USERROLE_CUSTOMER_DETAIL_SERVICE = HOSTNAME + "/WebService/GetUserRoleDetails";
	
	public static final String GET_STATE_COUNTRY_LIST_SERVICE = HOSTNAME + "/WebService/GetCountriesStatesList";
	
	public static final String GET_SHIPPING_METHOD_TYPES_SERVICE = HOSTNAME + "/WebService/GetShippingMethodTypes";
	
	public static final String GET_ORACLE_API = HOSTNAME + "/OracleApi/TestOracleAPI";
	
	public static final String GET_ORACLE_API_SERVLET = HOSTNAME + "/OracleApiServlet";
	
	public static final String CHANGE_OLD_PASSWORD_SERVICE = HOSTNAME + "/WebService/ChangePasswordWithOld";
	
	
	
	
	public static final String UPDATE_USER_LOGIN_DETAILS = HOSTNAME + "/WebService/UpdateUserLoginDetails";

	public static final String UPDATE_USER_LOGOUT_DETAILS = HOSTNAME + "/WebService/UpdateUserLogoutDetails";

	//public static final String UPDATE_USER_RECORD_CHANGED = HOSTNAME + "/WebService/UpdateUserRecordChanged";

	public static final String GET_CATEGORY_LIST_SERVICE  = HOSTNAME + "/WebService/GetCategoryList"; 

	public static final String GET_USER_FAVORITES_LIST_SERVICE = HOSTNAME + "/WebService/GetUserFavoritesDetails";
	
	

	public static final String SET_USER_APPROVAL_DETAILS = HOSTNAME +  "/WebService/SetUserApproval";
 
	public static final String SET_ORGANIZATION_APPROVAL_DETAILS = HOSTNAME +  "/WebService/SetOrganizationApproval";

	public static final String SET_DASHBOARD_DETAILS = HOSTNAME +  "/WebService/SaveDashboardPreference";
 
	public static final String GET_DASHBOARD_DETAILS = HOSTNAME +  "/WebService/GetDashboardPreference";

	public static final String SET_VIDEO_VIEW_DETAILS = HOSTNAME +  "/WebService/SaveVideoDetail";
 
	public static final String GET_VIDEO_VIEW_DETAILS = HOSTNAME +  "/WebService/GetVideoDetail";
	
	public static final String SET_USER_FAVORITES_DETAILS = HOSTNAME +  "/WebService/SaveUserFavorites";

	public static final String GET_DISTRIBUTOR_LIST = HOSTNAME +  "/WebService/GetDistributors";
	
	public static final String GET_CAP_USER_LIST = HOSTNAME +  "/WebService/GetAllCAPUsers";
	
	public static final String GET_CAP_ROLE_LIST = HOSTNAME +  "/WebService/GetAllCAPRoles";
	
	public static final String ADD_CAP_USER = HOSTNAME +  "/WebService/AddCAPUser";
	
	public static final String EDIT_CAP_USER = HOSTNAME +  "/WebService/EditCAPUser";
	
	public static final String GET_CAP_USER_EMAIL_SEARCH = HOSTNAME +  "/WebService/GetCAPUserForEmailSearch";
	
	public static final String GET_CAP_USER_BILLTO_SHIPTO_SEARCH = HOSTNAME +  "/WebService/GetCAPUserForBilltoShiptoSearch";
	
	public static final String  GET_ALL_JOB_TITLE_FOR_SINGLE_USER  = HOSTNAME +  "/WebService/GetAllJobTitleForSingleUser";
	
	public static final String  GET_ALL_ORGANIZATION_FOR_SINGLE_USER  = HOSTNAME +  "/WebService/GetAllOrganizationForSingleUser";
	
	public static final String UPDATE_BPI_USER_ORG_MAPPING = HOSTNAME + "/WebService/UpdateUserOrganizationMapping";
	
	public static final String GET_UNAPPROVED_TC_USER_LIST = HOSTNAME +  "/WebService/GetUnapprovedTCUsers";
	
	public static final String SET_TIPS_TRICKS_DETAILS = HOSTNAME +  "/WebService/SaveTipsAndTricks";
	 
	public static final String GET_TIPS_TRICKS_DETAILS = HOSTNAME +  "/WebService/GetTipsAndTricks";
	
	public static final String UPDATE_TIPS_TRICKS_DETAILS = HOSTNAME +  "/WebService/UpdateTipsAndTricks";
	
    public static final String GET_ALL_DISTRIBUTOR_BY_CITY = HOSTNAME +  "/WebService/GetAllDistributorByCity";
	
	public static final String GET_ALL_DISTRIBUTOR_BY_ZIPCODE = HOSTNAME +  "/WebService/GetAllDistributorByZipcode";
	
	public static final String GET_DISTRIBUTOR = HOSTNAME +  "/WebService/GetDistributor";
	
	public static final String GET_FAVORITE_DISTRIBUTORS = HOSTNAME +  "/WebService/GetUserFavoritesDistributors";
	
	public static final String GET_UNAPPROVED_TIPS_TRICKS = HOSTNAME +  "/WebService/GetUnapprovedTipsNTricks";

	public static final String TIPS_AND_TRICKS_APPROVAL = HOSTNAME +  "/WebService/TipsAndTricksApproval"; 
	
	public static final String GET_ALL_TP_ACTIVE_USERS = HOSTNAME +  "/WebService/GETAllTPActiveUsers";

	public static final String GET_FAVORITE_TIPS_AND_TRICKS = HOSTNAME +  "/WebService/GetUserFavoriteTipsNTricks"; 
	
	public static final String SET_USER_FAVORITES_PLACE = HOSTNAME +  "/WebService/SaveUserFavoritePlace";
	
	public static final String GET_USER_FAVORITES_PLACE = HOSTNAME +  "/WebService/GetUserFavoritePlace";
	
	public static final String SET_REWARD_PROGRAMS = HOSTNAME +  "/WebService/SaveRewardPrograms";
	
	public static final String GET_REWARD_PROGRAMS = HOSTNAME +  "/WebService/GetRewardPrograms";
	
	public static final String SET_REWARD_EVENTS = HOSTNAME +  "/WebService/SaveRewardEvents";
	
	public static final String GET_REWARD_EVENTS = HOSTNAME +  "/WebService/GetRewardEvents";
	
	public static final String SAVE_REWARD_TRANSACTION = HOSTNAME +  "/WebService/SaveRewardTransaction";
	
	public static final String UPDATE_REWARD_APPROVAL = HOSTNAME +  "/WebService/UpdateRewardApprovalStatus";
	
	public static final String GET_PENDING_REWARDS_APPROVAL = HOSTNAME +  "/WebService/GetPendingRewardsApproval";
	
	public static final String GET_REWARD_TRANSACTION_FOR_PERIOD = HOSTNAME +  "/WebService/GetRewardTransactionForPeriod";
	
	public static final String GET_REWARD_SUMMARY = HOSTNAME +  "/WebService/GetRewardSummary"; 
	
	public static final String ADD_PROMO_BUSINESS_DETAIL = HOSTNAME +  "/WebService/AddPromoBusinessDetail";
	
	public static final String ADD_PRI_PROMO_DETAIL = HOSTNAME +  "/WebService/AddPRIPromoDetail";
	
	public static final String CHEVY_TRUCK_PROMO_DETAILS = HOSTNAME +  "/WebService/AddChevyTruckPromoDetails";
	
	public static String SENDER_MAIL_ID = "";
    
	public static String MAIL_PASSWORD = "";

	public static String MAIL_SMTP_HOST = "";

	public static int MAIL_SMTP_PORT = 587;

	public static String MAIL_SUBJECT = "Reset Password Link";

	public static String MAIL_BODY = "<h4>Click the below link to reset the password :</h4><br><h4><a href=<domain><token>>Click here to reset</a></h4><br>";
	
	public static String CC_MAIL_ID = "";
	
	
}
