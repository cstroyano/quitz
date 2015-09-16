var express = require('express');
var router = express.Router();

var ctrlQuiz = require( "../controllers/quiz_controller" ); 				// Añadir el controlador preguntas y respuestas
var ctrlAuthor = require( "../controllers/author_controller" ); 			// Añadir el controlador de autor
var ctrlComment = require( "../controllers/comment_controller" ); 			// Añadir el controlador de comentarios
var ctrlSession = require( "../controllers/session_controller" );			// Añadir el controlador de sesiones
var ctrlEstadisticas = require( "../controllers/estadisticas_controller" );	// Añadir el controlador de estadísticas
var ctrlTemas = require( "../controllers/temas_controller" );				// Añadir el controlador de temas
var ctrlUsuario = require( "../controllers/usuario_controller" );			// Añadir el controlador de usuarios


/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz', errors: [] });
});


router.param( "quizId"		, ctrlQuiz.load 	);	// Autoload de comandos que tengan identificador de pregunta
router.param( "commentId"	, ctrlComment.load 	);	// Autoload de comandos que tengan identificador de comentario
router.param( "temaId"		, ctrlTemas.load	);	// Autoload de comandos que tengan identificador de tema
router.param( "usuarioId"	, ctrlUsuario.load 	);	// Autoload de comandos que tengan indetificador de usuario


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

router.put( "/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish"
												, ctrlSession.loginRequerido	, ctrlComment.publish ); // Autorizar publicación

router.get( "/login" 							, ctrlSession.new 		);	// Mostrar el formulario de login
router.post( "/login"							, ctrlSession.create 	);	// Crear una nueva sesión
router.delete( "/login"							, ctrlSession.destroy	);	// Eliminar la sesión

router.get( "/estadisticas"						, ctrlSession.loginRequerido	, ctrlEstadisticas.show );

router.get( "/temas"							, ctrlTemas.index );	// Mostrar la lista de temas
router.get( "/temas/index"						, ctrlTemas.index );	// Mostrar la lista de temas

router.get( "/temas/new"						, ctrlSession.loginRequerido	, ctrlTemas.new		);	// Mostrar formulario de creación de tema
router.post( "/temas/create"					, ctrlSession.loginRequerido	, ctrlTemas.create 	);	// Crear tema
router.delete( "/temas/:temaId(\\d+)"			, ctrlSession.loginRequerido	, ctrlTemas.destroy	);	// Borrar tema

router.get( "/usuarios" 						, ctrlSession.adminRequerido	, ctrlUsuario.index		);	// Mostrar lista de usuarios
router.get( "/usuarios/index"					, ctrlSession.adminRequerido	, ctrlUsuario.index		);	// Mostrar lista de usuarios
router.get( "/usuarios/new"						, ctrlSession.adminRequerido	, ctrlUsuario.new		);	// Formulario de creación de usuairo
router.post( "/usuarios/create"					, ctrlSession.adminRequerido	, ctrlUsuario.create	);	// Crear nuevo usuario
router.delete( "/usuarios/:usuarioId(\\d+)"		, ctrlSession.adminRequerido	, ctrlUsuario.destroy	);	// Borrar usuario


module.exports = router;
