(function(){

	var Background = display.Background = function(){

		this.img = this.assetManager.get('image', 'background');

		display.Debug.prototype.background = this; // testing
	};



	Background.prototype.update = function(){


	};


	Background.prototype.draw = function(){

        this.screen.ctx.drawImage( this.img, 0, 0,this.screen.cvs.width, this.screen.cvs.height );
	};

})();
