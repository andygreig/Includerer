Includerer
==========

Minimalist async script loader

How to use

// single script
includerer('/js/test-script.js',  function(){
  script.run();
});

// multiple scripts that rely on each other
includerer(['/js/test-script2.js', '/js/test-script.js'], function(){
  // callback runs once all dependant scripts have loaded
	script.run();
});