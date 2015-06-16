// Definición del modelo de Quiz

module.exports = function( sequelize, DateTypes ) {
	return( sequelize.define( "Quiz"
							, { pregunta: DateTypes.STRING,
								respuesta: DateTypes.STRING
							  }
							) );
}
