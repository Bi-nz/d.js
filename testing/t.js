const WebSocket = require('../src/websocket/WebSocket');
const ws = new WebSocket('wss://gateway.discord.gg/?v=7&encoding=json');


ws.connect();

//const websocket = require('ws');
//const ws = new websocket('wss://gateway.discord.gg/?v=7&encoding=json');
//this.t;
//ws.on('open', function open() {
//    console.log("ok")
//    ws.on('message', msg => {
//        console.log(msg)
//        // ws.send(msg)
//    })
//    console.log("lel")
//    ws.send("lol")
//})


