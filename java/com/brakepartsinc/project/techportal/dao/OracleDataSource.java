package com.brakepartsinc.project.techportal.dao;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbcp2.BasicDataSource;

import com.brakepartsinc.project.techportal.util.TPUtility;

public class OracleDataSource {

	private static OracleDataSource datasource;
	private BasicDataSource ds;
	
	// Production Environment 
//	private String dbUrl = "jdbc:sqlserver://"; 
//	private String dbUser = "cap";
//	private String dbPassword="123@Password";
//	private String dbHostName = "uswodsvr623v";
//	private String dbName = "TechPortal_Prod";
	
	// Staging Environment 
//	private String dbUrl = "jdbc:sqlserver://"; 
//	private String dbUser = "cap";
//	private String dbPassword="123@Password";
//	private String dbHostName = "uswodsvr623v";
//	private String dbName = "TechPortal_Staging";
		
	// DEV Environment 
//	private String dbUrl = "jdbc:sqlserver://"; 
//	private String dbUser = "BPIUsers";
//	private String dbPassword="Udr7y#kS$!";
//	private String dbHostName = "uswodsvr612v";
//	private String dbName = "TechPortal_DEV";
	
	// Local Environment 
//	private String dbUrl = "jdbc:sqlserver://"; 
//	private String dbUser = "sa";
//	private String dbPassword="root";
//	private String dbHostName = "LAPTOP-6D1BFF05:1434";
//	private String dbName = "Test_TechPortal";
	
	// Local Environment 
//	private String dbUrl = "jdbc:sqlserver://"; 
//	private String dbUser = "sa";
//	private String dbPassword="Sql@2019";
//	private String dbHostName = "LAPTOP-KKU2H7V8:1433";
//	private String dbName = "TechPortal_Staging";
		
	// Local Dev Environment 
//	private String dbUrl = "jdbc:sqlserver://"; 
//	private String dbUser = "sa";
//	private String dbPassword="Sql@2017";
//	private String dbHostName = "18.191.93.138";
//	private String dbName = "technicianportal_dev";
//	
	
	// Local Dev Environment 
	private String dbUrl = "jdbc:oracle:thin:@"; 
	private String dbUser = "sa";
	private String dbPassword="Sql@2017";
	private String dbHostName = "150.136.207.205";
	private String dbPort = "1528";
	private String dbName = "ebsdemo2";
	private String url="jdbc:oracle:thin:@150.136.207.205:1528:ebsdemo2";
	 private String driverClassName="oracle.jdbc.driver.OracleDriver" ;
	 private String userName="apps";
	 
	 private String password="apps";
	
	public OracleDataSource() throws IOException, Exception {
		ds = new BasicDataSource();
//		Class.forName("oracle.jdbc.driver.OracleDriver");  
//		Connection conn=DriverManager.getConnection(  
//		"jdbc:oracle:thin:@150.136.207.205:1528:ebsdemo2","apps","apps");  
		ds.setDriverClassName("oracle.jdbc.driver.OracleDriver");
		ds.setUrl(url);
		ds.setPassword(password);
		ds.setUsername(userName);
		
//		ds.setUrl("jdbc:sqlserver://" + TPUtility.getHostName() + ";user="
//				+ TPUtility.getUserName() + ";password=" + TPUtility.getPassword() + ";database="
//				+ TPUtility.getDatabaseName());  

//		ds.setInitialSize(0);
//		ds.setMinIdle(90);
//		ds.setMaxIdle(250);
//		ds.setMaxTotal(1500);  
//
//		ds.setMaxWaitMillis(1000) ;
//		ds.setRemoveAbandonedOnMaintenance(true) ;
//		ds.setRemoveAbandonedOnBorrow(true) ;
//		ds.setRemoveAbandonedTimeout(30);

	}

	public static OracleDataSource getInstance() throws IOException, Exception {
		if (datasource == null) {
			datasource = new OracleDataSource();
			return datasource;
		} else {
			return datasource;
		}
	}

	public Connection getConnection() throws Exception {
		return this.ds.getConnection();
	}
	
	public BasicDataSource getDSObject() throws Exception {
		return this.ds;
	}

}
