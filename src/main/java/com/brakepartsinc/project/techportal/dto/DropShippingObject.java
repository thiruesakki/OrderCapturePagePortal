package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class DropShippingObject {
	
	private String x_return_msg="";
	private String x_return_status="";
	private String x_location="";
	public String getX_return_msg() {
		return x_return_msg;
	}
	public void setX_return_msg(String x_return_msg) {
		this.x_return_msg = x_return_msg;
	}
	public String getX_return_status() {
		return x_return_status;
	}
	public void setX_return_status(String x_return_status) {
		this.x_return_status = x_return_status;
	}
	public String getX_location() {
		return x_location;
	}
	public void setX_location(String x_location) {
		this.x_location = x_location;
	}
	
	@Override
	public String toString() {
		return "DropShippingObject [x_return_msg=" + x_return_msg
				+ ", x_return_status=" + x_return_status + ", x_location="
				+ x_location + "]";
	}
	
}
