var userRequestID=""; 
$(window).on('load', function () {
 
	 BpiccCommon.GetUserRoleDetails();
   // BpiccCommon.ProcessGetUserRoleDetails("S");
	 userRequestID=getCookie("userID");
//	 if(getSearchParams('q')!=null && getSearchParams('q')!=''){	 
//		 var requestID=Decoding(decodeURIComponent(getSearchParams('q')));
//		 userRequestID=requestID;
//		 console.log("userId"+requestID);
////		 setCookie("userID",requestID);
////		 getDonorDetails(requtid);
//	 }
	 BpiccCommon.LoadProperPageAfterLogin();//added new source code
	$('.logoutBlock .login').on('click', function () {
		window.location.reload(true)
	})
})

  selectAccountPrefix="";
BpiccCommonClass=function()
{
	this.api_usr="CAP";
	// Staging PW
	this.api_pwd="oracle123";

	// Production PW
	// this.api_pwd="Bp1W3bS3rv1ce";
	
	this.bill_to_location="";
	this.ship_to_location="";
	this.accountNo="";
	this.place_order_right_exists="0";
	this.default_dc="EDC";
 
//  	this.web_api_url		= "/OracleApiServlet";//old source code
  	this.web_api_url		= "/OrderCapturePortal/OracleApiServlet";//changed source code
//	this.web_mssql_api_url	= "/REST/WebService/"; //old source code   
  	this.web_mssql_api_url	= "/OrderCapturePortal/REST/WebService/";//changed source code
  	this.web_oracle_api_url	= "/OrderCapturePortal/REST/OracleWebService/";
  	this.distributor="0";

    /* includeJsFilesMannually("js/bpicc_error_msgs.js");
     this.web_api_url="http://localhost:8080/OracleApi/OracleApiServlet";  
     this.web_api_url="http://uswodsvr702v:9080/OracleApiServlet";  
 	setCookie("CAPI_ALL_SHIP_TO_ACCOUNTS","7893,20520,5239,Z0205,Z6664,Z6666");
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
		 setCookie("selected_ship_to_account_no","7893");
		 setCookie("selected_bill_to_location","7653");  
		this.bill_to_location="7653";
		this.ship_to_location="7893";     */
 
	 
	this.error_cnt=0;
}
bpi_com_obj=new BpiccCommonClass();
 
