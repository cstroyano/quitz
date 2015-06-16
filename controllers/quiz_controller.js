// Controlador de preguntas

// Importar el modelo

var modelo = require( "../models/models.js" );


// GET /quizes/question
exports.question = function( req, res ) {

	modelo.Quiz.findAll().success( function( quiz ) {
		res.render( "quizes/question", { pregunta: quiz[ 0 ].pregunta || "Sin pregunta" } );
	});

}


// GET /quizes/answer
exports.answer = function( req, res ) {

	modelo.Quiz.findAll().success( function( quiz ) {
			var resultado = {};

			if ( ( req.query.Respuesta || "Vacío" ) === ( quiz[ 0 ].respuesta || "Sin respuesta" ) ) {
				resultado = { respuesta: "Incorrecto" };
			}
			else {
				resultado = { respuesta: "Correcto" };
			}
	
			res.render( "quizes/answer", resultado );
	});
}
