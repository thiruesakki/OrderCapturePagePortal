package com.brakepartsinc.project.techportal.dto;

public class SOLineItemObject {

	int LINE_NUMBER = 0;

	String PART_NUMBER = "";

	String DESCRIPTION = "";

	String UNIT_WEIGHT = "";

	String BRAND = "";

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

	public String getUNIT_WEIGHT() {
		return UNIT_WEIGHT;
	}

	public void setUNIT_WEIGHT(String uNIT_WEIGHT) {
		UNIT_WEIGHT = uNIT_WEIGHT;
	}

	public String getBRAND() {
		return BRAND;
	}

	public void setBRAND(String bRAND) {
		BRAND = bRAND;
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
				+ DESCRIPTION + ", UNIT_WEIGHT=" + UNIT_WEIGHT + ", BRAND="
				+ BRAND + ", RETURNABLE_YN=" + RETURNABLE_YN + "]";
	}

}
