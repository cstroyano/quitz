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


// Importar la definición de las tablas
var Quiz = sequelize.import( path.join( __dirname, "quiz" ) );
var Tema = sequelize.import( path.join( __dirname, "tema" ) );
var Comment = sequelize.import( path.join( __dirname, "comment" ) );
var Perfil = sequelize.import( path.join( __dirname, "perfil" ) );
var Usuario = sequelize.import( path.join( __dirname, "usuario" ) );

// Establecer las FK's entre las tablas temas y quizes
Quiz.belongsTo( Tema );
Tema.hasMany( Quiz );


// Establecer las FK's entre las tablas quizes y comments
Comment.belongsTo( Quiz );
Quiz.hasMany( Comment );

// Establecer las FK's entre las tablas perfiles y usuarios
Usuario.belongsTo( Perfil );
Perfil.hasMany( Usuario );


// Exportar las definiciones de tablas
exports.Quiz = Quiz;
exports.Tema = Tema;
exports.Comment = Comment;
exports.Perfil = Perfil;
exports.Usuario = Usuario;


// Crear e inicializar la tabla de preguntas en la BD
sequelize.sync( { force: true } ).then( function() {

	Tema.count().then( function( count ) {
		if ( count === 0 ) {
			Tema.create( { destema: "Otros" } )
				.then( function( tema ) {
						console.log( "Tema " + tema.destema + " con id " + tema.id );

						Quiz.create( { pregunta: "¿De qué color era el caballo blanco de Santiago?", respuesta: "blanco", TemaId: tema.id } )
							.then( function( quiz ) {
								console.log( "Pregunta: " + quiz.pregunta );
								console.log( "Respuesta: " + quiz.respuesta );
								console.log( "TemaId: " + quiz.TemaId );
							});
				});

			Tema.create( { destema: "Historia" } )
				.then( function( tema ) {
						console.log( "Tema " + tema.destema + " con id " + tema.id );

						Quiz.create( { pregunta: "Año del descubrimiento de América", respuesta: "1492", TemaId: tema.id } )
							.then( function( quiz ) {
								console.log( "Pregunta: " + quiz.pregunta );
								console.log( "Respuesta: " + quiz.respuesta );
								console.log( "TemaId: " + quiz.TemaId );
							}); 
				});

			Tema.create( { destema: "Ocio" } )
				.then( function( tema ) {
						console.log( "Tema " + tema.destema + " con id " + tema.id );

						Quiz.create( { pregunta: "Director de Terminator", respuesta: "James Cameron", TemaId: tema.id } )
							.then( function( quiz ) {
								console.log( "Pregunta: " + quiz.pregunta );
								console.log( "Respuesta: " + quiz.respuesta );
								console.log( "TemaId: " + quiz.TemaId );
							}); 
				});

			Tema.create( { destema: "Ciencia" } )
				.then( function( tema ) {
						console.log( "Tema " + tema.destema + " con id " + tema.id );

						Quiz.create( { pregunta: "Planeta más próximo al Sol", respuesta: "Mercurio", TemaId: tema.id } )
							.then( function( quiz ) {
								console.log( "Pregunta: " + quiz.pregunta );
								console.log( "Respuesta: " + quiz.respuesta );
								console.log( "TemaId: " + quiz.TemaId );
							}); 
				});

			Tema.create( { destema: "Tecnología" } )
				.then( function( tema ) {
						console.log( "Tema " + tema.destema + " con id " + tema.id );

						Quiz.create( { pregunta: "Padre de la tecnología celular o móvil", respuesta: "Martín Cooper", TemaId: tema.id } )
							.then( function( quiz ) {
								console.log( "Pregunta: " + quiz.pregunta );
								console.log( "Respuesta: " + quiz.respuesta );
								console.log( "TemaId: " + quiz.TemaId );
							}); 
				});

			Tema.create( { destema: "Geografía" } )
				.then( function( tema ) {
						console.log( "Tema " + tema.destema + " con id " + tema.id );

						Quiz.create( { pregunta: "Río más largo del mundo", respuesta: "Nilo", TemaId: tema.id } )
							.then( function( quiz ) {
								console.log( "Pregunta: " + quiz.pregunta );
								console.log( "Respuesta: " + quiz.respuesta );
								console.log( "TemaId: " + quiz.TemaId );
							}); 
				});

			Tema.create( { destema: "Literatura" } )
				.then( function( tema ) {
						console.log( "Tema " + tema.destema + " con id " + tema.id );

						Quiz.create( { pregunta: "Autor de El Lazarillo de Tormes", respuesta: "Anónimo", TemaId: tema.id } )
							.then( function( quiz ) {
								console.log( "Pregunta: " + quiz.pregunta );
								console.log( "Respuesta: " + quiz.respuesta );
								console.log( "TemaId: " + quiz.TemaId );
							}); 
				});

		}

	}); // Final de la inicialización de temas

	Perfil.count().then( function( count ) {
		if ( count === 0 ) {
			Perfil.create( { desperfil: "Administrador", nivel: 0 } )
				.then( function( perfil ) {
					console.log( "Creado el perfil " + perfil.desperfil + " con el id " + perfil.id );

					Usuario.create( { username: "admin", password: "1234", PerfilId: perfil.id } )
						.then( function( usuario ) {
							console.log( "Creado el usuario " + usuario.username + " con el perfil " + usuario.PerfilId );
						});
				} );

			Perfil.create( { desperfil: "Usuario", nivel: 10 } )
				.then( function( perfil ) {
					console.log( "Creado el perfil " + perfil.desperfil + " con el id " + perfil.id );

					Usuario.create( { username: "kk", password: "abcd", PerfilId: perfil.id } )
						.then( function( usuario ) {
							console.log( "Creado el usuario " + usuario.username + " con el perfil " + usuario.PerfilId );
						});
				} );

			Perfil.create( { desperfil: "Invitado", nivel: 90 } )
				.then( function( perfil ) {
					console.log( "Creado el perfil " + perfil.desperfil + " con el id " + perfil.id );

					Usuario.create( { username: "invi", password: "tado", PerfilId: perfil.id } )
						.then( function( usuario ) {
							console.log( "Creado el usuario " + usuario.username + " con el perfil " + usuario.PerfilId );
						});
				} );
		}

	}); // Final de la inicialización de perfiles

} );


