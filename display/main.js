(function(){

    var assetManager = display.AssetManager;

    assetManager.set( config.assets, function() {

        new display.Screen();

        new display.Manager();

        new display.Connection();

        display.show( 'start' );
    });


    display.Element.prototype.assetManager = assetManager;
    display.Background.prototype.assetManager = assetManager;

})();
