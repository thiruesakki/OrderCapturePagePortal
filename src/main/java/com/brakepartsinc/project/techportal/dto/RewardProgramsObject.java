package com.brakepartsinc.project.techportal.dto;

public class RewardProgramsObject {

	private String id = "";

	private String programName = "";

	private String programDesc = "";

	private String status = "";

	private String remarks = "";

	private String createdBy = "";

	private String createdDate = "";

	private String modifiedBy = "";

	private String modifiedDate = "";

	public String getId() {
		return id;
	}

	public String getProgramName() {
		return programName;
	}

	public String getProgramDesc() {
		return programDesc;
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

	public void setProgramName(String programName) {
		this.programName = programName;
	}

	public void setProgramDesc(String programDesc) {
		this.programDesc = programDesc;
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
		return "RewardProgramsObject [id=" + id + ", programName="
				+ programName + ", programDesc=" + programDesc + ", status="
				+ status + ", remarks=" + remarks + ", createdBy=" + createdBy
				+ ", createdDate=" + createdDate + ", modifiedBy=" + modifiedBy
				+ ", modifiedDate=" + modifiedDate + "]";
	}

}
