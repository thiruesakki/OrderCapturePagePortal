package com.brakepartsinc.project.techportal.dto;

/**
 * Bean object to store the PRI business promotion details
 * @author Nithya
 *
 */
public class PRIPromoDetailsObject {

	private String id = "";
	
	private String promoID = "";
	
	private String promoName = "";
	
	private String fullName = "";
	
	private String email = "";

	private String phoneNo = "";
	
	private String title = "";
	
	private int interestedIn = 0; // 0 - None, 1 - Racing, 2 - performance, 9 - both/all
	
	private int receiveCommunications = 0;
	
	private String remarks = "";

	public String getId() {
		return id;
	}

	public String getPromoID() {
		return promoID;
	}

	public String getPromoName() {
		return promoName;
	}

	public String getFullName() {
		return fullName;
	}

	public String getEmail() {
		return email;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public String getTitle() {
		return title;
	}

	public int getInterestedIn() {
		return interestedIn;
	}

	public int getReceiveCommunications() {
		return receiveCommunications;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setPromoID(String promoID) {
		this.promoID = promoID;
	}

	public void setPromoName(String promoName) {
		this.promoName = promoName;
	}

	public void setFullName(String name) {
		this.fullName = name;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public void setTitle(String description) {
		this.title = description;
	}

	public void setInterestedIn(int interestedIn) {
		this.interestedIn = interestedIn;
	}

	public void setReceiveCommunications(int receiveCommunications) {
		this.receiveCommunications = receiveCommunications;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public String toString() {
		return "PRIPromoDetailsObject [id=" + id + ", promoID=" + promoID
				+ ", promoName=" + promoName + ", fullName=" + fullName + ", email="
				+ email + ", phoneNo=" + phoneNo + ", title="
				+ title + ", interestedIn=" + interestedIn
				+ ", receiveCommunications=" + receiveCommunications
				+ ", remarks=" + remarks + "]";
	}

	

	

	
}
