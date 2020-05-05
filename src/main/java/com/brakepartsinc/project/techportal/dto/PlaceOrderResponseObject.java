package com.brakepartsinc.project.techportal.dto;

public class PlaceOrderResponseObject {
	
	private String x_sales_order_number="";
	private String x_response_message="";
	private String x_response_status="";
	
	public String getX_sales_order_number() {
		return x_sales_order_number;
	}
	public void setX_sales_order_number(String x_sales_order_number) {
		this.x_sales_order_number = x_sales_order_number;
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
		return "PlaceOrderResponseObject [x_sales_order_number="
				+ x_sales_order_number + ", x_response_message="
				+ x_response_message + ", x_response_status="
				+ x_response_status + "]";
	}
	
	
	

}
