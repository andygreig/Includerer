/*
* includerer - a minimal script loader
* Author: Andrew Greig
* Copyright (c) 2012 Andrew Greig
* Dual MIT/BSD license
*/

;(function ( window, doc, undef ) {

	var doc = document, 
		head = doc.getElementsByTagName('head')[0],
		queue, completed = 0;

	// each helper
	function each( arr, fn ) {
		for ( var i = 0, arr_length = arr.length; i < arr_length; i++ ) {
			fn.call( arr, arr[i], i )
		}
	}
	// is the obj an array
	function isArray( obj ) {
		return ( obj.constructor.toString().indexOf('Array') != -1 )
	}
	// check if file is ready
	function isFileReady ( state ) {
		return ( !state || state === 'loaded' || state === 'complete' || state === 'uninitialized' );
	}
	
	// run stuff
	init = function ( paths, done ) {
		paths = isArray(paths) ? paths : [paths]
		queue = paths.length
		function callback() {
			if( completed === queue ) {
				done && done()
			}
		}
		setTimeout(function () {
			each(paths, function(path) {
				getScript(path, callback)
			});
		}, 0)
	}
	
	getScript = function ( path, fn ) {
		var c, s=doc.createElement('script')
		s.src=path
		s.onreadystatechange = s.onload = function () {
			if ( !c && isFileReady( s.readyState ) ) {
				c = 1
				completed++
				fn()
				// Handle memory leak in IE
				s.onload = s.onreadystatechange = null
			}
		}
		head.appendChild(s)
	}
	
	// expose!
	getInclusions = function () { return init }
	window.includerer = getInclusions()
	
})(this, this.document);


















