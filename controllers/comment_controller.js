// Controlador de comentarios

var modelo = require( "../models/models.js" );


// GET /quizes/:quizId/comments/new		-> Mostrar el formulario de alta de comentario
exports.new = function( req, res ) {

	console.log( "\n***GET /quizes/:quizId/comments/new ***\n" );

	res.render( "comments/new.ejs", { quizid: req.params.quizId, errors: [] } );
};


// POST /quizes/:quizId(\\d+)/comments	-> Crear el comentario
exports.create = function( req, res ) {

	var comment = modelo.Comment.build( { texto: req.body.comment.texto,
										  QuizId: req.params.quizId
										}
									  );

	console.log( "\n***POST /quizes/:quizId/comments ***\n")

	comment.validate().then(
		function( err ) {
			if ( err ) {
				res.render( "comments/new.ejs", { comment: comment, quizid: req.params.quizId, errors: err.errors } );
			}
			else {
				comment.save().then(
					function() {
						console.log( "*-> Redirigiendo a /quizes/" + req.params.quizId );
						
						res.redirect( "/quizes/" + req.params.quizId );
					}

				); // Final del comment.save().then()

			} // Final del if ( err ) - else

		}// Final del function( err )

	).catch( function( error ) { next( error ); } ); // Final del comment.validate().then()

};
