$(function(){

    /* -------------------
    * Body Movin Animation
    * -------------------- */
    $('.bodymovin-animation').each(function(elem){

        var dirPath = '/animation/'+$(this).attr('base-dir');
        var jsonPath = dirPath+'/'+$(this).attr('base-file');
        var elemID = $(this).attr('id')

        var animation = bodymovin.loadAnimation({
            container: document.getElementById(elemID),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: jsonPath
        });

    });

    // var animation = bodymovin.loadAnimation({
    //     container: document.getElementById('anim--what-is-harbor'),
    //     renderer: 'svg',
    //     loop: true,
    //     autoplay: true,
    //     path: '/animation/what-is-harbor/what-is-harbor.json'
    // })

    $(".owl-carousel").owlCarousel({
        loop:false,
        margin:10,
        merge:true,
        navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                // autoHeight: true,
                autoWidth: true,
                nav:true
            },
            481:{
                items:3,
                nav:false,
                autoWidth: true,
            },
            679:{
                items:3,
                nav:false,
                autoWidth: true,
            },
            1024:{
                items:5,
                nav:true,
                loop:false,
                autoWidth: true,
            }
        }
    });

    handleMobileCarousel("#carousel-community-users");
    handleMobileCarousel("#carousel-community-partners");

    function handleMobileCarousel( $handle ){

        $triggerWidth = 768;
        $carousel = $( $handle );

        // $( window ).resize(function() {
        //     if( $(window).width() > $triggerWidth ) {
        //         $carousel.trigger('destroy.owl.carousel');
        //     }
        //     else{
        //         $carousel.owlCarousel({
        //             loop:false,
        //             margin:10,
        //             merge:true,
        //             navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
        //             responsiveClass:true,
        //             responsive:{
        //                 0:{
        //                     items:1,
        //                     // autoHeight: true,
        //                     autoWidth: true,
        //                     nav:true
        //                 },
        //                 481:{
        //                     items:3,
        //                     nav:false,
        //                     autoWidth: true,
        //                 },
        //                 679:{
        //                     items:3,
        //                     nav:false,
        //                     autoWidth: true,
        //                 },
        //                 1024:{
        //                     items:5,
        //                     nav:true,
        //                     loop:false,
        //                     autoWidth: true,
        //                 }
        //             }
        //         });
        //     }
        // });

        if( $(window).width() > $triggerWidth ) {
            $carousel.trigger('destroy.owl.carousel');
        }

    }


    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });

    // handleHeroSize();
    // $( window ).resize(function() {
    //     handleHeroSize();
    // });
    function handleHeroSize(){

        //handle hero bottom margin
        $bodyHeight = $('.hero .hero-content').height();
        $('.hero-body').css('margin-bottom','calc('+$bodyHeight+'px + 0px)');

        //Handle Width

    }

  // The following code is based off a toggle menu by @Bradcomp
  (function() {
    var burger = document.querySelector('.navbar-toggle');
    var menu = document.querySelector('.navbar-menu');
    burger.addEventListener('click', function() {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  })();

  //Left hamburger
  $(".hamburger-btn, #panel-close").on("click", function(i) {
    $('.menu-toggle .icon-box-toggle').toggleClass('active');
  });

  //function to add a data attribute management support
  $( "*" ).each(function() {
    //Background images
    var attr = $(this).attr('data-background-img');

    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).css('background', 'url('+attr+')');
    }
  });

  //reveal elements on scroll so animations trigger the right way
  var $window           = $(window),
      win_height_padded = $window.height() * 1.1,
      isTouch           = Modernizr.touch;

  $window.on('scroll', revealOnScroll);

  function revealOnScroll() {
    var scrolled = $window.scrollTop();
    $(".revealOnScroll:not(.animated)").each(function () {
      var $this     = $(this),
          offsetTop = $this.offset().top;

      if (scrolled + win_height_padded > offsetTop) {
        if ($this.data('timeout')) {
          window.setTimeout(function(){
            $this.addClass('animated ' + $this.data('animation'));
          }, parseInt($this.data('timeout'),10));
        } else {
          $this.addClass('animated ' + $this.data('animation'));
        }
      }
    });
  }

  // Back to Top button behaviour
  var pxShow = 600;
  var scrollSpeed = 500;
  $(window).scroll(function() {
    if ($(window).scrollTop() >= pxShow) {
      $("#backtotop").addClass('visible');
    } else {
      $("#backtotop").removeClass('visible');
    }
  });

  $('#backtotop a').on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, scrollSpeed);
    return false;
  });

  //Preloader
  $(window).on('load', function() { // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({'overflow':'visible'});
  })

  //Left Sidebar init and ps-scrollbar init
  if ($('#panel-trigger').length) {
    // $('#panel-trigger, #panel-close').panelslider({
    //   clickClose: false,
    // });
      $('#panel-trigger').click(function(){
          $('body').toggleClass('menu-is-open');
          $('nav.main-menu-mobile').toggleClass('is-open');
      })
  }
    $('#panel-close').click(function(){
        $('body').toggleClass('menu-is-open');
        $('nav.main-menu-mobile').toggleClass('is-open');
    })

  //Active sidebar links
  $(".side-menu-item").click(function() {
      $(".side-menu-item.is-active").removeClass('is-active');
      $(this).addClass('is-active');
      $(this).next('ul').toggle( "slide", function() {
    });
  });

  //Active sidebar sublinks
  $(".side-menu-subitem").click(function() {
    $(".side-menu-subitem.is-subactive").removeClass('is-subactive');
    $(this).addClass('is-subactive');
  });

  //expandable menu caret animation
  $('a.is-expandable').click(function(){
    $(this).toggleClass('expanded');
    $(this).children('i.end-icon').toggleClass('caret-rotate');
  })

  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
          location.hostname == this.hostname) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - $('.navbar-sticky').height()
            }, 550, function() {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                } else {
                    $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                };
            });
          }
      }
    });
})
