package com.brakepartsinc.project.techportal.dto;


public class CAPUserObject {

	private String id = "";
	private String email = "";
	private String password = "";
	private String firstName = "";
	private String lastname = "";

	private String activeStatus = "";

	private int iscustomer = 0;
	
	public int getIscustomer() {
		return iscustomer;
	}

	public void setIscustomer(int iscustomer) {
		this.iscustomer = iscustomer;
	}

	public String getActiveStatus() {
		return activeStatus;
	}

	public void setActiveStatus(String activeStatus) {
		this.activeStatus = activeStatus;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	@Override
	public String toString() {
		return "CAPUserObject [id=" + id + ", email=" + email + ", password="
				+ password + ", firstName=" + firstName + ", lastname="
				+ lastname + ", activeStatus=" + activeStatus + ", iscustomer="
				+ iscustomer + "]";
	}

	

}
