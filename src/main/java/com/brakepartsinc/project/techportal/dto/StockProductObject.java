package com.brakepartsinc.project.techportal.dto;

public class StockProductObject {
	
	private String INV_ITEM_ID="";
	private String ERROR_MESSAGE="";
	private String AVAIL_INV_ITEM_ID="";
	private String AVAILABLE_QTY="";
	private String PRODUCT_NUM="";
	private String BRAND_NAME="";
	private String ITEM_STATUS="";
	private String ITEM_UOM_CODE="";
	private String ITEM_MESSAGE="";
	private String MIN_ORDER_QUNTY="";
	private String ORGANIZATION_CODE="";
	private String ORGANIZATION_ID="";
	private String ITEM_DESCRIPTION="";
	private String UNIT_WEIGHT="";
	private String ONHAND_QTY="";
	
	
	public String getINV_ITEM_ID() {
		return INV_ITEM_ID;
	}
	public void setINV_ITEM_ID(String iNV_ITEM_ID) {
		INV_ITEM_ID = iNV_ITEM_ID;
	}
	public String getERROR_MESSAGE() {
		return ERROR_MESSAGE;
	}
	public void setERROR_MESSAGE(String eRROR_MESSAGE) {
		ERROR_MESSAGE = eRROR_MESSAGE;
	}
	public String getAVAIL_INV_ITEM_ID() {
		return AVAIL_INV_ITEM_ID;
	}
	public void setAVAIL_INV_ITEM_ID(String aVAIL_INV_ITEM_ID) {
		AVAIL_INV_ITEM_ID = aVAIL_INV_ITEM_ID;
	}
	public String getAVAILABLE_QTY() {
		return AVAILABLE_QTY;
	}
	public void setAVAILABLE_QTY(String aVAILABLE_QTY) {
		AVAILABLE_QTY = aVAILABLE_QTY;
	}
	public String getPRODUCT_NUM() {
		return PRODUCT_NUM;
	}
	public void setPRODUCT_NUM(String pRODUCT_NUM) {
		PRODUCT_NUM = pRODUCT_NUM;
	}
	public String getBRAND_NAME() {
		return BRAND_NAME;
	}
	public void setBRAND_NAME(String bRAND_NAME) {
		BRAND_NAME = bRAND_NAME;
	}
	public String getITEM_STATUS() {
		return ITEM_STATUS;
	}
	public void setITEM_STATUS(String iTEM_STATUS) {
		ITEM_STATUS = iTEM_STATUS;
	}
	public String getITEM_UOM_CODE() {
		return ITEM_UOM_CODE;
	}
	public void setITEM_UOM_CODE(String iTEM_UOM_CODE) {
		ITEM_UOM_CODE = iTEM_UOM_CODE;
	}
	public String getITEM_MESSAGE() {
		return ITEM_MESSAGE;
	}
	public void setITEM_MESSAGE(String iTEM_MESSAGE) {
		ITEM_MESSAGE = iTEM_MESSAGE;
	}
	public String getMIN_ORDER_QUNTY() {
		return MIN_ORDER_QUNTY;
	}
	public void setMIN_ORDER_QUNTY(String mIN_ORDER_QUNTY) {
		MIN_ORDER_QUNTY = mIN_ORDER_QUNTY;
	}
	public String getORGANIZATION_CODE() {
		return ORGANIZATION_CODE;
	}
	public void setORGANIZATION_CODE(String oRGANIZATION_CODE) {
		ORGANIZATION_CODE = oRGANIZATION_CODE;
	}
	public String getORGANIZATION_ID() {
		return ORGANIZATION_ID;
	}
	public void setORGANIZATION_ID(String oRGANIZATION_ID) {
		ORGANIZATION_ID = oRGANIZATION_ID;
	}
	public String getITEM_DESCRIPTION() {
		return ITEM_DESCRIPTION;
	}
	public void setITEM_DESCRIPTION(String iTEM_DESCRIPTION) {
		ITEM_DESCRIPTION = iTEM_DESCRIPTION;
	}
	public String getUNIT_WEIGHT() {
		return UNIT_WEIGHT;
	}
	public void setUNIT_WEIGHT(String uNIT_WEIGHT) {
		UNIT_WEIGHT = uNIT_WEIGHT;
	}
	public String getONHAND_QTY() {
		return ONHAND_QTY;
	}
	public void setONHAND_QTY(String oNHAND_QTY) {
		ONHAND_QTY = oNHAND_QTY;
	}
	
	
	@Override
	public String toString() {
		return "StockProductObject [INV_ITEM_ID=" + INV_ITEM_ID
				+ ", ERROR_MESSAGE=" + ERROR_MESSAGE + ", AVAIL_INV_ITEM_ID="
				+ AVAIL_INV_ITEM_ID + ", AVAILABLE_QTY=" + AVAILABLE_QTY
				+ ", PRODUCT_NUM=" + PRODUCT_NUM + ", BRAND_NAME=" + BRAND_NAME
				+ ", ITEM_STATUS=" + ITEM_STATUS + ", ITEM_UOM_CODE="
				+ ITEM_UOM_CODE + ", ITEM_MESSAGE=" + ITEM_MESSAGE
				+ ", MIN_ORDER_QUNTY=" + MIN_ORDER_QUNTY
				+ ", ORGANIZATION_CODE=" + ORGANIZATION_CODE
				+ ", ORGANIZATION_ID=" + ORGANIZATION_ID
				+ ", ITEM_DESCRIPTION=" + ITEM_DESCRIPTION + ", UNIT_WEIGHT="
				+ UNIT_WEIGHT + ", ONHAND_QTY=" + ONHAND_QTY + "]";
	}
	
	

}
