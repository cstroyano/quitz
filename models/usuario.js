// Definición del model Usuario

module.exports = function( sequelize, DataTypes ) {
	return( sequelize.define( "Usuario"
							, { username: 	{ type: 		DataTypes.STRING,
											  allowNull: 	false
											},
								password: 	{ type: 		DataTypes.STRING,
											  allowNull: 	false
											}
							  } // Final de la definición de campos
							, { indexes: [ { unique: true, fields: [ "username" ] } ] }

							) // Final sequelize.define()
	); // Final return

};