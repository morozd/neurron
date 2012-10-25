(function(){

	var Screen = controller.Screen = function ( config ) {

		this.width = config.width;
		this.height = config.height;

		this.createCanvas();
	};


	Screen.prototype.createCanvas = function(){

		var canvas = document.createElement('canvas');

		this.ctx = canvas.getContext('2d');
		this.cvs = canvas;

		this.scale();

		document.body.appendChild( this.cvs );

		window.addEventListener('resize', this.scale.bind( scale ) );
		window.addEventListener('orientationchange', this.scale.bind( scale ) );
	};

	Screen.prototype.scale = function() {

		this.cvs.width = window.innerWidth;
		this.cvs.height = window.innerHeight;
	};

})();
