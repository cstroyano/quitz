// Controlador de preguntas

// Importar el modelo

var modelo = require( "../models/models.js" );


// Autoload	-> Carga el objeto Quiz con los datos de una pregunta cuando se recibe un Id
exports.load = function( req, res, next, quizId ) {

	modelo.Quiz.findById( quizId ).then(

		function( quiz ) {
			if ( quiz ) {
				req.quiz = quiz;
				next();
			}
			else {
				next( new Error( "No existe el identificador de pregunta " + quizId ) );
			}
		}

	).catch( function( error ) { next( error ); } );
};


// GET /quizes		-> Mostrar la lista de preguntas
exports.index = function( req, res ) {

	var filtro = ( req.query.search || "" );

	console.log( "\n*** index ***\nreq.query.search: [" + filtro + "]" );

	modelo.Quiz.findAll( { where: ["pregunta like ?", "%" + filtro + "%" ], order: "pregunta" } ).then(
			function( quizes ) {
				res.render( "quizes/index.ejs", { quizes: quizes, filtro: filtro, errors: [] } );
			}
		).catch( function( error ) { next( error ); } );

};


// GET /quizes/show		-> Mostrar una pregunta
exports.show = function( req, res ) {

	console.log( "\n*** show***\nreq.quiz.id = " + req.quiz.id );
	
	res.render( "quizes/show", { quiz: req.quiz, errors: [] } );

};


// GET /quizes/answer	-> Mostrar una respuesta
exports.answer = function( req, res ) {
	var resultado = "";
	var archivo = "";

	console.log( "\n*** answer ***\nreq.quiz.id = " + req.quiz.id );
	console.log( "Respuesta en get: " + (req.query.respuesta || "Vacío" ) );
	console.log( "Respuesta en BBDD: " + ( req.quiz.respuesta || "Sin respuesta" ) );

	if ( ( req.query.respuesta || "Vacío" ).toLowerCase() === ( req.quiz.respuesta || "Sin respuesta" ).toLowerCase() ) {
		resultado = "Correcta";
		archivo = "acierto.png";
	}
	else {
		resultado = "Incorrecta";
		archivo = "fallo.png";
	}
	
	res.render( "quizes/answer", { quiz: req.quiz, respuesta: resultado, archivo: archivo, errors: [] } );

};


// GET /quizes/new		-> Formulario de alta de pregunta
exports.new = function( req, res ) {
	var quiz = modelo.Quiz.build( { pregunta: "Pregunta", respuesta: "Respuesta", desTema: "Otro" } ); // Crear objeto Quiz

	console.log( "\n*** new ***\n" );

	modelo.Tema.findAll( { order: "desTema" } ).then(
		function( temas ) {
			res.render( "quizes/new", { quiz: quiz, temas: temas, errors: [] } );
		}
	).catch( function( error ) { next( error ); } );
};


// GET /quizes/edit		-> Editar una pregunta
exports.edit = function( req, res ) {
	var quiz = req.quiz;

	console.log( "\n*** edit ***\n" );

	modelo.Tema.findAll( { order: "desTema" } ).then(
		function( temas ) {
			res.render( "quizes/edit", { quiz: quiz, temas: temas, errors: [] } );
		}
	).catch( function( error ) { next( error ); } );

};


// POST /quizes/create	-> Crea una nueva pregunta
exports.create = function( req, res ) {
	var quiz = modelo.Quiz.build( req.body.quiz );

	console.log( "\n*** create ***\n" );

	quiz.validate().then(
		function( err ) {

			if ( err ) {
				res.render( "quizes/new", { quiz: quiz, errors: err.errors } );
			}
			else {
				quiz.save( { fields: [ "pregunta", "respuesta", "desTema" ] } ).then(
					function() {
						res.redirect( "/quizes" ); // Redirige a la lista de preguntas.
					}

				).catch( function( error ) { next( error ); } ); // final del quiz.save().then().catch()

			} // Final del if-else

		} // Final del function( err )

	); // Final del quiz.validate().then()

};


// PUT /quizes 		-> Modifica una pregunta en base de datos.
exports.update = function( req, res ) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.desTema = req.body.quiz.desTema;

	console.log( "\n*** update ***\n" );

	req.quiz.validate().then(
		function( err ) {
			if ( err ) {
				res.render( "quizes/edit", { quiz: quiz, errors: err.errors } );
			}
			else {
				req.quiz.save( { fields: [ "pregunta", "respuesta", "desTema" ] } ).then(
					function() {
						res.redirect( "/quizes" ); // Redirige a la lista de preguntas.
					}

				).catch( function( error ) { next( error ); } ); // final del quiz.save().then().catch()

			} // Final del if-else

		} // Final del function( err )

	); // Final del req.quiz.validate().the()
};


// DELETE /quizes		-> Borra una pregunta
exports.destroy = function( req, res ) {

	console.log( "n*** destroy ***\n" );

	req.quiz.destroy().then(
		function() {
			res.redirect( "/quizes" );
		}
	).catch( function( errror ) { next( error ); } );
};
