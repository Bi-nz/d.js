const EventEmitter = require('events');
const WS = require('ws');
const Client = require('../client/Client');
const { Events, OPCodes } = require('../Constants');
const { ws } = require('../prefs');

class WebSocket extends EventEmitter {
    constructor(client) {
        super();

        this.client = client;

        this.gateway = ws;

        this.ws = new WS(this.gateway);

        this.status = false;
    }

    ready() {
        var self = this;
        this.ws.on('open', () => {
            if (Boolean(self.status) === false) {
                self.status = true;
                self.client.emit(Events.READY);
            } else {
                self.client.emit(Events.DEBUG, `[DEBUG] Status is already ${self.status}`);
            }
        })
    }

    send(msg) {
        while (Boolean(this.status) === true) {
            console.log("k")
        }
    }

    connect() {
        var self = this;
        this.ready();
        if (this.stats === false) {
            this.client.emit(Events.DEBUG, `Failed to connect to websocket.`);
        } else {
			this.ws.on('error', msg => {
				this.client.emit('error', msg);
			});
            
            this.ws.on('message', msg => {
                msg = JSON.parse(msg);
				switch (msg.op) {
					case OPCodes.HELLO:
						this.heartbeat_interval = msg.d.heartbeat_interval;
						console.log(this.heartbeat_interval);
						setInterval(() => {
							this.ws.send(JSON.stringify({
								op: OPCodes.HEARTBEAT,
								d: -1
							}));
						}, this.heartbeat_interval);
						this.ws.send(JSON.stringify({
							op: OPCodes.IDENTIFY,
							d: {
								token: this.client.token,
								properties: {
									"$os": "d.js",
									"$browser": "d.js",
									"$device": "d.js"
								},
								compress: false,
								large_threshold: 250,
								shard: [0, 1],
								presence: {}
							}
						}));
						break;
					case OPCodes.HEARTBEAT:
						// Makes sure it sends back heartbeat
						this.ws.send(JSON.stringify({
							op: OPCodes.HEARTBEAT,
							d: -1
						}));
						break;
					case OPCodes.DISPATCH:
						this.handlePacket(msg);
						break;
					default:
						this.client.emit('unknown', msg);
				}
            })
        }
    }
    
	handlePacket(_packet) {
		const packet = _packet.t;
		this.client.emit('raw', _packet);
        // This packet is emitted when the bot has successfully connected.
		if (packet === 'READY') {
			this.client.emit('ready');
		}
        // This packet is emitted when a message has been sent
        if (packet === 'MESSAGE_CREATE') {
            this.client.emit('message', _packet);
        }
        // This packet is emitted when this client has joined a server
        if (packet === 'GUILD_CREATE') {
            
        }
        // This packet is emitted when a user's presence has been updated
        if (packet === 'PRESENCE_UPDATE') {
            
        }
	}
}

module.exports = WebSocket;