var events = require('events');
var eventEmitter = new events.EventEmitter();

var ringbell = function(){
    console.log("Ringing Bell")
}


eventEmitter.on('doorOpen', ringbell)
eventEmitter.emit('doorOpen')