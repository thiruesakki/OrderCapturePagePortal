	 //http://uswodapp013.brakepartsinc.com:8010/webservices/SOAProvider/plsql/xxbpi_customer_online
	  
	 
	SelectAccount=
	{ 
		GetMultipleShiptoAddressForShipTo:function(ship_to_acc)
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
//					if(!empty(ship_to_code))
//					{
//						ship_to_data+='<ns2:P_SHIP_TO_LOCTION_ITEM>';
//						ship_to_data+='<ns2:SHIP_TO>'+ship_to_code+'</ns2:SHIP_TO>';
//						ship_to_data+='</ns2:P_SHIP_TO_LOCTION_ITEM>';
//					}
					
				}
				console.log("Ship to :"+ship_to_code)
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
		 
				var url = bpi_com_obj.web_api_url;	
//				00020781 State Automotive WHSE 168 Carpenter Street Providence RI 02903 USA 
//				 var xml='<TEST><X_SHIP_TO_ADDRESS>'+
//						'<X_SHIP_TO_ADDRESS_ITEM>'
//					+'<DEFAULT_ORG_CODE>12</DEFAULT_ORG_CODE>'
//					+'<SHIP_TO>00020781</SHIP_TO>'
//					+'<DROP_SHIP_FLAG>11</DROP_SHIP_FLAG>'
//					+'<ACCT_NAME>State Automotive WHSE</ACCT_NAME>'
//					+'<ACCT_NUM>168</ACCT_NUM>'
//					+'<PARTY_SITE_ID>168</PARTY_SITE_ID>'
//					+'<ADDRESS_LINE1>168, Carpenter Street </ADDRESS_LINE1>'
//					+'<ADDRESS_LINE2></ADDRESS_LINE2>'
//					+'<ADDRESS_LINE3></ADDRESS_LINE3>'
//					+'<CITY>Providence</CITY>'
//					+'<STATE>RI</STATE>'
//					+'<POSTAL_CODE>02903</POSTAL_CODE>'
//					+'<COUNTRY>NEWYORK</COUNTRY>'
//				+'</X_SHIP_TO_ADDRESS_ITEM>'
//			+'</X_SHIP_TO_ADDRESS></TEST>';
//				 
			
				var orgID= getCookie("selected_org_id");
					var url = bpi_com_obj.web_oracle_api_url + "GetShipToAddress?org_id="
							+ orgID + "&ship_to_location=" + ship_to_code;
					
					jQuery.ajax({
						type: "POST",
						url: url,
//						data: 
				    	dataType: "json",
						crossDomain: true,
						processData: false,
						// contentType: "text/xml; charset=\"utf-8\"",
						 
						success: function (data) {
							 console.log("Result Success:"+JSON.stringify(data));
//							 SelectAccount.ProcessGetMultipleShiptoAddressForShipTo(data);
							 var obj=JSON.parse(data.object);
//							 var billTo=obj.x_bill_to;
							 var shipToAdressList=obj.x_ship_to_address;
							 if(shipToAdressList!=null){
								 SelectAccount.ProcessGetMultipleShiptoAddressForShipTo(shipToAdressList);
							 }else{
								 alert('ShipTo address is not found');
							 }
							 
						},
						error: function (msg) {
								 
							alert("Failed: " + msg.status + ": " + msg.statusText);
						}
					});
//				console.log("xml"+xml);
//				console.log("responsejson"+JSON.stringify(xml));
				 
