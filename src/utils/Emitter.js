const event = require('events').EventEmitter;
const EventEmitter = new event.EventEmitter();
const Events = require('../Constants').Events;

exports.EventEmitter = EventEmitter;

EventEmitter.on(Events.DEBUG, function (msg) {
    console.log(log.red('DEBUG:\n') + msg);
});
EventEmitter.on(Events.WARN, function (msg) {
    console.log(log.yellow('WARN:\n') + msg);
});
EventEmitter.on(Events.READY, function (msg) {
    console.log(log.green('READY:\n') + msg);
});
EventEmitter.on(Events.RESUMED, function (msg) {
    console.log(log.blue('RESUMED:\n') + msg);
});
