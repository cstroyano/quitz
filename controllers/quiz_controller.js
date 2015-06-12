// Controlador de preguntas


// GET /quizes/question
exports.question = function( req, res ) {
	res.render( "quizes/question", { pregunta: "Capital de Italia" } );
}


// GET /quizes/answer
exports.answer = function( req, res ) {
	var resultado = {};

	console.log( "Respuesta: " + req.query.Respuesta );
	
	if ( ( req.query.Respuesta || "Vacío" ) === "Roma" ) {
		resultado = { respuesta: "Correcto" };
	}
	else {
		resultado = { respuesta: "Incorrecto" };
	}

	res.render( "quizes/answer", resultado );
}
