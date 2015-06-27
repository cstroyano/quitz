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
Tema.sync().then( function() {

	Tema.count().then( function( count ) {
		if ( count === 0 ) {
			Tema.create( { destema: "Otro" } ).then( function() { console.log( "Tema Otro - BD OK" ); } );
			Tema.create( { destema: "Humanidades" } ).then( function() { console.log( "Tema Humanidades - BD OK" ); } );
			Tema.create( { destema: "Ocio" } ).then( function() { console.log( "Tema Ocio - BD OK" ); } );
			Tema.create( { destema: "Ciencia" } ).then( function() { console.log( "Tema Ciencia - BD OK" ); } );
			Tema.create( { destema: "Tecnología" } ).then( function() { console.log( "Tema Tecnología - BD OK" ); } );
			Tema.create( { destema: "Geografía" } ).then( function() { console.log( "Tema Geografía - BD OK" ); } );
		}

	});
});

Quiz.sync().then( function() {

	Quiz.count().then( function( count ) {

		if ( count === 0 ) {
			Quiz.create( { pregunta: "Capital de Italia", respuesta: "Roma", destema: "Geografía" } ).then( function() { console.log( "BD OK" ); } );
			Quiz.create( { pregunta: "Capital de España", respuesta: "Madrid", destema: "Geografía" } ).then( function() { console.log( "BD OK" ); } );
			Quiz.create( { pregunta: "Capital de Portugal", respuesta: "Lisboa", destema: "Geografía" } ).then( function() { console.log( "BD OK" ); } );
			Quiz.create( { pregunta: "Capital de Francia", respuesta: "París", destema: "Geografía" } ).then( function() { console.log( "BD OK" ); } );
			Quiz.create( { pregunta: "Capital de UK", respuesta: "Londres", destema: "Geografía" } ).then( function() { console.log( "BD OK" ); } );
			Quiz.create( { pregunta: "Número PI con cinco decimales", respuesta: "3.14159", destema: "Ciencia" } ).then( function() { console.log( "BD OK" ); } );

		}

	} );

} );

