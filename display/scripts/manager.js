(function(){

	var Manager = display.Manager = function()  {

		this.playerList = [];

		this.grid = new display.Grid();

		this.obstaclePool = new display.ObstaclePool();

		this.statusManager = new display.StatusManager();

		this.background = new display.Background();

		this.render();

		display.Connection.prototype.manager = this;
		display.Debug.prototype.manager = this;
	};


	Manager.prototype.render = function(){

		(function loop ( delta ) {

			forAll( this.playerList, 'update', delta );

			forAll( this.obstaclePool.list, 'update', delta );

			this.background.update( delta );


			this.screen.clear(); // prototype

			this.background.draw();

			forAll( this.playerList, 'draw' );

			forAll( this.obstaclePool.list, 'draw' );

			this.statusManager.draw();


			requestAnimationFrame( loop.bind(this) );

		}.bind(this) )();


		function forAll ( collection, method, delta ) {

			for ( var i = 0, l = collection.length, el; i < l; i++ ) {

				el = collection[i];

				if ( el && el.visible ) { // undefined.()

					el[method]( delta );
				}
			}
		}
	};



	Manager.prototype.handle = function ( action, options ) {

        var commands = {

			1	: this.init,
			2	: this.countdown,
			3	: this.start,
			4	: this.move,
			5	: this.heal,
			6	: this.create,
			7	: this.collide
		};

		console.log(action, options);

		commands[ action ].call( this, options );
	};



	Manager.prototype.countdown = function() {

		console.log('countdown...');
	};


	Manager.prototype.init = function ( channelId ) {

        var qrCode = "http://game.neurron.com/controller/#" + channelId;

        var element = document.getElementById("qrcode");

        qrCode = showQRCode(qrCode, {r: 0, g: 0, b: 255});

        if ( element.lastChild ) {

			element.replaceChild(qrCode, element.lastChild);

        } else {

			element.appendChild(qrCode);
        }

	};

	/* playerlist */
	Manager.prototype.start = function ( params ) {

		this.grid.init({

			players: 8,				// players.length,
			distanceToUser: 350,
			circleOffset: 100,
			circles: 0,
			factor: config.factor
		});

        // this.init(2);
		this.playerList	= new display.PlayerList( params[0] );

		this.statusManager.init( this.playerList );

        new display.Debug();
	};


	/* playerId - nextPos */
	Manager.prototype.move = function ( params ) {

		this.playerList[ params[0]-1 ].move( params[1] );
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
	Manager.prototype.collide = function ( params ) {

		this.statusManager.handleCollide( params[0], params[1] );
	};


})();


