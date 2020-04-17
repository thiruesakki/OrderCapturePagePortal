package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class CountryObject {
	
	private String id = "";
	
	private String name = "";
	
	private String description = "";
	
	private List<StateObject> fStates = null;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public List<StateObject> getStates() {
		return fStates;
	}

	public void setStates(List<StateObject> states) {
		this.fStates = states;
	}

	@Override
	public String toString() {
		return "CountryObject [id=" + id + ", name=" + name + ", fStates="
				+ fStates + "]";
	}

}
