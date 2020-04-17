package com.brakepartsinc.project.techportal.dto;

public class TipsAndTricksObject {

	private String id = "";
	private String categoryid = "";
	private String tipstricks = "";
	private String submittedOn = "";
	private String submittedBy = "";
	private String approvedStatus = "";
	private String approvedOn = "";
	private String approvedBy = "";
	private String remarks = "";
	private String updatedBy = "";
	private String updatedOn = "";
	private String status = "";
	private String email = "";
	private String firstname = "";
	private String lastname = "";

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(String categoryid) {
		this.categoryid = categoryid;
	}

	public String getTipstricks() {
		return tipstricks;
	}

	public void setTipstricks(String tipstricks) {
		this.tipstricks = tipstricks;
	}

	public String getSubmittedOn() {
		return submittedOn;
	}

	public void setSubmittedOn(String submittedon) {
		this.submittedOn = submittedon;
	}

	public String getSubmittedBy() {
		return submittedBy;
	}

	public void setSubmittedBy(String submittedBy) {
		this.submittedBy = submittedBy;
	}

	public String getApprovedOn() {
		return approvedOn;
	}

	public void setApprovedOn(String approvedon) {
		this.approvedOn = approvedon;
	}

	public String getApprovedBy() {
		return approvedBy;
	}

	public void setApprovedBy(String approvedby) {
		this.approvedBy = approvedby;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public String getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(String updatedDate) {
		updatedOn = updatedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String setStatus) {
		this.status = setStatus;
	}

	public String getApprovedStatus() {
		return approvedStatus;
	}

	public void setApprovedStatus(String approved) {
		this.approvedStatus = approved;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	@Override
	public String toString() {
		return "TipsAndTricksObject [id=" + id + ", categoryid=" + categoryid
				+ ", tipstricks=" + tipstricks + ", submittedOn=" + submittedOn
				+ ", submittedBy=" + submittedBy + ", approvedStatus="
				+ approvedStatus + ", approvedOn=" + approvedOn
				+ ", approvedBy=" + approvedBy + ", remarks=" + remarks
				+ ", updatedBy=" + updatedBy + ", updatedOn=" + updatedOn
				+ ", status=" + status + ",email=" + email +",firstname=" + firstname +",lastname=" + lastname +"]";
	}

}
