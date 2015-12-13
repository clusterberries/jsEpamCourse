(function($) {
	$.fn.slide = function(options) {
		options = $.extend({
			leftButton: $('.leftButton'),
			rightButton: $('.rightButton'),
			speed: 700, 		//speed of animation in ms
			autoplay: true,		//allow autoplay
			delay: 3000, 		//delay of autoplay in ms
			hideContent: true	//hide content on slide when it is changing
		}, options);

		// the main function
		var createSlider = function() {
			var ul = $(this).children('ul');
			var oneShift = $(this).width(); // the step of shift
			var lis = ul.children('li');
			var count = lis.length;
			var interval, 
				slideToRight, 
				slideToLeft, 
				hideCurrentContent;

			// if there are only one element, clone it
			if (count === 1) {
				ul.append(lis.clone());
				lis = ul.children('li');
				count = lis.length;
			}

			//set some styles
			$(this).css('overflow', 'hidden');
			ul.css({
				position: 'absolute', 
				width: count * oneShift,
				left: 0, 
				transition: 'left ' + options.speed * 0.001 + 's'
			});
			lis.css('float', 'left');

			// shift one slide to left
			slideToLeft = function() {
				var floatLi = lis.eq(0);
				hideCurrentContent();
				// constrict the first li
				floatLi.animate({
					width: 0
				}, options.speed, function() {
					// move li to the end with normal width
					ul.append(floatLi);
					floatLi.css('width', oneShift);
					lis = ul.children('li');
 				});
			}

			// shift one slide to right
			slideToRight = function() {
				var floatLi = lis.eq(count - 1);
				hideCurrentContent();
				// constrict the last li and move it to the beggining
				floatLi.css('width', 0);
				ul.prepend(floatLi);
				// extend the li to the normal width
				floatLi.animate({
					width: oneShift
				}, options.speed);
				lis = ul.children('li');
			}

			// hide content on current slide if it is set in options
			hideCurrentContent = function() {
				var currenLi;
				if (options.hideContent) {
					// calculate current li
					currenLi = ul.css('left').slice(0, -2) / oneShift;
					// the speed of animation is a little faster than main animation
					lis.eq(currenLi).children().animate({
						opacity: 0
					}, options.speed * 0.7, function() {
						// set normal opacity when animation ends
						$(this).css('opacity', 1);
					});
				}
			}

			// set handlers on buttons
			options.leftButton.on('click', slideToRight);
			options.rightButton.on('click', slideToLeft);

			// switch slides when press left or right arrow
			$(document).on('keydown', function(event) {
				if (event.keyCode === 37) {
					slideToRight();
				}
				if (event.keyCode === 39) {
					slideToLeft();
				}
			});

			// set autoplay with specified delay
			if (options.autoplay) {
				interval = setInterval(function() {
					slideToLeft();
				}, options.delay);

				// don't move slider when hover slider or buttons
				$(this).add(options.leftButton).add(options.rightButton)
				.hover(function() {
					clearInterval(interval);
				}, function() {
					interval = setInterval(function(){
						slideToLeft();
					}, options.delay);
				});	
			}
		}
		
		// do this function for all elements and return this
		return this.each(createSlider);
	}
}(jQuery));