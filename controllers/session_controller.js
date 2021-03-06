// Controlador de sesiones

// Middleware de autorización de accesos HTTP restringidos
exports.loginRequerido = function( req, res, next ) {

	console.log( "*** session_controller.loginRequerido ***\n\tURL: " + req.originalUrl );

	if ( req.session.user ) {
		console.log( "\tNivel usuario: " + req.session.user.nivel );
		next();
	}
	else {
		//req.session.errors = [ { "message": "Es necesario logarse para acceder a esa opción" } ];
		//res.redirect( "/login" );
		res.render( "errors/privilegios.ejs", { errors: [ new Error( "Privilegios insuficientes para acceder a esta opción" ) ] } );
	}

};


// Middleware de autorización para usuarios con perfil administrador
exports.adminRequerido = function( req, res, next ) {

	console.log( "*** session_controller.adminRequerio ***\n\tURL: " + req.originalUrl );

	if ( req.session.user && req.session.user.nivel === 0 ) {
		console.log( "\tNivel usuario: " + req.session.user.nivel );
		next();
	}
	else {
		res.render( "errors/privilegios.ejs", { errors: [ new Error( "Privilegios insuficientes para acceder a esta opción" ) ] } );
	}
}


// Middleware de autorización para usuarios con perfil administrador
exports.nivel10Requerido = function( req, res, next ) {

	console.log( "*** session_controller.adminRequerio ***\n\tURL: " + req.originalUrl );

	if ( req.session.user && req.session.user.nivel <= 10 ) {
		console.log( "\tNivel usuario: " + req.session.user.nivel );
		next();
	}
	else {
		res.render( "errors/privilegios.ejs", { errors: [ new Error( "Privilegios insuficientes para acceder a esta opción" ) ] } );
	}
}


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

	var userController = require( "./usuario_controller" );
	userController.autenticar( login, password, function( error, user ) {

		if ( error ) {
			req.session.errors = [ { "message": "Se ha producido un error: " + error } ];
			res.redirect( "/login" );
		}
		else {	// Crear req.session.user y guardar campos id y username.

			req.session.user = { id: user.id, username: user.username, nivel: user.Perfil.nivel };
			res.redirect( req.session.redir.toString() );	// Redirigir al path anterior al login
		}


	} ); // Final del userController.autenticar()

};


// DELETE /login	-> Destruir la sesión
exports.destroy = function( req, res ) {
	delete req.session.user;

	res.redirect( req.session.redir.toString() );	// Redirigir al path anterior al login
};

