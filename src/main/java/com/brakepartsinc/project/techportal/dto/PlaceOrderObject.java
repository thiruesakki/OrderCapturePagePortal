package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class PlaceOrderObject {
	
	private String CUST_PO_NUMBER = "";
	private String ORDER_TYPE = "";
	private String USER_NAME = "";
	private String SHIPPING_METHOD = "";
	private String SHIP_TO_ORG = "";
	private String BILL_TO_ORG = "";
	private String STORE_ID = "";
	private String CUSTOMER_NOTES = "";
	private String REQUESTED_DATE = "";
	List<PlaceOrderLinesObject> ORDER_LINES=null;
	
	public String getCUST_PO_NUMBER() {
		return CUST_PO_NUMBER;
	}
	public void setCUST_PO_NUMBER(String cUST_PO_NUMBER) {
		CUST_PO_NUMBER = cUST_PO_NUMBER;
	}
	public String getORDER_TYPE() {
		return ORDER_TYPE;
	}
	public void setORDER_TYPE(String oRDER_TYPE) {
		ORDER_TYPE = oRDER_TYPE;
	}
	public String getUSER_NAME() {
		return USER_NAME;
	}
	public void setUSER_NAME(String uSER_NAME) {
		USER_NAME = uSER_NAME;
	}
	public String getSHIPPING_METHOD() {
		return SHIPPING_METHOD;
	}
	public void setSHIPPING_METHOD(String sHIPPING_METHOD) {
		SHIPPING_METHOD = sHIPPING_METHOD;
	}
	public String getSHIP_TO_ORG() {
		return SHIP_TO_ORG;
	}
	public void setSHIP_TO_ORG(String sHIP_TO_ORG) {
		SHIP_TO_ORG = sHIP_TO_ORG;
	}
	public String getBILL_TO_ORG() {
		return BILL_TO_ORG;
	}
	public void setBILL_TO_ORG(String bILL_TO_ORG) {
		BILL_TO_ORG = bILL_TO_ORG;
	}
	public String getSTORE_ID() {
		return STORE_ID;
	}
	public void setSTORE_ID(String sTORE_ID) {
		STORE_ID = sTORE_ID;
	}
	public String getCUSTOMER_NOTES() {
		return CUSTOMER_NOTES;
	}
	public void setCUSTOMER_NOTES(String cUSTOMER_NOTES) {
		CUSTOMER_NOTES = cUSTOMER_NOTES;
	}
	public String getREQUESTED_DATE() {
		return REQUESTED_DATE;
	}
	public void setREQUESTED_DATE(String rEQUESTED_DATE) {
		REQUESTED_DATE = rEQUESTED_DATE;
	}
	public List<PlaceOrderLinesObject> getORDER_LINES() {
		return ORDER_LINES;
	}
	public void setORDER_LINES(List<PlaceOrderLinesObject> oRDER_LINES) {
		ORDER_LINES = oRDER_LINES;
	}
	
	@Override
	public String toString() {
		return "PlaceOrderObject [CUST_PO_NUMBER=" + CUST_PO_NUMBER
				+ ", ORDER_TYPE=" + ORDER_TYPE + ", USER_NAME=" + USER_NAME
				+ ", SHIPPING_METHOD=" + SHIPPING_METHOD + ", SHIP_TO_ORG="
				+ SHIP_TO_ORG + ", BILL_TO_ORG=" + BILL_TO_ORG + ", STORE_ID="
				+ STORE_ID + ", CUSTOMER_NOTES=" + CUSTOMER_NOTES
				+ ", REQUESTED_DATE=" + REQUESTED_DATE + ", ORDER_LINES="
				+ ORDER_LINES + "]";
	}
	
	

	
}
