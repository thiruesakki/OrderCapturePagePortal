//http://uswodapp013.brakepartsinc.com:8010/webservices/SOAProvider/plsql/xxbpi_customer_online/
  jQuery(function($) {'use strict',
  
	   $('#search_order_history').on('click', function(e){
	  e.preventDefault();
		OrderHistory.ApiDisplayOrderHistoryData();
	});
	
	 $("#div_order_history").show();
	 $("#div_shipping_detail").hide();
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


	LoadProperDatesAndCallAPI:function()
	{
		
		
		var today = new Date();
		var cur_mm = parseInt(today.getMonth())+1;;
		cur_date=("0"+cur_mm).substr(-2)+"/"+("0"+today.getDate()).substr(-2)+"/"+today.getFullYear();
		
	
		
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

		today = mm+'/'+dd+'/'+yyyy;
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
			if(!empty(getCookie("selected_ship_to_account_no")))
			{
				P_SHIP_TO=getCookie("selected_ship_to_account_no");
			}
			
			
			 P_FROM_DATE="";
			P_TO_DATE="";;
			var orderType=$("#orderType").val();
		 
			  if(orderType=="allorders" || orderType=="shippedorders" || orderType=="openorders")
			  {
				 var from_date=$("#from_date").val();
				var to_date=$("#to_date").val();
				if(empty(from_date))
				{
					alert("Please Enter From date");
					return false;
				}
				else if(empty(to_date))
				{
					alert("Please Enter To date");
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
					 
					 P_FROM_DATE=getYearMonthUIValue(from_date);
						P_TO_DATE=getYearMonthUIValue(to_date);
						
						var f_exp_arr=from_date.split("/");
						var f_mm=f_exp_arr[0];
						var f_dd=f_exp_arr[1];
						var f_yyyy=f_exp_arr[2]; 
						 
						var fd1 = new Date(f_yyyy, f_mm-1, f_dd);
						
						var t_exp_arr=to_date.split("/");
						var t_mm=t_exp_arr[0];
						var t_dd=t_exp_arr[1];
						var t_yyyy=t_exp_arr[2]; 
						var fd2 = new Date(t_yyyy, t_mm-1, t_dd);
						if(fd2<fd1)
						{
							alert("To Date should be greater than From Date");
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
					alert("Please Enter PO Number");
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
					alert("Please Enter Sales Order Number");
					return false;
				}
				P_SEARCH_TYPE="SO";
				P_DOCUMENT_NUM=sales_order_no;
			}				
		
		 
			 
		
			var  xml_request_data='';
		 
	$(".loader").show();
		xml_request_data+='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
		xml_request_data+='<soap:Header xmlns:ns1="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/">';
		xml_request_data+='<ns1:SOAHeader>';
		xml_request_data+=' <ns1:Responsibility>BPI_WEB_SERVICE_USER</ns1:Responsibility>';
		xml_request_data+='<ns1:RespApplication>XXBPI</ns1:RespApplication>';
		xml_request_data+='<ns1:SecurityGroup>STANDARD</ns1:SecurityGroup>';
		xml_request_data+='<ns1:NLSLanguage>AMERICAN</ns1:NLSLanguage>';
		xml_request_data+=' <ns1:Org_Id>82</ns1:Org_Id>';
		xml_request_data+='</ns1:SOAHeader>';
		xml_request_data+=' <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" soap:mustUnderstand="1"><wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header>';
		xml_request_data+='<soap:Body xmlns:ns2="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/order_history/">';
		xml_request_data+=' <ns2:InputParameters>';
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
		 var url = bpi_com_obj.web_api_url;		 
					jQuery.ajax({
						type: "POST",
						url: url,
						 data: "xml_data="+xml_request_data,
						dataType: "xml",
						crossDomain: true,
						processData: false,
						// contentType: "text/xml; charset=\"utf-8\"",
						 
						success: function (data) {
							  $(".loader").hide();
							 OrderHistory.ApiProcessDisplayOrderHistoryData(data);
						},
						error: function (msg) {
							 $(".loader").hide();
							// alert("Failed: " + msg.status + ": " + msg.statusText);
						}
					});  
	}  ,
	ValidateDateValues:function(date_field,val,id)
	{
		var flag=true;
		if($.trim(val)!='')
		{
	 
			exp_arr=val.split("/");
			if(exp_arr.length!=3)
			{
				alert(" Please Enter the "+date_field+" Format as mm/dd/yyyy");
				$("#"+id).focus();
				return false;
			}
			var mm=exp_arr[0];
			var dd=exp_arr[1];
			var yyyy=exp_arr[2];
			if(mm.length!=2)
			{
				alert(" Please Enter the "+date_field+" Format as mm/dd/yyyy");
				$("#"+id).focus();
				flag=false;
				return false;
			}
			else if(mm>12)
			{
				alert(" Please Enter the "+date_field+" Format as mm/dd/yyyy");
				$("#"+id).focus();
				flag=false;
				return false;
			}
			else if(dd>31)
			{
				alert(" Please Enter the "+date_field+" Format as mm/dd/yyyy");
				$("#"+id).focus();
				flag=false;
				return false;
			}
			else if(dd.length!=2)
			{
				alert(" Please Enter the "+date_field+" Format as mm/dd/yyyy");
				flag=false;
				return false;
			}
			else if(yyyy.length!=4)
			{
				alert(" Please Enter the "+date_field+" Format as mm/dd/yyyy");
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
			 
			 var X_RESPONSE_STATUS=$(xml).find('X_RESPONSE_STATUS').text();//NF
			 var X_RESPONSE_MESSAGE=$(xml).find('X_RESPONSE_MESSAGE').text();
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
			 $(xml).find('X_ORDER_HISTORY').each(function(){
                     $(this).find("X_ORDER_HISTORY_ITEM").each(function(){
					 
                        var ORDER_NUMBER= $(this).find("ORDER_NUMBER").text();
					 
                        var CUST_PO_NUMBER= $(this).find("CUST_PO_NUMBER").text();
                        var ORDERED_DATE= $(this).find("ORDERED_DATE").text();
                        var SHIP_DATE= $(this).find("SHIP_DATE").text();
                        var TOTAL_LINES= $(this).find("TOTAL_LINES").text();
                        var ORDERED_PIECES= $(this).find("ORDERED_PIECES").text();
                        var SHIPPED_PIECES= $(this).find("SHIPPED_PIECES").text(); 
                        var CANCELLED_PIECES= $(this).find("CANCELLED_PIECES").text(); 
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
						
						 html+="<tr id="+tr_id+">"
						 
                         html+='<td> '+CUST_PO_NUMBER+' </td> ';
						  html+='<td><a href="#" onclick="OrderHistory.CallOrderDetailAPI(\''+ORDER_NUMBER+'\',\''+SHIPPED_PIECES+'\');">'+ORDER_NUMBER+'</a></td>';
                        html+='<td sorttable_customkey="'+ sorttableOrderedDate +'000000">'+orderedDate+'</td>';
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
					});
					  
					$("#order_list_tbl tbody tr").remove();
					$("#order_list_tbl tbody").append(html); 
					
					 
			// let the plugin know that we made a update
					//$("#order_list_tbl").trigger("update");
				 	// sorttable.makeSortable(newTableObject);
			 });
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
	},
	CallOrderDetailAPI:function(P_SALES_ORDER_NUM,SHIPPED_PIECES)
	{
		var  xml_request_data='';
	  $("#shipping-details").show();
		   if(SHIPPED_PIECES=="0" || SHIPPED_PIECES==0)
		   {
			   $("#shipping-details").hide();
		   }
		 $("#div_order_history").hide();
		 $("#div_order_detail").show();
		 $("#div_shipping_detail").hide();
		$("#dtl_sales_order_no").html("");
			   $("#dtl_order_date").html("");
			   $("#dtl_po_no").html("");
			   $("#dtl_sales_date").html("");
			   $("#dtl_sales_order_no1").html("");
			   $("#dtl_ship_addr").html("");
		$("#dtl_order_list_tbl tbody tr").remove();
				xml_request_data+='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
				xml_request_data+='<soap:Header xmlns:ns1="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/">';
				xml_request_data+='<ns1:SOAHeader>';
				xml_request_data+='<ns1:Responsibility>BPI_WEB_SERVICE_USER</ns1:Responsibility>';
				xml_request_data+='<ns1:RespApplication>XXBPI</ns1:RespApplication>';
				xml_request_data+='<ns1:SecurityGroup>STANDARD</ns1:SecurityGroup>';
				xml_request_data+='<ns1:NLSLanguage>AMERICAN</ns1:NLSLanguage>';
				xml_request_data+='<ns1:Org_Id>82</ns1:Org_Id>';
				xml_request_data+='</ns1:SOAHeader>';
				xml_request_data+='<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" soap:mustUnderstand="1"><wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header>';
				xml_request_data+='<soap:Body xmlns:ns2="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/order_detail/">';
				xml_request_data+='<ns2:InputParameters>';
				xml_request_data+='<ns2:P_SALES_ORDER_NUM>'+P_SALES_ORDER_NUM+'</ns2:P_SALES_ORDER_NUM>';
				xml_request_data+='</ns2:InputParameters>';
				xml_request_data+='</soap:Body>';
				xml_request_data+='</soap:Envelope>';
				 var url = bpi_com_obj.web_api_url;		 
					jQuery.ajax({
						type: "POST",
						url: url,
						 data: "xml_data="+xml_request_data,
						dataType: "xml",
						crossDomain: true,
						processData: false,
						// contentType: "text/xml; charset=\"utf-8\"",
						 
						success: function (data) {
							 
							 OrderHistory.ApiProcessOrderDetailAPI(data);
						},
						error: function (msg) {
							// alert("Failed: " + msg.status + ": " + msg.statusText);
						}
					});  
	},
	ApiProcessOrderDetailAPI:function(xml)
	{
		   
	try {
			 html="";
			 tr_id=1;
			   var X_RESPONSE_STATUS= $(xml).find("X_RESPONSE_STATUS").text();
			   var X_RESPONSE_MESSAGE= $(xml).find("X_RESPONSE_MESSAGE").text();
			   var X_SALES_ORDER_NUM= $(xml).find("X_SALES_ORDER_NUM").text();
			   var X_PO_NUM= $(xml).find("X_PO_NUM").text();
			   var X_ORDER_DATE= $(xml).find("X_ORDER_DATE").text();
			   var X_SHIP_TO_NUMBER= $(xml).find("X_SHIP_TO_NUMBER").text();
			   var X_SHIP_TO_LINE1= $(xml).find("X_SHIP_TO_LINE1").text();
			   var X_SHIP_TO_LINE2= $(xml).find("X_SHIP_TO_LINE2").text();
			   var X_SHIP_TO_LINE3= $(xml).find("X_SHIP_TO_LINE3").text();
			   var X_SHIP_TO_CITY= $(xml).find("X_SHIP_TO_CITY").text();
			   var X_SHIP_TO_STATE= $(xml).find("X_SHIP_TO_STATE").text();
			   var X_SHIP_TO_COUNTRY= $(xml).find("X_SHIP_TO_COUNTRY").text();
			   var X_SHIP_TO_POSTAL_CODE= $(xml).find("X_SHIP_TO_POSTAL_CODE").text();
			   
			   $("#div_order_detail #dtl_sales_order_no").html("# " +X_SALES_ORDER_NUM);
			   $("#div_order_detail #dtl_order_date").html(X_ORDER_DATE);
			   $("#div_order_detail #dtl_po_no").html(X_PO_NUM);
			   $("#div_order_detail #dtl_sales_date").html(X_PO_NUM);
			   $("#div_order_detail #dtl_sales_order_no1").html(X_SALES_ORDER_NUM);
			   var dtl_ship_addr=X_SHIP_TO_NUMBER+"</br>"+X_SHIP_TO_LINE1+"</br>"+X_SHIP_TO_LINE2+" "+X_SHIP_TO_LINE3;
			   dtl_ship_addr+=X_SHIP_TO_CITY+"</br>"+X_SHIP_TO_STATE+" "+X_SHIP_TO_POSTAL_CODE;
			   $("#div_order_detail #dtl_ship_addr").html(dtl_ship_addr);
			   
			 $(xml).find('X_ORDER_DETAIL').each(function(){
                     $(this).find("X_ORDER_DETAIL_ITEM").each(function(){
					 
                        var LINE_NUMBER= $(this).find("LINE_NUMBER").text();
                        var PART_NUMBER= $(this).find("PART_NUMBER").text();
                        var DESCRIPTION= $(this).find("DESCRIPTION").text();
                        var QUANTITY_ORDERED= $(this).find("QUANTITY_ORDERED").text();
                        var QUANTITY_SHIPPED= $(this).find("QUANTITY_SHIPPED").text();
                        var QUANTITY_CANCELLED= $(this).find("QUANTITY_CANCELLED").text();
                        var WAREHOUSE_CODE= $(this).find("WAREHOUSE_CODE").text();
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
					});
					 
					 
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
			 });
			  
		    }
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ApiProcessDisplayOrderHistoryData";
			  alert(message);
		  }  
	},
	CallShippingDetailAPI:function(P_SALES_ORDER_NUM)
	{
 
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
    xml_request_data+='<soap:Header xmlns:ns1="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/">';
        xml_request_data+='<ns1:SOAHeader>';
            xml_request_data+='<ns1:Responsibility>BPI_WEB_SERVICE_USER</ns1:Responsibility>';
            xml_request_data+='<ns1:RespApplication>XXBPI</ns1:RespApplication>';
            xml_request_data+='<ns1:SecurityGroup>STANDARD</ns1:SecurityGroup>';
           xml_request_data+=' <ns1:NLSLanguage>AMERICAN</ns1:NLSLanguage>';
             xml_request_data+=' <ns1:Org_Id>82</ns1:Org_Id>';
        xml_request_data+='</ns1:SOAHeader>';
    xml_request_data+='<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" soap:mustUnderstand="1"><wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header>';
    xml_request_data+='<soap:Body xmlns:ns2="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/shipping_details/">';
        xml_request_data+='<ns2:InputParameters>';
            xml_request_data+='<ns2:P_ORDER_NUM>'+P_SALES_ORDER_NUM+'</ns2:P_ORDER_NUM>';
       xml_request_data+=' </ns2:InputParameters>';
   xml_request_data+=' </soap:Body>';
xml_request_data+='</soap:Envelope>';



			 
				 var url = bpi_com_obj.web_api_url;		 
					jQuery.ajax({
						type: "POST",
						url: url,
						 data: "xml_data="+xml_request_data,
						dataType: "xml",
						crossDomain: true,
						processData: false,
						// contentType: "text/xml; charset=\"utf-8\"",
						 
						success: function (data) {
							 
							 OrderHistory.APIProcessShippingDetailAPI(data);
						},
						error: function (msg) {
							// alert("Failed: " + msg.status + ": " + msg.statusText);
						}
					});  
	},
	APIProcessShippingDetailAPI:function(xml)
	{
		 $("#div_order_history").hide();
		 $("#div_order_detail").hide();
		 $("#div_shipping_detail").show();
		   
	try {
			 html="";
			 tr_id=1;
			   var X_RESPONSE_STATUS= $(xml).find("X_RESPONSE_STATUS").text();
			   var X_RESPONSE_MESSAGE= $(xml).find("X_RESPONSE_MESSAGE").text();
				if(X_RESPONSE_STATUS=="E")
				{
					alert(X_RESPONSE_MESSAGE);
					OrderHistory.HandleBackToOrders();
				}
			    var X_SALES_ORDER_NUM= $(xml).find("SALES_ORDER_NUM ").text();
			   var X_PO_NUM= $(xml).find("PO_NUM").text();
			   var X_ORDER_DATE= $(xml).find("ORDER_DATE").text();
			   var X_SHIP_TO_NUMBER= $(xml).find("SHIP_TO_NUMBER").text();
			   var X_SHIP_TO_LINE1= $(xml).find("SHIP_TO_ADDRS_LINE1").text();
			   var X_SHIP_TO_LINE2= $(xml).find("SHIP_TO_ADDRS_LINE2").text();
			   var X_SHIP_TO_LINE3= $(xml).find("SHIP_TO_ADDRS_LINE3").text();
			   var X_SHIP_TO_CITY= $(xml).find("SHIP_TO_CITY").text();
			   var X_SHIP_TO_STATE= $(xml).find("SHIP_TO_STATE").text();
			   var X_SHIP_TO_COUNTRY= $(xml).find("SHIP_TO_COUNTRY").text();
			   var X_SHIP_TO_POSTAL_CODE= $(xml).find("SHIP_TO_POSTAL_CODE").text();
			   
			   $("#div_shipping_detail #dtl_sales_order_no").html("# " +X_SALES_ORDER_NUM);
			   $("#div_shipping_detail #dtl_order_date").html(X_ORDER_DATE);
			   $("#div_shipping_detail #dtl_po_no").html(X_PO_NUM);
			   $("#div_shipping_detail #dtl_sales_date").html(X_PO_NUM);
			   $("#div_shipping_detail #dtl_sales_order_no1").html(X_SALES_ORDER_NUM);
			   var dtl_ship_addr=X_SHIP_TO_NUMBER+""+X_SHIP_TO_LINE1+"</br>"+X_SHIP_TO_LINE2+" "+X_SHIP_TO_LINE3;
			   dtl_ship_addr+=X_SHIP_TO_CITY+"</br>"+X_SHIP_TO_STATE+" "+X_SHIP_TO_COUNTRY+" "+X_SHIP_TO_POSTAL_CODE;
			   $("#div_shipping_detail #dtl_ship_addr").html(dtl_ship_addr);
			   
						//shipment main div starts
					
                    
				
				
				var html="";
				ship_cnt=0;
			 $(xml).find('X_SHIP_DETAIL').each(function(){
				 
					var ship_act_class="";
					if( $(this).find("X_SHIP_DETAIL_ITEM").length==1)
					{
						ship_act_class=" shipActiveBlock ";
					}
				 //run for each shipment
                     $(this).find("X_SHIP_DETAIL_ITEM").each(function(){
						 ship_cnt++;
						   var SHIPMENT_NUM= $(this).find("SHIPMENT_NUM").text();
						      var SHIPPED_DATE= $(this).find("SHIPPED_DATE").text();
						   html+=' <div class="panel panel-default"> ';
						   
							html+='<div class="panel-heading '+ship_act_class+'">';
                        html+=' <h3 class="panel-title"> ';
                        html+=' <a class="accordion-toggle" data-toggle="collapse"  href="#collapseOne'+ship_cnt+'" aria-expanded="false">SHIPMENT # '+SHIPMENT_NUM+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SHIP DATE: '+SHIPPED_DATE+' <i class="fa fa-chevron-down pull-left" id="ship_i_'+ship_cnt+'"></i></a>';
                        html+=' </h3>';
						html+='  </div> ';
                       //shipment main div ends starts 
					   	  html+='<div id="collapseOne'+ship_cnt+'" class="panel-collapse collapse" style="height: 0px;" aria-expanded="false">';
					  //run for each trackinig
					  
					 
					    var SHIPPED_FROM= $(this).find("SHIPPED_FROM").text();
					    var CARRIER= $(this).find("CARRIER").text().toUpperCase();
					    var MODE_OF_TRANSPORT= $(this).find("MODE_OF_TRANSPORT").text();
					    var WAY_BILL_NUMBER= $(this).find("WAY_BILL_NUMBER").text();
					    var TRACKING_NUMBER= $(this).find("TRACKING_NUMBER").text();
						var trk_way_bill_txt="";
						trk_way_bill_txt=" TRACKING # ";
						var trk_found=1;
						if(empty(TRACKING_NUMBER))
						{
							trk_found=0;
							TRACKING_NUMBER=WAY_BILL_NUMBER;
							trk_way_bill_txt=" Pro # ";
						}
				 
				 
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
									  
									   html+=' <table class="table sortable" id="summaryTable'+ship_cnt+'">';
								 
									  html+='<thead>';
									  
										html+='<tr class="heading">';
										 
											  html+='<th class="partnumber">PART NUMBER<span class="sortdown"><i class="fa fa-sort-desc" aria-hidden="true"></i></span></th>';
											  html+='<th class="desc" disabled>DESCRIPTION</th>';
											  html+='<th class="shippedpieces">SHIPPED PIECES<span class="sortdown"><i class="fa fa-sort-desc" aria-hidden="true"></i></span></th>';
										html+='</tr>';
									  html+='</thead>';
									  html+='<tbody>';
									
								var tot_shipped=0;		
						  $(this).find("SHIP_LINE_TABLE_ITEM").each(function(){
							  	html+='<tr>';
							  var PART_NUMBER=$(this).find("PART_NUMBER").text();
							  var PART_DESCRIPTION=$(this).find("PART_DESCRIPTION").text();
							  var SHIPPED_QTY=$(this).find("SHIPPED_QTY").text();
							  if(!empty(SHIPPED_QTY))
							  {
								  tot_shipped=tot_shipped+parseInt(SHIPPED_QTY);
							  }
							    html+='<td>'+PART_NUMBER+'</td>';
										  html+='<td>'+PART_DESCRIPTION+'</td>';
										  html+='<td>'+SHIPPED_QTY+'</td>';
								html+='</tr>'
							  })
							  html+=' </tbody>'
							  html+=' <tfoot>'
								 	html+=' <tfoot>'
								 	html+=' <tr><td colspan="2"><b>TOTAL SHIPPED PIECES</b></td><td><b>'+tot_shipped+'</b></td></tr>';
										html+=' </tfoot>'
										html+='</table>';
						 html+='</div>';//close of ShippedDetails
						 	html+='</div>';//close of panel-body
							html+='</div>';//close ofcollapseOne1
                        	html+='</div>';//close div panel panel-default
							
						});
                        	
                        
                        	
					});
					 $("#accordion1").html(html);
					 if(ship_cnt==1)
						setTimeout(function(){$("#ship_i_1").trigger("click");}, 500); 
				for(p=1;p<=ship_cnt;p++)
				{					
				sorttable.makeSortable(document.getElementById("summaryTable"+p));
				}
			 
			  
		    }
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ApiProcessDisplayOrderHistoryData";
			  alert(message);
		  }  
	}
	
}
function getYearMonthUIValue(val)
{
	if($.trim(val)!='')
	{
		exp_arr=val.split("/");
		if(exp_arr.length!=3)
		{
			alert("1.Please Enter the Date Format as mm/dd/yyyy");
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