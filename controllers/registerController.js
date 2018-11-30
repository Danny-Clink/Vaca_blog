const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'strangerthings',
	database: 'f_p',
});

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/database';

const mkdir = require('mkdirp');
const fs = require('fs');

let Controller = function(){};

Controller.index = function(req, res){
	res.render('register');
};

Controller.register = function(req, res){
	if (req.body.password === req.body.confirm){
		connection.query('INSERT INTO users (Name, Username, Email, Password, Picture) VALUES(?, ?, ?, ?, "")',
			[
				req.body.name,
				req.body.username,
				req.body.email,
				req.body.password
			],
			(err) => {
				if(err){
					console.log(err);
					res.redirect(301, '/error');
				} else{
					console.log('succsess insert - MySQL');
					res.redirect('/register');
				}
			});
	} else {
		res.send('password is not confirm');
	}

	connection.query('UPDATE users SET Picture = ? WHERE Username = ?',
		[
			'/images/' + req.body.username + '/no-photo.png',
			req.body.username
		]),
	(err) => {
		if (err) throw err;
	};

	mongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
		if (err) throw err;

		let dbo = db.db('Vaca_blog');
		let profile = {name: req.body.name, friends: [], photos: []};
		dbo.collection('users').insertOne(profile,
			function(err) {
				if(err) throw err;
				console.log('succsess insert - Mongodb');
				db.close();
			});
	});

	mkdir('./public/images/' + req.body.username, function(err) {
		if (err) throw err;
	});

	fs.readFile('./public/images/new_user/no-photo.png', function(err, data) {
		if (err) throw err;
		fs.writeFile('./public/images/' + req.body.username + '/' + 'no-photo.png', data, function(err) {
			if (err) throw err;
		});
	});

};

module.exports = Controller;

