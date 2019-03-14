var client = require('./src/client/Client');
var c = new client();

c.on('debug', console.log);

c.login('token');