const session = require('express-session');

let Controller = function(){};

Controller.user = function(req, res){
	res.render('user',
		{
			userId: session.id,
			username: session.username,
			fullname:session.fullName,
			imageProfile: session.picture
		});
};

Controller.logOut = function (req, res) {
	req.session.destroy((err) => {
		if(err) throw err;
		res.redirect(301, '/');
	});
};

module.exports = Controller;