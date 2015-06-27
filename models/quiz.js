// Definición del modelo de Quiz

module.exports = function( sequelize, DateTypes ) {
	return( sequelize.define( "Quiz"
							, { pregunta: {	type: 		DateTypes.STRING,
											allowNull: 	false,
											validate: 	{ notEmpty: { msg: "-> Falta pregunta" } }
									},
								respuesta: {type: 		DateTypes.STRING,
											allowNull: false,
											validate: 	{ notEmpty: { msg: "-> Falta respuesta" } }
									},
								destema: {	type: 		DateTypes.STRING,
										 	allowNull: 	false,
											validate: 	{ notEmpty: { msg: "-> Falta el tema de la pregunta" } }
									}
							  }
							)
			);
}
