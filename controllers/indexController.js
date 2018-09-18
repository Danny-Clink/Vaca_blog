const mysql = require('mysql');
const session = require("express-session");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'f_p'
});

let Controller = function(){};

Controller.index = function(req, res, next){
    res.render('index');
}

Controller.index = function(req, res, next){
    let username = [req.body.username];
    let password = [req.body.password];

        connection.query(`SELECT * FROM users WHERE Username = ? AND Password = ?`,
        [username, password],
        (err, result) => {
            if(err){
                console.log(err);
            } else {

                if (result.length === 1){
                    console.log('user is authorized');
                    connection.query(`SELECT ID, Picture FROM users WHERE Username = ?`,
                    [username],
                    (err, result) => {
                        if (err){
                            console.log(err);
                        } else {
                            console.log(result);
                            session.id = result[0].ID;
                            session.picture = result[0].Picture;
                            session.username = username;
                            res.redirect('/user/' + result[0].ID);
                        }
                    });
                } else {
                    console.log('user is not founded');
                    res.render('index');
                }
            }
        });
};

module.exports = Controller;