const Djs = require('../index');
var client = new Djs.Client();
const config = require('./config.json');
global.Array.prototype.first = function() {
    return this[0] ? this[0] : undefined
}

client.on('debug', (d) => {
    console.debug(d);
});

client.once('ready', () => {
    console.log('Bot Started.');
    let arr = []
    if (arr.first())
        console.log('Attempt 1: First array exists.')
    else console.log('Attempt 1: First array does not exist')
    arr.push(client.token)
    if (arr.first())
        console.log('Attempt 2: First array exists.')
    else console.log('Attempt 2: First array does not exist')
});

client.on('message', function(msg) {
    if(msg.author.bot) return;
    if (!msg.content.toLowerCase().startsWith('s!')) return;
    let split = msg.content.substring('s!'.length).split(' ');
    let cmd = split[0].toLowerCase();
    let args = split.join(' ').substring(cmd.length + 1);
    if(!cmd) return;
    var embed = new (require('../index').RichEmbed)
    switch(cmd) {
        case 'ping':
            msg.channel.send('pong');
            break;
        case 'nou':
            msg.channel.send(`<@${msg.author.id}> no u`);
            break;
        case 'say':
            if(args.length === 0 || !args) return msg.channel.send(`<@${msg.author.id}>, you must input arguments.`)
            embed.setAuthor(msg.author.username, null, msg.author.avatarUrl);
            embed.setDescription(args);
            msg.channel.send(embed)
            break;
    }
});

/*client.on('raw', (packet) => {
    console.debug(packet);
});*/

client.login(config.token); 
