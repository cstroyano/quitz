// Controlador de temas

var modelo = require( "../models/models.js" );	// Importar el modelo


// Autoload -> Cargar el objeto tema cuando se recibe un Id tema

exports.load = function( req, res, next, temaId ) {

	modelo.Tema.findById( Number( temaId ) ).then(
		function( tema ) {

			console.log( "\n*** temas_controller.load (" + temaId + ") ***\n" );

			if ( tema ) {
				req.tema = tema;
				next();
			}
			else {
				next( new Error( "No existe el tema con Id = " + temaId ) );

			} // Final del if-else

		} // Final del function();

	).catch( function( error ) { next( error ) } ); // Final del  modelo.Tema.findById().then.catch()
};


// GET /temas 			-> Mostrar la lista de temas

exports.index = function( req, res, next ) {

	console.log( "\n*** temas_controller.index ***" );

	modelo.Tema.findAll( { order: "destema" } ).then(
		function( temas ) {
			var err = ( req.session.errors || {} );
			req.session.errors = {};

			res.render( "temas/index.ejs", { temas: temas, errors: err } );
		}
	).catch( function( error ) { next( error ) } );
};


// GET /temas/new		-> Formulario de creación de tema

exports.new = function( req, res ) {

	console.log( "\n*** temas_controller.new ***" );

	var tema = modelo.Tema.build( { destema: "Tema" } );

	res.render( "temas/new", { tema: tema, errors: [] } );
};


// POST /temas/create	-> Crear un nuevo tema

exports.create = function( req, res ) {
	var tema = modelo.Tema.build( req.body.tema );

	console.log( "\n*** temas_controller.create ***\n\t-> Tema: " + tema.destema + "\n" );

	tema.validate().then(
		function( error ) {

			if ( error ) {
				res.render( "/temas/new", { tema: tema, errors: error } );
			}
			else {
				tema.save( { fields: [ "destema" ] } ).then(
					function() {
						res.redirect( "/temas" );
					}
				).catch( function( error ) { res.render( "/temas/new", { tema: tema, errors: error } ); } ); // Final del tema.save().then()
			}

		} // Final del function( error )
	).catch( function( error ) { res.render( "/temas/new", { tema: tema, errors: error } ); } ); // Final del tema.validate().then()
};


// DELETE /temas/:temaId	-> Borrar tema

exports.destroy = function( req, res, next ) {

	console.log( "n*** temas.controller.destroy ***\n\t-> Tema: " + req.tema.destema + "\n\t-> Id: " + req.tema.id + "\n" );

	modelo.Quiz.count( { where: [ "temaid = ?", req.tema.id ] } ).then(
		function( cuenta ) {
			if ( cuenta === 0 ) {
				req.tema.destroy().then(
					function() {
						res.redirect( "/temas" );
					}
				); // Final del req.tema.destroy().then()
			}
			else {
				req.session.errors = [ { "message": "El tema '" + req.tema.destema + "' tiene preguntas creadas" } ];
				res.redirect( "/temas" );
			}

		} // Final de function( cuenta )

	).catch( function( error ) {
					req.session.errors = [ { "message": "Error buscando el número de preguntas del tema" } ];
					res.redirect( "/temas" );
				}
	); // Final del modelo.Quiz.count().then().catch
};

