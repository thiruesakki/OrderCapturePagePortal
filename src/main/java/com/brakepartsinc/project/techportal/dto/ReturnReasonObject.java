package com.brakepartsinc.project.techportal.dto;

public class ReturnReasonObject {
	
	private String MEANING="";
	
	private String DESCRIPTION="";
	
	private String LOOKUP_CODE="";

	public String getMEANING() {
		return MEANING;
	}

	public void setMEANING(String mEANING) {
		MEANING = mEANING;
	}

	public String getDESCRIPTION() {
		return DESCRIPTION;
	}

	public void setDESCRIPTION(String dESCRIPTION) {
		DESCRIPTION = dESCRIPTION;
	}

	public String getLOOKUP_CODE() {
		return LOOKUP_CODE;
	}

	public void setLOOKUP_CODE(String lOOKUP_CODE) {
		LOOKUP_CODE = lOOKUP_CODE;
	}

	@Override
	public String toString() {
		return "ReturnReasonObject [MEANING=" + MEANING + ", DESCRIPTION="
				+ DESCRIPTION + ", LOOKUP_CODE=" + LOOKUP_CODE + "]";
	}
	

}
