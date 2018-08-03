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
ga('create', 'UA-3994429-34', 'auto');
ga('set', 'dimension1', '{{ cs.version }}');        // Cheat Sheet version
ga('set', 'dimension2', '{{ cs.groups|length }}');  // Build field group count
ga('set', 'dimension3', '{{ cs.fields|length }}');  // Build field count
ga('set', 'dimension4', '{{ craft.app.version }}'); // Craft version & build
ga('send', 'pageview');
