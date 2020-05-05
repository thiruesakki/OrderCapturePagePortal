package com.brakepartsinc.project.techportal.webService;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.apache.commons.codec.binary.Base64;

import com.brakepartsinc.project.techportal.dao.DataHandler;
import com.brakepartsinc.project.techportal.dao.OracleDataHandler;
import com.brakepartsinc.project.techportal.dto.CAPAddEditUserObject;
import com.brakepartsinc.project.techportal.dto.CAPUserObject;
import com.brakepartsinc.project.techportal.dto.CategoryObject;
import com.brakepartsinc.project.techportal.dto.CheckStockObject;
import com.brakepartsinc.project.techportal.dto.ChevyTruckPromoDetailsObject;
import com.brakepartsinc.project.techportal.dto.CountryObject;
import com.brakepartsinc.project.techportal.dto.CustomerObject;
import com.brakepartsinc.project.techportal.dto.DashboardObject;
import com.brakepartsinc.project.techportal.dto.DistributorDetailObject;
import com.brakepartsinc.project.techportal.dto.InvoiceDetailObject;
import com.brakepartsinc.project.techportal.dto.InvoiceObject;
import com.brakepartsinc.project.techportal.dto.InvoiceOrderCheckObject;
import com.brakepartsinc.project.techportal.dto.JobTitleObject;
import com.brakepartsinc.project.techportal.dto.OrderHistoryListObject;
import com.brakepartsinc.project.techportal.dto.OrderHistoryObject;
import com.brakepartsinc.project.techportal.dto.OrderShipToObject;
import com.brakepartsinc.project.techportal.dto.OrderShippingObject;
import com.brakepartsinc.project.techportal.dto.OrganizationObject;
import com.brakepartsinc.project.techportal.dto.PRIPromoDetailsObject;
import com.brakepartsinc.project.techportal.dto.PlaceOrderObject;
import com.brakepartsinc.project.techportal.dto.PlaceOrderResponseObject;
import com.brakepartsinc.project.techportal.dto.PromoBusinessDetailsObject;
import com.brakepartsinc.project.techportal.dto.RegisterOrganizationObject;
import com.brakepartsinc.project.techportal.dto.RegisterUserObject;
import com.brakepartsinc.project.techportal.dto.RewardEventsObject;
import com.brakepartsinc.project.techportal.dto.RewardProgramsObject;
import com.brakepartsinc.project.techportal.dto.RewardSummaryObject;
import com.brakepartsinc.project.techportal.dto.RewardTransactionObject;
import com.brakepartsinc.project.techportal.dto.RoleObject;
import com.brakepartsinc.project.techportal.dto.ShipToAddressObject;
import com.brakepartsinc.project.techportal.dto.ShipToObject;
import com.brakepartsinc.project.techportal.dto.ShippingMethodObject;
import com.brakepartsinc.project.techportal.dto.SingleUserOrganization;
import com.brakepartsinc.project.techportal.dto.StateObject;
import com.brakepartsinc.project.techportal.dto.StockProductObject;
import com.brakepartsinc.project.techportal.dto.TCUserProfileObject;
import com.brakepartsinc.project.techportal.dto.TipsAndTricksObject;
import com.brakepartsinc.project.techportal.dto.UserFavoritePlaceObject;
import com.brakepartsinc.project.techportal.dto.UserFavoritesObject;
import com.brakepartsinc.project.techportal.dto.UserObject;
import com.brakepartsinc.project.techportal.dto.VideoDetailsObject;
import com.brakepartsinc.project.techportal.util.StatusObject;
import com.brakepartsinc.project.techportal.util.TPServerConstants;
import com.brakepartsinc.project.techportal.util.TPUtility;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

@Path("/OracleWebService")
public class OracleTPService {

