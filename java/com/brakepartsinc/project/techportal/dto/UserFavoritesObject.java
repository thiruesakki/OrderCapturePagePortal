package com.brakepartsinc.project.techportal.dto;

public class UserFavoritesObject {

	private String Id = "";

	private String userID = "";

	private String categoryID = "";

	private String resourceID = "";

	private String rating = "";

	private String savedon = "";

	private String status = "";

	private String remarks = "";

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
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

	public String getResourceID() {
		return resourceID;
	}

	public void setResourceID(String resourceID) {
		this.resourceID = resourceID;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getSavedon() {
		return savedon;
	}

	public void setSavedon(String savedon) {
		this.savedon = savedon;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public String toString() {
		return "UserFavoritesObject [FavoritesID=" + Id + ", userID=" + userID
				+ ", categoryID=" + categoryID + ", resourceID=" + resourceID
				+ ", rating=" + rating + ", savedon=" + savedon + ", status="
				+ status + ", remarks =" + remarks + "]";
	}
}
