// Controlador de comentarios

var modelo = require( "../models/models.js" );


// Controlador del autoload del commentId
exports.load = function( req, res, next, commentId ) {
	modelo.Comment.findById( Number( commentId ) ).then(
		function( comment ) {

			console.log( "\n*** comment_controller.load ***\n" );

			if ( comment ) {
				req.comment = comment;
				next();
			}
			else {
				next( new Error( "No existe el comentario con Id = " + commentId ) );
			}

		} // Final del function( comment )

	).catch( function( error ) { next( error ) } ) ; // Final del modelo.Comment.findById().then()

};


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


// PUT /quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish -> Autorizar un comentario.
exports.publish = function( req, res ) {
	
	console.log( "*** /quizes/:quizId/comments/commentId/publish ***\n" );

	req.comment.publicado = true;

	req.comment.save( {fields: [ "publicado" ] } ).then(
		function() {
			res.redirect( "/quizes/" + req.params.quizId );
		}
	).catch( function( error ) { next( error ) } );

};

