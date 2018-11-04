const WebSocket = require('ws');
const session = require('express-session');

const server = new WebSocket.Server({port: 8080});

const Controller = function(){};

let listenersList = [];

Controller.chat = function(req, res) {
    res.render('chat')
}


server.on('connection', ws => {
    let fullName = session.fullName;
    ws.on('message', message => {
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                if (message === '/listeners'){
                    client.send('listeners:<br>' + listenersList);
                }
                else{
                    client.send(fullName + ":" + message);
                }
            }
        })
    });

    ws.send('You login as ' + fullName);

    listenersList.push(fullName);
})

module.exports = Controller;