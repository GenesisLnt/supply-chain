import '../imports/supplier/supplier.js';
import '../imports/insurance/insurance.js';
import '../imports/wholeseller/wholeseller.js';

Router.route('/supplier', function(){
this.render('supplier');
});

Router.route('/wholeseller', function(){
   this.render('wholeseller');
});

Router.route('/insurance', function(){
   this.render('insurance');
});



/*Doucment resize Function*/
$(window).resize(function () {
  fixedFooter();
})
/*Docuemnt load function*/
$(window).on('load',function () {
  fixedFooter()
  
  setTimeout(function(){ $('.loader').fadeOut(); }, 2000);
})
/*Ready Funtion*/
$(function () {
  fixedFooter()
  $('.input-type-select span').click(function () {
    $(this).parents('.input-type-select').find('select').trigger('click');
  })
  /*Back to top Function start*/
  $('body').append('<div class="scrollTop"><a href="javascript:void(0)"></a></div>');
//  $('body').append('<div id="empDtlError" class="overlay-box"><div class="seisson-message error"><span></span> Overlay id is not defined </div></div>');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scrollTop').fadeIn();
    } else {
      $('.scrollTop').fadeOut();
    }
  });
  $(document).on('click', '.scrollTop a', function () {
    $('body,html').animate({scrollTop: 0}, 800);
  });
  /*Back to top Function End*/

  /*Header footer loading*/
  /*accordion start*/
  $('.accordion dl dt').click(function () {
    var trigger = $(this);
    var target = trigger.next('dd');
    if (target.css('display') == 'none')
    {
      $('.accordion dl').removeClass('active')
      $('.accordion dl dd').slideUp();
      target.slideDown();
      trigger.parents('dl').addClass('active');
    }
    else
    {
      $('.accordion dl').removeClass('active')
      $('.accordion dl dd').slideUp();
    }
  });
  /*accordion start*/

  /*Animate label form*/
    $('.animate-label .input-group').on('click',function(){
     if ($(this).find('select').length > 0) {
        // $(this).find('label').addClass('active');
         
        // var id = $(this).find('select').attr('id');
        // console.log(id);
          
         
        }  else {
                $(this).find('input').focus();
                $(this).find('label').addClass('active');
          
        }     
        if ($(this).find('.custom-select-options,.custom-selct-bg').length > 0) {
        $(this).find('.custom-select-options,.custom-selct-bg').fadeIn();
    }
       
  });
  $('.animate-label .input-group input,.animate-label .input-group textarea').blur(function(){
    if (this.value.length > 0) {
      return false;
    }
    else
    {
      $(this).prev('label').removeClass('active');
    }
    });
  
    $('.input-group').on('focus', 'input, select, textarea', function () {
        $(this).prev('label').addClass('active');
    });
  
  $('.input-group textarea, .input-group input,.input-group select').each(function () {
        if (this.value.length > 0) {
            var div = $(this).prev('label').addClass('active');
        }
    });
    $('.input-group').click(function(){
      $(this).find('input').focus();
      $(this).find('label').addClass('active');
    });
  /*Animate label form*/
    $('#supplier-create').click(function(){

      var StatusS=$('.showing-running').css('display');
      if(StatusS=='none')
      {
        $('.showing-running').fadeIn();
        setTimeout(function(){
          $('.showing-running').fadeOut('fadeOut');
          $('.showing-running .outImage').addClass('zoomOut');
          setTimeout(function(){

           $('.moving-truck').addClass('move-element');
          }, 1000);
          // $('body,html').animate({scrollTop: 1000}, 800);
        }, 3000);
        
        
      }
      else
      {

      }
      $('.show-shipment').show();
    });

    $('.filepath').on('change',function ()
        {
            var filePath = $(this).val().replace(/C:\\fakepath\\/i, '');
           $(this).next('span').html(filePath);
        });
    /*jQuery tabs */
  /*script for append usefull element*/
  $('.tabNav li').each(function(){
    /*$(this).css({
      'width' : (100 / ( $('li:last-child').index('li') + 1 ) ) +  '%'
    })*/
    var tabContent = $(this).html();
    var relation = $(this).find('a').attr('rel')
    var resultCnt =  $(this).parents('.tabNav').next('.tabResult');
    resultCnt.children('div#'+relation).prepend('<div class="mobile-menu">'+ tabContent +'</div>')
  })
  
  /*script for desktop navigation */
  $('.tabNav li a').click(function(){
    var relation = $(this).attr('rel')
    var tabNavigation = $(this).parents('.tabNav')
    var resultCnt =  $(this).parents('.tabNav').next('.tabResult');
    
    tabNavigation.children().find('a').removeClass('active');
    tabNavigation.children().find('li').removeClass('activeli')
    $(this).addClass('active');
    $(this).parents('li').addClass('activeli');
    
    if(resultCnt.children('div#'+relation).css('display') == 'none')
    {
      resultCnt.children('div').slideUp();
      resultCnt.children('div#'+relation).slideDown();
    }
    else
    {
      //resultCnt.children('div#'+relation).slideUp();
    }
  })
/*jQuery tabs end */

$(document).on('click', '.select-contact h3', function () {
    var sudDopStatus=$(this).next('.contact-dropdown').css('display');
  if(sudDopStatus == 'none')
  {
    $('.select-contact h3').next('.contact-dropdown').slideUp();
    $(this).next('.contact-dropdown').slideDown();
  }
  else
  {
    $(this).next('.contact-dropdown').slideUp();
  }
  });
  
  $(document).on('click', '.contact-dropdown li', function () {
    var sudDophtml=$(this).children('a').html();
   $(this).parents('.contact-dropdown').prev('h3').html(sudDophtml);
  $(this).parents('.contact-dropdown').slideUp();
  });

  $(document).click(function(e) {
        if (!$(e.target).is('.select-contact, .select-contact *')) {
            $(".contact-dropdown").slideUp();
        }
    });

});

function fixedFooter()
{
  $('body').css('min-height', $(window).height());
}


/*Overlay function*/
var animationIn, target, animationOut;
function overlayBox(popupID)
{
  target = $('#' + popupID)
  animationIn = target.attr('data-animation-in');
  animationOut = target.attr('data-animation-out');
  if (typeof (animationIn) == 'undefined' || animationIn === '(an empty string)' || animationIn === null || animationIn === '')
  {    
    animationIn = 'zoomIn';
  }
  if (typeof (animationOut) == 'undefined' || animationOut === '(an empty string)' || animationOut === null || animationOut === '')
  {
    animationOut = 'zoomOut';
  }
  $('body').append('<div class="overlay-bg"></div>')
  target.find('.overlay-header').append('<div class="closeBtn">X</div>');
  target.css('visibility', 'visible').find('.overlay-box').addClass('animated').addClass(animationIn);
  $(document).on('click', '.closeBtn', function () {
    $('.overlay').find('.overlay-box').removeClass('animated').removeClass(animationIn).addClass('animated ' + animationOut);
    $('body .overlay-bg').fadeOut(1000, function () {
      $(this).remove();
      $('.overlay').css('visibility', 'hidden').find('.overlay-box').removeClass('animated').removeClass(animationIn).removeClass(animationOut);
    });
  });
}

/*Overlay function end*/
