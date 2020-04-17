package com.brakepartsinc.project.techportal.dto;

public class OrganizationObject {
	private String org_id = "";
	private String org_name = "";
	private String phone1 = "";
	private String phone2 = "";
	private String email = "";

	private String website = "";
	private String lang = "";
	private String confirmed = "";

	private String approved = "";
	private String isDistributor = "";

	private String status = "";
	private String Remarks = "";

	public String getOrg_id() {
		return org_id;
	}

	public void setOrg_id(String org_id) {
		this.org_id = org_id;
	}

	public String getOrg_name() {
		return org_name;
	}

	public void setOrg_name(String org_name) {
		this.org_name = org_name;
	}

	public String getPhone1() {
		return phone1;
	}

	public void setPhone1(String phone1) {
		this.phone1 = phone1;
	}

	public String getPhone2() {
		return phone2;
	}

	public void setPhone2(String phone2) {
		this.phone2 = phone2;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}

	public String getConfirmed() {
		return confirmed;
	}

	public void setConfirmed(String confirmed) {
		this.confirmed = confirmed;
	}

	public String getApproved() {
		return approved;
	}

	public void setApproved(String approved) {
		this.approved = approved;
	}

	public String getIsDistributor() {
		return isDistributor;
	}

	public void setIsDistributor(String isDistributor) {
		this.isDistributor = isDistributor;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRemarks() {
		return Remarks;
	}

	public void setRemarks(String remarks) {
		Remarks = remarks;
	}

	@Override
	public String toString() {
		return "OrganizationObject [org_id=" + org_id + ", org_name="
				+ org_name + ", phone1=" + phone1 + ", phone2=" + phone2
				+ ", email=" + email + ", website=" + website + ", lang="
				+ lang + ", confirmed=" + confirmed + ", approved=" + approved
				+ ", isDistributor=" + isDistributor + ", status=" + status
				+ ", Remarks=" + Remarks + "]";
	}

}
