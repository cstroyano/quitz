// Controlador de sesiones

// Middleware de autorización de accesos HTTP restringidos
exports.loginRequerido = function( req, res, next ) {

	if ( req.session.user ) {
		next();
	}
	else {
		res.redirect( "/login" );
	}

};

// GET /login	-> Mostrar el formulario de login
exports.new = function( req, res ) {
	var errors = req.session.errors || {};	// Guarda los errores de sesión
	req.session.errors = {};				// Inicializa los errores

	res.render( "sessions/new", { errors: errors} );

};


// POST /login	-> Crear la sesión
exports.create = function( req, res ) {

	var login = req.body.login;
	var password = req.body.password;

	var userController = require( "./user_controller" );
	userController.autenticar( login, password, function( error, user ) {

		if ( error ) {
			req.session.errors = [ { "message": "Se ha producido un error: " + error } ];
			res.redirect( "/login" );
		}
		else {	// Crear req.session.user y guardar campos id y username.

			req.session.user = { id: user.id, username: user.username };
			res.redirect( req.session.redir.toString() );	// Redirigir al path anterior al login
		}


	} ); // Final del userController.autenticar()

};


// DELETE /login	-> Destruir la sesión
exports.destroy = function( req, res ) {
	delete req.session.user;

	res.redirect( req.session.redir.toString() );	// Redirigir al path anterior al login
};