var express = require('express');
var router = express.Router();

var quizControlador = require( "../controllers/quiz_controller" ); // Añadir el controlador

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quitz' });
});

router.get( "/quizes/question", quizControlador.question );
router.get( "/quizes/answer", quizControlador.answer );

module.exports = router;
