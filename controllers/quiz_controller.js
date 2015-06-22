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
				res.render( "quizes/index.ejs", { quizes: quizes, filtro: filtro } );
			}
		).catch( function( error ) { next( error ); } );

};


// GET /quizes/show		-> Mostrar una pregunta
exports.show = function( req, res ) {

	console.log( "\n*** show***\nreq.quiz.id = " + req.quiz.id );
	
	res.render( "quizes/show", { quiz: req.quiz } );

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
	
	res.render( "quizes/answer", { quiz: req.quiz, respuesta: resultado, archivo: archivo } );

};


// GET /quizes/new		-> Formulario de alta de pregunta
exports.new = function( req, res ) {
	var quiz = modelo.Quiz.build( { pregunta: "Pregunta", respuesta: "Respuesta" } ); // Crear objeto Quiz
	res.render( "quizes/new", { quiz: quiz } );

}


// POST /quizes/create	-> Crea una nueva pregunta
exports.create = function( req, res ) {
	var quiz = modelo.Quiz.build( req.body.quiz );

	quiz.save( { fields: [ "pregunta", "respuesta" ] } ).then(
		function() {
			res.redirect( "/quizes" ); // Redirige a la lista de preguntas.
		}
	);

}
