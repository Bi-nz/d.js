const WebSocket = require('ws');
const querystring = require('querystring');

exports.create = (gateway, query= {}, ...args) => {
    const [g, q] = gateway.split('?');
    if (q) query = Object.assign(querystring.parse(q), query);
    const ws = new exports.WebSocket(`${g}?${querystring.stringify(query)}`, ...args);
    return ws;
};
