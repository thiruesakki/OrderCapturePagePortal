package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class OrderHistoryListObject {

	private String x_response_message="";
	
	private String x_response_status="";
	
	List<OrderHistoryObject> x_order_history=null;
	
	List<OrderHistoryObject> x_rma_order_history=null;
	
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
	public List<OrderHistoryObject> getX_order_history() {
		return x_order_history;
	}
	public void setX_order_history(List<OrderHistoryObject> x_order_history) {
		this.x_order_history = x_order_history;
	}
	public List<OrderHistoryObject> getX_rma_order_history() {
		return x_rma_order_history;
	}
	public void setX_rma_order_history(List<OrderHistoryObject> x_rma_order_history) {
		this.x_rma_order_history = x_rma_order_history;
	}
	@Override
	public String toString() {
		return "OrderHistoryListObject [x_response_message="
				+ x_response_message + ", x_response_status="
				+ x_response_status + ", x_order_history=" + x_order_history
				+ ", x_rma_order_history=" + x_rma_order_history + "]";
	}
}
