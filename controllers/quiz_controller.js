// Controlador de preguntas

// Importar el modelo

var modelo = require( "../models/models.js" );


// GET /quizes/show		-> Mostrar una pregunta
exports.show = function( req, res ) {

	console.log( "\nreq.params.quizId = " + req.params.quizId );
	
	modelo.Quiz.findById( req.params.quizId ).then( function( quiz ) {
		res.render( "quizes/show", { quiz: quiz } );
	});

}


// GET /quizes/answer	-> Mostrar una respuesta
exports.answer = function( req, res ) {

	console.log( "\nreq.params.quizId = " + req.params.quizId );

	modelo.Quiz.findById( req.params.quizId ).then( function( quiz ) {
			var resultado = "";

			console.log( "Respuesta en get: " + (req.query.respuesta || "Vacío" ) );
			console.log( "Respuesta en BBDD: " + ( quiz.respuesta || "Sin respuesta" ) );

			if ( ( req.query.respuesta || "Vacío" ).toLowerCase() === ( quiz.respuesta || "Sin respuesta" ).toLowerCase() ) {
				resultado = "Correcta";
			}
			else {
				resultado = "Incorrecta";
			}
	
			res.render( "quizes/answer", { quiz: quiz, respuesta: resultado } );
	});
}


// GET /quizes		-> Mostrar la lista de preguntas
exports.index = function( req, res ) {

	modelo.Quiz.findAll().then( function( quizes ) {
		res.render( "quizes/index.ejs", { quizes: quizes } );
	});
}