BpiccCommon=
{
	GetUserIdInfo:function()
	{
		  var userID = userRequestID;//Updated code
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
		if(userID==""||userID==null){
			userID=getCookie("userID");
		}
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
						  alert("Failed1: " + msg.status + ": " + msg.statusText);
					}
				});  
		  }
	},
	ProcessGetUserRoleDetails : function(responce) {
		// responce=JSON.parse(responce);
		if (!empty(responce)) {

			roles = responce.object['roles'];
			BpiccCommon.GetRightsData(roles);
			if (!empty(getCookie("selected_ship_to_account_no"))) {
				bpi_com_obj.ship_to_location = getCookie("selected_ship_to_account_no");
			}
			if (!empty(getCookie("selected_bill_to_location"))) {
				bpi_com_obj.bill_to_location = getCookie("selected_bill_to_location");

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
			
			if(empty(getCookie("selected_ship_to")))
			{
				alert("Account information is currently unavailable.  Please try again in a few minutes or contact customer service at 800-323-0354 for assistance.  We apologize for any inconvenience.");
				window.location.href = selectAccountPrefix;
				return false;
			}
			BpiccPlaceOrder.GetShippingMethodTypes();
			BpiccPlaceOrder.ApiGetShippingInfo(getCookie("selected_ship_to"));
			BpiccPlaceOrder.GetCountryStateList();
		//####### Added on 30-05-17 Handle Items Check from check Stock
			var cookie_part_obj_str=localStorage.getItem("cookie_part_obj");		   
	 
			  if(!empty(cookie_part_obj_str))
			  {
				  // var cookie_part_obj=JSON.parse(getCookie("cookie_part_obj"));
				 
				  var cookie_part_obj=JSON.parse(localStorage.getItem("cookie_part_obj"));
					BpiccPlaceOrder.AddItemsFromCheckStockPage(cookie_part_obj);
					   setCookie("cookie_part_obj","");
					localStorage.setItem("cookie_part_obj","");   
					 $('#reset_form').prop("disabled",true);
					 setTimeout(function(){ $("#reqQnty_2").prop("disabled",true);}, 500); 
					
			  }
		  //####### Added on 30-05-17 Handle Items Check from check Stock

		   if(!empty(getCookie("selected_ship_to_wc")))
		   {
			   bpi_com_obj.default_dc='EDC';
		   }
			 //$('input[name="AllDCinputAvail"][value="'+bpi_com_obj.default_dc+'"]')[0].checked = true;
			 
			 	
			 	 setTimeout(function(){ $("#inputPo").focus();}, 1000); 
			 if(!empty(getCookie("selected_ship_to")))
			   {
			   $(".locationPane").html('<p><span class="numberField">'+getCookie("selected_ship_to")+'</span><span>  '+getCookie("selected_ship_to_account_address")+'</span></p>');
			   }	 
				
		  }
		  else if($("#page_type").val()=='check_stock')
		  {
			 if(empty(getCookie("selected_ship_to")))
			{
				alert("Account information is currently unavailable.  Please try again in a few minutes or contact customer service at 800-323-0354 for assistance.  We apologize for any inconvenience.");
				window.location.href = selectAccountPrefix;
				return false;
			}
			 
				if(!empty(getCookie("selected_ship_to_wc")))
			   {
				   bpi_com_obj.default_dc=getCookie("selected_ship_to_wc");
			   }
			 
			   if(!empty(getCookie("selected_ship_to")))
			   {
			   $(".locationPane").html('<p><span class="numberField">'+getCookie("selected_ship_to")+'</span><span>  '+getCookie("selected_ship_to_account_address")+'</span></p>');
			   }
			    setTimeout(function(){ $("#partNum_2").focus();}, 1000); 
				 
		  }
		  else if($("#page_type").val()=='order_history'||$("#page_type").val()=='return_history')
		  {
			   if(empty(getCookie("selected_ship_to")))
			{
				alert("Account information is currently unavailable.  Please try again in a few minutes or contact customer service at 800-323-0354 for assistance.  We apologize for any inconvenience.");
				window.location.href = selectAccountPrefix;
				return false;
			}
			
//			 OrderHistory.LoadProperDatesAndCallAPI();
			 getCookie("selected_ship_to_account_address");
			   if(!empty(getCookie("selected_ship_to")))
			   {
			   $(".locationPane").html('<p><span class="numberField">'+getCookie("selected_ship_to")+'</span><span>  '+getCookie("selected_ship_to_account_address")+'</span></p>');
			   }	 
		  }


	},
	
	GetRightsData:function(roles)
	{
		var place_order_right_exists=0;
		var dist=0;
		$.each(roles,function(k,v)
		{
			
			 roleName=v['roleName'];
			 if(roleName=="StockOrder" || roleName=='EmergencyOrder'   || roleName=='DropShip')
			 {
				 place_order_right_exists++;
			 }
			 if(roleName=="Distributor"){
				 dist=1;
			 }
			 
		});
		bpi_com_obj.distributor=dist;
//		setCookie("distributor",dist);
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
//								console.log('Success case'+responce);
								
									if(!empty(responce))
									{			
										cust_data=responce.object['customer'];	
										roles=responce.object['roles'];	
										console.log("roles:"+JSON.stringify(roles));
										 BpiccCommon.GetRightsData(roles);
										var billToSiteID="";
										var shipToSiteID="";
										var orgID="";
										var cnt=0;
										$.each(cust_data,function(k,v)
										{
											
											 billToSiteID=v['billToSiteID'];
											 shipToSiteID=v['shipToSiteID'];
											 bpi_com_obj.ship_to_location=v['billToSiteID'];
											 bpi_com_obj.bill_to_location=v['shipToSiteID'];
											 orgID=v['orgID'];
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
											 setCookie("selected_org_id",orgID);
//											 console.log(orgID);
											 if($("#page_type").val()=='select_account'){
												 BpiccCommon.GetSingleAccountAddress(CAPI_ALL_SHIP_TO_ACCOUNTS);
											 }
											   
										 }
										else
										{
											setCookie("selected_ship_to_account_no",shipToSiteID);
											setCookie("selected_bill_to_location",billToSiteID);
											 setCookie("selected_org_id",orgID);
//											console.log(orgID);
											if($("#page_type").val()=='select_account'){
												SelectAccount.GetMultipleShiptoAddressForShipTo(CAPI_ALL_SHIP_TO_ACCOUNTS);
											}
//											BpiccCommon.GetSingleAccountAddress(CAPI_ALL_SHIP_TO_ACCOUNTS);
//											  window.location.href = selectAccountPrefix;
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
			var ship_to_code="";
			for(i=0;i<split_arr.length-1;i++)
			{
				if(i==0){
					ship_to_code=$.trim(split_arr[i]);
				}else{
					ship_to_code=ship_to_code+","+$.trim(split_arr[i]);
				}
//				var ship_to_code=$.trim(split_arr[i]);
//				if(!empty(ship_to_code))
//				{
//					ship_to_data+='<ns2:P_SHIP_TO_LOCTION_ITEM>';
//					ship_to_data+='<ns2:SHIP_TO>'+ship_to_code+'</ns2:SHIP_TO>';
//					ship_to_data+='</ns2:P_SHIP_TO_LOCTION_ITEM>';
//				}
			}
//			console.log('ship_to_code'+ship_to_code);
				 xml_request_data='';
	xml_request_data+='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"> ';
	xml_request_data+=' <soap:Header xmlns:ns1="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxagmx_customer_online/"> ';
	xml_request_data+='<ns1:SOAHeader> ';
	xml_request_data+='<ns1:Responsibility>BPI_WEB_SERVICE_USER</ns1:Responsibility> ';
	xml_request_data+='<ns1:RespApplication>XXAG</ns1:RespApplication> ';
	xml_request_data+='<ns1:SecurityGroup>STANDARD</ns1:SecurityGroup> ';
	xml_request_data+='<ns1:NLSLanguage>AMERICAN</ns1:NLSLanguage> ';
	xml_request_data+='<ns1:Org_Id>181</ns1:Org_Id> ';
	xml_request_data+='</ns1:SOAHeader> ';
	xml_request_data+='<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" soap:mustUnderstand="1"><wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header> ';
	xml_request_data+='<soap:Body xmlns:ns2="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxagmx_customer_online/get_ship_to_address/"> ';
	xml_request_data+='<ns2:InputParameters> ';
	xml_request_data+=' <ns2:P_OPERATING_UNIT_ID>181</ns2:P_OPERATING_UNIT_ID> ';
	xml_request_data+='<ns2:P_SHIP_TO_LOCTION> ';
	xml_request_data+= ship_to_data;
	xml_request_data+=' </ns2:P_SHIP_TO_LOCTION> ';
	xml_request_data+=' </ns2:InputParameters> ';
	xml_request_data+='</soap:Body> ';
	xml_request_data+='</soap:Envelope> ';
	 
//			var url = bpi_com_obj.web_api_url;
		var orgID= getCookie("selected_org_id");
		var url = bpi_com_obj.web_oracle_api_url+"GetShipToAddress?org_id="+orgID+"&ship_to_location="+ship_to_code;	
//					jQuery.ajax({
//						type: "POST",
//						url: url,
//							data: "xml_data="+xml_request_data+"&call_type=MEXICO",
//						dataType: "xml",
//						crossDomain: true,
//						processData: false,
//						// contentType: "text/xml; charset=\"utf-8\"",
//						 
//						success: function (data) {
//							 
//							 BpiccCommon.ProcessGetSingleAccountAddressForShipTo(data);
//						},
//						error: function (msg) {
//								 
//							alert("Failed2: " + msg.status + ": " + msg.statusText);
//						}
//					}); 
			jQuery.ajax({
				type: "POST",
				url: url,
//				data: 
		    	dataType: "json",
				crossDomain: true,
				processData: false,
				// contentType: "text/xml; charset=\"utf-8\"",
				 
				success: function (data) {
//					 console.log("Result Success:"+JSON.stringify(data));
//					 SelectAccount.ProcessGetMultipleShiptoAddressForShipTo(data);
					 var obj=JSON.parse(data.object);
//					 var billTo=obj.x_bill_to;
					 var shipToAdressList=obj.x_ship_to_address;
					 if(shipToAdressList!=null){
						 BpiccCommon.ProcessGetSingleAccountAddressForShipTo(obj);
					 }else{
						 alert('ShipTo address is not found');
					 }
//					 SelectAccount.ProcessGetMultipleShiptoAddressForShipTo(obj);
				},
				error: function (msg) {
						 
					alert("Failed: " + msg.status + ": " + msg.statusText);
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
			for (var i = 0; i < xml.length; i++) {
				  var object = xml [i];
//				  for (var property in object) {
//				    console.log('item ' + i + ': ' + property + '=' + object[property]);
//				    alert(object["DEFAULT_DC"]);
				    var DEFAULT_ORG_CODE= object["DEFAULT_DC"];
	                var SHIP_TO=object["SHIP_TO"];
					var BILL_TO_FOR_SHIP_TO=object["BILL_TO"];
	                var DROP_SHIP_FLAG= 1;
	                var ACCT_NAME= object["ACCOUNT_NAME"];
	                var ACCT_NUM= object["ACCOUNT_NUMBER"];
	                var PARTY_SITE_ID= object["PARTY_SITE_ID"];
	                var ADDRESS_LINE1= object["ADDRESS1"] == undefined? "":object["ADDRESS1"];
	                var ADDRESS_LINE2= object["ADDRESS2"] == undefined? "":object["ADDRESS2"];
	                var ADDRESS_LINE3= object["ADDRESS3"] == undefined? "":object["ADDRESS3"];
	                var CITY= object["CITY"] == undefined? "":object["CITY"];
	                var STATE=object["STATE"] == undefined? "":object["STATE"];
	                var POSTAL_CODE= object["POSTAL_CODE"] == undefined? "":object["POSTAL_CODE"];
	                var COUNTRY= object["COUNTRY"] == undefined? "":object["COUNTRY"];
					  data_set=new Object();
					  data_set['SHIP_TO']=SHIP_TO;
					  data_set['DROP_SHIP_FLAG']=DROP_SHIP_FLAG;
					  data_set['ACCT_NAME']=ACCT_NAME;
					  data_set['ACCT_NUM']=ACCT_NUM;
					  data_set['PARTY_SITE_ID']=PARTY_SITE_ID;
					  data_set['ADDRESS_LINE1']=ADDRESS_LINE1;
					  data_set['ADDRESS_LINE2']=ADDRESS_LINE2;
					  data_set['ADDRESS_LINE3']=ADDRESS_LINE3;
					  data_set['CITY']=CITY;
					  data_set['STATE']=STATE;
					  data_set['POSTAL_CODE']=POSTAL_CODE;
					  data_set['COUNTRY']=COUNTRY;
					 var address=ACCT_NAME+" - "+ADDRESS_LINE1+" "+ADDRESS_LINE2+" "+ADDRESS_LINE3+" "+CITY+" "+STATE+" "+POSTAL_CODE+" "+COUNTRY;
						li_val+='<li id="ship_acc_'+SHIP_TO+'" onclick="SelectAccount.UpdateShipToSelectAccountNew(\''+SHIP_TO+'\',\''+BILL_TO_FOR_SHIP_TO+'\',\''+DEFAULT_ORG_CODE+'\')"  >';
						li_val+='<a href="#">';
						li_val+='<span class="acctnumber">'+SHIP_TO+'</span>';
						li_val+='<span class="address" id="ship_acc_add_'+SHIP_TO+'">'+address+'</span>';
						li_val+='</a>';
						li_val+='</li>'
						if(i==0 && empty(getCookie("selected_ship_to_account_no")))
						{
							 setCookie("selected_ship_to_account_no",SHIP_TO);
							 setCookie("selected_bill_to_location","");
							 setCookie("selected_ship_to_account_no",SHIP_TO);
							 setCookie("selected_ship_to_account_address",address);
							 setCookie("selected_ship_to_wc",DEFAULT_ORG_CODE);
							 setCookie("selected_bill_to_location",BILL_TO_FOR_SHIP_TO);
							
						 
//							i++;
						}
//				  }
			}
			li_val+='<li>';
			li_val+='<a href="#">';
			li_val+='<span class="acctnumber"> </span>';
			li_val+='<span class="address"  > </span>';
			li_val+='</a>';
			li_val+='</li>'
	$("#ship_to_ul").html(li_val);
//			 $(xml).find('X_SHIP_TO_ADDRESS').each(function(){
//                     $(this).find("X_SHIP_TO_ADDRESS_ITEM").each(function(){
//					 
//                        var DEFAULT_ORG_CODE= $(this).find("DEFAULT_ORG_CODE").text();
//                        var SHIP_TO= $(this).find("SHIP_TO").text();
//						var BILL_TO_FOR_SHIP_TO=bill_to_ship_to_obj[SHIP_TO];
//                        var DROP_SHIP_FLAG= $(this).find("DROP_SHIP_FLAG").text();
//                        var ACCT_NAME= $(this).find("ACCT_NAME").text();
//                        var ACCT_NUM= $(this).find("ACCT_NUM").text();
//                        var PARTY_SITE_ID= $(this).find("PARTY_SITE_ID").text();
//                        var ADDRESS_LINE1= $(this).find("ADDRESS_LINE1").text();
//                        var ADDRESS_LINE2= $(this).find("ADDRESS_LINE2").text();
//                        var ADDRESS_LINE3= $(this).find("ADDRESS_LINE3").text();
//                        var CITY= $(this).find("CITY").text();
//                        var STATE= $(this).find("STATE").text();
//                        var POSTAL_CODE= $(this).find("POSTAL_CODE").text();
//                        var COUNTRY= $(this).find("COUNTRY").text();
//					 
//
//						 var address=ACCT_NAME+" - "+ADDRESS_LINE1+" "+ADDRESS_LINE2+" "+ADDRESS_LINE3+" "+CITY+" "+STATE+" "+POSTAL_CODE+" "+COUNTRY;
//					 
//							var selected_ship_to_account_address=address;
//		 					 setCookie("selected_ship_to_account_address",selected_ship_to_account_address);
//							setCookie("selected_ship_to_wc",DEFAULT_ORG_CODE);
//		 
//					});
//					 	 
//			 });
//			window.location.href = selectAccountPrefix + "order-history.html";	
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

  if (charCode > 31 && (charCode != 46 && charCode != 45 && charCode != 37 && charCode != 39  && (charCode
 < 48 || charCode > 57)))
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
function includeJsFilesMannually(js_path)
	{
		$(document.createElement('script')).attr('src',js_path).attr('type', 'text/javascript').appendTo('head');
	}
var Base64 = {


	    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


	    encode: function(input) {
	        var output = "";
	        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	        var i = 0;

	        input = Base64._utf8_encode(input);

	        while (i < input.length) {

	            chr1 = input.charCodeAt(i++);
	            chr2 = input.charCodeAt(i++);
	            chr3 = input.charCodeAt(i++);

	            enc1 = chr1 >> 2;
	            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	            enc4 = chr3 & 63;

	            if (isNaN(chr2)) {
	                enc3 = enc4 = 64;
	            } else if (isNaN(chr3)) {
	                enc4 = 64;
	            }

	            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

	        }

	        return output;
	    },


	    decode: function(input) {
	        var output = "";
	        var chr1, chr2, chr3;
	        var enc1, enc2, enc3, enc4;
	        var i = 0;

	        input =  input.toString().replace(/[^A-Za-z0-9\+\/\=]/g, "");

	        while (i < input.length) {

	            enc1 = this._keyStr.indexOf(input.charAt(i++));
	            enc2 = this._keyStr.indexOf(input.charAt(i++));
	            enc3 = this._keyStr.indexOf(input.charAt(i++));
	            enc4 = this._keyStr.indexOf(input.charAt(i++));

	            chr1 = (enc1 << 2) | (enc2 >> 4);
	            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	            chr3 = ((enc3 & 3) << 6) | enc4;

	            output = output + String.fromCharCode(chr1);

	            if (enc3 != 64) {
	                output = output + String.fromCharCode(chr2);
	            }
	            if (enc4 != 64) {
	                output = output + String.fromCharCode(chr3);
	            }

	        }

	        output = Base64._utf8_decode(output);

	        return output;

	    },

	    _utf8_encode: function(string) {
	        string = string.toString().replace(/\r\n/g, "\n");
	        var utftext = "";

	        for (var n = 0; n < string.length; n++) {

	            var c = string.charCodeAt(n);

	            if (c < 128) {
	                utftext += String.fromCharCode(c);
	            }
	            else if ((c > 127) && (c < 2048)) {
	                utftext += String.fromCharCode((c >> 6) | 192);
	                utftext += String.fromCharCode((c & 63) | 128);
	            }
	            else {
	                utftext += String.fromCharCode((c >> 12) | 224);
	                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	                utftext += String.fromCharCode((c & 63) | 128);
	            }

	        }

	        return utftext;
	    },

	    _utf8_decode: function(utftext) {
	        var string = "";
	        var i = 0;
	        var c = c1 = c2 = 0;

	        while (i < utftext.length) {

	            c = utftext.charCodeAt(i);

	            if (c < 128) {
	                string += String.fromCharCode(c);
	                i++;
	            }
	            else if ((c > 191) && (c < 224)) {
	                c2 = utftext.charCodeAt(i + 1);
	                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	                i += 2;
	            }
	            else {
	                c2 = utftext.charCodeAt(i + 1);
	                c3 = utftext.charCodeAt(i + 2);
	                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	                i += 3;
	            }

	        }

	        return string;
	    }

	}
function Encoding(input) {
	return Base64.encode(input);
}
function Decoding(input) {
	return Base64.decode(input);
}
function getSearchParams(k){
	 var p={};
	 location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
	 return k?p[k]:p;
	}
function WriteCookie() {
	cookievalue = userID + ";";
	document.cookie = "regID=" + cookievalue;
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}
function deleteCookie(regID) {
    document.cookie = regID + '=;path=/; expires=Wed, 31 Dec 1969 23:59:59 GMT;'
}