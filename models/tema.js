// Definición del modelo de Temas

module.exports = function( sequelize, DateTypes ) {
	return( sequelize.define( "Tema"
							, { destema: {	type: 		DateTypes.STRING,
											allowNull: 	false,
											validate: 	{ notEmpty: { msg: "-> Falta descripción de tema" } }
									}
							  }
							)
			);
}