//						jQuery.ajax({
//							type: "POST",
//							url: url,
//							data: "xml_data="+xml_request_data+"&call_type=MEXICO",
//							dataType: "xml",
//							crossDomain: true,
//							processData: false,
//							// contentType: "text/xml; charset=\"utf-8\"",
//							 
//							success: function (data) {
//								 
//								 SelectAccount.ProcessGetMultipleShiptoAddressForShipTo(data);
//							},
//							error: function (msg) {
//									 
//								alert("Failed: " + msg.status + ": " + msg.statusText);
//							}
//						});  
		} ,
		ProcessGetMultipleShiptoAddressForShipTo:function(xml)
		{
//			for (var i = 0; i < xml.length; i++) {
//				  var object = xml [i];
//				  for (var property in object) {
//				    console.log('item ' + i + ': ' + property + '=' + object[property]);
////				    alert(object["DEFAULT_DC"]);
//				    var DEFAULT_ORG_CODE= object["DEFAULT_DC"];
//				    console.log("DEFAULT_ORG_CODE"+DEFAULT_ORG_CODE);
//	                var SHIP_TO="23612";
//					var BILL_TO_FOR_SHIP_TO="20677";
//	                var DROP_SHIP_FLAG= object["DEFAULT_DC"];
//	                var ACCT_NAME= object["ACCOUNT_NAME"];
//	                var ACCT_NUM= object["ACCOUNT_NUMBER"];
//	                var PARTY_SITE_ID= object["PARTY_SITE_ID"];
//	                var ADDRESS_LINE1= object["ADDRESS1"];
//	                var ADDRESS_LINE2= object["ADDRESS2"];
//	                var ADDRESS_LINE3= object["ADDRESS3"];
//	                var CITY= object["CITY"];
//	                var STATE=object["STATE"];
//	                var POSTAL_CODE= object["POSTAL_CODE"];
//	                var COUNTRY= object["COUNTRY"];
//					  data_set=new Object();
//					  data_set['SHIP_TO']=SHIP_TO;
//					  data_set['DROP_SHIP_FLAG']=DROP_SHIP_FLAG;
//					  data_set['ACCT_NAME']=ACCT_NAME;
//					  data_set['ACCT_NUM']=ACCT_NUM;
//					  data_set['PARTY_SITE_ID']=PARTY_SITE_ID;
//					  data_set['ADDRESS_LINE1']=ADDRESS_LINE1;
//					  data_set['ADDRESS_LINE2']=ADDRESS_LINE2;
//					  data_set['ADDRESS_LINE3']=ADDRESS_LINE3;
//					  data_set['CITY']=CITY;
//					  data_set['STATE']=STATE;
//					  data_set['POSTAL_CODE']=POSTAL_CODE;
//					  data_set['COUNTRY']=COUNTRY;
//					 var address=ACCT_NAME+" - "+ADDRESS_LINE1+" "+ADDRESS_LINE2+" "+ADDRESS_LINE3+" "+CITY+" "+STATE+" "+POSTAL_CODE+" "+COUNTRY;
//					  console.log("address"+address);
//						li_val+='<li id="ship_acc_'+SHIP_TO+'" onclick="SelectAccount.UpdateShipToSelectAccountNew(\''+SHIP_TO+'\',\''+BILL_TO_FOR_SHIP_TO+'\',\''+DEFAULT_ORG_CODE+'\')"  >';
//						li_val+='<a href="#">';
//						li_val+='<span class="acctnumber">'+SHIP_TO+'</span>';
//						li_val+='<span class="address" id="ship_acc_add_'+SHIP_TO+'">'+address+'</span>';
//						li_val+='</a>';
//						li_val+='</li>'
//						if(i==0 && empty(getCookie("selected_ship_to_account_no")))
//						{
//							 setCookie("selected_ship_to_account_no","");
//							 setCookie("selected_bill_to_location","");
//							 setCookie("selected_ship_to_account_no",SHIP_TO);
//							 setCookie("selected_ship_to_account_address",address);
//							 setCookie("selected_ship_to_wc",DEFAULT_ORG_CODE);
//							 setCookie("selected_bill_to_location",BILL_TO_FOR_SHIP_TO);
//						 
//							i++;
//						}
//				  }
//			}
			
			
//			var bill_to_ship_to_str=getCookie("bill_to_ship_to_obj");
//			 var bill_to_ship_to_obj=JSON.parse(bill_to_ship_to_str);
//			console.log("cookie result:"+empty(bill_to_ship_to_obj));
			 if(empty(bill_to_ship_to_obj))
			 {
				 alert(msgAlertBpiCcCommAccountNotAvailable);return false;
			 }
//			 console.log("cookie result:res"+$(xml).find('X_SHIP_TO_ADDRESS').length);
			  try {
				 
				var li_val="";
//				console.log($(xml).find("X_SHIP_TO_ADDRESS").text());
	 
	//
//				$(xml).find('channel').each(function(){
//				   $(this).find('item').each(function(){
//				 $(xml).find('X_SHIP_TO_ADDRESS').each(function(){
//					 console.log("cookie result1:res");
//						var i=0;
//	                     $(this).find('X_SHIP_TO_ADDRESS_ITEM').each(function(){//old source code
						
//	                    	 console.log("cookie result2:res");	 
//	                        var DEFAULT_ORG_CODE= $(this).find("DEFAULT_ORG_CODE").text();
//	                        var SHIP_TO= $(this).find("SHIP_TO").text();
//							var BILL_TO_FOR_SHIP_TO=bill_to_ship_to_obj[SHIP_TO];
//	                        var DROP_SHIP_FLAG= $(this).find("DROP_SHIP_FLAG").text();
//	                        var ACCT_NAME= $(this).find("ACCT_NAME").text();
//	                        var ACCT_NUM= $(this).find("ACCT_NUM").text();
//	                        var PARTY_SITE_ID= $(this).find("PARTY_SITE_ID").text();
//	                        var ADDRESS_LINE1= $(this).find("ADDRESS_LINE1").text();
//	                        var ADDRESS_LINE2= $(this).find("ADDRESS_LINE2").text();
//	                        var ADDRESS_LINE3= $(this).find("ADDRESS_LINE3").text();
//	                        var CITY= $(this).find("CITY").text();
//	                        var STATE= $(this).find("STATE").text();
//	                        var POSTAL_CODE= $(this).find("POSTAL_CODE").text();
//	                        var COUNTRY= $(this).find("COUNTRY").text();
//							  data_set=new Object();
//							  data_set['SHIP_TO']=SHIP_TO;
//							  data_set['DROP_SHIP_FLAG']=DROP_SHIP_FLAG;
//							  data_set['ACCT_NAME']=ACCT_NAME;
//							  data_set['ACCT_NUM']=ACCT_NUM;
//							  data_set['PARTY_SITE_ID']=PARTY_SITE_ID;
//							  data_set['ADDRESS_LINE1']=ADDRESS_LINE1;
//							  data_set['ADDRESS_LINE2']=ADDRESS_LINE2;
//							  data_set['ADDRESS_LINE3']=ADDRESS_LINE3;
//							  data_set['CITY']=CITY;
//							  data_set['STATE']=STATE;
//							  data_set['POSTAL_CODE']=POSTAL_CODE;
//							  data_set['COUNTRY']=COUNTRY;
//							 var address=ACCT_NAME+" - "+ADDRESS_LINE1+" "+ADDRESS_LINE2+" "+ADDRESS_LINE3+" "+CITY+" "+STATE+" "+POSTAL_CODE+" "+COUNTRY;
//							  console.log("address"+address);
//								li_val+='<li id="ship_acc_'+SHIP_TO+'" onclick="SelectAccount.UpdateShipToSelectAccountNew(\''+SHIP_TO+'\',\''+BILL_TO_FOR_SHIP_TO+'\',\''+DEFAULT_ORG_CODE+'\')"  >';
//								li_val+='<a href="#">';
//								li_val+='<span class="acctnumber">'+SHIP_TO+'</span>';
//								li_val+='<span class="address" id="ship_acc_add_'+SHIP_TO+'">'+address+'</span>';
//								li_val+='</a>';
//								li_val+='</li>'
//								if(i==0 && empty(getCookie("selected_ship_to_account_no")))
//								{
//									 setCookie("selected_ship_to_account_no","");
//									 setCookie("selected_bill_to_location","");
//									 setCookie("selected_ship_to_account_no",SHIP_TO);
//									 setCookie("selected_ship_to_account_address",address);
//									 setCookie("selected_ship_to_wc",DEFAULT_ORG_CODE);
//									 setCookie("selected_bill_to_location",BILL_TO_FOR_SHIP_TO);
//								 
//									i++;
//								}
//						});
				
				for (var i = 0; i < xml.length; i++) {
					  var object = xml [i];
//					  for (var property in object) {
//					    console.log('item ' + i + ': ' + property + '=' + object[property]);
//					    alert(object["DEFAULT_DC"]);
					    var DEFAULT_ORG_CODE= object["DEFAULT_DC"];
		                var SHIP_TO=object["SHIP_TO"];
						var BILL_TO_FOR_SHIP_TO=object["BILL_TO"];
		                var DROP_SHIP_FLAG= 1;
		                var ACCT_NAME= object["ACCOUNT_NAME"];
		                var ACCT_NUM= object["ACCOUNT_NUMBER"];
		                var PARTY_SITE_ID= object["PARTY_SITE_ID"];
		                var ADDRESS_LINE1= object["ADDRESS1"];
		                var ADDRESS_LINE2= object["ADDRESS2"] == undefined? "":object["ADDRESS2"];
		                var ADDRESS_LINE3= object["ADDRESS3"] == undefined? "":object["ADDRESS3"];
		                var CITY= object["CITY"];
		                var STATE=object["STATE"];
		                var POSTAL_CODE= object["POSTAL_CODE"];
		                var COUNTRY= object["COUNTRY"];
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
						  console.log("address"+address);
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
							 
//								i++;
							}
//					  }
				}
						 	li_val+='<li>';
								li_val+='<a href="#">';
								li_val+='<span class="acctnumber"> </span>';
								li_val+='<span class="address"  > </span>';
								li_val+='</a>';
								li_val+='</li>'
						$("#ship_to_ul").html(li_val);
						 if(!empty(getCookie("selected_ship_to_account_no")))
						  {
							  $("#ship_acc_"+getCookie("selected_ship_to_account_no")).addClass("active");
						  }
						  else
						  {
							   if($("#ship_to_ul li.active").length==0)
							   {
								   $("#ship_to_ul li:first").addClass("active");
							   }
						  }
						  
//				 });
				  
			    }
			  catch(err) {
				
				  var message = err.message;
				  message = err.message+" in BpiccPlaceOrder.ProcessApiGetShippingInfoXml";
				  alert(message);
			  }  
		},
		UpdateShipToSelectAccountNew:function(ACCT_NUM,BILL_TO_FOR_SHIP_TO,DEFAULT_ORG_CODE)
		{ 
			var selected_ship_to_account_no=ACCT_NUM;
			var selected_ship_to_account_address=$("#ship_acc_add_"+ACCT_NUM).html();
			 setCookie("selected_ship_to_account_no","");
			 setCookie("selected_bill_to_location","");
			 setCookie("selected_ship_to_account_no",selected_ship_to_account_no);
			 setCookie("selected_ship_to_account_address",selected_ship_to_account_address);
			 setCookie("selected_ship_to_wc",DEFAULT_ORG_CODE);
			 setCookie("selected_bill_to_location",BILL_TO_FOR_SHIP_TO);
			 $("#ship_to_ul li").removeClass("active");
			 $("#ship_acc_"+getCookie("selected_ship_to_account_no")).addClass("active");
			 // window.location.href="place-order.html";
			 window.location.href = selectAccountPrefix + "order-history.html?s="+ encodeURIComponent(Encoding(ACCT_NUM))+"&b="+encodeURIComponent(Encoding(BILL_TO_FOR_SHIP_TO)); 
//			 	setTimeout(function(){  window.location.href = selectAccountPrefix + "order-history.html?s="+ encodeURIComponent(Encoding(ACCT_NUM)); }, 400); 
			
		},
		
	}