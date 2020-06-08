package com.brakepartsinc.project.techportal.dao;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.brakepartsinc.project.techportal.dto.CheckStockObject;
import com.brakepartsinc.project.techportal.dto.InvoiceObject;
import com.brakepartsinc.project.techportal.dto.InvoiceOrderCheckObject;
import com.brakepartsinc.project.techportal.dto.OrderHistoryListObject;
import com.brakepartsinc.project.techportal.dto.OrderShipToObject;
import com.brakepartsinc.project.techportal.dto.OrderShippingObject;
import com.brakepartsinc.project.techportal.dto.PartNumberObject;
import com.brakepartsinc.project.techportal.dto.PaymentObject;
import com.brakepartsinc.project.techportal.dto.PlaceOrderObject;
import com.brakepartsinc.project.techportal.dto.PlaceOrderResponseObject;
import com.brakepartsinc.project.techportal.dto.RMAObject;
import com.brakepartsinc.project.techportal.dto.RMAOverallObject;
import com.brakepartsinc.project.techportal.dto.RMAResponseObject;
import com.brakepartsinc.project.techportal.dto.ReturnReasonListObject;
import com.brakepartsinc.project.techportal.dto.SOLineItemObject;
import com.brakepartsinc.project.techportal.dto.SalesOrderLineItems;
import com.brakepartsinc.project.techportal.dto.ShipToObject;
import com.brakepartsinc.project.techportal.util.StatusObject;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
//import oracle.jdbc.OracleCallableStatement;
//import oracle.jdbc.internal.OracleTypes;
import com.google.gson.reflect.TypeToken;

public class OracleDataHandler {

//	public List<ShipToAddressObject> getShipToAddress(String org_id,
//			String ship_to_location) throws Exception {
//		String userID = "Success";
//		Connection connection = null;
//		CallableStatement callableStatement = null;
//		List<ShipToAddressObject> shipToAddressList = null;
//		StatusObject status = null;
//		String query = "{call xxenv_test.get_ship_to_address(?,?,?,?,?)}";
//		try {
//			status = new StatusObject();
//			Class.forName("oracle.jdbc.driver.OracleDriver");
//			connection = DriverManager.getConnection(
//					"jdbc:oracle:thin:@150.136.207.205:1528:ebsdemo2", "apps",
//					"apps");
//			// System.out.println("org_Id:"+org_id+"ship_to:"+ship_to_location);
//			callableStatement = connection.prepareCall(query);
//			callableStatement.setString(1, org_id);
//			callableStatement.setString(2, ship_to_location);
//			callableStatement.registerOutParameter(3, Types.VARCHAR);
//			callableStatement.registerOutParameter(4, Types.VARCHAR);
//			callableStatement.registerOutParameter(5, OracleTypes.CURSOR);
//			callableStatement.execute();
//			String statuscode = callableStatement.getString(3);
//			String errormsg = callableStatement.getString(4);
//			ResultSet resultSet = ((OracleCallableStatement) callableStatement)
//					.getCursor(5);
//
//			// ResultSetMetaData rsmd = resultSet.getMetaData();
//			// int columnsNumber = rsmd.getColumnCount();
//			// while (resultSet.next()) {
//			// for (int i = 1; i <= columnsNumber; i++) {
//			// if (i > 1) System.out.print(",  ");
//			// String columnValue = resultSet.getString(i);
//			// System.out.print(columnValue + " " + rsmd.getColumnName(i));
//			// }
//			// System.out.println("");
//			// }
//			while (resultSet.next()) {
//				ShipToAddressObject shipToAddress = new ShipToAddressObject();
//				shipToAddress.setADDRESS1(resultSet.getString("address1"));
//				// shipToAddress.setAccount_number(resultSet.getString("account_number"));
//				// shipToAddress.setAccount_name(resultSet.getString("account_name"));
//				// shipToAddress.setParty_site_id(resultSet.getString("party_site_id"));
//				// shipToAddress.setAddress1(resultSet.getString("address1"));
//				// shipToAddress.setAddress2(resultSet.getString("address2"));
//				// shipToAddress.setAddress3(resultSet.getString("address3"));
//				// shipToAddress.setCity(resultSet.getString("city"));
//				// shipToAddress.setState(resultSet.getString("state"));
//				// shipToAddress.setPostal_code(resultSet.getString("postal_code"));
//				// shipToAddress.setCountry(resultSet.getString("country"));
//				// shipToAddress.setWarehouse_id(resultSet.getString("warehouse_id"));
//				// shipToAddress.setDefault_dc(resultSet.getString("default_dc"));
//				// shipToAddress.setLocation(resultSet.getString("location"));
//				shipToAddressList.add(shipToAddress);
//			}
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			System.err.println("DB ERROR: Method GetUser() : " + e);
//			throw e;
//		} finally {
//			if (connection != null) {
//				try {
//					connection.close();
//				} catch (Exception e) {
//
//				}
//			}
//		}
//		return shipToAddressList;
//	}

