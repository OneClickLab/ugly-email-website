var express = require( 'express' ),
    path = require( 'path' ),
    app = express();

app.use( express.static( './public' ) );

app.get( '/glass', function ( req, res ){
    res.sendFile( path.join( __dirname, 'views/glass.html') );
});

app.get( '/*', function ( req, res ){
    res.sendFile( path.join( __dirname, 'views/index.html') );
});

var server = app.listen( 5000, function() {
    console.log( 'Listening on port %d', server.address().port );
});
