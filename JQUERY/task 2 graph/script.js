$(document).ready(function () {
	// show/hide columns when click and change inscription
	$('button').on('click', function() {
		console.log(this);
		if (this.innerHTML.toLowerCase() === 'show') {
			$('.cols').fadeIn(1000);
			this.innerHTML = 'hide';
		}
		else {
			$('.cols').fadeOut(500);
			this.innerHTML = 'show';
		}
	});

	// show tip when click on column
	$('.cols div').on('click', function() {
		var tip;
		// if there is no tip create it
		if ($(this).index() === 0) {
			tip = $('<div class="tip">' + $(this).data('value') + 
				'</div><div class="tip-arr"></div>');
			$(this).before(tip);
			// hide tip when click on it
			tip.on('click', function() {
				tip.fadeToggle(500);
			});
		}
		else tip = $(this).prevAll('div');
		tip.fadeToggle(500);
	});
});