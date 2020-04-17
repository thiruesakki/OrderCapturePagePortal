package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class CAPAddEditUserObject {

	private String id = "";
	private String email = "";
	private String password = "";
	private String firstName = "";
	private String lastname = "";

	private int activeStatus = 1;

	private int iscustomer = 1;

	private List<RoleObject> fRoles = null;

	private List<CustomerObject> fCustomers = null;

	public List<RoleObject> getRoles() {
		return fRoles;
	}

	public void setRoles(List<RoleObject> roles) {
		this.fRoles = roles;
	}

	public List<CustomerObject> getCustomer() {
		return fCustomers;
	}

	public void setCustomer(List<CustomerObject> customers) {
		this.fCustomers = customers;
	}

	public int getIscustomer() {
		return iscustomer;
	}

	public void setIscustomer(int iscustomer) {
		this.iscustomer = iscustomer;
	}

	public int getActiveStatus() {
		return activeStatus;
	}

	public void setActiveStatus(int activeStatus) {
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
		return "CAPAddEditUserObject [id=" + id + ", email=" + email
				+ ", password=" + password + ", firstName=" + firstName
				+ ", lastname=" + lastname + ", activeStatus=" + activeStatus
				+ ", iscustomer=" + iscustomer + ", fRoles=" + fRoles
				+ ", fCustomer=" + fCustomers + "]";
	}

}
