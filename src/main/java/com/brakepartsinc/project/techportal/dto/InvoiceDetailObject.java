package com.brakepartsinc.project.techportal.dto;

public class InvoiceDetailObject {

	private int ORDERED_QUANTITY = 0;

	private String INVOICE_CURRENCY_CODE = "";

	private int LINE_NUMBER = 0;

	private int ORG_ID = 0;

	private String ORDER_NUMBER = "";

	private int TRX_NUMBER = 0;

	private double TAX = 0.0;
	
	private double INVOICE_AMOUNT = 0.0;

	private String TRX_DATE = "";

	private double UNIT_SELLING_PRICE = 0.0;

	private String ORDERED_ITEM = "";

	public int getORDERED_QUANTITY() {
		return ORDERED_QUANTITY;
	}

	public void setORDERED_QUANTITY(int oRDERED_QUANTITY) {
		ORDERED_QUANTITY = oRDERED_QUANTITY;
	}

	public String getINVOICE_CURRENCY_CODE() {
		return INVOICE_CURRENCY_CODE;
	}

	public void setINVOICE_CURRENCY_CODE(String iNVOICE_CURRENCY_CODE) {
		INVOICE_CURRENCY_CODE = iNVOICE_CURRENCY_CODE;
	}

	public int getLINE_NUMBER() {
		return LINE_NUMBER;
	}

	public void setLINE_NUMBER(int lINE_NUMBER) {
		LINE_NUMBER = lINE_NUMBER;
	}

	public int getORG_ID() {
		return ORG_ID;
	}

	public void setORG_ID(int oRG_ID) {
		ORG_ID = oRG_ID;
	}

	public String getORDER_NUMBER() {
		return ORDER_NUMBER;
	}

	public void setORDER_NUMBER(String oRDER_NUMBER) {
		ORDER_NUMBER = oRDER_NUMBER;
	}

	public int getTRX_NUMBER() {
		return TRX_NUMBER;
	}

	public void setTRX_NUMBER(int tRX_NUMBER) {
		TRX_NUMBER = tRX_NUMBER;
	}

	public double getTAX() {
		return TAX;
	}

	public void setTAX(double tAX) {
		TAX = tAX;
	}

	public double getINVOICE_AMOUNT() {
		return INVOICE_AMOUNT;
	}

	public void setINVOICE_AMOUNT(double iNVOICE_AMOUNT) {
		INVOICE_AMOUNT = iNVOICE_AMOUNT;
	}

	public String getTRX_DATE() {
		return TRX_DATE;
	}

	public void setTRX_DATE(String tRX_DATE) {
		TRX_DATE = tRX_DATE;
	}

	public double getUNIT_SELLING_PRICE() {
		return UNIT_SELLING_PRICE;
	}

	public void setUNIT_SELLING_PRICE(double uNIT_SELLING_PRICE) {
		UNIT_SELLING_PRICE = uNIT_SELLING_PRICE;
	}

	public String getORDERED_ITEM() {
		return ORDERED_ITEM;
	}

	public void setORDERED_ITEM(String oRDERED_ITEM) {
		ORDERED_ITEM = oRDERED_ITEM;
	}

	@Override
	public String toString() {
		return "InvoiceDetailObject [ORDERED_QUANTITY=" + ORDERED_QUANTITY
				+ ", INVOICE_CURRENCY_CODE=" + INVOICE_CURRENCY_CODE
				+ ", LINE_NUMBER=" + LINE_NUMBER + ", ORG_ID=" + ORG_ID
				+ ", ORDER_NUMBER=" + ORDER_NUMBER + ", TRX_NUMBER="
				+ TRX_NUMBER + ", TAX=" + TAX + ", INVOICE_AMOUNT="
				+ INVOICE_AMOUNT + ", TRX_DATE=" + TRX_DATE
				+ ", UNIT_SELLING_PRICE=" + UNIT_SELLING_PRICE
				+ ", ORDERED_ITEM=" + ORDERED_ITEM + "]";
	}

}
