package com.brakepartsinc.project.techportal.dto;

public class StateObject {
	
	private String id = "";
	
	private String name = "";
	
	private String description = "";
	
	private String countryID = "";

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

	public String getCountryID() {
		return countryID;
	}

	public void setCountryID(String countryID) {
		this.countryID = countryID;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	@Override
	public String toString() {
		return "StateObject [id=" + id + ", name=" + name + ", countryID="
				+ countryID + "]";
	}

}
