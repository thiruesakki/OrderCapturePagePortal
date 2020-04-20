package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class CheckStockObject {
	
	private String x_response_message="";
	private String x_response_status="";
	List<StockProductObject> x_product_avail=null;
	
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
	public List<StockProductObject> getX_product_avail() {
		return x_product_avail;
	}
	public void setX_product_avail(List<StockProductObject> x_product_avail) {
		this.x_product_avail = x_product_avail;
	}
	
	
	@Override
	public String toString() {
		return "CheckStockObject [x_response_message=" + x_response_message
				+ ", x_response_status=" + x_response_status
				+ ", x_product_avail=" + x_product_avail + "]";
	}
	
	

}
