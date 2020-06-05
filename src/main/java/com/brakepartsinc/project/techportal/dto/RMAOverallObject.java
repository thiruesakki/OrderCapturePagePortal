package com.brakepartsinc.project.techportal.dto;

import java.util.List;

public class RMAOverallObject {
	private String orgID = "";
	private String returnType = "";
	private String refSO = "";
	private List<RMAObject> listRMAObject=null;
	public String getOrgID() {
		return orgID;
	}
	public void setOrgID(String orgID) {
		this.orgID = orgID;
	}
	public String getReturnType() {
		return returnType;
	}
	public void setReturnType(String returnType) {
		this.returnType = returnType;
	}
	public String getRefSO() {
		return refSO;
	}
	public void setRefSO(String refSO) {
		this.refSO = refSO;
	}
	public List<RMAObject> getListRMAObject() {
		return listRMAObject;
	}
	public void setListRMAObject(List<RMAObject> listRMAObject) {
		this.listRMAObject = listRMAObject;
	}
	@Override
	public String toString() {
		return "RMAOverallObject [orgID=" + orgID + ", returnType="
				+ returnType + ", refSO=" + refSO + ", listRMAObject="
				+ listRMAObject + "]";
	}
	
}
