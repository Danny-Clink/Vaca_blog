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

let Controller = function(){};

Controller.userFriends = function(req, res){
    res.render('userFriends', {
        fullname: session.fullName,
        userId: session.id,
        numberOfFriends: session.numberOfFriends
    });

    Controller.displayUserFriends();
};

Controller.displayUserFriends = async function(req, res) {
    mongoClient.connect(url, {useNewUrlParser: true},
        function(err, db) {
        if (err) throw err;
        let dbName = db.db('Vaca_blog');

        dbName.collection('users').findOne({name: 'Ivan'},
        function(err, result) {
            if (err) throw err;
           let numberOfFriends = result.friendsId.length;
            console.log(numberOfFriends);
            session.numberOfFriends = numberOfFriends;
            for(let i = 0; i < numberOfFriends; i++) {
                console.log(result.friendsId[i]);
            }
            db.close();
        });
    });
};

module.exports = Controller;