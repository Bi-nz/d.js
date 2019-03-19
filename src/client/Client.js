const EventEmitter = require('events');
const Events = require('../Constants').Events;
const WebSocket = require('../websocket/WebSocket');
const requestp = require('request-promise');
const request = require('request');
const log = require('js-logs');
const { endpoints, gateway_v, ws } = require('../prefs');

class Client extends EventEmitter {
    constructor(options = {}) {
        super();
        this.ws = WebSocket;
        this.readyAt = null;
        // Gonna add more stuff here later
    }

     test(msg) {
        return this.emit(Events.DEBUG, `[DEBUG] ${msg}`);
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
		this.token = token;
        this.auth(token);
        var res = await requestp(endpoints.gateway);
        return new Promise((resolve, reject) => {
            this.emit(Events.DEBUG, `[DEBUG] Using token: ${token}`);
            res = JSON.parse(res);
            let gateway = res.url; 
            this.emit(Events.DEBUG, `[DEBUG] Gateway: ${gateway}`);
            gateway += `/v=${gateway_v}&encoding=json`;
			this.ws = new WebSocket(this);
			this.ws.connect();
        }).catch(e => {
        	this.destroy();
          	console.log(e);
          	return Promise.reject(e);
        });
    }

    auth(token) {
        request({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bot ' + token,
                'User-Agent': 'DiscordBot (DiscordBot, v1)'
            },
            url: endpoints.login,
            method: 'POST',
        }, function (err, res, body) {
            var json = JSON.parse(body)
            if (json.code !== undefined)
                throw new Error(`TOKEN_INVALID`);
        })
    }
};



module.exports = Client;
