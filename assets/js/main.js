/*
	Escape Velocity by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				alignment: 'center',
				detach: false
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');
	});

})(jQuery);

/*
Document Functions
 */
 $(document).ready(function() {

 })
//Scroll Animation
var $root = $('html, body');
	$('a[href*=#]').click(function() {
		$root.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			$root.stop();
			});

		var time = 1600;
		if (event.target.id == "to_intro") {
			time = 1300;
		}

		var href = $.attr(this, 'href');
			 $root.animate({
				 scrollTop: $(href).offset().top
			   }, time, function () {
		     window.location.hash = href;
		   });
		return false;
	});

//FLoating navbar
//Loading Screen
window.onload = function() {
	var body = document.getElementById('body');
	body.className +=' loaded';
};

// ===== Scroll to Top ====
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});


(function($){
    $.fn.extend({
        rotaterator: function(options) {

            var defaults = {
                fadeSpeed: 500,
                pauseSpeed: 300,
				child:null
            };

            var options = $.extend(defaults, options);

            return this.each(function() {
                  var o =options;
                  var obj = $(this);
                  var items = $(obj.children(), obj);
				  items.each(function() {$(this).hide();})
				  if(!o.child){var next = $(obj).children(':first');
				  }else{var next = o.child;
				  }
				  $(next).fadeIn(o.fadeSpeed, function() {
						$(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
							var next = $(this).next();
							if (next.length == 0){
									next = $(obj).children(':first');
							}
							$(obj).rotaterator({child : next, fadeSpeed : o.fadeSpeed, pauseSpeed : o.pauseSpeed});
						})
					});
            });
        }
    });
})(jQuery);

 $(document).ready(function() {
        $('#rotate').rotaterator({fadeSpeed:500, pauseSpeed:300});
 });



 // jQuery for page scrolling feature - requires jQuery Easing plugin
 $(function() {
     $('a.page-scroll').bind('click', function(event) {
         var $anchor = $(this);
         $('html, body').stop().animate({
             scrollTop: $($anchor.attr('href')).offset().top
         }, 1500, 'easeInOutExpo');
         event.preventDefault();
     });
 });



 $(document).ready(function(){
     //typing effect
     $(function(){
         $(".subheading").typed({
             strings: ["Programmer.^1050 Student.^1050 Researcher."],
             typeSpeed: 15,
             startDelay: 400
         });
     });
 });
