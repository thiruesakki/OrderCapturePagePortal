package com.brakepartsinc.project.techportal.dto;

public class OrderShippingDetailsObject {
	
	private String CARRIER = "";
	private String SHIPPED_QTY = "";
	private String WAY_BILL_NUMBER = "";
	private String SHIPPED_DATE = "";
	private String SHIPPED_FROM = "";
	private String PART_DESCRIPTION = "";
	private String TRACKING_NUMBER = "";
	private String PART_NUMBER = "";
	private String SHIPMENT_NUM = "";
	private String MODE_OF_TRANSPORT = "";
	
	public String getCARRIER() {
		return CARRIER;
	}
	public void setCARRIER(String cARRIER) {
		CARRIER = cARRIER;
	}
	public String getSHIPPED_QTY() {
		return SHIPPED_QTY;
	}
	public void setSHIPPED_QTY(String sHIPPED_QTY) {
		SHIPPED_QTY = sHIPPED_QTY;
	}
	public String getWAY_BILL_NUMBER() {
		return WAY_BILL_NUMBER;
	}
	public void setWAY_BILL_NUMBER(String wAY_BILL_NUMBER) {
		WAY_BILL_NUMBER = wAY_BILL_NUMBER;
	}
	public String getSHIPPED_DATE() {
		return SHIPPED_DATE;
	}
	public void setSHIPPED_DATE(String sHIPPED_DATE) {
		SHIPPED_DATE = sHIPPED_DATE;
	}
	public String getSHIPPED_FROM() {
		return SHIPPED_FROM;
	}
	public void setSHIPPED_FROM(String sHIPPED_FROM) {
		SHIPPED_FROM = sHIPPED_FROM;
	}
	public String getPART_DESCRIPTION() {
		return PART_DESCRIPTION;
	}
	public void setPART_DESCRIPTION(String pART_DESCRIPTION) {
		PART_DESCRIPTION = pART_DESCRIPTION;
	}
	public String getTRACKING_NUMBER() {
		return TRACKING_NUMBER;
	}
	public void setTRACKING_NUMBER(String tRACKING_NUMBER) {
		TRACKING_NUMBER = tRACKING_NUMBER;
	}
	public String getPART_NUMBER() {
		return PART_NUMBER;
	}
	public void setPART_NUMBER(String pART_NUMBER) {
		PART_NUMBER = pART_NUMBER;
	}
	public String getSHIPMENT_NUM() {
		return SHIPMENT_NUM;
	}
	public void setSHIPMENT_NUM(String sHIPMENT_NUM) {
		SHIPMENT_NUM = sHIPMENT_NUM;
	}
	public String getMODE_OF_TRANSPORT() {
		return MODE_OF_TRANSPORT;
	}
	public void setMODE_OF_TRANSPORT(String mODE_OF_TRANSPORT) {
		MODE_OF_TRANSPORT = mODE_OF_TRANSPORT;
	}
	
	@Override
	public String toString() {
		return "OrderShippingDetailsObject [CARRIER=" + CARRIER
				+ ", SHIPPED_QTY=" + SHIPPED_QTY + ", WAY_BILL_NUMBER="
				+ WAY_BILL_NUMBER + ", SHIPPED_DATE=" + SHIPPED_DATE
				+ ", SHIPPED_FROM=" + SHIPPED_FROM + ", PART_DESCRIPTION="
				+ PART_DESCRIPTION + ", TRACKING_NUMBER=" + TRACKING_NUMBER
				+ ", PART_NUMBER=" + PART_NUMBER + ", SHIPMENT_NUM="
				+ SHIPMENT_NUM + ", MODE_OF_TRANSPORT=" + MODE_OF_TRANSPORT
				+ "]";
	}
	
	
}
