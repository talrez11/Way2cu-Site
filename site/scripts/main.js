/**
 * Main JavaScript
 * Way2cu-Site
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors: Tal Reznic
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {

	Caracal.lightbox = new LightBox('a.image.direct', false, false, true);

	//Scroll Function
	$('a[href*=#]').bind('click', function(e) {
	e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump

	var target = $(this).attr("href"); //Get the target
	function elementsPosition(){
		 $('div.wrap.whitebg div.inner_wrap > span').removeClass('animation');
		 $('div.wrap.whitebg div.inner_wrap > span').css('background-position','0px 0px');
		 $('header span').css('position','relative');
	     $('header span').css('top','0px');
	     $('header h1,header p').css('display','block');
		 $('header a').css('display','inline-block');
		 $('header div.inner_wrap > a:nth-of-type(3)').css('display','block');

	}
	if(target == "#about") {
		$('div.wrap.whitebg div.inner_wrap > span').css('background-position', '0px -250px');
		$('div.wrap.whitebg div.inner_wrap > span').addClass('animation');
		$('header span').css('position','fixed');
		$('header span').css('z-index','1');
		$('header span').css('top','82px');
		$('header span').css('left','50%');
		$('header span').css('margin-left','-108px');
		$('header h1,header p').css('display','none');
		$('header a').css('display','none');
		$('html, body').stop().animate({ scrollTop: $(target).offset().top -82 }, 1500, function() {

	     // location.hash = target;  //attach the hash (#jumptarget) to the pageurl
		  setTimeout(elementsPosition,500);
	});

		return false;

	}

	// perform animated scrolling by getting top-position of target-element and set it as scroll target
	$('html, body').stop().animate({ scrollTop: $(target).offset().top  }, 800, function() {
	     location.hash = target;  //attach the hash (#jumptarget) to the pageurl
	});

	return false;
   });

	if ($('div.gallery_container a').length > 0) {
		clientGallery = new Caracal.Gallery.Slider();
		clientGallery
		.images.set_container('div.gallery_container')
		.images.add('div.gallery_container a.image')
		.controls.set_auto(3000)
		clientGallery.images.set_center(true)
		clientGallery.images.set_step_size(1)
		clientGallery.images.set_spacing(20)
		clientGallery.images.set_visible_count(5)
		.controls.attach_next($('div#clients.wrap a.arrow.next'))
		.controls.attach_previous($('div#clients.wrap a.arrow.previous'));
	};



	if ($('div.all_gallery a').length > 0) {
		galleryPortfolio = new Caracal.Gallery.Slider();
		galleryPortfolio
		.images.set_container('div.all_gallery')
		.images.add('div.all_gallery a.image')
		.controls.set_auto(3000)
		galleryPortfolio.images.set_step_size(3)
		galleryPortfolio.images.set_center(true)
		galleryPortfolio.images.set_spacing(20)
		galleryPortfolio.images.set_visible_count(3)
		.controls.attach_next($('div.gallery_control a.arrow.next'))
		.controls.attach_previous($('div.gallery_control a.arrow.previous'));
	};

	/*
	*** script for showing each gallery in the gallery page
	*/

	$("ul.galleries_names li").eq(0).addClass("active");
		gallery_type = new PageControl('div.galleries_images', 'div.all_gallery')
		gallery_type.attachControls('ul.galleries_names li');
};


// connect document `load` event with handler function
$(Site.on_load);
