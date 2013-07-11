/**
 * Module dependencies
 */

var express = require('express'),
	routes = require('./routes'),
	api = require('./routes/api'),
	events = require('events');

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
app.get('/test', routes.index);

// JSON API

app.get('/random', api.random);

// Utils

// Returns true if a message is non-null and well formed (contains all the fields)
var wellFormed = function( message ) {
	return message && (message.to || message.to === 0) && (message.from || message.from === 0) && message.body;
};

// SocketIO
// TODO
io.sockets.on('connection', function( socket ) {
	// Message sent
		socket.on('message', function( message, callback ) {
			console.log( message );
			if (!wellFormed( message )) {
				console.log("Message received is null or missing fields");
				return;
			}
				
				// If the corresponding socket is open
				if (io.socketsById[message.to]) {
					console.log( "Socket exists, sending message" );
						message = api.saveMessage( message ); // Save, will get timestamp
						if (message && (message !== null)) {
							io.socketsById[message.to].emit( 'message', message );
							if (callback) {
								callback(message);
							}
						}
				}
		});

		// Set id corresponding to the socket (should probably be done differently)
		socket.on('set id', function( id ) {
			console.log( "Set id: " + id.id );
				socket.set('id', id.id, function() {
					if (!io.socketsById) {
							io.socketsById = {};
					}
					io.socketsById[id.id] = socket;
					console.log('Id set');

					socket.emit('ready');
				});
		});

		socket.on('random', function( id, callback ) {
			var randId = api.getRandomId(id);
			callback(randId);
		});
	
		// When the user disconnects, remove the socket to prevent messages to be sent to closed sockets
		socket.on('disconnect', function() {
			socket.get('id', function(err, id) {
				if (id) {
					delete io.socketsById[id];
				}
			});
		});
});

// Start server

var port = 3000 || ENV.port;
server.listen( port );
