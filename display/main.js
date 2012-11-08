(function(){

    var main = function( assets ) {

		var controller = new display.Controller(),

			screen = new display.Screen({

				width			: config.canvas.width,
				height			: config.canvas.height,
				frames			: 30
			}),

			grid = new display.Grid({

				origin			: screen.ctx,
				frames			: screen.frames,
				players			: 10,
				distanceToUser	: 350,
				circleOffset	: 100,
				circles			: 0
			}),

			connection = new display.Connection({

				controller		: controller,
				server			: config.server,
				port			: config.port
			});


		// Element references
		display.Element.prototype.grid = grid;
		display.Element.prototype.assets = assets;
		display.Element.prototype.screen = screen;


		screen.obstacles.push( grid );

		/* debug */

		debug( screen, grid, controller, connection );
	};

	// pre-loading assets
    new display.AssetManager( config.assets, main );

})();
