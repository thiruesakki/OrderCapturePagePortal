package com.brakepartsinc.project.techportal.dto;

public class PromoBusinessDetailsObject {

	private String id = "";
	
	private String promoID = "";
	
	private String promoName = "";
	
	private String firstName = "";
	
	private String lastname = "";
	
	private String email = "";

	private String businessName = "";
	
	private String ownersName = "";
	
	private String address1 = "";
	
	private String address2 = "";
	
	private String city = "";
	
	private String state = "";
	
	private String zipCode = "";
	
	private String country = "";
	
	private String phoneNo = "";
	
	private String website = "";
	
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

	public String getFirstName() {
		return firstName;
	}

	public String getLastname() {
		return lastname;
	}

	public String getEmail() {
		return email;
	}

	public String getBusinessName() {
		return businessName;
	}

	public String getOwnersName() {
		return ownersName;
	}

	public String getAddress1() {
		return address1;
	}

	public String getAddress2() {
		return address2;
	}

	public String getCity() {
		return city;
	}

	public String getState() {
		return state;
	}

	public String getZipCode() {
		return zipCode;
	}

	public String getCountry() {
		return country;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public String getWebsite() {
		return website;
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

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	public void setOwnersName(String ownersName) {
		this.ownersName = ownersName;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public void setReceiveCommunications(int receiveCommunications) {
		this.receiveCommunications = receiveCommunications;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public String toString() {
		return "PromoBusinessDetailsObject [id=" + id + ", promoID=" + promoID
				+ ", promoName=" + promoName + ", firstName=" + firstName
				+ ", lastname=" + lastname + ", email=" + email
				+ ", businessName=" + businessName + ", ownersName="
				+ ownersName + ", address1=" + address1 + ", address2="
				+ address2 + ", city=" + city + ", state=" + state
				+ ", zipCode=" + zipCode + ", country=" + country
				+ ", phoneNo=" + phoneNo + ", website=" + website
				+ ", receiveCommunications=" + receiveCommunications
				+ ", remarks=" + remarks + "]";
	}

	
}
