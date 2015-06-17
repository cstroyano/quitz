// Define como se construye todo el modelo

// Definir los parámetros de base de datos

var url = process.env.DATABASE_URL.match( /(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/ );
var DB_name		= ( url[ 6 ] || null );
var user		= ( url[ 2 ] || null );
var pwd			= ( url[ 3 ] || null );
var protocol	= ( url[ 1 ] || null );
var dialect		= ( url[ 1 ] || null );
var port 		= ( url[ 5 ] || null );
var host		= ( url[ 4 ] || null );
var storage		= process.env.DATABASE_STORAGE;


// Resto de variables
var path = require( "path" );
var Sequelize = require( "Sequelize" ); // Cargar el ORM


// Usar BBDD
var sequelize = new Sequelize( DB_name
							 , user
							 , pwd
							 , { dialect: 		protocol
							   , protocol: 		protocol
							   , port: 			port
							   , host: 			host
							   , storage: storage 			// Solo SQLite (.env)
							   , omitNull: 		true 		// Solo Postgres
							   }
							);


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

