package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class OrderShipToObject {

	private String x_ship_to_city="";
	private String x_ship_to_line2="";
	private String x_po_num="";
	private String x_ship_to_line3="";
	private String x_ship_to_line1="";
	private String x_ship_to_postal_code="";
	private String x_ship_to_state="";
	List<OrderDetailsObject> x_order_detail=null;
	private String x_ship_to_number="";
	private String x_order_date="";
	private String x_ship_to_country="";
	private String x_sales_order_num="";
	private String x_response_message="";
	private String x_response_status="";
	public String getX_ship_to_city() {
		return x_ship_to_city;
	}
	public void setX_ship_to_city(String x_ship_to_city) {
		this.x_ship_to_city = x_ship_to_city;
	}
	public String getX_ship_to_line2() {
		return x_ship_to_line2;
	}
	public void setX_ship_to_line2(String x_ship_to_line2) {
		this.x_ship_to_line2 = x_ship_to_line2;
	}
	public String getX_po_num() {
		return x_po_num;
	}
	public void setX_po_num(String x_po_num) {
		this.x_po_num = x_po_num;
	}
	public String getX_ship_to_line3() {
		return x_ship_to_line3;
	}
	public void setX_ship_to_line3(String x_ship_to_line3) {
		this.x_ship_to_line3 = x_ship_to_line3;
	}
	public String getX_ship_to_line1() {
		return x_ship_to_line1;
	}
	public void setX_ship_to_line1(String x_ship_to_line1) {
		this.x_ship_to_line1 = x_ship_to_line1;
	}
	public String getX_ship_to_postal_code() {
		return x_ship_to_postal_code;
	}
	public void setX_ship_to_postal_code(String x_ship_to_postal_code) {
		this.x_ship_to_postal_code = x_ship_to_postal_code;
	}
	public String getX_ship_to_state() {
		return x_ship_to_state;
	}
	public void setX_ship_to_state(String x_ship_to_state) {
		this.x_ship_to_state = x_ship_to_state;
	}
	public List<OrderDetailsObject> getX_order_detail() {
		return x_order_detail;
	}
	public void setX_order_detail(List<OrderDetailsObject> x_order_detail) {
		this.x_order_detail = x_order_detail;
	}
	public String getX_ship_to_number() {
		return x_ship_to_number;
	}
	public void setX_ship_to_number(String x_ship_to_number) {
		this.x_ship_to_number = x_ship_to_number;
	}
	public String getX_order_date() {
		return x_order_date;
	}
	public void setX_order_date(String x_order_date) {
		this.x_order_date = x_order_date;
	}
	public String getX_ship_to_country() {
		return x_ship_to_country;
	}
	public void setX_ship_to_country(String x_ship_to_country) {
		this.x_ship_to_country = x_ship_to_country;
	}
	public String getX_sales_order_num() {
		return x_sales_order_num;
	}
	public void setX_sales_order_num(String x_sales_order_num) {
		this.x_sales_order_num = x_sales_order_num;
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
		return "OrderShipToObject [x_ship_to_city=" + x_ship_to_city
				+ ", x_ship_to_line2=" + x_ship_to_line2 + ", x_po_num="
				+ x_po_num + ", x_ship_to_line3=" + x_ship_to_line3
				+ ", x_ship_to_line1=" + x_ship_to_line1
				+ ", x_ship_to_postal_code=" + x_ship_to_postal_code
				+ ", x_ship_to_state=" + x_ship_to_state + ", x_order_detail="
				+ x_order_detail + ", x_ship_to_number=" + x_ship_to_number
				+ ", x_order_date=" + x_order_date + ", x_ship_to_country="
				+ x_ship_to_country + ", x_sales_order_num="
				+ x_sales_order_num + ", x_response_message="
				+ x_response_message + ", x_response_status="
				+ x_response_status + "]";
	}
	
	

}
