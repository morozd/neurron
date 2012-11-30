/* global namespace */
window.display = {

	views: {}
};

/* configurations */
window.config = {


	server				: 'game.neurron.com',
	port				: '2020',

    countdown           : 15,
    gameTime            : 2,


    factor				: 4,		// offset for statusbar and grid
    amountToHeal		: 10,		// how much a player can heal
    punishPoints		: 1000,



	circleOffset		: 100,
	distanceToUser		: 150,

    circles				: 10,		// sync with server
    frames				: 30,


    duration: {

		moveTime		: 1200		// 1.2s, sync with server
    },


    // colors for lifeBars
    colorLimits: {

        red				: 20,
        orange			: 60
    },


	elements: {

		size			: 40
	},

	assets: {

		image: {

			player		: 'assets/player.png',

			damage		: 'assets/damage.png',
			heal		: 'assets/heal.png',
			points		: 'assets/points.png',

			background	: 'assets/background.jpg',


			collision: {

				src		: 'assets/explosion-sprite-sheet.png',
				width	: '64'
			}

		},

		audio: {

			collision	: 'assets/collision-test.wav'
		}
	},



	// magic numbers
	protocol: {

		POLLING			: 0,

		INIT			: 1,
		COUNTDOWN		: 2,
		START			: 3,
		MOVE			: 4,
		HEAL			: 5,
		CREATE			: 6,
		COLLISION		: 7,
        END             : 8
	},


	// categories
	obstacles: {

		1: {
			type			: 'damage',
			size			: 1*80,
			velocity		: 1,
			value			:  10,
			color			: [ 213,  10,  50 ], // red
			collisionImg	: 'collision',
			collisionSound	: 'collision'
		},

		2: {
			type			: 'heal',
			size			: 1*80,
			velocity		: 1,
			value			:  10,
			color			: [   0, 170,  30 ], // green
			collisionImg	: 'collision',
			collisionSound	: 'collision'
		},

		3: {
			type			: 'points',
			size			: 1*80,
			velocity		: 1,
			value			: 100,
			color			: [ 240, 220,  10 ], // yellow
			collisionImg	: 'collision',
			collisionSound	: 'collision'
		},

		4: {
			type			: 'points',
			size			: 1*80,
			velocity		: 1,
			value			: 50,
			color			: [ 240, 220,  10 ],
			collisionImg	: 'collision',
			collisionSound	: 'collision'
		}

	},


	player: {

		velocity: 3
	},



    playerColors: {
        1: {r: 255,  g:   0, b:   0},
        2: {r: 255,  g: 255, b:   0},
        3: {r: 255,  g:   0, b: 255},
        4: {r:   0,  g: 255, b:   0},
        5: {r:   0,  g: 255, b: 255},
        6: {r:   0,  g:   0, b: 255},
        7: {r:   0,  g:   0, b: 255},
        8: {r: 128,  g:   0, b:   0},
        9: {r: 128,  g: 128, b:   0},
        10: {r: 128,  g:   0, b: 128},
        11: {r:   0,  g: 128, b:   0},
        12: {r:   0,  g: 128, b: 128},
        13: {r:   0,  g:   0, b: 128},
        14: {r:   0,  g:   0, b: 128}
    }
};
