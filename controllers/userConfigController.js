const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const session = require('express-session');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'strangerthings',
    database: 'f_p'
});

let imgName = function(){
    let string = "";
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    for(var i = 0; i < 10; i++)                                                             //random name for picture which is uploading
    string += letters.charAt(Math.floor(Math.random() * letters.length));

    return string;
};

const storage = multer.diskStorage({
    destination: 'D:/S_e_r_v_e_r/wamp64/wamp64/www/VacaBlog/public/images',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-'+ imgName() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage}).single('user_image');

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
    let sessionId = session.id;
    let ImageName = req.file;
    upload(req, res, (err) => {
        if (err)throw err;
            connection.query(`UPDATE users SET Picture = ? WHERE ID = ?`,
            ['/images/' + ImageName, sessionId],
            (err) => {
                if (err) throw err;
                    console.log('picture inserted');
                    console.log(ImageName);
                    res.redirect('config');
            });
        });
};

module.exports = Controller;