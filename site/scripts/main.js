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

	if ($('div.gallery_container a').length > 0) {
		clientGallery = new Caracal.Gallery.Slider();
		clientGallery
		.images.set_container('div.gallery_container')
		.images.add('div.gallery_container a.image')
		.controls.set_auto(3000)
		clientGallery.images.set_center(true)
		clientGallery.images.set_spacing(20)
		clientGallery.images.set_visible_count(5)
		.controls.attach_next($('div.clients_wrap a.arrow.next'))
		.controls.attach_previous($('div.clients_wrap a.arrow.previous'));
	};

	/*
	*** script for showing each gallery in the gallery page
	*/

	$("ul.galleries_names li").eq(0).addClass("active");
		gallery_type = new PageControl('div.galleries_images', 'div.all_gallery')
		gallery_type.attachControls('ul.galleries_names li');

	if ($('div.galleries_images a').length > 0) {
		galleryPortfolio = new Caracal.Gallery.Slider();
		galleryPortfolio
		.images.set_container('div.galleries_images')
		.images.add('div.galleries_images a.image')
		.controls.set_auto(3000)
		galleryPortfolio.images.set_step_size(3)
		galleryPortfolio.images.set_center(true)
		galleryPortfolio.images.set_spacing(20)
		galleryPortfolio.images.set_visible_count(3)
		galleryPortfolio.images.set_visible_count(3)
		.controls.attach_next($('div.gallery_control a.arrow.next'))
		.controls.attach_previous($('div.gallery_control a.arrow.previous'));
	};
};


// connect document `load` event with handler function
$(Site.on_load);
