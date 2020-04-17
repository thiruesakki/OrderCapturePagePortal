package com.brakepartsinc.project.techportal.dao;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbcp2.BasicDataSource;

import com.brakepartsinc.project.techportal.util.TPUtility;

public class DataSource {

	private static DataSource datasource;
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
	private String dbUrl = "jdbc:sqlserver://"; 
	private String dbUser = "sa";
	private String dbPassword="Sql@2017";
	private String dbHostName = "18.191.93.138";
	private String dbName = "technicianportal_dev";
//	
	
	private DataSource() throws IOException, SQLException {
		ds = new BasicDataSource();

		ds.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		
		ds.setUrl(dbUrl + dbHostName + ";user="
				+ dbUser + ";password=" + dbPassword + ";database="
				+ dbName);
		
//		ds.setUrl("jdbc:sqlserver://" + TPUtility.getHostName() + ";user="
//				+ TPUtility.getUserName() + ";password=" + TPUtility.getPassword() + ";database="
//				+ TPUtility.getDatabaseName());  

		ds.setInitialSize(0);
		ds.setMinIdle(90);
		ds.setMaxIdle(250);
		ds.setMaxTotal(1500);  

		ds.setMaxWaitMillis(1000) ;
		ds.setRemoveAbandonedOnMaintenance(true) ;
		ds.setRemoveAbandonedOnBorrow(true) ;
		ds.setRemoveAbandonedTimeout(30);

	}

	public static DataSource getInstance() throws IOException, SQLException {
		if (datasource == null) {
			datasource = new DataSource();
			return datasource;
		} else {
			return datasource;
		}
	}

	public Connection getConnection() throws SQLException {
		return this.ds.getConnection();
	}
	
	public BasicDataSource getDSObject() throws SQLException {
		return this.ds;
	}

}
