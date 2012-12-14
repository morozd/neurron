(function(){

    /**
     * [Box description]
     */
	var Box = controller.Box = function() {

        var type = 'button',
            text = 'Start';

        this.width = 200;
        this.height = 100;
        this.left = 0;
        this.top = 0;

        this.disabled = false;


        this.createButton();

        this.set( type, text );
//        this.manager.handle( config.commands.REGISTER ); // uncomment for dev
	};


    /**
     * [ description]
     * @param  {[type]}
     * @return {[type]}   [description]
     */
    window.addEventListener('orientationchange', function() {

        document.getElementById('text').style['z-index'] = 1;

    }.bind(this) );



    /**
     * [createButton description]
     * @return {[type]} [description]
     */
    Box.prototype.createButton = function(){

        var box = document.createElement('div');

        box.id = 'box';


        var text = document.createElement('div');

        text.id = 'text';

        box.appendChild( text );

        document.body.appendChild( box );
    };


    /**
     * [click description]
     * @return {[type]} [description]
     */
	Box.prototype.click = function(){

        if ( !this.disabled ) { // no proper remove...

            this.manager.handle( config.commands.REGISTER );

            this.removeListener();
        }

    };


    /**
     * [addListener description]
     */
    Box.prototype.addListener = function(){

        this.disabled = false;

        document.getElementById('box').addEventListener('touchend', this.click.bind(this) );
    };


    /**
     * [removeListener description]
     * @return {[type]} [description]
     */
    Box.prototype.removeListener = function(){

        this.disabled = true;

        document.getElementById('box').removeEventListener('touchend', this.temp );
    };



    /**
     * [set description]
     * @param {[type]} type [description]
     * @param {[type]} text [description]
     */
    Box.prototype.set = function( type, text ){

        var box = document.getElementById('box');
            form = document.getElementById('form');

        if (form) form.className += ' hide';

        // box.className = ( type === 'button' ) ? 'button' : 'label';
        box.className = type + ' show';

        document.getElementById('text').textContent = text;

        if ( type === 'button' ) {

            this.input.disable();

            this.addListener();
        }

        if ( type === 'form' ) {

            if ( !form ) {

                form = document.createElement('input');
                form.type = 'name';
                box.appendChild( form );
            }

            form.className = 'form show';
        }
    };


    /**
     * [hide description]
     * @return {[type]} [description]
     */
    Box.prototype.hide = function(){

       document.getElementById('box').className = ' hide'; // +=
    };



})();
