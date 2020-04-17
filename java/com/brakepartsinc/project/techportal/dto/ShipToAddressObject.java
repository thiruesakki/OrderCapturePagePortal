package com.brakepartsinc.project.techportal.dto;

public class ShipToAddressObject {

	private String ACCOUNT_NUMBER = "";
	private String ACCOUNT_NAME = "";
	private String PARTY_SITE_ID = "";
	private String ADDRESS1 = "";
	private String ADDRESS2 = "";
	private String ADDRESS3 = "";
	private String CITY = "";
	private String STATE = "";
	private String POSTAL_CODE = "";
	private String COUNTRY = "";
	private String WAREHOUSE_ID = "";
	private String DEFAULT_DC = "";
	private String LOCATION = "";
	private String SHIP_TO = "";
	private String BILL_TO= "";

	public String getACCOUNT_NUMBER() {
		return ACCOUNT_NUMBER;
	}

	public void setACCOUNT_NUMBER(String aCCOUNT_NUMBER) {
		ACCOUNT_NUMBER = aCCOUNT_NUMBER;
	}

	public String getACCOUNT_NAME() {
		return ACCOUNT_NAME;
	}

	public void setACCOUNT_NAME(String aCCOUNT_NAME) {
		ACCOUNT_NAME = aCCOUNT_NAME;
	}

	public String getPARTY_SITE_ID() {
		return PARTY_SITE_ID;
	}

	public void setPARTY_SITE_ID(String pARTY_SITE_ID) {
		PARTY_SITE_ID = pARTY_SITE_ID;
	}

	public String getADDRESS1() {
		return ADDRESS1;
	}

	public void setADDRESS1(String aDDRESS1) {
		ADDRESS1 = aDDRESS1;
	}

	public String getADDRESS2() {
		return ADDRESS2;
	}

	public void setADDRESS2(String aDDRESS2) {
		ADDRESS2 = aDDRESS2;
	}

	public String getADDRESS3() {
		return ADDRESS3;
	}

	public void setADDRESS3(String aDDRESS3) {
		ADDRESS3 = aDDRESS3;
	}

	public String getCITY() {
		return CITY;
	}

	public void setCITY(String cITY) {
		CITY = cITY;
	}

	public String getSTATE() {
		return STATE;
	}

	public void setSTATE(String sTATE) {
		STATE = sTATE;
	}

	public String getPOSTAL_CODE() {
		return POSTAL_CODE;
	}

	public void setPOSTAL_CODE(String pOSTAL_CODE) {
		POSTAL_CODE = pOSTAL_CODE;
	}

	public String getCOUNTRY() {
		return COUNTRY;
	}

	public void setCOUNTRY(String cOUNTRY) {
		COUNTRY = cOUNTRY;
	}

	public String getWAREHOUSE_ID() {
		return WAREHOUSE_ID;
	}

	public void setWAREHOUSE_ID(String wAREHOUSE_ID) {
		WAREHOUSE_ID = wAREHOUSE_ID;
	}

	public String getDEFAULT_DC() {
		return DEFAULT_DC;
	}

	public void setDEFAULT_DC(String dEFAULT_DC) {
		DEFAULT_DC = dEFAULT_DC;
	}

	public String getLOCATION() {
		return LOCATION;
	}

	public void setLOCATION(String lOCATION) {
		LOCATION = lOCATION;
	}
	
	public String getSHIP_TO() {
		return SHIP_TO;
	}

	public void setSHIP_TO(String sHIP_TO) {
		SHIP_TO = sHIP_TO;
	}

	public String getBILL_TO() {
		return BILL_TO;
	}

	public void setBILL_TO(String bILL_TO) {
		BILL_TO = bILL_TO;
	}

	@Override
	public String toString() {
		return "ShipToAddressObject [ACCOUNT_NUMBER=" + ACCOUNT_NUMBER
				+ ", ACCOUNT_NAME=" + ACCOUNT_NAME + ", PARTY_SITE_ID="
				+ PARTY_SITE_ID + ", ADDRESS1=" + ADDRESS1 + ", ADDRESS2="
				+ ADDRESS2 + ", ADDRESS3=" + ADDRESS3 + ", CITY=" + CITY
				+ ", STATE=" + STATE + ", POSTAL_CODE=" + POSTAL_CODE
				+ ", COUNTRY=" + COUNTRY + ", WAREHOUSE_ID=" + WAREHOUSE_ID
				+ ", DEFAULT_DC=" + DEFAULT_DC + ", LOCATION=" + LOCATION
				+ ", SHIP_TO=" + SHIP_TO + ", BILL_TO=" + BILL_TO + "]";
	}

}
