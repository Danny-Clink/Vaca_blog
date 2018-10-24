const session = require('express-session');
const io = require('socket.io');

let Controller = function(){};

Controller.chat = function(req, res){
    res.render('chat');
};

Controller.chat = function(req, res){

//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected');
  });

};

module.exports = Controller;