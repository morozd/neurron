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

		window.onresize = this.scale;
		window.onorientationchange = this.scale;
	};

	Screen.prototype.scale = function() {

		this.cvs.width = window.innerWidth - window.innerWidth/100;
		this.cvs.height = window.innerHeight - window.innerHeight/100;
	};

})();
