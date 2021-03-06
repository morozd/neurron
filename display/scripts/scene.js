(function(){

	display.current = null;


	// history
	var chrome = !!window.chrome;

	window.addEventListener('popstate', function ( e )  {

		if ( chrome ) { chrome = !chrome; return; }

		if ( !history.state || history.state === display.current ) {

			window.history.back();
			return;
		}

		display.show( history.state );

		triggered = false;

		display.changeLink();
	});


	// navigation
	var site = document.getElementById('site'),
		text, prev,
		triggered;

    // crap code, added a global function to bind play neurron button to click event
    window.addListener = function( element ) {
        element.addEventListener("click", function() {
            triggered = false;

            prev = display.current;

            text = site.innerText;

            if ( text === 'play neurron' ) {			display.show('start'); }
            else if ( display.logic[ text ] )	display.show( text );

            display.changeLink();
        });
    };

	site.addEventListener('click', function(){

		triggered = false;

		display.show( site.textContent === 'contact' ? 'contact' : 'start' );

		display.changeLink();
	});

	site.addEventListener( transitionEnd, fadeLink );

	display.changeLink = function(){ site.classList.remove('fadeIn'); };

	function fadeLink(){

		// in-out
		if ( (triggered = !triggered) === false ) return;

		site.textContent = ( site.textContent === 'contact' ) ? 'play neurron' : 'contact';

		site.classList.add('fadeIn');
	}











	// visuals
	var containerLeft = document.getElementById('container-left'),
		containerRight = document.getElementById('container-right');

	display.show = function ( id ) {

		var left, right,
			check = 0,
			temp;

		if ( window.history.pushState ) window.history.pushState( id, '', '' );

		if ( display.current ) {

			left = document.getElementById( display.current + '-l' );
			right = document.getElementById( display.current + '-r' );

			if ( left ) {

				check++;

				left.classList.remove('fadeIn');
				left.classList.add('fadeOut');
				left.addEventListener( transitionEnd, hide );
			}

			if ( right ) {

				check++;

				right.classList.remove('fadeIn');
				right.classList.add('fadeOut');
				right.addEventListener( transitionEnd, hide );
			}

		} else { show(); }




		function hide ( e ) {

			var el = e.currentTarget;

			el.classList.remove('fadeOut');
			el.classList.add('hide');

			el.removeEventListener( transitionEnd, hide );

			if ( !--check ) show(); // as both triggered
		}

		function show(){

			var view = display.views[ id ];

			left = document.getElementById( id + '-l' );
			right = document.getElementById( id + '-r' );

			if ( left ) { // 2nd

				left.classList.remove('hide');
				setTimeout(function(){ left.classList.add('fadeIn'); }, 16.7 );

			} else if ( view && view.left ) {

				temp = document.createElement('div');
				temp.innerHTML = view.left;
				temp.id = id + '-l';
				temp.className = 'wrapper show';
				containerLeft.appendChild( temp );

				setTimeout(function(){

					document.getElementById( id + '-l' ).classList.add('fadeIn');

				}, 16.7 );
			}

			if ( right ) { // 2nd

				right.classList.remove('hide');
				setTimeout(function(){ right.classList.add('fadeIn'); }, 16.7 );

			} else if ( view && view.right ) {

				temp = document.createElement('div');
				temp.innerHTML = view.right;
				temp.id = id + '-r';
				temp.className = 'wrapper show';
				containerRight.appendChild( temp );

				setTimeout(function(){

					document.getElementById( id + '-r' ).classList.add('fadeIn');

				}, 16.7 );
			}

			display.current = id;

			// ensure HTML parsing
			setTimeout(function(){ if ( display.logic[ id ] ) display.logic[ id ](); }, 16.7 );
		}
	};








	// audio
	display.tracks = {

		current	: null,
		next	: null
	};

	var audioVolume = config.audioVolume/100,
		diff = ~~(config.audioVolume / config.audioFading + 0.5) / 100,
		timer;


	display.sound = function ( el ) {

		var tracks = display.tracks,
			current = tracks.current;

		if ( isNaN(el.duration) ) { // state validation

			setTimeout( function(){	display.sound(el);	}, 16.7 );
			return;
		}

		if ( current ) { // fading

			var next = tracks.next = el;

			if ( current === next ) return;

			next.volume = 0;

			timer = config.audioFading;
			fadeOut();

		} else { // init

			current = tracks.current = el;

			current.currentTime = 0;
			current.volume = config.audio ? audioVolume : 0;

			current.play();
		}
	};


	function fadeOut(){

		var current = display.tracks.current;

		current.volume = Math.max( current.volume - diff, 0 );

		if ( --timer ) {

			setTimeout( fadeOut, 1000 );

		} else {

			timer = config.audioFading;

			display.tracks.next.play();

			fadeIn();
		}
	}

	function fadeIn(){

		var next = display.tracks.next;

		if ( config.audio )	next.volume = Math.max( audioVolume - timer * diff, 0 );

		if ( --timer ) {

			setTimeout( fadeIn, 1000 );

		} else {

			display.tracks.current = next;
		}
	}

})();
