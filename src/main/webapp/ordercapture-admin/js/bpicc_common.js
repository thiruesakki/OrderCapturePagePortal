var userRequestID="";  
$(window).on('load', function () {
	 userRoleBasedAccess();
	 BpiccCommon.GetUserRoleDetails();
   // BpiccCommon.ProcessGetUserRoleDetails("S");
	 BpiccCommon.LoadProperPageAfterLogin();
   
	$('.logoutBlock .login').on('click', function () {
		window.location.reload(true)
	})
	
	userRequestID=getCookie("userID");
	userName();
})

 // selectAccountPrefix="";
BpiccCommonClass=function()
{
	this.api_usr="IPO";
	// Staging PW
	this.api_pwd="oracle123";
	// Production PW
	// this.api_pwd="Bp1W3bS3rv1ce";
	
	this.bill_to_location="";
	this.ship_to_location="";
	this.accountNo="";
	this.place_order_right_exists="0";
	this.default_dc="EDC";
 
  	this.web_api_url		= "/OracleApiServlet";
//	this.web_mssql_api_url	= "/REST/WebService/";  
//	this.web_mssql_api_url	= "/REST/WebService/"; //old source code   
  	this.web_mssql_api_url	= "/OrderCapturePortal/REST/WebService/";//changed source code
  	this.web_oracle_api_url	= "/OrderCapturePortal/REST/OracleWebService/";
	  /*  this.web_api_url="http://uswodsvr702v:9080/OracleApiServlet";  
 	setCookie("CAPI_ALL_SHIP_TO_ACCOUNTS","20520,5239,Z0205,Z6664,Z6666");
		bill_to_ship_to_obj=new Object();
		 bill_to_ship_to_obj['Z0205']='5909';
		 bill_to_ship_to_obj['Z6664']='Z6664';
		 bill_to_ship_to_obj['Z6666']='3333';
		 bill_to_ship_to_obj['5239']='5240';
		 bill_to_ship_to_obj['Z6276']='20859';
		 bill_to_ship_to_obj['9666']='9666';
		 bill_to_ship_to_obj['20520']='20520';
		this.place_order_right_exists="1";

		 setCookie("bill_to_ship_to_obj",JSON.stringify(bill_to_ship_to_obj));
		 setCookie("selected_ship_to_account_no","20520");
		 setCookie("selected_bill_to_location","20520");  
		this.bill_to_location="20520";
		this.ship_to_location="20520";
  */
	 
	this.error_cnt=0;
}
bpi_com_obj=new BpiccCommonClass();
 
