// Definición del modelo de Quiz

module.exports = function( sequelize, DateTypes ) {
	return( sequelize.define( "Quiz"
							, { pregunta: { type: 		DateTypes.STRING,
											validate: 	{ notEmpty: { msg: "-> Falta pregunta" } }
									},
								respuesta: { type: 		DateTypes.STRING,
											validate: 	{ notEmpty: { msg: "-> Falta respuesta" } }
									}
							  }
							)
			);
}
