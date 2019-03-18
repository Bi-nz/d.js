var client = require('../index').Client;
var c = new client();

c.on('debug', console.log);

c.login('token');