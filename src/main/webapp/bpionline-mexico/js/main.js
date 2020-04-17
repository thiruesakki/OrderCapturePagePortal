jQuery(function($) {'use strict',

  //#main-slider
  $(function(){
    
  });

$(document).ready(function(){
 $('#myCarousel').carousel({
      interval: 8000
    });
 $('#carousel-example-generic').carousel({
      interval: 30000
    });
  $('#carousel-example-generic1').carousel({
      interval: 30000
    });
});



  // accordian
  $('.accordion-toggle').on('click', function(){
    $(this).closest('.panel-group').children().each(function(){
    $(this).find('>.panel-heading').removeClass('active');
     });

    $(this).closest('.panel-heading').toggleClass('active');
  });

    
	
  // Contact form
  var form = $('#main-contact-form');
  form.submit(function(event){
    event.preventDefault();
    var form_status = $('<div class="form_status"></div>');
    $.ajax({
      url: $(this).attr('action'),

      beforeSend: function(){
        form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
      }
    }).done(function(data){
      form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
    });
  });

  
  
  //goto top
  $('.gototop').click(function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $("body").offset().top
    }, 500);
  }); 

});

 $(".careerButtonLink").click(function(){
  $(".careermenu .list-group").toggle();
  $( this ).toggleClass( "moveMenu" );
 });

