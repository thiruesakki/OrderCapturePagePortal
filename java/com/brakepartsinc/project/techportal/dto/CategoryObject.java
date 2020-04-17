package com.brakepartsinc.project.techportal.dto;

public class CategoryObject {

	private String categoryId = "";

	private String catagoryName = "";

	private String startDate = "";

	private String endDate = "";

	private String status = "";

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public String getCatagoryName() {
		return catagoryName;
	}

	public void setCatagoryName(String catagoryName) {
		this.catagoryName = catagoryName;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "CategoryObject [categoryId=" + categoryId + ", catagoryName="
				+ catagoryName + ", startDate=" + startDate + ", endDate="
				+ endDate + ", status=" + status + "]";
	}
}
