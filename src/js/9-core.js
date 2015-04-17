var search, name, type, whichData, navInput;

var checkForNoCode = function(selector) {
	if ($(selector + ':visible').length === 0) {
		console.log('TODO: add in element showing there are no results based on the search');
	} else {
		// console.log('TODO: add in logic to hide element when search returns results again');
	}
};

var checkForNoNav = function(selector) {
	// navInput = selector.parents('.nav_group');
	// if (navInput + ':visible').length === 0) {
		// console.log('TODO: add in element showing there are no results based on the search');
	// } else {
		// console.log('TODO: add in logic to hide element when search returns results again');
	// }
};

var filter = function(type, find) {

	switch(type) {
		case 'field':
			whichData = 'field-handle';
			break;

		case 'group':
			whichData = 'group';
			break;

		default:
			whichData = 'field-name';
	}

	// Filter content area
	$('.field_group').each(function(i){
		name = $(this).attr('data-' + whichData).toLowerCase();
		if (name.indexOf(find) === -1) {
			$(this).fadeOut('fast', checkForNoCode('.field_group'));
		} else {
			$(this).fadeIn('fast', checkForNoCode('.field_group'));
		}
	});


	// Show/hide nav sections
	$('#group_list li.field').each(function(){
		name = $(this).attr('data-' + whichData).toLowerCase();
		if (name.indexOf(find) === -1) {
			$(this).fadeOut('fast', checkForNoNav($(this)));
		} else {
			$(this).fadeIn('fast', checkForNoNav($(this)));
		}
	});

};



$(function(){

	// TODO: Add in the input field with jQuery so it isn't there for people
	// who may have hit javascript bugs or could load jQuery for some reason
	// $('#contact_list').find('h2').after('<input id="filterCards" type="text" value="" placeholder="Search Current Contacts">');

	$('body').on('keyup', '#field-filter', function(){

		search = $(this).prop('value').toLowerCase().replace(' ', '').split(':');

		if (search.length === 1) {
			type = 'field';
			find = search[0];
		} else {
			type = search[0];
			find = search[1];
		}

		filter(type, find);

	});


	// Element switching
	$('body').on('click', 'a.context', function(e){
		e.preventDefault();
		console.log('clicked');
	});

});