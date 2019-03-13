const EventEmitter = require('events').EventEmitter;
const WebSocketManager = require('../websocket/WebSocketManager');

class Client extends EventEmitter {
    constructor(options = {}) {
        super();

           this.ws = new WebSocketManager(this);
        
           this.readyAt = null;
        
        // Gonna add more stuff here later
    }
    
    get uptime() {
        return this.readyAt ? Date.now() - this.readyAt : null;    
    }

    static destroy() {
        this.ws.destroy();
        this.token = null;
      }
    
    static login(token) {
          return new Promise((resolve, reject) => {
          if (!token || typeof token !== 'string') throw new Error('TOKEN_INVALID');
          this.ws.connectToWebSocket(token, resolve, reject);
          console.log("works");
        }).catch(e => {
          this.destroy();
          console.log(e);
          return Promise.reject(e);
        });
    }
};

module.exports = Client;
