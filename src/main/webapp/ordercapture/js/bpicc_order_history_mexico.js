 //http://uswodapp013.brakepartsinc.com:8010/webservices/SOAProvider/plsql/xxbpi_customer_online/
var orderShipTO="";
var orderBillTO="";
var userID="";
var orgID="";
var orderDetailsObject;
var orderHistoryObject;
  jQuery(function($) {'use strict',
  
	   $('#search_order_history').on('click', function(e){
	  e.preventDefault();
	  $('#invoice-details').hide();

//	  if(getSearchParams('s')!=null && getSearchParams('s')!=''){	 
//			 var requestID=Decoding(decodeURIComponent(getSearchParams('s')));
//			 orderShipTO=requestID;
//			 
////			 getDonorDetails(requtid);
//		 }
//	  
//	  if(getSearchParams('b')!=null && getSearchParams('b')!=''){	 
//			 var requestID=Decoding(decodeURIComponent(getSearchParams('b')));
//			 orderBillTO=requestID;
//			 console.log(orderBillTO);
////			 getDonorDetails(requtid);
//		 }
	  orderShipTO=getCookie("selected_ship_to");
	  orderBillTO=getCookie("selected_bill_to");
	  userID=getCookie("userID");
	  orgID=getCookie("selected_org_id");
		OrderHistory.ApiDisplayOrderHistoryData();
	
	});
	
	 $("#div_order_history").show();
	 $("#div_shipping_detail").hide();
	 $("#div_invoice_detail").hide();
	 $("#div_order_detail").hide();
	 $("#po_no").val();
	 $("#sales_order_no").val();
	 $("#orderType").val("allorders");
	 $(".errorInfo").hide();
	 $("#from_date").val("");
	 $("#to_date").val("");
	    $('#shipping-details').on('click', function(e){
	 
		OrderHistory.CallShippingDetailsFromItemDetailedPage();
		});
	    
	    $('#invoice-details').on('click', function(e){             
		   	 
			OrderHistory.CallInvoiceDetailsFromItemDetailedPage();
			});
	    
		$('#from_date').keypress(function (e) {
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
			  e.preventDefault();
			OrderHistory.ApiDisplayOrderHistoryData();
		  }
		}); 
		$('#to_date').keypress(function (e) {
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
			  e.preventDefault();
			OrderHistory.ApiDisplayOrderHistoryData();
		  }
		}); 
	 
		$('#po_no').keypress(function (e) {
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
			  e.preventDefault();
			OrderHistory.ApiDisplayOrderHistoryData();
		  }
		}); 
		$('#sales_order_no').keypress(function (e) {
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
			  e.preventDefault();
			OrderHistory.ApiDisplayOrderHistoryData();
		  }
		}); 
	 $("#po_no").val("");
	 $("#sales_order_no").val("");
			 
}); 
 
