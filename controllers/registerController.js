const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'strangerthings',
    database: 'f_p',
});

let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/database';

let Controller = function(){};

Controller.index = function(req, res, next){
    res.render('register');
};

Controller.register = function(req, res, next){
    if (req.body.password === req.body.confirm){
        connection.query(`INSERT INTO users (Name, Username, Email, Password, Picture) VALUES(?, ?, ?, ?, "/images/user_no_photo.png")`,
    [
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.password
    ],
     (err, result) => {
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
    };

    mongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
        if (err) throw err;

            let dbo = db.db("Vaca_blog");
            let profile = {name: req.body.name, friends: [], photos: []}
            dbo.collection("users").insertOne(profile,
                function(err, result) {
                if(err) throw err;
                console.log('succsess insert - Mongodb');
                db.close();
            });
    });
};

module.exports = Controller;

