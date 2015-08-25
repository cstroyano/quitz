// Definición del modelo de Quiz

module.exports = function( sequelize, DataTypes ) {
	return( sequelize.define( "Quiz"
							, { pregunta: {	type: 		DataTypes.STRING,
											allowNull: 	false,
											validate: 	{ notEmpty: { msg: "-> Falta pregunta" } }
									},
								respuesta: {type: 		DataTypes.STRING,
											allowNull: false,
											validate: 	{ notEmpty: { msg: "-> Falta respuesta" } }
									}
							  }
							)
			);
};