OrderHistory=
{
	CallShippingDetailsFromItemDetailedPage:function()
	{
			var order_no=$.trim($("#dtl_sales_order_no").html().replace("#",""));
			OrderHistory.CallShippingDetailAPI(order_no);
	},

	CallInvoiceDetailsFromItemDetailedPage:function()
	{
			var order_no=$.trim($("#dtl_sales_order_no").html().replace("#",""));
			OrderHistory.CallInvoiceDetailAPI(order_no);
	},


	
	LoadProperDatesAndCallAPI:function()
	{
		
		
		var today = new Date();
		var cur_mm = parseInt(today.getMonth())+1;;
		cur_date=("0"+today.getDate()).substr(-2)+"/"+("0"+cur_mm).substr(-2)+"/"+today.getFullYear();
		
	
		
		today.setDate(today.getDate()-90); 
		var month = new Array();
	  

		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		 

		if(dd<10) {
			dd='0'+dd
		} 

		if(mm<10) {
			mm='0'+mm
		} 

		today = dd+'/'+mm+'/'+yyyy;
			$("#to_date").val(cur_date);
		$("#from_date").val(today);
		OrderHistory.ApiDisplayOrderHistoryData();
	},
	ApiDisplayOrderHistoryData:function()
	{
	 
	  
			 // P_SHIP_TO="23612";
			 // P_SHIP_TO="20766";
			// P_BILL_TO="21023"; 
			
				P_SHIP_TO=bpi_com_obj.ship_to_location;
			P_BILL_TO=bpi_com_obj.bill_to_location;
			var orgID=getCookie("selected_org_id");
			if(!empty(getCookie("selected_ship_to_account_no")))
			{
				P_SHIP_TO=getCookie("selected_ship_to_account_no");
			}
			P_SHIP_TO=orderShipTO;
			P_BILL_TO=orderBillTO;
//			console.log("ship to "+P_SHIP_TO);
			 P_FROM_DATE="";
			P_TO_DATE="";;
			var orderType=$("#orderType").val();
		 
			  if(orderType=="allorders" || orderType=="shippedorders" || orderType=="openorders")
			  {
				 var from_date=$("#from_date").val();
				var to_date=$("#to_date").val();
				if(empty(from_date))
				{
					alert(msgAlertBpiCcOrderHistoryEnterFromDate);
					return false;
				}
				else if(empty(to_date))
				{
					alert(msgAlertBpiCcCOrderHistoryEnterToDate);
					return false;
				}
				if(!OrderHistory.ValidateDateValues('From Date',from_date,'from_date'))
				{
					return false;
				}
				if(!OrderHistory.ValidateDateValues('To Date',to_date,'to_date'))
				{
					return false;
				}
					 
					 P_FROM_DATE=getYearMonthUIValue(from_date,'P_FROM_DATE');
						P_TO_DATE=getYearMonthUIValue(to_date,'P_TO_DATE');
						var f_exp_arr=from_date.split("/");
						var f_mm=f_exp_arr[0];
						var f_dd=f_exp_arr[1];
						var f_yyyy=f_exp_arr[2]; 
						 
						var fd1 = new Date(f_yyyy, f_dd-1, f_mm );
						
						var t_exp_arr=to_date.split("/");
						var t_mm=t_exp_arr[0];
						var t_dd=t_exp_arr[1];
						var t_yyyy=t_exp_arr[2]; 
						var fd2 = new Date(t_yyyy, t_dd-1, t_mm );
						if(fd2<fd1)
						{
							alert(msgAlertBpiCcOrderHistoryToGreaterFromDate);
							return false;
						}
					 
				 
				 


			}	
			P_SEARCH_TYPE="";
		
			var P_ONLINE_ORDERS_ONLY="Y"; 
			var	P_DOCUMENT_NUM="";
			 if(orderType=="allorders")
			 {
					
					P_SEARCH_TYPE="A";
					
			 }
			 else if(orderType=="shippedorders")
			 {
					P_SEARCH_TYPE = 'S' 
			 }
			 else if(orderType=="openorders")
			 {
					P_SEARCH_TYPE = 'U' 
			 }
			 else if(orderType=="ponumbers")
			{
				var po_no=$.trim($("#po_no").val());
				if(empty(po_no))
				{
					alert(msgAlertBpiCcOrderHistoryEnterPoNumber);
					return false;
				}
				P_SEARCH_TYPE="PO";
				P_DOCUMENT_NUM=po_no;
				
			}
			else if(orderType=="salesorders")
			{
				var sales_order_no=$.trim($("#sales_order_no").val());
				if(empty(sales_order_no))
				{
					alert(msgAlertBpiCcOrderHistoryEnterSalesOrderNumber);
					return false;
				}
				P_SEARCH_TYPE="SO";
				P_DOCUMENT_NUM=sales_order_no;
			}
			 var toOrderDate = new Date(P_TO_DATE);
			 var fromOrderDate = new Date(P_FROM_DATE);
			 var fromDate=fromOrderDate.toShortFormat();
			 var toDate=toOrderDate.toShortFormat();
			 var urlParameter="orgId="+orgID+"&shipTo="+P_SHIP_TO+"&billTo="+P_BILL_TO;	
			 if(orderType=="allorders"||orderType=="shippedorders"||orderType=="openorders"){
				 urlParameter=urlParameter+"&fromDate="+fromDate+"&toDate="+toDate+"&searchType="+P_SEARCH_TYPE;
			 }else{
				 urlParameter=urlParameter+"&searchType="+P_SEARCH_TYPE+"&docNumber="+P_DOCUMENT_NUM;
			 }
				
				var url = bpi_com_obj.web_oracle_api_url+"GetOrderHistoryDetails?"+urlParameter;
				console.log("url"+url);
		 
			 xml_request_data+=' <ns2:P_SHIP_TO>'+P_SHIP_TO+'</ns2:P_SHIP_TO> ';
				xml_request_data+=' <ns2:P_BILL_TO>'+P_BILL_TO+'</ns2:P_BILL_TO> ';
				xml_request_data+=' <ns2:P_FROM_DATE>'+P_FROM_DATE+'</ns2:P_FROM_DATE> ';
				xml_request_data+=' <ns2:P_TO_DATE>'+P_TO_DATE+'</ns2:P_TO_DATE> ';
				xml_request_data+=' <ns2:P_ONLINE_ORDERS_ONLY>'+P_ONLINE_ORDERS_ONLY+'</ns2:P_ONLINE_ORDERS_ONLY> ';
				xml_request_data+=' <ns2:P_SEARCH_TYPE>'+P_SEARCH_TYPE+'</ns2:P_SEARCH_TYPE> ';
				if(!empty(P_DOCUMENT_NUM))
				xml_request_data+='<ns2:P_DOCUMENT_NUM>'+P_DOCUMENT_NUM+'</ns2:P_DOCUMENT_NUM>';
//				console.log("SHIP_TO"+P_SHIP_TO+"BILL_TO "+P_BILL_TO+"FROM DATE "+P_FROM_DATE+"TO_DATE "+P_TO_DATE+"ONLINE ORDER "+P_ONLINE_ORDERS_ONLY+"SEARCH "+P_SEARCH_TYPE+"DOC_NUMBER "+P_DOCUMENT_NUM);
		
			var  xml_request_data='';
		 
	$(".loader").show();
		 
		xml_request_data+='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">'
    xml_request_data+='<soap:Header xmlns:ns1="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxagmx_customer_online/">'
        xml_request_data+='<ns1:SOAHeader>'
            xml_request_data+='<ns1:Responsibility>BPI_WEB_SERVICE_USER</ns1:Responsibility>'
            xml_request_data+='<ns1:RespApplication>XXAG</ns1:RespApplication>'
            xml_request_data+='<ns1:SecurityGroup>STANDARD</ns1:SecurityGroup>'
            xml_request_data+='<ns1:NLSLanguage>AMERICAN</ns1:NLSLanguage>'
            xml_request_data+='<ns1:Org_Id>181</ns1:Org_Id>'
        xml_request_data+='</ns1:SOAHeader>'
    xml_request_data+='<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" soap:mustUnderstand="1"><wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header>'
    xml_request_data+='<soap:Body xmlns:ns2="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxagmx_customer_online/order_history/">';
	
	
		
		xml_request_data+=' <ns2:InputParameters>';
		 xml_request_data+=' <ns2:P_OPERATING_UNIT_ID>181</ns2:P_OPERATING_UNIT_ID> ';
		xml_request_data+=' <ns2:P_SHIP_TO>'+P_SHIP_TO+'</ns2:P_SHIP_TO> ';
		xml_request_data+=' <ns2:P_BILL_TO>'+P_BILL_TO+'</ns2:P_BILL_TO> ';
		xml_request_data+=' <ns2:P_FROM_DATE>'+P_FROM_DATE+'</ns2:P_FROM_DATE> ';
		xml_request_data+=' <ns2:P_TO_DATE>'+P_TO_DATE+'</ns2:P_TO_DATE> ';
		xml_request_data+=' <ns2:P_ONLINE_ORDERS_ONLY>'+P_ONLINE_ORDERS_ONLY+'</ns2:P_ONLINE_ORDERS_ONLY> ';
		xml_request_data+=' <ns2:P_SEARCH_TYPE>'+P_SEARCH_TYPE+'</ns2:P_SEARCH_TYPE> ';
		if(!empty(P_DOCUMENT_NUM))
		xml_request_data+='<ns2:P_DOCUMENT_NUM>'+P_DOCUMENT_NUM+'</ns2:P_DOCUMENT_NUM>';
		else
		 xml_request_data+='<ns2:P_DOCUMENT_NUM/>';
		xml_request_data+=' </ns2:InputParameters>';
		xml_request_data+='</soap:Body>';
		xml_request_data+='</soap:Envelope>';
 
		// var url = "http://uswodapp013.brakepartsinc.com:8010/webservices/SOAProvider/plsql/xxbpi_customer_online/";
//		 var url = bpi_com_obj.web_api_url;		 
//					jQuery.ajax({
//						type: "POST",
//						url: url,
//						 data: "xml_data="+xml_request_data+"&call_type=MEXICO",
//						dataType: "xml",
//						crossDomain: true,
//						processData: false,
//						// contentType: "text/xml; charset=\"utf-8\"",
//						 
//						success: function (data) {
//							  $(".loader").hide();
//							 OrderHistory.ApiProcessDisplayOrderHistoryData(data);
//						},
//						error: function (msg) {
//							 $(".loader").hide();
//							// alert("Failed: " + msg.status + ": " + msg.statusText);
//						}
//					});  
		
		
//		http://xxenv-test-order-history.us-e2.cloudhub.io/api/OrderHistory?p_operating_unit_id=204&
//			p_ship_to=Pittsburgh&p_bill_to=Pittsburgh&p_from_date=10-JAN-2008&p_to_date=10-MAR-2008&p_search_type=A&p_document_num=ADI-991
//		var url = bpi_com_obj.web_oracle_api_url+"GetOrderHistoryDetails?orgId="+orgId+"&shipTo="+shipTo+"&billTo="+billTo+"&fromDate="+fromDate+"&toDate="+toDate+"&searchType="+searchType+"&docNumber="+docNumber;
		jQuery.ajax({
			type: "GET",
			url: url,
//			data: 
	    	dataType: "json",
			crossDomain: true,
			processData: false,
			// contentType: "text/xml; charset=\"utf-8\"",
			 
			success: function (data) {
//				 console.log("Result Success:"+JSON.stringify(data));
				 
				 $(".loader").hide();
				
				 var obj = JSON.parse(data.object);
//				 console.log(obj);
				 if(obj!=null){
					 OrderHistory.ApiProcessDisplayOrderHistoryData(obj);
					 orderHistoryObject=obj;
				 }else{
					 alert('Order History is not found');
				 }
			},
			error: function (msg) {
					 
				alert("Failed: " + msg.status + ": " + msg.statusText);
			}
		});
	}  ,
	ValidateDateValues:function(date_field,val,id)
	{
		var date_format="";
		if(date_field=='From Date')
		{
			date_format=msgAlertBpiCcOrderHistoryFromDateFormat;
			
		}
		else
		{
			date_format=msgAlertBpiCcOrderHistoryToDateFormat;
		}
		var flag=true;
		if($.trim(val)!='')
		{
	 
			exp_arr=val.split("/");
			if(exp_arr.length!=3)
			{
				alert(date_format);
				$("#"+id).focus();
				return false;
			}
			var mm=exp_arr[0];
			var dd=exp_arr[1];
			var yyyy=exp_arr[2];
//			2 04 08 2 4

//			2 15 04 2 4
//			04/15/2020
			if(mm.length!=2)
			{
				alert(date_format);
				$("#"+id).focus();
				flag=false;
				return false;
			}
			else if(mm>12)
			{
				alert(date_format);
				$("#"+id).focus();
				flag=false;
				return false;
			}
			else if(dd>31)
			{
				alert(date_format);
				$("#"+id).focus();
				flag=false;
				return false;
			}
			else if(dd.length!=2)
			{
				alert(date_format);
				flag=false;
				return false;
			}
			else if(yyyy.length!=4)
			{
				alert(date_format);
				$("#"+id).focus();
				flag=false;
				return false;
			}
		}
		return flag;
	},
	ApiProcessDisplayOrderHistoryData:function(xml)
	{
	  try {
			 html="";
			 tr_id=1;
			 
//			 var X_RESPONSE_STATUS=$(xml).find('X_RESPONSE_STATUS').text();//NF
//			 var X_RESPONSE_MESSAGE=$(xml).find('X_RESPONSE_MESSAGE').text();
			 var X_RESPONSE_STATUS=xml.x_response_status;//NF
			 var X_RESPONSE_MESSAGE=xml.x_response_message;
			  $(".errorInfo").html("");
			 $(".errorInfo").hide();;
			 OrderHistory.HandleBackToOrders();
		 if(X_RESPONSE_STATUS!="S")
		 {
			 $(".errorInfo").html(' <p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span><span class="errorMessage">'+X_RESPONSE_MESSAGE+'</span></p>');
			 $(".errorInfo").show();;
			 $("#div_order_history").hide();;
		 }
		 else
		 {
			 
			 	 $("#div_order_history").show();;
				 //$("table").tablesorter();
//			 $(xml).find('X_ORDER_HISTORY').each(function(){
			 	 var orderHistoryObject=xml.x_order_history;
			 	for (var i = 0; i < orderHistoryObject.length; i++) {
			 		var object = orderHistoryObject[i];
//			 		console.log("result"+JSON.stringify(object));
//					  for (var property in object) {
//					    console.log('item ' + i + ': ' + property + '=' + object[property]);
//					    alert(object["DEFAULT_DC"]);
//					    var DEFAULT_ORG_CODE= orderHistoryObject["DEFAULT_DC"];
//                     $(this).find("X_ORDER_HISTORY_ITEM").each(function(){
					 
//                        var ORDER_NUMBER= $(this).find("ORDER_NUMBER").text();
//					 
//                        var CUST_PO_NUMBER= $(this).find("CUST_PO_NUMBER").text();
//                        var ORDERED_DATE= $(this).find("ORDERED_DATE").text();
//                        var SHIP_DATE= $(this).find("SHIP_DATE").text();
//                        var TOTAL_LINES= $(this).find("TOTAL_LINES").text();
//                        var ORDERED_PIECES= $(this).find("ORDERED_PIECES").text();
//                        var SHIPPED_PIECES= $(this).find("SHIPPED_PIECES").text(); 
//                        var CANCELLED_PIECES= $(this).find("CANCELLED_PIECES").text(); 
//                        
                        var ORDER_NUMBER= object.ORDER_NUMBER;
//   					 
                        var CUST_PO_NUMBER= object.CUST_PO_NUMBER==undefined?"":object.CUST_PO_NUMBER;
                        var ORDERED_DATE= object.ORDERED_DATE;
                        var SHIP_DATE= object.SHIP_DATE;
                        var TOTAL_LINES= object.TOTAL_LINES;
                        var ORDERED_PIECES= object.ORDERED_PIECES;
                        var SHIPPED_PIECES= object.SHIPPED_PIECES; 
                        var CANCELLED_PIECES= object.CANCELLED_PIECES;
						ORDERED_PIECES=empty(ORDERED_PIECES)?0:ORDERED_PIECES;
						SHIPPED_PIECES=empty(SHIPPED_PIECES)?0:SHIPPED_PIECES;
						CANCELLED_PIECES=empty(CANCELLED_PIECES)?0:CANCELLED_PIECES;
                        var OPENED_PIECES=  parseInt(ORDERED_PIECES)-parseInt(SHIPPED_PIECES)-parseInt(CANCELLED_PIECES);
						         var orderedDate 			= getYearMonthDBValue(ORDERED_DATE), 
                        	shipDate 				= getYearMonthDBValue(SHIP_DATE), 
                        	splitOrderedDate 		= orderedDate.split('/'), 
                        	splitShitDate 			= shipDate.split('/')

                        var sorttableOrderedDate 	= splitOrderedDate[2] + splitOrderedDate[0] + splitOrderedDate[1],
                        	sorttableShipDate 		= splitShitDate[2] + splitShitDate[0] + splitShitDate[1]
						 var orderDate=dateFormatChange(ORDERED_DATE); 
						 var shipDate=dateFormatChange(SHIP_DATE);
						 html+="<tr id="+tr_id+">"
						 
                         html+='<td> '+CUST_PO_NUMBER+' </td> ';
						  html+='<td><a href="#" onclick="OrderHistory.CallOrderDetailAPI(\''+ORDER_NUMBER+'\',\''+SHIPPED_PIECES+'\');">'+ORDER_NUMBER+'</a></td>';
                        html+='<td sorttable_customkey="'+ sorttableOrderedDate +'000000">'+orderDate+'</td>';
                         html+='<td sorttable_customkey="'+ sorttableShipDate +'000000">'+shipDate+'</td>';
                       
                         html+='<td>'+TOTAL_LINES+'</td>';
                         html+='<td>'+ORDERED_PIECES+'</td>';
                         html+='<td>'+CANCELLED_PIECES+'</td>';
                         html+='<td>'+SHIPPED_PIECES+'</td>';
                         html+='<td>'+OPENED_PIECES+'</td>';
						 if(parseFloat(SHIPPED_PIECES)>0)
						 {
                         html+='<td  onclick="OrderHistory.CallShippingDetailAPI(\''+ORDER_NUMBER+'\');" ><i class="fa fa-info-circle" aria-hidden="true"></i></td>';
						 }
						 else
						 {
							  html+='<td><i class="fa fa-info-circle disableCircle" aria-hidden="true" ></i></td>'; 
						 }
						 
						 html+="</tr>";
						 tr_id++;
//					});
					  
					$("#order_list_tbl tbody tr").remove();
					$("#order_list_tbl tbody").append(html); 
					
					 
			// let the plugin know that we made a update
					//$("#order_list_tbl").trigger("update");
				 	// sorttable.makeSortable(newTableObject);
			 }
		 }
		     }
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ApiProcessDisplayOrderHistoryData";
			  alert(message);
		  }   
	},
	HandleBackToOrders:function()
	{
		 $("#div_order_history").show();
		 $("#div_order_detail").hide();
		 $("#div_shipping_detail").hide();
		 $("#div_invoice_detail").hide();
		 
	},
	CallOrderDetailAPI:function(P_SALES_ORDER_NUM,SHIPPED_PIECES)
	{
		$(".loader").show();
		invoiceCheck(P_SALES_ORDER_NUM);
		
		var  xml_request_data='';
	  $("#shipping-details").show();
		   if(SHIPPED_PIECES=="0" || SHIPPED_PIECES==0)
		   {
			   $("#shipping-details").hide();
		   }
		 $("#div_order_history").hide();
		 $("#div_order_detail").show();
		 $("#div_shipping_detail").hide();
		 $("#div_invoice_detail").hide();
		 
		$("#dtl_sales_order_no").html("");
			   $("#dtl_order_date").html("");
			   $("#dtl_po_no").html("");
			   $("#dtl_sales_date").html("");
			   $("#dtl_sales_order_no1").html("");
			   $("#dtl_ship_addr").html("");
		$("#dtl_order_list_tbl tbody tr").remove();
	 
	xml_request_data+='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"> ';
    xml_request_data+='<soap:Header xmlns:ns1="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxagmx_customer_online/">';
        xml_request_data+='<ns1:SOAHeader>';
            xml_request_data+='<ns1:Responsibility>BPI_WEB_SERVICE_USER</ns1:Responsibility>';
            xml_request_data+='<ns1:RespApplication>XXAG</ns1:RespApplication>';
           xml_request_data+=' <ns1:SecurityGroup>STANDARD</ns1:SecurityGroup>';
            xml_request_data+='<ns1:NLSLanguage>AMERICAN</ns1:NLSLanguage>';
            xml_request_data+='<ns1:Org_Id>181</ns1:Org_Id>';
        xml_request_data+='</ns1:SOAHeader>';
    xml_request_data+='<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" soap:mustUnderstand="1"><wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header>';
    xml_request_data+='<soap:Body xmlns:ns2="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxagmx_customer_online/order_detail/">';
   
   
				
				xml_request_data+='<ns2:InputParameters>';
				xml_request_data+=' <ns2:P_OPERATING_UNIT_ID>181</ns2:P_OPERATING_UNIT_ID>';
				xml_request_data+='<ns2:P_SALES_ORDER_NUM>'+P_SALES_ORDER_NUM+'</ns2:P_SALES_ORDER_NUM>';
				xml_request_data+='</ns2:InputParameters>';
				xml_request_data+='</soap:Body>';
				xml_request_data+='</soap:Envelope>';
				 	
				 
//					var orgID= 204;
//					var userID = userID;
					var url = bpi_com_obj.web_oracle_api_url+"GetOrderDetails?org_id="+orgID+"&sales_order_num="+P_SALES_ORDER_NUM;	
//					console.log("order detail url"+url);
					jQuery.ajax({
						type: "GET",
						url: url,
					    dataType: "json",
						data:"userID="+userID,
						success: function (data) {
							
							$(".loader").hide();
//							console.log("Order Details Result Success:"+JSON.stringify(data));
							var obj = JSON.parse(data.object);
//							console.log(JSON.stringify(obj));
//							var listObj=obj.x_order_detail;
//							for (var i = 0; i < listObj.length; i++) {
//								  var xmlobject = listObj [i];
//								  console.log(xmlobject.ORDERED_QUANTITY);
//								  console.log	("xmlobject"+JSON.stringify(xmlobject));
//								  
//							}

//							 var obj=data.object;
//							 console.log("order details"+obj);
							 if(obj!=null){
								 orderDetailsObject=obj;
//								 console.log(JSON.stringify(orderDetailsObject));
								 OrderHistory.ApiProcessOrderDetailAPI(obj);
							 }else{
								 alert('Order Details is not found');
							 }
						
						},
						error: function (msg) {
							 
							  alert("Failed1: " + msg.status + ": " + msg.statusText);
						}
					}); 
	},
	ApiProcessOrderDetailAPI:function(xml)
	{
		    
	try {
			 html="";
			 tr_id=1;
			 var X_RESPONSE_STATUS= xml.x_response_status
			   var X_RESPONSE_MESSAGE= xml.x_response_message
			   var X_SALES_ORDER_NUM= xml.x_sales_order_num
			   var X_PO_NUM= xml.x_po_num
			   var X_ORDER_DATE=xml.x_order_date
			   var X_SHIP_TO_NUMBER= xml.x_ship_to_number
			   var X_SHIP_TO_LINE1=xml.x_ship_to_line1
			   var X_SHIP_TO_LINE2=xml.x_ship_to_line2
			   var X_SHIP_TO_LINE3= xml.x_ship_to_line3
			   var X_SHIP_TO_CITY= xml.x_ship_to_city
			   var X_SHIP_TO_STATE= xml.x_ship_to_state
			   var X_SHIP_TO_COUNTRY= xml.x_ship_to_country
			   var X_SHIP_TO_POSTAL_CODE= xml.x_ship_to_postal_code
			   
			   $("#div_order_detail #dtl_sales_order_no").html("# " +X_SALES_ORDER_NUM);
			   $("#div_order_detail #dtl_order_date").html(X_ORDER_DATE);
			   $("#div_order_detail #dtl_po_no").html(X_PO_NUM);
			   $("#div_order_detail #dtl_sales_date").html(X_PO_NUM);
			   $("#div_order_detail #dtl_sales_order_no1").html(X_SALES_ORDER_NUM);
			   var dtl_ship_addr= X_SHIP_TO_LINE1;
			   if(!empty(X_SHIP_TO_LINE2))
			   dtl_ship_addr+="</br>"+X_SHIP_TO_LINE2;
			   if(!empty(X_SHIP_TO_LINE3))
			   dtl_ship_addr+="</br>"+X_SHIP_TO_LINE3;
			  
			   dtl_ship_addr+="</br>"+X_SHIP_TO_CITY+", "+X_SHIP_TO_STATE+" "+X_SHIP_TO_POSTAL_CODE;
			   $("#div_order_detail #dtl_ship_addr").html(dtl_ship_addr);
			    
//			 $(xml).find('X_ORDER_DETAIL').each(function(){
//                     $(this).find("X_ORDER_DETAIL_ITEM").each(function(){
			   var orderListObj=xml.x_order_detail;
				for (var i = 0; i < orderListObj.length; i++) {
					  var object = orderListObj [i];
//					  console.log(object.ORDERED_QUANTITY);
					 
					    var LINE_NUMBER= object.LINE_NUMBER;
		                var PART_NUMBER= object.ORDERED_ITEM; 
		                var DESCRIPTION= object.ITEM_DESCRIPTION; 
		                var QUANTITY_ORDERED=object.ORDERED_QUANTITY;
		                var QUANTITY_SHIPPED= object.SHIPPED_QUANTITY;
		                var QUANTITY_CANCELLED=object.CANCELLED_QUANTITY; 
		                var WAREHOUSE_CODE= object.SHIP_FROM; 
							QUANTITY_ORDERED=empty(QUANTITY_ORDERED)?0:QUANTITY_ORDERED;
						QUANTITY_SHIPPED=empty(QUANTITY_SHIPPED)?0:QUANTITY_SHIPPED;
						QUANTITY_CANCELLED=empty(QUANTITY_CANCELLED)?0:QUANTITY_CANCELLED;
						
                       var OPENED_PIECES=  parseInt(QUANTITY_ORDERED)-parseInt(QUANTITY_SHIPPED)-parseInt(QUANTITY_CANCELLED);  
					 
						
						 html+="<tr id="+tr_id+">"
                         html+='<td> '+LINE_NUMBER+' </td> ';
                         html+='<td> '+PART_NUMBER+' </td> ';
                         html+='<td> '+DESCRIPTION+' </td> ';
                         html+='<td> '+QUANTITY_ORDERED+' </td> ';
                         html+='<td> '+QUANTITY_CANCELLED+' </td> ';
                         html+='<td> '+QUANTITY_SHIPPED+' </td> ';
                     
                         html+='<td> '+WAREHOUSE_CODE+' </td> ';
                         html+='<td> '+OPENED_PIECES+' </td> ';
                       
                     
						 html+="</tr>";
						 tr_id++;
				}
//					});
					 
					 
					 	$("#dtl_order_list_tbl tbody tr").remove();
					$("#dtl_order_list_tbl tbody").append(html); 
					
					 
			// let the plugin know that we made a update
					//$("#dtl_order_list_tbl").trigger("update");
					// sorttable.makeSortable(newTableObject);
					
				/* 	
					$("#dtl_order_list_tbl tbody tr").remove();
					$("#dtl_order_list_tbl tbody").html(html);
					$('.tablesorter').trigger("destroy");
					$(".tablesorter").tablesorter(); */
//			 });
			  
		    }
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ApiProcessDisplayOrderHistoryData";
			  alert(message);
		  }  
	},
	CallShippingDetailAPI:function(P_SALES_ORDER_NUM)
	{
	if(empty(P_SALES_ORDER_NUM)) return;
		var  xml_request_data='';
	 // P_SALES_ORDER_NUM="100617196";
		
			$("#div_order_detail #dtl_sales_order_no").html("");
			   $("#div_order_detail #dtl_order_date").html("");
			   $("#div_order_detail #dtl_po_no").html("");
			   $("#div_order_detail #dtl_sales_date").html("");
			   $("#div_order_detail #dtl_sales_order_no1").html("");
			   $("#div_order_detail #dtl_ship_addr").html("");
		$("#dtl_order_list_tbl tbody tr").remove();
	 
 
 


xml_request_data+='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
    xml_request_data+='<soap:Header xmlns:ns1="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxagmx_customer_online/">';
        xml_request_data+='<ns1:SOAHeader>';
            xml_request_data+='<ns1:Responsibility>BPI_WEB_SERVICE_USER</ns1:Responsibility>';
            xml_request_data+='<ns1:RespApplication>XXAG</ns1:RespApplication>';
            xml_request_data+='<ns1:SecurityGroup>STANDARD</ns1:SecurityGroup>';
            xml_request_data+='<ns1:NLSLanguage>AMERICAN</ns1:NLSLanguage>';
            xml_request_data+='<ns1:Org_Id>181</ns1:Org_Id>';
        xml_request_data+='</ns1:SOAHeader>';
    xml_request_data+='<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" soap:mustUnderstand="1"><wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header>';
    xml_request_data+='<soap:Body xmlns:ns2="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxagmx_customer_online/shipping_details/">';
        xml_request_data+=' <ns2:InputParameters>';
            xml_request_data+='<ns2:P_OPERATING_UNIT_ID>181</ns2:P_OPERATING_UNIT_ID>';
                      xml_request_data+='<ns2:P_ORDER_NUM>'+P_SALES_ORDER_NUM+'</ns2:P_ORDER_NUM>';
        xml_request_data+='</ns2:InputParameters>';
   xml_request_data+=' </soap:Body>';
xml_request_data+=' </soap:Envelope> ';

//P_SALES_ORDER_NUM=207267;
//				var orgID= 204;
//				var userID = userID;
				var url = bpi_com_obj.web_oracle_api_url+"GetOrderShippingDetails?org_id="+orgID+"&order_num="+P_SALES_ORDER_NUM;	
//				console.log("order shipping url"+url);
				jQuery.ajax({
					type: "GET",
					url: url,
				    dataType: "json",
					data:"userID="+userID,
					success: function (data) {
						
				//		console.log("Shipping Result Success:"+JSON.stringify(data));
						var obj = JSON.parse(data.object);
				//		console.log(JSON.stringify(obj));
				//		console.log("x_response_message"+obj.x_response_message);
				//		var shippingListObj=obj.x_ship_detail;
				//		for (var i = 0; i < shippingListObj.length; i++) {
				//			  var xmlShippingobject = shippingListObj [i];
				//			  console.log("xmlShippingobject CARRIER"+xmlShippingobject.CARRIER);
				//		  console.log	("xmlShippingobject"+JSON.stringify(xmlShippingobject));
				
				//		}
						
				//		var shipAddressList=obj.x_ship_to_address;
				//		for (var j = 0; j < shipAddressList.length; j++) {
				//			  var xmlShipAddressObject = shipAddressList [j];
				//	
				//			  console.log("xmlshipAddressobject obj SALES_ORDER_NUM"+xmlShipAddressObject[SALES_ORDER_NUM]);
				//			  console.log("xmlshipAddressobject SALES_ORDER_NUM"+xmlShipAddressObject.SALES_ORDER_NUM);
				//			  console.log	("xmlshipAddressobject"+JSON.stringify(xmlShipAddressObject));
				//			 
				//		}
				//		 var obj=data.object;
				//		 console.log("Shipping Object "+obj);
						 if(obj!=null){
							 OrderHistory.APIProcessShippingDetailAPI(obj)
						 }else{
							 alert('Order Shipping Details is not found');
						 }
					
					},
					error: function (msg) {
			 
						  alert("Failed1: " + msg.status + ": " + msg.statusText);
					}
				}); 

			 
			 
	},
	APIProcessShippingDetailAPI:function(xml)
	{
		 $("#div_order_history").hide();
		 $("#div_order_detail").hide();
		 $("#div_shipping_detail").show();
		 $("#div_invoice_detail").hide();
		 
		   
	try {
			 html="";
			 tr_id=1;
			 var X_RESPONSE_STATUS= xml.x_response_status;
			   var X_RESPONSE_MESSAGE= xml.x_response_message;
				if(X_RESPONSE_STATUS=="E")
				{
					alert(X_RESPONSE_MESSAGE);
					OrderHistory.HandleBackToOrders();
				}
				
				var shipAddressList=xml.x_ship_to_address;
				for (var j = 0; j < shipAddressList.length; j++) {
					  var xmlShipAddressObject = shipAddressList [j];
				
			    var X_SALES_ORDER_NUM=xmlShipAddressObject.SALES_ORDER_NUM ;
			   var X_PO_NUM=xmlShipAddressObject.PO_NUM == undefined? "":xmlShipAddressObject.PO_NUM;  
			   var X_ORDER_DATE=xmlShipAddressObject.ORDER_DATE;
			   var X_SHIP_TO_NUMBER=xmlShipAddressObject.X_SHIP_TO_NUMBER== undefined? "":xmlShipAddressObject.X_SHIP_TO_NUMBER;
			   var X_SHIP_TO_LINE1=xmlShipAddressObject.SHIP_TO_ADDRS_LINE1;
			   var X_SHIP_TO_LINE2=xmlShipAddressObject.SHIP_TO_ADDRS_LINE2;
			   var X_SHIP_TO_LINE3=xmlShipAddressObject.SHIP_TO_ADDRS_LINE3;
			   var X_SHIP_TO_CITY=xmlShipAddressObject.SHIP_TO_CITY;
			   var X_SHIP_TO_STATE=xmlShipAddressObject.SHIP_TO_STATE == undefined? "":xmlShipAddressObject.SHIP_TO_STATE;
			   var X_SHIP_TO_COUNTRY=xmlShipAddressObject.SHIP_TO_COUNTRY;
			   var X_SHIP_TO_POSTAL_CODE=xmlShipAddressObject.SHIP_TO_POSTAL_CODE;
			   
			   $("#div_shipping_detail #dtl_sales_order_no").html("# " +X_SALES_ORDER_NUM);
			   $("#div_shipping_detail #dtl_order_date").html(X_ORDER_DATE);
			   $("#div_shipping_detail #dtl_po_no").html(X_PO_NUM);
			   $("#div_shipping_detail #dtl_sales_date").html(X_PO_NUM);
			   $("#div_shipping_detail #dtl_sales_order_no1").html(X_SALES_ORDER_NUM);
			   
			   
			     var dtl_ship_addr= X_SHIP_TO_LINE1;
			   if(!empty(X_SHIP_TO_LINE2))
			   dtl_ship_addr+="</br>"+X_SHIP_TO_LINE2;
			   if(!empty(X_SHIP_TO_LINE3))
			   dtl_ship_addr+="</br>"+X_SHIP_TO_LINE3;
			   dtl_ship_addr+="</br>"+X_SHIP_TO_CITY+", "+X_SHIP_TO_STATE+" "+X_SHIP_TO_POSTAL_CODE;
			   
			    
			  
			   $("#div_shipping_detail #dtl_ship_addr").html(dtl_ship_addr);
			   
						//shipment main div starts
					
                    
				}
				
				var html="";
				ship_cnt=0;
				var shippingListObj=xml.x_ship_detail;
				for (var i = 0; i < shippingListObj.length; i++) {
					var xmlShippingobject = shippingListObj [i];
//			 $(xml).find('X_SHIP_DETAIL').each(function(){
				 
					var ship_act_class="";
					if( $(this).find("X_SHIP_DETAIL_ITEM").length==1)
					{
						ship_act_class=" shipActiveBlock ";
					}
				 //run for each shipment
//                     $(this).find("X_SHIP_DETAIL_ITEM").each(function(){
						 ship_cnt++;
						 var SHIPMENT_NUM= xmlShippingobject.SHIPMENT_NUM;
					     var SHIPPED_DATE= xmlShippingobject.SHIPPED_DATE; 
//						   var SHIPMENT_NUM= $(this).find("SHIPMENT_NUM").text();
//						      var SHIPPED_DATE= $(this).find("SHIPPED_DATE").text();
						   html+=' <div class="panel panel-default"> ';
						   
							html+='<div class="panel-heading '+ship_act_class+'">';
                        html+=' <h3 class="panel-title"> ';
//                        html+=' <a class="accordion-toggle" data-toggle="collapse"  href="#collapseOne'+ship_cnt+'" aria-expanded="false">SHIPMENT # '+SHIPMENT_NUM+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SHIP DATE: '+SHIPPED_DATE+' <i class="fa fa-chevron-down pull-left" id="ship_i_'+ship_cnt+'"></i></a>';
                        html+=' <a class="accordion-toggle" data-toggle="collapse" style="color: #2E4F6A;font-weight: bold;" href="#collapseOne'+ship_cnt+'" aria-expanded="false">SHIPMENT # '+SHIPMENT_NUM+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-chevron-down pull-left" id="ship_i_'+ship_cnt+'"></i></a>';
                        html+=' </h3>';
						html+='  </div> ';
                       //shipment main div ends starts 
					   	  html+='<div id="collapseOne'+ship_cnt+'" class="panel-collapse collapse" style="height: 0px;" aria-expanded="false">';
					  //run for each trackinig
					  
					 
					   	var SHIPPED_FROM= xmlShippingobject.SHIPPED_FROM;
					    var CARRIER= xmlShippingobject.CARRIER;
				 
				 
                        html+='<div class="panel-body">';
                           html+=' <div class="row">';
							  html+=' <div class="col-md-6 shippedDate">';
							   html+=' <span class="title">Ship Date :</span><Span class="date">'+SHIPPED_DATE+' </span>';
							 html+='  </div>';
							   
							   html+='<div class="col-md-6 shippedFrom">';
							   html+=' <span class="title">Shipped From :</span><Span class="dc">'+SHIPPED_FROM+' </span>';
								html+='<span class="title">Carrier :</span><Span class="shipmethod">'+CARRIER+' </span>';
							  html+=' </div>';
							html+='</div>  ';
							
							var shippingListObj=xml.x_ship_detail;
							for (var i = 0; i < shippingListObj.length; i++) {
								var xmlShippingobject = shippingListObj [i];
								if(SHIPMENT_NUM==xmlShippingobject.SHIPMENT_NUM){
//									console.log("Looping shippingList:"+xmlShippingobject.SHIPMENT_NUM);
									var MODE_OF_TRANSPORT= xmlShippingobject.MODE_OF_TRANSPORT== undefined? "":xmlShipAddressObject.MODE_OF_TRANSPORT;
					    var WAY_BILL_NUMBER= xmlShipAddressObject.WAY_BILL_NUMBER== undefined? "":xmlShipAddressObject.WAY_BILL_NUMBER;
					    var TRACKING_NUMBER= xmlShippingobject.TRACKING_NUMBER;
					    
						var trk_way_bill_txt="";
						trk_way_bill_txt=" TRACKING # ";
						var trk_found=1;
						if(empty(TRACKING_NUMBER))
						{
							trk_found=0;
							TRACKING_NUMBER=WAY_BILL_NUMBER;
							trk_way_bill_txt=" Pro # ";
						}
						 
							 html+=' <div class="ShippedDetails">';
                                html+=' <table class="table">';
								 
									  html+='<thead>';
										html+='<tr class="tracking">';
										  html+='<th>'+trk_way_bill_txt+'</th>';
										  if(trk_found==0)
										  html+='<th> '+TRACKING_NUMBER+'</th>';
											else
											{
												if(MODE_OF_TRANSPORT=="PARCEL" && CARRIER.indexOf("FEDEX")>=0)
												html+='<th> <a target="new" href=" https://www.fedex.com/apps/fedextrack/?tracknumbers='+TRACKING_NUMBER+'">'+TRACKING_NUMBER+'</a></th>';		
												else
												html+='<th> <a target="new" href="https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums='+TRACKING_NUMBER+'">'+TRACKING_NUMBER+'</a></th>';		
											}
										  html+='<th> </th>';
										html+='</tr>';
										  html+='</thead>';
									  html+='</table>';
									  
									    html+=' <table class="table " id="summaryTable'+ship_cnt+'">';
								 
									  html+='<thead>';
									  
										html+='<tr class="heading">';
										 
											  html+='<th class="partnumber">PART NUMBER</th>';
											  html+='<th class="desc">DESCRIPTION</th>';
											  html+='<th class="shippedpieces">SHIPPED PIECES</th>';
										html+='</tr>';
									  html+='</thead>';
									  html+='<tbody>';
									
								var tot_shipped=0;		
//						  $(this).find("SHIP_LINE_TABLE_ITEM").each(function(){
							  	html+='<tr>';
							  	var PART_NUMBER=xmlShippingobject.PART_NUMBER;
								  var PART_DESCRIPTION=xmlShippingobject.PART_DESCRIPTION;
								  var SHIPPED_QTY=xmlShippingobject.SHIPPED_QTY;
							  if(!empty(SHIPPED_QTY))
							  {
								  tot_shipped=tot_shipped+parseInt(SHIPPED_QTY);
							  }
							    html+='<td>'+PART_NUMBER+'</td>';
										  html+='<td>'+PART_DESCRIPTION+'</td>';
										  html+='<td>'+SHIPPED_QTY+'</td>';
								html+='</tr>'
//							  })
							  html+=' </tbody>'
							  html+=' <tfoot>'
								 	html+=' <tr><td colspan="2"><b>TOTAL SHIPPED PIECES</b></td><td><b>'+tot_shipped+'</b></td></tr>';
										html+=' </tfoot>'
										html+='</table>';
						 html+='</div>';//close of ShippedDetails
								} 
							}
						 	html+='</div>';//close of panel-body
							html+='</div>';//close ofcollapseOne1
                        	html+='</div>';//close div panel panel-default
							
//						});
                        	
	}      
                        	
//					});
					 $("#accordion1").html(html);
					 if(ship_cnt==1)
						setTimeout(function(){$("#ship_i_1").trigger("click");}, 500); 
				/* for(p=1;p<=ship_cnt;p++)
				{					
				sorttable.makeSortable(document.getElementById("summaryTable"+p));
				} */
			 
			  
		    }
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ApiProcessDisplayOrderHistoryData";
			  alert(message);
		  }  
	},
	
	CallInvoiceDetailAPI:function(P_SALES_ORDER_NUM)
	{
	if(empty(P_SALES_ORDER_NUM)) return;
		var  xml_request_data='';
	 // P_SALES_ORDER_NUM="100617196";
		
			$("#div_order_detail #dtl_sales_order_no").html("");
			   $("#div_order_detail #dtl_order_date").html("");
			   $("#div_order_detail #dtl_po_no").html("");
			   $("#div_order_detail #dtl_sales_date").html("");
			   $("#div_order_detail #dtl_sales_order_no1").html("");
			   $("#div_order_detail #dtl_ship_addr").html("");
		$("#dtl_order_list_tbl tbody tr").remove();
	 

//P_SALES_ORDER_NUM=151266;
//				var orgID= 204;
//				var userID = userID;
				var url = bpi_com_obj.web_oracle_api_url+"GetInvoiceDetails?org_id="+orgID+"&purchase_order_number="+P_SALES_ORDER_NUM;	
				console.log("order invoice url"+url);
				jQuery.ajax({
					type: "GET",
					url: url,
				    dataType: "json",
					data:"userID="+userID,
					success: function (data) {
						
						console.log("Invoice Result Success:"+JSON.stringify(data));
						var obj = JSON.parse(data.object);
//						console.log(JSON.stringify(obj));
//						console.log("x_response_message"+obj.x_response_message);
						var invoiceListObj=obj.x_inv_details;
						for (var i = 0; i < invoiceListObj.length; i++) {
							  var xmlInvoiceobject = invoiceListObj [i];
//							
//						  console.log	("xmlInvoiceobject"+JSON.stringify(xmlInvoiceobject));
				
						}
						
				//		 var obj=data.object;
				//		 console.log("Shipping Object "+obj);
					
						 $.ajax({
							 type: "GET",
								url : bpi_com_obj.web_oracle_api_url+"GetPaymentInvoice?org_id="+orgID+"&sales_order_number="+P_SALES_ORDER_NUM,
							    dataType: "json",
								data:"userID="+userID,
								success: function (data) {
									
									console.log("Payment Result Success:"+JSON.stringify(data));
									var objPayment = JSON.parse(data.object);
									var x_response_message =obj.x_response_message;
									var x_response_status =obj.x_response_status;
//									console.log(JSON.stringify(obj));
//									console.log("x_response_message"+x_response_message);
//									console.log("x_response_status"+x_response_status);
//									 
									var paymentInvoiceObj=objPayment.x_payment_matching;
									for (var i = 0; i < paymentInvoiceObj.length; i++) {
										  var xmlpaymentInvoiceObj = paymentInvoiceObj [i];
									  console.log("xmlpaymentInvoiceObj"+JSON.stringify(xmlpaymentInvoiceObj));
							
									}
									var paymentDetailsObj=objPayment.x_payment_details;
									for (var i = 0; i < paymentDetailsObj.length; i++) {
										  var xmlpaymentDetailsObj = paymentDetailsObj [i];
									  console.log("xmlpaymentDetailsObj"+JSON.stringify(xmlpaymentDetailsObj));
							
									}
									if(obj!= null && objPayment!=null){
										OrderHistory.APIProcessInvoiceDetailAPI(obj,objPayment);
									}else{
										alert('Order Invoice Payment Details is not found');
									}
								
							} ,
							error : function(msg) {
								alert("unable to update the password");
							}
						});
					
					},
					error: function (msg) {
			 
						  alert("Failed1: " + msg.status + ": " + msg.statusText);
					}
				}); 

			 
			 
	},
	APIProcessInvoiceDetailAPI:function(obj,objPayment)
	{
//		console.log("OrderObject:"+JSON.stringify(orderDetailsObject));
		 $("#div_order_history").hide();
		 $("#div_order_detail").hide();
		 $("#div_invoice_detail").show();
//		 $("#div_shipping_detail").show();

	try {
			 html="";
			 tr_id=1;
//			 var X_RESPONSE_STATUS= obj.x_response_status;
//			   var X_RESPONSE_MESSAGE= obj.x_response_message;
//				if(X_RESPONSE_STATUS=="S")
//				{
////					alert(X_RESPONSE_MESSAGE);
//					OrderHistory.HandleBackToOrders();
//				}
//				

			 
			   var X_SALES_ORDER_NUM= orderDetailsObject.x_sales_order_num
			   var X_PO_NUM= orderDetailsObject.x_po_num
			   var X_ORDER_DATE=orderDetailsObject.x_order_date
			   var X_SHIP_TO_NUMBER= orderDetailsObject.x_ship_to_number
			   var X_SHIP_TO_LINE1=orderDetailsObject.x_ship_to_line1
			   var X_SHIP_TO_LINE2=orderDetailsObject.x_ship_to_line2
			   var X_SHIP_TO_LINE3= orderDetailsObject.x_ship_to_line3
			   var X_SHIP_TO_CITY= orderDetailsObject.x_ship_to_city
			   var X_SHIP_TO_STATE= orderDetailsObject.x_ship_to_state
			   var X_SHIP_TO_COUNTRY= orderDetailsObject.x_ship_to_country
			   var X_SHIP_TO_POSTAL_CODE= orderDetailsObject.x_ship_to_postal_code
			   
//			   $("#div_shipping_detail #dtl_sales_order_no").html("# " +X_SALES_ORDER_NUM);
			   $("#div_invoice_detail #dtl_order_date_invoice").html(X_ORDER_DATE);
			   $("#div_invoice_detail #dtl_po_no_invoice").html(X_PO_NUM);
//			   $("#div_shipping_detail #dtl_sales_date").html(X_PO_NUM);
			   $("#div_invoice_detail #dtl_sales_order_no1_invoice").html(X_SALES_ORDER_NUM);
			   
			     var dtl_ship_addr_invoice= X_SHIP_TO_LINE1;
			   if(!empty(X_SHIP_TO_LINE2))
				   dtl_ship_addr_invoice+="</br>"+X_SHIP_TO_LINE2;
			   if(!empty(X_SHIP_TO_LINE3))
				   dtl_ship_addr_invoice+="</br>"+X_SHIP_TO_LINE3;
			   dtl_ship_addr_invoice+="</br>"+X_SHIP_TO_CITY+", "+X_SHIP_TO_STATE+" "+X_SHIP_TO_POSTAL_CODE;
		  
			   $("#div_invoice_detail #dtl_ship_addr_invoice").html(dtl_ship_addr_invoice);
		   
					//invoice main div starts

				
				var html="";
				ship_cnt=0;
				var invoiceListObj=obj.x_inv_details;
				for (var i = 0; i < invoiceListObj.length; i++) {
					  var xmlInvoiceobject = invoiceListObj [i];
//					  console.log("xmlInvoiceobject ORDER_NUMBER"+xmlInvoiceobject.ORDER_NUMBER);

				 
					var ship_act_class="";
					if( $(this).find("X_SHIP_DETAIL_ITEM").length==1)
					{
						ship_act_class=" shipActiveBlock ";
					}
				 //run for each invoice

						 ship_cnt++;
						 var ORDER_NUMBER= xmlInvoiceobject.ORDER_NUMBER;
						 var TRX_NUMBER= xmlInvoiceobject.TRX_NUMBER;
					     var TRX_DATE= xmlInvoiceobject.TRX_DATE;
					     var ORG_ID= xmlInvoiceobject.ORG_ID;
						   html+=' <div class="panel panel-default"> ';
						   
							html+='<div class="panel-heading '+ship_act_class+'">';
                        html+=' <h3 class="panel-title"> ';
//                        html+=' <a class="accordion-toggle" data-toggle="collapse"  href="#collapseOne'+ship_cnt+'" aria-expanded="false">ORDER_NUMBER # '+ORDER_NUMBER+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TRX DATE: '+TRX_DATE+' <i class="fa fa-chevron-down pull-left" id="ship_i_'+ship_cnt+'"></i></a>';
                        html+=' <a class="accordion-toggle" data-toggle="collapse" style="color: #2E4F6A;font-weight: bold;" href="#collapseOne'+ship_cnt+'" aria-expanded="false">INVOICE NUMBER # '+TRX_NUMBER+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-chevron-down pull-left" id="ship_i_'+ship_cnt+'"></i></a>';
                        html+=' </h3>';
						html+='  </div> ';
                       //invoice main div ends starts 
					   	  html+='<div id="collapseOne'+ship_cnt+'" class="panel-collapse collapse" style="height: 0px;" aria-expanded="false">';
					  
					  
					 
					   	var INVOICE_CURRENCY_CODE= xmlInvoiceobject.INVOICE_CURRENCY_CODE;
					    var CARRIER= 2;
					    
					    var paymentInvoiceObj=objPayment.x_payment_matching;
					    for (var i = 0; i < paymentInvoiceObj.length; i++) {
					    	var xmlpaymentInvoiceObj = paymentInvoiceObj [i];
//									  console.log("xmlpaymentInvoiceObj"+JSON.stringify(xmlpaymentInvoiceObj));
				 
					    	CUSTOMER_NAME=xmlpaymentInvoiceObj.CUSTOMER_NAME;
                        html+='<div class="panel-body">';
                        html+=' <div class="row">';
                        html+=' <div class="col-md-6 shippedDate">';
						   html+=' <span class="title">Invoice Date :</span><Span class="date">'+TRX_DATE+' </span>';
						 html+='  </div>';
						   
						   html+='<div class="col-md-6 shippedFrom">';
						   html+=' <span class="title">Invoice Currency :</span><Span class="dc">'+INVOICE_CURRENCY_CODE+' </span>';
							html+='<span class="title">Customer Name :</span><Span class="shipmethod">'+CUSTOMER_NAME+' </span>';
						  html+=' </div>';
						html+='</div>  ';

							 html+=' <div class="ShippedDetails">';
							 	var tot_shipped=0;		
								var tot_inv_amt=0;
                                html+=' <table class="table">';
								 

									  
									    html+=' <table class="table " id="summaryTable'+ship_cnt+'">';
								 
									  html+='<thead>';
									  
										html+='<tr class="heading">';
										 
											  html+='<th class="shippedpieces">LINE NUMBER</th>';
											  html+='<th class="shippedpieces">ORDERED ITEM</th>';
											  html+='<th class="shippedpieces">UNIT SELLING PRICE</th>';
											  html+='<th class="shippedpieces">TAX</th>';
											  html+='<th class="shippedpieces">ORDERED QUANTITY</th>';
											  html+='<th class="shippedpieces">INVOICE AMOUNT</th>';
										html+='</tr>';
									  html+='</thead>';
									  html+='<tbody>';
									  for (var i = 0; i < invoiceListObj.length; i++) {
										  var xmlInvoiceobject = invoiceListObj [i];
										  if(ORDER_NUMBER==xmlInvoiceobject.ORDER_NUMBER){
//											  console.log("Looping invoiceList:"+xmlInvoiceobject.ORDER_NUMBER)

//						  
							  	html+='<tr>';
							  	var LINE_NUMBER=xmlInvoiceobject.LINE_NUMBER;
								  var ORDERED_ITEM=xmlInvoiceobject.ORDERED_ITEM;
								  var UNIT_SELLING_PRICE=xmlInvoiceobject.UNIT_SELLING_PRICE;
								  var TAX=xmlInvoiceobject.TAX;
								  var ORDERED_QUANTITY=xmlInvoiceobject.ORDERED_QUANTITY;
								  var INVOICE_AMOUNT=xmlInvoiceobject.INVOICE_AMOUNT;
								  
//							
								  
							    html+='<td>'+LINE_NUMBER+'</td>';
										  html+='<td>'+ORDERED_ITEM+'</td>';
										  html+='<td>'+UNIT_SELLING_PRICE+'</td>';
										  html+='<td>'+TAX+'</td>';
										  html+='<td>'+ORDERED_QUANTITY+'</td>';
										  html+='<td>'+INVOICE_AMOUNT+'</td>';
								html+='</tr>'
								 if(!empty(ORDERED_QUANTITY))
							  {
								  tot_shipped=tot_shipped+parseInt(ORDERED_QUANTITY);
								  tot_inv_amt=tot_inv_amt+INVOICE_AMOUNT;
							  }
//							  
								} 
							}

								  

							  
							
								  
								  var TRANSACTION_DATE=xmlpaymentInvoiceObj.TRANSACTION_DATE;
								  var PAYMENT_TERM=xmlpaymentInvoiceObj.PAYMENT_TERM;
								  var DAYS_OUTSTANDING=xmlpaymentInvoiceObj.DAYS_OUTSTANDING;
								  var ORDER_NUMBER=xmlpaymentInvoiceObj.ORDER_NUMBER;
								  var PAYMENT_STATUS=xmlpaymentInvoiceObj.PAYMENT_STATUS;
								  
								  var DUE_DATE=xmlpaymentInvoiceObj.DUE_DATE;
								  var INVOICE_AMOUNT=xmlpaymentInvoiceObj.INVOICE_AMOUNT;
								  var ORG_ID=xmlpaymentInvoiceObj.ORG_ID;
								  var PAID_AMOUNT=xmlpaymentInvoiceObj.PAID_AMOUNT;
								  var CUSTOMER_NAME=xmlpaymentInvoiceObj.CUSTOMER_NAME;
								  
								  var OUTSTANDING_AMOUNT=xmlpaymentInvoiceObj.OUTSTANDING_AMOUNT;
								  var INVOICE_NUMBER=xmlpaymentInvoiceObj.INVOICE_NUMBER;
								  var PAYMENT_DATE=xmlpaymentInvoiceObj.PAYMENT_DATE;
								  var PAYMENT_METHOD=xmlpaymentInvoiceObj.PAYMENT_METHOD;
								  var CUSTOMER_NUMEBR=xmlpaymentInvoiceObj.CUSTOMER_NUMEBR;
								  								  
								 
//							html+=' <td colspan="2"><b>TOTAL SHIPPED PIECES</b><b> : </b><b>'+tot_shipped+'</b></td><br>';
//							html+=' <td colspan="2"><b>OUTSTANDING AMOUNT</b><b> : </b><b>'+OUTSTANDING_AMOUNT+'</b></td><br>';
//							html+=' <td colspan="2"><b>PAID_AMOUNT</b><b> : </b><b>'+PAID_AMOUNT+'</b></td><br>';
//							html+=' <td colspan="2"><b>DUE DATE</b><b> : </b><b>'+DUE_DATE+'</b></td><br>';
//							html+=' <td colspan="2"><b>DAYS OUTSTANDING</b><b> : </b><b>'+DAYS_OUTSTANDING+'</b></td><br>';
								  html+= '<tr>';
								  html+='<td>   </td>';
								  html+=' <td>   </td>';
								  html+=' <td>   </td>';
								  html+=' <td>   </td>';
								  html+='  <td>';
								  html+='   <p>';
								  html+='    <strong>Total</strong>';
								  html+=' </p>';
								  html+='   <p>';
								  html+='    <strong>Paid Amount</strong>';
								  html+=' </p>';
								  html+='  <p>';
								  html+='    <strong>Payment Status</strong>';
								  html+=' </p></td>';
								  html+='  <td>';
								  html+='   <p>';
								  html+='     <strong>'+INVOICE_AMOUNT+'</strong>';
								  html+='    </p>';
								  html+='   <p>';
								  html+='     <strong>'+PAID_AMOUNT+'</strong>';
								  html+='    </p>';
								  html+='     <p>';
								  if(PAYMENT_STATUS=="Paid"){
//									  console.log(PAYMENT_STATUS);
//									  html+='<strong style="background-color:Green;color:White">'+PAYMENT_STATUS+'</strong>';
								      html+='<button type="button" style="color:Black;" class="btn btn-success btn-sm"">'+PAYMENT_STATUS+'</button>';

								  }
								  else if(PAYMENT_STATUS=="PartiallyPaid"){
//									  console.log(PAYMENT_STATUS);
//									 html+=' <button style="background-color:Yellow;color:Black">'+PAYMENT_STATUS+'</button>';
									 html+='<button id="payment-details type="Submit" style="color:Black;"  class="btn btn-warning btn-sm"">'+PAYMENT_STATUS+'</button>';

								  }
								  else if(PAYMENT_STATUS=="Pending"){
//									  console.log(PAYMENT_STATUS);
									 html+=' <strong style="background-color:Orange;color:Black">'+PAYMENT_STATUS+'</strong>';
								  }
								  html+='     </p></td>';
								  html+='    </tr>';
//								  html+='<thead>';
								  
//								  html+='<tr class="heading">';
//								  
//								  html+='<th">Payment Date</th>';
//								  html+='<th class="shippedpieces">Payment Method</th>';
//								  html+='<th class="shippedpieces">Payment Term</th>';
//								  html+='<th class="shippedpieces">TAX</th>';
//								  html+='<th class="shippedpieces">ORDERED QUANTITY</th>';
//								  html+='<th class="shippedpieces">INVOICE AMOUNT</th>';
//								  html+='</tr>';
//								  html+='</thead>';
								  html+=' <table class="table">';
								  html+='<h6>Payment Details</h6>';
									  html+='  <thead>';
										  html+='     <tr class="heading">';
//										  html+=' <tr>';
//										  html+='         <td><strong>LINE NUM</strong></td>';
//										  html+=' </tr>';
										  html+='         <td><strong>NO.</strong></td>';
										  html+='         <td class="text-center"><strong>DATE</strong></td>';
										  html+='        <td class="text-center"><strong>METHOD</strong></td>';
									   html+='      <td class="text-center"><strong>REFERENCE</strong></td>';
								  html+='      <td class="text-right"><strong>AMOUNT PAID</strong></td>';
						  html+='   </tr>';
						  html+='  </thead>';
						  html+='  <tbody>';
						  
						  var paymentDetailsObj=objPayment.x_payment_details;
							for (var i = 0; i < paymentDetailsObj.length; i++) {
								  var xmlpaymentDetailsObj = paymentDetailsObj [i];
							  console.log("xmlpaymentDetailsObj"+JSON.stringify(xmlpaymentDetailsObj));
							  
							  var REFERENCE=xmlpaymentDetailsObj.REFERENCE;
							  var AMOUNT=xmlpaymentDetailsObj.AMOUNT;
							  var LINE_NUM=xmlpaymentDetailsObj.LINE_NUM;
							  var CASH_RECEIPT_ID=xmlpaymentDetailsObj.CASH_RECEIPT_ID;
							  var PAYMENT_DATE=xmlpaymentDetailsObj.PAYMENT_DATE;
							  var PAYMENT_METHOD=xmlpaymentDetailsObj.PAYMENT_METHOD;
							  
					
						  html+='   <tr>';
						  html+='      <td>'+LINE_NUM+'</td>';
						  html+='      <td>'+PAYMENT_DATE+'</td>';
						  html+='     <td>'+PAYMENT_METHOD+'</td>';
						  html+='    <td>'+REFERENCE+'</td>';
						  html+='    <td class="text-center">'+AMOUNT+'</td>';
						  html+='</tr>';

												  html+='  </tbody>';
												  html+='</table>';
								  html+='</table>';
								  
						 html+='</div>';//close of InvoiceDetails
						 	html+='</div>';//close of panel-body
							html+='</div>';//close ofcollapseOne1
                        	html+='</div>';//close div panel panel-default
							}
									  }
							

                        	
				}     
				
				      
            	

				 $("#invoice_accordion1").html(html);
				 if(ship_cnt==1)
					setTimeout(function(){$("#ship_i_1").trigger("click");}, 500); 
			
		  
	    }
	  catch(err) {
		
		  var message = err.message;
		  message = err.message+" in BpiccPlaceOrder.ApiProcessDisplayOrderHistoryData";
		  alert(message);
	  }  
},
	
}
function getYearMonthUIValue(val,date_field)
{
	var date_format="";
		if(date_field=='P_FROM_DATE')
		{
			date_format=msgAlertBpiCcOrderHistoryFromDateFormat;
			
		}
		else
		{
			date_format=msgAlertBpiCcOrderHistoryToDateFormat;
		}
	
	
	
	if($.trim(val)!='')
	{
		exp_arr=val.split("/");
		if(exp_arr.length!=3)
		{
			alert(date_format);
			return false;
		}
		var mm=exp_arr[0];
		var dd=exp_arr[1];
		var yyyy=exp_arr[2];
		
		
		var month_array = new Array();
		month_array['01'] = 'Jan';
		month_array['02'] = 'Feb';
		month_array['03'] = 'Mar';
		month_array['04'] = 'Apr';
		month_array['05'] = 'May';
		month_array['06'] = 'Jun';
		month_array['07'] = 'Jul';
		month_array['08'] = 'Aug';
		month_array['09'] = 'Sep';
		month_array['10'] = 'Oct';
		month_array['11'] = 'Nov';
		month_array['12'] = 'Dec';
		  
		 return dd+"-"+month_array[mm]+"-"+yyyy;
		 
	}
	else
	{
	return "";
	}
	
} 
function getYearMonthDBValue(val)
{
	if(empty(val))
		return "";
	var month_array = new Array();
 	  month_array['JAN'] = '01';
	  month_array['FEB'] = '02';
	  month_array['MAR'] = '03';
	  month_array['APR'] = '04';
	  month_array['MAY'] = '05';
	  month_array['JUN'] = '06';
	  month_array['JUL'] = '07';
	  month_array['AUG'] = '08';
	  month_array['SEP'] = '09';
	  month_array['OCT'] = '10';
	  month_array['NOV'] = '11';
	  month_array['DEC'] = '12';
	  
		var inp_mon_arr = val.split('-');
		in_date = inp_mon_arr[0];
		in_month = inp_mon_arr[1].toUpperCase();;
		in_year = inp_mon_arr[2];
		num_month = month_array[in_month];
		return num_month+"/"+in_date+"/"+in_year;
}
$( function() {
    $( ".datepicker" ).datepicker();
  } );
