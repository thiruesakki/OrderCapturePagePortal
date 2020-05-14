package com.brakepartsinc.project.techportal.dto;

public class InvoicePaymentObject {
	
	private String TRANSACTION_DATE = "";

	private int ORG_ID = 0;
	
	private int DAYS_OUTSTANDING = 0;

	private String ORDER_NUMBER = "";

	private double PAID_AMOUNT = 0.0;
	
	private String DUE_DATE = "";
	
	private String CUSTOMER_NAME = "";
	
	private double OUTSTANDING_AMOUNT = 0.0;

	private String INVOICE_NUMBER = "";
	
	private double INVOICE_AMOUNT = 0.0;

    private String CUSTOMER_NUMEBR = "";

	public String getTRANSACTION_DATE() {
		return TRANSACTION_DATE;
	}

	public void setTRANSACTION_DATE(String tRANSACTION_DATE) {
		TRANSACTION_DATE = tRANSACTION_DATE;
	}

	public int getORG_ID() {
		return ORG_ID;
	}

	public void setORG_ID(int oRG_ID) {
		ORG_ID = oRG_ID;
	}

	public int getDAYS_OUTSTANDING() {
		return DAYS_OUTSTANDING;
	}

	public void setDAYS_OUTSTANDING(int dAYS_OUTSTANDING) {
		DAYS_OUTSTANDING = dAYS_OUTSTANDING;
	}

	public String getORDER_NUMBER() {
		return ORDER_NUMBER;
	}

	public void setORDER_NUMBER(String oRDER_NUMBER) {
		ORDER_NUMBER = oRDER_NUMBER;
	}

	public double getPAID_AMOUNT() {
		return PAID_AMOUNT;
	}

	public void setPAID_AMOUNT(double pAID_AMOUNT) {
		PAID_AMOUNT = pAID_AMOUNT;
	}

	public String getDUE_DATE() {
		return DUE_DATE;
	}

	public void setDUE_DATE(String dUE_DATE) {
		DUE_DATE = dUE_DATE;
	}

	public String getCUSTOMER_NAME() {
		return CUSTOMER_NAME;
	}

	public void setCUSTOMER_NAME(String cUSTOMER_NAME) {
		CUSTOMER_NAME = cUSTOMER_NAME;
	}

	public double getOUTSTANDING_AMOUNT() {
		return OUTSTANDING_AMOUNT;
	}

	public void setOUTSTANDING_AMOUNT(double oUTSTANDING_AMOUNT) {
		OUTSTANDING_AMOUNT = oUTSTANDING_AMOUNT;
	}

	public String getINVOICE_NUMBER() {
		return INVOICE_NUMBER;
	}

	public void setINVOICE_NUMBER(String iNVOICE_NUMBER) {
		INVOICE_NUMBER = iNVOICE_NUMBER;
	}

	public double getINVOICE_AMOUNT() {
		return INVOICE_AMOUNT;
	}

	public void setINVOICE_AMOUNT(double iNVOICE_AMOUNT) {
		INVOICE_AMOUNT = iNVOICE_AMOUNT;
	}

	public String getCUSTOMER_NUMEBR() {
		return CUSTOMER_NUMEBR;
	}

	public void setCUSTOMER_NUMEBR(String cUSTOMER_NUMEBR) {
		CUSTOMER_NUMEBR = cUSTOMER_NUMEBR;
	}

	@Override
	public String toString() {
		return "InvoicePaymentObject [TRANSACTION_DATE=" + TRANSACTION_DATE
				+ ", ORG_ID=" + ORG_ID + ", DAYS_OUTSTANDING="
				+ DAYS_OUTSTANDING + ", ORDER_NUMBER=" + ORDER_NUMBER
				+ ", PAID_AMOUNT=" + PAID_AMOUNT + ", DUE_DATE=" + DUE_DATE
				+ ", CUSTOMER_NAME=" + CUSTOMER_NAME + ", OUTSTANDING_AMOUNT="
				+ OUTSTANDING_AMOUNT + ", INVOICE_NUMBER=" + INVOICE_NUMBER
				+ ", INVOICE_AMOUNT=" + INVOICE_AMOUNT + ", CUSTOMER_NUMEBR="
				+ CUSTOMER_NUMEBR + "]";
	}

    

}
