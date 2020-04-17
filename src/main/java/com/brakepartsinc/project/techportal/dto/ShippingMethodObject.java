package com.brakepartsinc.project.techportal.dto;

public class ShippingMethodObject {

	private String id = "";

	private String shipMethodCode = "";

	private String freightCode = "";

	private String description = "";

	private String status = "";

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getShipMethodCode() {
		return shipMethodCode;
	}

	public String getFreightCode() {
		return freightCode;
	}

	public void setShipMethodCode(String shipMethodCode) {
		this.shipMethodCode = shipMethodCode;
	}

	public void setFreightCode(String freightCode) {
		this.freightCode = freightCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "ShippingMethodObject [id=" + id + ", ship_method_code="
				+ shipMethodCode + ", freight_code=" + freightCode
				+ ", description=" + description + ", status=" + status + "]";
	}
}
