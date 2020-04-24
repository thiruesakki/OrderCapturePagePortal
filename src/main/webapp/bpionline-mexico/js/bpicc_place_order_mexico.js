//http://uswodapp013.brakepartsinc.com:8010/webservices/SOAProvider/plsql/xxbpi_customer_online/
//http://bpiebsuat.brakepartsinc.com/webservices/SOAProvider/plsql/xxbpi_customer_online/
po_ajax="";
  jQuery(function($) {'use strict',
  
	/* function handle(e){
        if(e.keyCode === 13){
            
//trigger the js function here
        }

        return false;
    } */
	 
	$('#inputPo').keypress(function (e) {
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
			  e.preventDefault();
			 BpiccPlaceOrder.ApiValidatePoNumber();
		  }
		});  
$("#bpicc_tableDetails tbody tr#1").remove();
	 BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessages("",""); 
	$("#partNum_1").val("");
		   $("#brand_1").val("");
		   $("#desc_1").val("");
		   $("#weight_1").val("");
		   $("#reqQnty_1").val("");
		   $("#v1_1").val("");
		   $("#m1_1").val("");
		   $("#m2_1").val("");
			$("#inputPo").val("");
		   $("#reqQnty_1").attr("disabled",true);
    $('#reset_form').on('click', function(e){
	 
		BpiccPlaceOrder.ResetForm();
	});
	
    $('.reviewUpdate').on('click', function(e){
	  e.preventDefault();
		BpiccPlaceOrder.ReviewUpdateOrder();
	});
    $('#validate_order').on('click', function(e){
	  e.preventDefault();
		BpiccPlaceOrder.ValidateOrder();
	});
    $('#submit_order').on('click', function(e){
	  e.preventDefault();
		BpiccPlaceOrder.SubmitFinalOrder();
	});
  
    $('#validate_on_entry').on('click', function(e){
	  // e.preventDefault();
		BpiccPlaceOrder.HandleValidateEntry();
	});

 
     $("#place_order_part_error_info").hide(""); 
	$("#inputPo").removeAttr('disabled');
	
    $('#continue_order').on('click', function(e){
	  e.preventDefault();
	  if($("#page_type").val()=='place_order')
		  {
			BpiccPlaceOrder.ContinueOrder();
		  }
		else
		{
			BpiccPlaceOrder.HandleConvertToOrderFromCheckStock();
			
		}

	}); 
	$(".shippingAddress #country").on('change', function(e){
	  e.preventDefault();
	 
		BpiccPlaceOrder.PopulateStateForSelectedCountry();
		 

	});
	  // $('input[name="AllDCinputAvail"][value="'+bpi_com_obj.default_dc+'"]')[0].checked = true;
		$('#reset_form').prop("disabled",true);
		 $('input[name=shippingmodel]').on('click', function(e){
		BpiccPlaceOrder.HandleShippingAddressOnClick();

		});
			BpiccPlaceOrder.AddDefaultRowsOnLoad();
			if($("#page_type").val()=='place_order')
			{ 
				$("#submit_order").show();
				BpiccPlaceOrder.EnableDisableSumbitOrderButton();
				BpiccPlaceOrder.DisableAddRowsAndButtonPoValidation();
				BpiccPlaceOrder.EnableValidateOrderDiv();
				// $("#submit_order").attr("disabled",true);
				 $('#inlineValidate').on('click', function(e){
				 
					BpiccPlaceOrder.EnableDisableSumbitOrderButton();
				});
				
			}
			else
			{
				 $('#bpicc_tableDetails #tbl_add_rows').removeAttr('disabled');
				 
				BpiccPlaceOrder.EnableAddRowsAndButtonPoValidation();
			}
			
			 $('#bpicc_tableDetails #tbl_add_rows').on('click', function(e){
			  e.preventDefault();
				BpiccPlaceOrder.AddaddNewTableRowDefault();
			});
	
	   if($("#page_type").val()=='place_order')//if user comes from check-stock.html
	   {
		   $('input[name=inlineRadioOptions]').on('click', function(e){
				 
				if($("#shipping_error_info p:contains('Please Select Shipping Method Option')").length>0)
				{
					$("#shipping_error_info").html("");
						$("#shipping_error_info").hide();
				}
				
			});
	
		  
		   $('input[name=AllDCinputAvail]').on('click', function(e){
			  	BpiccPlaceOrder.HandleGlobalWcSelect(this.value);
		   });

		   $("#select_order_type").removeAttr('disabled');
		  // var cookie_part_obj_str= getCookie("cookie_part_obj");
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
		  $('input[name="shippingmodel"][value="SHIPPING ADDRESS"]')[0].checked = true;
			$('input[name="inlineRadioOptions"][value="option1"]')[0].checked = true;
			BpiccPlaceOrder.DisableShippingInputValues();
			 $('[id^=reqQnty_]').attr('disabled',true);
			 // $('[id^=partNum_]').attr('disabled',true);
			 
			   $("#select_order_type").attr('disabled',true);
		  $('input[name="AllDCinputAvail"]').attr('disabled',true);
		 $(".archiveIcon span").css("cursor","not-allowed");
		 
		 
	
	   }
	   else
	   {
		   $('input[name="AllDCinputAvail"]').attr('disabled',true);
		   	$("#bpicc_tableDetails tbody tr#1 #partNum_1").focus();
	   }
	   if(!empty(getCookie("selected_ship_to_wc")))
	   {
		   bpi_com_obj.default_dc=getCookie("selected_ship_to_wc");
	   }
 
	   // $("#inputPo").focus();
		
		 
			 BpiccPlaceOrder.DisableShippingInputValues();
			 $("#validate_on_entry").prop('checked', true);	$("#validate_on_entry").attr("validate","1");
			 $("#validate_order").attr("disabled",true);
		
			
}); 
BpiccClass=function()
{
	this.emergency_cust_pick_up_ship_method_code="000001_CUSTOMER P_L_GND";
	this.standard_ship_method_code="000001_BEST_L_GND";
	this.prod_stock=new Object();
	this.shipping_details=new Object();
	this.drop_ship_details=new Object();
	this.country_list_obj=new Object();
	this.excel_upload_min_qty_rows=[];
	this.is_last_excel_min_row_updated=0;
	this.is_bulk_validate=0;
}
bpi_obj=new BpiccClass();

