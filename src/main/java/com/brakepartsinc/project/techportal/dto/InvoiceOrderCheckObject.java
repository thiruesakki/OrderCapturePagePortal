package com.brakepartsinc.project.techportal.dto;

public class InvoiceOrderCheckObject {
	
	private String x_inv_exist="";
	
	private String x_response_message="";
	
	private String x_response_status="";

	public String getX_inv_exist() {
		return x_inv_exist;
	}

	public void setX_inv_exist(String x_inv_exist) {
		this.x_inv_exist = x_inv_exist;
	}

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

	@Override
	public String toString() {
		return "InvoiceOrderCheckObject [x_inv_exist=" + x_inv_exist
				+ ", x_response_message=" + x_response_message
				+ ", x_response_status=" + x_response_status + "]";
	}
	
}
