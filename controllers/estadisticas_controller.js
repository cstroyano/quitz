// Controlador de las estadísticas

var modelo = require( "../models/models.js" ); // Importar el modelo

exports.show = function( req, res ) {

	var estadisticas =	{
							preguntas: 					0	,
							comentarios: 				0	,
							comentariosPorPregunta: 	0	,
							preguntasConComentarios: 	0	,
							preguntasSinComentarios: 	0  
						};
	var errores = [];


	modelo.Quiz.count().then( function( cuenta ) {

		estadisticas.preguntas = cuenta;

		return modelo.Comment.count();

	}).then( function( cuenta ) {

		estadisticas.comentarios = cuenta;

		return modelo.Comment.cuentaQuizesConComentarios();
	
	}).then( function( cuenta ) {

		estadisticas.preguntasConComentarios = cuenta;
		estadisticas.preguntasSinComentarios = estadisticas.preguntas - estadisticas.preguntasConComentarios;
		estadisticas.comentariosPorPregunta	 = ( estadisticas.preguntas > 0 ? estadisticas.comentarios / estadisticas.preguntas : 0 ).toFixed( 2 );

	}).catch( function( err ) {

		errores.push( err );

	}).finally( function() {

		res.render( "quizes/estadisticas.ejs", { estadisticas: estadisticas, errors: errores } );

	});

}; // Final del function( req, res );