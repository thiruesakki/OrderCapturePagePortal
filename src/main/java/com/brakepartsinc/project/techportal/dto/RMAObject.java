package com.brakepartsinc.project.techportal.dto;

public class RMAObject {

	private String partnumber = "";

	private String return_qty = "";

	private String return_reason = "";

	private String line_number = "";

	public String getPartnumber() {
		return partnumber;
	}

	public void setPartnumber(String partnumber) {
		this.partnumber = partnumber;
	}

	public String getReturn_qty() {
		return return_qty;
	}

	public void setReturn_qty(String return_qty) {
		this.return_qty = return_qty;
	}

	public String getReturn_reason() {
		return return_reason;
	}

	public void setReturn_reason(String return_reason) {
		this.return_reason = return_reason;
	}

	public String getLine_number() {
		return line_number;
	}

	public void setLine_number(String line_number) {
		this.line_number = line_number;
	}

	@Override
	public String toString() {
		return "RMAObject [partnumber=" + partnumber + ", return_qty="
				+ return_qty + ", return_reason=" + return_reason
				+ ", line_number=" + line_number + "]";
	}

}
