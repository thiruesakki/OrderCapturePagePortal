package com.brakepartsinc.project.techportal.util;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.codec.binary.Base64;
import org.w3c.dom.Document;

import com.brakepartsinc.project.techportal.dto.CommonObject;
import com.brakepartsinc.project.techportal.dto.RewardTransactionObject;

public class TPUtility {
	
	private static String sHostName = "";
	
	private static String sDatabaseName = "";
	
	private static String sUserName = "";	
	
	private static String sPassword = "";

	private static String sSqlServiceHostName = "";

	private static String sOracleServiceHostName = "";
	
	static {
		readDatabaseProperties();
	}
	
	public static void readDatabaseProperties() {
		Properties prop = new Properties();
		InputStream input = null;

		try {
			input =  TPUtility.class.getClassLoader()
					.getResourceAsStream("com/brakepartsinc/project/techportal/TechPortal_CAP_Property.properties"); 
			prop.load(input);
			sHostName = prop.getProperty("HOST");
			sUserName = prop.getProperty("USERNAME");
			sPassword = prop.getProperty("PASSWORD");
			sDatabaseName = prop.getProperty("DATABASENAME");
			sSqlServiceHostName = prop.getProperty("SQL_SERVICE_HOST_NAME");			
			sOracleServiceHostName = prop.getProperty("ORACLE_SERVICE_HOST_NAME"); 

			System.out.println("Values from property,sSqlServiceHostName:" + sSqlServiceHostName + ",sOracleServiceHostName:"
					+ sOracleServiceHostName);
		} catch (Exception e) {
			System.out
					.println("Exception in getting the values from TechPortal_CAP_Property.properties:"
							+ e.getMessage());
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					System.out
							.println("Exception while closing the inputstream:"
									+ e.getMessage());
				}
			}
		}
	}
	
	public static String getHostName() {
		return sHostName;
	}

	public static String getDatabaseName() {
		return sDatabaseName;
	}

	public static String getUserName() {
		return sUserName;
	}

	public static String getPassword() {
		return sPassword;
	}
	
	public static String getSQLServiceHostName() {
		return sSqlServiceHostName;
	}
	
	public static String getOracleServiceHostName() {
		return sOracleServiceHostName;
	}

	public static String getValidString(String value) {
		String validString = "";
		if (value != null && value.equals("") == false) {
			validString = value.trim();
		}
		return validString;
	}
	
	public static int getValidInt(String value) {
		int validInt = 0;
		if (value != null && value.equals("") == false) {
			validInt = Integer.parseInt(value);
		}
		return validInt;
	}
	
	public static String getValidAccountName(String value) {
		String validString = "";
		if (value != null && value.equals("") == false) {
			validString = value.replace("'", "''");
		} 
		return validString;
	}
	
	public static int getValidIntFromJSON(String value) {
		System.out.println("Value from JSON:[" + value + "]");
		int validInt = 0;
		try {
			if (value != null && value.equals("") == false) {
				System.out.println("Valid Value:[" + value + "]");
				validInt = Integer.parseInt(value);
			} 
			//else {
			//	System.out.println("ELSE");
			//}
		} catch (Exception e) {
			System.out.println("Exception:" + e.getMessage());

		}
		System.out.println("VALUE RETURNED :" + validInt);
		return validInt;
	}
	
	public static String encodePassword(String pwd) {
		byte[] authStringEnc = new Base64().encode(pwd.getBytes());
		String encodedString = new String(authStringEnc);
		System.out.println("start " + encodedString);

		return encodedString;
	}
	
	public static String decodePassword(String authString) {
		String decodedAuth = "";
		byte[] bytes = null;
		bytes = new Base64().decode(authString);
		decodedAuth = new String(bytes);
		// System.out.println(decodedAuth +"- Decoding done");
		return decodedAuth;
	}

	public static List<CommonObject> StringToJobTitleObject(String jobtitle) {
//		System.out.println("JobTitle Recieved from DB:[" + jobtitle + "]");
		List<CommonObject> titleList = new ArrayList<CommonObject>();
		
		if(jobtitle !=null && jobtitle.length() > 0 ){
			String tempJobArray[] = jobtitle.split(",");
			String tempObjectArray[] = null ; 
			 for (int i=0; i<tempJobArray.length ; i++ ){
				 
				 CommonObject jto = new CommonObject();
				 
				 tempObjectArray =  tempJobArray[i].split("-") ; 			 
				 jto.setId(tempObjectArray[0]);  
				 jto.setName(tempObjectArray[1]);
				 
				 titleList.add(jto) ;
				// System.out.println("KEY: "+ tempObjectArray[0]);
				// System.out.println("VALUE: "+tempObjectArray[1] );			 
			 }
		}
		return titleList;
	}
	
	public static List<CommonObject> StringToOrganizationObject(String orgs) {
		List<CommonObject> orgList = new ArrayList<CommonObject>();
//		System.out.println("Organization Recieved from DB:[" + orgs + "]");
		
		if(orgs !=null && orgs.length() > 0 ){
			String tempOrgArray[] = orgs.split(",");
			String temporgObjectArray[] = null ; 
			 for (int i=0; i<tempOrgArray.length ; i++ ){
				 
				 CommonObject orgObject = new CommonObject();
				 
				 temporgObjectArray =  tempOrgArray[i].split("-") ; 	
				 
				 orgObject.setId(temporgObjectArray[0]);
				 orgObject.setName(temporgObjectArray[1]);  
				 orgList.add(orgObject) ;
				// System.out.println("KEY: "+ temporgObjectArray[0]);
				// System.out.println("VALUE: "+temporgObjectArray[1] );			 
			 }
		} 	
		return orgList;
	}

	
	// latitude and longitude method
	public static String[] getLatLongPositions(String address) throws Exception {
		int responseCode = 0;
		String api = "http://maps.googleapis.com/maps/api/geocode/xml?address="
				+ URLEncoder.encode(address, "UTF-8") + "&sensor=true";
		URL url = new URL(api);
		HttpURLConnection httpConnection = (HttpURLConnection) url
				.openConnection();
		httpConnection.connect();
		responseCode = httpConnection.getResponseCode();
		if (responseCode == 200) {
			DocumentBuilder builder = DocumentBuilderFactory.newInstance()
					.newDocumentBuilder();
			Document document = builder.parse(httpConnection.getInputStream());
			XPathFactory xPathfactory = XPathFactory.newInstance();
			XPath xpath = xPathfactory.newXPath();
			XPathExpression expr = xpath.compile("/GeocodeResponse/status");
			String status = (String) expr.evaluate(document,
					XPathConstants.STRING);
			if (status.equals("OK")) {
				expr = xpath.compile("//geometry/location/lat");
				String latitude = (String) expr.evaluate(document,
						XPathConstants.STRING);
				expr = xpath.compile("//geometry/location/lng");
				String longitude = (String) expr.evaluate(document,
						XPathConstants.STRING);
				return new String[] { latitude, longitude };
			} else {
				throw new Exception("Error from the API - response status: "
						+ status);
			}
		}
		return null;
	}
	
	public static String getErrorMessage(String dbError) {
		String error = dbError;
		if (dbError.contains(TPServerConstants.DUPLICATE_KEY_EMAIL_ERROR)) {
			System.out.println("User already exists with same email address");
			error = "User already exists with same email address";
		}
		System.out.println(error + " - Error returned");
		return error;
	}
	
	public static List<RewardTransactionObject> StringToRewardObject(
			String reward) {
		List<RewardTransactionObject> rewardList = new ArrayList<RewardTransactionObject>();
		// System.out.println("reward Recieved from DB:[" + reward + "]");

		if (reward != null && reward.length() > 0) {
			String tempRewardArray[] = reward.split("_");
			String tempRewardObjectArray[] = null;
			for (int i = 0; i < tempRewardArray.length; i++) {
				RewardTransactionObject RewardObject = new RewardTransactionObject();
				tempRewardObjectArray = tempRewardArray[i].split("~"); 
				RewardObject.setCategoryName(tempRewardObjectArray[0]); 
				RewardObject.setEventDate(tempRewardObjectArray[1]); 
				RewardObject.setApprovedPoints(tempRewardObjectArray[2]); 
				rewardList.add(RewardObject);
				// System.out.println("KEY: "+ tempRewardObjectArray[0]);
			}
		}
		return rewardList;
	}

	public static String generateUniqueCode(String prefix, String nameprefix) throws Exception{
		String generatedCode = "";
		if(prefix != null && "".equals(prefix) == false){
			if(nameprefix != null && "".equals(nameprefix) == false){
				String name = nameprefix.substring(0, 2).toUpperCase();
				generatedCode = prefix + "-" + name + generateNumber();
			} else {
				throw new Exception("FirstName is mandatory."); 
			}
		} else {
			throw new Exception("PromoID/Prefix is mandatory."); 
		}
		return generatedCode;
	}
	
	public static long generateNumber() {
		double randomNo = Math.random();
//		System.out.println("Raw Random No:" + randomNo);
	    return (long)(randomNo*100000 + 10000000L);
	}
	
	public static String formatSqlDateToMule(Date date)
	{
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy");  
	    String strDate = formatter.format(date);  
	    System.out.println("Date Format with dd-MMM-yyyy : "+strDate);  
	    return strDate;
	}
}
