package com.brakepartsinc.project.techportal.dto;

public class PaymentDetailsObject {
	
    private String REFERENCE = "";
	
    private double AMOUNT = 0.0;
    
    private int LINE_NUM = 0;
	
	private String PAYMENT_DATE = "";
	
	private String PAYMENT_METHOD = "";

	public String getREFERENCE() {
		return REFERENCE;
	}

	public void setREFERENCE(String rEFERENCE) {
		REFERENCE = rEFERENCE;
	}

	public double getAMOUNT() {
		return AMOUNT;
	}

	public void setAMOUNT(double aMOUNT) {
		AMOUNT = aMOUNT;
	}

	public int getLINE_NUM() {
		return LINE_NUM;
	}

	public void setLINE_NUM(int lINE_NUM) {
		LINE_NUM = lINE_NUM;
	}

	public String getPAYMENT_DATE() {
		return PAYMENT_DATE;
	}

	public void setPAYMENT_DATE(String pAYMENT_DATE) {
		PAYMENT_DATE = pAYMENT_DATE;
	}

	public String getPAYMENT_METHOD() {
		return PAYMENT_METHOD;
	}

	public void setPAYMENT_METHOD(String pAYMENT_METHOD) {
		PAYMENT_METHOD = pAYMENT_METHOD;
	}

	@Override
	public String toString() {
		return "PaymentDetailsObject [REFERENCE=" + REFERENCE + ", AMOUNT="
				+ AMOUNT + ", LINE_NUM=" + LINE_NUM + ", PAYMENT_DATE="
				+ PAYMENT_DATE + ", PAYMENT_METHOD=" + PAYMENT_METHOD + "]";
	}
	

}
