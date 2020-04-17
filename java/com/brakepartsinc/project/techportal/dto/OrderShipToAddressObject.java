package com.brakepartsinc.project.techportal.dto;

public class OrderShipToAddressObject {
	
	private String SALES_ORDER_NUM = "";
	private String SHIP_TO_POSTAL_CODE = "";
	private String PO_NUM = "";
	private String ORDER_DATE = "";
	private String SHIP_TO_PROVINCE = "";
	private String SHIP_TO_ADDRS_LINE1 = "";
	private String SHIP_TO_CITY = "";
	private String SHIP_TO_ADDRS_LINE2 = "";
	private String SHIP_TO_ADDRS_LINE3 = "";
	private String SHIP_TO_NAME = "";
	private String SHIP_TO_COUNTRY = "";
	private String SHIP_TO_STATE = "";
	
	
	public String getSALES_ORDER_NUM() {
		return SALES_ORDER_NUM;
	}
	public void setSALES_ORDER_NUM(String sALES_ORDER_NUM) {
		SALES_ORDER_NUM = sALES_ORDER_NUM;
	}
	public String getSHIP_TO_POSTAL_CODE() {
		return SHIP_TO_POSTAL_CODE;
	}
	public void setSHIP_TO_POSTAL_CODE(String sHIP_TO_POSTAL_CODE) {
		SHIP_TO_POSTAL_CODE = sHIP_TO_POSTAL_CODE;
	}
	public String getPO_NUM() {
		return PO_NUM;
	}
	public void setPO_NUM(String pO_NUM) {
		PO_NUM = pO_NUM;
	}
	public String getORDER_DATE() {
		return ORDER_DATE;
	}
	public void setORDER_DATE(String oRDER_DATE) {
		ORDER_DATE = oRDER_DATE;
	}
	public String getSHIP_TO_PROVINCE() {
		return SHIP_TO_PROVINCE;
	}
	public void setSHIP_TO_PROVINCE(String sHIP_TO_PROVINCE) {
		SHIP_TO_PROVINCE = sHIP_TO_PROVINCE;
	}
	public String getSHIP_TO_ADDRS_LINE1() {
		return SHIP_TO_ADDRS_LINE1;
	}
	public void setSHIP_TO_ADDRS_LINE1(String sHIP_TO_ADDRS_LINE1) {
		SHIP_TO_ADDRS_LINE1 = sHIP_TO_ADDRS_LINE1;
	}
	public String getSHIP_TO_CITY() {
		return SHIP_TO_CITY;
	}
	public void setSHIP_TO_CITY(String sHIP_TO_CITY) {
		SHIP_TO_CITY = sHIP_TO_CITY;
	}
	public String getSHIP_TO_ADDRS_LINE2() {
		return SHIP_TO_ADDRS_LINE2;
	}
	public void setSHIP_TO_ADDRS_LINE2(String sHIP_TO_ADDRS_LINE2) {
		SHIP_TO_ADDRS_LINE2 = sHIP_TO_ADDRS_LINE2;
	}
	public String getSHIP_TO_ADDRS_LINE3() {
		return SHIP_TO_ADDRS_LINE3;
	}
	public void setSHIP_TO_ADDRS_LINE3(String sHIP_TO_ADDRS_LINE3) {
		SHIP_TO_ADDRS_LINE3 = sHIP_TO_ADDRS_LINE3;
	}
	public String getSHIP_TO_NAME() {
		return SHIP_TO_NAME;
	}
	public void setSHIP_TO_NAME(String sHIP_TO_NAME) {
		SHIP_TO_NAME = sHIP_TO_NAME;
	}
	public String getSHIP_TO_COUNTRY() {
		return SHIP_TO_COUNTRY;
	}
	public void setSHIP_TO_COUNTRY(String sHIP_TO_COUNTRY) {
		SHIP_TO_COUNTRY = sHIP_TO_COUNTRY;
	}
	public String getSHIP_TO_STATE() {
		return SHIP_TO_STATE;
	}
	public void setSHIP_TO_STATE(String sHIP_TO_STATE) {
		SHIP_TO_STATE = sHIP_TO_STATE;
	}
	
	
	@Override
	public String toString() {
		return "OrderShipToAddressObject [SALES_ORDER_NUM=" + SALES_ORDER_NUM
				+ ", SHIP_TO_POSTAL_CODE=" + SHIP_TO_POSTAL_CODE + ", PO_NUM="
				+ PO_NUM + ", ORDER_DATE=" + ORDER_DATE + ", SHIP_TO_PROVINCE="
				+ SHIP_TO_PROVINCE + ", SHIP_TO_ADDRS_LINE1="
				+ SHIP_TO_ADDRS_LINE1 + ", SHIP_TO_CITY=" + SHIP_TO_CITY
				+ ", SHIP_TO_ADDRS_LINE2=" + SHIP_TO_ADDRS_LINE2
				+ ", SHIP_TO_ADDRS_LINE3=" + SHIP_TO_ADDRS_LINE3
				+ ", SHIP_TO_NAME=" + SHIP_TO_NAME + ", SHIP_TO_COUNTRY="
				+ SHIP_TO_COUNTRY + ", SHIP_TO_STATE=" + SHIP_TO_STATE + "]";
	}

	

}
