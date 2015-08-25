// Definición del modelo de Temas

module.exports = function( sequelize, DataTypes ) {
	return( sequelize.define( "Tema"
							, { destema: {	type: 		DataTypes.STRING,
											allowNull: 	false,
											validate: 	{ notEmpty: { msg: "-> Falta descripción de tema" } }
									}
							  }
							)
			);
}
