package com.brakepartsinc.project.techportal.dto;

public class UserFavoritePlaceObject {
	
	private String id = "";

	private String userid = "";

	private String favoriteplace = "";  

	private String status = "";
	
	private String savedOn = "";

	private String remarks = "";

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getFavoriteplace() {
		return favoriteplace;
	}

	public void setFavoriteplace(String favoriteplace) {
		this.favoriteplace = favoriteplace;
	}

	public String getSavedOn() {
		return savedOn;
	}

	public void setSavedOn(String savedOn) {
		this.savedOn = savedOn;
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
		return "UserFavoritePlaceObject [id=" + id + ", userid=" + userid
				+ ", favoriteplace=" + favoriteplace + ", status=" + status
				+ ", savedOn=" + savedOn + ", remarks=" + remarks + "]";
	}

	 


}
