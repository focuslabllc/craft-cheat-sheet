// I couldn't create something called a Cheat Sheet without
// an object named Game Genie, could I?
GameGenie = {

	currentContext: null,
	newContext:     null,

	whichFilter:    '',
	codeBlockCount: $('.field_block').length,
	fieldNavCount:  $('li.field').length,
	storagePrefix:  'Cheat-Sheet.' + window.location.hostname + '.',
	customElements: [],


	pageSetup: function() {

		// when a person hits "s", "f", or "/" the field search
		// input is brought to :focus and there's a visual queue (css animation)
		document.addEventListener('keyup', GameGenie.jumpToFilter, false);


		// On read/load, focus on the filter input so a person
		// can just start typing to find something specfic
		$('<input type="text" value="" id="field_filter" placeholder="Find a field...">')
			.hide()
			.css('opacity', 0)
			.insertBefore('#groups_list')
			.slideDown(100, function(){
				$(this).animate({ 'opacity': 1 }, 300)
				.focus();
			})
			.on('blur', function(){
				$(this).removeClass('lookAtMeInput');
			})
		;


		// If we have custom elements in local store we'll add them to
		// the DOM with the appropriate method
		var storage = localStorage.getItem(GameGenie.storagePrefix + 'customElements');
		if (storage) {
			GameGenie.customElements = ggCE = JSON.parse(storage);
		}
		if (storage && ggCE.length > 0) {
			for (var i = ggCE.length - 1; i >= 0; i--) {
				GameGenie.addCustomElement(ggCE[i]);
			}
		}
	},


	jumpToFilter: function(e) {
		// if we're in an input field we bail because user is typing
		if ($(document.activeElement).is('input[type=text]')) return;

		// if filter box isn't focused, bring it to focus
		// with keys and 'f', 's', and '/' respectively
		if ( ! e.ctrlKey && (e.keyCode === 70 || e.keyCode === 83 || e.keyCode === 191)) {
			$('#field_filter').focus().addClass('lookAtMeInput');
		// or with key 'c' trigger Custom Element input focus
		} else if ( ! e.ctrlKey && e.keyCode === 67) {
			$('label[for=custom]').trigger('click');
			$('#newCustomElement input[type=text]').focus();
		}
	},


	checkForNoCode: function() {
		if ($('.field_block').filter(':visible').length === 0) {
			$('#no_results').removeClass('hidden');
		} else {
			$('#no_results').addClass('hidden');
		}
	},


	checkForNoNav: function() {
		$('.group_list').each(function() {
			var visibleCount = $(this).find('li').filter(':visible').length;
			groupInput = $(this).parents('.nav_group').find('input');
			if (visibleCount === 0 || visibleCount === undefined) {
				groupInput.prop('checked', false);
			} else {
				groupInput.prop('checked', true);
			}
		});
	},


	addCustomElement: function(elementName) {
		$('#custom_element_list').append('<li class="custom_element"><a href="#" class="context" data-element-name="'+elementName+'" data-tag="'+elementName+'">'+elementName+'<span class="remove_custom">&times;</span></a></li>');
		this.addElementToStorage(elementName);
	},


	removeCustomElement: function(obj) {
		var parent = obj.parents('.custom_element');
		parent.animate({width: 0}, 'fast', function(){ $(this).remove(); });
		this.removeElementFromStorage(parent.find('a').attr('data-element-name'));
	},


	setLocalStorage: function(key, value) {
		key = this.storagePrefix + key;
		value = (typeof value === 'object') ? JSON.stringify(value) : value ;
		localStorage.setItem(key, value);
	},


	addElementToStorage: function(elementName) {
		var index = GameGenie.customElements.indexOf(elementName);
		if (index > -1) { return; }
		GameGenie.customElements.push(elementName);
		GameGenie.setLocalStorage('customElements', GameGenie.customElements);
	},


	removeElementFromStorage: function(elementName) {
		var index = GameGenie.customElements.indexOf(elementName);
		if (index > -1) {
			GameGenie.customElements.splice(index, 1);
			GameGenie.setLocalStorage('customElements', GameGenie.customElements);
		}
	},


	supaFilter: function(filterType, find) {

		// There's a "no results" block that has a span element
		// containing the "search phrase" so we'll keep that updated
		if (find !== '') {
			$('#search_replacement').text(find);
		} else {
			$('#search_replacement').text('that');
		}

		switch(filterType) {
			case 'field':
				this.whichFilter = 'field-handle';
				break;

			case 'group':
				this.whichFilter = 'group';
				break;

			case 'type':
				this.whichFilter = 'field-type';
				break;

			default:
				this.whichFilter = 'field-name';
		}


		// Filter content area
		$('.field_block').not('#no_results').each(function() {
			var name = $(this).attr('data-' + GameGenie.whichFilter).toLowerCase();
			if (name.indexOf(find) === -1) {
				$(this).fadeOut('fast', GameGenie.checkForNoCode);
			} else if ($(this).is('visible') === false) {
				$(this).fadeIn('fast', GameGenie.checkForNoCode);
			}
		});


		// Show/hide nav sections
		$('#groups_list li.field').each(function(){
			var name = $(this).attr('data-' + GameGenie.whichFilter).toLowerCase();
			if (name.indexOf(find) === -1) {
				$(this).hide('fast', GameGenie.checkForNoNav);
			} else if ($(this).is('visible') === false) {
				$(this).show('fast', GameGenie.checkForNoNav);
			}
		});

	},

};



