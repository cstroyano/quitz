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

			console.log( "Respuesta en get: " + (req.query.Respuesta || "Vacío" ) );
			console.log( "Respuesta en BBDD: " + ( quiz[ 0 ].respuesta || "Sin respuesta" ) );

			if ( ( req.query.Respuesta || "Vacío" ).toLowerCase() === ( quiz[ 0 ].respuesta || "Sin respuesta" ).toLowerCase() ) {
				resultado = { respuesta: "Correcta" };
			}
			else {
				resultado = { respuesta: "Incorrecta" };
			}
	
			res.render( "quizes/answer", resultado );
	});
}
