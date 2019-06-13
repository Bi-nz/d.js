'use strict';

const Prefs = require('../prefs');
module.exports = class {
    /**
     * @param {Client} client
     * @param {DiscordMethod} api_method
     * @param {HTTPMethod} method
     * @param {?String} data
     */
    constructor(client, api_method, method, data) {
        /**
         * Discord Client/Bot
         * @type {Client}
         */
        this.client = client;
        /**
         * Discord API Method
         * @type {DiscordMethod}
         */
        this.api_method = api_method;
        /**
         * HTTP Method
         * @type {HTTPMethod}
         */
        this.method = method;
        /**
         * 
         * @type {?String}
         */
        this.data = data;
    }

    _do() {
        switch(this.method) {
            case 'GET':
                break;
            case 'POST':
                break;
            case 'DELETE':
                break;
            case 'PATCH':
                break;
            case 'PUT':
                break;
            default:
                throw new Error('INVALID_METHOD');
        }
    }
}