package com.brakepartsinc.project.techportal.dto;

public class RMAResponseObject {

	private int x_order_number = 0;
	private String x_return_message = "";

	public int getX_order_number() {
		return x_order_number;
	}

	public void setX_order_number(int x_order_number) {
		this.x_order_number = x_order_number;
	}

	public String getX_return_message() {
		return x_return_message;
	}

	public void setX_return_message(String x_return_message) {
		this.x_return_message = x_return_message;
	}

	@Override
	public String toString() {
		return "RMAResponseObject [x_order_number=" + x_order_number
				+ ", x_return_message=" + x_return_message + "]";
	}

}
