(function(){

	var Manager = display.Manager = function()  {

		this.playerList = [];

		this.grid = new display.Grid();

		this.obstaclePool = new display.ObstaclePool();

		this.statusManager = new display.StatusManager();

		this.background = new display.Background();

		display.Connection.prototype.manager = this;
		display.Debug.prototype.manager = this;
	};


	Manager.prototype.render = function(){

		var last = 0,

			delta;


		function loop ( time ) {

			delta = time - last;

			forAll( this.playerList, 'update', delta );

			forAll( this.obstaclePool.list, 'update', delta );

			this.background.update( delta );


			this.screen.clear(); // prototype

			this.background.draw();

			forAll( this.playerList, 'draw' );

			forAll( this.obstaclePool.list, 'draw' );

//			this.statusManager.draw(); // statusManager doesnt need to be drawn, it is drawn when something is updated


			last = time;

			requestAnimationFrame( loop.bind(this) );
		}

		requestAnimationFrame( function(time) {

				last = time;

				loop.call(this, time);
			}.bind(this) );


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


	Manager.prototype.countdown = function() {

		console.log('countdown...');
	};


	/* playerlist */
	Manager.prototype.start = function ( params ) {


		this.grid.init({

			lanes: params[0],
			circleOffset: config.circleOffset,
			distanceToUser: config.distanceToUser,
			factor: config.factor,
			circles: config.circles,
			players: params[1].length
		});


		this.render();

		this.playerList	= new display.PlayerList( params[1] );

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

		console.time(1);

		this.obstaclePool.get( params[0], params[1], params[2] );
	};


	/* obstacleId - players */
	Manager.prototype.collide = function ( params ) {

		this.statusManager.handleCollide( params[0], params[1] );
	};


})();


