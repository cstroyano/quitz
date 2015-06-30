// Controlador de usuarios

// Usuarios permitidos en la app
var user = { admin: { id: 1, username: "admin", password: "1234" },
			 pepe: { id: 2, username: "pepe", password: "5678" }
			};


exports.autenticar = function( login, password, callback ) {

	if ( user[ login ] ) {
		if ( password === user[ login ].password ) {
			callback( null, user[ login ] );
		}
		else {
			callback( new Error( "Password erróneo" ) );
		}
	}
	else {
		callback( new Error( "Usuario no encontrado" ) );
	}
	
};