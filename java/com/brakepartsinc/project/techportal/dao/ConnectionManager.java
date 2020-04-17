package com.brakepartsinc.project.techportal.dao;

import java.beans.PropertyVetoException;
import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbcp2.BasicDataSource;

public class ConnectionManager {

	public Connection GetConnection() throws Exception, PropertyVetoException {
		try {
			Connection connection = null;
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver")
					.newInstance();
			connection = DataSource.getInstance().getConnection();
			BasicDataSource obj = DataSource.getInstance().getDSObject();
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
