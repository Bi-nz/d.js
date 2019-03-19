var Djs = require('../index');
var client = new Djs.Client();

client.on('debug', (d) => {
    console.debug(d);
});

client.once('ready', () => {
    console.log('Bot Started.');
});

client.login('your token');