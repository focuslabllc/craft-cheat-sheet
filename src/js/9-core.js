/*{# ---------------------------------------------
   Remember that twig tags within the JS below
   will be parsed by twig before the DOM reads
   and runs the JS. Keep an eye out for:

   {{ }} sets
   {% %} sets
--------------------------------------------- #}*/


GameGenie = {

	currentContext: '{{ sampleTag }}', // this one gets parsed by Twig later
	newContext: null,

	whichFilter:    '',
	codeBlockCount: $('.field_block').length,
	fieldNavCount:  $('li.field').length,
	storagePrefix:  'Cheat-Sheet.' + window.location.hostname + '.',
	customElements: JSON.parse(localStorage.getItem(this.storagePrefix + 'customElements')) || [],


	pageSetup: function() {

		// On read/load, focus on the filter input so a person
		// can just start typing to find something specfic
		$('<input type="text" value="" id="field-filter" placeholder="Find a field...">')
			.hide()
			.css('opacity', 0)
			.insertBefore('#groups_list')
			.slideDown(100, function(){
				$(this).animate({ 'opacity': 1}, 300)
				.focus();
			});

		$('<div class="copy"><span class="copy_label">Click to Copy</span><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="19" height="22" viewBox="0 0 19 22"><defs><style>.cls-2 { fill: #9f9f9f; }</style></defs><path d="M16.973 19s-.95 0-.95 0S16 18 16 18s1 0 1 0c.67 0 1-.325 1-1 0 0 0-15 0-15 0-.675-.33-1-1-1C17 1 5 1 5 1c-.67 0-1 .325-1 1 0 0 0 1 0 1s9.973 0 9.973 0C15.09 3 16 3.916 16 5.04c0 0 0 14.92 0 14.92 0 1.125-.91 2.04-2.027 2.04 0 0-11.946 0-11.946 0C.91 22 0 21.085 0 19.96c0 0 0-14.92 0-14.92C0 3.917.91 3 2.027 3 2.027 3 3 3 3 3s0-.96 0-.96C3 .917 3.91 0 5.027 0c0 0 11.946 0 11.946 0C18.09 0 19 .916 19 2.04c0 0 0 14.92 0 14.92 0 1.125-.91 2.04-2.027 2.04zM2 4c-.67 0-1 .325-1 1 0 0 0 15 0 15 0 .675.33 1 1 1 0 0 12 0 12 0 .67 0 1-.325 1-1 0 0 0-15 0-15 0-.675-.33-1-1-1C14 4 2 4 2 4zm8.454 11.01s-.573-.526-.573-.526 2.146-1.975 2.146-1.975-2.145-1.977-2.145-1.977.574-.528.574-.528 2.432 2.24 2.432 2.24c.16.145.16.38 0 .527 0 0-2.432 2.24-2.432 2.24zm-4.914 0s-2.433-2.238-2.433-2.238c-.158-.146-.158-.382 0-.527 0 0 2.433-2.24 2.433-2.24s.573.528.573.528-2.146 1.976-2.146 1.976 2.146 1.974 2.146 1.974-.573.527-.573.527z" id="path-1" class="cls-2" fill-rule="evenodd"/></svg></div>')
			.hide()
			.css('opacity', 0)
			.prependTo('.code_block .code')
			.fadeIn(100, function(){
				$(this).animate({ 'opacity': 1}, 500);
			});


			// If we have custom elements in local store we'll add them to
			// the DOM with the appropriate method
			if (GameGenie.customElements.length > 0) {
				for (var i = GameGenie.customElements.length - 1; i >= 0; i--) {
					GameGenie.addCustomElement(GameGenie.customElements[i]);
				}
			}
	},


	checkForNoCode: function() {
		if ($('.field_block').filter(':visible').length === 0) {
			// console.log('TODO: add in element showing there are no results based on the search');
		} else {
			// console.log('TODO: add in logic to hide element when search returns results again');
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

		switch(filterType) {
			case 'field':
				this.whichFilter = 'field-handle';
				break;

			case 'group':
				this.whichFilter = 'group';
				break;

			default:
				this.whichFilter = 'field-name';
		}


		// Filter content area
		$('.field_block').each(function() {
			var name = $(this).attr('data-' + GameGenie.whichFilter).toLowerCase();
			if (name.indexOf(find) === -1) {
				$(this).fadeOut('fast', GameGenie.checkForNoCode('.field_block'));
			} else if ( ! $(this).is('visible')) {
				$(this).fadeIn('fast', GameGenie.checkForNoCode('.field_block'));
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
	// using .on() with 'body' because the #field-filter
	// element is dynaically added to the DOM by javascript
	$('body').on('keyup', '#field-filter', function(){

		var search = $(this).prop('value').toLowerCase().replace(/\s/g, '').split(':');

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

		{% verbatim -%} // jshint ignore:line
		$('section.main_body').html($('section.main_body').html().replace(
			new RegExp('([{%].*?)(' + gg.currentContext + ')(.*?[%}])','g'),
			'$1' + gg.newContext +'$3'
		));
		{% endverbatim -%} // jshint ignore:line

		$('a.context[data-tag="' + gg.currentContext + '"]').removeClass('activeContext');
		$('a.context[data-tag="' + gg.newContext + '"]').addClass('activeContext');

		gg.currentContext = gg.newContext;
	});

});