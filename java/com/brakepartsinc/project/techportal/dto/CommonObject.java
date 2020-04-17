package com.brakepartsinc.project.techportal.dto;

public class CommonObject {
	
	private String id ;
	
	private String name ;
	
	private int status ;
	
	private String remarks ;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
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
		return "KeyValuePairObject [id=" + id + ", name=" + name + ", status="
				+ status + ", remarks=" + remarks + "]";
	}

}