$('ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});

 $(document).ready(function(){
$( ".firstPane" ).bind({
  click: function() {
    $(".firstPane .learnMoreTxt").hide();
    $(".firstPane .bottomBlock").animate({ top: '0px' });
    $(".firstPane").delay("300").animate({ opacity: '0' });
    $(".careerRow1").addClass("zindexClass");
    $(".corporateBoxTitle").delay("300").animate({ opacity: '1' });
    $(".corporateBoxTitle .closeBut1").animate({ opacity: '1' });
    $(".closeBut1").css({ width:'32px', height:'30px', backgroundPosition: '30px 0px', cursor: 'pointer' });
    $(".firstPanelExpand").animate({top: '-182px' , opacity: '1'});
    //$(".careerright .careerRow1").animate({ height: '80px'});

    $(".firstPanelExpand").animate({ height: '350px'});
    $(".careerRow1").delay("400").animate({ height: '474px'});
    $(".careerRow1").addClass("heightforTab");
    $(".firstPanelExpand").slideDown( "slow" );
    $(".firstPane .learnMoreTxt").hide();
    //$(".firstPane .bottomBlock").css('cursor' , 'default');
    $(".firstPane .closePanaleTxt").show();

    $(".finance").delay("1000").animate({ opacity: '1'});
    $(".marcketing").delay("1000").animate({ opacity: '1'});
    $(".research").delay("1000").animate({ opacity: '1'});
    $(".sales").delay("1000").animate({ opacity: '1'});
    $(".global-sourcing").delay("1000").animate({ opacity: '1'});
    $(".global-operation").delay("1000").animate({ opacity: '1'});
    $(".human-resources").delay("1000").animate({ opacity: '1'});
    $(".information-technology").delay("1000").animate({ opacity: '1'});
    $(".project-management").delay("1000").animate({ opacity: '1'});
    $(".technical-data").delay("1000").animate({ opacity: '1'});
    $(".legal").delay("1000").animate({ opacity: '1'});
    $(".customer-service").delay("1000").animate({ opacity: '1'});
    $(".engineering").delay("1000").animate({ opacity: '1'});
    $(".inventory").delay("1000").animate({ opacity: '1'});
    $(".distribution").delay("1000").animate({ opacity: '1'});
    $(".infoBoxWhy").parent().addClass('infoTabHeight');

    $(".lifeInfoBoxTitle .closeBut").click();
    $(".studentInfoBoxTitle .closeBut").click();
    $(".benefitsInfoBoxTitle .closeBut").click();
    $(".infoBoxWhyTitle .closeBut").click();
  }
});


 $(".corporateBoxTitle .closeBut").click(function(){
    $(".firstPanelExpand").delay("400").slideUp( "slow" );
    $(".firstPanelExpand").delay("400").animate({ height: '10px'});
    $(".firstPane .bottomBlock").animate({ top: '243px' });
    $(".firstPane .learnMoreTxt").show();
    $(".firstPane .closePanaleTxt").hide();
    $(".firstPane").animate({ opacity: '1' });
    $(".corporateBoxTitle").animate({ opacity: '0' });
    $(".corporateBoxTitle .closeBut1").animate({ opacity: '0' });
    $(".careerRow1").delay("400").animate({ height: '303px'});
    $(".careerRow1").removeClass("heightforTab");
    $(".careerRow1").removeClass("zindexClass");

    $(".finance").animate({ opacity: '0'});
    $(".marcketing").animate({ opacity: '0'});
    $(".research").animate({ opacity: '0'});
    $(".sales").animate({ opacity: '0'});
    $(".global-sourcing").animate({ opacity: '0'});
    $(".global-operation").animate({ opacity: '0'});
    $(".human-resources").animate({ opacity: '0'});
    $(".information-technology").animate({ opacity: '0'});
    $(".project-management").animate({ opacity: '0'});
    $(".technical-data").animate({ opacity: '0'});
    $(".legal").animate({ opacity: '0'});
    $(".customer-service").animate({ opacity: '0'});
    $(".engineering").animate({ opacity: '0'});
    $(".inventory").animate({ opacity: '0'});
    $(".distribution").animate({ opacity: '0'});
 });
 $(".corporateBoxTitle").click(function(){
    $(".firstPanelExpand").delay("400").slideUp( "slow" );
    $(".firstPanelExpand").delay("400").animate({ height: '10px'});
    $(".firstPane .bottomBlock").animate({ top: '243px' });
    $(".firstPane .learnMoreTxt").show();
    $(".firstPane .closePanaleTxt").hide();
    $(".firstPane").animate({ opacity: '1' });
    $(".corporateBoxTitle").animate({ opacity: '0' });
    $(".corporateBoxTitle .closeBut1").animate({ opacity: '0' });
    $(".careerRow1").delay("400").animate({ height: '303px'});
    $(".careerRow1").removeClass("heightforTab");
    $(".careerRow1").removeClass("zindexClass");

    $(".finance").animate({ opacity: '0'});
    $(".marcketing").animate({ opacity: '0'});
    $(".research").animate({ opacity: '0'});
    $(".sales").animate({ opacity: '0'});
    $(".global-sourcing").animate({ opacity: '0'});
    $(".global-operation").animate({ opacity: '0'});
    $(".human-resources").animate({ opacity: '0'});
    $(".information-technology").animate({ opacity: '0'});
    $(".project-management").animate({ opacity: '0'});
    $(".technical-data").animate({ opacity: '0'});
    $(".legal").animate({ opacity: '0'});
    $(".customer-service").animate({ opacity: '0'});
    $(".engineering").animate({ opacity: '0'});
    $(".inventory").animate({ opacity: '0'});
    $(".distribution").animate({ opacity: '0'});
 });
 $(".poPupPane .closeBtn").click(function(){
  $(".poPupPane").hide("slow");
  $(".overlayDiv").hide();
 }); 

$(".finance").click(function(){
  $(".Finance").show();
  $(".overlayDiv").show();
});

$(".marcketing").click(function(){
  $(".Marcketing").show();
  $(".overlayDiv").show();
});
$(".research").click(function(){
  $(".Research").show();
  $(".overlayDiv").show();
});
$(".sales").click(function(){
  $(".Sales").show();
  $(".overlayDiv").show();
});
$(".global-sourcing").click(function(){
  $(".Global-sourcing").show();
  $(".overlayDiv").show();
});
$(".global-operation").click(function(){
  $(".Global-operation").show();
  $(".overlayDiv").show();
});
$(".human-resources").click(function(){
  $(".Human-resources").show();
  $(".overlayDiv").show();
});
$(".information-technology").click(function(){
  $(".Information-technology").show();
  $(".overlayDiv").show();
});
$(".project-management").click(function(){
  $(".Project-management").show();
  $(".overlayDiv").show();
});
$(".technical-data").click(function(){
  $(".Technical-data").show();
  $(".overlayDiv").show();
});
$(".legal").click(function(){
  $(".Legal").show();
  $(".overlayDiv").show();
});
$(".customer-service").click(function(){
  $(".Customer-service").show();
  $(".overlayDiv").show();
});
$(".engineering").click(function(){
  $(".Engineering").show();
  $(".overlayDiv").show();
});
$(".inventory").click(function(){
  $(".Inventory").show();
  $(".overlayDiv").show();
});
$(".distribution").click(function(){
  $(".Distribution").show();
  $(".overlayDiv").show();
}); 
 
});
// Javascript for Why BPI
 $(document).ready(function(){
       
        $(".fourthBlock").click(function(){
          $(".corporateBoxTitle .closeBut").click();
          $(".lifeInfoBoxTitle .closeBut").click();
          $(".studentInfoBoxTitle .closeBut").click();
          $(".infoBoxWhyTitle .closeBut").click();
          $(".benefitsInfoBoxTitle .closeBut").click();
          $(".benefitsRow").addClass("ChainaTopIeFix");
          $(".benefitsBPI").animate({ opacity: '0'});
          //$(".infoBoxWhy").css( 'cursor', 'auto' );
          $(".infoBoxWhy").css( 'display' , 'block' );
          $(".infoBoxWhy").parent().removeClass('infoTabHeight');
          $(".fourthBlock").animate({ opacity: '0'});
          $(".searchAndApply").addClass('marginT144');
          $(".fourthBlock").addClass("mexicoPanewhy");
          $(".infoBoxWhy").animate({ opacity: '1' });
          $(".infoBoxWhyTitle").animate({  opacity: '1' });
          $(".infoBoxWhyTitle .closeBut").delay("1200").animate({  opacity: '1' });
          $(".infoBoxWhyTitle .closeBut").css( 'cursor', 'pointer' );
          //$(".infoBoxWhy").delay("20000").css({border: '1px solid #7c7c7e'});

          $(".fourthBlock").parent().animate({ height: '480px'});
          $(".fourthBlock").parent().addClass("whiBpiChaina");
          $(".benefitsRow ").parent().addClass("studentChaina");
          $(".whyBPIMobile").parent().animate({ height: 'auto'});

          
          // Titles Slide in..
          $(".why1").delay("1200").animate({ left: '75', opacity: '1'});
          $(".checkbox_empty1").delay("1200").animate({ left: '49', opacity: '1'});

          $(".why2").delay("1400").animate({ left: '75', opacity: '1'});
          $(".checkbox_empty2").delay("1400").animate({ left: '49', opacity: '1'});

          $(".why3").delay("1600").animate({ left: '75', opacity: '1'});
          $(".checkbox_empty3").delay("1600").animate({ left: '49', opacity: '1'});

          $(".why4").delay("1800").animate({ left: '75', opacity: '1'});
          $(".checkbox_empty4").delay("1800").animate({ left: '49', opacity: '1'});

          $(".why5").delay("2000").animate({ left: '75', opacity: '1'});
          $(".checkbox_empty5").delay("2000").animate({ left: '49', opacity: '1'});

          $(".why6").delay("2200").animate({ left: '75', opacity: '1'});
          $(".checkbox_empty6").delay("2200").animate({ left: '49', opacity: '1'});

          // Titles Positioned..
          $(".why2").delay("1500").animate({ top: '175'});
          $(".checkbox_empty2").delay("1500").animate({ top: '181'});
          $(".why3").delay("800").animate({ top: '51', left: '595'});
          $(".checkbox_empty3").delay("800").animate({ top: '52', left: '569'});
          $(".why4").delay("200").animate({ top: '175', left: '595'});
          $(".checkbox_empty4").delay("200").animate({ top: '181', left: '569'});
          $(".why5").delay("200").animate({ top: '280'});
          $(".checkbox_empty5").delay("200").animate({ top: '282'});
          $(".why6").delay("200").animate({ top: '280', left: '595'});
          $(".checkbox_empty6").delay("200").animate({ top: '282', left: '569'});

          // Details fade in..
          $(".why1Detail").delay("3500").animate({ opacity: '1'});
          $(".why2Detail").delay("4000").animate({ opacity: '1'});
          $(".why5Detail").delay("4500").animate({ opacity: '1'});
          $(".why3Detail").delay("5000").animate({ opacity: '1'});
          $(".why4Detail").delay("5500").animate({ opacity: '1'});
          $(".why6Detail").delay("6000").animate({ opacity: '1'});
          
          // Checked icon fade in..
          $(".checkedIcon1").delay("6500").animate({ opacity: '1'});
          $(".checkedIcon2").delay("7000").animate({ opacity: '1'});
          $(".checkedIcon5").delay("7500").animate({ opacity: '1'});
          $(".checkedIcon3").delay("8000").animate({ opacity: '1'});
          $(".checkedIcon4").delay("8500").animate({ opacity: '1'});
          $(".checkedIcon6").delay("9000").animate({ opacity: '1'});

          $(".why7").delay("11000").animate({ opacity: '1'});
          $(".why7Detail").delay("11500").animate({ opacity: '1'});
          $(".searchAndApply").removeClass("lifeHeightIEFix");
          $(".infoBoxWhy").addClass("topIeFix");
          
           
          // Now whyAnim will no longer be called
         //$(".infoBoxWhy").off( "click", whyAnim );
          return false;
        });
        
        $(".infoBoxWhy .closeBut").click(function(){
          $(".why1").animate({ opacity: '0' });
          $(".why2").animate({ opacity: '0' });
          $(".why3").animate({ opacity: '0' });
          $(".why4").animate({ opacity: '0' });
          $(".why5").animate({ opacity: '0' });
          $(".why6").animate({ opacity: '0' });
          $(".why7").animate({ opacity: '0' });
          $(".checkbox_empty1").animate({ opacity: '0' });
          $(".checkbox_empty2").animate({ opacity: '0' });
          $(".checkbox_empty3").animate({ opacity: '0' });
          $(".checkbox_empty4").animate({ opacity: '0' });
          $(".checkbox_empty5").animate({ opacity: '0' });
          $(".checkbox_empty6").animate({ opacity: '0' });
          $(".searchAndApply").removeClass('marginT144');
          $(".why1Detail").animate({ opacity: '0' });
          $(".checkedIcon1").animate({ opacity: '0' });
          $(".why2Detail").animate({ opacity: '0' });
          $(".checkedIcon2").animate({ opacity: '0' });

          $(".why3Detail").animate({ opacity: '0' });
          $(".checkedIcon3").animate({ opacity: '0' });

          $(".why4Detail").animate({ opacity: '0' });
          $(".checkedIcon4").animate({ opacity: '0' });

          $(".why5Detail").animate({ opacity: '0' });
          $(".checkedIcon5").animate({ opacity: '0' });

          $(".why6Detail").animate({ opacity: '0' });
          $(".checkedIcon6").animate({ opacity: '0' });

          $(".why7Detail").animate({ opacity: '0' });

          //$(".infoBoxWhy").animate({ height: '100px', opacity: '0.5'});
          $(".closeBut").delay("300").animate({  opacity: '0' });
          //$(".closeBut").css( 'cursor', 'auto' );
          $(".infoBoxWhyTitle").animate({ opacity: '0' });
          //$(".infoBoxWhy").delay("500").animate({ width: '560px', height:'315', left: '10px' });
          $(".fourthBlock").delay("500").animate({ opacity: '1' });
          $(".benefitsBPI").delay("500").animate({ opacity: '1'});
          //$(".infoBoxWhy").animate({ opacity: '0' });
          //$(".infoBoxWhy").css( 'cursor', 'pointer' );
          //$(".infoBoxWhy").on( "click", whyAnim );
          $(".why1").animate({ top: '51', left: '-30'});
          $(".why2").animate({ top: '76', left: '-30'});
          $(".why3").animate({ top: '101', left: '-30'});
          $(".why4").animate({ top: '126', left: '-30'});
          $(".why5").animate({ top: '153', left: '-30'});
          $(".why6").animate({ top: '180', left: '-30'});
          $(".checkbox_empty1").animate({ top: '54', left: '-30'});
          $(".checkbox_empty2").animate({ top: '79', left: '-30'});
          $(".checkbox_empty3").animate({ top: '104', left: '-30'});
          $(".checkbox_empty4").animate({ top: '129', left: '-30'});
          $(".checkbox_empty5").animate({ top: '155', left: '-30'});
          $(".checkbox_empty6").animate({ top: '182', left: '-30'});
          $(".infoBoxWhy").parent().animate({ height: '315px'});
          $(".infoBoxWhy").parent().addClass('infoTabHeight');
          $(".fourthBlock").removeClass("mexicoPanewhy");
          $(".infoBoxWhy").hide("fast");
          $(".fourthBlock").parent().removeClass("whiBpiChaina");
          $(".benefitsRow ").parent().removeClass("studentChaina");
          $(".searchAndApply").addClass("lifeHeightIEFix");
          $(".infoBoxWhy").removeClass("topIeFix");
          $(".benefitsRow").removeClass("ChainaTopIeFix");

          return false;
        });

        $(".infoBoxWhyTitle").click(function(){
          $(".why1").animate({ opacity: '0' });
          $(".why2").animate({ opacity: '0' });
          $(".why3").animate({ opacity: '0' });
          $(".why4").animate({ opacity: '0' });
          $(".why5").animate({ opacity: '0' });
          $(".why6").animate({ opacity: '0' });
          $(".why7").animate({ opacity: '0' });
          $(".checkbox_empty1").animate({ opacity: '0' });
          $(".checkbox_empty2").animate({ opacity: '0' });
          $(".checkbox_empty3").animate({ opacity: '0' });
          $(".checkbox_empty4").animate({ opacity: '0' });
          $(".checkbox_empty5").animate({ opacity: '0' });
          $(".checkbox_empty6").animate({ opacity: '0' });
          $(".searchAndApply").removeClass('marginT144');
          $(".why1Detail").animate({ opacity: '0' });
          $(".checkedIcon1").animate({ opacity: '0' });
          $(".why2Detail").animate({ opacity: '0' });
          $(".checkedIcon2").animate({ opacity: '0' });

          $(".why3Detail").animate({ opacity: '0' });
          $(".checkedIcon3").animate({ opacity: '0' });

          $(".why4Detail").animate({ opacity: '0' });
          $(".checkedIcon4").animate({ opacity: '0' });

          $(".why5Detail").animate({ opacity: '0' });
          $(".checkedIcon5").animate({ opacity: '0' });

          $(".why6Detail").animate({ opacity: '0' });
          $(".checkedIcon6").animate({ opacity: '0' });

          $(".why7Detail").animate({ opacity: '0' });

          //$(".infoBoxWhy").animate({ height: '100px', opacity: '0.5'});
          $(".closeBut").delay("300").animate({  opacity: '0' });
          //$(".closeBut").css( 'cursor', 'auto' );
          $(".infoBoxWhyTitle").animate({ opacity: '0' });
          //$(".infoBoxWhy").delay("500").animate({ width: '560px', height:'315', left: '10px' });
          $(".fourthBlock").delay("500").animate({ opacity: '1' });
          $(".benefitsBPI").delay("500").animate({ opacity: '1'});
          //$(".infoBoxWhy").animate({ opacity: '0' });
          //$(".infoBoxWhy").css( 'cursor', 'pointer' );
          //$(".infoBoxWhy").on( "click", whyAnim );
          $(".why1").animate({ top: '51', left: '-30'});
          $(".why2").animate({ top: '76', left: '-30'});
          $(".why3").animate({ top: '101', left: '-30'});
          $(".why4").animate({ top: '126', left: '-30'});
          $(".why5").animate({ top: '153', left: '-30'});
          $(".why6").animate({ top: '180', left: '-30'});
          $(".checkbox_empty1").animate({ top: '54', left: '-30'});
          $(".checkbox_empty2").animate({ top: '79', left: '-30'});
          $(".checkbox_empty3").animate({ top: '104', left: '-30'});
          $(".checkbox_empty4").animate({ top: '129', left: '-30'});
          $(".checkbox_empty5").animate({ top: '155', left: '-30'});
          $(".checkbox_empty6").animate({ top: '182', left: '-30'});
          $(".infoBoxWhy").parent().animate({ height: '315px'});
          $(".infoBoxWhy").parent().addClass('infoTabHeight');
          $(".fourthBlock").removeClass("mexicoPanewhy");
          $(".infoBoxWhy").hide("fast");
          $(".fourthBlock").parent().removeClass("whiBpiChaina");
          $(".benefitsRow").parent().removeClass("studentChaina");
          $(".searchAndApply").removeClass("lifeHeightIEFix");
          $(".infoBoxWhy").addClass("topIeFix");
          $(".benefitsRow").removeClass("ChainaTopIeFix");
          return false;
        });
    }); // end document.ready
//JavaScript for lifeatbpi
$(document).ready(function(){
        // javascript: lifeatbpi box animation
        $(".lifeatBPI").click(function(){
          $(".lifeAtBPIRow").css({ display:'block'});
          $(".lifeInfoBox").css({ display: 'block' , background:'#fff' });
          $(".lifeInfoBox").css({ position: 'initial', width: '561px', height: '311px' });
          $(".lifeInfoBox").delay("200").animate({ width: '1140px', opacity: '1' });
          
          $(".lifeatBPI").parent().css({ position: 'absolute' , top:'0px' , width: '100%'});
          $(".lifeatBPI").parent().delay("100").animate({ opacity: '0.5'});

          $(".lifeAtBPIRow").css({ height: '585px'});
          $(".fourthBlock").addClass("mexicoPane");

          $(".lifeInfoBoxTitle").delay("500").animate({ opacity: '1' });
          $(".closeBut").delay("1200").animate({  opacity: '1' });
          $(".closeBut").css({ top:'0px', left: '1105px', opacity:'1' });

          $(".lifeInfoBox").animate({ height: '580px'});
          //$(".lifeatBPI").parent().css('display' , 'none' );
          $(".lifeatRow").addClass("lifeheightforTab");
          $(".infoBoxWhy").parent().addClass('infoTabHeight');
          $(".lifeInfoBox").css( 'cursor', 'default' );
          $(".funatBpi").delay("1500").animate({  opacity: '1' });
          
          $(".corporateBoxTitle .closeBut").click();
          $(".benefitsInfoBoxTitle .closeBut").click();
          $(".infoBoxWhyTitle .closeBut").click();
          $(".lifeatRow").removeClass("chainaIeFix");
          $(".searchAndApply").removeClass("lifeHeightIEFix");
          $(".lifeatRow").parent().addClass('mexSpanishIeFix');
          $(".lifeAtBPIRow").addClass("lifeOpenHeightIEFix");
          $(".lifeatRow").parent().addClass('ChainaLifeFix');
          $(".fourthBlock").addClass('ChainaFourthFix');

        });

        $(" .lifeInfoBoxTitle .closeBut").click(function(){
          $(".lifeInfoBoxTitle").animate({  opacity: '0' });
          $(".funatBpi").animate({ opacity: '0' });
          $(".lifeInfoBox").hide("slow");

          $(".lifeatBPI").parent().css( 'display' , 'block' );
          $(".lifeatBPI").parent().css({width: 'initial', position: 'initial', opacity: '1', height:'311px'});
          $(".lifeInfoBox").css({ position: 'absolute' , top:'0px', opacity: '0.5', width: '561px', height: '311px'});

          $(".lifeAtBPIRow").delay("300").animate({  height: '10px' });
          $(".lifeatRow").removeClass("lifeheightforTab");
          $(".fourthBlock").removeClass("mexicoPane");
          $(".lifeatRow").addClass("chainaIeFix");
          $(".searchAndApply").addClass("lifeHeightIEFix");
          $(".lifeAtBPIRow").removeClass("lifeOpenHeightIEFix");
          $(".lifeatRow").parent().removeClass('ChainaLifeFix');
          $(".fourthBlock").removeClass('ChainaFourthFix');

          return false;
        });
     
        $(".lifeInfoBoxTitle").click(function(){
          $(".lifeInfoBoxTitle").animate({  opacity: '0' });
          $(".funatBpi").animate({ opacity: '0' });
          $(".lifeInfoBox").hide("slow");

          $(".lifeatBPI").parent().css( 'display' , 'block' );
          $(".lifeatBPI").parent().css({width: 'initial', position: 'initial', opacity: '1', height:'311px'});
          $(".lifeInfoBox").css({ position: 'absolute' , top:'0px', opacity: '0.5', width: '561px', height: '311px'});

          $(".lifeAtBPIRow").delay("300").animate({  height: '10px' });
          $(".lifeatRow").removeClass("lifeheightforTab");
          $(".fourthBlock").removeClass("mexicoPane");
          $(".lifeatRow").addClass("chainaIeFix");
          $(".searchAndApply").addClass("lifeHeightIEFix");
          $(".lifeAtBPIRow").removeClass("lifeOpenHeightIEFix");
          $(".lifeatRow").parent().removeClass('ChainaLifeFix');
          $(".fourthBlock").removeClass('ChainaFourthFix');

          return false;
        });

    }); // end document.ready

//JavaScript for Students Section
$(document).ready(function(){
        // javascript: students box animation
        $(".student").click(function(){
          $(".studentInfoBox").css( { display: 'block' });
          $(".student").parent().css({ position: 'absolute' , top:'0px' , width: '100%'});
          $(".student").parent().delay("100").animate({ opacity: '0'});
          $(".lifeatBPI").animate({ opacity: '0' });
          $(".student").delay("100").animate({ opacity: '0' });

          $(".studentInfoBox").css({ position: 'absolute', top: '0'});
          $(".studentInfoBoxTitle").delay("200").animate({ opacity: '1' });
          
          $(".studentInfoBox").delay("200").animate({ width: '1140px', opacity: '1' });
          $(".studentInfoBox").animate({ height: '474px'});
          $(".studentRow").parent().animate({ height: '474px'});
          $(".closeBut").delay("1200").animate({  opacity: '1' });
          $(".closeBut").css({ width:'32px', height:'30px', backgroundPosition: '30px 0px', cursor: 'pointer' });
          $(".studentInfoBox").css( 'cursor', 'default' );
          $(".internship").delay("800").animate({  opacity: '1' });
          $(".studentRow").parent().removeClass('studentTabHeight');
          $(".corporateBoxTitle .closeBut").click();
          $(".benefitsInfoBoxTitle .closeBut").click();
          $(".infoBoxWhyTitle .closeBut").click();

        });

        $(".studentInfoBoxTitle .closeBut").click(function(){
          $(".closeBut").animate({  opacity: '0' });
          $(".student").parent().css( 'display' , 'block' );
          $(".student").parent().css({width: 'initial', position: 'initial', opacity: '1'});
          $(".lifeatBPI").delay("100").animate({ opacity: '1' });
          $(".student").delay("100").animate({ opacity: '1' });
          $(".studentInfoBox").css({ position: 'absolute' , top:'0px', opacity: '0.5', width: '561px', height: '311px'});
          $(".studentInfoBoxTitle").animate({  opacity: '0' });
          $(".internship").animate({ opacity: '0' });
          $(".studentRow").parent().animate({ height: '315px'});
          $(".studentRow").parent().addClass('studentTabHeight');
          $(".studentInfoBox").hide("slow");

          return false;
        });


        $(".studentInfoBoxTitle").click(function(){
          $(".closeBut").animate({  opacity: '0' });
          $(".student").parent().css( 'display' , 'block' );
          $(".student").parent().css({width: 'initial', position: 'initial', opacity: '1'});
          $(".lifeatBPI").delay("100").animate({ opacity: '1' });
          $(".student").delay("100").animate({ opacity: '1' });
          $(".studentInfoBox").css({ position: 'absolute' , top:'0px', opacity: '0.5', width: '561px', height: '311px'});
          $(".studentInfoBoxTitle").animate({  opacity: '0' });
          $(".internship").animate({ opacity: '0' });
          $(".studentRow").parent().animate({ height: '315px'});
          $(".studentRow").parent().addClass('studentTabHeight');
          $(".studentInfoBox").hide("slow");

          return false;
        });

    }); // end document.readyâ€‹

$(document).ready(function(){
        // javascript: lifeatbpi box animation
        $(".benefitsBPI").click(function(){           
          $(".searchAndApply").addClass('chainabenefitshide');
          $(".benefitsInfoBox").css( { display: 'block' , background:'#fff' } );
          $(".benefits").parent().css({ position: 'absolute' , top:'301px' , width: '100%'});
          $(".benefits").parent().delay("100").animate({ opacity: '0'});
          $(".benefitsInfoBox").css({ position: 'absolute', top: '0',  width: '561px', height: '311px' });          
          $(".benefitsInfoBox").delay("200").animate({ width: '1140px', opacity: '1' });
          $(".benefitsInfoBoxTitle").delay("500").animate({ opacity: '1' });
          $(".benefitsInfoBox").animate({ height: '472px'});
          $(".benefitsBPI").parent().animate({ height: '438px'});          

          //$(".lifeatBPI").parent().css('display' , 'none' );
          $(".one").delay("1000").animate({ opacity: '1', width: '982px' });
          $(".closeBut").delay("1200").animate({  opacity: '1' });
          $(".closeBut").css({ width:'32px', height:'30px', backgroundPosition: '30px 0px', cursor: 'pointer' });
          $(".benefitsInfoBox").css( 'cursor', 'default' );
          $(".benefitsBpi").delay("1500").animate({  opacity: '1' });
          $(".benefitsRow").removeClass('benefitsTabHeight');
          $(".corporateBoxTitle .closeBut").click();
          $(".lifeInfoBoxTitle .closeBut").click();
          $(".studentInfoBoxTitle .closeBut").click(); 
        });

        $(".benefitsInfoBoxTitle .closeBut").click(function(){
          $(".closeBut").animate({  opacity: '0' });
          $(".benefits").parent().css( 'display' , 'block' );
          $(".benefits").parent().css({width: 'initial', position: 'initial', opacity: '1'});
          $(".benefitsInfoBox").css({ position: 'absolute' , top:'0px', opacity: '0.5', width: '561px', height: '311px'});
          $(".benefitsInfoBoxTitle").animate({  opacity: '0' });
          $(".benefitsBPI").parent().animate({ height: '314px'});
          $(".benefitsBpi").animate({ opacity: '0' });
          $(".benefitsInfoBox").hide("slow");
          $(".benefitsRow").addClass('benefitsTabHeight');
          $(".searchAndApply").removeClass('chainabenefitshide');
           return false;
        });

         $(".benefitsInfoBoxTitle").click(function(){
          $(".closeBut").animate({  opacity: '0' });
          $(".benefits").parent().css( 'display' , 'block' );
          $(".benefits").parent().css({width: 'initial', position: 'initial', opacity: '1'});
          $(".benefitsInfoBox").css({ position: 'absolute' , top:'0px', opacity: '0.5', width: '561px', height: '311px'});
          $(".benefitsInfoBoxTitle").animate({  opacity: '0' });
          $(".benefitsBPI").parent().animate({ height: '314px'});
          $(".benefitsBpi").animate({ opacity: '0' });
          $(".benefitsInfoBox").hide("slow");
          $(".benefitsRow").addClass('benefitsTabHeight');
          $(".searchAndApply").removeClass('chainabenefitshide');
           return false;
        });

    }); // end document.ready

$(document).ready(function(){

  $(function(){

      if ($('#socialIcon').hasClass("social-share")) {
          $('.footer-2 .social-share').hide();
       }  
      });

      $('.nav li').click(function(){
        $('nav li').removeClass("active");
        $(this).addClass("active");
      });

  });

$(document).ready(function(){
  $(".corporateCareerMobile").click(function(){
    $(".corporateCareerMobileExpand").toggle();
    $(".lifeAtBpiMobileExpand").hide();
    $(".studentExpandMobile").hide();
    $(".benefitsExpandMobile").hide();
    $(".whyBPIMobileExpand").hide();
    $(".searchText").removeClass('active');
  });
   $(".lifeAtBpiMobile").click(function(){
    $(".corporateCareerMobileExpand").hide();
    $(".lifeAtBpiMobileExpand").toggle();
    $(".studentExpandMobile").hide();
    $(".benefitsExpandMobile").hide();
    $(".whyBPIMobileExpand").hide();
    $(".searchText").removeClass('active');
  });
  $(".studentMobile").click(function(){
    $(".corporateCareerMobileExpand").hide();
    $(".lifeAtBpiMobileExpand").hide();
    $(".studentExpandMobile").toggle();
    $(".benefitsExpandMobile").hide();
    $(".whyBPIMobileExpand").hide();
    $(".searchText").removeClass('active');
  });
  $(".benefitsMobile").click(function(){
    $(".corporateCareerMobileExpand").hide();
    $(".lifeAtBpiMobileExpand").hide();
    $(".studentExpandMobile").hide();
    $(".benefitsExpandMobile").toggle();
    $(".whyBPIMobileExpand").hide();
    $(".searchText").removeClass('active');
  });
  $(".whyBPIMobile").click(function(){
    $(".corporateCareerMobileExpand").hide();
    $(".lifeAtBpiMobileExpand").hide();
    $(".studentExpandMobile").hide();
    $(".benefitsExpandMobile").hide();
    $(".whyBPIMobileExpand").toggle();
    $(".searchText").removeClass('active');
  });
});

$(document).ready(function(){
if ( screen.width > 769 ) { 
  $('.nav>li>a').click(function() { var location = $(this).attr('href'); window.location.href = location; return false; });
 }
});


$(window).load(function() {
//$(document).ready(function(){
   if ($('body').hasClass('countryUS')) {
      //$('#location1 option:nth(0)').prop("selected", "selected");
      //$('#location1Mobile option:nth(0)').prop("selected", "selected");
      $( "#idFrench" ).remove();
      $( "#idSimplifiedChinese" ).remove();
      $( "#idTraditionalChinese" ).remove();
       
   }
   else if ($('body').hasClass('countryCanada')) {
       //$('#location1 option:nth(0)').prop("selected", "selected");
       //$('#location1Mobile option:nth(0)').prop("selected", "selected");
       $( "#idSpanish" ).remove();
      $( "#idSimplifiedChinese" ).remove();
      $( "#idTraditionalChinese" ).remove();
   }
   else if ($('body').hasClass('countryMexico')) {
       //$('#location1 option:nth(1)').prop("selected", "selected");
       //$('#location1Mobile option:nth(1)').prop("selected", "selected");
        $( "#idFrench" ).remove();
        $( "#idSimplifiedChinese" ).remove();
        $( "#idTraditionalChinese" ).remove();
   }
   else if ($('body').hasClass('countryAustralia')) {
       //$('#location1 option:nth(0)').prop("selected", "selected");
       //$('#location1Mobile option:nth(0)').prop("selected", "selected");
       $( "#idSpanish" ).remove();
       $( "#idFrench" ).remove();
        $( "#idSimplifiedChinese" ).remove();
        $( "#idTraditionalChinese" ).remove();
   }
   else if ($('body').hasClass('countryChina')) {
       //$('#location1 option:nth(3)').prop("selected", "selected");
       //$('#location1Mobile option:nth(3)').prop("selected", "selected");
       $( "#idSpanish" ).remove();
       $( "#idFrench" ).remove();
   }
   else if ($('body').hasClass('countryLatinAmerica')) {
       //$('#location1 option:nth(1)').prop("selected", "selected");
       //$('#location1Mobile option:nth(1)').prop("selected", "selected");
       $( "#idFrench" ).remove();
        $( "#idSimplifiedChinese" ).remove();
        $( "#idTraditionalChinese" ).remove();
   }
   else if ($('body').hasClass('countryEurope')) {
       //$('#location1 option:nth(0)').prop("selected", "selected");
       //$('#location1Mobile option:nth(0)').prop("selected", "selected");
        $( "#idSimplifiedChinese" ).remove();
        $( "#idTraditionalChinese" ).remove();
   }
   else if ($('body').hasClass('countryMiddleEast')) {
       //$('#location1 option:nth(0)').prop("selected", "selected");
       //$('#location1Mobile option:nth(0)').prop("selected", "selected");
       $( "#idSpanish" ).remove();
       $( "#idFrench" ).remove();
        $( "#idSimplifiedChinese" ).remove();
        $( "#idTraditionalChinese" ).remove();
   }
   else if ($('body').hasClass('countryAsiaPacific')) {
       //$('#location1 option:nth(0)').prop("selected", "selected");
       //$('#location1Mobile option:nth(0)').prop("selected", "selected");
       $( "#idSpanish" ).remove();
       $( "#idFrench" ).remove();
        $( "#idSimplifiedChinese" ).remove();
        $( "#idTraditionalChinese" ).remove();
   }
  // else {
   //    $("body").addClass('countryUS');
   //}
});

 $(document).ready(function(){ 
 $(".navbar-header").click(function(){
    $(".navbar-collapse").toggle();
    $(".mobilemenu1").toggleClass('active');
    $(".mobilesearchBlock .social").removeClass('active');
    $(".navbar-collapse").show();
    $(".mobileMenu2").removeClass('active');
  });
});

$(document).ready(function(){
 $(".mobileMenu2 a").click(function(){
    $(".mobilesearchBlock .social").toggleClass('active');
    $(".mobileMenu2").toggleClass('active');
    $(".mobilemenu1").removeClass('active');
    $(".navbar-collapse").removeClass('in');
  });
});

$(document).ready(function(){
 $(".mobileMenu4 select").click(function(){
   $(".navbar-collapse").removeClass('in');
    $(".mobilemenu1").removeClass('active');
    $(".mobilesearchBlock .social").removeClass('active');
    $(".mobileMenu2").removeClass('active');
  });
});

$(document).ready(function(){
 $(".mobileMenu5 select").click(function(){
    $(".navbar-collapse").removeClass('in');
    $(".mobilemenu1").removeClass('active');
    $(".mobilesearchBlock .social").removeClass('active');
    $(".mobileMenu2").removeClass('active');
  });
});

$(document).ready(function(){
 $(".searchAndApply").click(function(){
    $(".searchTextBg").delay("50").animate({ opacity: '1'});
    $(".searchText").delay("100").animate({ opacity: '1'});
    $(".learnMoreTxt").delay("100").animate({ opacity: '1'});
  });
  $(".searchAndApplyMobile").click(function(){ 
    $(".searchText").toggleClass('active');
    $(".corporateCareerMobileExpand").hide();
    $(".lifeAtBpiMobileExpand").hide();
    $(".studentExpandMobile").hide();
    $(".benefitsExpandMobile").hide();
    $(".whyBPIMobileExpand").hide();
  });
});

$(document).ready(function(){
  $(".locationPoint").click(function(){
    $('.AdressPopup').hide();
    $(this).children('.AdressPopup').toggle();
  });
  $(".worldMapImg").click(function(){
    $('.AdressPopup').hide();
  });
});

$(document).ready(function(){
  $('#location1 option').each(function() {
    var text = $(this).text();
    $(this).text(text.replace('Spanish (Mexico)', 'Spanish'));
  }); 
});
 
 $(document).ready(function(){
         $(function () {
                $('#datetimepicker1').datetimepicker();
            });
  
  }); 