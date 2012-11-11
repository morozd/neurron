(function(){

	var Manager = display.Manager = function()  {

		this.playerList = [];

		this.obstaclePool = new display.ObstaclePool();

		this.statusManager = new display.StatusManager();

		this.background = new display.Background();

		this.render();

		display.Connection.prototype.manager = this;
		display.Debug.prototype.manager = this;
	};


	Manager.prototype.render = function(){

		(function loop(){

			requestAnimationFrame( loop.bind(this) );


			this.screen.clear(); // prototype


			forAll( this.playerList, 'update' );

			forAll( this.obstaclePool.list, 'update' );

			this.background.update();
			this.background.draw();

			forAll( this.playerList, 'draw' );

			forAll( this.obstaclePool.list, 'draw' );

			this.statusManager.draw();



		}.bind(this) )();


		function forAll ( collection, method ) {

			for ( var i = 0, l = collection.length, el; i < l; i++ ) {

				el = collection[i];

				if ( el && el.visible ) { // undefined.()

					el[method]();
				}
			}
		}
	};




	Manager.prototype.handle = function ( action, options ) {

		var commands = {

			1	: this.init,
			2	: this.start,
			3	: this.move,
			4	: this.heal,
			5	: this.create,
			6	: this.collide
		};

		commands[ action ].call( this, options );
	};




	Manager.prototype.init = function ( channelId ) {

		console.log('Create QR-code from: ', channelId );
	};


	Manager.prototype.start = function ( players ) {

		new display.Grid({

			players: 10,//players.length,
			frames: 30,
			distanceToUser: 350,
			circleOffset: 100,
			circles: 0
		});

		this.playerList	= new display.PlayerList( players );

		new display.Debug();
	};


	/* playerId - nextPos */
	Manager.prototype.move = function ( params ) {

		this.playerList[ params[0] ].move( params[1] );
	};

	/* playerId - targets */
	Manager.prototype.heal = function ( params ) {

		this.statusManager.handleHeal( params[0], params[1] );
	};


	/* obstacleId - category - start */
	Manager.prototype.create = function ( params ) {

		this.obstaclePool.get( params[0], params[1], params[2] );
	};


	/* obstacleId - players */
	Manager.prototype.collide = function( params ) {

		this.statusManager.handleCollide( params[0], params[1] );
	};


})();


