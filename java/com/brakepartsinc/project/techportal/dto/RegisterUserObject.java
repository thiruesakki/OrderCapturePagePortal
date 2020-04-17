package com.brakepartsinc.project.techportal.dto;

import com.brakepartsinc.project.techportal.util.TPServerConstants;

public class RegisterUserObject {

	public String getConfirmed() {
		return confirmed;
	}

	public void setConfirmed(String confirmed) {
		this.confirmed = confirmed;
	}

	public String getApproved() {
		return approved;
	}

	public void setApproved(String approved) {
		this.approved = approved;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getOrgid() {
		return orgid;
	}

	public void setOrgid(String orgid) {
		this.orgid = orgid;
	}

	public String getJobcategoryid() {
		return jobcategoryid;
	}

	public void setJobcategoryid(String jobcategoryid) {
		this.jobcategoryid = jobcategoryid;
	}
	
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
 


	private String id = "";
	private String email = "";
	private String password = "";
	private String firstName = "";
	private String lastname = ""; 
	
	private String phone1 = "";
	private String phone2 = "";
	private String address = "";
	private String city = "";
	private String country = "";
	private String lang = ""; 
	private int interest_in_communication = TPServerConstants.INTEREST_NOT_IN_COMMUNICATION;
	private String timezone = "";
	private String firstaccess = "";
	private String lastaccess = "";
	private String lastlogin = "";
	private String currentlogin = "";
	private String lastip = "";

	private String secret = "";
	private int picture = 0;
	private String url = "";
	private String description = "";

	private String years_of_experience = "";
	private String area_of_speciality = "";
	
	private String bays_in_shop = "";
	private String brake_jobs_in_a_month = "";
	
	private int list_in_find_a_shop = TPServerConstants.LIST_IN_NOT_FIND_A_SHOP;
	private int currently_using_raybestos_products = TPServerConstants.CURRENTLY_NOT_USING_RAYBESTOS_PRODUCTS;

	private int mailformat = TPServerConstants.User_MAILFORMAT_TEXT;
	private int maildisplay = TPServerConstants.User_NOT_MAILDISPLAY;
	private int htmleditor = TPServerConstants.User_NOT_HTMLEDITOR;
	private int autosubscribe = TPServerConstants.User_AUTO_NOT_SUBSCRIBE;
	
	private String timemodified = "";

	// today 7 feb added
	private String nickname = "";
	private int keepShopPrivate = TPServerConstants.KEEP_SHOP_NOT_PRIVATE;;
	private int KeepEmployeePrivate = TPServerConstants.KEEP_EMPLOYEE_NOT_PRIVATE;;

	private int iscustomer = 0;
	private String verificationlinksenttime = "";
	private String referedby = "";
	
	private String orgid = "";
	
	private String jobcategoryid ="" ;
	private String state ="" ;
	
	private String confirmed = ""; //added newly
	private String approved = "";
	private String status = "";
	private String remarks = "";


	public int getIscustomer() {
		return iscustomer;
	}

	public void setIscustomer(int iscustomer) {
		this.iscustomer = iscustomer;
	}

	public String getVerificationlinksenttime() {
		return verificationlinksenttime;
	}

	public void setVerificationlinksenttime(String verificationlinksenttime) {
		this.verificationlinksenttime = verificationlinksenttime;
	}

	public String getReferedby() {
		return referedby;
	}

	public void setReferedby(String referedby) {
		this.referedby = referedby;
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

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}
  
	public int getInterest_in_communication() {
		return interest_in_communication;
	}

	public void setInterest_in_communication(int interest_in_communication) {
		this.interest_in_communication = interest_in_communication;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	public String getFirstaccess() {
		return firstaccess;
	}

	public void setFirstaccess(String firstaccess) {
		this.firstaccess = firstaccess;
	}

	public String getLastaccess() {
		return lastaccess;
	}

	public void setLastaccess(String lastaccess) {
		this.lastaccess = lastaccess;
	}

	public String getLastlogin() {
		return lastlogin;
	}

	public void setLastlogin(String lastlogin) {
		this.lastlogin = lastlogin;
	}

	public String getCurrentlogin() {
		return currentlogin;
	}

	public void setCurrentlogin(String currentlogin) {
		this.currentlogin = currentlogin;
	}

	public String getLastip() {
		return lastip;
	}

	public void setLastip(String lastip) {
		this.lastip = lastip;
	}

	public String getSecret() {
		return secret;
	}

	public void setSecret(String secret) {
		this.secret = secret;
	}

	public int getPicture() {
		return picture;
	}

	public void setPicture(int picture) {
		this.picture = picture;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getYears_of_experience() {
		return years_of_experience;
	}

	public void setYears_of_experience(String years_of_experience) {
		this.years_of_experience = years_of_experience;
	}

	public String getArea_of_speciality() {
		return area_of_speciality;
	}

	public void setArea_of_speciality(String area_of_speciality) {
		this.area_of_speciality = area_of_speciality;
	}

	public String getBays_in_shop() {
		return bays_in_shop;
	}

	public void setBays_in_shop(String bays_in_shop) {
		this.bays_in_shop = bays_in_shop;
	}

	public String getBrake_jobs_in_a_month() {
		return brake_jobs_in_a_month;
	}

	public void setBrake_jobs_in_a_month(String brake_jobs_in_a_month) {
		this.brake_jobs_in_a_month = brake_jobs_in_a_month;
	}

	public int getList_in_find_a_shop() {
		return list_in_find_a_shop;
	}

	public void setList_in_find_a_shop(int list_in_find_a_shop) {
		this.list_in_find_a_shop = list_in_find_a_shop;
	}

	public int getCurrently_using_raybestos_products() {
		return currently_using_raybestos_products;
	}

	public void setCurrently_using_raybestos_products(
			int currently_using_raybestos_products) {
		this.currently_using_raybestos_products = currently_using_raybestos_products;
	}

	public int getMailformat() {
		return mailformat;
	}

	public void setMailformat(int mailformat) {
		this.mailformat = mailformat;
	}

	public int getMaildisplay() {
		return maildisplay;
	}

	public void setMaildisplay(int maildisplay) {
		this.maildisplay = maildisplay;
	}

	public int getHtmleditor() {
		return htmleditor;
	}

	public void setHtmleditor(int htmleditor) {
		this.htmleditor = htmleditor;
	}

	public int getAutosubscribe() {
		return autosubscribe;
	}

	public void setAutosubscribe(int autosubscribe) {
		this.autosubscribe = autosubscribe;
	}

	public String getTimemodified() {
		return timemodified;
	}

	public void setTimemodified(String timemodified) {
		this.timemodified = timemodified;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public int getKeepShopPrivate() {
		return keepShopPrivate;
	}

	public void setKeepShopPrivate(int keepShopPrivate) {
		this.keepShopPrivate = keepShopPrivate;
	}

	public int getKeepEmployeePrivate() {
		return KeepEmployeePrivate;
	}

	public void setKeepEmployeePrivate(int keepEmployeePrivate) {
		KeepEmployeePrivate = keepEmployeePrivate;
	}

	// @Override
	// public String toString() {
	// return "UserObject [email=" + email + ", password=" + password
	// + ", firstName=" + firstName + "]";
	// }

}
