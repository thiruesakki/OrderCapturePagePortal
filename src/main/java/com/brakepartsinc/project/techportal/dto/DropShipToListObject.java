package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class DropShipToListObject {

	private String x_response_message="";
	
	private String x_response_status="";
	
	List<DropShipToAddressObject> x_ship_to_address=null;

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

	public List<DropShipToAddressObject> getX_ship_to_address() {
		return x_ship_to_address;
	}

	public void setX_ship_to_address(List<DropShipToAddressObject> x_ship_to_address) {
		this.x_ship_to_address = x_ship_to_address;
	}

	@Override
	public String toString() {
		return "DropShipToListObject [x_response_message=" + x_response_message
				+ ", x_response_status=" + x_response_status
				+ ", x_ship_to_address=" + x_ship_to_address + "]";
	}
		
		
}
