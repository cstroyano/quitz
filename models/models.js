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
var Quiz = sequelize.import( path.join( __dirname, "quiz" ) );
var Tema = sequelize.import( path.join( __dirname, "tema" ) );
var Comment = sequelize.import( path.join( __dirname, "comment" ) )

// Establecer las FK's entre las tablas temas y quizes
Quiz.belongsTo( Tema );
Tema.hasMany( Quiz );


// Establecer las FK's entre las tablas quizes y comments
Comment.belongsTo( Quiz );
Quiz.hasMany( Comment );


// Exportar las definiciones de tablas
exports.Quiz = Quiz;
exports.Tema = Tema;
exports.Comment = Comment;



// Crear e inicializar la tabla de preguntas en la BD
sequelize.sync( [options = { force: true } ] ).then( function() {

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

} );

