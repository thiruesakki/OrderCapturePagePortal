package com.brakepartsinc.project.techportal.dto;

public class RewardEventsObject {

	private String id = "";

	private String programId = "";

	private String eventName = "";

	private String eventDesc = "";

	private String startDate = "";

	private String endDate = "";

	private String eventPoints = "";

	private String approvalRequired = "";

	private String status = "";

	private String remarks = "";

	private String createdBy = "";

	private String createdDate = "";

	private String modifiedBy = "";

	private String modifiedDate = "";

	public String getId() {
		return id;
	}

	public String getProgramId() {
		return programId;
	}

	public String getEventName() {
		return eventName;
	}

	public String getEventDesc() {
		return eventDesc;
	}

	public String getStartDate() {
		return startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public String getEventPoints() {
		return eventPoints;
	}

	public String getApprovalRequired() {
		return approvalRequired;
	}

	public String getStatus() {
		return status;
	}

	public String getRemarks() {
		return remarks;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public String getModifiedDate() {
		return modifiedDate;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setProgramId(String programId) {
		this.programId = programId;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public void setEventDesc(String eventDesc) {
		this.eventDesc = eventDesc;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public void setEventPoints(String eventPoints) {
		this.eventPoints = eventPoints;
	}

	public void setApprovalRequired(String approvalRequired) {
		this.approvalRequired = approvalRequired;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public void setModifiedDate(String modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	@Override
	public String toString() {
		return "RewardEventsObject [id=" + id + ", programId=" + programId
				+ ", eventName=" + eventName + ", eventDesc=" + eventDesc
				+ ", startDate=" + startDate + ", endDate=" + endDate
				+ ", eventPoints=" + eventPoints + ", approvalRequired="
				+ approvalRequired + ", status=" + status + ", remarks="
				+ remarks + ", createdBy=" + createdBy + ", createdDate="
				+ createdDate + ", modifiedBy=" + modifiedBy
				+ ", modifiedDate=" + modifiedDate + "]";
	}

}
