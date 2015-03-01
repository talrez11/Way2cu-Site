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

	Caracal.lightbox = new LightBox('a.image.direct.clients', false, false, true);
	Caracal.lightbox1 = new LightBox('a.image.direct.portfolio', false, false, true);
	Caracal.loader = new Caracal.Gallery.Loader();

    //Clients Gallery

	clientGallery = new Caracal.Gallery.Slider();
	clientGallery
			.controls.attach_next($('div#clients.wrap a.arrow.next'))
            .controls.attach_previous($('div#clients.wrap a.arrow.previous'))
            .controls.set_auto(3000)
            .images.set_container(' div#clients div.gallery_container')
            .images.add('div#clients div.gallery_container a.image')
            .images.set_visible_count(5)
            .images.set_center(true)
            .images.set_spacing(20);


	//Portfolio Gallery
	galleryPortfolio = new Caracal.Gallery.Slider();
	galleryPortfolio
			.controls.attach_next($('div.gallery_control a.arrow.next'))
			.controls.attach_previous($('div.gallery_control a.arrow.previous'))
			.controls.set_auto(3000)
			.images.set_container('div.all_gallery')
			.images.add('div.all_gallery a.image')
			.images.set_step_size(3)
			.images.set_center(true)
			.images.set_spacing(20)
			.images.set_visible_count(3);
	/*
	*** script for showing each gallery in Portfolio Gallery
	*/
	function callable(data,container) {
		console.log(data);
		var link = $('<a>').appendTo(container);
		link
			.attr('href', data.image)
			.addClass("image direct portfolio")
			.data('id', data.id);

		var thumbnail = $('<img>').appendTo(link);
		thumbnail
			.attr('src', data.thumbnail)
			.attr('alt', data.title);

		var desc = $('<div class="desc">').appendTo(link);
		var header = $('<h2>').appendTo(desc);
		header
			.text(data.title);
		var para = $('<p>').appendTo(desc);
		para
			.html(data.description);

		return link;
	}
	$('ul.galleries_names li').on('click',function() {
		var item = $(this);
		console.log(item);
		var gallery_id = item.data('gallery');
		Caracal.loader
			.add_gallery(galleryPortfolio)
			.images.load_by_group_id (gallery_id,null)
			.images.set_constructor(callable);
	});

	// Function that resets position after scroll Animation
	function resetPosition(){
		 $('div.wrap.whitebg div.inner_wrap > span').removeClass('animation');
		 $('div.wrap.whitebg div.inner_wrap > span').css('background-position','0px 0px');
		 $('header span').css('position','relative');
	     $('header span').css('top','0px');
	     $('header h1,header p').css('display','block');
		 $('header a').css('display','inline-block');
		 $('header div.inner_wrap > a:nth-of-type(3)').css('display','block');
	}



	//Scroll Function
	$('a[href*=#]').on('click', function(e) {
	e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump

	var target = $(this).attr("href"); //Get the target

	if(target == "#about") {
		$('div.wrap.whitebg div.inner_wrap > span').css('background-position', '0px -250px');
		$('div.wrap.whitebg div.inner_wrap > span').addClass('animation');
		$('header span').css({'position':'fixed',
							   'z-index':'1',
							   'top':'82px',
							   'left':'50%',
							   'margin-left':'-108px'
							});
		$('header h1,header p').css('display','none');
		$('header a').css('display','none');
		$('html, body').stop().animate({ scrollTop: $(target).offset().top -82 }, 1500, function() {
		  setTimeout(resetPosition,500);
	     // location.hash = target;  //attach the hash (#jumptarget) to the pageurl
		});

		return false;

	}

	if(target == "#clients") {
		$('div#clients  h2').css('opacity','0');
		$('html, body').stop().animate({ scrollTop: $(target).offset().top  }, 800, function() {
	     $('div#clients  h2').css('opacity','1');
		});

		return false;
	}
	// perform animated scrolling by getting top-position of target-element and set it as scroll target
	$('html, body').stop().animate({ scrollTop: $(target).offset().top  }, 800, function() {
	     location.hash = target;  //attach the hash (#jumptarget) to the pageurl
		});

		return false;
   });
}


// connect document `load` event with handler function
$(Site.on_load);
