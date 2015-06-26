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
var Sequelize = require( "sequelize" ); // Cargar el ORM


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
var Tema = sequelize.import( path.join( __dirname, "tema" ) );


exports.Quiz = Quiz; // Exportar la definición de la tabla Quiz
exports.Tema = Tema; // Exportar la tabla de temas



// Crear e inicializar la tabla de preguntas en la BD
sequelize.sync().then( function() {

	Tema.count().then( function( count ) {
		if ( count == 0 ) {
			Tema.create( { desTema: "Otro" } ).then( function() { console.log( "BD OK" ); } );
			Tema.create( { desTema: "Humanidades" } ).then( function() { console.log( "BD OK" ); } );
			Tema.create( { desTema: "Ocio" } ).then( function() { console.log( "BD OK" ); } );
			Tema.create( { desTema: "Ciencia" } ).then( function() { console.log( "BD OK" ); } );
			Tema.create( { desTema: "Tecnología" } ).then( function() { console.log( "BD OK" ); } );
			Tema.create( { desTema: "Geografía" } ).then( function() { console.log( "BD OK" ); } );
		}

	});

	Quiz.count().then( function( count ) {

		if ( count === 0 ) {
			Quiz.create( { pregunta: "Capital de Italia", respuesta: "Roma", desTema: "Geografía" } ).then( function() { console.log( "BD OK" ); } );
			Quiz.create( { pregunta: "Capital de España", respuesta: "Madrid", desTema: "Geografía" } ).then( function() { console.log( "BD OK" ); } );
			Quiz.create( { pregunta: "Capital de Portugal", respuesta: "Lisboa", desTema: "Geografía" } ).then( function() { console.log( "BD OK" ); } );
			Quiz.create( { pregunta: "Capital de Francia", respuesta: "París", desTema: "Geografía" } ).then( function() { console.log( "BD OK" ); } );
			Quiz.create( { pregunta: "Capital de UK", respuesta: "Londres", desTema: "Geografía" } ).then( function() { console.log( "BD OK" ); } );
			Quiz.create( { pregunta: "Número PI con cinco decimales", respuesta: "3.14159", desTema: "Ciencia" } ).then( function() { console.log( "BD OK" ); } );

		}

	} );

} );

