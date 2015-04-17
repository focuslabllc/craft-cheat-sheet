/*{# ---------------------------------------------
   Remember that twig tags within the JS below
   will be parsed by twig before the DOM reads
   and runs the JS. Keep an eye out for:

   {{ }} sets
   {% %} sets
--------------------------------------------- #}*/

var currentContext = '{{ sampleTag }}', newContext;

function clickListen(e) {
	if (e.path[0].attributes['data-tag']) { switchContext(e); return; }
	if (e.target.localName == 'code') { selectCodeSnippet(e.target); return; }
}

function switchContext(e) {
	e.preventDefault();
	if ( ! e.path[0].attributes['data-tag']) { return false; }

	newContext = e.path[0].attributes['data-tag'].value;
	if (newContext === currentContext) { return; }

	e = e || window.event;
	var target = e.target || e.srcElement;

	if (target.className.match(/\bcontext\b/)) {
		{% verbatim -%} // jshint ignore:line
		document.body.innerHTML = document.body.innerHTML.replace(
			new RegExp('([{%].*?)(' + currentContext + ')(.*?[%}])','g'),
			'$1' + newContext +'$3'
		);
		{% endverbatim -%} // jshint ignore:line
		currentContext = newContext;
		document.getElementsByClassName('activeContext')[0].className = 'context';
		document.querySelectorAll('[data-tag=' + newContext +']')[0].className += ' activeContext';
	}
}

function selectCodeSnippet(elem) {
	var range = document.createRange();
	range.selectNodeContents(elem);
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
}

window.onload = function () {
	setInterval(function(){
		document.getElementById('header').className = (window.pageYOffset > 15) ? 'short' : '' ;
	}, 300);

	if (document.body.addEventListener) {
		document.body.addEventListener('click', clickListen, false);
	} else {
		document.body.attachEvent('onclick', clickListen);
	}
};