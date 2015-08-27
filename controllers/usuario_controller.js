// Controlador de existencia de usuarios

var modelo = require( "../models/models.js" );	// Importar el modelo


exports.autenticar = function( login, password, callback ) {

	modelo.Usuario.find( { where: { username: login }, include: [ { model: modelo.Perfil } ] } )
		.then( function( usuario ) {

			console.log( "*** usuario_controller.autenticar()" );
			
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
