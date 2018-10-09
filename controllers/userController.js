const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const session = require('express-session');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'f_p'
});

let Controller = function(){};

Controller.user = function(req, res, next){
    res.render('user',
    {
        userId: session.id,
        username: session.username,
        imageProfile: session.picture
    });
};

module.exports = Controller;