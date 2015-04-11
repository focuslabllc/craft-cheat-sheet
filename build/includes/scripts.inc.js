/*{# ---------------------------------------------

We're using Google Analytics to track usage.
We appreciate the page load hit tracking in
exchange for this free resource. That said,
feel free to remove this if you'd prefer we not
count your page loads.

We're tracking:

- The version of this cheatsheet
- The # of Field Groups the install has
- The # of Fields the install has

--------------------------------------------- #}*/

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('set', 'dimension1', '{{ version }}');       // version
ga('set', 'dimension2', '{{ groups|length }}'); // field group count
ga('set', 'dimension3', '{{ fields|length }}'); // field count
ga('create', 'UA-3994429-34', 'auto');
ga('send', 'pageview');

/*{# ---------------------------------------------
   Remember that twig tags within the JS below
   will be parsed by twig before the DOM reads
   and runs the JS.  Keep an eye out for:

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
		{% verbatim -%}
		document.body.innerHTML = document.body.innerHTML.replace(
			new RegExp('([{%].*?)(' + currentContext + ')(.*?[%}])','g'),
			'$1' + newContext +'$3'
		);
		{% endverbatim -%}
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
}