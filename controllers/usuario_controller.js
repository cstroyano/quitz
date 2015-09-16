// Controlador de existencia de usuarios

var modelo = require( "../models/models.js" );	// Importar el modelo


// Comprueba si el usuario está logado

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


// GET /usuario/index -> Muestra la lista de usuarios
exports.index = function( req, res, next ) {

	console.log( "\n*** usuario_controller.index()\n" );

	modelo.Usuario.findAll( { order: "username", include: [ { model: modelo.Perfil } ] } )
		.then( function( usuarios ) {
	
			res.render( "usuarios/index", { usuarios: usuarios, errors: [] } );
	
		} ).catch( function( error ) { next( error ) } );
};


// GET /usuarios/new -> Muestra el formulario de nuevo usuario
exports.new = function( req, res ) {

	console.log( "\n*** usuario_controller.index ***\n" );

	modelo.Perfil.findAll( { order: "nivel" } )
		.then( function( perfiles ) {

			var usuario = modelo.Usuario.build( { username: "usuario", password: "password", PerfilId: perfiles[ perfiles.length - 1 ].id } );
			res.render( "usuarios/new", { usuario: usuario, perfiles: perfiles, errors: [] } );

		} );
};


// POST /usuarios/create -> Crea un nuevo usuario en la aplicación
exports.create = function( req, res ) {
	var usuario = modelo.Usuario.build( req.body.usuario );

	console.log( "\n*** usuario_controller.create ***" );
	console.log( "\t- username: " + usuario.username );
	console.log( "\t- password: " + usuario.password );
	console.log( "\t- PerfilId: " + usuario.PerfilId + "\n" );

	usuario.validate().then( function( err ) {

		if ( err ) {
			modelo.Perfil.findAll( { order: "nivel" } )
				.then( function( perfiles ) {
					res.render( "usuarios/new", { usuario: usuario, perfiles: perfiles, errors: err.errors } );
				});
		}
		else {
			usuario.save( { fields: [ "username", "password", "PerfilId" ] } )
				.then( function() {
					res.redirect( "/usuarios" );

				} ).catch( function( err ) {
						modelo.Perfil.findAll( { order: "nivel" } )
							.then( function( perfiles ) {
								res.render( "usuarios/new", { usuario: usuario, perfiles: perfiles, errors: err.errors } );
						} );

					} );
		}
	} );

};

// DELETE //usuarios/destroy	-> Borra el usuario seleccionado
exports.destroy = function( req, res ) {

	console.log( "\n*** usuario_controller.create ***" );
	console.log( "\t- username: " + req.usuario.username );
	console.log( "\t- password: " + req.usuario.password );

	req.usuario.destroy().then( function() { res.redirect( "/usuarios" ); });
};
