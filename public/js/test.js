// js/test.js

$(function() {
		$('#random').click(function(e) {
				e.preventDefault();
				$.get('/random', { id: 0 }, function( data ) {
						$('#to_id').html(data.id);
				}, "json");
		});

		var socket = io.connect('http://localhost');

		socket.on('message', function( message ) {
				$('#messages').append('<div class="message">' + message.body + '</div>');
		});

		$('#send').click(function(e) {
				e.preventDefault();
				socket.emit('message',
						{
							'from': 0,
							'to': $('#to_id').html(),
							'body': $('#message').val()
						}
				);
		});

});
