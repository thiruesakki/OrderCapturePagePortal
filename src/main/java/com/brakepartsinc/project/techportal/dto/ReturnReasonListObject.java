package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class ReturnReasonListObject {

	private List<ReturnReasonObject> x_return_reason = null;

	private String x_response_message = "";

	private String x_response_status = "";

	public List<ReturnReasonObject> getX_return_reason() {
		return x_return_reason;
	}

	public void setX_return_reason(List<ReturnReasonObject> x_return_reason) {
		this.x_return_reason = x_return_reason;
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
		return "ReturnReasonListObject [x_return_reason=" + x_return_reason
				+ ", x_response_message=" + x_response_message
				+ ", x_response_status=" + x_response_status + "]";
	}
	
}
