/**
 * Module dependencies
 */

var express = require('express'),
	routes = require('./routes'),
	api = require('./routes/api');

var app = module.exports = express();

// Socketio + server
var server = require('http').createServer(app),
	io = require('socket.io').listen(server);

// Configuration
app.configure(function() {
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.static(__dirname + '/public'));
		app.use(app.router);
});

app.configure('development', function() {
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
		app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

// JSON API

app.get('/random', api.random);

// SocketIO
// TODO
io.sockets.on('connection', function( socket ) {
		socket.on('message', function( message ) {
				console.log( message );
		});
});

// Start server

var port = 3000 || ENV.port; 
server.listen( port );