	@POST
	@Path("/GetShipToAddress")
	// @Consumes(MediaType.APPLICATION_JSON)
	public String getShipToAddress(@QueryParam("org_id") String orgID,
			@QueryParam("ship_to_location") String shipToLocation) {
		JsonObject jsonResult = new JsonObject();
		List<ShipToAddressObject> shipToAddressList = null;
		String shipToJson = null;
//		JsonArray shipToArrayJson = null;
		int status = -1;
		String errorMessage = "";
		ShipToObject address=null;
		try {
			OracleDataHandler dataHandler = new OracleDataHandler();
			System.out.println("webservice org_Id :" + orgID + "ship_to:"
					+ shipToLocation);
			address = dataHandler.getShipToAddressMule(orgID,
					shipToLocation);
			// System.out.println("address details: "+address.toString());
			// shipToAddressList =
			// dataHandler.getShipToAddress(orgID,shipToLocation);
//			shipToAddressList = address.getX_ship_to_address();
//			Gson gson = new Gson();
//			status = 0;
//			JsonElement element = gson.toJsonTree(shipToAddressList,
//					new TypeToken<List<ShipToAddressObject>>() {
//					}.getType());
//
//			if (!element.isJsonArray()) {
//				System.out.println("Failed to create JSON");
//			}
//			shipToArrayJson = element.getAsJsonArray();
			status = 0;
			if (address != null) {
				status = 0;
				Gson gson = new Gson();
				shipToJson = gson.toJson(address);
			} else {
				status = 1;
				errorMessage = "Order History List not found";
			}
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", shipToJson);
			System.out.println("getShipToAddress - Result to be returned:"
					+ jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out
					.println("getShipToAddress - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetOrderHistoryDetails")
	// @Consumes(MediaType.APPLICATION_JSON)
	public String getOrderHistory(@QueryParam("orgId") String orgId,
			@QueryParam("shipTo") String shipTo,
			@QueryParam("billTo") String billTo,
			@QueryParam("fromDate") String fromDate,
			@QueryParam("toDate") String toDate,
			@QueryParam("searchType") String searchType,
			@QueryParam("docNumber") String docNumber) {
		JsonObject jsonResult = new JsonObject();
		String orderHistoryListJson = null;
		OrderHistoryListObject orderHistory=null;
		int status = -1;
		String errorMessage = "";
//			try {
////				String sDate1="31/12/1998";  
////			    Date date1=new SimpleDateFormat("dd/MM/yyyy").parse(sDate1); 
////				fromOrderDate=Date.valueOf(fromDate);
////				toOrderDate=Date.valueOf(toDate);
//				fromOrderDate=(Date) new SimpleDateFormat("dd/MM/yyyy").parse(fromDate); 
//				toOrderDate=(Date) new SimpleDateFormat("dd/MM/yyyy").parse(toDate);
//					} catch (Exception e1) {
//				
//				e1.printStackTrace();
//			}
		try {
			OracleDataHandler dataHandler = new OracleDataHandler();
			if(fromDate!=null&&toDate!=null){
				orderHistory = dataHandler
						.getMuleAllOrderHistory(orgId, shipTo, billTo, fromDate,
								toDate, searchType);
			}else if(docNumber!=null){
				orderHistory = dataHandler
						.getMulePoOrderHistory(orgId, shipTo, billTo, searchType,docNumber);
			}
			
			status = 0;
			if (orderHistory != null) {
				status = 0;
				Gson gson = new Gson();
				orderHistoryListJson = gson.toJson(orderHistory);
			} else {
				status = 1;
				errorMessage = "Order History List not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", orderHistoryListJson);
			System.out.println("getOrderHistory - Result to be returned:"
					+ jsonResult);

		} catch (Exception e) {
			e.printStackTrace();
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out.println("getOrderHistory - ERROR Result to be returned:"
					+ jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetOrderDetails")
	
	public String getOrderDetails(@QueryParam("org_id") String orgID,
			@QueryParam("sales_order_num") String sales_Order_Num) {
		JsonObject jsonResult = new JsonObject();
		String orderShipToArrayJson = null;
		int status = -1;
		String errorMessage = "";
		try {
			OracleDataHandler dataHandler = new OracleDataHandler();
			System.out.println("webservice org_Id :" + orgID + "sales_order_num:"
					+ sales_Order_Num);
			OrderShipToObject orderShipTo = dataHandler.getMuleOrderDetails(orgID, sales_Order_Num);
			
			if (orderShipTo != null) {
				status = 0;
				Gson gson = new Gson();
				orderShipToArrayJson = gson.toJson(orderShipTo);
			} else {
				status = 1;
				errorMessage = "Order Details List not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", orderShipToArrayJson);
			System.out.println("orderShipToArrayJson - Result to be returned:"
					+ jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out
					.println("getOrderDetails - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
	}
	
	
	@GET
	@Path("/GetOrderShippingDetails")
	
	public String getOrderShippingDetails(@QueryParam("org_id") String orgID,
			@QueryParam("order_num") String order_Num) {
		JsonObject jsonResult = new JsonObject();
		String orderShippingArrayJson = null;
		int status = -1;
		String errorMessage = "";
		try {
			OracleDataHandler dataHandler = new OracleDataHandler();
			System.out.println("webservice org_Id :" + orgID + "sales_order_num:"
					+ order_Num);
			OrderShippingObject orderShipping = dataHandler.getMuleOrderShippingDetails(orgID, order_Num);
			
			if (orderShipping != null) {
				status = 0;
				Gson gson = new Gson();
				orderShippingArrayJson = gson.toJson(orderShipping);
			} else {
				status = 1;
				errorMessage = "Order Shipping List not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", orderShippingArrayJson);
			System.out.println("orderShippingArrayJson - Result to be returned:"
					+ jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out
					.println("getOrderShippingDetails - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetCheckStock")
	public String getMuleCheckStock(@QueryParam("org_id") String orgID,
			@QueryParam("ship_to") String ship_To ,@QueryParam("product_no") String product_No) {
		JsonObject jsonResult = new JsonObject();
		String checkStockArrayJson = null;
		int status = -1;
		String errorMessage = "";
		try {
			OracleDataHandler dataHandler = new OracleDataHandler();
			System.out.println("webservice org_Id :" + orgID + "ship_to:" + ship_To +"product_No:"
					+ product_No);
			CheckStockObject checkStock = dataHandler.getMuleCheckStock(orgID, ship_To,product_No);
			
			if (checkStock != null) {
				status = 0;
				Gson gson = new Gson();
				checkStockArrayJson = gson.toJson(checkStock);
			} else {
				status = 1;
				errorMessage = "Check Stock not found";
			}

			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", checkStockArrayJson);
			System.out.println("checkStockArrayJson - Result to be returned:"
					+ jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out
					.println("checkStockArrayJson - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
	}
	@GET
	@Path("/GetOrgID")
	public String getOrgID(@QueryParam("ship_to") String ship_To) {
		JsonObject jsonResult = new JsonObject();
		int status = -1;
		String errorMessage = "";
		int orgID=0;
		try {
			OracleDataHandler dataHandler = new OracleDataHandler();
			orgID = dataHandler.getOrgID(ship_To);
			
			if(orgID>0){
				status=0;
			}else{
				status=1;
			}
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", orgID);
			System.out.println("Get orgID - Result to be returned:"
					+ jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out
					.println("Get orgID - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
	}
	
	@GET
	@Path("/GetInvoiceDetails")
	public String GetInvoiceDetails(@QueryParam("org_id") String orgID,
			@QueryParam("purchase_order_number") String purchaseOrderNumber) {
		JsonObject jsonResult = new JsonObject();
		String invoiceJson = null;
//		JsonArray shipToArrayJson = null;
		int status = -1;
		String errorMessage = "";
		InvoiceObject invoiceObject=null;
		try {
			OracleDataHandler dataHandler = new OracleDataHandler();
				invoiceObject = dataHandler.getMuleInvoiceDetails(orgID,
						purchaseOrderNumber);
				status = 0;
				if (invoiceObject != null) {
					status = 0;
					Gson gson = new Gson();
					invoiceJson = gson.toJson(invoiceObject);
				} else {
					status = 1;
					errorMessage = "Invoice Details not found";
				}
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", invoiceJson);
			System.out.println("getInvoiceDetails - Result to be returned:"
					+ jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out
					.println("getInvoiceDetails - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
}
	@GET
	@Path("/GetCheckInvoiceDetails")
	public String GetCheckInvoiceDetails(@QueryParam("org_id") String orgID,
			@QueryParam("purchase_order_number") String purchaseOrderNumber) {
		JsonObject jsonResult = new JsonObject();
		String invoiceJson = null;
//		JsonArray shipToArrayJson = null;
		int status = -1;
		String errorMessage = "";
		InvoiceOrderCheckObject checkInvoiceStatus=null;
		try {
			OracleDataHandler dataHandler = new OracleDataHandler();
			checkInvoiceStatus=dataHandler.getMuleCheckInvoiceDetails(orgID, purchaseOrderNumber);
				status = 0;
				if (checkInvoiceStatus != null) {
					status = 0;
					Gson gson = new Gson();
					invoiceJson = gson.toJson(checkInvoiceStatus);
				} else {
					status = 1;
					errorMessage = "Invoice Details check not found";
				}
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", invoiceJson);
			System.out.println("getCheckInvoiceDetails - Result to be returned:"
					+ jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out
					.println("getCheckInvoiceDetails - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
}
	@GET
	@Path("/ValidatePONumber")
	public String ValidatePONumber(@QueryParam("org_id") String orgID,
			@QueryParam("po_number") String po_number, @QueryParam("billTo_number") String billTo_number,
			@QueryParam("shipTo_number") String shipTo_number) {
		JsonObject jsonResult = new JsonObject();
		String invoiceJson = null;
//		JsonArray shipToArrayJson = null;
		int status = -1;
		String errorMessage = "";
		InvoiceOrderCheckObject checkInvoiceStatus=null;
		try {
			OracleDataHandler dataHandler = new OracleDataHandler();
			checkInvoiceStatus=dataHandler.validatePoNumber(orgID, po_number, billTo_number, shipTo_number);
				status = 0;
				if (checkInvoiceStatus != null) {
					status = 0;
					Gson gson = new Gson();
					invoiceJson = gson.toJson(checkInvoiceStatus);
				} else {
					status = 1;
					errorMessage = "PO number not found";
				}
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", errorMessage);
			jsonResult.addProperty("object", invoiceJson);
			System.out.println("ValidatePONumber - Result to be returned:"
					+ jsonResult);

		} catch (Exception e) {
			status = 6;
			jsonResult.addProperty("status", status);
			jsonResult.addProperty("errorMessage", e.getMessage());
			jsonResult.add("object", null);
			System.out
					.println("ValidatePONumber - ERROR Result to be returned:"
							+ jsonResult);
		}
		return jsonResult.toString();
}
	

		@POST
		@Path("/PlaceOrderMule")
		public String savePlaceOrderMule(String placeOrderObj){
			JsonObject jsonResult = new JsonObject();
			String placeOrderArrayJson = null;
			int status = -1;
			String errorMessage = "";
			System.out.println("JSON:" + placeOrderObj);
			Gson gson = new Gson();
			PlaceOrderObject placeObj = gson.fromJson(placeOrderObj,PlaceOrderObject.class); 
			try {
				OracleDataHandler dataHandler = new OracleDataHandler();
//				System.out.println("webservice org_Id :" + orgID);
				PlaceOrderResponseObject placeOrder = dataHandler.savePlaceOrderMule(placeObj);
				
				if (placeOrder != null) {
					status = 0;
					
					placeOrderArrayJson = gson.toJson(placeOrder);
				} else {
					status = 1;
					errorMessage = "Order Details List not found";
				}

				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", errorMessage);
				jsonResult.addProperty("object", placeOrderArrayJson);
				System.out.println("orderShipToArrayJson - Result to be returned:"
						+ jsonResult);

			} catch (Exception e) {
				status = 6;
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", e.getMessage());
				jsonResult.add("object", null);
				System.out
						.println("getOrderDetails - ERROR Result to be returned:"
								+ jsonResult);
			}
			return jsonResult.toString();
		}
	
	
}