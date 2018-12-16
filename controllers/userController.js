const session = require('express-session');
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/database';

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

Controller.user = async function(req, res){
	const getPageInfo = await Controller.getPageInfo().userPhotos;

	res.render('user',
		{
			userId: session.id,
			username: session.username,
			fullname:session.fullName,
			imageProfile: session.picture,
			pageInfo: getPageInfo
		});
};

Controller.getPageInfo = function() {
	return new Promise(async function(resolve, reject){
		const dbo = await _connect();

		dbo.collection('Vaca_blog.users').findOne({username: session.username[0]}, function(err, result){
			if (err) throw reject;

			let userPhotos = result.photos;
			let	userPosts = result.posts;
			console.log('userPhotos: ' + userPhotos);
			console.log('userPosts: ' + userPosts);
			resolve(userPhotos, userPosts);
		});
	});
};

Controller.logOut = function (req, res) {
	req.session.destroy((err) => {
		if(err) throw err;
		res.redirect(301, '/');
	});
};

module.exports = Controller;