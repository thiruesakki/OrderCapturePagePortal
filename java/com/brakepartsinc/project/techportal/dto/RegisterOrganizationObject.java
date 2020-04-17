package com.brakepartsinc.project.techportal.dto;

public class RegisterOrganizationObject {
	private String orgname = "";
	private String phone1 = "";
	private String phone2 = "";
	private String email = "";
	private String website = "";
	private String lang = ""; 
	private int isdistributor = 0; 
	private String address = "";
	private String city = "";
	private String country = "";
	private String zipcode = "";
	private String latitude = "";
	private String longitude = ""; 
	private String state = "";   // newly added

	 
	private String confirmed  = ""; 
	private String approved  = ""; 
	private String status  = ""; 
	private String remarks = ""; 
	
	public String getOrgname() {
		return orgname;
	}

	public void setOrgname(String orgname) {
		this.orgname = orgname;
	}

	public String getPhone1() {
		return phone1;
	}

	public void setPhone1(String phone1) {
		this.phone1 = phone1;
	}

	public String getPhone2() {
		return phone2;
	}

	public void setPhone2(String phone2) {
		this.phone2 = phone2;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}
 

	public int getIsdistributor() {
		return isdistributor;
	}

	public void setIsdistributor(int isdistributor) {
		this.isdistributor = isdistributor;
	} 

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	} 
	
	public void setState(String state) {
		this.state = state;
	}

	public String getState(){
		return this.state;
	}

	public String getConfirmed() {
		return confirmed;
	}

	public String getApproved() {
		return approved;
	}

	public String getStatus() {
		return status;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setConfirmed(String confirmed) {
		this.confirmed = confirmed;
	}

	public void setApproved(String approved) {
		this.approved = approved;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

}
