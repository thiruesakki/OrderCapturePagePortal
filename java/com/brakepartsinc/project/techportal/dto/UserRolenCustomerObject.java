package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class UserRolenCustomerObject {
	
	private List<RoleObject> fRoles = null;
	
	private CustomerObject fCustomer = null;

	public List<RoleObject> getRoles() {
		return fRoles;
	}

	public void setRoles(List<RoleObject> roles) {
		this.fRoles = roles;
	}

	public CustomerObject getCustomer() {
		return fCustomer;
	}

	public void setCustomer(CustomerObject customer) {
		this.fCustomer = customer;
	}

	@Override
	public String toString() {
		return "UserRolenCustomerObject [fRoles=" + fRoles + ", fCustomer="
				+ fCustomer.toString() + "]";
	}
	
	

}
