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

     if (Site.is_mobile()) clientGallery.images.set_visible_count(1);


	//Portfolio Gallery
	galleryPortfolio = new Caracal.Gallery.Slider();
	galleryPortfolio
			.controls.attach_next($('div.gallery_control a.arrow.next'))
			.controls.attach_previous($('div.gallery_control a.arrow.previous'))
			.controls.set_auto(3000)
			.images.set_container('div.all_gallery')
			.images.add('div.all_gallery a.image')
			.images.set_step_size(1)
			.images.set_center(true)
			.images.set_spacing(40)
			.images.set_visible_count(3);
	 if (Site.is_mobile()) galleryPortfolio.images.set_visible_count(1);
	/*
	*** script for showing each gallery in Portfolio Gallery
	*/

	function make_image(data) {
		var link = $('<a>');
		link
			.attr('href', data.image)
			.addClass("image direct portfolio")
			.data('id', data.id);

		var image_container = $('<div class="img_container">').appendTo(link);
		image_container
				.css('height','270px')
				.css('overflow','hidden');

		var thumbnail = $('<img>').appendTo(image_container);
		thumbnail
			.attr('src', data.thumbnail)
			.attr('alt', data.title)
			.css('width','100%');

		var desc = $('<div class="desc">').appendTo(link);
		var header = $('<p>').appendTo(desc);
		header
			.text(data.title);
		var para = $(data.description).appendTo(desc);

		return link;
	}

	function image_loaded() {
		Caracal.lightbox1 = new LightBox('a.image.direct.portfolio', false, false, true);
	}

	Caracal.loader = new Caracal.Gallery.Loader();
	Caracal.loader
			.add_gallery(galleryPortfolio)
			.set_constructor(make_image)
			.set_thumbnail_size(300 ,Caracal.Gallery.Constraint.HEIGHT)
			.add_callback(image_loaded)

	var galleryList = $('ul.galleries_names li');

	galleryList.on('click',function(event) {
		event.preventDefault();
		var item = $(this);
		galleryList.not(item).removeClass('active')
		var gallery_id = item.data('gallery');
		Caracal.loader.load_by_group_id(gallery_id);
		item.addClass('active');
	});

	// Function For Active Menu Item

	var menuItems = $('header nav a');
	menuItems.on('click',function(){
		var link = $(this);
		menuItems.not(link).removeClass('activeLink');
		link.addClass('activeLink');
	});

	// Function For Activation Menu Items With Scroll Animation

	$(window).scroll(function() {
		var links = $('header nav a');
  		var services  = $('div#services').offset().top -150;
  		var client = $('div#clients').offset().top -150;
  		var portfolio = $('div#portfolio').offset().top -150;
  		var mobile = $('div#mobile').offset().top -150;
  		var about = $('div#about_us').offset().top -150;
  		var contact = $('div#contact').offset().top -150;
  		if(window.scrollY <= services) {
  			links.eq(0).addClass('activeLink');
  			links.not(links.eq(0)).removeClass('activeLink');
  		}

  		if(window.scrollY >= services &&  window.scrollY <= client) {
  			links.eq(1).addClass('activeLink');
  			links.not(links.eq(1)).removeClass('activeLink');
  		}

  		if(window.scrollY > client &&  window.scrollY <= portfolio) {
  			links.eq(2).addClass('activeLink');
  			links.not(links.eq(2)).removeClass('activeLink');
  		}

  		if(window.scrollY > portfolio && window.scrollY <= mobile) {
  			links.eq(3).addClass('activeLink');
  			links.not(links.eq(3)).removeClass('activeLink');
  		}

  		if(window.scrollY > mobile && window.scrollY <= about) {
  			links.eq(4).addClass('activeLink');
  			links.not(links.eq(4)).removeClass('activeLink');
  		}

  		if(window.scrollY > about && window.scrollY <= contact) {
  			links.eq(5).addClass('activeLink');
  			links.not(links.eq(5)).removeClass('activeLink');
  		}

  		if(window.scrollY > contact) {
  			links.eq(6).addClass('activeLink');
  			links.not(links.eq(6)).removeClass('activeLink');
  		}

	});


	// Function that resets position after scroll Animation
	function resetPosition(){
		$('header nav').css('opacity','1');
		 $('div.wrap.whitebg > span').removeClass('animation');
		 $('div.wrap.whitebg > span').css('background-position','0px 0px');
		 $('header span').css('position','relative');
	     $('header span').css('top','0px');
	     $('header h1,header p').css('display','block');
		 $('header a').css('display','inline-block');
		 $('header > a:nth-of-type(3)').css('display','block');
	}



	//Anchor Scroll Function
	$('a[href*=#]').on('click', function(e) {
	e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump

	var target = $(this).attr("href"); //Get the target
    var aboutPosition = $('div#services').offset().top;
	if(target == "#services" && window.scrollY < aboutPosition) {
		$('header nav').css('opacity','0');
		$('div.wrap.whitebg > span').css('background-position', '0px -250px');
		$('div.wrap.whitebg > span').addClass('animation');
		$('header span').css({'position':'fixed',
							   'z-index':'1',
							   'top':'0px',
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
		$('html, body').stop().animate({ scrollTop: $(target).offset().top -82  }, 1000, function() {
	     $('div#clients  h2').css('opacity','1');
		});

		return false;
	}
	// perform animated scrolling by getting top-position of target-element and set it as scroll target
	$('html, body').stop().animate({ scrollTop: $(target).offset().top -82  }, 1000, function() {
	     location.hash = target;  //attach the hash (#jumptarget) to the pageurl
		});

		return false;
   });
}


// connect document `load` event with handler function
$(Site.on_load);
