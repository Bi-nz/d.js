var Djs = require('../index').Client;
var client = new Djs();

client.on('debug', console.log);

client.login('token');