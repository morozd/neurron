(function(){

	display.views.start = (function(){

		var left = '\
		<div class="slider_content_wrap">\
			<div class="logo">\
				<img src="style/images/neurron_logo.png" width="356" height="113" alt="neurron logo" />\
				<div class="subtitle">END OF THE TUNNEL</div>\
			</div>\
			<div id="slider_box_wrap" class="slider_box_wrap">\
				<ul>\
					<li id="intro_button"class="button button_color intro_button"><p>Story</p></li>\
					<li id="play_button" class="button button_color play_button"><p>Gameplay</p></li>\
					<li id="demo_button" class="button button_color demo_button"><p>Controls</p></li>\
				</ul>\
				<div class="dashboard round"></div>\
				<ul id="screen_wrap" class="screen_wrap round">\
					<li id="intro" class="screen js_screen">\
						<video poster="assets/views/load/load_background.jpg" controls preload="auto">\
							<source src="assets/views/start/test.mp4" type="video/mp4" />\
							<source src="assets/views/start/test.ogv" type="video/ogg" />\
							The browser doesn\'t support any of the provided formats...\
						</video>\
					</li>\
					<li id="how2play" class="screen js_screen">\
						<img class="video"  src="http://company.zynga.com/nfs/files-0925-01/coasterville_flat_0.png" />\
					</li>\
					<li id="demo" class="screen js_screen">\
						<img class="video"  src="http://www.pc-games-blog.net/wp-content/uploads/2012/10/League_of_Legends_lan-600x351.jpg" />\
					</li>\
				</ul>\
			</div>\
		</div>\
		';

		return {

			left    : left
		};

	})();


	// Cache
	var video, music;

	display.logic.start = function(){

		if ( video ) {

			start();

		} else { // first time

			music = display.getAsset('audio', 'start');
			music.loop = true;

			video = $('#intro').children()[0];
			video.volume = 0;

			$(video).on('loadedmetadata', start );
		}
	};


	function start(){

		display.sound( music );

		var duration = {

				intro : ~~( video.duration * 1000 + 0.5),
				how2play : 4000,
				demo : 4000
			},

			$items = $("#screen_wrap li"),

			$buttons = $("#slider_box_wrap li"),

			timer = 0;

			counter = 0,

			itemsLength = $items.length;

		$($buttons).click(function(){

			$($buttons[counter]).removeClass('button_active');
			$($items[counter]).fadeOut();
			counter = $(this).index();
			clearTimeout(timer);
			timeOut();

		});

		//set time out
		var timeOut = function(){

			var currentId = $items[counter].id,

				durationTime = duration[currentId];

			$($items[counter]).fadeIn();
			$($buttons[counter]).addClass('button_active');
			//$buttons[counter].className += " button_active";

			if ( currentId === 'intro' ) video.play();

			if ( video.currentTime !== 0 ) {

				video.pause();
				video.currentTime = 0;
			}


			timer = setTimeout(function() {

				$($items[counter]).fadeOut();
				$($buttons[counter]).removeClass('button_active');
				counter++;

				if( counter >= itemsLength ) counter = 0;

				timeOut();

			}, durationTime);
		};

		timeOut();
	}


})();
