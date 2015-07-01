var express = require('express');
var router = express.Router();

var ctrlQuiz = require( "../controllers/quiz_controller" ); 		// Añadir el controlador preguntas y respuestas
var ctrlAuthor = require( "../controllers/author_controller" ); 	// Añadir el controlador de autor
var ctrlComment = require( "../controllers/comment_controller" ); 	// Añadir el controlador de comentarios
var ctrlSession = require( "../controllers/session_controller" );	// Añadir el controlador de sesiones


/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz', errors: [] });
});


// Autoload de comandos que tengan identificador de pregunta
router.param( "quizId", ctrlQuiz.load );


// Rutas de la aplicación
router.get( "/author"                       	, ctrlAuthor.author );	// Pantalla de autor

router.get( "/quizes"							, ctrlQuiz.index    	);	// Mostrar lista de preguntas
router.get( "/quizes/index"						, ctrlQuiz.index    	);	// Mostrar lista de preguntas
router.get( "/quizes/:quizId(\\d+)"				, ctrlQuiz.show     	);	// Mostrar pregunta
router.get( "/quizes/:quizId(\\d+)/answer"		, ctrlQuiz.answer   	);	// Mostrar respuesta

router.get( "/quizes/new"						, ctrlSession.loginRequerido	, ctrlQuiz.new		);	// Mostrar formulario de nueva pregunta
router.get( "/quizes/:quizId(\\d+)/edit"		, ctrlSession.loginRequerido	, ctrlQuiz.edit		);	// Editar una pregunta
router.post( "/quizes/create"					, ctrlSession.loginRequerido	, ctrlQuiz.create	);	// Crear la nueva pregunta en BD
router.put( "/quizes/:quizId(\\d+)"				, ctrlSession.loginRequerido	, ctrlQuiz.update 	);	// Actualizar una pregunta en BD
router.delete( "/quizes/:quizId(\\d+)"			, ctrlSession.loginRequerido	, ctrlQuiz.destroy	);	// Borrar una pregunta en BD

router.get( "/quizes/:quizId(\\d+)/comments/new", ctrlComment.new 		);	// Mostrar el formulario de crear un comentario
router.post( "/quizes/:quizId(\\d+)/comments"	, ctrlComment.create 	);	// Crear un nuevo comentario

router.get( "/login" 							, ctrlSession.new 		);	// Mostrar el formulario de login
router.post( "/login"							, ctrlSession.create 	);	// Crear una nueva sesión
router.delete( "/login"							, ctrlSession.destroy	);	// Eliminar la sesión



router

module.exports = router;
