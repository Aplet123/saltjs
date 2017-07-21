var _ = require("lodash");
function LoadEvents(array, emitter, thisArg) {
    var EventEmitter = require("events");
    if (!(array instanceof Array)) {
        throw new TypeError("did not give array");
    }
    if (!(emitter instanceof EventEmitter)) {
        throw new TypeError("did not give event emitter");
    }
    if (array.length == 0) {
        throw new RangeError("array needs at least one element");
    }
    if (array.some(v => typeof v !== "string")) {
        throw new TypeError("array can have strings only");
    }
    try {
        array = _.flattenDeep(array.map(v => require(v)));
    } catch (err) {
        throw new SyntaxError("invalid file path");
    }
    if (array.some(v => !("type" in v) || !("name" in v) || !("value" in v))) {
        throw new TypeError("module not exported correctly");
    }
    let events = {};
    array.map(v => {
        if (v.type === "event") {
            if (v.name in events) {
                events[v.name].push(v.value);
            } else {
                events[v.name] = [v.value];
            }
        }
    });
    for (let i in events) {
        emitter.on(i, function() {
            events[i].map(v => {
                v.apply(thisArg, arguments);
            });
        });
    }
}

module.exports = LoadEvents;
