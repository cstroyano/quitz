// Definición del modelo Perfiles

module.exports = function( sequelize, DataTypes ) {
	return( sequelize.define( "Perfil"
							, { desperfil: { type: 			DataTypes.STRING,
											 allowNull: 	false,
											 validate: 		{ notEmpty: { msg: "-> Falta nombre del perfil" } }
											},
								nivel: 		{ type: 		DataTypes.INTEGER,
											  allowNull: 	false
											}
							  }
							) // Final del sequelize.define

	); // final del return
};
