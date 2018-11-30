const session = require('express-session');
const multer = require('multer');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/database';

const _connect = function(){
    return new Promise(function(resolve, reject){
        mongoClient.connect(url, {useNewUrlParser: true},
            function(err, db){
                if (err) throw reject;

                let dbObj = db.db('Vaca_blog');
                resolve(dbObj);
            })
    })
}

let Controller = function(){};

Controller.userPhoto = async function(req, res){
    const photos = await Controller.getPhoto();

    res.render('userPhoto',
    {
        userId: session.id,
        galleryPhotos: photos
    });
};

Controller.getPhoto = function(){
    return new Promise(async function(resolve, reject) {

        let dbo = await _connect();

        dbo.collection('Vaca_blog.users').findOne({name: session.fullName}, function(err, result) {
            if (err) throw reject;

            console.log(result.photos);
            resolve(result.photos);
        });
});
}

Controller.uploadPhoto = function (req, res) {
    let imgName = function(){
        let string = "";
        let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

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

    const upload = multer({storage: storage}).single('gallery_image');

    upload(req, res, (err) => {
        if (err) throw err;
        mongoClient.connect(url, {useNewUrlParser: true}, function(err, db){
            if (err) throw err;

            let dbo = db.db('Vaca_blog');

            let imageUrl = '/images/' + session.username + '/' + req.file.filename;
            dbo.collection('Vaca_blog.users').updateOne({name: session.fullName}, { $push: {photos: imageUrl}}, function(err) {
                if (err) throw err;
                console.log("Uploaded");
            });

            res.redirect('photo');
        });
    });
}

module.exports = Controller;