// js/socket.js
// TODO

define([
	'events',
	'socketio',
	'api'
	],
	function( Events, io, Api ) {
					var socket = io.connect(Api.baseUrl);

					socket.emit('set id', { id: Api.id });

					socket.on('message', function(data) {
							console.log( data );
							Events.trigger('message', data);
					});

					Events.on('sendMessage', function( message, callback ) {
							console.log('Sending message through socket.io...');
							console.log( message );
							socket.emit('message', message, function (data) {
								callback(data);
							});
					});

					Events.on('shake', function( id, callback ) {
						console.log("Socket emitting random messsage");
						socket.emit('random', id, function ( response ) {
							callback(response);
						});
					});

					var addListener = function (eventListened, fun) {
							// TODO check arguments, maybe package fun
							socket.on(eventListened, fun);
					};

			var AppSocket = {
					addListener: addListener
			};

			return AppSocket;
	}
	);
