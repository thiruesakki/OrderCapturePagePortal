$(document).ready(function() {
	$(function()
  {
 $('.scroll-pane').jScrollPane();
  });
 $(function()
  {
    $('.scroll-pane').jScrollPane({
      autoReinitialise: true
    });

  });
  $('.inlineRadio1').click(function(){
    if (this.checked) {
        $('.inlineRadio').show();
    }
});
$('.inlineRadio2').click(function(){
    if (this.checked) {
        $('.inlineRadio').hide();
    }
});
  $('.inlineRadio1').click(function(){
    if (this.checked) {
        $('.addressInput').show();
    }
});
$('.inlineRadio2').click(function(){
    if (this.checked) {
        $('.addressInput').hide();
    }
});
$('.techmobilemenu button').click(function(){
    
        $('.leftMenuPane').toggleClass('open');
    
});



});

 /* validation ends */ 


/* Validation code for registration page */
$(function() {
  $("form[name='registrationForm']").validate({
	  
    rules: {
      fname: "required",
      lname: "required",
	 
	  email: {
        required: true,
        email: true
      },
	  password: {
        required: true,
        minlength: 5
      },
	  reenterpassword: {
        required: true,
        minlength: 5
      },
	   phonenumber: {
        required: true,
        minlength: 10,
		number: true ,
      }
	 
    },
    // Specify validation error messages
    messages: {
      fname: "Please enter your firstname",
	  lname: "please enetre your lastname",
	  selectfield: {
        required: "Please select  the option from the list."
      },
	   password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
	   reenterpassword: "Password do not match",
	  email: "Please enter a valid email address",
	  phonenumber:{
        required: "Please enter a valid phonenumber",
        minlength: "Your phonenumber must be at least 10 digits long",
		number:"phone number must be digits"
      }, 
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});


$(function() {
  $("form[name='companyRegistrationForm']").validate({
	  
    rules: {
      companyname: "required",
      Address: "required",
	  city: "required",
	  Country: "required",
	  Language: "required",
	  zipcode: "required",
	  website: "required",
	  email: {
      required: true,
      email: true
      },
	   Phone: {
        required: true,
        minlength: 10,
		number: true ,
      }
	  },
    // Specify validation error messages
    messages: {
      companyname: "Please enter your company name",
	  Address: "please fill the address",
	  city: "please fill the City",
	  Country: "please enetre your country",
	  Language: "please enetre the language",	  
	  email: "Please enter a valid email address",
	  Phone:{
        required: "Please enter a valid phonenumber",
        minlength: "Your phonenumber must be at least 10 digits long",
		number:"phone number must be digits"
      }, 
	  zipcode: "Please enter a valid zipcode",
	  website: "Please enter a valid website"
	  
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
	
  });
});


$(function() {
  $("form[name='myProfileDetailsForm']").validate({
	  
    rules: {
      myProfileFirstName: "required",
      myProfileLastName: "required",
	  myProfileEmail: "required",
	  myProfilePassword: "required",
	  myProfileJobTitle:"required",
	  myProfileCompanyName:"required",
	  myProfilecityNameLabel:"required",
	  myProfileState:"required",
	  radioShopOwnerYes:"required",
	  myProfileEmail: {
      required: true,
      email: true
      },
	  password:{
		required: true,
        minlength: 5
	  },
	 radioShopOwnerYes :{
		 required: $('#radioShopOwnerYes').not(':checked')
	 } 
	  },
    // Specify validation error messages
    messages: {
	  myProfileFirstName: "Please Enter First Name",
	  myProfileLastName: "Please Enter Last Name",
	  myProfileEmail:"Please Enter a Valid Email Address",
	  myProfileJobTitle: "Please Select Job Title",	 
      myProfileCompanyName:"Please Enter the Company Name",	 
      myProfilecityNameLabel:"Please Fill the City",
	  myProfileState:"Please Select the State",
	  myProfilePassword: {
        required: "Please Provide a Password",
        minlength: "Your password must be at least 5 characters long"
      },
     radioShopOwnerYes:{required:"Please Select at Least One Option"} 
	  
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
	
  });
});

$(document).ready(function() {  
$('#radioShopOwnerYes').click(function(){
    if (this.checked) {
        $('.AreYouShopOwnerDropDown').show();
		
    }
});
$('#radioShopOwnerNo').click(function(){
    if (this.checked) {
        $('.AreYouShopOwnerDropDown').hide();
		
    }
});
});



$(document).ready(function() {
 $(".registerHere").click(function(){
	  $(".companyRegistration").toggle();
 });
});



$(function() {
  $("form[name='userRegistrationForm']").validate({
	  
    rules: {
      regFirstName: "required",
	  regLastName: "required",
	  regEmail: "required",
      regJobTitle:"required",
      regCompanyName:"required",
	  regCity:"required",
	  regCompanyShop:"required",
	  regStateDropdown:"required",
	  regPassword: "required",
	  Password: "required",
	  regEmail: {
      required: true,
      email: true
      },
	  regPassword:{
		required: true,
        minlength: 5
	  },
	  },
    // Specify validation error messages
    messages: {
      regFirstName: "Please enter your first name",
	  regLastName: "Please enter your last name",
	  regEmail:"Please enter a valid email address",
	  regJobTitle: "Please select job title",	
	  regCompanyName:"Please enter the company name",
      regCity:"Please fill the City",	  
	  regCompanyShop:"Please select company/shop details",
	  regStateDropdown:"Please select the state",
	  regPassword: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
	    Password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
	
  });
});

$(function() {
  $("form[name='profileForm']").validate({
	  
    rules: {
      firstName: "required",
      lastName: "required",
	  city: "required",
	  locationState: "required",
	  company: "required",
	  experience: "required",
	  specality: "required",
	  bays: "required",
	  brakejobs: "required",
	  email: {
      required: true,
      email: true
      },
	  password:{
		required: true,
        minlength: 5
	  },
	   phonenumber: {
        required: true,
        minlength: 10,
		number: true ,
      }
	  },
    // Specify validation error messages
    messages: {
      firstName: "Please enter your first name",
	  lastName: "Please enter your last name",
	  city: "please fill the City",
	  locationState: "please enter your location",	  
	  company: "please enter your company",	  
	  experience: "please enter your experience",	  
	  specality: "please enter your specality",	 
	  bays: "please enter your bays",	  	  
	  brakejobs: "please enter your jobs",
	  email: "Please enter a valid email address",
	   password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
	  phonenumber:{
        required: "Please enter a valid phonenumber",
        minlength: "Your phonenumber must be at least 10 digits long",
		number:"phone number must be digits"
      }, 
	  
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
	
  });
});



$(document).ready(function() {
  
  $(".login").click(function(e){
      $(".loginContentPane").toggle();
       e.stopPropagation();
  });

  $(".loginContentPane").click(function(e){
      e.stopPropagation();
  });

  $(document).click(function(){
      $(".loginContentPane").hide();
  });
  
  $('.bpiOnlineinlineRadio1').click(function(){
    if (this.checked) {
        $('.inlineRadio').show();
    }
});
});

 $(document).ready(function(){
        $(function () {
            $('#datetimepicker12').datetimepicker({
                inline: true,
                sideBySide: true
            });
        });
  
  });
  
$(function() {
  $("form[name='recoveraccount']").validate({
	  
    rules: {
  
	  password: {
        required: true,
        minlength: 5
      },
	  
	 confirmpassword: {
        required: true,
        minlength: 5
      }
    },
    // Specify validation error messages
    messages: {
	   password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
	  confirmpassword: {
        required: "Please re-enter the password",
        minlength: "password do not match"
      }
	   
	
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});
 
$(function() {
  $("form[name='forgotaccount']").validate({
	  
    rules: {
  
	  email: true
    },
    // Specify validation error messages
    messages: {
	   email:{
        required: "Please provide a password"
      }
},
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});

$(function() {
  $("form[name='shareidea']").validate({
	  
    rules: {
  
	  share: {
            required:true,
           
        },
		shareexp:{
            required:true,
            
        },
		shardetail:{
            required:true,
            
        },
		shareTrick :{
            required:true,
           
        }
    },
    // Specify validation error messages
    messages: {
	   share:{
        required: "Please share your idea to get rewards"
      },
	  shareexp:{
        required: "Please share your experience to get rewards"
      },
	  shardetail:{
        required: "Please share your details to get rewards"
      },
	  shareTrick:{
        required: "Please share your tricks to get rewards"
      }
},
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});
 
$(function() {
  $("form[name='loginform']").validate({
	  
    rules: {
  
	  password: {
        required: true,
        minlength: 5
      },
	  
	 uname: {
        required: true
      }
    },
    // Specify validation error messages
    messages: {
	   password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
	  uname: {
        required: "Please enter the user name"
      }
	   
	
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});
 


 





$(window).load(function() {

  $('#easyPaginateTech').easyPaginate({
    paginateElement: 'li',
    elementsPerPage: 3,
    effect: 'climb'
  });
  });

$(window).load(function() {

  $('#easyPaginateAllbulletins').easyPaginate({
    paginateElement: 'li',
    elementsPerPage: 3,
    effect: 'climb'
  });
  });


$(document).ready(function(){
$('.eventCalendarBlock').yacal({
nearMonths: 1,
});
});





$(document).ready(function() {
  
  $(".linkToMyFavouriteDistributionSearch .myFavouriteDistributorsLink").click(function(){
	  $(".linkToMyFavouriteDistributionSearch").hide();
      $(".distributorContentpane").hide();
	  $(".myFavoriteDistributors").show();
	  $(".backTodistributionSearch").show();
	  tpDistributor.loadFavoritesDistributors();
	 
  });
   $(".backTodistributionSearch .distributorsSearchLink").click(function(){	
	   $(".backTodistributionSearch").hide();
	   $(".distributorContentpane").show();
	   $(".myFavoriteDistributors").hide();
	   $(".linkToMyFavouriteDistributionSearch").show();
	   tpDistributor.loadAllDistributors();
	 
  });
});



$(document).ready(function() {
	$( ".week.w18 .day.d1" ).addClass( "event" );
	$( ".week.w23 .day.d1" ).addClass( "event" );

});

$(window).load(function() {
	$(".event").click(function(){	
		$(".eventspane").show();
		
	});
});

/*$(document).ready(function() {
	$(".myFavorite").click(function(){	
	   	   $(".itemList").show();
	 	   $(".itemList.list").hide();
	});

  if ($('.allTips').attr('checked')) {
	  $('.itemList.list').show();
    } else {
        $('.itemList.list').hide();
    }
	$(".allTips").click(function(){	
	  	$(".itemList").hide();
		 $(".itemList.list ").show();
  });
});*/



$(document).ready(function(){
	
	$('.panel-heading').click(function(){	
		   $(this).find(".fa-caret-right").toggle();
		   $(this).find(".fa-caret-down").toggle();
	});
	 
});

$(window).load(function() {
  if ($('.allTips').attr('checked')) {
    $('.myFavoriteList').show();
  }

  if ($('.myFavorite').attr('checked')) {
    $('.favouriteTipsContentPane').show();
   } 
});





$(window).load(function() {
  if ($('.myFav').attr('checked')) {
    $('.myFavoriteList').show();
	$('.myfavbulletins').show();
  }

  if ($('.allBullet').attr('checked')) {
    $('.allBulletinsList').show();
	$('.allbulletin').show();
   } 
});


$(window).load(function() {
	$(".myFav").click(function(){	
	   	   $(".myFavoriteList").show();
	 	   $(".allBulletinsList").hide();
		     $(".myfavbulletins").show();
	 	   $(".allbulletin").hide();
	});

	$(".allBullet").click(function(){	
			 $(".myFavoriteList").hide();
		 $(".allBulletinsList").show();
		    $(".myfavbulletins").hide();
	 	   $(".allbulletin").show();

  });
});

/* for how to videos*/
$(window).load(function() {
  if ($('.myfavRadio').attr('checked')) {
    $('.myfavVideos').show();
	$('.myFavouriteVideosBlock').show();
  }

  if ($('.allVideoRadio').attr('checked')) {
    $('.allVideosblock').show();
	$('.allvideosheading').show();
   } 
});


$(window).load(function() {
	$(".myfavRadio").click(function(){	
	$('.myFavouriteVideosBlock').show();
	$('.allVideosblock').hide();
	$('.myfavVideos').show();
	$('.allvideosheading').hide()

	$(".allVideoRadio").click(function(){	
		$('.myFavouriteVideosBlock').hide();
		$('.allVideosblock').show();
		$('.allvideosheading').show();
		$('.myfavVideos').hide();
  });
});
});
/* for how to videos  ends*/

$(document).ready(function() {

$('#easyPaginate').easyPaginate({
    paginateElement: 'li',
    elementsPerPage: 3,
    effect: 'climb'
  });
 $('#easyPaginateFavourites').easyPaginate({
    paginateElement: 'li',
    elementsPerPage: 3,
    effect: 'climb'
  });
  $('.allTips').prop('checked', true);
  $('.myFavorite').prop('checked', false);
	$(".myFavorite").click(function(){	
	   	 $(".favouriteTipsContentPane").show();
	 	   $(".allTipsContentPane").hide();
       //$('.rating').starRating('unload');
      // $('.rating').starRating();  
	});

	$(".allTips").click(function(){	
	  	$(".favouriteTipsContentPane").hide();
		 $(".allTipsContentPane").show();
     //$('.rating').starRating('unload');
     //$('.rating').starRating();  
  });
});

$(document).ready(function() {
	$(".personaldetail").click(function(){	
	   $(".submission").toggle();
	});
});

$(document).ready(function(){
 // $('.rating').starRating(); 
 $(".rating").starRating({
  initialRating: 0,
  strokeColor: 'rgba( 255, 255, 0, 1 )',
  strokeWidth: 10,
  starSize: 20,
  useFullStars: true
});
});

$(window).load(function() {
  $(".easyPaginateNav a").click(function(){  
    $('.rating').starRating();
	  $('.favouriteStart').on('change',function() {
			alert('star colored');
          if( $(this).is(':checked') ) {
              $(this).closest('span').find('.fa-star').addClass('yellowIcon');
              
          }
		  else
			  {
				  $(this).siblings().removeClass('yellowIcon'); 
			  }
      });

  });
});


$(window).load(function() {
 $(".tipsTricksRow").click(function(){
	 $(".tipsTricksRow").removeClass("active");
	 $(".tipstricksContent").removeClass("open");
	 $(this).next().toggleClass("open");
 });
});

$(window).load(function() {
 $(".tipsTricksRow").click(function(){
	 //$( ".tipsTricksRow" ).removeClass( "active" );
	 $( this ).toggleClass( "active" );

 });
 

});

$(window).load(function() {

  $('#easyPaginateHowToVideos').easyPaginate({
    paginateElement: '.videos',
    elementsPerPage: 5,
    effect: 'climb'
  });
  });
  
 $(window).load(function() {

  $('#easyPaginateMyFavouriteVideos').easyPaginate({
    paginateElement: '.videos',
    elementsPerPage: 5,
    effect: 'climb'
  });
  });

$(window).load(function() {
	  
	  $('.favouriteStart').on('change',function() {
alert('star colored');
          if( $(this).is(':checked') ) {
              $(this).closest('span').find('.fa-star').addClass('yellowIcon');
              
          }
		  else
			  {
				  $(this).siblings().removeClass('yellowIcon'); 
			  }
      });
	  
	  
});

