$(document).ready(function() {
	var icons = $('.icons > li');
	var comms = $('.comms');
	var likes = $('.likes');
	var commsCount, likesCount, emails = [];

/* LocalStorage */
	// if the localStorage is clean, set values
	if (localStorage.getItem('comms') === null) {
		localStorage.setItem('comms', '0,0,0');
		localStorage.setItem('likes', '0,0,0');
	}
	commsCount = localStorage.getItem('comms').split(',');
	likesCount = localStorage.getItem('likes').split(',');
	// show counts of comms and likes
	$.each(commsCount, function(index, val) {
		commsCount[index] = +commsCount[index]; //convert to numbers
		comms[index].innerHTML = '<div class="icon"></div>' + val;
	});
	$.each(likesCount, function(index, val) {
		likesCount[index] = +likesCount[index]; //convert to numbers
		likes[index].innerHTML = '<div class="icon"></div>' + val;
	});

/* Tabs */
	// switch tabs
	icons.on('click', function(event) {
		var newItem = 'item' + ($(event.currentTarget).index() + 1);
		var currentItem = 'item' + ($('.current').index() + 1);

		if (newItem !== currentItem) {
			$('.current').removeClass('current');
			$(event.currentTarget).addClass('current');
			$('.' + currentItem).fadeOut(300);
			$('.' + newItem).fadeIn(300);
		}
	});

/* Message form */
	function closeForm() {
		$('.background').fadeOut(300);
		$('.send').off('click');
	}
	// show message form
	comms.on('click', function(e) {
		var i = $(this).data('item');
		$('.background').fadeIn(300);
		// increment comments count when send message
		$('.send').on('click', function(event) {
			event.preventDefault();
			// dont send the message when the email and textarea are not filled
			if ($('.email-wrapper').children().length === 0  || $('textarea').val() === '') {
				alert('Write email and message to send.');
				return;
			}
			commsCount[i - 1]++;
			closeForm();
			// clean form 
			$('.email-wrapper').empty();
			$('#input-file').val('');
			$('[for=input-file]').text('Subject');
			$('textarea').val('');
			$('#input-placeholder').attr('placeholder', 'Email');
			// emails = [];
			// set the new comments count on the page and to the localStorage
			e.currentTarget.innerHTML = '<div class="icon"></div>' + commsCount[i - 1];
			localStorage.setItem('comms', commsCount);
		});
	});

	// close form when click on background
	$('.background').on('click', function(event) {
		if (event.target === event.currentTarget) {
			closeForm();
		}
	});

	//close form when click on close button
	$('.close').on('click', function(event) {
		event.preventDefault();
		closeForm();
	});

	// close message form when click esc
	$(document).on('keydown', function(event) {
		if (event.keyCode === 27) {
			closeForm();
		}
	});

	// set the name of upload file
	$('#input-file').on('change', function(event) {
		$('[for=input-file]').text(event.currentTarget.value);
	});

	// add email tag when click on plus
	$('.icon.plus').on('click', function(event) {
		// input for email
		var inputEmail = $('<input type="text" class="addEmail">');
		$(this).after(inputEmail);
		$('#input-placeholder').attr('placeholder', '');
		// hide when press enter
		inputEmail.focus().on('keydown', function(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				$(this).remove();
				if (this.value !== '') {
					// emails.push(this.value);
					// create new email div and add it
					var el = $('<div class="text-email" data-item="0">' + this.value + '<span class="icon cross"></span></div>');
					$('.email-wrapper').append(el);
					// remove the email div when click on cross
					el.find('.cross').on('click', function() {
						$(this).parent().remove();
					});
				}
			}
		});
	});

/* Likes */
	// increment the count of likes
	likes.on('click', function(event) {
		var i = $(this).data('item');
		// increment the count and set new value on page
		likesCount[i - 1]++;
		event.currentTarget.innerHTML = '<div class="icon"></div>' + likesCount[i - 1];
		// animation
		$(event.currentTarget).removeClass('changeColor');
		// without this timeout animation doesn't work
		setTimeout(function() {
			$(event.currentTarget).addClass('changeColor');
		}, 1);
		// set the new count to the localStorage
		localStorage.setItem('likes', likesCount);
	});

});