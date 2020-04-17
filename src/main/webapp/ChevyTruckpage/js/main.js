	$(function(){
		$('.dropdown-toggle').dropdown()
	});

jQuery(document).ready(function($) {

    $('#myCarousel').carousel({
            interval: 5000
    });

    $('#carousel-text').html($('#slide-content-0').html());

    //Handles the carousel thumbnails
   $('[id^=carousel-selector-]').click( function(){
        var id = this.id.substr(this.id.lastIndexOf("-") + 1);
        var id = parseInt(id);
        $('#myCarousel').carousel(id);
        //$('.thumbnail ').removeClass('activeLi');
        //$(this).addClass('activeLi');
    });

    $('#myCarousel').on('slid.bs.carousel', function (e) {
             var id = $('.item.active').data('slide-number');
            $('#carousel-text').html($('#slide-content-'+id).html());
    });
});

$(document).ready(function(){ 
 $(".navbar-header").click(function(){
    $(".navbar-collapse").toggle();
    $(".mobilemenu1").toggleClass('active');
    $(".mobilesearchBlock").removeClass('active');
    $(".navbar-collapse").show();
    $(".mobileMenu2").removeClass('active');
  });
  $(".mobileMenu2 a").click(function(){
    $(".mobilesearchBlock").toggleClass('active');
    $(".mobileMenu2").toggleClass('active');
    $(".mobilemenu1").removeClass('active');
    $(".navbar-collapse").removeClass('in');
  });
  $(".mobileMenu4 select").click(function(){
   $(".navbar-collapse").removeClass('in');
    $(".mobilemenu1").removeClass('active');
    $(".mobilesearchBlock").removeClass('active');
    $(".mobileMenu2").removeClass('active');
  });
  $(".mobileMenu5 select").click(function(){
    $(".navbar-collapse").removeClass('in');
    $(".mobilemenu1").removeClass('active');
    $(".mobilesearchBlock").removeClass('active');
    $(".mobileMenu2").removeClass('active');
  });
});

$(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
});
 

$(function()
  {
    $('.scroll-pane').jScrollPane({
      autoReinitialise: true
    });
  });
  
//validation for promotions 
$(function() {
    $("form[name='promotions']").validate({

        rules: {
            inputName: "required",
            inputLastName: "required",

            inputEmail: {
                required: true,
                email: true
            },
			inputBusName: "required",
            inputOwnersName: "required",
			inputBusAddr: "required",
			
			inputCity: "required",
			inputState: "required",
            inputPhone: {
                required: true
            },
			inputZipCode:{
                required: true,
                number: true ,
            },
			inputWebsite: "required",
        },
        // Specify validation error messages
        messages: {
            inputName: "Please Enter First Name",
            inputLastName: "Please Enter Last Name",
			inputEmail: "Please Enter Valid Email Address",
			inputBusName: "Please Enter Business Name",
			inputOwnersName: "Please Enter Owner's Name",
			inputBusAddr: "Please Enter Business Address",
			
            inputCity: "Please Enter City",
			inputState: "Please Enter State",
            inputPhone:{
                required: "Please Enter Valid Phone Number",
                number:"Phone Number Must Be Digits"
            },
			inputZipCode: {
                required: "Please Enter Valid Zip Code",
                number:"Zip Code Must Be Digits"
            },
			inputWebsite: "Please Enter Website Address",
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
//            form.submit();
        	promoSubmitAction();
        }
    });
});