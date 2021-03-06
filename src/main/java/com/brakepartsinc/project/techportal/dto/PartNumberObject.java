package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class PartNumberObject {

	private String x_response_message="";
	
	private List<List<String>> x_item_search=null;
	
	private List<List<String>> x_so_num_search=null;
	
	private List<List<String>> x_cust_po_num_search=null;
	
	private String x_response_status ="";

	public String getX_response_message() {
		return x_response_message;
	}

	public void setX_response_message(String x_response_message) {
		this.x_response_message = x_response_message;
	}

	public List<List<String>> getX_item_search() {
		return x_item_search;
	}

	public void setX_item_search(List<List<String>> x_item_search) {
		this.x_item_search = x_item_search;
	}

	public String getX_response_status() {
		return x_response_status;
	}

	public void setX_response_status(String x_response_status) {
		this.x_response_status = x_response_status;
	}

	public List<List<String>> getX_so_num_search() {
		return x_so_num_search;
	}

	public void setX_so_num_search(List<List<String>> x_so_num_search) {
		this.x_so_num_search = x_so_num_search;
	}

	public List<List<String>> getX_cust_po_num_search() {
		return x_cust_po_num_search;
	}

	public void setX_cust_po_num_search(List<List<String>> x_cust_po_num_search) {
		this.x_cust_po_num_search = x_cust_po_num_search;
	}

	@Override
	public String toString() {
		return "PartNumberObject [x_response_message=" + x_response_message
				+ ", x_item_search=" + x_item_search + ", x_so_num_search="
				+ x_so_num_search + ", x_cust_po_num_search="
				+ x_cust_po_num_search + ", x_response_status="
				+ x_response_status + "]";
	}

}
