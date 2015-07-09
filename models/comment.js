// Definición de la tabla de comentarios

module.exports = function( sequelize, DataTypes ) {

	return(
		sequelize.define( "comment"
						, {	texto: 		{	type: 			DataTypes.STRING,
						  					allowNull: 		false,
											validate: 		{ notEmpty: { msg: "-> Falta el comentario" } }
			  					  		},
							publicado: 	{	type: 			DataTypes.BOOLEAN,
						   					defaultValue: 	false
						  			   	}
					  	}
						, { classMethods: {

								cuentaQuizesConComentarios: function() {
									return this.aggregate( "QuizId", "count", { distinct: true } );
								}

							} // Final del classMethods

						}

						) // Final del sequelize.define()
	); // Final del return()

};