Date.prototype.toShortFormat = function() {
    var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
    
    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();
    
    return "" + day + "-" + month_names[month_index] + "-" + year;
}

function dateFormatChange(date){
//	var date= '21/01/2015';
//	var d=new Date(date.split("/").reverse().join("-"));
	var d=new Date(date);
	var dd=d.getDate();
	var mm=d.getMonth()+1;
	var yy=d.getFullYear();
	var dayFormat=parseInt(dd)<10?"0"+dd:dd;
	var d1=date.split("-");
//	var newdate=mm+"-"+dd+"-"+yy;
	var newdate=dayFormat+"-"+d1[1]+"-"+yy;
	return newdate;
}

function dateDisplayFormat(date){
	var t=date.split("T");
	var dateValue=t[0];
	var d=dateValue.split("-");
	return d[1]+"/"+d[2]+"/"+d[0];
}

function invoiceCheck(P_SALES_ORDER_NUM){
//	P_SALES_ORDER_NUM=66427;
	var url = bpi_com_obj.web_oracle_api_url+"GetCheckInvoiceDetails?org_id="+orgID+"&purchase_order_number="+P_SALES_ORDER_NUM;	
	console.log("order invoice url"+url);
	jQuery.ajax({
		type: "GET",
		url: url,
	    dataType: "json",
		data:"userID="+userID,
		success: function (data) {
			
			console.log("Invoice Result Success:"+JSON.stringify(data));
			var obj = JSON.parse(data.object);
			var x_inv_exist =obj.x_inv_exist;
			console.log("x_inv_exist"+obj.x_inv_exist);
		
			 if(x_inv_exist=="Y"){
				 console.log("x_inv_exist"+obj.x_inv_exist);
//				 alert(P_SALES_ORDER_NUM+""+x_inv_exist);
				 $('#invoice-details').show();

			 }else{
				 console.log("x_inv_exist"+obj.x_inv_exist);
//				 alert(P_SALES_ORDER_NUM+""+x_inv_exist);
				 $('#invoice-details').hide();

			 }
		
		},
		error: function (msg) {
 
			  alert("Failed1: " + msg.status + ": " + msg.statusText);
		}
	}); 
	
}

