const EventEmitter = require('events');
const Events = require('../Constants').Events;
const WebSocketManager = require('../websocket/WebSocketManager');
const request = require('request-promise');
const log = require('js-logs');
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
        var res = await request(endpoints.gateway);
        return new Promise((resolve, reject) => {
            this.emit(Events.DEBUG, `Using token: ${token}`);
            res = JSON.parse(res);
            let gateway = res.url; 
            this.emit(Events.DEBUG, `Gateway: ${gateway}`);
            gateway += 'v=6&encoding=json';
            this.ws.connect(gateway);
        }).catch(e => {
         this.destroy();
          console.log(e);
          return Promise.reject(e);
        });
    }
};



module.exports = Client;
