const EventEmitter = require('events');
const WebSocket = require('./WebSocket');
const { Status, Events } = require('../Constants');

class WebSocketConnection extends EventEmitter {
    constructor(manager, gateway) {
        super();
    this.manager = manager;
    
    this.gateway = gateway;
    
    this.ws = null;
    
    this.client = manager.client;
    
    this.status = Status.IDLE;
  }
  
  ready() {
    if (this.status === Status.READY) {
      this.debug('I\'m already ready.');
    } else {
      this.debug('Getting ready.');
      this.status = Status.READY;
      this.client.emit(Events.READY);
    }
  }
  
  readyCheck() {
    if (this.status !== Status.READY) {
      ready();
      return false;
    } else
    if (this.status === Status.READY) {
      return true;
    }
  }
  
  debug(message) {
    return this.manager.debug(`CON: ${message}`);
  }
  
  connect(gateway = this.gateway, force = false) {
    if (!gateway || typeof gateway !== 'string') {
      this.debug('Invalid Gateway');   
    } else
    if (this.ws && !force) {
      this.debug('Websocket connection already exists.');
    }
    this.debug(`Connecting to ${gateway}`);
    const ws = this.ws = WebSocket.create(gateway);
      this.status = Status.CONNECTING;
    return true;
  }
};

module.exports = WebSocketConnection;
