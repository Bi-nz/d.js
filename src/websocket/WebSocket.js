const EventEmitter = require('events');
const WS = require('ws');
const zlib = require('zlib');
const Client = require('../client/Client');
const { Events, OPCodes } = require('../Constants');
const { ws } = require('../prefs');

class WebSocket extends EventEmitter {
    constructor(client) {
        super(client);

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
                // I think we should put the ready status in the PacketHandler function
                // self.client.emit(Events.READY);
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
                /*if (typeof msg === 'string') msg = JSON.parse(new Object(msg))
                else if(typeof msg === 'object', String(msg).startsWith('x')) msg = new Buffer(msg);*/
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
								presence: { }
							}
						}));
						break;
					case OPCodes.HEARTBEAT:
						// Makes sure it sends back heartbeat
						this.ws.send(JSON.stringify({
							op: OPCodes.HEARTBEAT,
							d: -1
						}));
                        console.log('Heartbeat: ' + msg);
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
    
	async handlePacket(_packet) {
		const packet = _packet.t;
		this.client.emit('raw', _packet);
        // If you want to record the events, then uncomment line 102, 103 and 104
        /*if (!require('fs').existsSync('./d.js/events')) require('fs').mkdirSync('./d.js/events')
        if (!require('fs').existsSync(`./d.js/events/${_packet.t}.json`))
        require('fs').writeFileSync(`./d.js/events/${_packet.t}.json`, JSON.stringify(_packet, null, 2))*/
        // This packet is emitted when the bot has successfully connected.
		if (packet === 'READY') {
            this.client.guildCount = _packet.d.guilds.length;
		}
        // This packet is emitted when a message has been sent
        if (packet === 'MESSAGE_CREATE') {
            //let Message = new (require('../structures/API'))(this.client, _packet.d).getMessage();
            let message = await (new (require('../structures/Message'))(_packet.d));
            let author = await (new (require('../structures/User'))(_packet.d));
            let channel = await (new (require('../structures/Channel'))(_packet.d));
            // console.log('Message Object: ', message);
            // console.log('Author Object: ', author);
            // console.log('Channel Object: ', channel);
            message.author = author;
            message.channel = channel;
            this.client.emit('message', message);
        }
        // This packet is emitted when this client has joined a server
        if (packet === 'GUILD_CREATE') {
            let self = this
            this.client.guilds[_packet.d.id] = _packet.d;
            
            _packet.d.channels.map((chan) => {
                self.client.channels[chan.id] = chan;
            });
            if (Object.keys(this.client.guilds).length == this.client.guildCount) {
                this.client.emit('ready');
            }
        }
        // This packet is emitted when a user's presence has been updated
        if (packet === 'PRESENCE_UPDATE') {
        }
	}
}

module.exports = WebSocket;