const session = require('express-session');
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/database';
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'strangerthings',
	database: 'f_p',
});

const _connect = function(){
	return new Promise(function(resolve, reject){
		mongoClient.connect(url, {useNewUrlParser: true},
			function(err, db){
				if (err) throw reject;

				const dbObj = db.db('Vaca_blog');
				resolve(dbObj);
			});
	});
};

const Controller = function(){};

Controller.userFriends = async function(req, res){
	const friends = await Controller.findUserFriends();
	const findFriends = await Controller.displayUserFriends();

	res.render('userFriends', {
		fullname: session.fullName,
		userId: session.id,
		friends: friends,
		findFriends: findFriends
	});
};

Controller.findUserFriends = function() {
	return new Promise(async function(resolve, reject){
		const dbo = await _connect();

		dbo.collection('Vaca_blog.users').findOne({name: session.fullName},
			function(err, result) {
				if (err) throw reject;

				console.log('mongo: ' + result.friends);
				resolve(result.friends);
			});
	});
};

Controller.displayUserFriends = function() {
	return new Promise(async function(resolve, reject){
		const friendsId = await Controller.findUserFriends();
		let postUser = [];

		for(let i = 0; i < friendsId.length; i++) {
			connection.query('SELECT* FROM users WHERE ID = ?', [friendsId[i]], (err, result) => {
				if (err) throw reject;

				console.log('SQL: ' + result[0].Name + ' ' + result[0].Picture);
				postUser.push(result[0].ID, result[0].Name, result[0].Picture);

				if (i === friendsId.length - 1) {
					resolve(postUser);
				}
			});
		}
	});
};

module.exports = Controller;