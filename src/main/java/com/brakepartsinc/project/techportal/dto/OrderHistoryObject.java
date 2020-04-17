package com.brakepartsinc.project.techportal.dto;

import java.sql.Date;

public class OrderHistoryObject {

	private String SHIPPED_PIECES="";
	
	private String ORDERED_PIECES="";
	
	private String ORDER_NUMBER="";
	
	private String ORDERED_DATE="";
	
	private String TOTAL_LINES="";
	
	private String SEARCH_TYPE="";
	
	private String CUST_PO_NUMBER="";
	
	private String SHIP_DATE="";
	
	private String CANCELLED_PIECES="";

	public String getSHIPPED_PIECES() {
		return SHIPPED_PIECES;
	}

	public void setSHIPPED_PIECES(String sHIPPED_PIECES) {
		SHIPPED_PIECES = sHIPPED_PIECES;
	}

	public String getORDERED_PIECES() {
		return ORDERED_PIECES;
	}

	public void setORDERED_PIECES(String oRDERED_PIECES) {
		ORDERED_PIECES = oRDERED_PIECES;
	}

	public String getORDER_NUMBER() {
		return ORDER_NUMBER;
	}

	public void setORDER_NUMBER(String oRDER_NUMBER) {
		ORDER_NUMBER = oRDER_NUMBER;
	}

	public String getORDERED_DATE() {
		return ORDERED_DATE;
	}

	public void setORDERED_DATE(String oRDERED_DATE) {
		ORDERED_DATE = oRDERED_DATE;
	}

	public String getTOTAL_LINES() {
		return TOTAL_LINES;
	}

	public void setTOTAL_LINES(String tOTAL_LINES) {
		TOTAL_LINES = tOTAL_LINES;
	}

	public String getSEARCH_TYPE() {
		return SEARCH_TYPE;
	}

	public void setSEARCH_TYPE(String sEARCH_TYPE) {
		SEARCH_TYPE = sEARCH_TYPE;
	}

	public String getCUST_PO_NUMBER() {
		return CUST_PO_NUMBER;
	}

	public void setCUST_PO_NUMBER(String cUST_PO_NUMBER) {
		CUST_PO_NUMBER = cUST_PO_NUMBER;
	}

	public String getSHIP_DATE() {
		return SHIP_DATE;
	}

	public void setSHIP_DATE(String sHIP_DATE) {
		SHIP_DATE = sHIP_DATE;
	}

	public String getCANCELLED_PIECES() {
		return CANCELLED_PIECES;
	}

	public void setCANCELLED_PIECES(String cANCELLED_PIECES) {
		CANCELLED_PIECES = cANCELLED_PIECES;
	}

	@Override
	public String toString() {
		return "OrderHistoryObject [SHIPPED_PIECES=" + SHIPPED_PIECES
				+ ", ORDERED_PIECES=" + ORDERED_PIECES + ", ORDER_NUMBER="
				+ ORDER_NUMBER + ", ORDERED_DATE=" + ORDERED_DATE
				+ ", TOTAL_LINES=" + TOTAL_LINES + ", SEARCH_TYPE="
				+ SEARCH_TYPE + ", CUST_PO_NUMBER=" + CUST_PO_NUMBER
				+ ", SHIP_DATE=" + SHIP_DATE + ", CANCELLED_PIECES="
				+ CANCELLED_PIECES + "]";
	}

}
