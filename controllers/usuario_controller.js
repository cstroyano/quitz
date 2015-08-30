// Controlador de existencia de usuarios

var modelo = require( "../models/models.js" );	// Importar el modelo


exports.autenticar = function( login, password, callback ) {

	console.log( "\n*** usuario_controller.autenticar()\n" );

	modelo.Usuario.find( { where: { username: login }, include: [ { model: modelo.Perfil } ] } )
		.then( function( usuario ) {
			
			if ( usuario ) {
				if ( password === usuario.password ) {
					callback( null, usuario );
				}
				else {
					callback( new Error( "Password incorrecta" ) );
				}
			}
			else {
				callback( new Error( "Usuario no encontrado" ) );
			}
		} );
};

// Autoload => Carga el Usuario con los datos del usuario cuyo código se recibe en la URL

exports.load = function( req, res, next, usuarioId ) {

	console.log( "\n*** usuario_controller.load() - " + usuarioId + "\n" );

	modelo.Usuario.find( { where: { id: Number( usuarioId ) }, include: [ { model: modelo.Perfil } ] } )
		.then( function( usuario ) {

			if ( usuario ) {
				req.usuario = usuario;
				next();
			}
			else {
				next( new Error( "No existe el identificador de usuario " + usuarioId ) );
			}

		} );
};
