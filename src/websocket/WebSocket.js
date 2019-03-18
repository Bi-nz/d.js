const EventEmitter = require('events');
const WS = require('ws');
const Client = require('../client/Client');
const { Events, OPCodes } = require('../Constants');
const { ws } = require('../prefs');

class WebSocket extends EventEmitter {
    constructor() {
        super();

        this.client = new Client();

        this.gateway = ws;

        this.ws = new WS(this.gateway);

        this.status = false;
    }

    ready() {
        var self = this;
        this.ws.on('open', function open() {
            if (self.status === false) {
                self.status = true;
                self.client.emit(Events.READY);
            } else {
                self.client.emit(Events.DEBUG, `Status is already ${self.status}`);
            }
        })
    }

    send(msg) {
        while (this.status = true) {
            console.log("k")
        }
    }

    connect() {
        var self = this;
        this.ready();
        if (this.stats === false) {
            this.client.emit(Events.DEBUG, `Failed to connect to websocket.`);
        } else {
            this.ws.on('message', msg => {
                msg = JSON.parse(msg);
                let interval = msg.d.heartbeat_interval;
                console.log(interval);
                setInterval(() => {
                    this.ws.send(JSON.stringify({ op: OPCodes.HEARTBEAT }))
                    //console.log(JSON.stringify({ op: OPCodes.HEARTBEAT }))
                }, interval);
            })
        }
    }
}

module.exports = WebSocket;