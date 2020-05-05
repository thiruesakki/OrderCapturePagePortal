package com.brakepartsinc.project.techportal.dto;

public class PlaceOrderLinesObject {
	
	private String partNum = "";
	private String reqQnty = "";
	private String WARE_HOUSE = "";
	
	
	public String getPartNum() {
		return partNum;
	}
	public void setPartNum(String partNum) {
		this.partNum = partNum;
	}
	public String getReqQnty() {
		return reqQnty;
	}
	public void setReqQnty(String reqQnty) {
		this.reqQnty = reqQnty;
	}
	public String getWARE_HOUSE() {
		return WARE_HOUSE;
	}
	public void setWARE_HOUSE(String wARE_HOUSE) {
		WARE_HOUSE = wARE_HOUSE;
	}
	
	@Override
	public String toString() {
		return "PlaceOrderLinesObject [partNum=" + partNum + ", reqQnty="
				+ reqQnty + ", WARE_HOUSE=" + WARE_HOUSE + "]";
	}
		

}
