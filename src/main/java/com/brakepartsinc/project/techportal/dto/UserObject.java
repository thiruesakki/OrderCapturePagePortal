package com.brakepartsinc.project.techportal.dto;

import java.util.List;

import com.brakepartsinc.project.techportal.util.TPServerConstants;

public class UserObject {

	private String id = "";
	private String email = "";
	private String password = "";
	private String firstName = "";
	private String lastname = "";

	private String confirmedStatus = "";
	private String approvedStatus = "";
	private String activeStatus = "";

	private String phone1 = "";
	private String phone2 = "";
	private String address = "";
	private String city = "";
	private String state = "";
	private String country = "";
	private String lang = "";
	private String remarks = "";

	private String timezone = "";
	private String firstaccess = "";
	private String lastaccess = "";
	private String lastlogin = "";
	private String currentlogin = "";
	private String lastip = "";

	private String secret = "";
	private String picture = "";
	private String url = "";
	private String description = "";

	private String years_of_experience = "";
	private String area_of_speciality = "";
	private String interest_in_communication = "";
	private String bays_in_shop = "";
	private String brake_jobs_in_a_month = "";
	private String list_in_find_a_shop = "";
	private String currently_using_raybestos_products = "";

	private String mailformat = "";
	private String maildisplay = "";
	private String htmleditor = "";
	private String shopowner = "";
	private String timemodified = "";

	// today 7 feb added
	private String nickname = "";
	private String keepShopPrivate = "";
	private String KeepEmployeePrivate = "";

	private int iscustomer = 0;
	private String verificationlinksenttime = "";
	private String referedby = "";
	private int isFirstAccess = TPServerConstants.FIRSTACCESS_YES; 
	
	private List<CommonObject> jobtitleList = null;
	private List<CommonObject> organizationList = null;
	
	private int isadmin = 0;
	
	public int getIsFirstAccess() {
		return isFirstAccess;
	}

	public void setIsFirstAccess(int isFirstAccess) {
		this.isFirstAccess = isFirstAccess;
	} 

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

	public String getConfirmedStatus() {
		return confirmedStatus;
	}

	public void setConfirmedStatus(String confirmedStatus) {
		this.confirmedStatus = confirmedStatus;
	}

	public String getApprovedStatus() {
		return approvedStatus;
	}

	public void setApprovedStatus(String approvedStatus) {
		this.approvedStatus = approvedStatus;
	}

	public String getActiveStatus() {
		return activeStatus;
	}

	public void setActiveStatus(String activeStatus) {
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

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getInterest_in_communication() {
		return interest_in_communication;
	}

	public void setInterest_in_communication(String interest_in_communication) {
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

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
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

	public String getList_in_find_a_shop() {
		return list_in_find_a_shop;
	}

	public void setList_in_find_a_shop(String list_in_find_a_shop) {
		this.list_in_find_a_shop = list_in_find_a_shop;
	}

	public String getCurrently_using_raybestos_products() {
		return currently_using_raybestos_products;
	}

	public void setCurrently_using_raybestos_products(
			String currently_using_raybestos_products) {
		this.currently_using_raybestos_products = currently_using_raybestos_products;
	}

	public String getMailformat() {
		return mailformat;
	}

	public void setMailformat(String mailformat) {
		this.mailformat = mailformat;
	}

	public String getMaildisplay() {
		return maildisplay;
	}

	public void setMaildisplay(String maildisplay) {
		this.maildisplay = maildisplay;
	}

	public String getHtmleditor() {
		return htmleditor;
	}

	public void setHtmleditor(String htmleditor) {
		this.htmleditor = htmleditor;
	}

	public String isShopOwner() {
		return shopowner;
	}

	public void setShopOwner(String shopowner) {
		this.shopowner = shopowner;
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

	public String getKeepShopPrivate() {
		return keepShopPrivate;
	}

	public void setKeepShopPrivate(String keepShopPrivate) {
		this.keepShopPrivate = keepShopPrivate;
	}

	public String getKeepEmployeePrivate() {
		return KeepEmployeePrivate;
	}

	public void setKeepEmployeePrivate(String keepEmployeePrivate) {
		KeepEmployeePrivate = keepEmployeePrivate;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	} 
 
	public List<CommonObject> getJobtitleList() {
		return jobtitleList;
	}

	public void setJobtitleList(List<CommonObject> jobtitleList) {
		this.jobtitleList = jobtitleList;
	}

	public List<CommonObject> getOrganizationList() {
		return organizationList;
	}

	public void setOrganizationList(List<CommonObject> organizationList) {
		this.organizationList = organizationList;
	}

	public int getIsadmin() {
		return isadmin;
	}

	public void setIsadmin(int isadmin) {
		this.isadmin = isadmin;
	}

	@Override
	public String toString() {
		return "UserObject [id=" + id + ", email=" + email + ", password="
				+ password + ", firstName=" + firstName + ", lastname="
				+ lastname + ", confirmedStatus=" + confirmedStatus
				+ ", approvedStatus=" + approvedStatus + ", activeStatus="
				+ activeStatus + ", phone1=" + phone1 + ", phone2=" + phone2
				+ ", address=" + address + ", city=" + city + ", state="
				+ state + ", country=" + country + ", lang=" + lang
				+ ", remarks=" + remarks + ", timezone=" + timezone
				+ ", firstaccess=" + firstaccess + ", lastaccess=" + lastaccess
				+ ", lastlogin=" + lastlogin + ", currentlogin=" + currentlogin
				+ ", lastip=" + lastip + ", secret=" + secret + ", picture="
				+ picture + ", url=" + url + ", description=" + description
				+ ", years_of_experience=" + years_of_experience
				+ ", area_of_speciality=" + area_of_speciality
				+ ", interest_in_communication=" + interest_in_communication
				+ ", bays_in_shop=" + bays_in_shop + ", brake_jobs_in_a_month="
				+ brake_jobs_in_a_month + ", list_in_find_a_shop="
				+ list_in_find_a_shop + ", currently_using_raybestos_products="
				+ currently_using_raybestos_products + ", mailformat="
				+ mailformat + ", maildisplay=" + maildisplay + ", htmleditor="
				+ htmleditor + ", autosubscribe=" + shopowner
				+ ", timemodified=" + timemodified + ", nickname=" + nickname
				+ ", keepShopPrivate=" + keepShopPrivate
				+ ", KeepEmployeePrivate=" + KeepEmployeePrivate
				+ ", iscustomer=" + iscustomer + ", verificationlinksenttime="
				+ verificationlinksenttime + ", referedby=" + referedby
				+ ", isFirstAccess=" + isFirstAccess + ", jobtitleList="
				+ jobtitleList + ", organizationList=" + organizationList + ".isadmin=" + isadmin + "]";
	}
}
