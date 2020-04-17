package com.brakepartsinc.project.techportal.dao;

import java.beans.PropertyVetoException;
import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbcp2.BasicDataSource;

public class OracleConnectionManager {

	public Connection GetConnection() throws Exception, PropertyVetoException {
		
		try {
			OracleDataSource ds=new OracleDataSource();
			Connection connection = null;
			Class.forName("oracle.jdbc.driver.OracleDriver")
					.newInstance();
//			DataSource ds = DBCPDataSourceFactory.getDataSource(dbType);
//			
//			Connection con = null;
//			Statement stmt = null;
//			ResultSet rs = null;
			
				
			connection = ds.getConnection();
			BasicDataSource obj = OracleDataSource.getInstance().getDSObject();
			System.out.println("@@@@@@@@@@@@@@@@@@@@@@@");
			System.out.println("Current Active Connections:" + obj.getNumActive());
			System.out.println("Current Inactive Connections:" + obj.getNumIdle());
			System.out.println("@@@@@@@@@@@@@@@@@@@@@@@");
			// connection =
			// DriverManager.getConnection("jdbc:sqlserver://RTVSS-LP3;user=sa;password=sql2008;database=technicianportal");
			return connection;
		} catch (SQLException e) {
			throw e;
		} catch (Exception e) {
			throw e;
		}
	}

}
