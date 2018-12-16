const session = require('express-session');
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'strangerthings',
	database: 'f_p'
});

const Controller = function(){};

Controller.userRender = async function(req, res){
	this.Url = function(){
		let origUrl = req.originalUrl;

		return origUrl;
	};

	const User = await Controller.getUser();

	if(User === 0){
		res.send('This user is not found');
	} else {
		res.render('userRender', {
			user: User,
			userId: session.id
		});
	}
};

Controller.getUser = function(){
	return new Promise(async function(resolve, reject){
		let reqUrl = this.Url();
		let userRenderId = reqUrl.replace(/[^-0-9]/gim, '');

		connection.query('SELECT * FROM users WHERE ID = ?', [userRenderId],
			(err, result) => {
				if (err) throw reject;

				if (result.length === 0){
					console.log('This user is not found');

					resolve(0);
				} else {
					console.log(result[0]);
					let userObj = [result[0].Name, result[0].Picture];

					resolve(userObj);
				}
			});
	});
};

module.exports = Controller;