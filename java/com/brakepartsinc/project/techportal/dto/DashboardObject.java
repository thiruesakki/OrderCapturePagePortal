package com.brakepartsinc.project.techportal.dto;

public class DashboardObject {

	private String id = "";

	private String userID = "";

	private String categoryID = "";

	private String sortorder = "";

	private String savedon = "";

	private String remarks = "";

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getCategoryID() {
		return categoryID;
	}

	public void setCategoryID(String categoryID) {
		this.categoryID = categoryID;
	}

	public String getSortorder() {
		return sortorder;
	}

	public void setSortorder(String sortorder) {
		this.sortorder = sortorder;
	}

	public String getSavedon() {
		return savedon;
	}

	public void setSavedon(String savedon) {
		this.savedon = savedon;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public String toString() {
		return "DashboardObject [customerID=" + id + ", userID=" + userID
				+ ", categoryID=" + categoryID + ", sortorder=" + sortorder
				+ ", savedon=" + savedon + ", remarks=" + remarks + "]";
	}

}