	public ShipToObject getShipToAddressMule(String org_id,
			String ship_to_location) throws IOException {
		String query = "http://xxenv-test-shipto-billto-info2.us-e2.cloudhub.io/api/ShiptoBilltoInfo?p_operating_unit_id="
//				+ "http://xxenv-test-get-ship-to-address1.us-e2.cloudhub.io/api/Customer?p_operating_unit_id="
				+ org_id + "&p_ship_to=" + ship_to_location;
		System.out.println(query);
		URL urlForGetRequest = new URL(query);
		String readLine = null;
		String outputString = "";
		ShipToObject addressObject = null;
		HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
				.openConnection();
		conection.setRequestMethod("GET");
		// conection.setRequestProperty("p_operating_unit_id", org_id); // set
		// userId its a sample here
		// conection.setRequestProperty("p_ship_to_loction", ship_to_location);
		int responseCode = conection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(new InputStreamReader(
					conection.getInputStream()));
			StringBuffer response = new StringBuffer();

			while ((readLine = in.readLine()) != null) {
				response.append(readLine);
			}
			in.close();
			outputString = response.toString();
			Gson g = new Gson();
			addressObject = g.fromJson(outputString, ShipToObject.class);
			// GetAndPost.POSTRequest(response.toString());
		} else {
			System.out.println("GET NOT WORKED");
		}
		return addressObject;
	}
	
	public OrderHistoryListObject getMuleAllOrderHistory(String orgId,
			String shipTo, String billTo, String fromDate,String toDate, String searchType) throws IOException {
//		String orderToDate=TPUtility.formatSqlDateToMule(toDate);
//		String orderFromDate=TPUtility.formatSqlDateToMule(fromDate);
		String query = "http://xxenv-test-order-history2.us-e2.cloudhub.io/api/OrderHistory?p_operating_unit_id="
				+ orgId + "&p_ship_to=" + shipTo+"&p_bill_to="+billTo+"&p_from_date="+fromDate+"&p_to_date="+toDate+"&p_search_type="+searchType;
		System.out.println(query);
		URL urlForGetRequest = new URL(query);
		String readLine = null;
		String outputString = "";
		OrderHistoryListObject orderHistoryList = null;
		HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
				.openConnection();
		conection.setRequestMethod("GET");
		// conection.setRequestProperty("p_operating_unit_id", org_id); // set
		// userId its a sample here
		// conection.setRequestProperty("p_ship_to_loction", ship_to_location);
		int responseCode = conection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(new InputStreamReader(
					conection.getInputStream()));
			StringBuffer response = new StringBuffer();

			while ((readLine = in.readLine()) != null) {
				response.append(readLine);
			}
			in.close();
			outputString = response.toString();
			Gson g = new Gson();
			orderHistoryList = g.fromJson(outputString, OrderHistoryListObject.class);
			// GetAndPost.POSTRequest(response.toString());
		} else {
			System.out.println("GET NOT WORKED");
		}
		return orderHistoryList;
	}
	public OrderHistoryListObject getMulePoOrderHistory(String orgId,
			String shipTo, String billTo, String searchType, String docNumber) throws IOException {
//		String orderToDate=TPUtility.formatSqlDateToMule(toDate);
//		String orderFromDate=TPUtility.formatSqlDateToMule(fromDate);
		String query = "http://xxenv-test-order-history2.us-e2.cloudhub.io/api/OrderHistory?p_operating_unit_id="
				+ orgId + "&p_ship_to=" + shipTo+"&p_bill_to="+billTo+"&p_search_type="+searchType+"&p_document_num="+docNumber;
		System.out.println(query);
		URL urlForGetRequest = new URL(query);
		String readLine = null;
		String outputString = "";
		OrderHistoryListObject orderHistoryList = null;
		HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
				.openConnection();
		conection.setRequestMethod("GET");
		// conection.setRequestProperty("p_operating_unit_id", org_id); // set
		// userId its a sample here
		// conection.setRequestProperty("p_ship_to_loction", ship_to_location);
		int responseCode = conection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(new InputStreamReader(
					conection.getInputStream()));
			StringBuffer response = new StringBuffer();

			while ((readLine = in.readLine()) != null) {
				response.append(readLine);
			}
			in.close();
			outputString = response.toString();
			Gson g = new Gson();
			orderHistoryList = g.fromJson(outputString, OrderHistoryListObject.class);
			// GetAndPost.POSTRequest(response.toString());
		} else {
			System.out.println("GET NOT WORKED");
		}
		return orderHistoryList;
	}
	
	public OrderShipToObject getMuleOrderDetails(String org_id,
			String sales_order_num) throws IOException {
		String query = "http://xxenv-order-detail2.us-e2.cloudhub.io/api/OrderDetails?p_operating_unit_id="
				+ org_id + "&p_sales_order_num=" + sales_order_num;
		System.out.println(query);
		URL urlForGetRequest = new URL(query);
		String readLine = null;
		String outputString = "";
		OrderShipToObject orderObject = null;
		HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
				.openConnection();
		conection.setRequestMethod("GET");
	
		int responseCode = conection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(new InputStreamReader(
					conection.getInputStream()));
			StringBuffer response = new StringBuffer();

			while ((readLine = in.readLine()) != null) {
				response.append(readLine);
			}
			in.close();
			outputString = response.toString();
			Gson g = new Gson();
			orderObject = g.fromJson(outputString, OrderShipToObject.class);
			// GetAndPost.POSTRequest(response.toString());
//			System.out.println("OrderShipToObject:" + orderObject);
		} else {
//			System.out.println("GET NOT WORKED");
		}
		return orderObject;
	}
	
	public OrderShippingObject getMuleOrderShippingDetails(String org_id,
			String order_num) throws IOException {
//		String query = "http://xxenv-test-shipping-detail1.us-e2.cloudhub.io/api/ShippingDetails?p_operating_unit_id="
//				+ org_id + "&p_order_num=" + order_num;
		String query = "http://xxenv-test-shipping-details1.us-e2.cloudhub.io/api/ShippingDetails?p_operating_unit_id="
				+ org_id + "&p_order_num=" + order_num;
		System.out.println(query);
		URL urlForGetRequest = new URL(query);
		String readLine = null;
		String outputString = "";
		OrderShippingObject orderShippingObject = null;
		HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
				.openConnection();
		conection.setRequestMethod("GET");
		
		int responseCode = conection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(new InputStreamReader(
					conection.getInputStream()));
			StringBuffer response = new StringBuffer();

			while ((readLine = in.readLine()) != null) {
				response.append(readLine);
			}
			in.close();
			outputString = response.toString();
			Gson g = new Gson();
			orderShippingObject = g.fromJson(outputString, OrderShippingObject.class);
			
//			System.out.println("orderShippingObject:" + orderShippingObject);
		} else {
//			System.out.println("GET NOT WORKED");
		}
		return orderShippingObject;
	}
	
	public CheckStockObject getMuleCheckStock(String org_Id,
			String ship_To , String product_No) throws IOException {
//		String query = "http://xxenv-test-check-stock.us-e2.cloudhub.io/api/CheckStock?p_operating_unit_id="
//				+ org_Id + "&p_ship_to=" + ship_To+ "&p_prodcut=" + product_No;
//		String query = "http://xxenv-test-item-check-stock.us-e2.cloudhub.io/api/ItemCheckStock?p_ship_to="
//				+ ship_To+ "&p_product=" + product_No;
		String query = "http://xxenv-test-check-stock1.us-e2.cloudhub.io/api/ItemCheckStock?p_ship_to="
				+ ship_To+ "&p_product=" + product_No;
		System.out.println(query);
		URL urlForGetRequest = new URL(query);
		String readLine = null;
		String outputString = "";
		CheckStockObject checkStockObject = null;
		HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
				.openConnection();
		conection.setRequestMethod("GET");
		
		int responseCode = conection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(new InputStreamReader(
					conection.getInputStream()));
			StringBuffer response = new StringBuffer();

			while ((readLine = in.readLine()) != null) {
				response.append(readLine);
			}
			in.close();
			outputString = response.toString();
			Gson g = new Gson();
			checkStockObject = g.fromJson(outputString, CheckStockObject.class);
			
//			System.out.println("orderShippingObject:" + orderShippingObject);
		} else {
//			System.out.println("GET NOT WORKED");
		}
		return checkStockObject;
	}
	public int getOrgID(
			String ship_to_location) throws Exception {
		Connection connection = null;
		StatusObject status=null;
		int orgID=0;
		String query = "select org_id from apps.hz_cust_site_uses_all where location='Pittsburgh'";
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			connection = DriverManager.getConnection(
					"jdbc:oracle:thin:@150.136.207.205:1528:ebsdemo2", "apps",
					"apps");
			PreparedStatement ps = connection.prepareStatement(query);
			ResultSet rs = ps.executeQuery();
			 while (rs.next()) {
			 System.out.print( "OrgID"+ rs.getString("ORG_ID"));
			 orgID=Integer.parseInt(rs.getString("ORG_ID"));
			 }
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("DB ERROR: Method GetUser() : " + e);
			throw e;
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (Exception e) {

				}
			}
		}
		return orgID;
	}
	
	public InvoiceObject getMuleInvoiceDetails(String org_id,
			String purchase_order_number) throws IOException {
		String query = "http://xxenv-test-invoice-details2.us-e2.cloudhub.io/api/InvoiceDetails?p_operating_unit_id="
				+ org_id + "&p_order_number=" + purchase_order_number;
		System.out.println(query);
		URL urlForGetRequest = new URL(query);
		String readLine = null;
		String outputString = "";
		InvoiceObject invoiceObject = null;
		HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
				.openConnection();
		conection.setRequestMethod("GET");
		// conection.setRequestProperty("p_operating_unit_id", org_id); // set
		// userId its a sample here
		// conection.setRequestProperty("p_ship_to_loction", ship_to_location);
		int responseCode = conection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(new InputStreamReader(
					conection.getInputStream()));
			StringBuffer response = new StringBuffer();

			while ((readLine = in.readLine()) != null) {
				response.append(readLine);
			}
			in.close();
			outputString = response.toString();
			Gson g = new Gson();
			invoiceObject = g.fromJson(outputString, InvoiceObject.class);
			// GetAndPost.POSTRequest(response.toString());
		} else {
			System.out.println("GET NOT WORKED");
		}
		return invoiceObject;
	}
	public InvoiceOrderCheckObject getMuleCheckInvoiceDetails(String org_id,
			String purchase_order_number) throws IOException {
//		String query = "http://xxenv-test-invoice-check.us-e2.cloudhub.io/api/InvoiceCheck?p_operating_unit_id="
//				+ org_id + "&p_purchase_order=" + purchase_order_number;
		String query = "http://xxenv-test-invoice-check1.us-e2.cloudhub.io/api/InvoiceCheck?p_operating_unit_id="
				+ org_id + "&p_purchase_order=" + purchase_order_number;
		System.out.println(query);
		URL urlForGetRequest = new URL(query);
		String readLine = null;
		String outputString = "";
		InvoiceOrderCheckObject checkObject = null;
		HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
				.openConnection();
		conection.setRequestMethod("GET");
		// conection.setRequestProperty("p_operating_unit_id", org_id); // set
		// userId its a sample here
		// conection.setRequestProperty("p_ship_to_loction", ship_to_location);
		int responseCode = conection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(new InputStreamReader(
					conection.getInputStream()));
			StringBuffer response = new StringBuffer();

			while ((readLine = in.readLine()) != null) {
				response.append(readLine);
			}
			in.close();
			outputString = response.toString();
			Gson g = new Gson();
			checkObject = g.fromJson(outputString, InvoiceOrderCheckObject.class);
//			statusString=checkObject.getX_inv_exist();
			// GetAndPost.POSTRequest(response.toString());
		} else {
			System.out.println("GET NOT WORKED");
		}
		return checkObject;
	}
	public InvoiceOrderCheckObject validatePoNumber(String org_id,
			String po_number, String billTo_number, String shipTo_number) throws IOException {
//		String query = "http://xxenv-test-validate-po-number1.us-e2.cloudhub.io/api/ValidatePoNumber?p_operating_unit_id="
//				+ org_id + "&p_po_num=" + po_number+"&p_bill_num="+billTo_number+"&p_ship_num="+shipTo_number;
		String query = "http://xxenv-test-validate-po-number.us-e2.cloudhub.io/api/ValidatePoNumber?p_operating_unit_id="
				+ org_id + "&p_po_num=" + po_number+"&p_bill_num="+billTo_number+"&p_ship_num="+shipTo_number;
		System.out.println(query);
		URL urlForGetRequest = new URL(query);
		String readLine = null;
		String outputString = "";
		InvoiceOrderCheckObject checkObject = null;
		HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
				.openConnection();
		conection.setRequestMethod("GET");
		// conection.setRequestProperty("p_operating_unit_id", org_id); // set
		// userId its a sample here
		// conection.setRequestProperty("p_ship_to_loction", ship_to_location);
		int responseCode = conection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(new InputStreamReader(
					conection.getInputStream()));
			StringBuffer response = new StringBuffer();

			while ((readLine = in.readLine()) != null) {
				response.append(readLine);
			}
			in.close();
			outputString = response.toString();
			Gson g = new Gson();
			checkObject = g.fromJson(outputString, InvoiceOrderCheckObject.class);
//			statusString=checkObject.getX_inv_exist();
			// GetAndPost.POSTRequest(response.toString());
		} else {
			System.out.println("GET NOT WORKED");
		}
		return checkObject;
	}
	
	
	 public PlaceOrderResponseObject savePlaceOrderMule(PlaceOrderObject placeOrderObject) throws IOException {
		 
		 	String org_id="204";
		 	String userName= placeOrderObject.getUSER_NAME()==""||placeOrderObject.getUSER_NAME()==null?null:placeOrderObject.getUSER_NAME();
			String query = "http://xxenv-test-place-sales-order4.us-e2.cloudhub.io/api/PlaceSalesOrder?p_operating_unit_id="
					+ org_id + "&p_cust_po_number=" + placeOrderObject.getCUST_PO_NUMBER()+"&p_order_type="
					+ placeOrderObject.getORDER_TYPE() + "&p_user_name=" + userName +"&p_shipping_method="+ placeOrderObject.getSHIPPING_METHOD()+ "&p_ship_to_org="
					+ placeOrderObject.getSHIP_TO_ORG() +"&p_bill_to_org="+placeOrderObject.getBILL_TO_ORG()+"&p_requested_date="+placeOrderObject.getREQUESTED_DATE();

			System.out.println(query);
			URL obj = new URL(query);
			String readLine = null;
			String outputString = "";
			HttpURLConnection connection = (HttpURLConnection) obj
					.openConnection();
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Content-Type", "application/json");
			connection.setDoOutput(true);
			OutputStream os = connection.getOutputStream();
			String postParams ="";
			Gson gson=new Gson();
			postParams= gson.toJson(placeOrderObject);
			os.write(postParams.getBytes());
			os.flush();
			os.close();
			int responseCode = connection.getResponseCode();
			System.out.println("POST Response Code :  " + responseCode);
	        System.out.println("POST Response Message : " + connection.getResponseMessage());
	        PlaceOrderResponseObject placeOrderRes=new PlaceOrderResponseObject();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				BufferedReader in = new BufferedReader(new InputStreamReader(
						connection.getInputStream()));
				StringBuffer response = new StringBuffer();

				while ((readLine = in.readLine()) != null) {
					response.append(readLine);
				}
			in.close();
			outputString = response.toString();
			System.out.println("placeorder result"+outputString);
			placeOrderRes=gson.fromJson(outputString,PlaceOrderResponseObject.class);
			} else {
				System.out.println("POST NOT WORKED");
			}
			return placeOrderRes;
	}
	 public PartNumberObject getPartNumber(String org_id,
			 String shipTo_number, String partNO) throws IOException {
		String query = "http://item-search2.us-e2.cloudhub.io/api/ItemSearch?p_operating_unit_id="
				+ org_id + "&p_ship_to=" + shipTo_number + "&p_item="+partNO;
		System.out.println(query);
		URL urlForGetRequest = new URL(query);
		String readLine = null;
		String outputString = "";
		PartNumberObject partNOObject = null;
		HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
				.openConnection();
		conection.setRequestMethod("GET");
		int responseCode = conection.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) {
			BufferedReader in = new BufferedReader(new InputStreamReader(
					conection.getInputStream()));
			StringBuffer response = new StringBuffer();

			while ((readLine = in.readLine()) != null) {
				response.append(readLine);
			}
			in.close();
			outputString = response.toString();
			Gson g = new Gson();
			partNOObject = g.fromJson(outputString, PartNumberObject.class);
		} else {
			System.out.println("GET NOT WORKED");
		}
		return partNOObject;
	}
	 
	 public PaymentObject getMulePaymentMatching(String org_id,
				String sales_order_number) throws IOException {
//			String query = "http://xxenv-test-payment-matching.us-e2.cloudhub.io/api/paymentMatching?p_operating_unit_id="
//					+ org_id + "&p_order_num=" + sales_order_number;
			String query = "http://xxenv-test-payment-matching1.us-e2.cloudhub.io/api/paymentMatching?p_operating_unit_id="
					+ org_id + "&p_order_num=" + sales_order_number;
			System.out.println(query);
			URL urlForGetRequest = new URL(query);
			String readLine = null;
			String outputString = "";
			PaymentObject paymentObject = null;
			HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
					.openConnection();
			conection.setRequestMethod("GET");
			int responseCode = conection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				BufferedReader in = new BufferedReader(new InputStreamReader(
						conection.getInputStream()));
				StringBuffer response = new StringBuffer();

				while ((readLine = in.readLine()) != null) {
					response.append(readLine);
				}
				in.close();
				outputString = response.toString();
				Gson g = new Gson();
				paymentObject = g.fromJson(outputString, PaymentObject.class);
				// GetAndPost.POSTRequest(response.toString());
			} else {
				System.out.println("GET NOT WORKED");
			}
			return paymentObject;
		}
	 public OrderHistoryListObject getMuleAllReturnOrderHistory(String orgId,
				String shipTo, String billTo, String fromDate,String toDate, String searchType) throws IOException {
//			String orderToDate=TPUtility.formatSqlDateToMule(toDate);
//			String orderFromDate=TPUtility.formatSqlDateToMule(fromDate);
			String query = "http://xxenv-test-rma-order-history.us-e2.cloudhub.io/api/RmaOrderHistory?p_operating_unit_id="
					+ orgId + "&p_ship_to=" + shipTo+"&p_bill_to="+billTo+"&p_from_date="+fromDate+"&p_to_date="+toDate+"&p_search_type="+searchType;
			System.out.println(query);
			URL urlForGetRequest = new URL(query);
			String readLine = null;
			String outputString = "";
			OrderHistoryListObject orderHistoryList = null;
			HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
					.openConnection();
			conection.setRequestMethod("GET");
			// conection.setRequestProperty("p_operating_unit_id", org_id); // set
			// userId its a sample here
			// conection.setRequestProperty("p_ship_to_loction", ship_to_location);
			int responseCode = conection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				BufferedReader in = new BufferedReader(new InputStreamReader(
						conection.getInputStream()));
				StringBuffer response = new StringBuffer();

				while ((readLine = in.readLine()) != null) {
					response.append(readLine);
				}
				in.close();
				outputString = response.toString();
				Gson g = new Gson();
				orderHistoryList = g.fromJson(outputString, OrderHistoryListObject.class);
				// GetAndPost.POSTRequest(response.toString());
			} else {
				System.out.println("GET NOT WORKED");
			}
			return orderHistoryList;
		}
		public OrderHistoryListObject getMuleReturnPoOrderHistory(String orgId,
				String shipTo, String billTo, String searchType, String docNumber) throws IOException {
//			String orderToDate=TPUtility.formatSqlDateToMule(toDate);
//			String orderFromDate=TPUtility.formatSqlDateToMule(fromDate);
			String query = "http://xxenv-test-rma-order-history.us-e2.cloudhub.io/api/RmaOrderHistory?p_operating_unit_id="
					+ orgId + "&p_ship_to=" + shipTo+"&p_bill_to="+billTo+"&p_search_type="+searchType+"&p_document_num="+docNumber;
			System.out.println(query);
			URL urlForGetRequest = new URL(query);
			String readLine = null;
			String outputString = "";
			OrderHistoryListObject orderHistoryList = null;
			HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
					.openConnection();
			conection.setRequestMethod("GET");
			// conection.setRequestProperty("p_operating_unit_id", org_id); // set
			// userId its a sample here
			// conection.setRequestProperty("p_ship_to_loction", ship_to_location);
			int responseCode = conection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				BufferedReader in = new BufferedReader(new InputStreamReader(
						conection.getInputStream()));
				StringBuffer response = new StringBuffer();

				while ((readLine = in.readLine()) != null) {
					response.append(readLine);
				}
				in.close();
				outputString = response.toString();
				Gson g = new Gson();
				orderHistoryList = g.fromJson(outputString, OrderHistoryListObject.class);
				// GetAndPost.POSTRequest(response.toString());
			} else {
				System.out.println("GET NOT WORKED");
			}
			return orderHistoryList;
		}
		
		public PartNumberObject getSONumber(String org_id,String billTo_number,
				 String shipTo_number, String salesOrderNO) throws IOException {
			System.out.println(org_id+" " +billTo_number+" " +shipTo_number+" " + salesOrderNO);
			String query = "http://so-num-search1.us-e2.cloudhub.io/api/SoNumSearch?p_operating_unit_id="
					+ org_id + "&p_bill_num=" + billTo_number + "&p_ship_num=" + shipTo_number + "&p_so_num="+salesOrderNO;
			System.out.println(query);
			URL urlForGetRequest = new URL(query);
			String readLine = null;
			String outputString = "";
			PartNumberObject partNOObject = null;
			HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
					.openConnection();
			conection.setRequestMethod("GET");
			int responseCode = conection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				BufferedReader in = new BufferedReader(new InputStreamReader(
						conection.getInputStream()));
				StringBuffer response = new StringBuffer();

				while ((readLine = in.readLine()) != null) {
					response.append(readLine);
				}
				in.close();
				outputString = response.toString();
				Gson g = new Gson();
				partNOObject = g.fromJson(outputString, PartNumberObject.class);
			} else {
				System.out.println("GET NOT WORKED");
			}
			return partNOObject;
		}
		public PartNumberObject getPONumber(String org_id,String billTo_number,
				 String shipTo_number, String purchaseOrderNO) throws IOException {
			System.out.println(org_id+" " +billTo_number+" " +shipTo_number+" " + purchaseOrderNO);
			String query = "http://xxenv-test-cust-po-num-search1.us-e2.cloudhub.io/api/CustPoNumSearch?p_operating_unit_id="
					+ org_id + "&p_bill_num=" + billTo_number + "&p_ship_num=" + shipTo_number + "&p_cust_po_num="+purchaseOrderNO;
			System.out.println(query);
			URL urlForGetRequest = new URL(query);
			String readLine = null;
			String outputString = "";
			PartNumberObject partNOObject = null;
			HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
					.openConnection();
			conection.setRequestMethod("GET");
			int responseCode = conection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				BufferedReader in = new BufferedReader(new InputStreamReader(
						conection.getInputStream()));
				StringBuffer response = new StringBuffer();

				while ((readLine = in.readLine()) != null) {
					response.append(readLine);
				}
				in.close();
				outputString = response.toString();
				Gson g = new Gson();
				partNOObject = g.fromJson(outputString, PartNumberObject.class);
			} else {
				System.out.println("GET NOT WORKED");
			}
			return partNOObject;
		}
		
		public InvoiceOrderCheckObject validateReturnQty(String org_id,
				String so_number, String line_num, String part_num, String req_qty) throws IOException {
			String query = "http://xxenv-test-validate-return-qty.us-e2.cloudhub.io/api/validateReturnQty?p_operating_unit_id="
					+ org_id + "&p_so_num=" + so_number+"&p_line_num="+line_num+"&p_part_num="+part_num+"&p_ret_qty="+req_qty;
			System.out.println(query);
			URL urlForGetRequest = new URL(query);
			String readLine = null;
			String outputString = "";
			InvoiceOrderCheckObject checkObject = null;
			HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
					.openConnection();
			conection.setRequestMethod("GET");
			// conection.setRequestProperty("p_operating_unit_id", org_id); // set
			// userId its a sample here
			// conection.setRequestProperty("p_ship_to_loction", ship_to_location);
			int responseCode = conection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				BufferedReader in = new BufferedReader(new InputStreamReader(
						conection.getInputStream()));
				StringBuffer response = new StringBuffer();

				while ((readLine = in.readLine()) != null) {
					response.append(readLine);
				}
				in.close();
				outputString = response.toString();
				Gson g = new Gson();
				checkObject = g.fromJson(outputString, InvoiceOrderCheckObject.class);
//				statusString=checkObject.getX_inv_exist();
				// GetAndPost.POSTRequest(response.toString());
			} else {
				System.out.println("GET NOT WORKED");
			}
			return checkObject;
		}
		
		public SalesOrderLineItems getSoLineItems(String org_id,String soNumber) throws IOException {
			String query = "http://xxenv-test-get-so-line-items1.us-e2.cloudhub.io/api/GetSoLineItems?p_operating_unit_id="
					+ org_id + "&p_so_num=" + soNumber;
			System.out.println(query);
			URL urlForGetRequest = new URL(query);
			String readLine = null;
			String outputString = "";
			SalesOrderLineItems soLineItemListObj = null;
			HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
					.openConnection();
			conection.setRequestMethod("GET");
			int responseCode = conection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				BufferedReader in = new BufferedReader(new InputStreamReader(
						conection.getInputStream()));
				StringBuffer response = new StringBuffer();

				while ((readLine = in.readLine()) != null) {
					response.append(readLine);
				}
				in.close();
				outputString = response.toString();
				Gson g = new Gson();
				soLineItemListObj = g.fromJson(outputString, SalesOrderLineItems.class);
			} else {
				System.out.println("GET NOT WORKED");
			}
			return soLineItemListObj;
		}
		public ReturnReasonListObject getReturnReason() throws IOException {
			String query = "http://xxenv-test-get-return-reason.us-e2.cloudhub.io/ReturnReason";
			System.out.println(query);
			URL urlForGetRequest = new URL(query);
			String readLine = null;
			String outputString = "";
			ReturnReasonListObject returnsReasonListObj = null;
			HttpURLConnection conection = (HttpURLConnection) urlForGetRequest
					.openConnection();
			conection.setRequestMethod("GET");
			int responseCode = conection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				BufferedReader in = new BufferedReader(new InputStreamReader(
						conection.getInputStream()));
				StringBuffer response = new StringBuffer();

				while ((readLine = in.readLine()) != null) {
					response.append(readLine);
				}
				in.close();
				outputString = response.toString();
				Gson g = new Gson();
				returnsReasonListObj = g.fromJson(outputString, ReturnReasonListObject.class);
			} else {
				System.out.println("GET NOT WORKED");
			}
			return returnsReasonListObj;
		}
		 public RMAResponseObject saveReturnsOrderMule(RMAOverallObject rmaOverallObject) throws IOException {
				String query = "http://create-rma-order1.us-e2.cloudhub.io/api/RMAOrder?p_order_type="
						+ rmaOverallObject.getReturnType() + "&p_ref_so=" + rmaOverallObject.getRefSO()+"&p_operating_unit_id="
						+ rmaOverallObject.getOrgID();

				System.out.println(query);
				URL obj = new URL(query);
				String readLine = null;
				String outputString = "";
				HttpURLConnection connection = (HttpURLConnection) obj
						.openConnection();
				connection.setRequestMethod("POST");
				connection.setRequestProperty("Content-Type", "application/json");
				connection.setDoOutput(true);
				OutputStream os = connection.getOutputStream();
				String postParams ="";
				Gson gson=new Gson();
				postParams= gson.toJson(rmaOverallObject);
				os.write(postParams.getBytes());
				os.flush();
				os.close();
				int responseCode = connection.getResponseCode();
				System.out.println("POST Response Code :  " + responseCode);
		        System.out.println("POST Response Message : " + connection.getResponseMessage());
		        RMAResponseObject rmaResponse=new RMAResponseObject();
				if (responseCode == HttpURLConnection.HTTP_OK) {
					BufferedReader in = new BufferedReader(new InputStreamReader(
							connection.getInputStream()));
					StringBuffer response = new StringBuffer();

					while ((readLine = in.readLine()) != null) {
						response.append(readLine);
					}
				in.close();
				outputString = response.toString();
				System.out.println("placeorder result"+outputString);
				rmaResponse=gson.fromJson(outputString,RMAResponseObject.class);
				} else {
					System.out.println("POST NOT WORKED");
				}
				return rmaResponse;
		}
}