BpiccCommon=
{
	GetUserIdInfo:function()
	{
		  var userID = 1;
		  if(typeof(clientUserId)!="undefined")
			  userID=clientUserId;
		  
		  if(userID=="plcOrd@ennvee.com" || userID=="bpiFull@ennvee.com")
			  userID=1; 
		  if(userID=="chkStock@ennvee.com")
			  userID=2;
		  return userID;
	},
	GetUserRoleDetails:function()
	{
		var userID=BpiccCommon.GetUserIdInfo();
		  if(userID!="anonymous" && !empty(userID))
		  {
		  var url = bpi_com_obj.web_mssql_api_url+"GetUserRoleDetails";
			jQuery.ajax({
					type: "GET",
					url: url,
					 dataType: "json",
					data:"userID="+userID,
					success: function (data1) {
						
						BpiccCommon.ProcessGetUserRoleDetails(data1);
					},
					error: function (msg) {
						 BpiccCommon.HandleApiCals();
						  //alert("Failed: " + msg.status + ": " + msg.statusText);
					}
				});  
		  }
	},
	ProcessGetUserRoleDetails:function(responce)
	{
//		responce=JSON.parse(responce);
		if(!empty(responce))
		{			
			
			 roles=responce.object['roles'];	
			  BpiccCommon.GetRightsData(roles);
			if(!empty(getCookie("selected_ship_to_account_no")))
			{
				bpi_com_obj.ship_to_location=getCookie("selected_ship_to_account_no")
			}if(!empty(getCookie("selected_bill_to_location")))
			{
				bpi_com_obj.bill_to_location=getCookie("selected_bill_to_location");
				
			}
		 
			
		}
	  BpiccCommon.HandleApiCals();
	 
	},
	HandleApiCals:function()
	{
		if($("#page_type").val()=='select_account')
		  {
			  var CAPI_ALL_SHIP_TO_ACCOUNTS=getCookie("CAPI_ALL_SHIP_TO_ACCOUNTS");
			  if(empty(CAPI_ALL_SHIP_TO_ACCOUNTS))
			  {
				  // alert("Error While getting CAPI_ALL_SHIP_TO_ACCOUNTS");
				  
				  return false;
			  }
			  SelectAccount.GetMultipleShiptoAddressForShipTo(CAPI_ALL_SHIP_TO_ACCOUNTS);
		 
		  }
		  else if($("#page_type").val()=='place_order')
		  {
			
			if(empty(getCookie("selected_ship_to_account_no")))
			{
				alert("Account information is currently unavailable.  Please try again in a few minutes or contact customer service at 800-323-0354 for assistance.  We apologize for any inconvenience.");
				window.location.href = selectAccountPrefix;
				return false;
			}
			BpiccPlaceOrder.GetShippingMethodTypes();
			BpiccPlaceOrder.ApiGetShippingInfo(getCookie("selected_ship_to_account_no"));
			BpiccPlaceOrder.GetCountryStateList();
		   if(!empty(getCookie("selected_ship_to_wc")))
		   {
			   bpi_com_obj.default_dc=getCookie("selected_ship_to_wc");
		   }
			 $('input[name="AllDCinputAvail"][value="'+bpi_com_obj.default_dc+'"]')[0].checked = true;
			 
			 	
			 	 setTimeout(function(){ $("#inputPo").focus();}, 1000); 
			 if(!empty(getCookie("selected_ship_to_account_no")))
			   {
			   $(".locationPane").html('<p><span class="numberField">'+getCookie("selected_ship_to_account_no")+'</span><span>  '+getCookie("selected_ship_to_account_address")+'</span></p>');
			   }	 
				
		  }
		  else if($("#page_type").val()=='check_stock')
		  {
			 if(empty(getCookie("selected_ship_to_account_no")))
			{
				alert("Account information is currently unavailable.  Please try again in a few minutes or contact customer service at 800-323-0354 for assistance.  We apologize for any inconvenience.");
				window.location.href = selectAccountPrefix;
				return false;
			}
			 
				if(!empty(getCookie("selected_ship_to_wc")))
			   {
				   bpi_com_obj.default_dc=getCookie("selected_ship_to_wc");
			   }
				$('input[name="AllDCinputAvail"][value="'+bpi_com_obj.default_dc+'"]')[0].checked = true;
			   if(!empty(getCookie("selected_ship_to_account_no")))
			   {
			   $(".locationPane").html('<p><span class="numberField">'+getCookie("selected_ship_to_account_no")+'</span><span>  '+getCookie("selected_ship_to_account_address")+'</span></p>');
			   }
			    setTimeout(function(){ $("#partNum_2").focus();}, 1000); 
				 
		  }
		  else if($("#page_type").val()=='order_history')
		  {
			   if(empty(getCookie("selected_ship_to_account_no")))
			{
				alert("Account information is currently unavailable.  Please try again in a few minutes or contact customer service at 800-323-0354 for assistance.  We apologize for any inconvenience.");
				window.location.href = selectAccountPrefix;
				return false;
			}
			
			 OrderHistory.LoadProperDatesAndCallAPI();
			 getCookie("selected_ship_to_account_address");
			   if(!empty(getCookie("selected_ship_to_account_no")))
			   {
			   $(".locationPane").html('<p><span class="numberField">'+getCookie("selected_ship_to_account_no")+'</span><span>  '+getCookie("selected_ship_to_account_address")+'</span></p>');
			   }	 
		  }


	},
	includeJsFilesMannually:function (js_path)
	{
		$(document.createElement('script')).attr('src',js_path).attr('type', 'text/javascript').appendTo('head'
);
	},
	GetRightsData:function(roles)
	{
		var place_order_right_exists=0;
		$.each(roles,function(k,v)
		{
			
			 roleName=v['roleName'];
			 if(roleName=="StockOrder" || roleName=='EmergencyOrder'   || roleName=='DropShip')
			 {
				 place_order_right_exists++;
			 }
			 
		});
		bpi_com_obj.place_order_right_exists=place_order_right_exists;
	},
	LoadProperPageAfterLogin:function()
	{
		
			 setCookie("CAPI_ALL_SHIP_TO_ACCOUNTS","");
			 setCookie("selected_ship_to_account_no","");
			setCookie("selected_bill_to_location","");
			setCookie("bill_to_ship_to_obj","");
			
			bill_to_ship_to_obj=new Object();
		 
			var userID=BpiccCommon.GetUserIdInfo();
			   if(userID!="anonymous" && !empty(userID))
			  {
				  var CAPI_ALL_SHIP_TO_ACCOUNTS="";
					var url = bpi_com_obj.web_mssql_api_url+"GetUserRoleDetails";
					jQuery.ajax({
							type: "GET",
							url: url,
							 dataType: "json",
							data:"userID="+userID,
							success: function (responce) {
								
								
									if(!empty(responce))
									{			
										cust_data=responce.object['customer'];	
										roles=responce.object['roles'];	
										 BpiccCommon.GetRightsData(roles);
										var billToSiteID="";
										var shipToSiteID="";
										var cnt=0;
										$.each(cust_data,function(k,v)
										{
											
											 billToSiteID=v['billToSiteID'];
											 shipToSiteID=v['shipToSiteID'];
											CAPI_ALL_SHIP_TO_ACCOUNTS+=shipToSiteID+",";
											bill_to_ship_to_obj[shipToSiteID]=billToSiteID;
											cnt++;
										});
												 
										setCookie("CAPI_ALL_SHIP_TO_ACCOUNTS",CAPI_ALL_SHIP_TO_ACCOUNTS);
										setCookie("bill_to_ship_to_obj",JSON.stringify(bill_to_ship_to_obj));
										
										 if(cnt==1)
										 {
											  setCookie("selected_ship_to_account_no",shipToSiteID);
											 setCookie("selected_bill_to_location",billToSiteID);
											 	BpiccCommon.GetSingleAccountAddress(CAPI_ALL_SHIP_TO_ACCOUNTS);
											   
										 }
										else
										{
										
											  window.location.href = selectAccountPrefix;
										}	
									}
							},
							error: function (msg) {
								  
							}
						});  
			  }
		 
		 
	},
	 GetSingleAccountAddress:function(ship_to_acc)
	{
			ship_to_data="";
			split_arr=ship_to_acc.split(",");
		 
			for(i=0;i<split_arr.length;i++)
			{
				var ship_to_code=$.trim(split_arr[i]);
				if(!empty(ship_to_code))
				{
					ship_to_data+='<ns2:P_SHIP_TO_LOCTION_ITEM>';
					ship_to_data+='<ns2:SHIP_TO>'+ship_to_code+'</ns2:SHIP_TO>';
					ship_to_data+='</ns2:P_SHIP_TO_LOCTION_ITEM>';
				}
				
			}
			xml_request_data='';
			xml_request_data+='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
			xml_request_data+='<soap:Header xmlns:ns1="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/">';
			xml_request_data+='<ns1:SOAHeader>';
			xml_request_data+='<ns1:Responsibility>BPI_WEB_SERVICE_USER</ns1:Responsibility>';
			xml_request_data+='<ns1:RespApplication>XXBPI</ns1:RespApplication>';
			xml_request_data+='<ns1:SecurityGroup>STANDARD</ns1:SecurityGroup>';
			xml_request_data+='<ns1:NLSLanguage>AMERICAN</ns1:NLSLanguage>';
			xml_request_data+='<ns1:Org_Id>82</ns1:Org_Id>';
			xml_request_data+=' </ns1:SOAHeader>';
			xml_request_data+='<wsrm:Request xmlns:wsrm="http://www.oasis-open.org/committees/wsrm/schema/1.1/SOAP1.1" xmlns:SOAP="http://schemas/xmlsoap.org/soap/envelope/" SOAP:mustUnderstand="1"><wsrm:MessageId groupId="20170321-224426-176.1@uswodapp013.brakepartsinc.com"/><wsrm:ExpiryTime>2017-03-21T22:44:36</wsrm:ExpiryTime><wsrm:ReplyPattern><wsrm:Value>Poll</wsrm:Value></wsrm:ReplyPattern><wsrm:AckRequested/><wsrm:DuplicateElimination/></wsrm:Request><wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" soap:mustUnderstand="1"><wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header>';
			xml_request_data+='<soap:Body xmlns:ns2="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/get_ship_to_address/">';
			xml_request_data+=' <ns2:InputParameters>';
			xml_request_data+='<ns2:P_SHIP_TO_LOCTION>';
			
			xml_request_data+=ship_to_data;
			
			xml_request_data+=' </ns2:P_SHIP_TO_LOCTION>';
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
							 
							 BpiccCommon.ProcessGetSingleAccountAddressForShipTo(data);
						},
						error: function (msg) {
								 
//							alert("Failed: " + msg.status + ": " + msg.statusText);
						}
					});  
	} ,
	ProcessGetSingleAccountAddressForShipTo:function(xml)
	{
		var bill_to_ship_to_str=getCookie("bill_to_ship_to_obj");
		 var bill_to_ship_to_obj=JSON.parse(bill_to_ship_to_str);
		 if(empty(bill_to_ship_to_obj))
		 {
			 alert("Error while Getting bill_to_ship_to_obj");return false;
		 }
	 
		  try {
			 
			var li_val="";
			 $(xml).find('X_SHIP_TO_ADDRESS').each(function(){
                     $(this).find("X_SHIP_TO_ADDRESS_ITEM").each(function(){
					 
                        var DEFAULT_ORG_CODE= $(this).find("DEFAULT_ORG_CODE").text();
                        var SHIP_TO= $(this).find("SHIP_TO").text();
						var BILL_TO_FOR_SHIP_TO=bill_to_ship_to_obj[SHIP_TO];
                        var DROP_SHIP_FLAG= $(this).find("DROP_SHIP_FLAG").text();
                        var ACCT_NAME= $(this).find("ACCT_NAME").text();
                        var ACCT_NUM= $(this).find("ACCT_NUM").text();
                        var PARTY_SITE_ID= $(this).find("PARTY_SITE_ID").text();
                        var ADDRESS_LINE1= $(this).find("ADDRESS_LINE1").text();
                        var ADDRESS_LINE2= $(this).find("ADDRESS_LINE2").text();
                        var ADDRESS_LINE3= $(this).find("ADDRESS_LINE3").text();
                        var CITY= $(this).find("CITY").text();
                        var STATE= $(this).find("STATE").text();
                        var POSTAL_CODE= $(this).find("POSTAL_CODE").text();
                        var COUNTRY= $(this).find("COUNTRY").text();
					 
						 var address=ACCT_NAME+" - "+ADDRESS_LINE1+" "+ADDRESS_LINE2+" "+ADDRESS_LINE3+" "+CITY+" "+STATE+" "+POSTAL_CODE+" "+COUNTRY;
					 
							var selected_ship_to_account_address=address;
		 					 setCookie("selected_ship_to_account_address",selected_ship_to_account_address);
							setCookie("selected_ship_to_wc",DEFAULT_ORG_CODE);
		 
					});
					 	 
			 });
			window.location.href = selectAccountPrefix + "order-history.html";	
		    }
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ProcessApiGetShippingInfoXml";
			  alert(message);
		  }  
	} 
}
	 



 function empty(mixed_var)
{
	
 
	var key;    
	if (mixed_var === "" ||
		mixed_var === 0 ||
		mixed_var === "0" ||
		mixed_var === null ||        mixed_var === false ||
		typeof mixed_var === 'undefined'
	){
		return true;
	} 
	if (typeof mixed_var == 'object') {
		for (key in mixed_var) {
			return false;
		}        return true;
	}
 
	return false;
}
function acceptNumbersOnlyForModule(evt)
{

  var charCode = (evt.which) ? evt.which : evt.keyCode;
 
  if (charCode > 31 && (charCode != 46  && charCode != 37 && charCode != 39  && (charCode < 48 || charCode > 57)))
        return false; 
	else
		return true;
   
}
function setCookie(c_name,value,expiredays)
{
	/*   expiredays=1;
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)

	document.cookie=c_name+ "=" +escape(value)+	((expiredays==null) ? "" : ";expires="+exdate.toGMTString
())+"; path=/";
	 */
		var domain_name=window.location.href.split("select-account")[0];
	 // domain_name="http://localhost/bpi-online/";
		// alert(domain_name);
		$.cookie(c_name,value, {
	   expires : 1,           //expires in 10 days

	   path    : '/'           //The value of the path attribute of the cookie 
							   //(default: path of page that created the cookie).

	  // domain  : domain_name  //(default: domain of page that created the cookie).

	         //If set to true the secure attribute of the cookie
							   //will be set and the cookie transmission will
							   //require a secure protocol (defaults to false).
	});


} 
function getCookie(c_name)
{
	if (document.cookie.length>0)
	  {
	  c_start=document.cookie.indexOf(c_name + "=")
	  if (c_start!=-1)
		{ 
		c_start=c_start + c_name.length+1 
		c_end=document.cookie.indexOf(";",c_start)
		if (c_end==-1) c_end=document.cookie.length
		return unescape(document.cookie.substring(c_start,c_end))
		} 
	  }
	return "";
}
jQuery.fn.extend({
    isempty: function ()
	{
        var mixed_var = $(this).val();
	 
        var key;    
		if (mixed_var === "" ||
			mixed_var === 0 ||
			mixed_var === "0" ||
			mixed_var === null ||        mixed_var === false ||
			typeof mixed_var === 'undefined'
		){
			return true;
		} 
		if (typeof mixed_var == 'object') {
			for (key in mixed_var) {
				return false;
			}        return true;
		}
	 
		return false;
	}
});
function tarkaRound(number,position)
{
	var zeors = 1;
	for(var i =1; i<=position; i++)
	{		
		zeors = zeors * 10 ; 
	}
	return Math.round(number*zeors)/zeors;
}