BpiccPlaceOrder=
{
	AddDefaultRowsOnLoad:function()
	{
		
		for(j=0;j<9;j++)
		{
			BpiccPlaceOrder.addNewTableRow()
		}
			$( "#bpicc_tableDetails tbody" ).scrollTop(0); //setTimeout(function(){$("#partNum_1").focus();}, 100); 
		 BpiccPlaceOrder.EnableValidateOrderDiv();
		  $('[id^=reqQnty_]').attr('disabled',true);
	},
	HandleValidateEntry:function()
	{
		BpiccPlaceOrder.EnableValidateOrderDiv();
		if($("#validate_on_entry").is(":checked"))
		{
			$("#validate_on_entry").attr("validate","1");
			// $("#validate_order").attr("disabled",true);
		}
		else
		{
			$("#validate_on_entry").attr("validate","0");
			// $("#validate_order").removeAttr('disabled',true);
			var data=$("#bpicc_tableDetails tbody tr");
			
			$.each(data,function(k,v)
			{
				var tr_id=$(this).attr("id");
			 if(!empty($("#partNum_"+tr_id).val()))
			 {
				 $("#reqQnty_"+tr_id).removeAttr('disabled',true);
			 }
					$("#partNum_"+tr_id).removeClass("errorError");
					$("#partNum_"+tr_id).removeClass("errorWarning");
					$("#reqQnty_"+tr_id).removeClass("errorError");
					$("#reqQnty_"+tr_id).removeClass("errorWarning");
					
					$("#partNum_"+tr_id).parent().find("i").remove();
					$("#reqQnty_"+tr_id).parent().find("i").remove()
			});
			 BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
		}
	},
	EnableDisableSumbitOrderButton:function()
	{
		 
		if($("#inlineValidate").is(":checked"))
		{
			$("#submit_order").removeAttr('disabled');
			$("#submit_order").show();
		}
		else
		{
			 $("#submit_order").attr("disabled",true);
		}
	},
	DisableAddRowsAndButtonPoValidation:function()
	{  
		$("#bpicc_tableDetails tbody tr input[id^='partNum_']").attr('disabled',true);
		$("#validate_order").attr('disabled',true);
	
		$("#btn_excel_upload").attr('disabled',true);
		 $('#bpicc_tableDetails #tbl_add_rows').attr('disabled',true);
		 	
	}, 
	EnableAddRowsAndButtonPoValidation:function()
	{
		$("#bpicc_tableDetails tbody tr input[id^='partNum_']").removeAttr('disabled');
		$("#bpicc_tableDetails tbody tr input[id^='reqQnty_']").filter(function () {
		if(empty(this.value)) 
			$(this).attr('disabled',true);
		else
			$(this).removeAttr('disabled');
		});
		$("#validate_order").removeAttr('disabled');
		$("#select_order_type").removeAttr('disabled');
		$("#btn_excel_upload").removeAttr('disabled');
		 $('#bpicc_tableDetails #tbl_add_rows').removeAttr('disabled');
		 $('input[name="AllDCinputAvail"]').removeAttr('disabled');
		  $(".archiveIcon span").css("cursor","pointer");
	},
	AddaddNewTableRowDefault:function()
	{
		var add_rows=1;
		 if($("#page_type").val()=='place_order' && empty($("#inputPo").val()))
		 {
			 BpiccPlaceOrder.ShowShppingErrorSuccessMessages("Please Enter PO Number","Error"); 
			 add_rows=0;
				return false;
		 }
			 
		 
		 if(add_rows==1)
		 {
			 var last_tr_id=$("#bpicc_tableDetails tbody").find("tr").last().attr('id');
			 last_tr_id=parseInt(last_tr_id)+1;
			for(m=0;m<5;m++)
			{
				BpiccPlaceOrder.addNewTableRow()
			}
		 
			$("#partNum_"+last_tr_id).focus();
		 }
		var data=$("#bpicc_tableDetails tbody tr");
		 var last_row_id=1;
		 
		$.each(data,function(k,v)
		{
			var tr_id=$(this).attr("id");
			 var part_no=$.trim($("#partNum_"+tr_id).val());
			 if(!empty(part_no))
			 {
				last_row_id=tr_id;
			 
				 return;
			 }
		});	
	if(last_row_id>1)
	last_row_id=parseInt(last_row_id)+1;	
	if((last_row_id==1) && !empty($("#partNum_"+last_row_id).val()))
		last_row_id=2;
	if(last_row_id==1) 
		last_row_id=2;
		  setTimeout(function(){$("#partNum_"+last_row_id).focus();}, 100); 
	},
	EnableProperCheckBoxColor:function(row_id)
	{
		 BpiccPlaceOrder.EnableValidateOrderDiv();

		 checked_val=$("input[name='inputAvail_"+row_id+"']:checked").val();
		 $("#V1_i_"+row_id).removeClass("greenIcon");
		 $("#V1_i_"+row_id).removeClass("yellowIcon");
		 $("#V1_i_"+row_id).removeClass("redIcon");
		 
		 $("#M1_i_"+row_id).removeClass("greenIcon");
		 $("#M1_i_"+row_id).removeClass("yellowIcon");
		 $("#M1_i_"+row_id).removeClass("redIcon");
		 
		 
		 $("#M2_i_"+row_id).removeClass("greenIcon");
		 $("#M2_i_"+row_id).removeClass("yellowIcon");
		 $("#M2_i_"+row_id).removeClass("redIcon");
		 	 var part_no=$.trim($("#partNum_"+row_id).val());
		if($("#validate_on_entry").attr("validate")=="1")
		{		
			if(bpi_obj.prod_stock.hasOwnProperty(part_no))
			{

 


				MIN_ORDER_QTY=	bpi_obj.prod_stock[part_no]['MIN_ORDER_QTY'];
				ERROR_MSG=	$.trim(bpi_obj.prod_stock[part_no]['ERROR_MSG']);
				if(empty(ERROR_MSG))
				{
					EDC=	bpi_obj.prod_stock[part_no]['EDC'];
					MDC=	bpi_obj.prod_stock[part_no]['MDC'];
					WDC=	bpi_obj.prod_stock[part_no]['WDC'];
				}
				var reqQnty=$.trim($("#reqQnty_"+row_id).val());
				reqQnty= parseInt((empty(reqQnty))?0:reqQnty);
				 if(reqQnty<EDC)
						EDC=reqQnty;
					if(reqQnty<MDC)
						MDC=reqQnty;
					if(reqQnty<WDC)
						WDC=reqQnty;
				checked_val_lower=checked_val.toLowerCase();
				if(checked_val=="EDC")
						assign_val=EDC;
					if(checked_val=="MDC")
						assign_val=MDC;
					if(checked_val=="WDC")
						assign_val=WDC;
				 
					$("#"+checked_val_lower+"_"+row_id).val(assign_val);
				if(checked_val=="EDC")
					{
						if(EDC==0)
						{
							 BpiccPlaceOrder.DCEnableProperCheckBox(row_id,"EDC","redIcon",1);
						}
						else if(reqQnty<=EDC)
						{
							 BpiccPlaceOrder.DCEnableProperCheckBox(row_id,"EDC","greenIcon",1);
						}
						else
						{
							 BpiccPlaceOrder.DCEnableProperCheckBox(row_id,"EDC","yellowIcon",1);
							
						}
					}
					else if(checked_val=="MDC")
					{
						if(MDC==0)
						{
							 BpiccPlaceOrder.DCEnableProperCheckBox(row_id,"MDC","redIcon",1);
						}
						else if(reqQnty<=MDC)
						{
							 BpiccPlaceOrder.DCEnableProperCheckBox(row_id,"MDC","greenIcon",1);
						}
						else
						{
							 BpiccPlaceOrder.DCEnableProperCheckBox(row_id,"MDC","yellowIcon",1);
							
						}
					}
					else if(checked_val=="WDC")
					{
						if(WDC==0)
						{
							 BpiccPlaceOrder.DCEnableProperCheckBox(row_id,"WDC","redIcon",1);
						}
						else if(reqQnty<=WDC)
						{
							 BpiccPlaceOrder.DCEnableProperCheckBox(row_id,"WDC","greenIcon",1);
						}
						else
						{
							 BpiccPlaceOrder.DCEnableProperCheckBox(row_id,"WDC","yellowIcon",1);
							
						}
					}
					
			}
		}
		else		
		{ 
		 $("#"+checked_val+"_i_"+row_id).addClass("greenIcon");
		}
		BpiccPlaceOrder.CalculateTotQtyWt();
	},
	HandleGlobalWcSelect:function(u_checked_val)
	{
		 $(".loader").show();
		 setTimeout(function(){
		var data=$("#bpicc_tableDetails tbody tr");
		var cnt=0;
		  var tot_cnt=$("#bpicc_tableDetails tbody tr").length;
		$.each(data,function(k,v)
		{
			 $(".loader").show();
			var row_id=$(this).attr("id");
			  var part_no=$.trim($(this).find("#partNum_"+row_id).val());
			if(bpi_obj.prod_stock.hasOwnProperty(part_no))
			{
				 var EDC=0;
				 var MDC=0;
				 var WDC=0;
					 EDC=	bpi_obj.prod_stock[part_no]['EDC'];
					MDC=	bpi_obj.prod_stock[part_no]['MDC'];
					WDC=	bpi_obj.prod_stock[part_no]['WDC'];
					var IS_CALIPER=	bpi_obj.prod_stock[part_no]['IS_CALIPER'];
					if(IS_CALIPER=="0")
					{
						var reqQnty=$(this).find("#reqQnty_"+row_id).val(); 
						if(reqQnty>0)
						{
							reqQnty= parseInt((empty(reqQnty))?0:reqQnty);
							 if(reqQnty<EDC)
									EDC=reqQnty;
								if(reqQnty<MDC)
									MDC=reqQnty;
								if(reqQnty<WDC)
									WDC=reqQnty;
								 
								if(u_checked_val=="EDC")
								{
									 
									$("#v1_"+row_id).val(EDC);
									if(EDC==0)
									{
										 BpiccPlaceOrder.DCEnableProperCheckBoxGlobalDC(row_id,"EDC","redIcon");
									}
									else if(reqQnty<=EDC)
									{
										 BpiccPlaceOrder.DCEnableProperCheckBoxGlobalDC(row_id,"EDC","greenIcon");
									}
									else
									{
										 BpiccPlaceOrder.DCEnableProperCheckBoxGlobalDC(row_id,"EDC","yellowIcon");
										
									}
								}
								else if(u_checked_val=="MDC")
								{
										 
									$("#m1_"+row_id).val(MDC);
									if(MDC==0)
									{
										 BpiccPlaceOrder.DCEnableProperCheckBoxGlobalDC(row_id,"MDC","redIcon");
									}
									else if(reqQnty<=MDC)
									{
										 BpiccPlaceOrder.DCEnableProperCheckBoxGlobalDC(row_id,"MDC","greenIcon");
									}
									else
									{
										 BpiccPlaceOrder.DCEnableProperCheckBoxGlobalDC(row_id,"MDC","yellowIcon");
										
									}
								}
								else if(u_checked_val=="WDC")
								{
								 
									$("#m2_"+row_id).val(WDC);
									if(WDC==0)
									{
										 BpiccPlaceOrder.DCEnableProperCheckBoxGlobalDC(row_id,"WDC","redIcon");
									}
									else if(reqQnty<=WDC)
									{
										 BpiccPlaceOrder.DCEnableProperCheckBoxGlobalDC(row_id,"WDC","greenIcon");
									}
									else
									{
										 BpiccPlaceOrder.DCEnableProperCheckBoxGlobalDC(row_id,"WDC","yellowIcon");
										
									}
								}
						 }
					}
			}
			cnt++;
			if(cnt>=tot_cnt)
			{
				$(".loader").hide();
				 BpiccPlaceOrder.CalculateTotQtyWt();	
			}
		});
			 }, 500); 		
		
		 
	},
	HandleCheckStockPage:function(row_id)
	{
		 	 var part_no=$.trim($("#partNum_"+row_id).val());
		if($("#validate_on_entry").attr("validate")=="1")
		{		
			if(bpi_obj.prod_stock.hasOwnProperty(part_no))
			{
				MIN_ORDER_QTY=	bpi_obj.prod_stock[part_no]['MIN_ORDER_QTY'];
				ERROR_MSG=	$.trim(bpi_obj.prod_stock[part_no]['ERROR_MSG']);
				if(empty(ERROR_MSG))
				{
					EDC=	bpi_obj.prod_stock[part_no]['V1'];
					MDC=	bpi_obj.prod_stock[part_no]['M1'];
					WDC=	bpi_obj.prod_stock[part_no]['M2'];
				}
				var reqQnty=$.trim($("#reqQnty_"+row_id).val());
				reqQnty= parseInt((empty(reqQnty))?0:reqQnty);
				 if(reqQnty<EDC)
						EDC=reqQnty;
					if(reqQnty<MDC)
						MDC=reqQnty;
					if(reqQnty<WDC)
						WDC=reqQnty;
				
						if(EDC==0)
						{
							 BpiccPlaceOrder.CheckStockDCEnableProperCheckBox(row_id,"V1","redIcon")
						}
						else if(reqQnty<=EDC)
						{
							 BpiccPlaceOrder.CheckStockDCEnableProperCheckBox(row_id,"V1","greenIcon")
						}
						else
						{
							 BpiccPlaceOrder.CheckStockDCEnableProperCheckBox(row_id,"V1","yellowIcon")
							
						}
					
					 
						if(MDC==0)
						{
							 BpiccPlaceOrder.CheckStockDCEnableProperCheckBox(row_id,"M1","redIcon")
						}
						else if(reqQnty<=MDC)
						{
							 BpiccPlaceOrder.CheckStockDCEnableProperCheckBox(row_id,"M1","greenIcon")
						}
						else
						{
							 BpiccPlaceOrder.CheckStockDCEnableProperCheckBox(row_id,"M1","yellowIcon")
							
						}
					 
					 
						if(WDC==0)
						{
							 BpiccPlaceOrder.CheckStockDCEnableProperCheckBox(row_id,"M2","redIcon")
						}
						else if(reqQnty<=WDC)
						{
							 BpiccPlaceOrder.CheckStockDCEnableProperCheckBox(row_id,"M2","greenIcon")
						}
						else
						{
							 BpiccPlaceOrder.CheckStockDCEnableProperCheckBox(row_id,"M2","yellowIcon")
							
						}
					 
			}
		}
	},
	CheckStockDCEnableProperCheckBox:function(row_id,dc,ClassName)
	{
		 
		 
		
		  $("#"+dc+"_i_"+row_id).removeClass("greenIcon");
		  $("#"+dc+"_i_"+row_id).removeClass("yellowIcon");
		  $("#"+dc+"_i_"+row_id).removeClass("redIcon");
		 
		  $("#"+dc+"_i_"+row_id).addClass(ClassName);	
		 $("#"+dc+"_RADIO_"+row_id).attr('disabled',true);
				
	},
	DCEnableProperCheckBox:function(row_id,value,ClassName,is_tot_cal_required)
	{
		 
		is_tot_cal_required=empty(is_tot_cal_required)?1:is_tot_cal_required;
		 $("#bpicc_tableDetails #"+row_id+" .radioDC").removeAttr("disabled");
		 
		 $("#"+value+"_RADIO_"+row_id).prop("checked", true)
		 
		 
		  checked_val=$("input[name='inputAvail_"+row_id+"']:checked").val();
		  $("#V1_i_"+row_id).removeClass("greenIcon");
		 $("#V1_i_"+row_id).removeClass("yellowIcon");
		 $("#V1_i_"+row_id).removeClass("redIcon");
		 
		 $("#M1_i_"+row_id).removeClass("greenIcon");
		 $("#M1_i_"+row_id).removeClass("yellowIcon");
		 $("#M1_i_"+row_id).removeClass("redIcon");
		 
		 
		 $("#M2_i_"+row_id).removeClass("greenIcon");
		 $("#M2_i_"+row_id).removeClass("yellowIcon");
		 $("#M2_i_"+row_id).removeClass("redIcon");

		$("#"+checked_val+"_i_"+row_id).addClass(ClassName);	
		if(is_tot_cal_required==1)
		BpiccPlaceOrder.CalculateTotQtyWt();		
	},
	DCEnableProperCheckBoxGlobalDC:function(row_id,value,ClassName)
	{
		 
	 
		 $("#bpicc_tableDetails").find("#"+row_id+" .radioDC").removeAttr("disabled");
		 
		 $("#bpicc_tableDetails").find("#"+value+"_RADIO_"+row_id).prop("checked", true)
		 
		checked_val= $("#bpicc_tableDetails").find("input[name='inputAvail_"+row_id+"']:checked").val();
		  $("#bpicc_tableDetails").find("input[name='inputAvail_"+row_id+"']:checked").val();
		$("#bpicc_tableDetails").find("#V1_i_"+row_id).removeClass("greenIcon");
		 $("#bpicc_tableDetails").find("#V1_i_"+row_id).removeClass("yellowIcon");
		 $("#bpicc_tableDetails").find("#V1_i_"+row_id).removeClass("redIcon");
		 
		 $("#bpicc_tableDetails").find("#M1_i_"+row_id).removeClass("greenIcon");
		 $("#bpicc_tableDetails").find("#M1_i_"+row_id).removeClass("yellowIcon");
		 $("#bpicc_tableDetails").find("#M1_i_"+row_id).removeClass("redIcon");
		 
		 
		 $("#bpicc_tableDetails").find("#M2_i_"+row_id).removeClass("greenIcon");
		 $("#bpicc_tableDetails").find("#M2_i_"+row_id).removeClass("yellowIcon");
		$("#bpicc_tableDetails").find("#M2_i_"+row_id).removeClass("redIcon");

		 $("#bpicc_tableDetails").find("#"+checked_val+"_i_"+row_id).addClass(ClassName);	
	 		
	},
	addNewTableRow:function ()
	{
		var inputPo=$("#inputPo").val();
		var tr_id=$("#bpicc_tableDetails tbody").find("tr").last().attr('id');
		if(empty(tr_id))
			tr_id=1;
		new_tr_id=parseInt(tr_id)+1;
		if(new_tr_id)
		{
			var disabled_flag="";
			if(empty(inputPo) && $("#page_type").val()=='place_order')
				disabled_flag=" disabled ";
			var html='<tr id="'+new_tr_id+'">';
			html+='<td><div class="availableDC"><input id="partNum_'+new_tr_id+'" '+disabled_flag+' onblur="BpiccPlaceOrder.ValidateEnteredPartNo('+new_tr_id+');" value="" class="partNum"  type="text"></div></td>';
			html+='<td><input id="brand_'+new_tr_id+'" class="inputBrand" value="" disabled="" type="text"></td>';
			html+='<td><input id="desc_'+new_tr_id+'" class="inputDesc" value="" disabled="" type="text"></td>';
			html+='<td><input id="weight_'+new_tr_id+'" class="inputUnitWgt" value="" disabled="" type="text"></td>';
			html+='<td><div class="availableDC"><input id="reqQnty_'+new_tr_id+'" maxlength=5 disabled  onkeypress="return acceptNumbersOnlyForModule(event);" onblur="BpiccPlaceOrder.ValidateQty('+new_tr_id+');BpiccPlaceOrder.CalculateTotQtyWt();" class="inputReqQnty" type="text"></div></td>';
			
			html+='<td><div class="availableDC"><input id="v1_'+new_tr_id+'" class="inputEdc" value="" disabled><span><input type="radio"   id="V1_RADIO_'+new_tr_id+'" name="inputAvail_'+new_tr_id+'" value="V1" class="radioDC" disabled onclick="BpiccPlaceOrder.EnableProperCheckBoxColor('+new_tr_id+');"  ><i class="fa fa-check-circle" id="V1_i_'+new_tr_id+'" aria-hidden="true"></i></span></input></div></td>';
			html+='<td><div class="availableDC"><input id="m1_'+new_tr_id+'" class="inputMdc" value="" disabled><span><input type="radio" id="M1_RADIO_'+new_tr_id+'"   name="inputAvail_'+new_tr_id+'" value="M1" class="radioDC" disabled onclick="BpiccPlaceOrder.EnableProperCheckBoxColor('+new_tr_id+');"  ><i class="fa fa-check-circle"   id="M1_i_'+new_tr_id+'" aria-hidden="true"></i></span></input></div></td>';
			html+='<td><div class="availableDC"><input id="m2_'+new_tr_id+'" class="inputWdc" value="" disabled><span><input type="radio"  id="M2_RADIO_'+new_tr_id+'"  name="inputAvail_'+new_tr_id+'" value="M2" class="radioDC" disabled onclick="BpiccPlaceOrder.EnableProperCheckBoxColor('+new_tr_id+');"  ><i class="fa fa-check-circle" id="M2_i_'+new_tr_id+'"  aria-hidden="true"></i></span></input></div></td>';
			 			
			html+='<td><div class="availableDC"><span onclick="BpiccPlaceOrder.deleteTableRow('+new_tr_id+');" class="glyphicon glyphicon-trash" aria-hidden="true"></span></div></td>';
			html+='	</tr>';
			$("#bpicc_tableDetails tbody").append(html);
			$("#bpicc_tableDetails tbody tr#"+new_tr_id+" #partNum_"+new_tr_id).focus();
			
		}
	},
	addNewTableRowFromExcel:function (part_no,qty,dc)
	{
			bpi_obj.is_bulk_validate=1;
		// var inputPo= $("#inputPo").val();
		var tr_id=$("#bpicc_tableDetails tbody").find("tr").last().attr('id');
		if(empty(tr_id))
			tr_id=1;
		new_tr_id=parseInt(tr_id)+1;
		if(new_tr_id)
		{
			 var dis="";
			/*if(empty(inputPo))
				dis=" disabled "; */
			var html='<tr id="'+new_tr_id+'">';
			html+='<td><div class="availableDC"><input id="partNum_'+new_tr_id+'"  onblur="BpiccPlaceOrder.ValidateEnteredPartNo('+new_tr_id+');"  value='+part_no+' class="partNum" type="text"></td></div>';
			html+='<td><input id="brand_'+new_tr_id+'" class="inputBrand" value="" disabled="" type="text"></td>';
			html+='<td><input id="desc_'+new_tr_id+'" class="inputDesc" value="" disabled="" type="text"></td>';
			html+='<td><input id="weight_'+new_tr_id+'" class="inputUnitWgt" value="" disabled="" type="text"></td>';
			html+='<td><div class="availableDC"><input id="reqQnty_'+new_tr_id+'"  maxlength=5  onkeypress="return acceptNumbersOnlyForModule(event);" onblur="BpiccPlaceOrder.ValidateQty('+new_tr_id+');BpiccPlaceOrder.CalculateTotQtyWt();" class="inputReqQnty" '+dis+' type="text" value='+qty+'></td></div>';
			
			html+='<td><div class="availableDC"><input id="v1_'+new_tr_id+'" class="inputEdc" value="" disabled><span><input type="radio"  id="V1_RADIO_'+new_tr_id+'" name="inputAvail_'+new_tr_id+'" value="EDC" class="radioDC" disabled onclick="BpiccPlaceOrder.EnableProperCheckBoxColor('+new_tr_id+');"  ><i class="fa fa-check-circle" id="V1_i_'+new_tr_id+'" aria-hidden="true"></i></span></input></td></div>';
			html+='<td><div class="availableDC"><input id="m1_'+new_tr_id+'" class="inputMdc" value="" disabled><span><input type="radio" id="M1_RADIO_'+new_tr_id+'"   name="inputAvail_'+new_tr_id+'" value="MDC" class="radioDC" disabled onclick="BpiccPlaceOrder.EnableProperCheckBoxColor('+new_tr_id+');"  ><i class="fa fa-check-circle"   id="M1_i_'+new_tr_id+'" aria-hidden="true"></i></span></input></td></div>';
			html+='<td><div class="availableDC"><input id="m2_'+new_tr_id+'" class="inputWdc" value="" disabled><span><input type="radio"  id="M2_RADIO_'+new_tr_id+'"  name="inputAvail_'+new_tr_id+'" value="WDC" class="radioDC" disabled onclick="BpiccPlaceOrder.EnableProperCheckBoxColor('+new_tr_id+');"  ><i class="fa fa-check-circle" id="M2_i_'+new_tr_id+'"  aria-hidden="true"></i></span></input></td></div>';
			
			html+='<td><div class="availableDC"><span onclick="BpiccPlaceOrder.deleteTableRow('+new_tr_id+');" class="glyphicon glyphicon-trash" aria-hidden="true"></span></td></div>';
			html+='	</tr>';
			$("#bpicc_tableDetails tbody").append(html);
			if(!empty(dc))
			{
			 
				var checkd_val_f=dc+"_RADIO_"+new_tr_id;
				$("#"+checkd_val_f).prop("checked", true);
				BpiccPlaceOrder.EnableProperCheckBoxColor(new_tr_id);
			}
			// M1_RADIO_2
			/* $("#bpicc_tableDetails tbody tr#"+new_tr_id+" #partNum_"+new_tr_id).focus()  */
			
		}

		return new_tr_id;
	
	},
	deleteTableRow:function (del_id)
	{
		 if($("#bpicc_tableDetails tbody tr").length>1)
		 {
				var row_disabled=$("#partNum_"+del_id).attr("disabled");
		 
				if(row_disabled!="disabled")
				{
					var confirm_flag=confirm("Do you want to delete this record?");
					if(confirm_flag)
					{
						var del_part_no=$("#partNum_"+del_id).val();;
						$("#bpicc_tableDetails tbody tr#"+del_id).remove();
						  bpi_obj.is_bulk_validate=0;
						BpiccPlaceOrder.CalculateTotQtyWt();
						BpiccPlaceOrder.HandleGlobalDeleteForCheckDuplicatePartNo();
						BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
						
						
					}
				}
		 }
		 else 
		 {
			  var last_tr_id=$("#bpicc_tableDetails tbody").find("tr").last().attr('id');
			 BpiccPlaceOrder.ClearRowValues(last_tr_id);
			 $("#partNum_"+last_tr_id).val("");
			 	BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessages("","");
			BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();

			 
		 }
		
		 
	},
	HandleGlobalDeleteForCheckDuplicatePartNo:function()
	{
		if( bpi_obj.is_bulk_validate==0)
		{
			  $("#bpicc_tableDetails tbody input[id*='partNum_']").each(function() {
			   if(!empty($(this).val()))
				  {
			  // check if there is another one with the same value
				if ( $("#bpicc_tableDetails tbody input[id*='partNum_'][value='"+$(this).val()+"']").size() > 1) {
				  // highlight this
				  $(this).addClass('errorWarning');
				} else {
				  // otherwise remove
				  $(this).removeClass('errorWarning');
				}
			  }
			});
		}
	},
HandleGlobalDeleteForCheckDuplicateForAllPartNo:function(del_part_no)
	{
		BpiccPlaceOrder.HandleGlobalDeleteForCheckDuplicatePartNo();
	}, 
	OpenExcelModel:function()
	{
		   $(".errorFileFormat").hide();
		   	$(".errorFileFormat").html("");  
		$("#excel_upload_msg_div").remove();
		 var data=$("#bpicc_tableDetails tbody tr");
		 var enterted_cnt=0;
		$.each(data,function(k,v)
		{
			var tr_id=$(this).attr("id");
			 var part_no=$.trim($("#partNum_"+tr_id).val());
			 if(!empty(part_no))
			 {
				 enterted_cnt++;
			 }
		});
		if(enterted_cnt>0)
		{
			var confirm_flag=confirm("If you upload a spreadsheet, all information will be lost.  Do you want to continue?");
					if(confirm_flag)
					{
						bpi_obj.is_bulk_validate=0;
						 $("#bpicc_tableDetails tbody tr").remove();
						 BpiccPlaceOrder.CalculateTotQtyWt();
						 $("#upload").modal() ;
					}
		}
		else
		{
			$("#upload").modal() 
		}
	},
	RemoveError:function(input_id)
	{
		$(input_id).removeClass("errorError");
		$(input_id).removeClass("errorWarning");
		$(input_id).next("i").remove();
	},
	 
	AddError:function(input_id,error_type)
	{
		 BpiccPlaceOrder.RemoveError(input_id);
		 if(error_type=='Error')
		 {
			 bpi_com_obj.error_cnt++;
			$(input_id).addClass("errorError");
			$(input_id).after('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>');
		 } 
		 else if(error_type=='Warning')
		 {
			$(input_id).addClass("errorWarning");
			$(input_id).after('<i class="fa fa-exclamation-circle" aria-hidden="true"></i>');
		 }
	 
	},
	EmptyWareHouseData:function(tr_id)
	{
		$("#v1_"+tr_id).parent().find("span i").removeClass("greenIcon");
		$("#v1_"+tr_id).parent().find("span i").removeClass("redIcon");
		$("#v1_"+tr_id).parent().find("span i").removeClass("yellowIcon");

		$("#m1_"+tr_id).parent().find("span i").removeClass("greenIcon");
		$("#m1_"+tr_id).parent().find("span i").removeClass("redIcon");
		$("#m1_"+tr_id).parent().find("span i").removeClass("yellowIcon");

		$("#m2_"+tr_id).parent().find("span i").removeClass("greenIcon");
		$("#m2_"+tr_id).parent().find("span i").removeClass("redIcon");
		$("#m2_"+tr_id).parent().find("span i").removeClass("yellowIcon");

	/* 	$("#v1_"+tr_id).val("");
		$("#m1_"+tr_id).val("");
		$("#m2_"+tr_id).val(""); */
	},
	ValidateErrorsForSelectedPartNo:function(tr_id,part_no,is_qty_check)
	{	
		BpiccPlaceOrder.EnableValidateOrderDiv();
		
		// BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO(;
		 part_no=part_no;
		 if(empty(part_no) && bpi_obj.is_bulk_validate==0)
		 {
			 BpiccPlaceOrder.RemoveError("#partNum_"+tr_id,'Error');
			 BpiccPlaceOrder.RemoveError("#reqQnty_"+tr_id,'Error');
			 $("#partNum_"+tr_id).parent().find("i").remove();
			 $("#reqQnty_"+tr_id).parent().find("i").remove();
			 BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
			 BpiccPlaceOrder.HandleGlobalDeleteForCheckDuplicateForAllPartNo();
			 return;
		 }
		if($("#validate_on_entry").attr("validate")=="1")
		{		
			
			if(bpi_obj.prod_stock.hasOwnProperty(part_no))
			{
			
				BRAND_NAME=	bpi_obj.prod_stock[part_no]['BRAND_NAME'];
				ITEM_DESCRIPTION=	bpi_obj.prod_stock[part_no]['ITEM_DESCRIPTION'];
				var IS_CALIPER=	bpi_obj.prod_stock[part_no]['IS_CALIPER'];
				INVENTORY_ITEM_ID=	bpi_obj.prod_stock[part_no]['INVENTORY_ITEM_ID'];
				ITEM_STATUS=	bpi_obj.prod_stock[part_no]['ITEM_STATUS'];
				MIN_ORDER_QTY=	bpi_obj.prod_stock[part_no]['MIN_ORDER_QTY'];
				PRODUCT_NUM=	bpi_obj.prod_stock[part_no]['PRODUCT_NUM'];
				UNIT_WEIGHT=	bpi_obj.prod_stock[part_no]['UNIT_WEIGHT'];
				UNIT_WEIGHT=UNIT_WEIGHT.replace(/[^0-9.]/gi, '');
				ERROR_MSG=	$.trim(bpi_obj.prod_stock[part_no]['ERROR_MSG']);
				BpiccPlaceOrder.HandleGlobalDeleteForCheckDuplicateForAllPartNo();
			 
				if(empty(ERROR_MSG))
				{
					  
					EDC=	bpi_obj.prod_stock[part_no]['EDC'];
					MDC=	bpi_obj.prod_stock[part_no]['MDC'];
					WDC=	bpi_obj.prod_stock[part_no]['WDC'];
					 
					$("#brand_"+tr_id).val(BRAND_NAME);
					$("#desc_"+tr_id).val(ITEM_DESCRIPTION);
					$("#weight_"+tr_id).val(UNIT_WEIGHT);
					 
					$("#partNum_"+tr_id).removeClass("errorError");	
					$("#partNum_"+tr_id).parent().find("i").remove();
		 
					BpiccPlaceOrder.CalculateTotQtyWt();
						$("#reqQnty_"+tr_id).removeAttr("disabled");
						 if(bpi_obj.is_bulk_validate==0)
						 setTimeout(function(){$("#reqQnty_"+tr_id).focus();}, 100); 
					  
								
								BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
								if(is_qty_check=="Yes")
								{
									BpiccPlaceOrder.ValidateQty(tr_id);
								}
				}
				else
				{
						BpiccPlaceOrder.AddError("#partNum_"+tr_id,'Error');
						BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
						
						$("#reqQnty_"+tr_id).attr("disabled",'true');
						$("#reqQnty_"+tr_id).val("");
						$("#brand_"+tr_id).val("");
						$("#desc_"+tr_id).val("");
						$("#weight_"+tr_id).val("");
						
						$("#v1_"+tr_id).val("");
						$("#m1_"+tr_id).val("");
						$("#m2_"+tr_id).val("");
						 
					
						// $("#reqQnty_"+tr_id).removeAttr("disabled");
				}
			}
			else
			{
					BpiccPlaceOrder.AddError("#partNum_"+tr_id,'Error');
							BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
					BpiccPlaceOrder.EmptyWareHouseData(tr_id);
					$("#reqQnty_"+tr_id).attr("disabled",'true');
					$("#brand_"+tr_id).val("");
						$("#desc_"+tr_id).val("");
						$("#weight_"+tr_id).val("");
						$("#v1_"+tr_id).val("");
						$("#m1_"+tr_id).val("");
						$("#m2_"+tr_id).val("");
			}
		}
		else
		{
			BpiccPlaceOrder.RemoveError("#partNum_"+tr_id,'Error');
				BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
		}
	},
	 
	ValidateQty:function (tr_id)
	{
		// if($("#reqQnty_"+tr_id).attr("disabled")=='disabled') return;
		 var part_no=$.trim($("#partNum_"+tr_id).val());
		 var reqQnty=$.trim($("#reqQnty_"+tr_id).val());
		 reqQnty= parseInt((empty(reqQnty))?0:reqQnty);

		 BpiccPlaceOrder.RemoveError("#reqQnty_"+tr_id);
		  	BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
		if($("#validate_on_entry").attr("validate")=="1")
		{
			if(reqQnty==0)
			{
				BpiccPlaceOrder.AddError("#reqQnty_"+tr_id,'Error');
					BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
				 
				return;
			}
			else
			{
					BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
			}
			 if(bpi_obj.prod_stock.hasOwnProperty(part_no))
			 {
				
				var MIN_ORDER_QTY=	parseInt(bpi_obj.prod_stock[part_no]['MIN_ORDER_QTY']);
				 var IS_CALIPER=	bpi_obj.prod_stock[part_no]['IS_CALIPER'];
				 MIN_ORDER_QTY= 1;
				 /*  if(reqQnty<MIN_ORDER_QTY)
				 {
					BpiccPlaceOrder.AddError("#reqQnty_"+tr_id,'Warning');
					BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
					$("#reqQnty_"+tr_id).val(MIN_ORDER_QTY);
					reqQnty=MIN_ORDER_QTY;
					
				 } */
				  if(MIN_ORDER_QTY>0)
				 { 
					 var o_reqQnty=reqQnty;
					 reqQnty=MIN_ORDER_QTY*Math.ceil(o_reqQnty/MIN_ORDER_QTY);
//					 var attr_orignal_qty=parseFloat($("#reqQnty_"+tr_id).attr("orignal_qty"));//Old source code
					 var attr_orignal_qty=parseFloat(reqQnty);//new code
					if(o_reqQnty!=reqQnty)
					{
						BpiccPlaceOrder.AddError("#reqQnty_"+tr_id,'Warning');
						BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
						$("#reqQnty_"+tr_id).val(reqQnty);
						$("#reqQnty_"+tr_id).attr("orignal_qty",o_reqQnty);
							bpi_obj.excel_upload_min_qty_rows.push(tr_id);
					}
					else if(attr_orignal_qty>0 && in_array(tr_id,bpi_obj.excel_upload_min_qty_rows) &&
							attr_orignal_qty!=reqQnty && $("#bpicc_tableDetails tbody").find("tr").last().attr('id')-1==tr_id  && bpi_obj.is_last_excel_min_row_updated<=1)
					{
						BpiccPlaceOrder.AddError("#reqQnty_"+tr_id,'Warning');
						BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
						bpi_obj.is_last_excel_min_row_updated++;
					 
					}
				 }
					ERROR_MSG=	$.trim(bpi_obj.prod_stock[part_no]['ERROR_MSG']);
					if(empty(ERROR_MSG))
					{
						 
						var V1=parseInt(bpi_obj.prod_stock[part_no]['V1']);
						var M1=parseInt(bpi_obj.prod_stock[part_no]['M1']);
						var M2=parseInt(bpi_obj.prod_stock[part_no]['M2']);
						if(reqQnty<V1)
							V1=reqQnty;
						if(reqQnty<M1)
							M1=reqQnty;
						if(reqQnty<M2)
							M2=reqQnty;
						BpiccPlaceOrder.EmptyWareHouseData(tr_id);
					
						if($("#page_type").val()=='check_stock')
						{						
							$("#v1_"+tr_id).val(V1);
							$("#m1_"+tr_id).val(M1);
							$("#m2_"+tr_id).val(M2); 
							BpiccPlaceOrder.HandleCheckStockPage(tr_id);
						}
						  
						var default_dc=bpi_com_obj.default_dc;
						default_dc=empty(default_dc)?"V1":default_dc;
						 
						  if(IS_CALIPER=="1")
						  {
							default_dc="M2";  
						  }

						var default_dc_lower=default_dc.toLowerCase();
						var assign_val=0;
						if(default_dc=="V1")
							assign_val=V1;
						if(default_dc=="M1")
							assign_val=M1;
						if(default_dc=="M2")
							assign_val=M2;
						
						existing_V1_val=$("#v1_"+tr_id).val();
						existing_M1_val=$("#m1_"+tr_id).val();
						existing_M2_val=$("#m2_"+tr_id).val();
						
						// console.log("existing_V1_val--"+existing_V1_val+"---------existing_M1_val"+existing_M1_val+"-----------existing_M2_val"+existing_M2_val);
						// if(empty($("#"+default_dc_lower+"_"+tr_id).val()))
							// alert($("#"+default_dc_lower+"_"+tr_id).val());
						// if(IS_CALIPER!="1")
							$("#"+default_dc_lower+"_"+tr_id).val(assign_val);
					 
						
						var already_check_val=$("input[name='inputAvail_"+tr_id+"']:checked").val();


						 if(already_check_val=="M2")
						 {
							 $("#m2_"+tr_id).val(M2);
						 }if(already_check_val=="V1")
						 {
							 $("#v1_"+tr_id).val(V1);
						 }if(already_check_val=="M1")
						 {
							 $("#m1_"+tr_id).val(M1);
						 }
						  if(IS_CALIPER=="1")
						  {
							  already_check_val="M2";
						  }
						if(!empty(already_check_val))
							default_dc=already_check_val;
						  if(IS_CALIPER=="1")
						  {
							  default_dc="M2";
						  }
						 
						if(default_dc=="V1")
						{
							if(V1==0)
							{
								 BpiccPlaceOrder.DCEnableProperCheckBox(tr_id,"V1","redIcon",1);
								 // BpiccPlaceOrder.EnableValidateOrderDiv();
							}
							else if(reqQnty<=V1)
							{
								 BpiccPlaceOrder.DCEnableProperCheckBox(tr_id,"V1","greenIcon",1);
							}
							else
							{
								 BpiccPlaceOrder.DCEnableProperCheckBox(tr_id,"V1","yellowIcon",1);
								
							}
						}
						else if(default_dc=="M1")
						{
							if(M1==0)
							{
								 BpiccPlaceOrder.DCEnableProperCheckBox(tr_id,"M1","redIcon",1);
								 // BpiccPlaceOrder.EnableValidateOrderDiv();
							}
							else if(reqQnty<=M1)
							{
								 BpiccPlaceOrder.DCEnableProperCheckBox(tr_id,"M1","greenIcon",1);
							}
							else
							{
								 BpiccPlaceOrder.DCEnableProperCheckBox(tr_id,"M1","yellowIcon",1);
								
							}
						}
						else if(default_dc=="M2")
						{
							if(M2==0)
							{
								 BpiccPlaceOrder.DCEnableProperCheckBox(tr_id,"M2","redIcon",1);
								 // BpiccPlaceOrder.EnableValidateOrderDiv();
							}
							else if(reqQnty<=M2)
							{
								 BpiccPlaceOrder.DCEnableProperCheckBox(tr_id,"M2","greenIcon",1);
							}
							else
							{
								 BpiccPlaceOrder.DCEnableProperCheckBox(tr_id,"M2","yellowIcon",1);
								
							}
							
						}
						  
						 
						if($("#page_type").val()=='check_stock')
						{						
							 
								BpiccPlaceOrder.HandleCheckStockPage(tr_id);
						} 
						 if(IS_CALIPER=="1")
						  {
							  BpiccPlaceOrder.DisableAllINputFieldsForCaliber(tr_id);
						  }
					}
					

			 }
			 else
			 {
				 BpiccPlaceOrder.EnableValidateOrderDiv();
			 }
		}
		 
	},
	DisableAllINputFieldsForCaliber:function(tr_id)
	{
		$("#M1_RADIO_"+tr_id).attr('disabled',true);
		$("#M1_i_"+tr_id).attr('disabled',true);
		
		$("#V1_RADIO_"+tr_id).attr('disabled',true);
		$("#V1_i_"+tr_id).attr('disabled',true);
		
		$("#M2_RADIO_"+tr_id).attr('disabled',true);
		$("#M2_i_"+tr_id).attr('disabled',true);
	},
	CalculateTotQtyWt:function ()
	{
		 if(bpi_obj.is_bulk_validate==0)
		 {
			var e_tot_qty=0;
			var e_tot_wt=0;
			
			var m_tot_qty=0;
			var m_tot_wt=0;

			var w_tot_qty=0;
			var w_tot_wt=0;
			var data=$("#bpicc_tableDetails tbody tr");
			var s_v1_qty=0;
			var s_m1_qty=0;
			var s_m2_qty=0;
			var tot_wc_qty=0;
			var tot_lines=0;
				var partNum="";
				var reqQnty="";
				var checked_val="";
			$.each(data,function(k,v)
			{
				var tr_id=$(this).attr("id");/* 
				var partNum=$("#bpicc_tableDetails tbody tr#"+tr_id+" #partNum_"+tr_id).val();
				reqQnty=$("#bpicc_tableDetails tbody tr#"+tr_id+" #reqQnty_"+tr_id).val();
				
				checked_val=$("input[name='inputAvail_"+tr_id+"']:checked").val(); */
				
				  partNum=$(this).find("#partNum_"+tr_id).val();
				reqQnty=$(this).find("#reqQnty_"+tr_id).val();
				
				checked_val= $(this).find("input[name*='inputAvail_']:checked").val();
				
				var weight=0;
				
				reqQnty= parseFloat((empty(reqQnty))?0:reqQnty);
				if(!empty(partNum))
				{
					tot_lines++;
				}
				if(reqQnty>0)
				{
					  s_v1_qty=0;
					  s_m1_qty=0;
					  s_m2_qty=0;
					
					if(checked_val=="EDC")
					{
						s_v1_qty=parseInt($(this).find("#v1_"+tr_id).val());
						e_tot_qty=parseFloat(e_tot_qty+reqQnty);
						 weight=$(this).find("#weight_"+tr_id).val();
						weight=parseFloat((empty(weight))?0:weight);
						e_tot_wt=parseFloat(e_tot_wt+(weight*reqQnty))  ;
						
					}
					if(checked_val=="MDC")
					{
						s_m1_qty=parseInt($(this).find("#m1_"+tr_id).val());
						 
						m_tot_qty=parseFloat(m_tot_qty+reqQnty);
						  weight=$(this).find("#weight_"+tr_id).val();
						weight=parseFloat((empty(weight))?0:weight);
						m_tot_wt=parseFloat(m_tot_wt+(weight*reqQnty))  ;
						
					}
					if(checked_val=="WDC")
					{
						s_m2_qty=parseInt($(this).find("#m2_"+tr_id).val());
						w_tot_qty=parseFloat(w_tot_qty+reqQnty);
						  weight=$(this).find("#weight_"+tr_id).val();
						weight=parseFloat((empty(weight))?0:weight);
						w_tot_wt=parseFloat(w_tot_wt+(weight*reqQnty))  ;
						
					}
					tot_wc_qty=empty(tot_wc_qty)?0:tot_wc_qty;
					s_v1_qty=empty(s_v1_qty)?0:s_v1_qty;
					s_m1_qty=empty(s_m1_qty)?0:s_m1_qty;
					s_m2_qty=empty(s_m2_qty)?0:s_m2_qty;
					tot_wc_qty=parseFloat(tot_wc_qty)+parseFloat(s_v1_qty)+parseFloat(s_m1_qty)+parseFloat(s_m2_qty);
				}

				
			});
			
			$("#Tot_No_Of_Lines").html(tot_lines);
			$("#totalWeightEDC").html(0);
			$("#totalWeightMDC").html(0);
			$("#totalWeightWDC").html(0);
			
			$("#totalQtyEDC").html(0);
			$("#totalQtyMDC").html(0);
			$("#totalQtyWDC").html(0);
			
			$("#totalWeightEDC").html(tarkaRound(e_tot_wt,3));
			$("#totalWeightMDC").html(tarkaRound(m_tot_wt,3));
			$("#totalWeightWDC").html(tarkaRound(w_tot_wt,3));
			
			$("#totalQtyEDC").html(e_tot_qty);
			$("#totalQtyMDC").html(m_tot_qty);
			$("#totalQtyWDC").html(w_tot_qty);
			var e_tot_qty=parseFloat(e_tot_qty)+parseFloat(m_tot_qty)+parseFloat(w_tot_qty);
			var perc=tarkaRound((tot_wc_qty/e_tot_qty)*100,1);
				 $("#percentValue").html("0%");
			if(!isNaN(perc))
			 $("#percentValue").html(perc+"%");

		 
		 }

	},
	ResetForm:function()
	{
		 var data=$("#bpicc_tableDetails tbody tr");
		 var enterted_cnt=0;
		$.each(data,function(k,v)
		{
			var tr_id=$(this).attr("id");
			 var part_no=$.trim($("#partNum_"+tr_id).val());
			 if(!empty(part_no))
			 {
				 enterted_cnt++;
			 }
		});
		if(enterted_cnt>0)
		{
			var confirm_flag=confirm("Do you want to clear all items in the form?");
					if(confirm_flag)
					{
						BpiccPlaceOrder.CallResetData();
					}
		}
		else
		{
			BpiccPlaceOrder.CallResetData();
		}
		 
		
		
		 
	},
	CallResetData:function()
	{
		bpi_obj.is_bulk_validate=0;
			$("#validate_po_erro_msg_div").remove();
			$("#percentValue").html("0%");
			$("#totalWeightEDC").html(0);
			$("#totalWeightMDC").html(0);
			$("#totalWeightWDC").html(0);
			$("#Tot_No_Of_Lines").html(0);

			$("#totalQtyEDC").html(0);
			$("#totalQtyMDC").html(0);
			$("#totalQtyWDC").html(0);
			$("#bpicc_tableDetails tbody tr").remove();
			BpiccPlaceOrder.AddDefaultRowsOnLoad();

			BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessages("","");
			BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();

			setTimeout(function(){$("#partNum_2").focus();}, 100); 
			$("#excel_upload_msg_div").remove();
	},
	DeleteAllRows:function()
	{
		 if($("#page_type").val()=='place_order' && empty($("#inputPo").val()))
		 {
			 BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessages("Please Enter PO Number","Error"); 
			 
			 return false;
		 }
		 
		var data=$("#bpicc_tableDetails tbody tr");
		 	var confirm_flag=confirm("Do you want to delete all records?");
			
				if(confirm_flag)
				{
					
					$.each(data,function(k,v)
					{
						var tr_id=$(this).attr("id");
						$("#partNum_"+tr_id).val("");
						 if($("#bpicc_tableDetails tbody tr").length>1)
						 {
								var row_disabled=$("#partNum_"+tr_id).attr("disabled");
						 
								if(row_disabled!="disabled")
								{
								
										$("#bpicc_tableDetails tbody tr#"+tr_id).remove();
										BpiccPlaceOrder.CalculateTotQtyWt();
									 
								}
						 }
					});
					BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
					BpiccPlaceOrder.ResetForm();
				}
	},
 
	ValidateEnteredPartNo:function (tr_id)
	{
		var part_no=$("#bpicc_tableDetails tbody  #partNum_"+tr_id).val();
		$("#bpicc_tableDetails tbody  #partNum_"+tr_id).attr("value",part_no);
		$("#validate_po_erro_msg_div").remove(); 
		 BpiccPlaceOrder.RemoveError("#partNum_"+tr_id);
		 if(bpi_obj.is_bulk_validate==0)
		 BpiccPlaceOrder.ClearRowValuesExceptPart(tr_id);
		
		 // BpiccPlaceOrder.EnableValidateOrderDiv();
		if(!empty(part_no))
		{ 
		BpiccPlaceOrder.RemoveError("#partNum_"+tr_id);
			$('#reset_form').removeAttr("disabled");
			 if($("#place_order_error_info p:contains('Please enter at least one item')").length>0)
			{
					$("#place_order_error_info").hide();
			}  
				
			if($("#validate_on_entry").attr("validate")=="1")
			{ 
				if(bpi_obj.prod_stock.hasOwnProperty(part_no))//if its exists no need to call apI
				{
						 BpiccPlaceOrder.ValidateErrorsForSelectedPartNo(tr_id,part_no);
				}
				else
				{
					 BpiccPlaceOrder.APICheckStock(part_no, function() {//if its not exists exists no need to call apI
					//BpiccPlaceOrder.ReadManualXml(part_no, function() {//if its not exists exists no need to call apI
						  BpiccPlaceOrder.ValidateErrorsForSelectedPartNo(tr_id,part_no);
						});
				}
			}
			else
			{
				$("#reqQnty_"+tr_id).removeAttr('disabled',true);
				
				if(bpi_obj.is_bulk_validate==0)
				 setTimeout(function(){$("#reqQnty_"+tr_id).focus();}, 100); //removed by natesha
			}
		}
		else
		{
			 BpiccPlaceOrder.ValidateErrorsForSelectedPartNo(tr_id,part_no);
		}
	},
	ClearRowValues:function(tr_id)
	{
		$("#partNum_"+tr_id).removeClass("errorError");
		$("#partNum_"+tr_id).removeClass("errorWarning");
		
		$("#partNum_"+tr_id).parent().find("i").remove();
		$("#reqQnty_"+tr_id).parent().find("i").remove()
		;
		$("#brand_"+tr_id).val("");
		$("#desc_"+tr_id).val("");
		$("#weight_"+tr_id).val("");
		$("#reqQnty_"+tr_id).val("");
	
		$("#v1_"+tr_id).val("");
		$("#m1_"+tr_id).val("");
		$("#m2_"+tr_id).val("");
		
		$("#v1_"+tr_id).parent().find("span i").removeClass("greenIcon");
		$("#v1_"+tr_id).parent().find("span i").removeClass("redIcon");
		$("#v1_"+tr_id).parent().find("span i").removeClass("yellowIcon");

		$("#m1_"+tr_id).parent().find("span i").removeClass("greenIcon");
		$("#m1_"+tr_id).parent().find("span i").removeClass("redIcon");
		$("#m1_"+tr_id).parent().find("span i").removeClass("yellowIcon");

		$("#m2_"+tr_id).parent().find("span i").removeClass("greenIcon");
		$("#m2_"+tr_id).parent().find("span i").removeClass("redIcon");
		$("#m2_"+tr_id).parent().find("span i").removeClass("yellowIcon");
	 
		
	},
	ClearRowValuesExceptPart:function(tr_id)
	{ 
		
		$("#partNum_"+tr_id).parent().find("i").remove();
		$("#reqQnty_"+tr_id).parent().find("i").remove()
		;
		$("#brand_"+tr_id).val("");
		$("#desc_"+tr_id).val("");
		$("#weight_"+tr_id).val("");
		 
	
		$("#v1_"+tr_id).val("");
		$("#m1_"+tr_id).val("");
		$("#m2_"+tr_id).val("");
		
		$("#v1_"+tr_id).parent().find("span i").removeClass("greenIcon");
		$("#v1_"+tr_id).parent().find("span i").removeClass("redIcon");
		$("#v1_"+tr_id).parent().find("span i").removeClass("yellowIcon");

		$("#m1_"+tr_id).parent().find("span i").removeClass("greenIcon");
		$("#m1_"+tr_id).parent().find("span i").removeClass("redIcon");
		$("#m1_"+tr_id).parent().find("span i").removeClass("yellowIcon");

		$("#m2_"+tr_id).parent().find("span i").removeClass("greenIcon");
		$("#m2_"+tr_id).parent().find("span i").removeClass("redIcon");
		$("#m2_"+tr_id).parent().find("span i").removeClass("yellowIcon");
	 
		
	},
 
	
	 
	APICheckStock:function(prod_ids_list,callback)
	{
		split_arr=prod_ids_list.split(",");
		prod_list="";
		var part_no_arr="";
		for(i=0;i<split_arr.length;i++)
		{
			if(i==0){
				part_no_arr=$.trim(split_arr[i]);
			}else{
				part_no_arr=part_no_arr+","+$.trim(split_arr[i]);
			}
//			var part_no=$.trim(split_arr[i]);
//			if(!empty(part_no))
//			{
//				prod_list+='<chec:P_PRODUCT_ITEM>';
//				prod_list+='<chec:PRODUCT_NUM>'+part_no+'</chec:PRODUCT_NUM>';
//				prod_list+='</chec:P_PRODUCT_ITEM>';
//			}
//			
		}
		if(split_arr.length>1)
		{
				$(".loader").show();
		}
		var shipTO=getCookie("selected_ship_to");
		var billTO=getCookie("selected_bill_to");
		var userID=getCookie("userID");
		var orgID=getCookie("selected_org_id");
		if(empty(part_no_arr)) return;
		xml_request_data='';
		xml_request_data+='<soapenv:Envelope xmlns:chec="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/check_stock/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xxb="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/">';
		xml_request_data+='<soapenv:Header><wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"><wsse:UsernameToken wsu:Id="UsernameToken-E739E7BD4A96DC5D3A148740685027013"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password><wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">Q0bJKr12IBZPbXDrCOFkKw==</wsse:Nonce><wsu:Created>2017-02-18T08:34:10.270Z</wsu:Created></wsse:UsernameToken></wsse:Security>';
		xml_request_data+='<xxb:SOAHeader>';
		xml_request_data+='<xxb:Responsibility>BPI_WEB_SERVICE_USER</xxb:Responsibility>';
		xml_request_data+='<xxb:RespApplication>XXBPI</xxb:RespApplication>';
		xml_request_data+='<xxb:SecurityGroup>STANDARD</xxb:SecurityGroup>';
		xml_request_data+='<xxb:NLSLanguage>AMERICAN</xxb:NLSLanguage>';
		xml_request_data+='<xxb:Org_Id>82</xxb:Org_Id>';
		xml_request_data+='</xxb:SOAHeader>';
		xml_request_data+='</soapenv:Header>';
		xml_request_data+='<soapenv:Body>';
		xml_request_data+='<chec:InputParameters>';
		
		
		xml_request_data+='<chec:P_SHIP_TO>'+bpi_com_obj.ship_to_location+'</chec:P_SHIP_TO>';
         xml_request_data+='<chec:P_BILL_TO>'+bpi_com_obj.bill_to_location+'</chec:P_BILL_TO>';
	 
			
		xml_request_data+='<chec:P_PRODUCT>';
		xml_request_data+=prod_list;		
		xml_request_data+='</chec:P_PRODUCT>';
		xml_request_data+='</chec:InputParameters>';
		xml_request_data+='</soapenv:Body>';
		xml_request_data+='</soapenv:Envelope>';
		var url = bpi_com_obj.web_oracle_api_url+"GetCheckStock?org_id="+orgID+"&ship_to="+shipTO+"&product_no="+part_no_arr; 
		  // var url = "http://uswodapp013.brakepartsinc.com:8010/webservices/SOAProvider/plsql/xxbpi_customer_online/";
//		 var url = bpi_com_obj.web_api_url;
			 jQuery.ajax({
					type: "GET",
					url: url,
	//				 data: "xml_data="+xml_request_data+"&call_type=MEXICO",
					dataType: "json",
					async:false,
					crossDomain: true,
					processData: false,
					// contentType: "text/xml; charset=\"utf-8\"",
					 
					success: function (data) {
						$(".loader").hide();
						 var obj=JSON.parse(data.object);
						 if(obj!=null){
							var productObj=obj.x_product_avail;
//							if(productObj!=null){
							 BpiccPlaceOrder.ProcessCheckStockXml(productObj,callback);
//							}
						 }
					},
					error: function (msg) {
						$(".loader").hide();
							setTimeout(function(){$("#select_order_type").focus();}, 100); 
						// alert("Failed: " + msg.status + ": " + msg.statusText);
					}
				});
	},
	ReadManualXml:function(prod_list,callback)
	{
	 
		var a="a.xml";
		$.get( a, function(data) {
			 BpiccPlaceOrder.ProcessCheckStockXml(data,callback);
			});
	},
	ValidateOrder:function()
	{
			bpi_obj.excel_upload_min_qty_rows=[];
		bpi_com_obj.error_cnt=0;
		$("#validate_on_entry").attr("validate","1");
		 
		var data=$("#bpicc_tableDetails tbody tr");
		 xml_part_no="";
		 var part_no_cnt=0;
		$.each(data,function(k,v)
		{
			var tr_id=$(this).attr("id");
			
			var partNum=$.trim($(this).find("#partNum_"+tr_id).val());
			if(!empty(partNum))
				part_no_cnt++;
			if(!bpi_obj.prod_stock.hasOwnProperty(partNum) && !empty(partNum))
			{
				 
				xml_part_no+=partNum+",";
			}
		});
		 if($("#page_type").val()=='place_order' && empty($("#inputPo").val())) 
		 {
			  BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessages("Please Enter PO Number","Error");
			 return false;
		 }
		 if(part_no_cnt==0)
		 {
			 BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessages("Please enter at least one item","Error");
			 $("#partNum_1").focus();
			 return false;
		 }
		 if($("#page_type").val()=='place_order' && $("#select_order_type").val()=="orderType")
		 {
			  BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessages("Please Select Order Type","Error");
			 return false;
		 }
		 
		
		 
		 
		   if(!empty(xml_part_no))
			{
				 var dfd = $.Deferred();
				BpiccPlaceOrder.APICheckStock(xml_part_no,function(){
					 
					BpiccPlaceOrder.ValidateOrderRowByRow();
				}); 
					  dfd.resolve(); 
			}
			else    
			{
				 var dfd = $.Deferred();
				BpiccPlaceOrder.ValidateOrderRowByRow();
				
				 dfd.resolve(); 
			}
			
		  
	},
	HandleEmergencyCheck:function()
	{
		var flag=true;
		BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessages("","");
		if($("#page_type").val()=='place_order' && $("#select_order_type").val()=="ER")
		{
			var data=$("#bpicc_tableDetails tbody tr");
			$.each(data,function(k,v)
			{
				var tr_id=$(this).attr("id");
				var partNum=$("#bpicc_tableDetails tbody tr#"+tr_id+" #partNum_"+tr_id).val();
				var reqQnty=parseFloat($("#bpicc_tableDetails tbody tr#"+tr_id+" #reqQnty_"+tr_id).val());
				var warehouse=$("input[name='inputAvail_"+tr_id+"']:checked").val();
				if(!empty(warehouse) && warehouse!='undefined')
				{
					var warehouse_inpu=warehouse.toLowerCase();
					var warehouse_inpu_val=parseFloat($("#"+warehouse_inpu+"_"+tr_id).val());
			 
					 if(!empty(partNum) && reqQnty>warehouse_inpu_val)
					{
						 flag=false;
						 setTimeout(function(){
					BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessages(partNum+" -- Emergency Orders Cannot be Backordered","Error");
				}, 500); 
						
						return flag;
					}
				}
			 
			});
		}
		return flag;
	},
	EnableContinueOrderDiv:function()
	{
		 
			$("#validate_order").attr("disabled",true);
			if($("#page_type").val()=='place_order')
			{
			 $("#continue_order").removeAttr("disabled")
			}
			else
			{
				if(bpi_com_obj.place_order_right_exists==0)
				{
					$("#continue_order").attr("disabled",true);
					$("#validate_order").removeAttr("disabled");
				}
				else
				{
					 $("#continue_order").removeAttr("disabled");
				}
			}
	},
	EnableValidateOrderDiv:function()
	{
		$("#continue_order").attr("disabled",true);
		$("#validate_order").removeAttr("disabled");
		
				
		
	},
	HandleOnchangeOrderType:function()
	{
		$("#validate_po_erro_msg_div").remove();
		 if($("#place_order_error_info p:contains('Please Select Order Type')").length>0)
				{
						$("#place_order_error_info").hide();
				}  
	
	},
	ContinueOrder:function()
	{
		$("#excel_upload_msg_div").remove();
		if(BpiccPlaceOrder.HandleEmergencyCheck())
		{
			inputPo=$("#inputPo").val();
				if(empty(inputPo))
				{
						BpiccPlaceOrder.ShowShppingErrorSuccessMessages("Please Enter PO Number","Error"); 
						return false;
				}
		
			$("#place_order_error_info").hide();
			$("#shipping_error_info").hide();
			$(".placeorder").hide();
			$(".shippingBlock").show();
			$(".uploadOrderPane").hide();
			$("#select_order_type").attr('disabled',true);
			$("#inputPo").attr('disabled',true);
			
			 BpiccPlaceOrder.EnableEmergencyShipRadioType();
			 BpiccPlaceOrder.PopulateShippingAddressValues();
			 if($("#select_order_type").val()=="ST")
			 {
				 $("#shipping_method_div").hide();
				 $("#standard_shipping_method_div").show();
				 
			 }
			 else
			 {
				 // BpiccPlaceOrder.DisableEmergencyShipRadioType();
				  $("#shipping_method_div").show();
				  $("#standard_shipping_method_div").hide();
			 }
		}
		 
		 
	},
	ReviewUpdateOrder:function()
	{
		$("#continue_order").attr("disabled",true);
		$(".validateOrder").removeAttr("disabled");
				
		$(".placeorder").show();
		$(".shippingBlock").hide();
		$(".uploadOrderPane").show();
		$("#select_order_type").removeAttr('disabled');
		$("#inputPo").removeAttr('disabled');
	},
	ValidateOrderRowByRowExcel:function()
	{
		$(".loader").show();
			 setTimeout(function(){
			 	$("#validate_on_entry").attr("validate","1");
			 var data=$("#bpicc_tableDetails tbody tr");
		 
				 var row_error=0;
				 
				 var l=data.length;
				 var cnt=0;
				$.each(data,function(k,v)
				{
					 $(".loader").show();
					var tr_id=$(this).attr("id");
					 bpi_obj.is_bulk_validate=1;
					var partNum=$.trim($(this).find("#partNum_"+tr_id).val());
					
					if(!empty(partNum))
					{
						BpiccPlaceOrder.ValidateQty(tr_id);
						BpiccPlaceOrder.ValidateErrorsForSelectedPartNo(tr_id,partNum);
						 
					}
					
					cnt++;
					if(cnt>=l)
					{
						 
						 bpi_obj.is_bulk_validate=0;
						 
					
							 BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
								BpiccPlaceOrder.HandleGlobalDeleteForCheckDuplicatePartNo();
								BpiccPlaceOrder.CalculateTotQtyWt();
									$(".loader").hide();
						 
					}				
					
					
				});
			 
			  }, 200);
	},
	ValidateOrderRowByRow:function()
	{
		 $(".loader").show();
			 setTimeout(function(){
			 	$("#validate_on_entry").attr("validate","1");
			 var data=$("#bpicc_tableDetails tbody tr");
		 
				 var row_error=0;
				 
				 var l=data.length;
				 var cnt=0;
				$.each(data,function(k,v)
				{
					 $(".loader").show();
					var tr_id=$(this).attr("id");
					 bpi_obj.is_bulk_validate=1;
					var partNum=$.trim($(this).find("#partNum_"+tr_id).val());
					
					if(!empty(partNum))
					{
						BpiccPlaceOrder.ValidateQty(tr_id);
						BpiccPlaceOrder.ValidateErrorsForSelectedPartNo(tr_id,partNum);
						 
					}
					
					cnt++;
					if(cnt>=l)
					{
						 
						 bpi_obj.is_bulk_validate=0;
						 
						$(".loader").hide();
							 BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
								BpiccPlaceOrder.HandleGlobalDeleteForCheckDuplicatePartNo();
								BpiccPlaceOrder.CalculateTotQtyWt()
						 setTimeout(function(){
									if(bpi_com_obj.error_cnt==0 && BpiccPlaceOrder.HandleEmergencyCheck() )
									{
										BpiccPlaceOrder.EnableContinueOrderDiv();
									}
											 
									 
									else
									{
										BpiccPlaceOrder.EnableValidateOrderDiv();
								  }
								}, 500); 
								
								if(!$("#validate_on_entry").prop('checked'))
								{
									$("#validate_on_entry").attr("validate","0");
								}
								
							 setTimeout(function(){
								 if(!$("#validate_on_entry").prop('checked'))
										{
											$("#validate_on_entry").attr("validate","0");
										}
							}, 500); 
					}				
					
					
				});
			 
			  }, 200);
		 
		
			 
	},
	FillDistCenterValues:function()
	{
		var data=$("#bpicc_tableDetails tbody tr");
		 
		 var row_error=0;
		$.each(data,function(k,v)
		{
			var tr_id=$(this).attr("id");
			 
				 

		 
			 
		});
			 
	},
	ProcessCheckStockXml:function(xml,callback)
	{
		  try {
//				 $(xml).find('X_PRODUCT_AVAIL').each(function(){
//	                     $(this).find("X_PRODUCT_AVAIL_ITEM").each(function(){
			  if(xml!=null){
				  for (var i = 0; i < xml.length; i++) {
					  var object = xml[i];
							var  prod_obj=new Object();
//	                        var PRODUCT_NUM= $(this).find("PRODUCT_NUM").text();
//	                        prod_obj['PRODUCT_NUM']= $(this).find("PRODUCT_NUM").text();;
//	                        prod_obj['INVENTORY_ITEM_ID']= $(this).find("INVENTORY_ITEM_ID").text();;
//	                        prod_obj['ITEM_STATUS'] = $(this).find("ITEM_STATUS").text();;
//	                        prod_obj['BRAND_NAME'] = $(this).find("BRAND_NAME").text();;
//	                        prod_obj['ITEM_DESCRIPTION'] = $(this).find("ITEM_DESCRIPTION").text();;
//							var ITEM_DESCRIPTION=$(this).find("ITEM_DESCRIPTION").text();
//							prod_obj['IS_CALIPER']='0';
//							if(ITEM_DESCRIPTION.indexOf("CALIPER")>=0)
//								prod_obj['IS_CALIPER']='1';
//						 
//						 
//	                        prod_obj['UNIT_WEIGHT']= $(this).find("UNIT_WEIGHT").text();;
//							prod_obj['MIN_ORDER_QTY']= $(this).find("MIN_ORDER_QTY").text();;
//	                        prod_obj['ERROR_MSG'] = $(this).find("ERROR_MSG").text(); 
	                        
	                        var PRODUCT_NUM= object.PRODUCT_NUM;
	                        prod_obj['PRODUCT_NUM']= object.PRODUCT_NUM;
	                        prod_obj['INVENTORY_ITEM_ID']= object.INV_ITEM_ID;
	                        prod_obj['ITEM_STATUS'] = object.ITEM_STATUS;
	                        prod_obj['BRAND_NAME'] = object.BRAND_NAME;
	                        prod_obj['ITEM_DESCRIPTION'] = object.ITEM_DESCRIPTION;
							var ITEM_DESCRIPTION = object.ITEM_DESCRIPTION;
							prod_obj['IS_CALIPER']='0';
//							if(ITEM_DESCRIPTION.indexOf("CALIPER")>=0)
//								prod_obj['IS_CALIPER']='1';
						 
						 
	                        prod_obj['UNIT_WEIGHT']= object.UNIT_WEIGHT;
							prod_obj['MIN_ORDER_QTY']= object.MIN_ORDER_QTY;
	                        prod_obj['ERROR_MSG'] = object.ERROR_MSG;
	                        if(object.UNIT_WEIGHT==null){
	                        	break;
	                        }
	                        var availProductItem=object.AVAIL_PRODUCT_ITEM;
	                        var split_arr=availProductItem.split(",");
	        				for(i=0;i<split_arr.length;i++)
	        				{
	        					if($.trim(split_arr[i])=='V1'||$.trim(split_arr[i])=='M1'||$.trim(split_arr[i])=='M2'){
	        						var ORGANIZATION_CODE= split_arr[i];
	        						i++;
	 							   var AVAILABLE_QTY= split_arr[i];
	 							   AVAILABLE_QTY=parseInt(AVAILABLE_QTY);
	 							   if(AVAILABLE_QTY<0)
	 								   AVAILABLE_QTY=0;
	 							   prod_obj[ORGANIZATION_CODE]=AVAILABLE_QTY;	
	        					}
	        				}
//	                       $.each($(this).find("AVAIL_PRODUCT").find("AVAIL_PRODUCT_ITEM"),function()//looping through edc/mdc/wdc
//						   {
//							   var ORGANIZATION_CODE=$(this).find("ORGANIZATION_CODE").text();
//							   var AVAILABLE_QTY=$(this).find("AVAILABLE_QTY").text();
//							   AVAILABLE_QTY=parseInt(AVAILABLE_QTY);
//							   if(AVAILABLE_QTY<0)
//								   AVAILABLE_QTY=0;
//							   prod_obj[ORGANIZATION_CODE]=AVAILABLE_QTY;
							   
//						   }) 
						   bpi_obj.prod_stock[PRODUCT_NUM]=new Object();
						   bpi_obj.prod_stock[PRODUCT_NUM]=prod_obj;
//						});
//				 });
	                     }}
				 if (callback && typeof(callback) === "function") {
							callback();
						}
		    }
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ProcessCheckStockXml";
			  alert(message);
		  }  
	},
	
	APIExcelCheckStock:function(prod_ids_list,part_qty_arr,part_no_dc_arr,callback)
	{
	//	prod_ids_list="9478,947PG,947SG,9480,9480R,9481,9481R,9482,9482R,9483,9483R,9484,9484R,9485,9485B,9485R,9486,9486R,9487,9487R,948PG,948SG,9494,9494R,9495B,9497,EHT1000H,EHT1001,EHT1002,EHT1003,EHT1004H,EHT1005H,EHT1012AH,EHT1012H,EHT1015H,EHT1017H,EHT1018H,EHT1019AH,EHT1019H,EHT1020AH,EHT1020H,EHT1021H,EHT1022H,EHT1024,EHT1028H,H1105,H154162,BH383838,EHT436H,MK1,ehT436H,MGD1169CH,H1105,H5025,10012N,H171372,H72702,H1198,WCC966,S22067,6184B,H28622,H5114,10117N,H2100,FRC7700N,FRC11963,FRC12031,FRC12032,FRC12169,FRC12170,FRC4123,FRC4124,FRC4126,FRC4139,FRC4140,FRC4178,FRC4213,FRC4413,FRC4417,FRC4418,FRC7017,FRC7023,FRC7024,FRC7700,FRC7800,FRC10003,FRC10004,FRC10185,FRC10186,FRC10277,FRC10509,FRC10523,FRC10629,FRC10674,FRC10763,FRC10764,FRC10839,FRC10840,FRC10905,FRC10909,FRC10911,FRC10912,FRC10917,FRC10918,FRC10959,FRC10962,FRC10963,FRC10993,FRC10994,FRC11005,FRC11006,FRC11010,FRC11011,FRC11012,FRC11029,FRC11035,FRC11036,FRC11085,FRC11086,FRC11173,FRC11203,FRC11204,FRC11237A,FRC11267,FRC11268,FRC11287,FRC11309,FRC11331,FRC11332,FRC11359,FRC11360,FRC11379,FRC11380,FRC11435,FRC11508,FRC11510,FRC11527,FRC11528,FRC11530,FRC11557,FRC11573,FRC11574,FRC11576,FRC11588,FRC11589,FRC11590,FRC11684,FRC11713,FRC11797,FRC11798,FRC11825,FRC11826,FRC11903,FRC11904,SGD52M,SGD914C,BH36765,SGD1719C,242PG,280PG,314PG,452PG,583PG,647PG,675PG,747PG,781PG,855PG,919PG,960PG,228PG,574PG,854PG,SGD815M,SGD632C,SGD1363C,SGD1367C,SGD1508C,SGD340AC,SGD1083C,SGD1100C,SGD1172C,SGD1194C,SGD1258AC,SGD1258C,SGD1264C,SGD1273M,SGD1274M,SGD1336C,SGD1375M,SGD1377C,SGD1414C,SGD1578C,SGD52C,SGD52M,SGD91M,SGD120M,SGD149M,SGD154M,SGD369C,SGD369M,SGD376M,SGD389C,SGD436AC,SGD459M,SGD465AC,SGD473C,SGD562C,SGD598C,SGD606C,SGD652M,SGD655M,SGD667M,SGD674M,SGD679C,SGD679M,SGD698";
		 if($("#place_order_error_info p:contains('Please enter at least one item')").length>0)
			{
					$("#place_order_error_info").hide();
			} 
		 bpi_obj.is_bulk_validate=1;
			$(".errorFileFormat").show();
			$(".errorFileFormat").html("Please Wait, Validating Data..");  	  
		split_arr=prod_ids_list.split(",");
		prod_list="";
		for(i=0;i<split_arr.length;i++)
		{
			var part_no=$.trim(split_arr[i]);
			if(!empty(part_no))
			{
				prod_list+='<chec:P_PRODUCT_ITEM>';
				prod_list+='<chec:PRODUCT_NUM>'+part_no+'</chec:PRODUCT_NUM>';
				prod_list+='</chec:P_PRODUCT_ITEM>';
			}
			
		}
		 
		if(split_arr.length>1)
		{
				$(".loader").show();
				 // setTimeout(function(){$(".loader").show();}, 100);
		}
		if(empty(prod_list)) return;
		xml_request_data='';
		xml_request_data+='<soapenv:Envelope xmlns:chec="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/check_stock/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xxb="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/">';
		xml_request_data+='<soapenv:Header><wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"><wsse:UsernameToken wsu:Id="UsernameToken-E739E7BD4A96DC5D3A148740685027013"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password><wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">Q0bJKr12IBZPbXDrCOFkKw==</wsse:Nonce><wsu:Created>2017-02-18T08:34:10.270Z</wsu:Created></wsse:UsernameToken></wsse:Security>';
		xml_request_data+='<xxb:SOAHeader>';
		xml_request_data+='<xxb:Responsibility>BPI_WEB_SERVICE_USER</xxb:Responsibility>';
		xml_request_data+='<xxb:RespApplication>XXBPI</xxb:RespApplication>';
		xml_request_data+='<xxb:SecurityGroup>STANDARD</xxb:SecurityGroup>';
		xml_request_data+='<xxb:NLSLanguage>AMERICAN</xxb:NLSLanguage>';
		xml_request_data+='<xxb:Org_Id>82</xxb:Org_Id>';
		xml_request_data+='</xxb:SOAHeader>';
		xml_request_data+='</soapenv:Header>';
		xml_request_data+='<soapenv:Body>';
		xml_request_data+='<chec:InputParameters>';
			xml_request_data+='<chec:P_SHIP_TO>'+bpi_com_obj.ship_to_location+'</chec:P_SHIP_TO>';
         xml_request_data+='<chec:P_BILL_TO>'+bpi_com_obj.bill_to_location+'</chec:P_BILL_TO>';
	 
		xml_request_data+='<chec:P_PRODUCT>';
		xml_request_data+=prod_list;		
		xml_request_data+='</chec:P_PRODUCT>';
		xml_request_data+='</chec:InputParameters>';
		xml_request_data+='</soapenv:Body>';
		xml_request_data+='</soapenv:Envelope>';
		  // var url = "http://uswodapp013.brakepartsinc.com:8010/webservices/SOAProvider/plsql/xxbpi_customer_online/";
		 var url = bpi_com_obj.web_api_url;	
				jQuery.ajax({
					type: "POST",
					url: url,
					 data: "xml_data="+xml_request_data,
					dataType: "xml",
					async:false,
					crossDomain: true,
					processData: false,
					// contentType: "text/xml; charset=\"utf-8\"",
					 
					success: function (data) {
					 
						 BpiccPlaceOrder.ProcessExcelCheckStockXml(data,part_qty_arr,part_no_dc_arr,callback);
					},
					error: function (msg) {
						$(".loader").hide();
							setTimeout(function(){$("#select_order_type").focus();}, 100); 
						// alert("Failed: " + msg.status + ": " + msg.statusText);
					}
				});
	},
	
	ProcessExcelCheckStockXml:function(xml,part_qty_arr,part_no_dc_arr,callback)
	{
		var inputPo=$("#inputPo").val();
		var new_tr_id=2;
		var html="";
		  // try {
			   $("#bpicc_tableDetails tbody tr").remove();
				BpiccPlaceOrder.CalculateTotQtyWt();
		
			  var c_length=0;
			 $(xml).find('X_PRODUCT_AVAIL').each(function(){
				   var tot_xlx_length=$(xml).find('X_PRODUCT_AVAIL_ITEM').length;
				   	  
                     $(this).find("X_PRODUCT_AVAIL_ITEM").each(function(){
						var  prod_obj=new Object();
                        var PRODUCT_NUM= $(this).find("PRODUCT_NUM").text();
                        prod_obj['PRODUCT_NUM']= $(this).find("PRODUCT_NUM").text();;
                        prod_obj['INVENTORY_ITEM_ID']= $(this).find("INVENTORY_ITEM_ID").text();;
                        prod_obj['ITEM_STATUS'] = $(this).find("ITEM_STATUS").text();;
                        prod_obj['BRAND_NAME'] = $(this).find("BRAND_NAME").text();;
                        prod_obj['ITEM_DESCRIPTION'] = $(this).find("ITEM_DESCRIPTION").text();;
						var ITEM_DESCRIPTION=$(this).find("ITEM_DESCRIPTION").text();
						prod_obj['IS_CALIPER']='0';
						if(ITEM_DESCRIPTION.indexOf("CALIPER")>=0)
							prod_obj['IS_CALIPER']='1';
					 
					 
                        prod_obj['UNIT_WEIGHT']= $(this).find("UNIT_WEIGHT").text();;
						prod_obj['MIN_ORDER_QTY']= $(this).find("MIN_ORDER_QTY").text();;
                        prod_obj['ERROR_MSG'] = $(this).find("ERROR_MSG").text(); 



                       $.each($(this).find("AVAIL_PRODUCT").find("AVAIL_PRODUCT_ITEM"),function()//looping through edc/mdc/wdc
					   {
						   var ORGANIZATION_CODE=$(this).find("ORGANIZATION_CODE").text();
						   var AVAILABLE_QTY=$(this).find("AVAILABLE_QTY").text();
						   AVAILABLE_QTY=parseInt(AVAILABLE_QTY);
						   if(AVAILABLE_QTY<0)
							   AVAILABLE_QTY=0;
						   prod_obj[ORGANIZATION_CODE]=AVAILABLE_QTY;
					   }) 
					   bpi_obj.prod_stock[PRODUCT_NUM]=new Object();
					   bpi_obj.prod_stock[PRODUCT_NUM]=prod_obj;
					   $(".errorFileFormat").show();
					    bpi_obj.is_bulk_validate=1;
						$(".errorFileFormat").html("Please Wait, Validating Data..");
						dc="";						
						 var dc=part_no_dc_arr[PRODUCT_NUM];
						if(empty(dc))
							dc="";

 
			 qty=part_qty_arr[PRODUCT_NUM];
			 
			 var dis="";
			 if(empty(inputPo))
				dis=" disabled ";  
			  html+='<tr id="'+new_tr_id+'">';
			html+='<td><div class="availableDC"><input id="partNum_'+new_tr_id+'"  onblur="BpiccPlaceOrder.ValidateEnteredPartNo('+new_tr_id+');"  value='+PRODUCT_NUM+' class="partNum" type="text"></td></div>';
			html+='<td><input id="brand_'+new_tr_id+'" class="inputBrand" value="" disabled="" type="text"></td>';
			html+='<td><input id="desc_'+new_tr_id+'" class="inputDesc" value="" disabled="" type="text"></td>';
			html+='<td><input id="weight_'+new_tr_id+'" class="inputUnitWgt" value="" disabled="" type="text"></td>';
			html+='<td><div class="availableDC"><input id="reqQnty_'+new_tr_id+'"  maxlength=5  onkeypress="return acceptNumbersOnlyForModule(event);" onblur="BpiccPlaceOrder.ValidateQty('+new_tr_id+');BpiccPlaceOrder.CalculateTotQtyWt();" class="inputReqQnty" '+dis+' type="text" value='+qty+'></td></div>';
			
			html+='<td><div class="availableDC"><input id="v1_'+new_tr_id+'" class="inputEdc" value="" disabled><span><input type="radio"  id="V1_RADIO_'+new_tr_id+'" name="inputAvail_'+new_tr_id+'" value="EDC" class="radioDC" disabled onclick="BpiccPlaceOrder.EnableProperCheckBoxColor('+new_tr_id+');"  ><i class="fa fa-check-circle" id="V1_i_'+new_tr_id+'" aria-hidden="true"></i></span></input></td></div>';
			html+='<td><div class="availableDC"><input id="m1_'+new_tr_id+'" class="inputMdc" value="" disabled><span><input type="radio" id="M1_RADIO_'+new_tr_id+'"   name="inputAvail_'+new_tr_id+'" value="MDC" class="radioDC" disabled onclick="BpiccPlaceOrder.EnableProperCheckBoxColor('+new_tr_id+');"  ><i class="fa fa-check-circle"   id="M1_i_'+new_tr_id+'" aria-hidden="true"></i></span></input></td></div>';
			html+='<td><div class="availableDC"><input id="m2_'+new_tr_id+'" class="inputWdc" value="" disabled><span><input type="radio"  id="M2_RADIO_'+new_tr_id+'"  name="inputAvail_'+new_tr_id+'" value="WDC" class="radioDC" disabled onclick="BpiccPlaceOrder.EnableProperCheckBoxColor('+new_tr_id+');"  ><i class="fa fa-check-circle" id="M2_i_'+new_tr_id+'"  aria-hidden="true"></i></span></input></td></div>';
			
			html+='<td><div class="availableDC"><span onclick="BpiccPlaceOrder.deleteTableRow('+new_tr_id+');" class="glyphicon glyphicon-trash" aria-hidden="true"></span></td></div>';
			html+='	</tr>';
			
			 
			new_tr_id++;
			
					    // var new_tr_id=BpiccPlaceOrder.addNewTableRowFromExcel(PRODUCT_NUM,2,"");


					   // BpiccPlaceOrder.ValidateErrorsForSelectedPartNo(new_tr_id,PRODUCT_NUM,'Yes');
					   

						c_length++;
					 if(c_length>=tot_xlx_length)
					 {

						 /* $('#reset_form').removeAttr("disabled");
						    bpi_obj.is_bulk_validate=0;	
							 $(".modal-dialog .close").trigger('click');
							 $(".loader").hide();
							 setTimeout(function(){
								 BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
									 BpiccPlaceOrder.HandleGlobalDeleteForCheckDuplicatePartNo();
									  BpiccPlaceOrder.CalculateTotQtyWt();
						
							 bpi_obj.is_bulk_validate=0;
							  BpiccPlaceOrder.addNewTableRow(); 
							  var last_tr_id=$("#bpicc_tableDetails tbody").find("tr").last().attr('id');
							   setTimeout(function(){$("#partNum_"+last_tr_id).focus();},500);
							 }, 1000);   */
					 }
					});
					
					  	 

			 });
			  
			  $("#bpicc_tableDetails tbody").html(html)
			  
			  setTimeout(function(){
			   bpi_obj.is_bulk_validate=0;
							  BpiccPlaceOrder.addNewTableRow(); 
							 
							 
								BpiccPlaceOrder.ValidateOrderRowByRowExcel();
								
							   setTimeout(function(){
								   	// $(".loader").hide();
								    $(".modal-dialog .close").trigger('click');
								    var last_tr_id=$("#bpicc_tableDetails tbody").find("tr").last().attr('id');
									 BpiccPlaceOrder.EnableValidateOrderDiv();
								   $("#partNum_"+last_tr_id).focus();},500);
							   
						
			 },500);
			  			   
			 if (callback && typeof(callback) === "function") {
						callback();

					}
					
				  
				
				 
							
		     /*}
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ProcessCheckStockXml";
			  alert(message);
		  }   */
				 
				 $(".loader").hide();
				 
	},
	ApiGetShippingInfo:function(ship_to_acc)
	{
		BpiccPlaceOrder.ClearAllShippingAddressInputBox();
	 
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
							 
							 BpiccPlaceOrder.ProcessGetSingleAccountAddressForShipTo(data);
						},
						error: function (msg) {
								 
							alert("Failed: " + msg.status + ": " + msg.statusText);
						}
					}); 
	}  ,
	ProcessGetSingleAccountAddressForShipTo:function(xml)
	{
		    try{
			  bpi_obj.shipping_details={};
			option="<option value=''>Select Shipping Address</option>";
			var first_add="";
			var first_acc="";
			 $(xml).find('X_SHIP_TO_ADDRESS').each(function(){
				 
                     $(this).find("X_SHIP_TO_ADDRESS_ITEM").each(function(){
					 
                        var SHIP_TO= $(this).find("SHIP_TO").text();
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
						  bpi_obj.shipping_details[SHIP_TO]=new Object();
						  bpi_obj.shipping_details[SHIP_TO]=data_set;
						  var selected="";
						  if(getCookie("selected_ship_to_account_no")==SHIP_TO)
							  selected=" selected ";
						 html=SHIP_TO+" - "+ACCT_NAME+" "+ADDRESS_LINE1+" "+ADDRESS_LINE2+" "+ADDRESS_LINE3+" "+CITY+" "+STATE+" "+POSTAL_CODE+" "+COUNTRY;;
							option+="<option "+selected+" value='"+SHIP_TO+"'>"+html+"</option>";
							if(empty(first_add))
							{
								   first_acc=ACCT_NUM;
								   first_add=ADDRESS_LINE1+" "+ADDRESS_LINE2+" "+CITY+" "+STATE+" "+POSTAL_CODE;
								  
							}
					});
					$("#shipping_address options").remove();
					$("#shipping_address").html(option);
				 
					
					// $("#shipping_address").val();
			 });
			  if(empty(getCookie("selected_ship_to_account_no")))
			 {
				  $(".locationPane").html('<p><span class="numberField">'+first_acc+'</span><span>  '+first_add+'</span></p>');
				   $("#shipping_address").val(bpi_com_obj.ship_to_location);
				
			 }
			 
			 
				 
			 
			 if(!empty($("#shipping_address").val()))
					{
						$("#shipping_address").attr('disabled',true);
						
					}
					else
					{
						$("#shipping_address").removeAttr('disabled');
					}
					 BpiccPlaceOrder.PopulateShippingAddressValues();
					
		    }
	   catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ProcessApiGetShippingInfoXml";
			  alert(message);
		  }   
	} ,
	ApiDropShippingInfo:function()
	{
		BpiccPlaceOrder.ClearAllShippingAddressInputBox();
			xml_request_data='';
			xml_request_data+='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
			xml_request_data+='<soap:Header xmlns:ns1="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/">';
			xml_request_data+='<ns1:SOAHeader>';
			xml_request_data+='<ns1:Responsibility/>';
			xml_request_data+='<ns1:RespApplication/>';
			xml_request_data+='<ns1:SecurityGroup/>';
			xml_request_data+='<ns1:NLSLanguage/>';
			xml_request_data+='<ns1:Org_Id/>';
			xml_request_data+='</ns1:SOAHeader>';
			xml_request_data+='<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" soap:mustUnderstand="1"><wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header>';
			xml_request_data+='<soap:Body xmlns:ns2="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/get_drop_ship_to/">';
			xml_request_data+='<ns2:InputParameters>';
			xml_request_data+='<ns2:P_BILL_TO_LOCTION>'+bpi_com_obj.bill_to_location+'</ns2:P_BILL_TO_LOCTION>';
			xml_request_data+='<ns2:P_SHIP_TO_LOCTION>'+bpi_com_obj.ship_to_location+'</ns2:P_SHIP_TO_LOCTION>';
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
							 
							 BpiccPlaceOrder.ProcessApiGetDropShipInfoXml(data);
						},
						error: function (msg) {
								setTimeout(function(){$("#select_order_type").focus();}, 100); 
							// alert("Failed: " + msg.status + ": " + msg.statusText);
						}
					});  
	}  ,
	ProcessApiGetDropShipInfoXml:function(xml)
	{
		 var option="<option value=''>Select Drop Ship Address</option>";
		  try {
			  bpi_obj.drop_ship_details={};
		 
			 $(xml).find('X_DROP_SHIP_TO_ADDRESS').each(function(){
                     $(this).find("X_DROP_SHIP_TO_ADDRESS_ITEM").each(function(){
					 
                        var SHIP_TO= $(this).find("SHIP_TO").text();
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
						  bpi_obj.drop_ship_details[SHIP_TO]=new Object();
						  bpi_obj.drop_ship_details[SHIP_TO]=data_set;
						  html=SHIP_TO+" - "+ACCT_NAME+' '+ADDRESS_LINE1+" "+ADDRESS_LINE2+" "+ADDRESS_LINE3+" "+CITY+" "+STATE+" "+POSTAL_CODE+" "+COUNTRY;;
							option+="<option value='"+SHIP_TO+"'>"+html+"</option>";
					 
					});
				 $("#shipping_address options").remove();
					$("#shipping_address").html(option);
					$(".shippingAddress #country").val("US");
					BpiccPlaceOrder.PopulateStateForSelectedCountry();
			 });
			  
		    }
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ProcessApiGetShippingInfoXml";
			  alert(message);
		  }  
	} , 
	GetSelectedShippingAddressVal:function()
	{
		return $('input[name=shippingmodel]:checked').parent().next().text();
	},
	HandleShippingAddressOnClick:function()
	{
		 var selected_shipping_addres_type=BpiccPlaceOrder.GetSelectedShippingAddressVal();
			if(selected_shipping_addres_type=="SHIPPING ADDRESS")
			{
				 
					// BpiccPlaceOrder.ApiGetShippingInfo();
				 	BpiccPlaceOrder.ApiGetShippingInfo(getCookie("selected_ship_to_account_no"));
				BpiccPlaceOrder.DisableShippingInputValues();
				
			}if(selected_shipping_addres_type=="DROP SHIP")
			{
				$("#shipping_address").removeAttr('disabled');
				 BpiccPlaceOrder.ApiDropShippingInfo();
				 BpiccPlaceOrder.EnableShippingInputValues();
			}
	}
	,ClearAllShippingAddressInputBox:function()
	{
		
		$("#company").val("");
		$("#address1").val("");
		$("#address2").val("");
		$("#city").val("");
		$("#state").val("");
		$(".shippingAddress #country").val("");
		$("#zip").val("");
		
		
	},
	DisableShippingInputValues:function()
	{
		
		$("#company").attr("disabled",true);
		$("#address1").attr("disabled",true);
		$("#address2").attr("disabled",true);
		$("#city").attr("disabled",true);
		$("#state").attr("disabled",true);
		$(".shippingAddress #country").attr("disabled",true);
		$("#zip").attr("disabled",true);
	},
	EnableShippingInputValues:function()
	{
		
		$("#company").removeAttr("disabled")
		$("#address1").removeAttr("disabled")
		$("#address2").removeAttr("disabled")
		$("#city").removeAttr("disabled")
		$("#state").removeAttr("disabled")
		$(".shippingAddress #country").removeAttr("disabled")
		$("#zip").removeAttr("disabled")
	},
	PopulateShippingAddressValues:function()
	{
		 var selected_shipping_addres_type=BpiccPlaceOrder.GetSelectedShippingAddressVal();
		BpiccPlaceOrder.ClearAllShippingAddressInputBox();
		var shipping_address=$("#shipping_address").val();
		if(!empty(shipping_address) && $("#shipping_error_info p:contains('Please Select Ship to Addres')"))
				{
					$("#shipping_error_info").html("");
						$("#shipping_error_info").hide();
				}
				
			
		if(!empty(shipping_address))
		{
			if(selected_shipping_addres_type=="SHIPPING ADDRESS")
			{
				 if(bpi_obj.shipping_details.hasOwnProperty(shipping_address))
				{
				data_obj=bpi_obj.shipping_details;
				}
			}if(selected_shipping_addres_type=="DROP SHIP")
			{
				 if(bpi_obj.drop_ship_details.hasOwnProperty(shipping_address))
				{
				data_obj=bpi_obj.drop_ship_details;
				}
			}
			
				$("#company").val(data_obj[shipping_address]['ACCT_NAME']);
				$("#address1").val(data_obj[shipping_address]['ADDRESS_LINE1']);
				$("#address2").val(data_obj[shipping_address]['ADDRESS_LINE2']);
				$("#city").val(data_obj[shipping_address]['CITY']);
				$("#state").val(data_obj[shipping_address]['STATE']);
				$(".shippingAddress #country").val(data_obj[shipping_address]['COUNTRY']);
				BpiccPlaceOrder.PopulateStateForSelectedCountry(data_obj[shipping_address]['STATE']);
				$("#zip").val(data_obj[shipping_address]['POSTAL_CODE']);
		}
		else
		{
			$(".shippingAddress #country").val("US");
			 BpiccPlaceOrder.PopulateStateForSelectedCountry();
		}
	
	},
	ApiValidatePoNumber:function()
	{
			inputPo=$("#inputPo").val();
			$("#inputPo").removeClass("errorError");
				$("#validate_po_erro_msg_div").remove();
				
			 // BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessages("",""); 
			if(empty(inputPo))
			{
				$("#inputPo").addClass("errorError");
				 // BpiccPlaceOrder.ShowPlaceOrderErrorSuccessMessages("Please Enter Valid PO","Error"); 
				 BpiccPlaceOrder.DisableAddRowsAndButtonPoValidation();
				 $("#bpicc_tableDetails tbody tr input[id*='reqQnty_']").attr('disabled',true);	 
				return false;
			}
			 
		  
			 
	/* var shpping="validate_po.xml";
		$.get( shpping, function(data) {
			 BpiccPlaceOrder.ApiProcessValidatePoNumber(data);
			});
		 return; */
		var  xml_request_data='';
		xml_request_data+='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
		xml_request_data+='<soap:Header xmlns:ns1="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/">';
		xml_request_data+='<ns1:SOAHeader>';
		xml_request_data+=' <ns1:Responsibility>BPI_WEB_SERVICE_USER</ns1:Responsibility>';
		xml_request_data+='<ns1:RespApplication>XXBPI</ns1:RespApplication>';
		xml_request_data+='<ns1:SecurityGroup>STANDARD</ns1:SecurityGroup>';
		xml_request_data+='<ns1:NLSLanguage>AMERICAN</ns1:NLSLanguage>';
		xml_request_data+='<ns1:Org_Id>82</ns1:Org_Id>';
		xml_request_data+='</ns1:SOAHeader>';
		xml_request_data+='<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" soap:mustUnderstand="1"><wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"><wsse:Username>'+bpi_com_obj.api_usr+'</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+bpi_com_obj.api_pwd+'</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header>';
		xml_request_data+='<soap:Body xmlns:ns2="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/validate_po_number/">';
		xml_request_data+='<ns2:InputParameters>';
		xml_request_data+='<ns2:P_PO_NUM>'+inputPo+'</ns2:P_PO_NUM>';
		xml_request_data+='<ns2:P_BILL_NUM>'+bpi_com_obj.bill_to_location+'</ns2:P_BILL_NUM>';
		xml_request_data+='<ns2:P_SHIP_NUM>'+bpi_com_obj.ship_to_location+'</ns2:P_SHIP_NUM>';
		xml_request_data+='</ns2:InputParameters>';
		xml_request_data+='</soap:Body>';
		xml_request_data+='</soap:Envelope>';

	if(po_ajax){ 
	 po_ajax.abort();
	 }
		setTimeout(function(){$("#select_order_type").focus();}, 100); 
		var url = bpi_com_obj.web_api_url;
			 
					po_ajax=jQuery.ajax({
						type: "POST",
						url: url,
						 data: "xml_data="+xml_request_data,
						dataType: "xml",
						crossDomain: true,
						processData: false,
						success: function (data) {
							 if($("#place_order_error_info p:contains('Please Enter PO Number')").length>0)
								{
									$("#place_order_error_info").html("");
										$("#place_order_error_info").hide();
								}
							 BpiccPlaceOrder.ApiProcessValidatePoNumber(data);
						},
						error: function (msg) {
							
							setTimeout(function(){$("#select_order_type").focus();}, 100); 
							// alert("Failed: " + msg.status + ": " + msg.statusText);
						}
					});  
	}  ,
	ApiProcessValidatePoNumber:function(xml)
	{
		$("#validate_po_erro_msg_div").remove();
		  try {
			 
			 X_RESPONSE_STATUS=$(xml).find('X_RESPONSE_STATUS').text() ;
			 X_RESPONSE_MESSAGE=$(xml).find('X_RESPONSE_MESSAGE').text()
			 if(X_RESPONSE_STATUS=="S")
			 {
				BpiccPlaceOrder.EnableAddRowsAndButtonPoValidation();
				 if($("#place_order_error_info p:contains('Please Enter Valid PO')").length>0)
					{
							$("#place_order_error_info").hide();
					} 
					setTimeout(function(){$("#select_order_type").focus();}, 100); 
			 }
			else if(X_RESPONSE_STATUS=="'D")
			 {
				 
				$("#place_order_error_info").after(' <div id="validate_po_erro_msg_div" class="errorInfo"> <p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span><span class="errorMessage">'+X_RESPONSE_MESSAGE+'</span></p></div> ');
				  $("#validate_po_erro_msg_div").show();
				  BpiccPlaceOrder.EnableAddRowsAndButtonPoValidation();
				   if($("#place_order_error_info p:contains('Please Enter Valid PO')").length>0)
					{
							$("#place_order_error_info").hide();
					} 
			 }
			 else
			 {
			 // BpiccPlaceOrder.DisableAddRowsAndButtonPoValidation();
			 BpiccPlaceOrder.EnableAddRowsAndButtonPoValidation();
			$("#place_order_error_info").after(' <div id="validate_po_erro_msg_div" class="errorInfo"> <p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span><span class="errorMessage">'+X_RESPONSE_MESSAGE+'</span></p></div> ');
				$("#validate_po_erro_msg_div").show();			
			setTimeout(function(){$("#select_order_type").focus();}, 100); 
			  if($("#place_order_error_info p:contains('Please Enter Valid PO')").length>0)
					{
							$("#place_order_error_info").hide();
					} 
			 }
			  
		    }
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ProcessCheckStockXml";
			  alert(message);
		  }  
	},
	HandleConvertToOrderFromCheckStock:function()
	{
		var data=$("#bpicc_tableDetails tbody tr");
		var cookie_part_obj=new Object();
		i=0;
		$.each(data,function(k,v)
		{
			var tr_id=$(this).attr("id");
			var partNum=$("#bpicc_tableDetails tbody tr#"+tr_id+" #partNum_"+tr_id).val();
			var reqQnty=$("#bpicc_tableDetails tbody tr#"+tr_id+" #reqQnty_"+tr_id).val();
			
			 if(!empty(partNum) && reqQnty>0)
			 {
				 cookie_part_obj[i]=new Object();
			 
				 cookie_part_obj[i]['partNum']=partNum;
				 cookie_part_obj[i]['reqQnty']=reqQnty;
				 cookie_part_obj[i]['dc']=$("input[name='inputAvail_"+tr_id+"']:checked").val();;
				 i++;
			 }
		});
		if(!empty(cookie_part_obj))
		{
//		alert(JSON.stringify(cookie_part_obj));
		 setCookie("cookie_part_obj",JSON.stringify(cookie_part_obj));
		 localStorage.setItem('cookie_part_obj', JSON.stringify(cookie_part_obj));
		}
		window.location.href= selectAccountPrefix + "index.html";
	},
	AddItemsFromCheckStockPage:function(cookie_part_obj)
	{
	 if(!empty(getCookie("selected_ship_to_wc")))
		   {
			   bpi_com_obj.default_dc=getCookie("selected_ship_to_wc");
		   }
		$("#validate_on_entry").removeAttr('checked');
		$("#validate_on_entry").attr("validate","0");
			 $("#bpicc_tableDetails tbody tr").remove();
		 xml_part_no="";
		  part_no_qty_arr=new Object();
		 part_no_dc_arr=new Object();
		 
		 
		$.each(cookie_part_obj, function(k,v)  
		{
			var part_no=v['partNum'];
			var qty=v['reqQnty'];
			var dc=v['dc'];
		 
			xml_part_no+=part_no+",";
			 part_no_qty_arr[part_no]=qty;
			 part_no_dc_arr[part_no]=dc;
			 // BpiccPlaceOrder.addNewTableRowFromExcel(part_no,qty,dc); 
		});
			$("#validate_on_entry").prop('checked', true);
			$("#validate_on_entry").attr("validate","1");
	 

		 	  
				bpi_obj.is_bulk_validate=1;



			  BpiccPlaceOrder.APIExcelCheckStock(xml_part_no,part_no_qty_arr,part_no_dc_arr,function(){
				  setTimeout(function(){

									
							 
							  $("#bpicc_tableDetails tbody tr input[id*='reqQnty_']").attr('disabled',true);	 
							  }, 300); 
			  });	  
			  

			 
			$("#bpicc_tableDetails tbody tr input[id*='partNum_']").attr('disabled',true);	 
			$("#bpicc_tableDetails tbody tr input[id*='reqQnty_']").attr('disabled',true);	 
				setTimeout(function(){	$("#bpicc_tableDetails tbody tr input[id*='reqQnty_']").attr('disabled',true);	 }, 700); 

	}
	,
	GetCountryStateList:function()
	{
		  /* json_data='{"status":0,"errorMessage":"","object":[{"id":"1","name":"US","description":"United States","fStates":[{"id":"1","name":"TX","description":"Texas","countryID":"1"},{"id":"2","name":"FL","description":"Florida","countryID":"1"}]},{"id":"2","name":"CA","description":"Canada","fStates":[{"id":"3","name":"ON","description":"Ontario","countryID":"2"},{"id":"4","name":"AB","description":"Alberta","countryID":"2"}]}]}';
		  BpiccPlaceOrder.ProcessGetCountryStateList(json_data);
		  return; */		
		 var url = bpi_com_obj.web_mssql_api_url+"GetCountriesStatesList";
			jQuery.ajax({
					type: "GET",
					url: url,
					    dataType:"json",
					 
					success: function (data) {
						BpiccPlaceOrder.ProcessGetCountryStateList(data);
					 
					},
					error: function (msg) {
						 
						  //alert("Failed: " + msg.status + ": " + msg.statusText);
					}
				});  
	},
	ProcessGetCountryStateList:function(responce)
	{
		
		 
		 country_obj=new Object();	
		var html="";
		$.each(responce.object,function(k,v)
		{
			 country_obj[v['name']]=new Object();
			 country_obj[v['name']]['id']=v['id'];
			 country_obj[v['name']]['name']=v['name'];
			 country_obj[v['name']]['description']=v['description'];
			 country_obj[v['name']]['fStates']=v['fStates'];
			 html+='<option value="'+v['name']+'">'+v['description']+'</option>';
		});
		 bpi_obj.country_list_obj=country_obj;
		$(".shippingAddress #country").html(html);
		$(".shippingAddress #state").html("<option value=''>Select</option>");
	 
		
	},
	PopulateStateForSelectedCountry:function(default_state)
	{
		var selected_country_code=$(".shippingAddress #country").val();
		if(bpi_obj.country_list_obj.hasOwnProperty(selected_country_code))
		{
			var data_set=bpi_obj.country_list_obj[selected_country_code]['fStates'];
			var state_html="<option value=''>Select</option>";
			if(!empty(data_set))
			{
				$.each(data_set ,function(k,v)
				{
					var selected="";
					if(default_state==v['name'])
					{
						var selected="selected";
					}
						 state_html+='<option '+selected+' value='+v['name']+'>'+v['name']+' - '+v['description']+'</option>';
				});
			}
			$(".shippingAddress #state").html(state_html);
		}
	 
	},
	EnableEmergencyShipRadioType:function() 
	{
		 $('input[name=inlineRadioOptionsData][value=000001_UPS_P_GND]').removeAttr("disabled")
		 $('input[name=inlineRadioOptionsData][value=000001_UPS_P_3DS]').removeAttr("disabled")
		
	},
	DisableEmergencyShipRadioType:function()
	{
	 
		 $('input[name=inlineRadioOptionsData][value=000001_UPS_P_GND]').prop('disabled',true);
		 $('input[name=inlineRadioOptionsData][value=000001_UPS_P_3DS]').prop('disabled',true);
	},
	SubmitFinalOrder:function()
	{
		var shipping_address=$("#shipping_address").val();
		 var selected_shipping_addres_type=BpiccPlaceOrder.GetSelectedShippingAddressVal();
		if(empty(shipping_address) && selected_shipping_addres_type!="DROP SHIP")
		{
			BpiccPlaceOrder.ShowShppingErrorSuccessMessages("Please Select Ship to Address","Error"); 
			return false;
		}	
		inputPo=$("#inputPo").val();
		if(empty(inputPo))
		{
				BpiccPlaceOrder.ShowShppingErrorSuccessMessages("Please Enter PO Number","Error"); 
				return false;
		}
		var base_shipping_method= $('input[name=inlineRadioOptions]:checked').val();
		var CUST_PO_NUMBER=$("#inputPo").val();;
		var ORDER_TYPE=$("#select_order_type").val();
		var selected_shipping_addres_type=BpiccPlaceOrder.GetSelectedShippingAddressVal();
		var DROP_SHIP_FLAG="0";
		if(selected_shipping_addres_type=="DROP SHIP")
		DROP_SHIP_FLAG="1";
		var SHIPPING_METHOD= bpi_obj.standard_ship_method_code;
		if($("#select_order_type").val()=="ER")
		{
			if(base_shipping_method=="option1")
			SHIPPING_METHOD=$('input[name=inlineRadioOptionsData]:checked').val();
		 if(base_shipping_method=="option2")
			SHIPPING_METHOD= bpi_obj.emergency_cust_pick_up_ship_method_code;;
		}
		if($("#select_order_type").val()=="ER" && base_shipping_method=="option1" && (empty(SHIPPING_METHOD) || SHIPPING_METHOD=="undefined"))
		{
			BpiccPlaceOrder.ShowShppingErrorSuccessMessages("Please Select Shipping Method Option","Error"); 
				return false;
		}/* 
		if($("#select_order_type").val()=="ER" && base_shipping_method=="option1" && (SHIPPING_METHOD=="UP2" || SHIPPING_METHOD=="UP3" || SHIPPING_METHOD=="FGR"))
		{
			BpiccPlaceOrder.ShowShppingErrorSuccessMessages("You cannot select UPS 2nd Day Air/UPS 3 Day Select/FedEx Ground Shipping Method for EMERGENCY Orders","Error"); 
				return false;
		} */
		// var SHIP_TO_ORG=shipping_address;
		var SHIP_TO_ORG=bpi_com_obj.ship_to_location;
		var BILL_TO_ORG=bpi_com_obj.bill_to_location;
		if(!empty(getCookie("selected_ship_to_account_no")))
		{
			SHIP_TO_ORG=getCookie("selected_ship_to_account_no");
		}
		//$("#state").html("<option value='CA'>CA</option>");
		//$(".shippingAddress #country").html("<option value='US'>US</option>");
		var SHIP_TO_NAME=$("#company").val();
		var SHIP_TO_ADDRESS1=$("#address1").val();
		var SHIP_TO_ADDRESS2=$("#address2").val();
		var SHIP_TO_ADDRESS2="";
		var SHIP_TO_ADDRESS3="";
		var SHIP_TO_ADDRESS4="";
		var SHIP_TO_CITY=$("#city").val();
		var SHIP_TO_STATE=$("#state").val();
		var SHIP_TO_COUNTRY=$(".shippingAddress #country").val();
		var SHIP_TO_POSTAL_CODE=$("#zip").val();
		var STORE_ID="";
		
		var data=$("#bpicc_tableDetails tbody tr");
		var item_data="";
		
		$("#shipping_error_info").html("");
		$("#shipping_error_info").hide();
		$("#place_order_error_info").html("");
		$("#place_order_error_info").hide();
		
		if(empty(SHIP_TO_ADDRESS1))
		{
			BpiccPlaceOrder.ShowShppingErrorSuccessMessages("Shipping Address1 is Empty","Error");
			return false;
		}
		else if(empty(SHIP_TO_CITY))
		{
			BpiccPlaceOrder.ShowShppingErrorSuccessMessages("SHIP CITY is Empty","Error");
			return false;
		}
		else if(empty(SHIP_TO_STATE))
		{
			BpiccPlaceOrder.ShowShppingErrorSuccessMessages("SHIP TO STATE is Empty","Error");
			return false;
		}
		else if(empty(SHIP_TO_COUNTRY))
		{
			BpiccPlaceOrder.ShowShppingErrorSuccessMessages("SHIP TO COUNTRY is Empty","Error");
			return false;
		}
		else if(empty(SHIP_TO_POSTAL_CODE))
		{
			BpiccPlaceOrder.ShowShppingErrorSuccessMessages("SHIP TO  POSTAL_CODE is Empty","Error");
			return false;
		}
		if(!$("#inlineValidate").is(':checked'))
		{
			BpiccPlaceOrder.ShowShppingErrorSuccessMessages(" Please Accept terms and conditions","Error");
			return false;
		}
		var partNum="";
		var reqQnty="";
		var warehouse="";
		$.each(data,function(k,v)
		{
			var tr_id=$(this).attr("id");
			// var partNum=$("#bpicc_tableDetails tbody tr#"+tr_id+" #partNum_"+tr_id).val();
			// var reqQnty=$("#bpicc_tableDetails tbody tr#"+tr_id+" #reqQnty_"+tr_id).val();
			
			  partNum=$.trim($(this).find("#partNum_"+tr_id).val());
			  reqQnty=$.trim($(this).find("#reqQnty_"+tr_id).val());
			
			warehouse= $(this).find("input[name*='inputAvail_']:checked").val();
			// var warehouse=$("input[name='inputAvail_"+tr_id+"']:checked").val();
			if(!empty(partNum) && reqQnty>0)
			{
				item_data+='<ns2:P_ORDER_LINES_TBL_ITEM>';
				item_data+='<ns2:ORDERED_ITEM>'+partNum+'</ns2:ORDERED_ITEM>';
				item_data+='<ns2:ORDERED_QUANTITY>'+reqQnty+'</ns2:ORDERED_QUANTITY>';
				item_data+='<ns2:WARE_HOUSE>'+warehouse+'</ns2:WARE_HOUSE>';
				item_data+='</ns2:P_ORDER_LINES_TBL_ITEM>';
			}
			 
		});
	 
		if(empty(item_data))
		{
			BpiccPlaceOrder.ShowShppingErrorSuccessMessages("Items are empty","Error");
			return;
		}
		
			var  xml_request_data='';
			var xml_email="";
			if(typeof(dbEmail)!="undefined")
				xml_email=dbEmail;
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
				xml_request_data+='<soap:Body xmlns:ns2="http://xmlns.oracle.com/apps/custom/soaprovider/plsql/xxbpi_customer_online/place_sales_order/">';
				xml_request_data+='<ns2:InputParameters>';
				xml_request_data+='<ns2:P_ORDER_HEADER_REC>';
				xml_request_data+='<ns2:CUST_PO_NUMBER>'+CUST_PO_NUMBER+'</ns2:CUST_PO_NUMBER>';
				xml_request_data+='<ns2:DROP_SHIP_FLAG>'+DROP_SHIP_FLAG+'</ns2:DROP_SHIP_FLAG>';
				xml_request_data+='<ns2:ORDER_TYPE>'+ORDER_TYPE+'</ns2:ORDER_TYPE>';
				xml_request_data+='<ns2:USER_NAME>'+xml_email+'</ns2:USER_NAME>';
				xml_request_data+='<ns2:SHIPPING_METHOD>'+SHIPPING_METHOD+'</ns2:SHIPPING_METHOD>';
				xml_request_data+='<ns2:SHIP_TO_ORG>'+SHIP_TO_ORG+'</ns2:SHIP_TO_ORG>';
				xml_request_data+='<ns2:BILL_TO_ORG>'+BILL_TO_ORG+'</ns2:BILL_TO_ORG>';
				xml_request_data+='<ns2:SHIP_TO_NAME>'+RemoveSpecialChars(SHIP_TO_NAME)+'</ns2:SHIP_TO_NAME>';
				xml_request_data+='<ns2:SHIP_TO_ADDRESS1>'+RemoveSpecialChars(SHIP_TO_ADDRESS1)+'</ns2:SHIP_TO_ADDRESS1>';
				xml_request_data+='<ns2:SHIP_TO_ADDRESS2>'+RemoveSpecialChars(SHIP_TO_ADDRESS2)+'</ns2:SHIP_TO_ADDRESS2>';
				xml_request_data+='<ns2:SHIP_TO_ADDRESS3>'+RemoveSpecialChars(SHIP_TO_ADDRESS3)+'</ns2:SHIP_TO_ADDRESS3>';
				xml_request_data+='<ns2:SHIP_TO_ADDRESS4>'+RemoveSpecialChars(SHIP_TO_ADDRESS4)+'</ns2:SHIP_TO_ADDRESS4>';
				xml_request_data+='<ns2:SHIP_TO_CITY>'+RemoveSpecialChars(SHIP_TO_CITY)+'</ns2:SHIP_TO_CITY>';
				xml_request_data+='<ns2:SHIP_TO_STATE>'+SHIP_TO_STATE+'</ns2:SHIP_TO_STATE>';
				xml_request_data+='<ns2:SHIP_TO_COUNTRY>'+SHIP_TO_COUNTRY+'</ns2:SHIP_TO_COUNTRY>';
				xml_request_data+='<ns2:SHIP_TO_POSTAL_CODE>'+SHIP_TO_POSTAL_CODE+'</ns2:SHIP_TO_POSTAL_CODE>';
				xml_request_data+='<ns2:STORE_ID>'+STORE_ID+'</ns2:STORE_ID>';
				xml_request_data+='</ns2:P_ORDER_HEADER_REC>';
				xml_request_data+='<ns2:P_ORDER_LINES_TBL>';
				xml_request_data+=item_data;
				xml_request_data+='</ns2:P_ORDER_LINES_TBL>';
				xml_request_data+='</ns2:InputParameters>';
				xml_request_data+='</soap:Body>';
				xml_request_data+='</soap:Envelope>';
	$(".loader").show();
 
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
							 BpiccPlaceOrder.ApiProcessSubmitOrderdata(data);
						},
						error: function (msg) {
							 $(".loader").hide();
								setTimeout(function(){$("#select_order_type").focus();}, 100); 
							// alert("Failed: " + msg.status + ": " + msg.statusText);
						}
					});  
	},
	ShowShppingErrorSuccessMessages:function(msg,type)
	{
		$("#shipping_error_info").html("");
		$("#shipping_error_info").show();
		if(type=='Error')
		html=' <p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span><span class="errorMessage">'+msg+'</span></p>';
		$("#shipping_error_info").html(html);
		 
		scroll(0,$("#shipping_error_info").offset().top);
	},
	ShowPlaceOrderErrorSuccessMessages:function(msg,type)
	{
		$("#place_order_error_info").html("");
		$("#place_order_error_info").hide();
		if(type=='Error')
		{
			html=' <p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span><span class="errorMessage">'+msg+'</span></p>';
			$("#place_order_error_info").html(html);
		 
			$("#place_order_error_info").show();
		}
		if(type=='Warning')
		{
			html=' <p><span><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span><span class="errorMessage">'+msg+'</span></p>';
			$("#place_order_error_info").html(html);
			 
			$("#place_order_error_info").show();
		}
	},
	ShowPlaceOrderErrorSuccessMessagesForPartNO:function()
	{
	 
		if(bpi_obj.is_bulk_validate==0)
		{
				i=0;
				error_found=0;
				part_err_found=0;
				dup_err_found=0;
				qty_err_found=0;
				e_min_qty_found=0;
				
				if($("#bpicc_tableDetails tbody input[id*='partNum_'].errorError").length>0)
				{
					$("#e_invalid_part").show();
						error_found++; 
						part_err_found++; 
				}
				if($("#bpicc_tableDetails tbody input[id*='partNum_'].errorWarning").length>0)
				{
						$("#e_dup_part").show();
						error_found++; 
						dup_err_found++; 
				}
				if($("#bpicc_tableDetails tbody input[id*='reqQnty_'].errorError").length>0)
				{
						$("#e_zero_qty").show();
						error_found++; 
						qty_err_found++; 
				}
				if($("#bpicc_tableDetails tbody input[id*='reqQnty_'].errorWarning").length>0)
				{
						$("#e_min_qty").show();
						error_found++; 
						e_min_qty_found++; 
				}
		 
		 
				 
				
			if(part_err_found==0)
				$("#e_invalid_part").hide();
			if(dup_err_found==0)
				$("#e_dup_part").hide();
			if(qty_err_found==0)
				$("#e_zero_qty").hide();
		  if(e_min_qty_found==0)
				$("#e_min_qty").hide(); 
				if(error_found==0)
				{
					$("#place_order_part_error_info").hide();
				}
				else
				{
						$("#place_order_part_error_info").show();
				}
		}
	},
 
	ApiProcessSubmitOrderdata:function(xml)
	{
		  try {
			 
			 X_RESPONSE_STATUS=$(xml).find('X_RESPONSE_STATUS').text() ;
			 X_RESPONSE_MESSAGE=$(xml).find('X_RESPONSE_MESSAGE').text()
			 X_SALES_ORDER_NUMBER=$(xml).find('X_SALES_ORDER_NUMBER').text()
			 if(X_RESPONSE_STATUS=="S")
			 {
				 
				// BpiccPlaceOrder.EnableAddRowsAndButtonPoValidation();
				alert(X_RESPONSE_MESSAGE+" - Sales Order No is "+X_SALES_ORDER_NUMBER);
				window.location.href= selectAccountPrefix + "order-history.html";
				// location.reload(); ;
			 }
			 else
			 {
				 $("#submit_order").show();
			 // BpiccPlaceOrder.DisableAddRowsAndButtonPoValidation();
			 alert(X_RESPONSE_MESSAGE);
			 }
			  
			}
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccPlaceOrder.ProcessCheckStockXml";
			  alert(message);
		  }  
	},
	GetShippingMethodTypes:function()
	{
		 /*  json_data='{"status":0,"errorMessage":"","object":[{"scac_id":"1","scac_seq_no":"0","scac":"UP2","entity":"65","description":"UPS 2nd Day Air","order_type":"EMERGENCY","scac_default":"n"},{"scac_id":"2","scac_seq_no":"1","scac":"UP3","entity":"65","description":"UPS 3 Day Select","order_type":"EMERGENCY","scac_default":"n"},{"scac_id":"3","scac_seq_no":"19","scac":"FED","entity":"32","description":"FedEx Air","order_type":"EMERGENCY","scac_default":"n"},{"scac_id":"4","scac_seq_no":"20","scac":"FGR","entity":"32","description":"FedEx Ground","order_type":"EMERGENCY","scac_default":"y"},{"scac_id":"5","scac_seq_no":"21","scac":"SAM","entity":"32","description":"Same Day","order_type":"EMERGENCY","scac_default":"n"}]}';
		   BpiccPlaceOrder.ProcessGetShippingMethodTypes(json_data);
		   return;  */ 
		var url = bpi_com_obj.web_mssql_api_url+"GetShippingMethodTypes";
			jQuery.ajax({
					type: "GET",
					url: url,
					success: function (data) {
						BpiccPlaceOrder.ProcessGetShippingMethodTypes(data);
					},
					error: function (msg) {
							setTimeout(function(){$("#select_order_type").focus();}, 100); 
						// alert("Failed: " + msg.status + ": " + msg.statusText);
					}
				});  
	},
	ProcessGetShippingMethodTypes:function(responce)
	{
		
		 
		 	
		var html="";
		$.each(responce.object,function(k,v)
		{
			
			var desc=v['description'];
			if(empty(desc))
				desc=v['Ship_Method_Code'];
				
				var freightCode=v['freightCode'];
				if(freightCode=="CUSTOMER PICK-UP" && !empty(v['shipMethodCode']))
				{
					 bpi_obj.emergency_cust_pick_up_ship_method_code=v['shipMethodCode'];
				}
				if(freightCode=="BEST" && !empty(v['shipMethodCode']))
				{
					 bpi_obj.standard_ship_method_code=v['shipMethodCode'];
				}
				if(freightCode=="UPS")
				{
					html+='<label class="radio-inline">';
					  html+='<input type="radio" name="inlineRadioOptionsData" id="inlineRadio1" value="'+v['shipMethodCode']+'"><span>'+desc+'</span>';
					html+='</label>';
				}
		});
		$("#emergency_ship_methods").html(html);
		
		$('input[name=inlineRadioOptionsData]').on('click', function(e){
				if($("#shipping_error_info p:contains('Please Select Shipping Method Option')"))
				{
					$("#shipping_error_info").html("");
					$("#shipping_error_info").hide();
				}
			});
			
			
	} 
 
	
}
function RemoveSpecialChars(str)
{
	var r_str= str.replace(/&/g, '');
	  r_str= r_str.replace(/'/g, '');
	  return r_str;
}
 function in_array(needle, haystack, argStrict) {
     
    var key = '', strict = !!argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;
}