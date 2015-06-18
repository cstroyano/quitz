var express = require('express');
var router = express.Router();

var ctrlQuiz = require( "../controllers/quiz_controller" ); // Añadir el controlador preguntas y respuestas
var ctrlAuthor = require( "../controllers/author_controller" ); // Añadir el controlador de autor

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz' });
});


// Rutas de la aplicación

router.get( "/author"                       , ctrlAuthor.author );	// Pantalla de autor

router.get( "/quizes"						, ctrlQuiz.index    );	// Mostrar lista de preguntas
router.get( "/quizes/:quizId(\\d+)"			, ctrlQuiz.show     );	// Mostrar pregunta
router.get( "/quizes/:quizId(\\d+)/answer"	, ctrlQuiz.answer   );	// Mostrar respuesta


module.exports = router;
