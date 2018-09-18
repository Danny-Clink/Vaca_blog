const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'f_p',
});

let Controller = function(){};

Controller.index = function(req, res, next){
    res.render('register');
};

Controller.register = function(req, res, next){
    if (req.body.password === req.body.confirm){
        connection.query(`INSERT INTO users (Name, Username, Email, Password) VALUES(?, ?, ?, ?)`,
    [req.body.name, req.body.username, req.body.email, req.body.password], (err, result) => {
        if(err){
            console.log(err);
            res.redirect(301, '/error');
            } else{
            console.log('succsess insert');
            res.redirect('/register');
            }
        });
    } else {
    res.send('password is not confirm');
    };
};

module.exports = Controller;

