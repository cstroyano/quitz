// Controlador de preguntas

// Importar el modelo

var modelo = require( "../models/models.js" );


// Autoload	-> Carga el objeto Quiz con los datos de una pregunta cuando se recibe un Id
exports.load = function( req, res, next, quizId ) {

	console.log( "\n*** quiz_controller.load *** -" + quizId + "\n" );

	modelo.Quiz.find( { where:	{ id: Number( quizId ) },
						include: [ { model: modelo.Comment } ] } ).then(

		function( quiz ) {

			if ( quiz ) {
				req.quiz = quiz;
				next();
			}
			else {
				next( new Error( "No existe el identificador de pregunta " + quizId ) );
			}
		}

	).catch( function( error ) { next( error ); } ); // Final del modelo.Quiz.find().then()
};


// GET /quizes		-> Mostrar la lista de preguntas
exports.index = function( req, res, next ) {

	var filtro = ( req.query.search || "" );

	console.log( "\n*** quiz_controller.index ***\n\treq.query.search: [" + filtro + "]\n" );

	modelo.Quiz.findAll( { where: ["pregunta like ?", "%" + filtro + "%" ],
							order: "pregunta",
							include: [ { model: modelo.Tema } ] } ).then(
			function( quizes ) {

				res.render( "quizes/index.ejs", { quizes: quizes, filtro: filtro, errors: [] } );
			}
		).catch( function( error ) { next( error ); } );

};


// GET /quizes/:quizId(\\d+)		-> Mostrar una pregunta
exports.show = function( req, res ) {
	var index = 0;

	console.log( "\n*** quiz_controller.show***\n\treq.quiz.id = " + req.quiz.id + "\n" );
	
	res.render( "quizes/show", { quiz: req.quiz, errors: [] } );

};


// GET /quizes/:quizId(\\d+)/answer	-> Mostrar una respuesta
exports.answer = function( req, res ) {
	var resultado = "";
	var archivo = "";

	console.log( "\n*** quiz_controller.answer ***\n\treq.quiz.id = " + req.quiz.id );

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
	console.log( "\n*** quiz_controller.new ***\n" );

	modelo.Tema.findAll( { order: "destema" } ).then(
		function( temas ) {

			var quiz = modelo.Quiz.build( { pregunta: "Pregunta", respuesta: "Respuesta", TemaId: temas[ 0 ].id.toString() } ); // Crear objeto Quiz

			console.log( "quiz.pregunta = " + quiz.pregunta + "\n" + "quiz.respuesta = " + quiz.respuesta + "\n" + "quiz.TemaId = " + quiz.temaid + "\n" );

			res.render( "quizes/new", { quiz: quiz, temas: temas, errors: [] } );
		}
	);
};


// GET /quizes/:quizId(\\d+)/edit		-> Editar una pregunta
exports.edit = function( req, res ) {
	var quiz = req.quiz;

	console.log( "\n*** edit ***\nPregunta: " + quiz.pregunta + "\nRespuesta: " + quiz.respuesta + "\nTema: " + quiz.destema );

	modelo.Tema.findAll( { order: "destema" } ).then(
		function( temas ) {
			console.log( "Número de temas: " + temas.length + "\n" );
			res.render( "quizes/edit", { quiz: quiz, temas: temas, errors: [] } );
		}
	);

};


// POST /quizes/create	-> Crea una nueva pregunta
exports.create = function( req, res ) {
	var quiz = modelo.Quiz.build( req.body.quiz );
	var tema = modelo.Tema.build( req.body.tema );

	console.log( "\n*** create ***\nPregunta: " + quiz.pregunta + "\nRespuesta: " + quiz.respuesta + "\nTema: " + tema.destema );

	modelo.Tema.find( { where:	{ destema: tema.destema } } ).then( // Buscar el Id del tema

		function( temas ) {

				console.log( "\n*** Tema encontrado: " + temas.id + " - " + temas.destema );
		
				quiz.TemaId = temas.id;

				quiz.validate()
					.then( function( err ) {
			
						if ( err ) {
							modelo.Tema.findAll( { order: "destema" } )
								.then( function( temas ) {
									res.render( "quizes/new", { quiz: quiz, temas: temas, errors: err.errors } );
								} );
						}
						else {
							quiz.save( { fields: [ "pregunta", "respuesta", "TemaId" ] } )
								.then( function() {
									res.redirect( "/quizes" ); // Redirige a la lista de preguntas.

								} ).catch( function( error ) {
									modelo.Tema.findAll( { order: "destema" } )
										.then( function( temas ) {
											res.render( "quizes/new", { quiz: quiz, temas: temas, errors: err.errors } );
										} );

								} ); // final del quiz.save().then().catch()
			
						} // Final del if-else
			
					} // Final del function( err )
			
				).catch( function( error ) {
					modelo.Tema.findAll( { order: "destema" } )
						.then( function( temas ) { 
							res.render( "quizes/new", { quiz: quiz, temas: temas, errors: err.errors } );
						} );
				} ); // Final del quiz.validate().then().catch()
		}
	); // Final de la búsqueda del tema
};


// PUT /quizes/:quizId(\\d+) 		-> Modifica una pregunta en base de datos.
exports.update = function( req, res ) {
	var tema = modelo.Tema.build( req.body.tema );

	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	console.log( "\n*** update ***\nPregunta: " + req.quiz.pregunta + "\nRespuesta: " + req.quiz.respuesta + "\nTema: " + tema.destema + "\n" );

	modelo.Tema.find( { where: { destema: tema.destema } } ).then( // Buscar el id tema

		function( temas ) {
				req.quiz.TemaId = temas.id;

				req.quiz.validate()
					.then( function( err ) {
						if ( err ) {
							modelo.Tema.findAll( { order: "destema" } )
								.then( function( temas ) {
									res.render( "quizes/edit", { quiz: quiz, temas: temas, errors: err.errors } );
								} );
						}
						else {
							req.quiz.save( { fields: [ "pregunta", "respuesta", "TemaId" ] } )
								.then( function() {
									res.redirect( "/quizes" ); // Redirige a la lista de preguntas.

								} ).catch( function( error ) {
										next( error );
									} ); // final del quiz.save().then().catch()
			
						} // Final del if-else
			
					} // Final del function( err )
			
				).catch( function( error ) {
					modelo.Tema.findAll( { order: "destema" } )
						.then( function( temas ) { 
							res.render( "quizes/edit", { quiz: quiz, temas: temas, errors: err.errors } );
						} );
				} ); // Final del quiz.validate().then()
		}
	); // Final de la búsqueda del idTema
};


// DELETE /quizes/:quizId(\\d+)		-> Borra una pregunta
exports.destroy = function( req, res ) {

	console.log( "n*** quiz_controller.destroy ***" );
	console.log( "\t- Pregunta: " + req.quiz.pregunta );
	console.log( "\t- Respuesta: " + req.quiz.respuesta + "\n" );

	req.quiz.destroy().then(
		function() {
			res.redirect( "/quizes" );
		}
	);
};

