package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class PaymentObject {
	
	private String x_response_message="";
	
	private List<InvoicePaymentObject> x_payment_matching=null;
	
	private List<PaymentDetailsObject> x_payment_details=null;
	
	private String x_response_status="";

	public String getX_response_message() {
		return x_response_message;
	}

	public void setX_response_message(String x_response_message) {
		this.x_response_message = x_response_message;
	}

	public List<InvoicePaymentObject> getX_payment_matching() {
		return x_payment_matching;
	}

	public void setX_payment_matching(List<InvoicePaymentObject> x_payment_matching) {
		this.x_payment_matching = x_payment_matching;
	}

	public List<PaymentDetailsObject> getX_payment_details() {
		return x_payment_details;
	}

	public void setX_payment_details(List<PaymentDetailsObject> x_payment_details) {
		this.x_payment_details = x_payment_details;
	}

	public String getX_response_status() {
		return x_response_status;
	}

	public void setX_response_status(String x_response_status) {
		this.x_response_status = x_response_status;
	}

	@Override
	public String toString() {
		return "PaymentObject [x_response_message=" + x_response_message
				+ ", x_payment_matching=" + x_payment_matching
				+ ", x_response_status=" + x_response_status + "]";
	}


	
}
