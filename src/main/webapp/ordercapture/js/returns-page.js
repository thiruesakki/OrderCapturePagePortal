/**
 * 
 */
var userID="";
var orgID="";
var bill_to_location="";
var ship_to_location="";
po_ajax="";
var partNoList = [];
$(document).ready(function() {
	$(".loader").hide();
	var soNum=0;
	 if(getSearchParams('q')!=null && getSearchParams('q')!=''){	 
		 var requestID=Decoding(decodeURIComponent(getSearchParams('q')));
		 soNum=requestID;
	 }
	 console.log("soNum:"+soNum);
	 orgID=getCookie("selected_org_id");
	 if(soNum>0){
		 $("#inputSO").val(soNum);
		 $("#inputSO").trigger("onblur");
	 }
//	 qtyValidation(1);
	 getReturnReason();
});
jQuery(function($) {'use strict',

	/* function handle(e){
      if(e.keyCode === 13){
          
//trigger the js function here
      }

      return false;
  } */
	  userID=getCookie("userID");
	  orgID=getCookie("selected_org_id");
    bill_to_location=getCookie("selected_bill_to");
    ship_to_location=getCookie("selected_ship_to");

	$('#inputSO').keypress(function (e) {
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
			  e.preventDefault();
			 BpiccReturnsOrder.ApiGetSOLineItem();
		  }
		});  
$("#bpicc_tableDetails tbody tr#1").remove();
	 BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("",""); 
	$("#partNum_1").val("");
		   $("#brand_1").val("");
		   $("#desc_1").val("");
		   $("#weight_1").val("");
		   $("#reqQnty_1").val("");
		   $("#v1_1").val("");
		   $("#m1_1").val("");
		   $("#m2_1").val("");
//			$("#inputSO").val("");
//		   $("#reqQnty_1").attr("disabled",true);
  $('#reset_form').on('click', function(e){
	 
		BpiccReturnsOrder.ResetForm();
	});
	
  $('.reviewUpdate').on('click', function(e){
	  e.preventDefault();
		BpiccReturnsOrder.ReviewUpdateOrder();
	});
  $('#validate_order').on('click', function(e){
	  e.preventDefault();
		BpiccReturnsOrder.ValidateOrder();
	});
  $('#submit_order').on('click', function(e){
	  e.preventDefault();
	    submitValidation();
		
	});

  $('#validate_on_entry').on('click', function(e){
	  // e.preventDefault();
		BpiccReturnsOrder.HandleValidateEntry();
	});


   $("#place_order_part_error_info").hide(""); 
	$("#inputSO").removeAttr('disabled');
	
  $('#continue_order').on('click', function(e){
	  e.preventDefault();
	  if($("#page_type").val()=='place_order')
		  {
			BpiccReturnsOrder.ContinueOrder();
		  }
		else
		{
			BpiccReturnsOrder.HandleConvertToOrderFromCheckStock();
			
		}

	}); 
	$(".shippingAddress #country").on('change', function(e){
	  e.preventDefault();
	 
		BpiccReturnsOrder.PopulateStateForSelectedCountry();
		 

	});
	  // $('input[name="AllDCinputAvail"][value="'+bpi_com_obj.default_dc+'"]')[0].checked = true;
		$('#reset_form').prop("disabled",true);
		 $('input[name=shippingmodel]').on('click', function(e){
		BpiccReturnsOrder.HandleShippingAddressOnClick();

		});
			BpiccReturnsOrder.AddDefaultRowsOnLoad();
			if($("#page_type").val()=='place_order')
			{ 
				$("#submit_order").show();
				BpiccReturnsOrder.EnableDisableSumbitOrderButton();
				BpiccReturnsOrder.DisableAddRowsAndButtonPoValidation();
				BpiccReturnsOrder.EnableValidateOrderDiv();
				// $("#submit_order").attr("disabled",true);
				 $('#inlineValidate').on('click', function(e){
				 
					BpiccReturnsOrder.EnableDisableSumbitOrderButton();
				});
				
			}
			else
			{
				 $('#bpicc_tableDetails #tbl_add_rows').removeAttr('disabled');
				 
				BpiccReturnsOrder.EnableAddRowsAndButtonPoValidation();
			}
			
			 $('#bpicc_tableDetails #tbl_add_rows').on('click', function(e){
			  e.preventDefault();
				BpiccReturnsOrder.AddaddNewTableRowDefault();
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
			  	BpiccReturnsOrder.HandleGlobalWcSelect(this.value);
		   });

		   $("#select_order_type").removeAttr('disabled');
		  // var cookie_part_obj_str= getCookie("cookie_part_obj");
		  var cookie_part_obj_str=localStorage.getItem("cookie_part_obj");
		   
		 
		  if(!empty(cookie_part_obj_str))
		  {
			 
			   	
			  // var cookie_part_obj=JSON.parse(getCookie("cookie_part_obj"));
			 
			  var cookie_part_obj=JSON.parse(localStorage.getItem("cookie_part_obj"));
			  	BpiccReturnsOrder.AddItemsFromCheckStockPage(cookie_part_obj);
				   setCookie("cookie_part_obj","");
				localStorage.setItem("cookie_part_obj","");   
				 $('#reset_form').prop("disabled",true);
//				 setTimeout(function(){ $("#reqQnty_2").prop("disabled",true);}, 500); 
				
		  }
		  $('input[name="shippingmodel"][value="SHIPPING ADDRESS"]')[0].checked = true;
			$('input[name="inlineRadioOptions"][value="option1"]')[0].checked = true;
			BpiccReturnsOrder.DisableShippingInputValues();
//			 $('[id^=reqQnty_]').attr('disabled',true);
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
		
		 
			 BpiccReturnsOrder.DisableShippingInputValues();
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

BpiccReturnsOrder=
{
	AddDefaultRowsOnLoad:function()
	{
		
		for(j=0;j<9;j++)
		{
			BpiccReturnsOrder.addNewTableRow()
		}
			$( "#bpicc_tableDetails tbody" ).scrollTop(0); //setTimeout(function(){$("#partNum_1").focus();}, 100); 
		 BpiccReturnsOrder.EnableValidateOrderDiv();
//		  $('[id^=reqQnty_]').attr('disabled',true);
	},
	HandleValidateEntry:function()
	{
		BpiccReturnsOrder.EnableValidateOrderDiv();
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
//				 $("#reqQnty_"+tr_id).removeAttr('disabled',true);
			 }
					$("#partNum_"+tr_id).removeClass("errorError");
					$("#partNum_"+tr_id).removeClass("errorWarning");
					$("#reqQnty_"+tr_id).removeClass("errorError");
					$("#reqQnty_"+tr_id).removeClass("errorWarning");
					
					$("#partNum_"+tr_id).parent().find("i").remove();
					$("#reqQnty_"+tr_id).parent().find("i").remove()
			});
			 BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
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
		$("#bpicc_tableDetails tbody tr input[id^='reqQnty_']").removeAttr('disabled');
