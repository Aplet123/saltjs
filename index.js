function flatten(array) {
    if (!(array instanceof Array)) {
        throw new TypeError("did not give array");
    }
    array = array.concat([]);
    while (array.some(v => v instanceof Array)) {
        array = array.reduce((a, b) => {
            if (!(a instanceof Array)) {
                a = [a];
            }
            if (!(b instanceof Array)) {
                b = [b];
            }
            return a.concat(b);
        });
    }
    return array;
}
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
        array = flatten(array.map(v => require(v)));
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
        emitter.on(i, function () {
            events[i].map(v => {
                v.apply(thisArg, arguments);
            });
        });
    }
}
function LoadVariables (array, store) {
    if(!(array instanceof Array)) {
        throw new TypeError("did not give array");
    }
    if (array.length == 0) {
        throw new RangeError("array needs at least one element");
    }
    if (array.some(v => typeof v !== "string")) {
        throw new TypeError("array can have strings only");
    }
    try {
        array = flatten(array.map(v => require(v)));
    } catch (err) {
        throw new SyntaxError("invalid file path");
    }
    if (array.some(v => !("type" in v) || !("name" in v) || !("value" in v))) {
        throw new TypeError("module not exported correctly");
    }
    array.map(v => {
        if (v.type === "variable") {
            store[v.name] = v.value;
        }
    });
    return store;
}
function ExportEvent (event, handler) {
    if (typeof event !== "string") {
        throw new TypeError("event must be a string");
    }
    if (!(handler instanceof Function)) {
        throw new TypeError("no function given");
    }
    return {
        type: "event",
        name: event,
        value: handler
    };
}
function ExportVariable (name, value) {
    if (typeof name !== "string") {
        throw new TypeError("name must be a string");
    }
    return {
        type: "variable",
        name,
        value
    };
}
module.exports = {
    LoadEvents,
    LoadVariables,
    ExportEvent,
    ExportVariable
};