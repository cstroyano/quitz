var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');				// Middleware para poner el icono favicon
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');			// Middleware para parsear los body de los POST
var partials = require( 'express-partials' );

var methodOverride = require( "method-override" );	// Middleware para sobreescribir métodos HTTP
var session = require( "express-session" );			// Middleware de control de sesión

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use( partials() );

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());				// Quitado el {extended: false}

app.use(cookieParser( "ekdjwd/;as24aBRw#" ));	// Añadir semilla para cifrar la cookie
app.use( session() );							// Instalar el middleware de la sesión

app.use( methodOverride( "_method" ) );			// Instalar el middelware que permite sobreescribir los métodos para tener PUT y DELETE

app.use(express.static(path.join(__dirname, 'public')));


// Guardar path en session.redir para redirigr al mismo punto tras el login
app.use( function( req, res, next ) {

	if ( !req.path.match( /\/login|\/logout/ ) ) {
		req.session.redir = req.path;
	}

	res.locals.session = req.session;

	next();
});


// Comprobar el autologout
app.use( function( req, res, next ) {

    var aux = new Date().getTime();

    if ( req.session.timestamp && req.session.user ) {

        console.log( "\n*** Diferencia de tiempo: " + aux + " - " + req.session.timestamp + " = " + ( aux - req.session.timestamp ) );

        if ( ( aux - req.session.timestamp ) >= 120000 ) {  // Diferencia de tiempo mayor de 2 minutos (120 segundos x 1000)
            console.log( "***Desconexión de sesión automática\n " );

            delete req.session.user;
        }

    }

    req.session.timestamp = aux;

    next();
});



app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', { message: err.message, error: err, errors: [] } );
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: {}, errors: [] } );
});


module.exports = app;
