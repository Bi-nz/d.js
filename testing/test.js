var Djs = require('../index');
var client = new Djs.Client();

client.on('debug', (d) => {
    console.debug(d);
});

client.once('ready', () => {
    console.log('Bot Started.');
});

client.login('NDQ3MzIzNTI2OTI0NTk5MzA3.D3FU7g.7mTU_L-xTUkc2UJxzmyx1_s5hs8');