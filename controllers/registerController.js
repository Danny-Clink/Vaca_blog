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
	let name = req.body.name;
	let username = req.body.username;
	let password = req.body.password;
	let confirmPassword = req.body.confirm;
	let email = req.body.email;

	if (password === confirmPassword){
		connection.query('INSERT INTO users (Name, Username, Email, Password, Picture) VALUES(?, ?, ?, ?, "")',
			[name, username, email, password], (err) => {
				if(err){
					throw err;
				} else{
					console.log('succsess insert - MySQL');
					res.redirect('/register');
				}
			});
	} else {
		res.send('password is not confirm');
	}

	connection.query('UPDATE users SET Picture = ? WHERE Username = ?',
		['/images/' + username + '/no-photo.png', username]), (err) => {
		if (err) throw err;
	};

	mongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
		if (err) throw err;

		let dbo = db.db('Vaca_blog');
		let profile = {name: name, username: username, friends: [], photos: [], posts: []};
		dbo.collection('users').insertOne(profile,
			function(err) {
				if(err) throw err;
				console.log('succsess insert - Mongodb');
				db.close();
			});
	});

	mkdir('./public/images/' + username, function(err) {
		if (err) throw err;
	});

	fs.readFile('./public/images/new_user/no-photo.png', function(err, data) {
		if (err) throw err;
		fs.writeFile('./public/images/' + username + '/' + 'no-photo.png', data, function(err) {
			if (err) throw err;
		});
	});

};

module.exports = Controller;

