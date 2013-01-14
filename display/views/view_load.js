(function(){

	var $container = $('#container'),
		$body = $(document.body);

	display.views.load = (function(){

		var left = '\
		<div id="load_outerwrapper" class="load_outerwrapper">\
			<div id="load_innerwrapper" class="load_innerwrapper round">\
				<div id="load_teamname" class="load_teamname"></div>\
				<img id="load_bar" class="load_bar" src="assets/views/load/blink/load.gif"/>\
				<div id="tutorial" class="load_background_wrapper load_tutorial">\
					<video poster="assets/views/load/tutorial/load_background.jpg" controls preload="auto" class="tutorial">\
						<source src="assets/views/start/test.mp4" type="video/mp4" />\
						<source src="assets/views/start/test.ogv" type="video/ogg" />\
						The browser doesn\'t support any of the provided formats...\
					</video>\
				</div>\
				<div id="progressbar" class="progressbar"></div>\
			</div>\
		</div>',

		right = '<div id="load_register_status" class="joined round"></div>';

		return { left: left, right: right };

	})();

	display.load_view.playerNums = 0;


	display.load_view.showNewPlayer = function(){

		// fading animation
		setTimeout(function(){

			display.load_view.playerNums++;

			var element = document.getElementById('load_register_status'),
				pathToImages = config.viewAssets + '/load/icons/',
				image = new Image();

			image.onload = function(){ element.appendChild(image); };
			image.src = pathToImages + 'neurron_' + display.load_view.playerNums + '.png';

		}, 1000);
	};

	display.load_view.clearLoadScene = function(){

		display.load_view.playerNums = 0;

		var loadBar = document.getElementById('load_bar'),
			load_teamname = document.getElementById('load_teamname');

		// remove images
		document.getElementById('load_register_status').innerHTML = '';

		loadBar.className = ''; // show loadBar
		if ( $(load_teamname).html() !== "" ) load_teamname.removeChild( document.getElementById('load_greet') ); // remove Team greeting

        if ( !progressbar ) progressbar = $('#progressbar');
        progressbar.removeClass('fill');

		// $('#container').addClass("backgroundImage");
		// $('#container-right').removeClass("marginTopPadding");
		// $('#qr_code img').removeClass("halfQR");
	};

	display.load_view.hideLoadBar = function() {

		document.getElementById('load_bar').className = 'load_hide';
	};

	display.load_view.greetTeam = function() {

		var element = document.getElementById('load_teamname'),
			greetBox = document.createElement('span');

		greetBox.id = 'load_greet';
		greetBox.className = 'greetings';

		greetBox.innerHTML = 'Hi ' + ( display.teamname ? 'team ' + display.teamname : 'neurrons' );
		element.appendChild(greetBox);
	};


	var progressbar;

	display.load_view.loadBar = function(seconds) {

		if ( !progressbar ) progressbar = $('#progressbar');

        progressbar.addClass('fill');
	};

	var tutorial;

	display.logic.load = function(){

		if ( !tutorial ) tutorial = document.getElementById('tutorial').children[0];

		tutorial.src = 'views/load/index.html';

		$('#container').removeClass("backgroundImage");
		$('#container-right').addClass("marginTopPadding");
		$('#qr_code img').addClass("halfQR");
	};

})();
