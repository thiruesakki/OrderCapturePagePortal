package com.brakepartsinc.project.techportal.login;

import java.util.List;

import javax.security.auth.login.LoginException;

import com.brakepartsinc.project.techportal.dto.CustomerObject;

/**
 * The result of a login operation.
 */
public class LoginResult {

	public static final int STATUS_SUCCEEDED = 0;

	public static final int STATUS_INVALID_USERNAME = 1;

	public static final int STATUS_INVALID_PASSWORD = 2;

	public static final int STATUS_USER_INACTIVE = 3;

	public static final int STATUS_USER_UNAPPROVED = 4;

	public static final int STATUS_USER_EMAIL_NOTVERIFIED = 5;

	public static final int STATUS_SERVER_ERROR = 6;

	/**
	 * Returned if a login handler is not able to perform the operation.
	 */
	public static LoginResult INVALID_USERNAME = new LoginResult(
			LoginResult.STATUS_INVALID_USERNAME);

	public static LoginResult INVALID_PASSWORD = new LoginResult(
			LoginResult.STATUS_INVALID_PASSWORD);

	private final int status;

	private LoginException loginException = null;
	
	private boolean isCustomer = false;
	
	private boolean isFirstAccess = false;
	
	private List<String> roleNames = null;
	
	private CustomerObject customerObject = null;

	public LoginResult(int status) {
		this.status = status;
	}

	public LoginResult(int status, LoginException loginException) {
		this.status = status;
		this.loginException = loginException;
	}

	public int getStatus() {
		return this.status;
	}

	/**
	 * @return an instance of {@link LoginException}. Warning: it can be null.
	 */
	public LoginException getLoginException() {
		return this.loginException;
	}

	public List<String> getRoleNames() {
		return roleNames;
	}

	public CustomerObject getCustomerObject() {
		return customerObject;
	}

	public void setRoleNames(List<String> roleNames) {
		this.roleNames = roleNames;
	}

	public void setCustomerObject(CustomerObject customerObject) {
		this.customerObject = customerObject;
	}

	public boolean isCustomer() {
		return isCustomer;
	}

	public boolean isFirstAccess() {
		return isFirstAccess;
	}

	public void setCustomer(boolean isCustomer) {
		this.isCustomer = isCustomer;
	}

	public void setFirstAccess(boolean isFirstAccess) {
		this.isFirstAccess = isFirstAccess;
	}

	@Override
	public String toString() {
		return "LoginResult [status=" + status + ", loginException="
				+ loginException + ", isCustomer=" + isCustomer
				+ ", isFirstAccess=" + isFirstAccess + ", roleNames="
				+ roleNames + ", customerObject=" + customerObject + "]";
	}

	
}