//		$("#bpicc_tableDetails tbody tr input[id^='reqQnty_']").filter(function () {
//		if(empty(this.value)) 
//			$(this).attr('disabled',true);
//		else
//			$(this).removeAttr('disabled');
//		});
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
		 if($("#page_type").val()=='place_order' && empty($("#inputSO").val()))
		 {
			 BpiccReturnsOrder.ShowShppingErrorSuccessMessages("Please Enter PO Number","Error"); 
			 add_rows=0;
				return false;
		 }
			 
		 
		 if(add_rows==1)
		 {
			 var last_tr_id=$("#bpicc_tableDetails tbody").find("tr").last().attr('id');
			 last_tr_id=parseInt(last_tr_id)+1;
			for(m=0;m<5;m++)
			{
				BpiccReturnsOrder.addNewTableRow()
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
	addNewTableRow:function ()
	{
		var inputSO=$("#inputSO").val();
		var tr_id=$("#bpicc_tableDetails tbody").find("tr").last().attr('id');
		if(empty(tr_id))
			tr_id=1;
		new_tr_id=parseInt(tr_id)+1;
		if(new_tr_id)
		{
			var disabled_flag="";
			if(empty(inputSO) && $("#page_type").val()=='returns_page')
				disabled_flag=" disabled ";
			var html='<tr id="'+new_tr_id+'">';
            html+='<td><input Style="width:40px;margin-left:10px;margin-top:8px" disabled="" id="'+new_tr_id+'" class="" value=""  type="text"></td>';
            html+='<td><div class="availableDC ui-widget"><input id="partNum_'+new_tr_id+'" '+disabled_flag+' disabled="" onblur="BpiccReturnsOrder.ValidateEnteredPartNo('+new_tr_id+');" value="" class="partNum"  type="text"><span class="glyphicon glyphicon-search form-control-feedback"></span></div></td>';
            html+='<td><input id="brand_'+new_tr_id+'" class="inputBrand" value="" disabled="" type="text"></td>';
            html+='<td><input id="desc_'+new_tr_id+'" class="inputDesc" value="" disabled="" type="text"></td>';
            html+='<td><input id="weight_'+new_tr_id+'" class="inputUnitWgt" value="" disabled="" type="text"></td>';
            html+='<td><input id="reqQnty_'+new_tr_id+'" maxlength=5 disabled=""  onkeypress="return acceptNumbersOnlyForModule(event);" onblur="BpiccReturnsOrder.ValidateQty('+new_tr_id+');BpiccReturnsOrder.CalculateTotQtyWt();" class="inputReqQnty" type="text"></td>';
           
            html+='<td><select id="select_returns_reason" disabled="" Style="margin-left:24px;margin-top:8px;width:142px;font-size:11px;height:24px" onchange="changeReturnsReason();"><option value="select_returns_reason">Select Returns Reason</option><option value="">All Orders</option></select></td>';
//            html+='<td><input type="checkbox" name="" Style="margin-top:15px" value="checked" /><td>';
            html+='<td><span class="circleIcon"><i class="fa fa-check-circle greenIcon" aria-hidden="true"></i></span></td>';
            html+='<td><div class="availableDC"><span onclick="BpiccReturnsOrder.deleteTableRow('+new_tr_id+');" class="glyphicon glyphicon-trash" aria-hidden="true"></span></div></td>';
            html+='    </tr>';
			$("#bpicc_tableDetails tbody").append(html);
			$("#bpicc_tableDetails tbody tr#"+new_tr_id+" #partNum_"+new_tr_id).focus();
			
			
		}
//		$('.select_returns_reason').css("height", "20px");
	},
	addRowSalesLineItems:function (LINE_NUMBER,part_no,desc,qty,BRAND,RETURNABLE_YN)
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
			html+='<td><div class="availableDC ui-widget"><input id="partNum_'+new_tr_id+'" disabled=""   value='+part_no+' class="partNum" type="text"><span class="glyphicon glyphicon-search form-control-feedback"></span></div></td>';
			if(BRAND==""){
				html+='<td><input id="brand_'+new_tr_id+'" class="inputBrand" value="" disabled="" type="text"></td>';
			}else{
				html+='<td><input id="brand_'+new_tr_id+'" class="inputBrand" value='+BRAND+' disabled="" type="text"></td>';
			}
			html+='<td><input id="desc_'+new_tr_id+'" class="inputDesc" value='+desc+' disabled="" type="text"></td>';
			html+='<td><input id="weight_'+new_tr_id+'" class="inputUnitWgt" value='+qty+' disabled="" type="text"></td>';
			html+='<td><div class="availableDC"><input id="reqQnty_'+new_tr_id+'"  maxlength=5 disabled="false"  onkeypress="return acceptNumbersOnlyForModule(event);" onblur="qtyValidation('+new_tr_id+');;" class="inputReqQnty" '+dis+' type="text" value=""></td></div>';
			html+='<td><select id="select_returns_reason" Style="margin-left:27px;margin-top:8px" onchange="changeReturnsReason();"><option value="select_returns_reason">Select Returns Reason</option><option value="">All Orders</option></select></td>';
			html+='<td><div class="availableDC"><span onclick="BpiccReturnsOrder.deleteTableRow('+new_tr_id+');" class="glyphicon glyphicon-trash" aria-hidden="true"></span></td></div>';
			html+='	</tr>';
			$("#bpicc_tableDetails tbody").append(html);
//			if(!empty(dc))
//			{
//			 
//				var checkd_val_f=dc+"_RADIO_"+new_tr_id;
//				$("#"+checkd_val_f).prop("checked", true);
//				BpiccReturnsOrder.EnableProperCheckBoxColor(new_tr_id);
//			}
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
						var del_part_no=$("#partNum_"+del_id).val();
						
						$("#bpicc_tableDetails tbody tr#"+del_id).remove();
						  bpi_obj.is_bulk_validate=0;
						BpiccReturnsOrder.CalculateTotQtyWt();
						BpiccReturnsOrder.HandleGlobalDeleteForCheckDuplicatePartNo();
						BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
						
						
					}
				}
		 }
		 else 
		 {
			  var last_tr_id=$("#bpicc_tableDetails tbody").find("tr").last().attr('id');
			 BpiccReturnsOrder.ClearRowValues(last_tr_id);
			 $("#partNum_"+last_tr_id).val("");
			 	BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("","");
			BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();

			 
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
		BpiccReturnsOrder.HandleGlobalDeleteForCheckDuplicatePartNo();
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
						 BpiccReturnsOrder.CalculateTotQtyWt();
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
		 BpiccReturnsOrder.RemoveError(input_id);
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
	CalculateTotQtyWt:function ()
	{
		console.log("calculates");
		 if(bpi_obj.is_bulk_validate==0)
		 {
			var e_tot_qty=0;
			var e_tot_wt=0;
			
			var m_tot_qty=0;
			var m_tot_wt=0;

			var w_tot_qty=0;
			var w_tot_wt=0;
			var data=$("#bpicc_tableDetails tbody tr");
			
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
				console.log("qty:"+$(this).find("#reqQnty_"+tr_id).val());
				weight_=$(this).find("#weight_"+tr_id).val();
				console.log("partNum"+partNum+weight_);
				 $("#totalWeight").html(weight_);
				checked_val= $(this).find("input[name*='inputAvail_']:checked").val();//Old source code
//				checked_val=$('input[name=AllDCinputAvail]:checked').val();//New Source code
//				$('input[name=gender]:checked').val()
				var weight=0;
				
				reqQnty= parseFloat((empty(reqQnty))?0:reqQnty);
				if(!empty(partNum))
				{
					tot_lines++;
				}
				if(reqQnty>0)
				{
					 
					
					
//						s_v1_qty=parseInt($(this).find("#v1_"+tr_id).val());
						e_tot_qty=parseFloat(e_tot_qty+reqQnty);
						 weight=$(this).find("#weight_"+tr_id).val();
						weight=parseFloat((empty(weight))?0:weight);
//						e_tot_wt=parseFloat(e_tot_wt+(weight*reqQnty))  ;
						console.log("weight"+weight);
						
						 e_tot_wt=parseFloat(e_tot_wt+(weight*reqQnty))  ;
					
//					tot_wc_qty=empty(tot_wc_qty)?0:tot_wc_qty;
//					
//					tot_wc_qty=parseFloat(tot_wc_qty);
				}

				
			});
			
			$("#Tot_No_Of_Lines").html(tot_lines);
			
			
//			$("#totalWeight").html(tarkaRound(e_tot_wt));
			
			
			$("#totalQty").html(e_tot_qty);
			
//			var e_tot_qty=parseFloat(e_tot_qty)+parseFloat(m_tot_qty)+parseFloat(w_tot_qty);
//			var perc=tarkaRound((tot_wc_qty/e_tot_qty)*100,1);
//				 $("#percentValue").html("0%");
//			if(!isNaN(perc))
//			 $("#percentValue").html(perc+"%");

		 
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
						BpiccReturnsOrder.CallResetData();
					}
		}
		else
		{
			BpiccReturnsOrder.CallResetData();
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
			BpiccReturnsOrder.AddDefaultRowsOnLoad();

			BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("","");
			BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();

			setTimeout(function(){$("#partNum_2").focus();}, 100); 
			$("#excel_upload_msg_div").remove();
	},
	DeleteAllRows:function()
	{
		 if($("#page_type").val()=='place_order' && empty($("#inputSO").val()))
		 {
			 BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("Please Enter PO Number","Error"); 
			 
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
										BpiccReturnsOrder.CalculateTotQtyWt();
									 
								}
						 }
					});
					BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
					BpiccReturnsOrder.ResetForm();
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
		 if($("#page_type").val()=='place_order' && empty($("#inputSO").val())) 
		 {
			  BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("Please Enter PO Number","Error");
			 return false;
		 }
		 if(part_no_cnt==0)
		 {
			 BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("Please enter at least one item","Error");
			 $("#partNum_1").focus();
			 return false;
		 }
		 if($("#page_type").val()=='place_order' && $("#select_order_type").val()=="orderType")
		 {
			  BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("Please Select Order Type","Error");
			 return false;
		 }
		 
		
		 
		 
		   if(!empty(xml_part_no))
			{
				 var dfd = $.Deferred();
				BpiccReturnsOrder.APICheckStock(xml_part_no,function(){
					 
					BpiccReturnsOrder.ValidateOrderRowByRow();
				}); 
					  dfd.resolve(); 
			}
			else    
			{
				 var dfd = $.Deferred();
				BpiccReturnsOrder.ValidateOrderRowByRow();
				
				 dfd.resolve(); 
			}
			
		  
	},
	HandleEmergencyCheck:function()
	{
		var flag=true;
		BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("","");
		if($("#page_type").val()=='place_order' && $("#select_order_type").val()=="Emergency")
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
					BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages(partNum+" -- Emergency Orders Cannot be Backordered","Error");
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
	HandleOnchangeReturnsType:function()
	{
		$("#validate_po_erro_msg_div").remove();
		 if($("#place_order_error_info p:contains('Please Select Order Type')").length>0)
				{
						$("#place_order_error_info").hide();
				}
		 var returnsType=$("#select_returns_type").val();
		 if(returnsType==""){
			 $('[id^=reqQnty_]').attr('disabled',true);
			 $('[id^=select_returns_reason_]').attr('disabled',true);
		 }else{
			 $('[id^=reqQnty_]').attr('disabled',false);
			 $('[id^=select_returns_reason_]').attr('disabled',false);
		 }
	},
	ContinueOrder:function()
	{
		$("#excel_upload_msg_div").remove();
		if(BpiccReturnsOrder.HandleEmergencyCheck())
		{
			inputSO=$("#inputSO").val();
				if(empty(inputSO))
				{
						BpiccReturnsOrder.ShowShppingErrorSuccessMessages("Please Enter PO Number","Error"); 
						return false;
				}
		
			$("#place_order_error_info").hide();
			$("#shipping_error_info").hide();
			$(".placeorder").hide();
			$(".shippingBlock").show();
			$(".uploadOrderPane").hide();
			$("#select_order_type").attr('disabled',true);
			$("#inputSO").attr('disabled',true);
			
			 BpiccReturnsOrder.EnableEmergencyShipRadioType();
			 BpiccReturnsOrder.PopulateShippingAddressValues();
			 if($("#select_order_type").val()=="Standard" || $("#select_order_type").val()=="Mixed" || $("#select_order_type").val()=="Emergency")
			 {
				 $("#shipping_method_div").hide();
				 $("#standard_shipping_method_div").show();
				 
			 }
			 else
			 {
				 // BpiccReturnsOrder.DisableEmergencyShipRadioType();
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
		$("#inputSO").removeAttr('disabled');
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
						BpiccReturnsOrder.ValidateQty(tr_id);
						BpiccReturnsOrder.ValidateErrorsForSelectedPartNo(tr_id,partNum);
						 
					}
					
					cnt++;
					if(cnt>=l)
					{
						 
						 bpi_obj.is_bulk_validate=0;
						 
					
							 BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
								BpiccReturnsOrder.HandleGlobalDeleteForCheckDuplicatePartNo();
								BpiccReturnsOrder.CalculateTotQtyWt();
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
						BpiccReturnsOrder.ValidateQty(tr_id);
						BpiccReturnsOrder.ValidateErrorsForSelectedPartNo(tr_id,partNum);
						 
					}
					
					cnt++;
					if(cnt>=l)
					{
						 
						 bpi_obj.is_bulk_validate=0;
						 
						$(".loader").hide();
							 BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
								BpiccReturnsOrder.HandleGlobalDeleteForCheckDuplicatePartNo();
								BpiccReturnsOrder.CalculateTotQtyWt()
						 setTimeout(function(){
									if(bpi_com_obj.error_cnt==0 && BpiccReturnsOrder.HandleEmergencyCheck() )
									{
										BpiccReturnsOrder.EnableContinueOrderDiv();
									}
											 
									 
									else
									{
										BpiccReturnsOrder.EnableValidateOrderDiv();
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
//		console.log("xml"+JSON.stringify(xml));
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
//	                        var objectWeight=object.UNIT_WEIGHT==undefined?"0Lbs":object.UNIT_WEIGHT;
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
			  message = err.message+" in BpiccReturnsOrder.ProcessCheckStockXml";
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
		var part_no_list="";
		var part_no_arr="";
		for(i=0;i<split_arr.length-1;i++)
		{
			if(i==0){
				part_no_arr=$.trim(split_arr[i]);
			}else{
				part_no_arr=part_no_arr+","+$.trim(split_arr[i]);
			}
//			if(!empty(part_no))
//			{
//				prod_list+='<chec:P_PRODUCT_ITEM>';
//				prod_list+='<chec:PRODUCT_NUM>'+part_no+'</chec:PRODUCT_NUM>';
//				prod_list+='</chec:P_PRODUCT_ITEM>';
//			}
//			
		}
		var shipTO=getCookie("selected_ship_to");
		var billTO=getCookie("selected_bill_to");
		var userID=getCookie("userID");
		var orgID=getCookie("selected_org_id");
		if(split_arr.length>1)
		{
				$(".loader").show();
				 // setTimeout(function(){$(".loader").show();}, 100);
		}
//		if(empty(prod_list)) return;
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
		 var url = bpi_com_obj.web_oracle_api_url+"GetCheckStock?org_id="+orgID+"&ship_to="+shipTO+"&product_no="+part_no_arr;
//		 var url = bpi_com_obj.web_api_url;	
				jQuery.ajax({
					type: "GET",
					url: url,
//					 data: "xml_data="+xml_request_data,
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
						 BpiccReturnsOrder.ProcessExcelCheckStockXml(productObj,part_qty_arr,part_no_dc_arr,callback);
					 }
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
		var inputSO=$("#inputSO").val();
		var new_tr_id=2;
		var html="";
		  // try {
			   $("#bpicc_tableDetails tbody tr").remove();
				BpiccReturnsOrder.CalculateTotQtyWt();
		
			  var c_length=0;
				    var tot_xlx_length=xml.length;  
				    new_tr_id=2;
				    var row_tr_id=2;
						  for (var j = 0; j < tot_xlx_length; j++) {
							  var object = xml[j];
						var  prod_obj=new Object();
//                      var PRODUCT_NUM= $(this).find("PRODUCT_NUM").text();
//                      prod_obj['PRODUCT_NUM']= $(this).find("PRODUCT_NUM").text();;
//                      prod_obj['INVENTORY_ITEM_ID']= $(this).find("INVENTORY_ITEM_ID").text();;
//                      prod_obj['ITEM_STATUS'] = $(this).find("ITEM_STATUS").text();;
//                      prod_obj['BRAND_NAME'] = $(this).find("BRAND_NAME").text();;
//                      prod_obj['ITEM_DESCRIPTION'] = $(this).find("ITEM_DESCRIPTION").text();;
//						var ITEM_DESCRIPTION=$(this).find("ITEM_DESCRIPTION").text();
//						prod_obj['IS_CALIPER']='0';
//						if(ITEM_DESCRIPTION.indexOf("CALIPER")>=0)
//							prod_obj['IS_CALIPER']='1';
//					 
//					 
//                      prod_obj['UNIT_WEIGHT']= $(this).find("UNIT_WEIGHT").text();;
//						prod_obj['MIN_ORDER_QTY']= $(this).find("MIN_ORDER_QTY").text();;
//                      prod_obj['ERROR_MSG'] = $(this).find("ERROR_MSG").text(); 
                      
							  var PRODUCT_NUM= object.PRODUCT_NUM;
		                        prod_obj['PRODUCT_NUM']= object.PRODUCT_NUM;
		                        prod_obj['INVENTORY_ITEM_ID']= object.INV_ITEM_ID;
		                        prod_obj['ITEM_STATUS'] = object.ITEM_STATUS;
		                        prod_obj['BRAND_NAME'] = object.BRAND_NAME;
		                        prod_obj['ITEM_DESCRIPTION'] = object.ITEM_DESCRIPTION;
								var ITEM_DESCRIPTION = object.ITEM_DESCRIPTION;
								prod_obj['IS_CALIPER']='0';
//								if(ITEM_DESCRIPTION.indexOf("CALIPER")>=0)
//									prod_obj['IS_CALIPER']='1';
							 
							 
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
			 if(empty(inputSO))
				dis=" disabled ";
			  html+='<tr id="'+row_tr_id+'">';
			html+='<td><div class="availableDC ui-widget"><input id="partNum_'+row_tr_id+'"  onblur="BpiccReturnsOrder.ValidateEnteredPartNo('+row_tr_id+');"  value='+PRODUCT_NUM+' class="partNum" type="text"><span class="glyphicon glyphicon-search form-control-feedback"></span></td></div>';
			html+='<td><input id="brand_'+row_tr_id+'" class="inputBrand" value="" disabled="" type="text"></td>';
			html+='<td><input id="desc_'+row_tr_id+'" class="inputDesc" value="" disabled="" type="text"></td>';
			html+='<td><input id="weight_'+row_tr_id+'" class="inputUnitWgt" value="" disabled="" type="text"></td>';
			html+='<td><div class="availableDC"><input id="reqQnty_'+row_tr_id+'"  maxlength=5  onkeypress="return acceptNumbersOnlyForModule(event);" onblur="BpiccReturnsOrder.ValidateQty('+row_tr_id+');BpiccReturnsOrder.CalculateTotQtyWt();" class="inputReqQnty" '+dis+' type="text" value='+qty+'></td></div>';
			
			html+='<td><div class="availableDC"><input id="v1_'+row_tr_id+'" class="inputEdc" value="" disabled><span><input type="radio"  id="V1_RADIO_'+row_tr_id+'" name="inputAvail_'+row_tr_id+'" value="V1" class="radioDC" disabled onclick="BpiccReturnsOrder.EnableProperCheckBoxColor('+row_tr_id+');"  ><i class="fa fa-check-circle" id="V1_i_'+row_tr_id+'" aria-hidden="true"></i></span></input></td></div>';
			html+='<td><div class="availableDC"><input id="m1_'+row_tr_id+'" class="inputMdc" value="" disabled><span><input type="radio" id="M1_RADIO_'+row_tr_id+'"   name="inputAvail_'+row_tr_id+'" value="M1" class="radioDC" disabled onclick="BpiccReturnsOrder.EnableProperCheckBoxColor('+row_tr_id+');"  ><i class="fa fa-check-circle"   id="M1_i_'+row_tr_id+'" aria-hidden="true"></i></span></input></td></div>';
			html+='<td><div class="availableDC"><input id="m2_'+row_tr_id+'" class="inputWdc" value="" disabled><span><input type="radio"  id="M2_RADIO_'+row_tr_id+'"  name="inputAvail_'+row_tr_id+'" value="M2" class="radioDC" disabled onclick="BpiccReturnsOrder.EnableProperCheckBoxColor('+row_tr_id+');"  ><i class="fa fa-check-circle" id="M2_i_'+row_tr_id+'"  aria-hidden="true"></i></span></input></td></div>';
			
			html+='<td><div class="availableDC"><span onclick="BpiccReturnsOrder.deleteTableRow('+row_tr_id+');" class="glyphicon glyphicon-trash" aria-hidden="true"></span></td></div>';
			html+='	</tr>';
			
			row_tr_id++;
			new_tr_id++;
					    // var new_tr_id=BpiccReturnsOrder.addNewTableRowFromExcel(PRODUCT_NUM,2,"");


					   // BpiccReturnsOrder.ValidateErrorsForSelectedPartNo(new_tr_id,PRODUCT_NUM,'Yes');
					   

						c_length++;
//					 if(c_length>=tot_xlx_length)
//					 {

						 /* $('#reset_form').removeAttr("disabled");
						    bpi_obj.is_bulk_validate=0;	
							 $(".modal-dialog .close").trigger('click');
							 $(".loader").hide();
							 setTimeout(function(){
								 BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessagesForPartNO();
									 BpiccReturnsOrder.HandleGlobalDeleteForCheckDuplicatePartNo();
									  BpiccReturnsOrder.CalculateTotQtyWt();
						
							 bpi_obj.is_bulk_validate=0;
							  BpiccReturnsOrder.addNewTableRow(); 
							  var last_tr_id=$("#bpicc_tableDetails tbody").find("tr").last().attr('id');
							   setTimeout(function(){$("#partNum_"+last_tr_id).focus();},500);
							 }, 1000);   */
//					 }
//					});
                   }
					  	 

//			 });
			  $("#bpicc_tableDetails tbody").html(html)
			  setTimeout(function(){
			   bpi_obj.is_bulk_validate=0;
							  BpiccReturnsOrder.addNewTableRow(); 
								BpiccReturnsOrder.ValidateOrderRowByRowExcel();
							   setTimeout(function(){
								   	// $(".loader").hide();
								    $(".modal-dialog .close").trigger('click');
								    var last_tr_id=$("#bpicc_tableDetails tbody").find("tr").last().attr('id');
									 BpiccReturnsOrder.EnableValidateOrderDiv();
								   $("#partNum_"+last_tr_id).focus();},500);
			 },500);
			 if (callback && typeof(callback) === "function") {
						callback();
					}
		     /*}
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccReturnsOrder.ProcessCheckStockXml";
			  alert(message);
		  }   */
				 
				 $(".loader").hide();
				 
	},
	ApiGetShippingInfo:function(ship_to_acc)
	{
		BpiccReturnsOrder.ClearAllShippingAddressInputBox();
		 ship_to_data="";
			split_arr=ship_to_acc.split(",");
			var ship_to_code="";
//			if(isEmpty(split_arr)){
				ship_to_code=ship_to_acc;
//			}
//			for(i=0;i<split_arr.length-1;i++)
//			{
//				if(i==0){
//					ship_to_code=$.trim(split_arr[i]);
//				}else{
//					ship_to_code=ship_to_code+","+$.trim(split_arr[i]);
//				}
////				var ship_to_code=$.trim(split_arr[i]);
////				if(!empty(ship_to_code))
////				{
////					ship_to_data+='<ns2:P_SHIP_TO_LOCTION_ITEM>';
////					ship_to_data+='<ns2:SHIP_TO>'+ship_to_code+'</ns2:SHIP_TO>';
////					ship_to_data+='</ns2:P_SHIP_TO_LOCTION_ITEM>';
////				}
////				
//			}
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
	 
//			var url = bpi_com_obj.web_api_url;
			var orgID= getCookie("selected_org_id");
			var url = bpi_com_obj.web_oracle_api_url + "GetShipToAddress?org_id="
					+ orgID + "&ship_to_location=" + ship_to_code;
					jQuery.ajax({
						type: "POST",
						url: url,
		//				data: 
				    	dataType: "json",
						crossDomain: true,
						processData: false,
						// contentType: "text/xml; charset=\"utf-8\"",
						 
						success: function (data) {
		//					 SelectAccount.ProcessGetMultipleShiptoAddressForShipTo(data);
							 var obj=JSON.parse(data.object);
		//					 var billTo=obj.x_bill_to;
							 var shipToAdressList=obj.x_ship_to_address;
							 if(shipToAdressList!=null){
								 BpiccReturnsOrder.ProcessGetSingleAccountAddressForShipTo(shipToAdressList);
							 }else{
								 alert('ShipTo address is not found');
							 }
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
//			 $(xml).find('X_SHIP_TO_ADDRESS').each(function(){
				 
//                   $(this).find("X_SHIP_TO_ADDRESS_ITEM").each(function(){
			for (var i = 0; i < xml.length; i++) {
				  var object = xml [i];
//                      var SHIP_TO= $(this).find("SHIP_TO").text();
//                      var DROP_SHIP_FLAG= $(this).find("DROP_SHIP_FLAG").text();
//                      var ACCT_NAME= $(this).find("ACCT_NAME").text();
//                      var ACCT_NUM= $(this).find("ACCT_NUM").text();
//                      var PARTY_SITE_ID= $(this).find("PARTY_SITE_ID").text();
//                      var ADDRESS_LINE1= $(this).find("ADDRESS_LINE1").text();
//                      var ADDRESS_LINE2= $(this).find("ADDRESS_LINE2").text();
//                      var ADDRESS_LINE3= $(this).find("ADDRESS_LINE3").text();
//                      var CITY= $(this).find("CITY").text();
//                      var STATE= $(this).find("STATE").text();
//                      var POSTAL_CODE= $(this).find("POSTAL_CODE").text();
//                      var COUNTRY= $(this).find("COUNTRY").text();
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
						  bpi_obj.shipping_details[SHIP_TO]=new Object();
						  bpi_obj.shipping_details[SHIP_TO]=data_set;
						  var selected="";
						  if(getCookie("selected_ship_to")==SHIP_TO)
							  selected=" selected ";
						 html=SHIP_TO+" - "+ACCT_NAME+" "+ADDRESS_LINE1+" "+ADDRESS_LINE2+" "+ADDRESS_LINE3+" "+CITY+" "+STATE+" "+POSTAL_CODE+" "+COUNTRY;;
							option+="<option "+selected+" value='"+SHIP_TO+"'>"+html+"</option>";
							if(empty(first_add))
							{
								   first_acc=ACCT_NUM;
								   first_add=ADDRESS_LINE1+" "+ADDRESS_LINE2+" "+CITY+" "+STATE+" "+POSTAL_CODE;
								  
							}
							$("#shipping_address options").remove();
							$("#shipping_address").html(option);
					}
					
					
					// $("#shipping_address").val();
//			 });
			  if(empty(getCookie("selected_ship_to")))
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
					 BpiccReturnsOrder.PopulateShippingAddressValues();
					
		    }
	   catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccReturnsOrder.ProcessApiGetShippingInfoXml";
			  alert(message);
		  }   
	} ,
	ApiDropShippingInfo:function()
	{
		BpiccReturnsOrder.ClearAllShippingAddressInputBox();
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
							 
							 BpiccReturnsOrder.ProcessApiGetDropShipInfoXml(data);
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
					BpiccReturnsOrder.PopulateStateForSelectedCountry();
			 });
			  
		    }
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccReturnsOrder.ProcessApiGetShippingInfoXml";
			  alert(message);
		  }  
	} , 
	GetSelectedShippingAddressVal:function()
	{
		return $('input[name=shippingmodel]:checked').parent().next().text();
	},
	HandleShippingAddressOnClick:function()
	{
		 var selected_shipping_addres_type=BpiccReturnsOrder.GetSelectedShippingAddressVal();
			if(selected_shipping_addres_type=="SHIPPING ADDRESS")
			{
				var shitpTo=getCookie("selected_ship_to_account_no");
					// BpiccReturnsOrder.ApiGetShippingInfo();
				 	BpiccReturnsOrder.ApiGetShippingInfo(shitpTo);
				BpiccReturnsOrder.DisableShippingInputValues();
				
			}if(selected_shipping_addres_type=="DROP SHIP")
			{
				$("#shipping_address").removeAttr('disabled');
				 BpiccReturnsOrder.ApiDropShippingInfo();
				 BpiccReturnsOrder.EnableShippingInputValues();
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
		 var selected_shipping_addres_type=BpiccReturnsOrder.GetSelectedShippingAddressVal();
		BpiccReturnsOrder.ClearAllShippingAddressInputBox();
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
				BpiccReturnsOrder.PopulateStateForSelectedCountry(data_obj[shipping_address]['STATE']);
				$("#zip").val(data_obj[shipping_address]['POSTAL_CODE']);
		}
		else
		{
			$(".shippingAddress #country").val("US");
			 BpiccReturnsOrder.PopulateStateForSelectedCountry();
		}
	
	},
	ApiGetSOLineItem:function()
	{
			inputSo=$("#inputSO").val();
			$("#inputSO").removeClass("errorError");
				$("#validate_po_erro_msg_div").remove();
				
			 // BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("",""); 
//			if(empty(inputSo))
//			{
//				$("#inputSO").addClass("errorError");
//				 // BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("Please Enter Valid PO","Error"); 
//				 BpiccReturnsOrder.DisableAddRowsAndButtonPoValidation();
//				 $("#bpicc_tableDetails tbody tr input[id*='reqQnty_']").attr('disabled',true);	 
//				return false;
//			}
		  
		setTimeout(function(){$("#select_returns_type").focus();}, 100); 
		var url = bpi_com_obj.web_oracle_api_url+"getSoLineItems?org_id="+orgID+"&soNumber="+inputSo;
		console.log("url:"+url);
		jQuery.ajax({
			type: "GET",
			url: url,
		    dataType: "json",
			success: function (data) {
				var obj = JSON.parse(data.object);
				 if(obj!=null){
					 console.log("res"+JSON.stringify(obj));
					 BpiccReturnsOrder.ApiProcessGetSOLine(obj)
				 }else{
					 alert('ValidatePONumber is not found');
				 }
			
			},
			error: function (msg) {
				  alert("Failed1: " + msg.status + ": " + msg.statusText);
			}
		}); 
	}  ,
	ApiProcessGetSOLine:function(xml)
	{
		$("#validate_po_erro_msg_div").remove();
		  try {
			 
			 X_RESPONSE_STATUS=xml.x_response_status;
			 X_RESPONSE_MESSAGE=xml.x_response_message;
			 var soLineObj=xml.x_so_line_items;
			 console.log("soline"+JSON.stringify(soLineObj));
			 if(X_RESPONSE_STATUS=="S")
			 {
				 $("#bpicc_tableDetails tbody tr").remove();
				 var dis="";
				 var new_tr_id=1;
				 $.each(soLineObj, function(k,v)  
							{
								var part_no=v['PART_NUMBER'];
								var desc=v['DESCRIPTION']
								var SHIPPED_QUANTITY=v['SHIPPED_QUANTITY'];
//								if(qty==null||qty==undefined){
//									qty=0;
//								}else{
//									qty=qty.replace(/[^0-9.]/gi, '');
//								}
								var RETURNED_QUANTITY=v['RETURNED_QUANTITY']==undefined?"":v['RETURNED_QUANTITY'];
//								console.log("BRAND:"+brand);
								var LINE_NUMBER=v['LINE_NUMBER'];
								var RETURNABLE_YN=v['RETURNABLE_YN'];
							 
//								xml_part_no+=part_no+",";
//								 part_no_qty_arr[part_no]=qty;
//								 part_no_dc_arr[part_no]=dc;
								var disabled_flag="";
								disabled_flag="  ";
								var html='<tr id="'+new_tr_id+'">';
								html+='<td><input Style="width:40px;margin-left:10px;margin-top:8px" disabled="" id="lineNum'+new_tr_id+'" "class="" value='+LINE_NUMBER+'  type="text"></td>';
								html+='<td><div class="availableDC ui-widget"><input id="partNum_'+new_tr_id+'" '+disabled_flag+'   value='+part_no+' class="partNum" type="text"><span class="glyphicon glyphicon-search form-control-feedback"></span></div></td>';
//								if(BRAND==""){
//									html+='<td><input id="brand_'+new_tr_id+'" class="inputBrand" value="" disabled="" type="text"></td>';
//								}else{
//									html+='<td><input id="brand_'+new_tr_id+'" class="inputBrand" value='+BRAND+' disabled="" type="text"></td>';
//								}
								html+='<td><input id="desc_'+new_tr_id+'" class="inputBrand"  value='+desc+' disabled="" type="text"></td>';
                                html+='<td><input id="shippedQty_'+new_tr_id+'" class="inputDesc"  value='+SHIPPED_QUANTITY+' disabled="" type="text"></td>';
                                html+='<td><input id="returnedQty_'+new_tr_id+'" class="inputUnitWgt" value='+RETURNED_QUANTITY+' disabled="" type="text"></td>';
								
								if(RETURNABLE_YN=="Returnable"){
									html+='<td><input id="reqQnty_'+new_tr_id+'" disabled=""  maxlength=5  onkeypress="return acceptNumbersOnlyForModule(event);" onblur="qtyValidation('+new_tr_id+');;" class="inputReqQnty" '+dis+' type="text" value=""></td>';
									html+='<td><select id="select_returns_reason_'+new_tr_id+'" onchange="Validation()" disabled="" Style="margin-left:24px;margin-top:8px;width:142px;font-size:11px;height:24px" ><option value="select_returns_reason">Select Returns Reason</option><option value="">All Orders</option></select></td>';
//									html+='<td><input type="checkbox" name="" Style="margin-top:15px" value="checked" /><td>';
//									html+='<td><label for="Y" Style="margin-top:10px">Y</label></td>';
									html+='<td><span class="circleIcon"><i class="fa fa-check-circle greenIcon" aria-hidden="true"></i></span><input type="hidden" id="returnableValue'+new_tr_id+'" name="returnableValue" value="Y"></td>';
											
								}else{
									html+='<td><input id="d_reqQnty_'+new_tr_id+'" disabled=""  maxlength=5  onkeypress="return acceptNumbersOnlyForModule(event);" onblur="qtyValidation('+new_tr_id+');;" class="inputReqQnty" '+dis+' type="text" value=""></td>';
									html+='<td><select id="d_select_returns_reason"  disabled="" Style="margin-left:24px;margin-top:8px;width:142px;font-size:11px;height:24px" ><option value="select_returns_reason">Select Returns Reason</option><option value="">All Orders</option></select></td>';
//									html+='<td><input type="checkbox" name="" disabled="" Style="margin-top:15px" value="checked" /><td>';
//									html+='<td><label for="N" Style="margin-top:10px">N</label></td>';
									html+='<td><span class="circleIcon"><i class="fa fa-times-circle redIcon" style="font-size: 20px;margin-top: 12px;margin-left: -18px;" aria-hidden="true"></i></span><input type="hidden" id="returnableValue'+new_tr_id+'" name="returnableValue" value="N"></td>';
								}
								html+='<td><div class="availableDC"><span onclick="BpiccReturnsOrder.deleteTableRow('+new_tr_id+');" class="glyphicon glyphicon-trash" aria-hidden="true"></span></td></div>';
								html+='	</tr>';
								$("#bpicc_tableDetails tbody").append(html);
								new_tr_id++;
							});
//				 $("#Tot_No_Of_Lines").html(--new_tr_id);
				 var returnsType=$("#select_returns_type").val();
				 if(returnsType==""){
					 $('[id^=reqQnty_]').attr('disabled',true);
					 $('[id^=select_returns_reason_]').attr('disabled',true);
				 }else{
					 $('[id^=reqQnty_]').attr('disabled',false);
					 $('[id^=select_returns_reason_]').attr('disabled',false);
				 }
			 }
			 BpiccReturnsOrder.CalculateTotQtyWt();	
			 
		    }
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccReturnsOrder.ApiProcessGetSOLine";
			  alert(message);
		  }  
		  getReturnReason();
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
		 setCookie("cookie_check_part_obj",JSON.stringify(cookie_part_obj));
		 localStorage.setItem('cookie_check_part_obj', JSON.stringify(cookie_part_obj));
		 localStorage.setItem('cookie_part_obj', JSON.stringify(cookie_part_obj));
		}
		window.location.href= selectAccountPrefix + "index.html";
	},
	AddSOLineItems:function(cookie_part_obj)
	{
	 if(!empty(getCookie("selected_ship_to")))
		   {
			   bpi_com_obj.default_dc=getCookie("selected_ship_to");
		   }
		$("#validate_on_entry").removeAttr('checked');
		$("#validate_on_entry").attr("validate","0");
			 $("#bpicc_tableDetails tbody tr").remove();
		 xml_part_no="";
		  part_no_qty_arr=new Object();
		 part_no_dc_arr=new Object();
		 
		$.each(cookie_part_obj, function(k,v)  
		{
			var part_no=v['PART_NUMBER'];
			var desc=v['DESCRIPTION']
			var qty=v['UNIT_WEIGHT'];
			qty=qty.replace(/[^0-9.]/gi, '');
			var BRAND=v['BRAND'];
			var brand = BRAND==undefined?"":BRAND;
			console.log("BRAND:"+brand);
			var LINE_NUMBER=v['LINE_NUMBER'];
			var RETURNABLE_YN=v['RETURNABLE_YN'];
		 
//			xml_part_no+=part_no+",";
//			 part_no_qty_arr[part_no]=qty;
//			 part_no_dc_arr[part_no]=dc;
			var html='<tr id="'+new_tr_id+'">';
			html+='<td><div class="availableDC ui-widget"><input id="partNum_'+new_tr_id+'" disabled=""   value='+part_no+' class="partNum" type="text"><span class="glyphicon glyphicon-search form-control-feedback"></span></div></td>';
			if(BRAND==""){
				html+='<td><input id="brand_'+new_tr_id+'" class="inputBrand" value="" disabled="" type="text"></td>';
			}else{
				html+='<td><input id="brand_'+new_tr_id+'" class="inputBrand" value='+BRAND+' disabled="" type="text"></td>';
			}
			html+='<td><input id="desc_'+new_tr_id+'" class="inputDesc" value='+desc+' disabled="" type="text"></td>';
			html+='<td><input id="weight_'+new_tr_id+'" class="inputUnitWgt" value='+qty+' disabled="" type="text"></td>';
			html+='<td><div class="availableDC"><input id="reqQnty_'+new_tr_id+'"  maxlength=5 disabled="false"  onkeypress="return acceptNumbersOnlyForModule(event);" onblur="qtyValidation('+new_tr_id+');;" class="inputReqQnty" '+dis+' type="text" value=""></td></div>';
			html+='<td><select id="select_returns_reason" Style="margin-left:27px;margin-top:8px" onchange="changeReturnsReason();"><option value="select_returns_reason">Select Returns Reason</option><option value="">All Orders</option></select></td>';
			html+='<td><div class="availableDC"><span onclick="BpiccReturnsOrder.deleteTableRow('+new_tr_id+');" class="glyphicon glyphicon-trash" aria-hidden="true"></span></td></div>';
			html+='	</tr>';
			$("#bpicc_tableDetails tbody").append(html);
		});
			$("#validate_on_entry").prop('checked', true);
			$("#validate_on_entry").attr("validate","1");
	 
//				bpi_obj.is_bulk_validate=1;
//			  BpiccReturnsOrder.APIExcelCheckStock(xml_part_no,part_no_qty_arr,part_no_dc_arr,function(){
//				  setTimeout(function(){
//
//									
//							 
//							  $("#bpicc_tableDetails tbody tr input[id*='reqQnty_']").attr('disabled',true);	 
//							  }, 300); 
//			  });	  

//			$("#bpicc_tableDetails tbody tr input[id*='partNum_']").attr('disabled',true);	 
//			$("#bpicc_tableDetails tbody tr input[id*='reqQnty_']").attr('disabled',true);	 
//				setTimeout(function(){	$("#bpicc_tableDetails tbody tr input[id*='reqQnty_']").attr('disabled',true);	 }, 700); 
	}
	,
	GetCountryStateList:function()
	{
		  /* json_data='{"status":0,"errorMessage":"","object":[{"id":"1","name":"US","description":"United States","fStates":[{"id":"1","name":"TX","description":"Texas","countryID":"1"},{"id":"2","name":"FL","description":"Florida","countryID":"1"}]},{"id":"2","name":"CA","description":"Canada","fStates":[{"id":"3","name":"ON","description":"Ontario","countryID":"2"},{"id":"4","name":"AB","description":"Alberta","countryID":"2"}]}]}';
		  BpiccReturnsOrder.ProcessGetCountryStateList(json_data);
		  return; */		
		 var url = bpi_com_obj.web_mssql_api_url+"GetCountriesStatesList";
			jQuery.ajax({
					type: "GET",
					url: url,
					    dataType:"json",
					 
					success: function (data) {
						BpiccReturnsOrder.ProcessGetCountryStateList(data);
					 
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
		console.log("submit function");
		inputSO=$("#inputSO").val();
		if(empty(inputSO))
		{
				BpiccReturnsOrder.ShowShppingErrorSuccessMessages("Please Enter SO Number","Error"); 
				return false;
		}
		console.log("after if");
		var orgID=getCookie("selected_org_id");
		var SALES_NUMBER=$("#inputSO").val();;
		var RETURS_TYPE=$("#select_returns_type").val();

//		var SHIP_TO_ORG=bpi_com_obj.ship_to_location;
//		var BILL_TO_ORG=bpi_com_obj.bill_to_location;
//		if(!empty(getCookie("selected_ship_to")))
//		{
//			SHIP_TO_ORG=getCookie("selected_ship_to");
//		}
//		if(!empty(getCookie("selected_bill_to")))
//		{
//			BILL_TO_ORG=getCookie("selected_bill_to");
//		}

		var partNum="";
		var reqQnty="";
		var returnableValue="";
		var returnReasonValue="";
		var lineNum="";
		var returnsJson = {};
		var returnsArray = [];
		returnsJson.orgID=orgID;
		returnsJson.refSO=SALES_NUMBER;
		returnsJson.returnType=RETURS_TYPE;
		console.log("before build");
		var data=$("#bpicc_tableDetails tbody tr");
		$.each(data,function(k,v)
		{
			var tr_id=$(this).attr("id");
			// var partNum=$("#bpicc_tableDetails tbody tr#"+tr_id+" #partNum_"+tr_id).val();
			// var reqQnty=$("#bpicc_tableDetails tbody tr#"+tr_id+" #reqQnty_"+tr_id).val();
			
			  partNum=$.trim($(this).find("#partNum_"+tr_id).val());
			  reqQnty=$.trim($(this).find("#reqQnty_"+tr_id).val());
			  lineNum=$.trim($(this).find("#lineNum"+tr_id).val());
			  returnableValue=$.trim($(this).find("#returnableValue"+tr_id).val());
			  var returnReason = document.getElementById("select_returns_reason_");
//			  returnReasonValue = returnReason.options[returnReason.selectedIndex].text;
			  
			  returnReasonValue=$(this).find("#select_returns_reason_"+tr_id).val()
//			returnReasonValue= $(this).find("input[id*='select_returns_reason_1']:selected").val();
			// var warehouse=$("input[name='inputAvail_"+tr_id+"']:checked").val();
			console.log("returnReason:"+returnReasonValue);
			if(!empty(partNum) && reqQnty>0)
			{
				if(returnableValue=='Y'){
					
				var returnsObjJson = {
						
						"partnumber": partNum,
						"return_qty": reqQnty,
						"return_reason": returnReasonValue,
						"line_number": lineNum

				};
				}
				returnsArray.push(returnsObjJson);
				console.log("returnsArray"+JSON.stringify(returnsArray));
			}
			 
		});
		returnsJson.listRMAObject=returnsArray;
	    console.log("returnsJson"+JSON.stringify(returnsJson));
	    
	$(".loader").show();

		var url = bpi_com_obj.web_oracle_api_url+"SaveReturnsMule";;
		console.log("url:"+url);			 
					jQuery.ajax({
						type: "POST",
						url: url,
						 data: JSON.stringify(returnsJson),
						dataType: "json",
						crossDomain: true,
						processData: false,
						// contentType: "text/xml; charset=\"utf-8\"",
						 
						success: function (data) {
							 $(".loader").hide();
							 console.log("result data"+data);
							 var object=data.object;
							 BpiccReturnsOrder.ApiProcessSubmitOrderdata(object);
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
		var obj=JSON.parse(xml);
		  try {
			 
//			 X_RESPONSE_STATUS=$(xml).find('X_RESPONSE_STATUS').text() ;
//			 X_RESPONSE_MESSAGE=$(xml).find('X_RESPONSE_MESSAGE').text()
//			 X_SALES_ORDER_NUMBER=$(xml).find('X_SALES_ORDER_NUMBER').text()
//			var X_RESPONSE_STATUS=obj['x_response_status'] ;
//			var X_RESPONSE_MESSAGE=obj['x_response_message'] ;
			var X_SALES_ORDER_NUMBER=obj.x_order_number;
			 if(obj.x_return_message=="Order Successfuly Created")
			 {
				// BpiccReturnsOrder.EnableAddRowsAndButtonPoValidation();
				alert(obj.x_return_message+" - Sales Order No is "+X_SALES_ORDER_NUMBER);
				window.location.href= selectAccountPrefix + "return-history.html";
				// location.reload(); ;
			 }
			 else
			 {
				 $("#submit_order").show();
			 // BpiccReturnsOrder.DisableAddRowsAndButtonPoValidation();
			 alert(obj.x_return_message);
			 }
			  
			}
		  catch(err) {
			
			  var message = err.message;
			  message = err.message+" in BpiccReturnsOrder.ProcessCheckStockXml";
			  alert(message);
		  }  
	},
	GetShippingMethodTypes:function()
	{
		 /*  json_data='{"status":0,"errorMessage":"","object":[{"scac_id":"1","scac_seq_no":"0","scac":"UP2","entity":"65","description":"UPS 2nd Day Air","order_type":"EMERGENCY","scac_default":"n"},{"scac_id":"2","scac_seq_no":"1","scac":"UP3","entity":"65","description":"UPS 3 Day Select","order_type":"EMERGENCY","scac_default":"n"},{"scac_id":"3","scac_seq_no":"19","scac":"FED","entity":"32","description":"FedEx Air","order_type":"EMERGENCY","scac_default":"n"},{"scac_id":"4","scac_seq_no":"20","scac":"FGR","entity":"32","description":"FedEx Ground","order_type":"EMERGENCY","scac_default":"y"},{"scac_id":"5","scac_seq_no":"21","scac":"SAM","entity":"32","description":"Same Day","order_type":"EMERGENCY","scac_default":"n"}]}';
		   BpiccReturnsOrder.ProcessGetShippingMethodTypes(json_data);
		   return;  */ 
		var url = bpi_com_obj.web_mssql_api_url+"GetShippingMethodTypes";
			jQuery.ajax({
					type: "GET",
					url: url,
					success: function (data) {
						BpiccReturnsOrder.ProcessGetShippingMethodTypes(data);
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

Date.prototype.toShortFormat = function() {

	    var month_names =["JAN","FEB","MAR",
	                      "APR","MAY","JUN",
	                      "JUL","AUG","SEP",
	                      "OCT","NOV","DEC"];
	    
	    var day = this.getDate();
	    var month_index = this.getMonth();
	    var year = this.getFullYear();
	    var dayFormat=parseInt(day)<10?"0"+day:day;
	    return "" + dayFormat + "-" + month_names[month_index] + "-" + year;
	}
//$(function() {
//	  for (var i = 0; i < 500; i++) {
//		  partNoList.push('abc' + i);
// }
//
$(function() {
//	 $( ".partNum" ).autocomplete({
//	      source: partNoList
//	    });
//});
//	  $(function() {
//        var availableTutorials  =  [
//           "ActionScript",
//           "Bootstrap",
//           "C",
//           "C++",
//        ];
//        $( "#automplete-1" ).autocomplete({
//           source: availableTutorials
//        });
//     });
$(document).on('click', '.partNum', function() {
	$(".partNum").autocomplete({
       minLength: 1,
       source: function (request, response) {
       	console.log("insidde funtion");
       	 var filteredArray = $.map(partNoList, function(item) {
       		 var item2=item.toLowerCase();
       		 var request2=request.term;
       		 request2=request2.toLowerCase();
       	        if( item2.indexOf(request2) == 0){
       	            return item;
       	        }
       	        else{
       	            return null;
       	        }
       	    });
       	    response(filteredArray.slice(0, 20));
       }
   });
});
});
function GetPartNumberList()
{
	 var shipTO=getCookie("selected_ship_to");
		var billTO=getCookie("selected_bill_to");
		var userID=getCookie("userID");
		var orgID=getCookie("selected_org_id");
		var partNO="";
	 var url = bpi_com_obj.web_oracle_api_url+"GetPartNumber?org_id="+orgID+"&shipTo_number="+shipTO+"&partNumber="+partNO;
		jQuery.ajax({
				type: "GET",
				url: url,
				    dataType:"json",
				 
				success: function (data) {
//					console.log(JSON.stringify(data));
					
					if(data.status==0){
						var object=JSON.parse(data.object);
						var partNumberList=object.x_item_search;
						for(i=0;i<partNumberList.length;i++){
							var partNoArray=partNumberList[i];
							partNoList=partNoArray;
							 $(".loader").hide();
						}
							
					}
				},
				error: function (msg) {
					  console.log("Failed: " + msg.status + ": " + msg.statusText);
				}
			});
//	  return r_str;
}
function qtyValidation(tr_id){
	var line_num=$.trim($("#lineNum"+tr_id).val());
	var part_no=$.trim($("#partNum_"+tr_id).val());
	 var reqQnty=$.trim($("#reqQnty_"+tr_id).val());
	 reqQnty= parseInt((empty(reqQnty))?0:reqQnty);
	var inputSo=$("#inputSO").val();
	console.log("line_num: "+line_num+" part_no: "+part_no+" reqQnty: "+reqQnty+" inputSo: "+inputSo)
//	var line_num=1;
//	var part_no='CM15140';
//	 var reqQnty=10;
////	 reqQnty= parseInt((empty(reqQnty))?0:reqQnty);
//	var inputSo=66642;
	var url = bpi_com_obj.web_oracle_api_url+"validateReturnQty?org_id="+orgID+"&so_number="+inputSo+"&line_num="+line_num+"&part_num="+part_no+"&req_qty="+reqQnty;
	console.log('url:'+url);
	jQuery.ajax({
			type: "GET",
			url: url,
			    dataType:"json",
			 
			success: function (data) {
				var obj=JSON.parse(data.object);
				console.log(JSON.stringify(obj));
				if(obj.x_response_status=='S'){
					console.log("success");	
					$("#e_quan_greater").hide();
					$("#reqQnty_"+tr_id).removeClass("errorError");
					BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("","");
				}else if(obj.x_response_status=='E'){
					$("#e_quan_greater").show();
					$("place_order_error_info").show();
					$("#reqQnty_"+tr_id).addClass("errorError");
					BpiccReturnsOrder.ShowPlaceOrderErrorSuccessMessages("Returned quantity should not greater than shipped quantity","Error");
//					error_found++; 
				}
			},
			error: function (msg) {
				  console.log("Failed: " + msg.status + ": " + msg.statusText);
			}
		});
	BpiccReturnsOrder.CalculateTotQtyWt();
//		var totalWeight=$("#totalWeight").text();
//		var totalWeightCal=totalWeight+reqQnty;
//		var totalWeight=$("#totalWeight").text();
//		var totalWeightCal=totalWeight+reqQnty;
//		
//		console.log('totalWeight'+totalWeight);
//		console.log('totalQty'+$("#totalQty").text());
//		$("#totalWeight").html(0);
//		$("#totalQty").html(0);
}



function getReturnReason(){

	var url = bpi_com_obj.web_oracle_api_url+"getReturnReason";	
	console.log("Get return reason"+url);
	jQuery.ajax({
		type: "GET",
		url: url,
	    dataType: "json",
		success: function (data) {
			
			var obj = JSON.parse(data.object);
//			console.log("Return Reason Success:"+JSON.stringify(obj));
//			var x_return_reason =obj.x_return_reason;
//			console.log("x_return_reason"+x_return_reason);
//			

		
			 if (obj != null) {
				 appendReturnReason(obj);
	            }
		},
		error: function (msg) {
 
			  alert("Failed1: " + msg.status + ": " + msg.statusText);
		}
	}); 
	
}
function appendReturnReason(obj) {
	$('[id^=select_returns_reason_]').empty();
    $('[id^=select_returns_reason_]').append(
            '<option value="">Select Returns Reason</option>');
//    var obj = JSON.parse(data.object);
//	console.log("Return Reason Success:"+JSON.stringify(obj));
	var x_return_reason =obj.x_return_reason;
	console.log("x_return_reason"+x_return_reason);
	
	for (var i = 0; i < x_return_reason.length; i++) {
		  var x_return_reasonObj = x_return_reason [i];
		  var MEANING_QUOTES = JSON.stringify(x_return_reasonObj.MEANING);
		  var LOOKUP_CODE_QUOTES = JSON.stringify(x_return_reasonObj.LOOKUP_CODE);
		  var MEANING = MEANING_QUOTES.toString().replace(/"/g, "");
		  var LOOKUP_CODE = LOOKUP_CODE_QUOTES.toString().replace(/"/g, "");
//	  console.log("MEANING"+JSON.stringify(x_return_reasonObj.MEANING));
//	  console.log("LOOKUP_CODE"+JSON.stringify(x_return_reasonObj.LOOKUP_CODE));
	  $('[id^=select_returns_reason_]').append(
              '<option value="' + LOOKUP_CODE + '">'
                      + MEANING + '</option>');
	}
	

}

function Validation(){
	var data=$("#bpicc_tableDetails tbody tr");
	
	$.each(data,function(k,v)
	{
	var tr_id=$(this).attr("id");
	var reqQntyValue=$("#reqQnty_"+tr_id).val();
//	alert(reqQntyValue);
	if (reqQntyValue == "") {
		$("#reqQnty_"+tr_id).addClass("errorError");
	}
	else{
		$("#reqQnty_"+tr_id).removeClass("errorError");
	}
	});
}

function submitValidation(){
	var data=$("#bpicc_tableDetails tbody tr");
	
	$.each(data,function(k,v)
	{
	var tr_id=$(this).attr("id");
	var reqQntyValue=$("#reqQnty_"+tr_id).val();
	var select_returns_reasonValue=$("#select_returns_reason_"+tr_id).val(); 
//	alert(reqQntyValue);
	if (reqQntyValue == "" && select_returns_reasonValue=="") {
		$("#reqQnty_"+tr_id).addClass("errorError");
		$("#select_returns_reason_"+tr_id).addClass("errorError");
	}
	else{
		$("#reqQnty_"+tr_id).removeClass("errorError");
		$("#select_returns_reason_"+tr_id).removeClass("errorError");
		BpiccReturnsOrder.SubmitFinalOrder();
	}
	});
}