function OrderHistoryExcelDownload(){
	console.log("excel");
  var obj=orderHistoryObject;
  console.log("excel"+JSON.stringify(obj));
  if(obj!=null){
	  excelTableCreation(obj);
  }else{
	  alert("Excel Download not available");
  }
    
}


function excelTableCreation(xml){
 var html = "<table id='OrderHistoryExcel'>  <tr><th>PURCHASE ORDER#</th><th>SALES ORDER#</th><th>ORDER DATE</th><th>ESTIMATED SHIP DATE</th>" +
 		"<th>TOTAL LINES</th><th>ORDERED PIECES</th><th>CANCELLED PIECES</th><th>SHIPPED PIECES</th><th>OPENED PIECES</th></tr>";
	html=html+""
	 var orderHistoryObject=xml.x_order_history;
 	for (var i = 0; i < orderHistoryObject.length; i++) {
 		var object = orderHistoryObject[i];
            var ORDER_NUMBER= object.ORDER_NUMBER;
            var CUST_PO_NUMBER= object.CUST_PO_NUMBER==undefined?"":object.CUST_PO_NUMBER;
            var ORDERED_DATE= object.ORDERED_DATE;
            var SHIP_DATE= object.SHIP_DATE;
            var TOTAL_LINES= object.TOTAL_LINES;
            var ORDERED_PIECES= object.ORDERED_PIECES;
            var SHIPPED_PIECES= object.SHIPPED_PIECES; 
            var CANCELLED_PIECES= object.CANCELLED_PIECES;
			ORDERED_PIECES=empty(ORDERED_PIECES)?0:ORDERED_PIECES;
			SHIPPED_PIECES=empty(SHIPPED_PIECES)?0:SHIPPED_PIECES;
			CANCELLED_PIECES=empty(CANCELLED_PIECES)?0:CANCELLED_PIECES;
            var OPENED_PIECES=  parseInt(ORDERED_PIECES)-parseInt(SHIPPED_PIECES)-parseInt(CANCELLED_PIECES);
			         var orderedDate 			= getYearMonthDBValue(ORDERED_DATE), 
            	shipDate 				= getYearMonthDBValue(SHIP_DATE), 
            	splitOrderedDate 		= orderedDate.split('/'), 
            	splitShitDate 			= shipDate.split('/')

            var sorttableOrderedDate 	= splitOrderedDate[2] + splitOrderedDate[0] + splitOrderedDate[1],
            	sorttableShipDate 		= splitShitDate[2] + splitShitDate[0] + splitShitDate[1]
			 var orderDate=dateFormatChange(ORDERED_DATE); 
			 var shipDate=dateFormatChange(SHIP_DATE);
			 html+="<tr id="+tr_id+">"
			 
             html+='<td> '+CUST_PO_NUMBER+' </td> ';
			  html+='<td>'+ORDER_NUMBER+'</td>';
            html+='<td>'+orderDate+'</td>';
             html+='<td>'+shipDate+'</td>';
           
             html+='<td>'+TOTAL_LINES+'</td>';
             html+='<td>'+ORDERED_PIECES+'</td>';
             html+='<td>'+CANCELLED_PIECES+'</td>';
             html+='<td>'+SHIPPED_PIECES+'</td>';
             html+='<td>'+OPENED_PIECES+'</td>';
			 html+="</tr>";
 	}
 	$("#ExcelexportDiv").append(html);
// console.log("table"+html);
 	exportexcel();
// exportTableToExcel(OrderHistoryExcel, "sample" )
}
function exportexcel() {  
    $("#OrderHistoryExcel").table2excel({  
        name: "Table2Excel",  
        filename: "OrderHistoryExcel",  
        fileext: ".xlsx"  
    });  
} 