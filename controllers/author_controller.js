// Controlador de página de autor


// GET /author
exports.author = function( req, res ) {
	res.render( "author", { autor: "César Sepúlveda", errors: [] } );
}
