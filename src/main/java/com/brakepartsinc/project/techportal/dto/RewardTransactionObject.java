package com.brakepartsinc.project.techportal.dto;

public class RewardTransactionObject {

	private String id = "";

	private String categoryCode = "";

	private String categoryName = "";

	private String userID = "";

	private String eventType = "";

	private String eventDate = "";

	private String eventPoints = "";

	private String approvalRequired = "";

	private String approvalStatus = "";

	private String approvedPoints = "";

	private String approvedDate = "";

	private String approvedBy = "";

	private String status = "";

	private String remarks = "";

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCategoryCode() {
		return categoryCode;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public String getUserID() {
		return userID;
	}

	public String getEventType() {
		return eventType;
	}

	public String getEventDate() {
		return eventDate;
	}

	public String getEventPoints() {
		return eventPoints;
	}

	public String getApprovalRequired() {
		return approvalRequired;
	}

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public String getApprovedPoints() {
		return approvedPoints;
	}

	public String getApprovedDate() {
		return approvedDate;
	}

	public String getApprovedBy() {
		return approvedBy;
	}

	public String getStatus() {
		return status;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}

	public void setEventPoints(String eventPoints) {
		this.eventPoints = eventPoints;
	}

	public void setApprovalRequired(String approvalRequired) {
		this.approvalRequired = approvalRequired;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public void setApprovedPoints(String approvedPoints) {
		this.approvedPoints = approvedPoints;
	}

	public void setApprovedDate(String approvedDate) {
		this.approvedDate = approvedDate;
	}

	public void setApprovedBy(String approvedBy) {
		this.approvedBy = approvedBy;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public String toString() {
		return "RewardTransactionObject [id=" + id + ", categoryCode="
				+ categoryCode + ", categoryName=" + categoryName + ", userID="
				+ userID + ", eventCategory=" + eventType + ", eventDate="
				+ eventDate + ", eventPoints=" + eventPoints
				+ ", approvalRequired=" + approvalRequired
				+ ", approvalStatus=" + approvalStatus + ", approvedPoints="
				+ approvedPoints + ", approvedDate=" + approvedDate
				+ ", approvedBy=" + approvedBy + ", status=" + status
				+ ", remarks=" + remarks + "]";
	}

}
