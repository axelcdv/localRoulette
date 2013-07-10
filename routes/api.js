/*
 * JSON REST API
 */

// In-memory database for development purpose


var data = {
		"users": [
		{
				"name": "John",
				"id": "0",
				"available": true
		},
		{
				"name": "Johnny",
				"id": "1",
				"available": true
		},
		{
				"name": "Bob",
				"id": "2",
				"available": true
		},
		{
				"name": "Johnny-bob",
				"id": "3",
				"available": true
		}
		],
		"messages": [
		{
				"from": 0, // user id
				"to": 1, // user id
				"body": "Hi there! I just shaked you!",
				"timestamp": 1373450030855
		}
		]
}

// GET

exports.random = function(req, res) {
		var from_id = req.query.id;
		var to_id = -1;
		while( to_id == -1 || to_id == from_id || !data.users[to_id].available ) {
				to_id = Math.floor(Math.random() * data.users.length);
		}
		res.json({
				id: to_id
		});
};



