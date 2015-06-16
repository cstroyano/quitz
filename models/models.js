// Define como se construye todo el modelo

var path = require( "path" );
var Sequelize = require( "Sequelize" ); // Cargar el ORM

// Usar BBDD de SQLite
var sequelize = new Sequelize( null, null, null, { dialect: "sqlite", storage: "quiz.sqlite" } );

// Importar la definición de la tabla Quiz
var Quiz = sequelize.import( path.join( __dirname, 'quiz' ) );

exports.Quiz = Quiz; // Exportar la definición de la tabla Quiz



// Crear e inicializar la tabla de preguntas en la BD
sequelize.sync().success( function() {

	// El manejador se ejecuta una vez que se ha creado la tabla
	Quiz.count().success( function( count ) {

		if ( count === 0 ) {
			Quiz.create( { pregunta: "Capital de Italia", respuesta: "Roma" } ).success( function() { console.log( "BD OK" ); } );
		}

	} );

} );

