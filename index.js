function LoadEvents (array, emitter, thisArg) {
    var EventEmitter = require("events");
    if(!(array instanceof Array)) {
        throw new TypeError("did not give array");
    }
    if(!(emitter instanceof EventEmitter)) {
        throw new TypeError("did not give event emitter");
    }
    if (array.length == 0) {
        throw new RangeError("array needs at least one element");
    }
    if (array.some(v => typeof v !== "string")) {
        throw new TypeError("array can have strings only");
    }
    try {
        array = array.map(v => require(v));
    } catch (err) {
        throw new SyntaxError("invalid file path");
    }
    if (array.some(v => !(v instanceof Function))) {
        throw new TypeError("module not exported correctly");
    }
    let count = 0;
    var channel = new EventEmitter();
    let events = {};
    channel.on("connected", function() {
        if ((++ count) >= array.length) {
            count = 0;
            channel.emit("sendData");
        }
    });
    channel.on("data", function(data) {
        if (data.event in events) {
            events[data.event].push(data.handler);
        } else {
            events[data.event] = [data.handler];
        }
        if ((++ count) >= array.length) {
            for (let i in events) {
                emitter.on(i, function() {
                    events[i].map(v => v.apply(thisArg, arguments));
                });
            }
        }
    });
    array.map(v => v(channel));
}
function ExportEvent (event, handler) {
    var EventEmitter = require("events");
    if (typeof event !== "string") {
        throw new TypeError("event must be a string");
    }
    if (!(handler instanceof Function)) {
        throw new TypeError("no function given");
    }
    return function (channel) {
        channel.on("sendData", function() {
            channel.emit("data", {
                event,
                handler
            });
        });
        channel.emit("connected");
    };
}
module.exports = {
    LoadEvents,
    ExportEvent
};