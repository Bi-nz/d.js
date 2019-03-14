const EventEmitter = require('events');
const Events = require('../Constants').Events;
const WebSocketManager = require('../websocket/WebSocketManager');
const request = require('request-promise');
const { endpoints } = require('../prefs');

class Client extends EventEmitter {
    constructor(options = {}) {
        super();
           this.ws = new WebSocketManager(this);
        
           this.readyAt = null;
        
        // Gonna add more stuff here later
    }

     test(msg) {
        return this.emit(Events.DEBUG, msg);
    }
    get uptime() {
        return this.readyAt ? Date.now() - this.readyAt : null;    
    }

    destroy() {
        this.ws.destroy();
        this.token = null;
      }
    
    async login(token) {
        if (!token || typeof token !== 'string') throw new Error('TOKEN_INVALID');
        let res = await request(endpoints.gateway);
        res = JSON.parse(res);
        const gateway = res.url;
        console.log(res.url)
        this.ws.connect(gateway);
    }
};



module.exports = Client;