$(function(){

	var type, find, search;

	// Give jQuery a minute to run some stuff, then run our page setup
	window.setTimeout(GameGenie.pageSetup, 500);


	// Our awesomesauce filter trigger
	// using .on() with 'body' because the #field_filter
	// element is dynaically added to the DOM by javascript
	$('body').on('keyup', '#field_filter', function(e){

		var search;

		if (e.keyCode === 27) {
			$('#field_filter').prop('value','');
			return GameGenie.supaFilter('field', '');
		} else {
			search = $(this).prop('value').toLowerCase().replace(/\s/g, '').split(':');
		}

		if (search.length === 1){
			type = 'field';
			find = search[0];
		} else {
			type = search[0];
			find = search[1];
		}

		GameGenie.supaFilter(type, find);

	});


	// Since Andy got soooo clever and used Radio buttons for the nav
	// element switching we need some clever js to assign literal
	// checked values. For some reason radio elements don't update
	// the .prop('checked') value in the DOM so we can't set or check
	// it dependably.
	$('ul.types input[type=radio]').click(function(){
		if ($(this).attr('checked') == 'checked') {
			return;
		} else {
			$(this).parents('.types').find('input[checked="checked"]').attr('checked', null);
			$(this).attr('checked', 'checked');
		}
	});


	// New Custom Element Creation
	$('#newCustomElement').submit(function(e){
		e.preventDefault();
		var inputField = $(this).find('input[type=text]');
		var elementName = inputField.val().replace(/\s/g, '');
		GameGenie.addCustomElement(elementName);
		inputField.val('');
	});


	$('body').on('click', '.remove_custom', function(e){
		e.preventDefault();
		GameGenie.removeCustomElement($(this));
	});


	// Element switching
	$('body').on('click', 'a.context', function(e){
		e.preventDefault();
		var gg = GameGenie;
		var currentElem = $('a.activeContext');

		if ( ! $(this).attr('data-tag')) { return false; }

		gg.newContext = $(this).attr('data-tag');
		if (gg.newContext === gg.currentContext) { return; }

		$('section.main_body').html($('section.main_body').html().replace(
			new RegExp('([{%].*?)(' + gg.currentContext + ')(.*?[%}])','g'),
			'$1' + gg.newContext +'$3'
		));

		$('a.context[data-tag="' + gg.currentContext + '"]').removeClass('activeContext');
		$('a.context[data-tag="' + gg.newContext + '"]').addClass('activeContext');

		gg.currentContext = gg.newContext;
	});

});