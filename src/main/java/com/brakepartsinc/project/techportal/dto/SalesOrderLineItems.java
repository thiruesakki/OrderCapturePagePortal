package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class SalesOrderLineItems {

	private List<SOLineItemObject> x_so_line_items = null;

	private String x_response_message = "";

	private String x_response_status = "";

	public List<SOLineItemObject> getX_so_line_items() {
		return x_so_line_items;
	}

	public void setX_so_line_items(List<SOLineItemObject> x_so_line_items) {
		this.x_so_line_items = x_so_line_items;
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
		return "SalesOrderLineItems [x_so_line_items=" + x_so_line_items
				+ ", x_response_message=" + x_response_message
				+ ", x_response_status=" + x_response_status + "]";
	}

}
