	$(function(){
		//$('.dropdown-toggle').dropdown()
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
 
/*$(function()
  {
    $('.scroll-pane').jScrollPane();
  });
$(function()
  {
    $('.scroll-pane').jScrollPane({
      autoReinitialise: true
    });
<<<<<<< HEAD
  });
  
  
   // accordian
   $(document).ready(function(){
  $('.accordion-toggle').on('click', function(){
    $(this).closest('.panel-group').children().each(function(){
    $(this).find('>.panel-heading').removeClass('active');
     });

    $(this).closest('.panel-heading').toggleClass('active');
  });
});
=======
  });*/
  
  /* added the below js query to get the calendar*/

 /*$(document).ready(function(){
        $(function () {
            $('#datetimepicker12').datetimepicker({
                inline: true,
                sideBySide: true
            });
        });
  });
*/
  $(document).ready(function(){
    $('.accordion-toggle').on('click', function(){
        $(this).closest('.panel-group').children().each(function(){
            $(this).find('>.panel-heading').removeClass('active');
        });
        $(this).closest('.panel-heading').toggleClass('active');
    });
});

