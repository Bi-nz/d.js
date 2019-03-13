const EventEmitter = require('events');
const WebSocketConnection = require('./WebSocketConnection');
const { Events, Status } = require('../Constants');

class WebSocketManager extends EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        this.connection = null;
    }
    
    debug(message) {
        return this.client.emit(Events.DEBUG, message);   
    }
    
    connect(gateway) {
        if (!this.connection) {
          this.connection = new WebSocketConnection(this, gateway);
          return true;
        }
        switch (this.connection.status) {
            case Status.IDLE:
            case Status.DISCONNECTED:
              this.connection.connect(gateway, 5500);
              return true;
            default:
              this.debug(`Could not connect to ${gateway} as the websocket is ${this.connection.status}`);
              return false;
        }
    }
    
    destroy() {
        if (!this.connection) return this.debug('No connection to destroy.');
        this.connection.destroy();
    }
}

module.exports = WebSocketManager;
