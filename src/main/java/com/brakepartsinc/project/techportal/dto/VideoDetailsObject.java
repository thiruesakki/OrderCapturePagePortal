package com.brakepartsinc.project.techportal.dto;

public class VideoDetailsObject {

	private String id = "";

	private String userid = "";

	private String resourceid = "";

	private String percentageViewed = "";

	private String viewedon = "";

	private String status = "";

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

	public String getResourceid() {
		return resourceid;
	}

	public void setResourceid(String resourceid) {
		this.resourceid = resourceid;
	}

	public String getPercentageViewed() {
		return percentageViewed;
	}

	public void setPercentageViewed(String percentageViewed) {
		this.percentageViewed = percentageViewed;
	}

	public String getViewedon() {
		return viewedon;
	}

	public void setViewedon(String viewedon) {
		this.viewedon = viewedon;
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
		return "VideoDetailsObject [id=" + id + ", userid=" + userid
				+ ", resourceid=" + resourceid + ", percentageViewed="
				+ percentageViewed + ", viewedon=" + viewedon + ", status="
				+ status + ", remarks =" + remarks + "]";
	}
}
