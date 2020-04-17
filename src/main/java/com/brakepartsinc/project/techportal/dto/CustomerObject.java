package com.brakepartsinc.project.techportal.dto;

public class CustomerObject {

	private String customerID = "";
	private String userID = "";
	private String status = "";
	private String accountNo = "";
	private String billToSiteID = "";
	private String shipToSiteID = "";
	private String orgID="";

	public String getCustomerID() {
		return customerID;
	}

	public void setCustomerID(String customerID) {
		this.customerID = customerID;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public String getBillToSiteID() {
		return billToSiteID;
	}

	public void setBillToSiteID(String billToSiteID) {
		this.billToSiteID = billToSiteID;
	}

	public String getShipToSiteID() {
		return shipToSiteID;
	}

	public void setShipToSiteID(String shipToSiteID) {
		this.shipToSiteID = shipToSiteID;
	}
	
	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getOrgID() {
		return orgID;
	}

	public void setOrgID(String orgID) {
		this.orgID = orgID;
	}

	@Override
	public String toString() {
		return "CustomerObject [customerID=" + customerID + ", userID="
				+ userID + ", status=" + status + ", accountNo=" + accountNo
				+ ", billToSiteID=" + billToSiteID + ", shipToSiteID="
				+ shipToSiteID + ", orgID=" + orgID + "]";
	}

}
