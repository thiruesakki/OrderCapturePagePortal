package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class ShipToObject {

	private String x_response_message="";
	private String x_response_status="";
	List<ShipToAddressObject> x_ship_to_address=null;
	private String x_bill_to="";
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
	public List<ShipToAddressObject> getX_ship_to_address() {
		return x_ship_to_address;
	}
	public void setX_ship_to_address(List<ShipToAddressObject> x_ship_to_address) {
		this.x_ship_to_address = x_ship_to_address;
	}
	public String getX_bill_to() {
		return x_bill_to;
	}
	public void setX_bill_to(String x_bill_to) {
		this.x_bill_to = x_bill_to;
	}
	@Override
	public String toString() {
		return "ShipToObject [x_response_message=" + x_response_message
				+ ", x_response_status=" + x_response_status
				+ ", x_ship_to_address=" + x_ship_to_address + ", x_bill_to="
				+ x_bill_to + "]";
	}
	
}
