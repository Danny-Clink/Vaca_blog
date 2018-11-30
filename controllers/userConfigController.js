const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const fs = require('fs');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'strangerthings',
	database: 'f_p'
});

let Controller = function(){};

Controller.userConfig = function(req, res){
	res.render('userConfig',
		{
			userId: session.id,
			username: session.username,
			imageProfile: session.picture
		});
};

Controller.userUpdateImage = function(req, res){
	let imgName = function(){
		let string = '';
		let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

		for(var i = 0; i < 10; i++)                                                             //random name for picture which is uploading
			string += letters.charAt(Math.floor(Math.random() * letters.length));

		return string;
	};

	const storage = multer.diskStorage({
		destination: 'D:/Server/wamp64/www/Vaca_blog/public/images/'+ session.username,
		filename:  function(req, file, cb){
			cb(null, file.fieldname + '-' + imgName() + path.extname(file.originalname));
		}
	});

	const upload = multer({storage: storage}).single('user_image');


	upload(req, res, (err) => {
		let sessionId = session.id;
		let ImageName = req.file.filename;
		let imageUrl = '/images/' + session.username + '/' + ImageName;

		if (err)throw err;
		connection.query('UPDATE users SET Picture = ? WHERE ID = ?',
			[imageUrl, sessionId],
			(err) => {
				if (err) throw err;
				// eslint-disable-next-line no-console
				console.log('Picture inserted:' + ImageName);
				fs.unlink('D:/Server/wamp64/www/Vaca_blog/public/'  + session.picture, (err) => {
					if (err) throw err;
					// eslint-disable-next-line no-console
					console.log('Old picture deleted');
				});
				session.picture = imageUrl;
				res.redirect('config');
			});
	});
};

module.exports = Controller;