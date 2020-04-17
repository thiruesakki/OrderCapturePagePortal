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


/* Validation code for add user page */
$(function() {
  $("form[name='userdetailsForm']").validate({
	  
    rules: {
	 
	  login_username: {
				required: true,
				email: true
			},
	  password: {
        required: true,
        minlength: 7,
		maxlength:10
      },
	  fname: {
		required: true,
		maxlength:20
		},
		
      lname: {
		required:true,
		maxlength:20
		},
		
	  shipto: {
		required: true,
		maxlength:20,
		
		},
		
      billto: {
		required:true,
		maxlength:20,
		
		},
	 checkRoles :{
		 required: $('#checkRoles').not(':checked')
	 }
	 
    },
    // Specify validation error messages
    messages: {
      fname: {
		  required:"Please enter your firstname",
		  maxlength: "maximun characters is 20"
		  },
	  lname: {
		  required:"Please enter your lastname",
		  maxlength: "maximun characters is 20"
		  },
	   password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 7 characters long",
		maxlength: "Your password must be maximum of 10 characters long"
      },
	   
	  login_username: "Please enter a valid email address",
	  
	  shipto: {
		  required:"Please enter shipto",
		  maxlength: "maximun numbers allowed is 20"
		  },
		  
	 billto: {
		  required:"Please enter billto",
		  maxlength: "maximun numbers allowed is 20"
		  },
		  
	  checkRoles:{required:"please select at least one role"}
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
//      form.submit();
      console.log("Add Page - Submit button clicked");
	  BpiccAdmin.addNewUser();
      
    }
  });
});


/* Validation code for admin/edituser page */
$(function() {
  $("form[name='edituserdetailsForm']").validate({
	  
    rules: {
	 
	  login_username: {
				required: true,
				email: true
			},
	  password: {
//        required: true,
        minlength: 7,
		maxlength:10
      },
	  fname: {
		required: true,
		maxlength:20
		},
		
      lname: {
		required:true,
		maxlength:20
		},
		
	  shipto: {
		required: true,
		maxlength:20,
		
		},
		
      billto: {
		required:true,
		maxlength:20,
		
		},
	 checkRoles :{
		 required: $('#checkRoles').not(':checked')
	 }
	 
    },
    // Specify validation error messages
    messages: {
      fname: {
		  required:"Please enter your firstname",
		  maxlength: "maximun characters is 20"
		  },
	  lname: {
		  required:"Please enter your lastname",
		  maxlength: "maximun characters is 20"
		  },
	   password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 7 characters long",
		maxlength: "Your password must be maximum of 10 characters long"
      },
	   
	  login_username: "Please enter a valid email address",
	  
	  shipto: {
		  required:"Please enter shipto",
		  maxlength: "maximun numbers allowed is 20"
		  },
		  
	 billto: {
		  required:"Please enter billto",
		  maxlength: "maximun numbers allowed is 20"
		  },
		  
	  checkRoles:{required:"please select at least one role"}
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
//      form.submit();
      console.log("Edit Page - Submit button clicked");
      BpiccAdmin.editUser();
    }
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

$(window).load(function() {
	$('.checkRoles').on('change',function() {
	    if( $(this).is(':checked') ) {
	        $(this).closest('span').find('.fa-check-circle').addClass('greenIcon');
	        
	    }
		  else
			  {
				  $(this).siblings().removeClass('greenIcon'); 
			  }
	});
});

