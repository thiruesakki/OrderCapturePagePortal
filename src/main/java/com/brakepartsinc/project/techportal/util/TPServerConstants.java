package com.brakepartsinc.project.techportal.util;

import java.util.HashMap;
import java.util.Map;

public class TPServerConstants {

	public static final String SQL_CONNECTION_ERROR = "Unable to connect to SQL Database";
	
	public static int QUERY_EXECUTION_SUCCESS = 0;
	public static int QUERY_EXECUTION_FAILURE = 1;
	
	public static int FIRSTACCESS_YES = 1;
	public static int FIRSTACCESS_NO = 0;
	
	// for registration
	public static String Register_CONFIRMED = "1";
	public static String Register_NOT_CONFIRMED = "0";

	public static String Register_APPROVED = "1";
	public static String Register_NOT_APPROVED = "0";
	
	public static String Register_STATUS_ACTIVE_STRING = "1";
	public static String Register_STATUS_INACTIVE_STRING = "0";

	public static int Register_STATUS_ACTIVE = 1;
	public static int Register_STATUS_INACTIVE = 0;

	public static String Register_LATITUDE = "88.1734";
	public static String Register_LONGITUDE = "41.8178";
	
	public static String SECRET_KEY = "6LdP_UwUAAAAAA281h4HZ2IMcCbesXWqQ4M2Ag0-";

	// for user info
	public static int User_CONFIRMED = 1;
	public static int User_NOT_CONFIRMED = 0;

	public static int User_APPROVED = 1;
	public static int User_NOT_APPROVED = 0;

	public static int User_STATUS_ACTIVE = 1;
	public static int User_STATUS_INACTIVE = 0;

	public static int User_MAILFORMAT_HTML = 1;
	public static int User_MAILFORMAT_TEXT = 0;

	public static int User_MAILDISPLAY = 1;
	public static int User_NOT_MAILDISPLAY = 0;

	public static int User_HTMLEDITOR = 1;
	public static int User_NOT_HTMLEDITOR = 0;

	public static int User_AUTO_SUBSCRIBE = 1;
	public static int User_AUTO_NOT_SUBSCRIBE = 0;

	public static int INTEREST_IN_COMMUNICATION = 1;
	public static int INTEREST_NOT_IN_COMMUNICATION = 0;

	public static int KEEP_SHOP_PRIVATE = 1;
	public static int KEEP_SHOP_NOT_PRIVATE = 0;

	public static int KEEP_EMPLOYEE_PRIVATE = 1;
	public static int KEEP_EMPLOYEE_NOT_PRIVATE = 0;

	public static int LIST_IN_FIND_A_SHOP = 1;
	public static int LIST_IN_NOT_FIND_A_SHOP = 0;

	public static int CURRENTLY_USING_RAYBESTOS_PRODUCTS = 1;
	public static int CURRENTLY_NOT_USING_RAYBESTOS_PRODUCTS = 0;
	
	public static String DUPLICATE_KEY_EMAIL_ERROR = "Violation of UNIQUE KEY constraint 'unique_user'";

	public static Map<String, String> TIPS_TRICKS_STATUS = new HashMap<String, String>();
	
	static {
		TIPS_TRICKS_STATUS.put("0", "New");
		TIPS_TRICKS_STATUS.put("1", "Rejected - Not Valid Content");
		TIPS_TRICKS_STATUS.put("2", "Rejected - Duplicate Content");
		TIPS_TRICKS_STATUS.put("3", "Pending - Technical Review");
		TIPS_TRICKS_STATUS.put("4", "Awarded - Pending Post");
		TIPS_TRICKS_STATUS.put("5", "Awarded - Not Posting");
		TIPS_TRICKS_STATUS.put("5", "Awarded - Posted");
	}

}
