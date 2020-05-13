package com.brakepartsinc.project.techportal.util;

public class StatusObject {

	private int statusCode = -1 ;

	private String statusMessage = "";
	
	private int userID = -1;

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getStatusMessage() {
		return statusMessage;
	}

	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}
	

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	@Override
	public String toString() {
		return "StatusObject [statusCode=" + statusCode + ", statusMessage="
				+ statusMessage + ", userID=" + userID + "]";
	}


}
