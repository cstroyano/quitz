var express = require('express');
var router = express.Router();

var ctrlQuiz = require( "../controllers/quiz_controller" ); // Añadir el controlador preguntas y respuestas
var ctrlAuthor = require( "../controllers/author_controller" ); // Añadir el controlador de autor

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz' });
});

router.get( "/author", ctrlAuthor.author );


router.get( "/quizes/question", ctrlQuiz.question );
router.get( "/quizes/answer", ctrlQuiz.answer );

module.exports = router;
