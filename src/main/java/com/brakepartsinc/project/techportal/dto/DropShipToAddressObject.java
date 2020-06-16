package com.brakepartsinc.project.techportal.dto;

public class DropShipToAddressObject {

	private String ACCOUNT_NUMBER = "";
	private String ADDRESS1 = "";
	private String ADDRESS2 = "";
	private String ADDRESS3 = "";
	private String LOCATION = "";
	
	public String getACCOUNT_NUMBER() {
		return ACCOUNT_NUMBER;
	}
	public void setACCOUNT_NUMBER(String aCCOUNT_NUMBER) {
		ACCOUNT_NUMBER = aCCOUNT_NUMBER;
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
	public String getLOCATION() {
		return LOCATION;
	}
	public void setLOCATION(String lOCATION) {
		LOCATION = lOCATION;
	}
	@Override
	public String toString() {
		return "DropShipToAddressObject [ACCOUNT_NUMBER=" + ACCOUNT_NUMBER
				+ ", ADDRESS1=" + ADDRESS1 + ", ADDRESS2=" + ADDRESS2
				+ ", ADDRESS3=" + ADDRESS3 + ", LOCATION=" + LOCATION + "]";
	}

}