function log(){
    
    if (confirm("Are you sure do you want to logout?")) {
    	document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    	document.cookie = "isadmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    	location.href = "http://localhost:8080/OrderCapturePortal/";
      
    } 
}
function userName(){
	 var userID = userRequestID;
	 console.log("userID"+userID);
	 var url = bpi_com_obj.web_mssql_api_url+"GetUserProfile";
		jQuery.ajax({
				type: "GET",
				url: url,
				 dataType: "json",
				data:"userID="+userID,
				success: function (data1) {
					console.log("GetUserProfile"+JSON.stringify(data1));
					var userObj = JSON.parse(data1.object);
					console.log("userObj"+userObj)
					var userFLName=userObj.firstName+" "+userObj.lastname;
					console.log("userFLName"+userFLName);
					var userLoginName=userFLName.charAt(0).toUpperCase() + userFLName.slice(1);
					console.log("userLoginName"+userLoginName); 
					if(userObj!= null){
						
						$('.userName').text("Hello, "+userLoginName);
					}
					else{
						
					}
				},
				error: function (msg) {
					 BpiccCommon.HandleApiCals();
					  alert("Failed1: " + msg.status + ": " + msg.statusText);
				}
			});
}
function userRoleBasedAccess(){
	var isAdminrole=getCookie("isAdminrole");
	 var isStockCheck=getCookie("isStockCheck");
	 var isViewOrderStatus=getCookie("isViewOrderStatus");
	 var isStockOrder=getCookie("isStockOrder");
	 var isReturns=getCookie("isReturns");
	 var isReturnsHistory=getCookie("isReturnsHistory");
	 var isPriceList=getCookie("isPriceList");
	 console.log(isReturns);
	 if(isAdminrole==1){
		 $('#admin_bpi').show();
		 $('#liadmin').show();
		 $('#priceList').show();
		 $('#lipriceList').show();
		}
		else{
			$('#admin_bpi').hide();
			 $('#liadmin').hide();
			 $('#priceList').hide();
			 $('#lipriceList').hide();
		}
	 if(isStockCheck==1){
		 $('#checkStock').show();
		 $('#licheckStock').show();
		}
		else{
			$('#checkStock').hide();
			 $('#licheckStock').hide();
		}
	 if(isViewOrderStatus==1){
		 $('#orderHistory').show();
		 $('#liorderHistory').show();
		 $('#newReturnsHistory').show();
		 $('#returnsHistory').show();
		 $('#lireturnsHistory').show();
		}
		else{
			 $('#orderHistory').hide();
			 $('#liorderHistory').hide();
			 $('#newReturnsHistory').hide();
			 $('#returnsHistory').hide();
			 $('#lireturnsHistory').hide();
		}
	 if(isStockOrder==1){
		 $('#placeOrder').show();
		 $('#liplaceOrder').show();
		}
		else{
			$('#placeOrder').hide();
			 $('#liplaceOrder').hide();
		}
	 if(isReturns==1){
		 $('#newReturns').show();
		 $('#returns').show();
		 $('#lireturns').show();
		}
		else{
			 $('#newReturns').hide();
			 $('#returns').hide();
			 $('#lireturns').hide();
		}
//	 if(isReturnsHistory==1){
//			 $('#newReturnsHistory').show();
//		 $('#returnsHistory').show();
//		 $('#lireturnsHistory').show();
//		}
//		else{
//			$('#newReturnsHistory').hide();
//			 $('#returnsHistory').hide();
//			 $('#lireturnsHistory').hide();
//		}
//	 if(isPriceList==1){
//		 $('#priceList').show();
//		 $('#lipriceList').show();
//		}
//		else{
//			$('#priceList').hide();
//			 $('#lipriceList').hide();
//		}
	 
	
}