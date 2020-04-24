$(document).ready(function() {

    $('.scroll-pane').jScrollPane();
  
  // $(".priceListContent .tablesorter").tablesorter();
 

// Change the selector if needed
var $table = $('table'),
    $bodyCells = $table.find('tbody tr:first').children(),
    colWidth;

// Get the tbody columns width array
colWidth = $bodyCells.map(function() {
    return $(this).width();
}).get();

// Set the width of thead columns
$table.find('thead tr').children().each(function(i, v) {
    $(v).width(colWidth[i]);
});    

  });


 

  
  
  
$(function()
{
    $('.scroll-pane').jScrollPane({
        autoReinitialise: true
    });
}); 

$(function() {
      $('#inlineRadio1').on('change',function() {
            if( $(this).is(':checked') ) {
                  $(".upsPickup").addClass('open');
                  $(".customerPickup").removeClass('open');
            } else {
                  $(".upsPickup").removeClass('open');
                  $(".customerPickup").addClass('open');
            }
      });
      $('#inlineRadio2').on('change',function() {
            if( $(this).is(':checked') ) {
                  $(".customerPickup").addClass('open');
                  $(".upsPickup").removeClass('open');
            } else {
                  $(".customerPickup").removeClass('open');
                  $(".upsPickup").addClass('open');
            }
      });
});


$(document).ready(function() {

      $('.radioDC').on('change',function() {
          if( $(this).is(':checked') ) {
              $(this).closest('span').find('.fa-check-circle').addClass('greenIcon');
              $(this).parent().parent().siblings().children().children().removeClass('greenIcon');
          }; 
      });
	  
	  $('.checkRoles').on('change',function() {
          if( $(this).is(':checked') ) {
              $(this).closest('span').find('.fa-check-circle').addClass('greenIcon');
              
          }
		  else
			  {
				  $(this).siblings().removeClass('greenIcon'); 
			  }
      });
	  
     
      $('#account a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
      });
	  
	  
});
/*Added for login dropdown*/

$(document).ready(function() {
  
  $(".loginBlock .login").click(function(e){
      $(".loginContentPane").toggle();
       e.stopPropagation();
  });

  $(".loginContentPane").click(function(e){
      e.stopPropagation();
  });
});
  $(document).click(function(){
      $(".loginContentPane").hide();
  });
  
  $('.bpiOnlineinlineRadio1').click(function(){
    if (this.checked) {
        $('.inlineRadio').show();
    }
});
$('.bpiOnlineinlineRadio2').click(function(){
    if (this.checked) {
        $('.inlineRadio').hide();
    }
});
  $('.bpiOnlineinlineRadio1').click(function(){
    if (this.checked) {
        $('.addressInput').show();
    }
});
$('.bpiOnlineinlineRadio2').click(function(){
    if (this.checked) {
        $('.addressInput').hide();
    }
});
$('.techmobilemenu button').click(function(){
    
        $('.leftMenuPane').toggleClass('open');
    
});  

$(function () {
       $('#orderType').change(function () {
           if (this.options[this.selectedIndex].value == 'ponumbers') {
               $('.dateRange *').hide();
               $('.dateRange label').hide();
               $('.max60days').hide();
               $('.enterPOInput').show();
               $('.salesOrderInput').hide();
               $('.salesOrderInput input').val('');
               $('.enterPOInput input').val('');
			   $('.dateRange').addClass('poWidth');
           }
           else if (this.options[this.selectedIndex].value == 'salesorders') {
               $('.dateRange *').hide();
               $('.dateRange label').hide();
               $('.max60days').hide();
               $('.enterPOInput').hide();
               $('.salesOrderInput').show();
               $('.salesOrderInput input').val('');
               $('.enterPOInput input').val('');
			   $('.dateRange').addClass('salesWidth');
           }
           else{
             $('.dateRange *').show();
             $('.dateRange label').show();
             $('.max60days').show();
             $('.enterPOInput').hide();
             $('.salesOrderInput').hide();
             $('.salesOrderInput input').val('');
             $('.enterPOInput input').val(''); 
			 $('.dateRange').removeClass('poWidth');
			  $('.dateRange').removeClass('salesWidth');
           }
       });
  });

   $(document).ready(function() {
 $(".logoutBlock .logout").click(function(e){
      $(".logoutContentPane").toggle();
       e.stopPropagation();
  });

  $(".logoutContentPane").click(function(e){
      e.stopPropagation();
  });
});
  $(document).click(function(){
      $(".logoutContentPane").hide();
  });
  
$(document).ready(function() 
    { 
    //$(".tableContentsPriceList").tablesorter(); 
    /* $("table").tablesorter({ 
        // sort on the first column and third column, order asc 
        sortList: [[0,0],[2,0]] 
    }); */

        // var orderHistoryTable = document.getElementById("order_list_tbl");
        // if (orderHistoryTable !== null) {
        //     sorttable.makeSortable(orderHistoryTable);
        // }

        // var orderDetailTable = document.getElementById("dtl_order_list_tbl");
        // if (orderDetailTable !== null) {
        //     sorttable.makeSortable(orderDetailTable);
        // }

        // var priceSheetsTable = document.getElementById("price_list_tbl");
        // if (priceSheetsTable !== null) {
        //     sorttable.makeSortable(priceSheetsTable);
        // }
    } 
);
/*
$(function () {
    $('#datetimepicker1').datetimepicker({
      format: 'MM/DD/YYYY'
    });
    $('#datetimepicker2').datetimepicker({
      format: 'MM/DD/YYYY'
    });
}); */
