package com.brakepartsinc.project.techportal.dto;

public class RMAHistoryObject {
	
	private String RETURNED_PIECES="";
	
	private String ORDER_NUMBER="";
	
	private String RETURNED_DATE="";
	
	private String TOTAL_LINES="";
	
	private String SEARCH_TYPE="";
	
	private String CUST_PO_NUMBER="";
	
	private String RECEIPT_NUMBER="";
	
	private String RETURN_STATUS="";

	public String getRETURNED_PIECES() {
		return RETURNED_PIECES;
	}

	public void setRETURNED_PIECES(String rETURNED_PIECES) {
		RETURNED_PIECES = rETURNED_PIECES;
	}

	public String getORDER_NUMBER() {
		return ORDER_NUMBER;
	}

	public void setORDER_NUMBER(String oRDER_NUMBER) {
		ORDER_NUMBER = oRDER_NUMBER;
	}

	public String getRETURNED_DATE() {
		return RETURNED_DATE;
	}

	public void setRETURNED_DATE(String rETURNED_DATE) {
		RETURNED_DATE = rETURNED_DATE;
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

	public String getRECEIPT_NUMBER() {
		return RECEIPT_NUMBER;
	}

	public void setRECEIPT_NUMBER(String rECEIPT_NUMBER) {
		RECEIPT_NUMBER = rECEIPT_NUMBER;
	}

	public String getRETURN_STATUS() {
		return RETURN_STATUS;
	}

	public void setRETURN_STATUS(String rETURN_STATUS) {
		RETURN_STATUS = rETURN_STATUS;
	}

	@Override
	public String toString() {
		return "RMAHistoryObject [RETURNED_PIECES=" + RETURNED_PIECES
				+ ", ORDER_NUMBER=" + ORDER_NUMBER + ", RETURNED_DATE="
				+ RETURNED_DATE + ", TOTAL_LINES=" + TOTAL_LINES
				+ ", SEARCH_TYPE=" + SEARCH_TYPE + ", CUST_PO_NUMBER="
				+ CUST_PO_NUMBER + ", RECEIPT_NUMBER=" + RECEIPT_NUMBER
				+ ", RETURN_STATUS=" + RETURN_STATUS + "]";
	}
	
}
