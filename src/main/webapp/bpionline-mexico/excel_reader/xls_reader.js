var X = XLSX;
var wtf_mode = false;
function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
	return o;
}
function xw(data, cb) {
	transferable = document.getElementsByName("xferable")[0].checked;
	if(transferable) xw_xfer(data, cb);
	else xw_noxfer(data, cb);
}
function to_csv(workbook) {
	var result = [];
	workbook.SheetNames.forEach(function(sheetName) {
		var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
		// csv=csv.split("\n")
		console.log(csv);
		alert(csv);
		if(csv.length > 0){
			result.push("SHEET: " + sheetName);
			result.push("");
			result.push(csv);
		}
	});
	return result.join("\n");
}
function to_json(workbook) {
	var result = {};
	sheet_cnt=0;
	workbook.SheetNames.forEach(function(sheetName) {
		if(sheet_cnt==0)
		{
			var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
			if(roa.length > 0){
				result = roa;
			}
			sheet_cnt++;
		}
	});
	 
	return result;
}

 

function process_wb(wb) {
		output = to_json(wb);
		
	if(!empty(output))
	{
		$(".errorFileFormat").show();
				$(".errorFileFormat").html(msgAlertExcelUploadValidatingData);  	  
		$("#validate_on_entry").removeAttr('checked');
			$("#validate_on_entry").attr("validate","0");
		part_no_key="";
		qty_key="";
		first_row=output[0];
	 
		 var keys = [];
		for(var k in first_row) keys.push(k);
		 part_no_key=keys[0];
		 qty_key=keys[1];
		 if(keys.length>2)
		 {
			  
			  
			
			
			 setTimeout(function(){
					$(".errorFileFormat").show();
				$(".errorFileFormat").html(msgAlertExcelUploadOnly2Columns);     
			
					    
					}, 300);
			 return false;
		 }
		 if(empty(part_no_key) || empty(qty_key) || qty_key=='undefined' || part_no_key=='undefined')
		 {
			 
			 $(".errorFileFormat").show();
			$(".errorFileFormat").html(msgAlertExcelUploadAtLeast2Columns);  
			 return false;
			 
			 
		 }
		 else
		 {
					
				$(".errorFileFormat").show();
			$(".errorFileFormat").html(msgAlertExcelUploadValidatingData);
						
				$(".errorFileFormat").show();
			$(".errorFileFormat").html(msgAlertExcelUploadValidatingData);
						
				$(".errorFileFormat").show();
			$(".errorFileFormat").html(msgAlertExcelUploadValidatingData);  	   
			
					 setTimeout(function(){
					$(".errorFileFormat").show();
				$(".errorFileFormat").html(msgAlertExcelUploadValidatingData);  	   
			
					    
					}, 300);
					
			   
		 }
		 
		 $("#bpicc_tableDetails tbody tr").remove();
		 xml_part_no="";
		 var tot_cnt=0;
		 part_no_qty_arr=new Object();
		 part_no_dc_arr=new Object();
		 $.each(output,function(k,v)
		 {
			 var part_no=$.trim(v[part_no_key]);
			 if(!empty(part_no))
			 {
			 var qty=$.trim(v[qty_key]);
			 qty = qty.replace(",", ""); 
			 qty= Number(qty);
			 if(isNaN(qty))
				qty=0;
			xml_part_no+=part_no+",";
			 // BpiccPlaceOrder.addNewTableRowFromExcel(part_no,qty,"");
			 part_no_qty_arr[part_no]=qty;
			 part_no_dc_arr[part_no]="";
			 tot_cnt++;
			 }
		 });
		 
		 // console.log(part_no_qty_arr);
		
		 	$("#validate_on_entry").prop('checked', true);
				$("#validate_on_entry").attr("validate","1");
				bpi_obj.excel_upload_min_qty_rows=[];
				bpi_obj.is_last_excel_min_row_updated=0;
				bpi_obj.is_bulk_validate=1;
				   $("#excel_upload_msg_div").remove();
				   	$("#place_order_error_info").after(' <div id="excel_upload_msg_div" class="errorInfo"> <p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span><span class="errorMessage">'+tot_cnt+" "+msgAlertExcelUpload100RecordsImported+'</span></p></div> ');
				 	 $("#excel_upload_msg_div").show();
		 
		 	   BpiccPlaceOrder.APIExcelCheckStock(xml_part_no,part_no_qty_arr,part_no_dc_arr,function(){
				   // alert(3);
				  
				  
				  // alert(2);
				   $("#excel_upload_msg_div").remove();
				   	$("#place_order_error_info").after(' <div id="excel_upload_msg_div" class="errorInfo"> <p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span><span class="errorMessage">'+tot_cnt+" "+msgAlertExcelUpload100RecordsImported+'</span></p></div> ');
				 	 $("#excel_upload_msg_div").show();
				  
					 
					
				  
				   
				  }) ;  
				 
					 
			
	}
 
}

			 
			 

 


function UploadExcelOrder( ) {
	 $(".errorFileFormat").hide();
	 $(".errorFileFormat").html("");
	 $(".errorFileFormat").show();
		  $(".errorFileFormat").html(msgAlertExcelUploadValidatingData);
		 setTimeout(function(){ 
 var f =  document.getElementById('uploadOrderFile').files[0];
 if(empty(f))
 {
		$(".errorFileFormat").show();
		  $(".errorFileFormat").html(msgAlertExcelUploadFileInExcelFormat);
		  return false
 }
 file_name=f.name;
 ext=file_name.split(".").pop().toLowerCase();
	if(ext!='xls' && ext!='xlsx')
	{
		$(".errorFileFormat").show();
		  $(".errorFileFormat").html(msgAlertExcelUploadFileInExcelFormat);
		  return false
	}
	 $(".errorFileFormat").hide();
	 $(".errorFileFormat").html("");
	 $(".errorFileFormat").show();
				$(".errorFileFormat").html(msgAlertExcelUploadValidatingData);  	  
			 	
			var reader = new FileReader();
			reader.readAsArrayBuffer(f);
			var data;
			reader.onload = function () {
				data = reader.result;
				 var arr = fixdata(data);
				 wb = X.read(btoa(arr), {type: 'base64'});
				process_wb(wb);
			};
			 setTimeout(function(){$(".errorFileFormat").html(msgAlertExcelUploadValidatingData).show();}, 100); 
		 }, 200);		 
}

 
