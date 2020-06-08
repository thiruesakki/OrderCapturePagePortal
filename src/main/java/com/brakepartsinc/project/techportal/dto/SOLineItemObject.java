package com.brakepartsinc.project.techportal.dto;

public class SOLineItemObject {

	int LINE_NUMBER = 0;

	String PART_NUMBER = "";

	String DESCRIPTION = "";

	String SHIPPED_QUANTITY = "";

	String RETURNED_QUANTITY = "";

	String RETURNABLE_YN = "";

	public int getLINE_NUMBER() {
		return LINE_NUMBER;
	}

	public void setLINE_NUMBER(int lINE_NUMBER) {
		LINE_NUMBER = lINE_NUMBER;
	}

	public String getPART_NUMBER() {
		return PART_NUMBER;
	}

	public void setPART_NUMBER(String pART_NUMBER) {
		PART_NUMBER = pART_NUMBER;
	}

	public String getDESCRIPTION() {
		return DESCRIPTION;
	}

	public void setDESCRIPTION(String dESCRIPTION) {
		DESCRIPTION = dESCRIPTION;
	}

	public String getSHIPPED_QUANTITY() {
		return SHIPPED_QUANTITY;
	}

	public void setSHIPPED_QUANTITY(String sHIPPED_QUANTITY) {
		SHIPPED_QUANTITY = sHIPPED_QUANTITY;
	}

	public String getRETURNED_QUANTITY() {
		return RETURNED_QUANTITY;
	}

	public void setRETURNED_QUANTITY(String rETURNED_QUANTITY) {
		RETURNED_QUANTITY = rETURNED_QUANTITY;
	}

	public String getRETURNABLE_YN() {
		return RETURNABLE_YN;
	}

	public void setRETURNABLE_YN(String rETURNABLE_YN) {
		RETURNABLE_YN = rETURNABLE_YN;
	}

	@Override
	public String toString() {
		return "SOLineItemObject [LINE_NUMBER=" + LINE_NUMBER
				+ ", PART_NUMBER=" + PART_NUMBER + ", DESCRIPTION="
				+ DESCRIPTION + ", SHIPPED_QUANTITY=" + SHIPPED_QUANTITY
				+ ", RETURNED_QUANTITY=" + RETURNED_QUANTITY
				+ ", RETURNABLE_YN=" + RETURNABLE_YN + "]";
	}

}
