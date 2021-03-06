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
import com.brakepartsinc.project.techportal.dto.DropShipToListObject;
import com.brakepartsinc.project.techportal.dto.DropShippingObject;
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
import com.brakepartsinc.project.techportal.dto.PartNumberObject;
import com.brakepartsinc.project.techportal.dto.PaymentObject;
import com.brakepartsinc.project.techportal.dto.PlaceOrderObject;
import com.brakepartsinc.project.techportal.dto.PlaceOrderResponseObject;
import com.brakepartsinc.project.techportal.dto.PromoBusinessDetailsObject;
import com.brakepartsinc.project.techportal.dto.RMAObject;
import com.brakepartsinc.project.techportal.dto.RMAOverallObject;
import com.brakepartsinc.project.techportal.dto.RMAResponseObject;
import com.brakepartsinc.project.techportal.dto.RegisterOrganizationObject;
import com.brakepartsinc.project.techportal.dto.RegisterUserObject;
import com.brakepartsinc.project.techportal.dto.ReturnReasonListObject;
import com.brakepartsinc.project.techportal.dto.RewardEventsObject;
import com.brakepartsinc.project.techportal.dto.RewardProgramsObject;
import com.brakepartsinc.project.techportal.dto.RewardSummaryObject;
import com.brakepartsinc.project.techportal.dto.RewardTransactionObject;
import com.brakepartsinc.project.techportal.dto.RoleObject;
import com.brakepartsinc.project.techportal.dto.SalesOrderLineItems;
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
		@GET
		@Path("/GetPartNumber")
		public String GetPartNumber(@QueryParam("org_id") String orgID,
				@QueryParam("shipTo_number") String shipTo_number,
				@QueryParam("partNumber") String partNumber
				) {
			JsonObject jsonResult = new JsonObject();
			int status = -1;
			String errorMessage = "";
			PartNumberObject partNOObj=null;
			String partNOJson = null;
			try {
				OracleDataHandler dataHandler = new OracleDataHandler();
				partNOObj=dataHandler.getPartNumber(orgID, shipTo_number, partNumber);
				Gson gson = new Gson();
				if (partNOObj != null) {
					status = 0;
					
					partNOJson = gson.toJson(partNOObj);
				} else {
					status = 1;
					errorMessage = "PartNO List not found";
				}
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", errorMessage);
				jsonResult.addProperty("object", partNOJson);
				System.out.println("Part Number List - Result to be returned:"
						+ jsonResult);

			} catch (Exception e) {
				status = 6;
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", e.getMessage());
				jsonResult.add("object", null);
				System.out
						.println("Part Number List - ERROR Result to be returned:"
								+ jsonResult);
			}
			return jsonResult.toString();
	}
		
		
		@GET
		@Path("/GetPaymentInvoice")
		public String GetPaymentDetails(@QueryParam("org_id") String orgID,
				@QueryParam("sales_order_number") String salesOrderNumber) {
			JsonObject jsonResult = new JsonObject();
			String paymentJson = null;
//			JsonArray shipToArrayJson = null;
			int status = -1;
			String errorMessage = "";
			PaymentObject paymentObject=null;
			try {
				OracleDataHandler dataHandler = new OracleDataHandler();
				paymentObject = dataHandler.getMulePaymentMatching(orgID, salesOrderNumber);
					status = 0;
					if (paymentObject != null) {
						status = 0;
						Gson gson = new Gson();
						paymentJson = gson.toJson(paymentObject);
					} else {
						status = 1;
						errorMessage = "Invoice Details not found";
					}
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", errorMessage);
				jsonResult.addProperty("object", paymentJson);
				System.out.println("getPaymentDetails - Result to be returned:"
						+ jsonResult);

			} catch (Exception e) {
				status = 6;
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", e.getMessage());
				jsonResult.add("object", null);
				System.out
						.println("getPaymentDetails - ERROR Result to be returned:"
								+ jsonResult);
			}
			return jsonResult.toString();
	}
		@GET
		@Path("/GetReturnOrderHistoryDetails")
		// @Consumes(MediaType.APPLICATION_JSON)
		public String getReturnOrderHistory(@QueryParam("orgId") String orgId,
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
			try {
				OracleDataHandler dataHandler = new OracleDataHandler();
				if(fromDate!=null&&toDate!=null){
					orderHistory = dataHandler
							.getMuleAllReturnOrderHistory(orgId, shipTo, billTo, fromDate,
									toDate, searchType);
				}else if(docNumber!=null){
					orderHistory = dataHandler
							.getMuleReturnPoOrderHistory(orgId, shipTo, billTo, searchType,docNumber);
				}
				
				status = 0;
				if (orderHistory != null) {
					status = 0;
					Gson gson = new Gson();
					orderHistoryListJson = gson.toJson(orderHistory);
				} else {
					status = 1;
					errorMessage = "Returns History List not found";
				}

				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", errorMessage);
				jsonResult.addProperty("object", orderHistoryListJson);
				System.out.println("getReturnsHistory - Result to be returned:"
						+ jsonResult);

			} catch (Exception e) {
				e.printStackTrace();
				status = 6;
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", e.getMessage());
				jsonResult.add("object", null);
				System.out.println("getReturnsHistory - ERROR Result to be returned:"
						+ jsonResult);
			}
			return jsonResult.toString();
		}
		@GET
		@Path("/GetSalesNumber")
		public String GetSalesNumber(@QueryParam("org_id") String orgID,
				@QueryParam("billTo_number") String billTo_number,
				@QueryParam("shipTo_number") String shipTo_number,
				@QueryParam("salesOrderNO") String salesOrderNO
				) {
			JsonObject jsonResult = new JsonObject();
			int status = -1;
			String errorMessage = "";
			PartNumberObject partNOObj=null;
			String partNOJson = null;
			try {
				OracleDataHandler dataHandler = new OracleDataHandler();
				System.out.println(orgID+" " +billTo_number+" " +shipTo_number+" " + salesOrderNO);
				partNOObj=dataHandler.getSONumber(orgID, billTo_number, shipTo_number, salesOrderNO);
				Gson gson = new Gson();
				if (partNOObj != null) {
					status = 0;
					
					partNOJson = gson.toJson(partNOObj);
				} else {
					status = 1;
					errorMessage = "PartNO List not found";
				}
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", errorMessage);
				jsonResult.addProperty("object", partNOJson);
				System.out.println("Part Number List - Result to be returned:"
						+ jsonResult);

			} catch (Exception e) {
				status = 6;
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", e.getMessage());
				jsonResult.add("object", null);
				System.out
						.println("Part Number List - ERROR Result to be returned:"
								+ jsonResult);
			}
			return jsonResult.toString();
	}
		@GET
		@Path("/GetPurchaseOrderNumber")
		public String GetPurchaseOrderNumber(@QueryParam("org_id") String orgID,
				@QueryParam("billTo_number") String billTo_number,
				@QueryParam("shipTo_number") String shipTo_number,
				@QueryParam("purchaseOrderNO") String purchaseOrderNO
				) {
			JsonObject jsonResult = new JsonObject();
			int status = -1;
			String errorMessage = "";
			PartNumberObject partNOObj=null;
			String partNOJson = null;
			try {
				OracleDataHandler dataHandler = new OracleDataHandler();
				System.out.println(orgID+" " +billTo_number+" " +shipTo_number+" " + purchaseOrderNO);
				partNOObj=dataHandler.getPONumber(orgID, billTo_number, shipTo_number, purchaseOrderNO);
				Gson gson = new Gson();
				if (partNOObj != null) {
					status = 0;
					
					partNOJson = gson.toJson(partNOObj);
				} else {
					status = 1;
					errorMessage = "Purchase number List not found";
				}
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", errorMessage);
				jsonResult.addProperty("object", partNOJson);
				System.out.println("Part Number List - Result to be returned:"
						+ jsonResult);

			} catch (Exception e) {
				status = 6;
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", e.getMessage());
				jsonResult.add("object", null);
				System.out
						.println("Part Number List - ERROR Result to be returned:"
								+ jsonResult);
			}
			return jsonResult.toString();
	}
	
		@GET
		@Path("/validateReturnQty")
		public String validateReturnQty(@QueryParam("org_id") String orgID,
				@QueryParam("so_number") String so_number, @QueryParam("line_num") String line_num, 
				@QueryParam("part_num") String part_num, @QueryParam("req_qty") String req_qty) {
			JsonObject jsonResult = new JsonObject();
			String invoiceJson = null;
//			JsonArray shipToArrayJson = null;
			int status = -1;
			String errorMessage = "";
			InvoiceOrderCheckObject checkInvoiceStatus=null;
			try {
				OracleDataHandler dataHandler = new OracleDataHandler();
				checkInvoiceStatus=dataHandler.validateReturnQty(orgID, so_number, line_num, part_num, req_qty);
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
		@Path("/getSoLineItems")
		public String getSoLineItems(@QueryParam("org_id") String orgID,
				@QueryParam("soNumber") String soNumber) {
			JsonObject jsonResult = new JsonObject();
			int status = -1;
			String errorMessage = "";
			SalesOrderLineItems soLineItemObject=null;
			String soLineItemObjJson = null;
			try {
				OracleDataHandler dataHandler = new OracleDataHandler();
				soLineItemObject=dataHandler.getSoLineItems(orgID, soNumber);
				Gson gson = new Gson();
				if (soLineItemObject != null) {
					status = 0;
					
					soLineItemObjJson = gson.toJson(soLineItemObject);
				} else {
					status = 1;
					errorMessage = "Sales order Line Item Object not found";
				}
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", errorMessage);
				jsonResult.addProperty("object", soLineItemObjJson);
				System.out.println("Sales order Line Item Object - Result to be returned:"
						+ jsonResult);

			} catch (Exception e) {
				status = 6;
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", e.getMessage());
				jsonResult.add("object", null);
				System.out
						.println("Sales order Line Item Object - ERROR Result to be returned:"
								+ jsonResult);
			}
			return jsonResult.toString();
	}
		@GET
		@Path("/getReturnReason")
		public String getReturnReason() {
			JsonObject jsonResult = new JsonObject();
			int status = -1;
			String errorMessage = "";
			ReturnReasonListObject returnReasonListObj=null;
			String returnReturnListObjJson = null;
			try {
				OracleDataHandler dataHandler = new OracleDataHandler();
				returnReasonListObj=dataHandler.getReturnReason();
				Gson gson = new Gson();
				if (returnReasonListObj != null) {
					status = 0;
					
					returnReturnListObjJson = gson.toJson(returnReasonListObj);
				} else {
					status = 1;
					errorMessage = "Return Reason List Object not found";
				}
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", errorMessage);
				jsonResult.addProperty("object", returnReturnListObjJson);
				System.out.println("Return Reason List Object - Result to be returned:"
						+ jsonResult);

			} catch (Exception e) {
				status = 6;
				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", e.getMessage());
				jsonResult.add("object", null);
				System.out
						.println("Return Reason List Object - ERROR Result to be returned:"
								+ jsonResult);
			}
			return jsonResult.toString();
	}
		@POST
		@Path("/SaveReturnsMule")
		public String saveReturnsMule(String rmaOverallObject){
			JsonObject jsonResult = new JsonObject();
			String returnsResponseJson = null;
			int status = -1;
			String errorMessage = "";
			System.out.println("JSON:" + rmaOverallObject);
			Gson gson = new Gson();
			RMAOverallObject rmaSaveObject = gson.fromJson(rmaOverallObject,RMAOverallObject.class); 
			try {
				OracleDataHandler dataHandler = new OracleDataHandler();
//				System.out.println("webservice org_Id :" + orgID);
				RMAResponseObject response = dataHandler.saveReturnsOrderMule(rmaSaveObject);
				if (response != null) {
					status = 0;
					
					returnsResponseJson = gson.toJson(response);
				} else {
					status = 1;
					errorMessage = " not found";
				}

				jsonResult.addProperty("status", status);
				jsonResult.addProperty("errorMessage", errorMessage);
				jsonResult.addProperty("object", returnsResponseJson);
				System.out.println("orderShipToArrayJson - Result to be returned:"
						+ jsonResult);

			} catch (Exception e) {
				e.printStackTrace();
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
		@Path("/ValidateSONumber")
		public String ValidateSONumber(@QueryParam("org_id") String orgID,
				@QueryParam("so_number") String so_number, @QueryParam("billTo_number") String billTo_number,
				@QueryParam("shipTo_number") String shipTo_number) {
			JsonObject jsonResult = new JsonObject();
			String invoiceJson = null;
//			JsonArray shipToArrayJson = null;
			int status = -1;
			String errorMessage = "";
			InvoiceOrderCheckObject checkInvoiceStatus=null;
			try {
				OracleDataHandler dataHandler = new OracleDataHandler();
				checkInvoiceStatus=dataHandler.validateSoNumber(orgID, so_number, billTo_number, shipTo_number);
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
		
				@GET
				@Path("/getDropShipToAddress")
				
				public String getDropShipToAddress(@QueryParam("org_id") String orgID,
						@QueryParam("custAccountNo") String custAccountNo) {
					JsonObject jsonResult = new JsonObject();
					String dropArrayJson = null;
					int status = -1;
					String errorMessage = "";
					try {
						OracleDataHandler dataHandler = new OracleDataHandler();
						System.out.println("webservice org_Id :" + orgID + "custAccountNo:"
								+ custAccountNo);
						DropShipToListObject dropShipTo = dataHandler.getDropShipToAddress(orgID, custAccountNo);
						
						if (dropShipTo != null) {
							status = 0;
							Gson gson = new Gson();
							dropArrayJson = gson.toJson(dropShipTo);
						} else {
							status = 1;
							errorMessage = "Order Shipping List not found";
						}

						jsonResult.addProperty("status", status);
						jsonResult.addProperty("errorMessage", errorMessage);
						jsonResult.addProperty("object", dropArrayJson);
						System.out.println("dropArrayJson - Result to be returned:"
								+ jsonResult);

					} catch (Exception e) {
						status = 6;
						jsonResult.addProperty("status", status);
						jsonResult.addProperty("errorMessage", e.getMessage());
						jsonResult.add("object", null);
						System.out
								.println("getDropShipToAddress - ERROR Result to be returned:"
										+ jsonResult);
					}
					return jsonResult.toString();
				}
				
				@GET
				@Path("/getCustAcct")
				
				public String getCustAcctSite(@QueryParam("account_number") String accountNumber,
						@QueryParam("org_id") String orgID,@QueryParam("addr1") String addr1,
						@QueryParam("addr2") String addr2,@QueryParam("addr3") String addr3,
						@QueryParam("addr4") String addr4,@QueryParam("city") String city,
						@QueryParam("postalcode") String postalcode,@QueryParam("state") String state,
						@QueryParam("province") String province,@QueryParam("county") String county,
						@QueryParam("country") String country) {
					JsonObject jsonResult = new JsonObject();
					String dropArrayJson = null;
					int status = -1;
					String errorMessage = "";
					try {
						OracleDataHandler dataHandler = new OracleDataHandler();
						System.out.println("webservice org_Id :" + orgID + "accountNumber:"
								+ accountNumber);
						DropShippingObject dropTo = dataHandler.getCustAcctSite(accountNumber, orgID, addr1, addr2, addr3, addr4, city, postalcode, state, province, county, country);
						
						if (dropTo != null) {
							status = 0;
							Gson gson = new Gson();
							dropArrayJson = gson.toJson(dropTo);
						} else {
							status = 1;
							errorMessage = "Customer Account not found";
						}

						jsonResult.addProperty("status", status);
						jsonResult.addProperty("errorMessage", errorMessage);
						jsonResult.addProperty("object", dropArrayJson);
						System.out.println("getCustAcct - Result to be returned:"
								+ jsonResult);

					} catch (Exception e) {
						status = 6;
						jsonResult.addProperty("status", status);
						jsonResult.addProperty("errorMessage", e.getMessage());
						jsonResult.add("object", null);
						System.out
								.println("getCustAcct - ERROR Result to be returned:"
										+ jsonResult);
					}
					return jsonResult.toString();
				}
}