package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class InvoiceObject {

	private String x_response_message="";
	
	private String x_response_status="";
	
	private List<InvoiceDetailObject> x_inv_details=null;

	public String getX_response_message() {
		return x_response_message;
	}

	public void setX_response_message(String x_response_message) {
		this.x_response_message = x_response_message;
	}

	public String getX_response_status() {
		return x_response_status;
	}

	public void setX_response_status(String x_response_status) {
		this.x_response_status = x_response_status;
	}

	public List<InvoiceDetailObject> getX_inv_details() {
		return x_inv_details;
	}

	public void setX_inv_details(List<InvoiceDetailObject> x_inv_details) {
		this.x_inv_details = x_inv_details;
	}

	@Override
	public String toString() {
		return "InvoiceObject [x_response_message=" + x_response_message
				+ ", x_response_status=" + x_response_status
				+ ", x_inv_details=" + x_inv_details + "]";
	}
	
}
