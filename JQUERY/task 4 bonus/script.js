$(document).ready(function() {
	var $lis = $('main li'), 
		liArr = [], // array with values in the list
		$addEl = $('.plus input'),
		$search = $('input[type=search]'),
		$iconSort = $('.arrow-sort'),
		$iconClose = $('.cross'),
		$iconEdit = $('.edit'),
		$iconOk = $('.ok');

	//write values to array
	$lis.each(function(i, el) {
		liArr[i] = $(el).children('input').val();
	});

/* sorting */
	// sort items when load page
	sortItems();
	// sort when click or arrow in the top
	$iconSort.on('click', function () {
		$(this).toggleClass('dsc');
		sortItems();
	});

	function sortItems (dsc) {
		// if the sort arrow has class dsc sort items accorgingly
		if ($iconSort.hasClass('dsc')) {
			liArr = liArr.sort(function (a1, a2) {
				return a1 < a2;
			});	
		}
		else liArr = liArr.sort();
		// change input values according to the array
		$lis.each(function(i, el) {
			$(el).children('input').val(liArr[i]);
		});
		// if there are some value in search input display them correctly
		searchItems();
	}

/* search*/
	$search.on('keyup', searchItems);

	function searchItems () {
		var val = $search.val();
		$lis.each(function(i, el) {
			var $el = $(el);
			// if the item starts with current search value, display it
			if ($el.children('input').val().indexOf(val) === 0) {
				$el.css('display', 'block');
			}
			else $el.css('display', 'none');
		});
	}

/* add el */
	$addEl.on('focus', function() {
		$(this).parent().addClass('active');
	});

	$addEl.on('blur', function () {
		// ask if the user want to add new value
		if (this.value !== '') {
			if (confirm('Do you want to save new value "' + this.value + '"?')) {
				addValue();
			}
			else {
				$addEl.val('').blur();
				$addEl.parent().removeClass('active');
			}
		}
		else $addEl.parent().removeClass('active');
	});

	// add value if click on enter
	$addEl.on('keydown', function (event) {
		if (event.keyCode === 13) {
			addValue();
		}
	});

	function addValue () {
		var val = $addEl.val();
		var newLi;
		$addEl.parent().removeClass('active');
		if (val !== '') {
			$addEl.val('').blur();
			// add new value to array
			liArr.push(val);
			$('main ul').append(createLi(val));
			//update the colllection
			$lis = $('main li');
			// rearrange the array
			sortItems();
		}
	}

	// create new element with handlers
	function createLi (value) {
		var $li = $('<li></li>').append('<input type="text" value="' + value + '" readonly>');
		var $cross = $('<div class="icon cross"></div>').on('click', removeItem);
		var $edit = $('<div class="icon edit"></div>').on('click', editItem);
		var $ok = $('<div class="icon ok no-display"></div>');
		$li.append($cross).append($edit).append($ok);
		return $li;
	}

/* remove element */
	$iconClose.on('click', removeItem);

	function removeItem (event) {
		var $curLi = $(event.currentTarget.parentElement);
		// remove the element from the array and from the DOM
		liArr.splice($curLi.index(), 1);
		$curLi.remove();

		$lis = $('main li');	
	}

/* edit element */
	$iconEdit.on('click', editItem);

	function editItem (event) {
		var $this = $(event.currentTarget);
		var $curInput = $this.prevAll('input');
		var i = $this.parent().index();
		var oldVal = $curInput.val();

		// change icons and focus on the input
		$curInput.prop("readonly", false).addClass('active').focus();
		$this.addClass('no-display');
		$this.prev().addClass('no-display');
		$this.next().removeClass('no-display');

		// change value if click on okey icon
		$iconOk.one('click', changeItem);

		// change value if click on enter
		$curInput.on('keydown', function (event) {
			if (event.keyCode === 13) {
				changeItem();
			}
		});

		// when click outside the input show confirm window
		$(document.body).on('click keydown', function (event) {
			var $target = $(event.target);
			if ($target.closest('li')[0] !== $this.parent()[0]) {
				// ask if the user want to add new value
				if ($curInput.val() !== oldVal) {
					if (confirm('Do you want to save changed value "' + $curInput.val() + '"?')) {
						changeItem();
					}
					else {
						$curInput.val(oldVal);
						changeItem();
					}
				}
				else changeItem();
			}
		});

		function changeItem () {
			var val = $curInput.val();

			// return normal styles and icons
			$curInput.prop("readonly", true).removeClass('active');
			$this.removeClass('no-display');
			$this.prev().removeClass('no-display');
			$this.next().addClass('no-display');
			// dont need this handler any more
			$(document.body).off('click keydown');
			$curInput.off('keydown');
			// write new value and sort
			if (val !== oldVal) {
				liArr[i] = val;
				sortItems();
			}
		}
	}

});