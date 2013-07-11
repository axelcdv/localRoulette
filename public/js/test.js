// js/test.js

$(function() {
		$('#random').click(function(e) {
				e.preventDefault();
				var my_id = $('#id').html();
				$.get('/random', { id: my_id }, function( data ) {
						$('#to_id').html(data.id);
				}, "json");
		});

		$('#change').click(function(e) {
				var new_id = $('#chid').val();
				if(new_id && new_id !== "") {
						$('#id').html(new_id);
						socket.emit('set id', { id: new_id });
				}
		});
		
		var ready = false;
		var socket = io.connect('http://localhost');
		socket.on('ready', function() {
				ready = true;
				console.log( 'Socket ready' );
		});

		socket.on('message', function( message ) {
				console.log( message );
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
