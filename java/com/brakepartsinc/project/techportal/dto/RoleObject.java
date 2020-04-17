package com.brakepartsinc.project.techportal.dto;

public class RoleObject {

	private String roleID = "";
	private String roleName = "";
	private String roleDesc = "";
	private String isActive = "";
	private String createdBy = "";
	private String createdDate = "";
	private String modifiedBy = "";
	private String modifiedDate = "";

	public String getRoleID() {
		return roleID;
	}

	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleDesc() {
		return roleDesc;
	}

	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

	public String getIsActive() {
		return isActive;
	}

	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String updatedBy) {
		this.modifiedBy = updatedBy;
	}

	public String getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(String updatedDate) {
		this.modifiedDate = updatedDate;
	}

	@Override
	public String toString() {
		return "RoleObject [roleID=" + roleID + ", roleName=" + roleName
				+ ", roleDesc=" + roleDesc + ", isActive=" + isActive
				+ ", createdBy=" + createdBy + ", createdDate=" + createdDate
				+ ", modifiedBy=" + modifiedBy + ", modifiedDate="
				+ modifiedDate + "]";
	}

}
