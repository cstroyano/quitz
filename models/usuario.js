// Definición del model Usuario

module.exports = function( sequelize, DataTypes ) {
	return( sequelize.define( "Usuario"
							, { username: 	{ type: 		DataTypes.STRING,
											  allowNull: 	false,
											  validate: 	{ notEmpty: { msg: "El nombre de usuario no puede estar vacío" } }
											},
								password: 	{ type: 		DataTypes.STRING,
											  allowNull: 	false,
											  validate: 	{ notEmpty: { msg: "La clave no puede estar vacía" } }
											}
							  } // Final de la definición de campos
							, { indexes: [ { unique: true, fields: [ "username" ] } ] }

							) // Final sequelize.define()
	); // Final return

};