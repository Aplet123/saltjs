function Flatten (depth = Infinity) {
    var array = this.concat([]);
    var currentDepth = 0;
    while (array.some(v => v instanceof Array) && currentDepth <= depth) {
        array = array.reduce((a, b) => {
            if (!(a instanceof Array)) {
                a = [a];
            }
            if (!(b instanceof Array)) {
                b = [b];
            }
            return a.concat(b);
        });
        currentDepth++;
    }
    return array;
}
class Storage extends Map {
    constructor(iterable) {
        super(iterable);
    }
    static fromObject(obj) {
        return new this(Object.entries(obj));
    }
    valuesArray() {
        return Array.from(this.values());
    }
    keysArray() {
        return Array.from(this.keys());
    }
    array() {
        return Array.from(this);
    }
    find(test, value, caseSensitive = true, strict = true) {
        if (test instanceof Function) {
            return (this.array().find(element => {
                return test(element[1], element[0], this);
            }, this) || [])[1];
        } else if (typeof test === "string") {
            return (this.array().find(element => {
                if (strict) {
                    if (!caseSensitive) {
                        if (typeof element[1][test] === "string" && typeof value === "string") {
                            return element[1][test].toLowerCase() === value.toLowerCase();
                        } else {
                            return element[1][test] === value;
                        }
                    } else {
                        return element[1][test] === value;
                    }
                } else {
                    if (!caseSensitive) {
                        if (typeof element[1][test] === "string" && typeof value === "string") {
                            return element[1][test].toLowerCase() == value.toLowerCase();
                        } else {
                            return element[1][test] == value;
                        }
                    } else {
                        return element[1][test] == value;
                    }
                }
            }, this) || [])[1];
        } else {
            throw new TypeError("test must be either string or function");
        }
    }
    findLast(test, value, caseSensitive = true, strict = true) {
        if (test instanceof Function) {
            return (this.array().reverse().find(element => {
                return test(element[1], element[0], this);
            }, this) || [])[1];
        } else if (typeof test === "string") {
            return (this.array().reverse().find(element => {
                if (strict) {
                    if (!caseSensitive) {
                        if (typeof element[1][test] === "string" && typeof value === "string") {
                            return element[1][test].toLowerCase() === value.toLowerCase();
                        } else {
                            return element[1][test] === value;
                        }
                    } else {
                        return element[1][test] === value;
                    }
                } else {
                    if (!caseSensitive) {
                        if (typeof element[1][test] === "string" && typeof value === "string") {
                            return element[1][test].toLowerCase() == value.toLowerCase();
                        } else {
                            return element[1][test] == value;
                        }
                    } else {
                        return element[1][test] == value;
                    }
                }
            }, this) || [])[1];
        } else {
            throw new TypeError("test must be either string or function");
        }
    }
    findKey(test, value, caseSensitive = true, strict = true) {
        if (test instanceof Function) {
            return (this.array().find(element => {
                return test(element[1], element[0], this);
            }, this) || [])[0];
        } else if (typeof test === "string") {
            return (this.array().find(element => {
                if (strict) {
                    if (!caseSensitive) {
                        if (typeof element[1][test] === "string" && typeof value === "string") {
                            return element[1][test].toLowerCase() === value.toLowerCase();
                        } else {
                            return element[1][test] === value;
                        }
                    } else {
                        return element[1][test] === value;
                    }
                } else {
                    if (!caseSensitive) {
                        if (typeof element[1][test] === "string" && typeof value === "string") {
                            return element[1][test].toLowerCase() == value.toLowerCase();
                        } else {
                            return element[1][test] == value;
                        }
                    } else {
                        return element[1][test] == value;
                    }
                }
            }, this) || [])[0];
        } else {
            throw new TypeError("test must be either string or function");
        }
    }
    findKeyLast(test, value, caseSensitive = true, strict = true) {
        if (test instanceof Function) {
            return (this.array().reverse().find(element => {
                return test(element[1], element[0], this);
            }, this) || [])[0];
        } else if (typeof test === "string") {
            return (this.array().reverse().find(element => {
                if (strict) {
                    if (!caseSensitive) {
                        if (typeof element[1][test] === "string" && typeof value === "string") {
                            return element[1][test].toLowerCase() === value.toLowerCase();
                        } else {
                            return element[1][test] === value;
                        }
                    } else {
                        return element[1][test] === value;
                    }
                } else {
                    if (!caseSensitive) {
                        if (typeof element[1][test] === "string" && typeof value === "string") {
                            return element[1][test].toLowerCase() == value.toLowerCase();
                        } else {
                            return element[1][test] == value;
                        }
                    } else {
                        return element[1][test] == value;
                    }
                }
            }, this) || [])[0];
        } else {
            throw new TypeError("test must be either string or function");
        }
    }
    findAll(test, value, caseSensitive = true, strict = true) {
        var ret = [];
        if (test instanceof Function) {
            this.array().map(v => {
                if (test(v[1], v[0], this)) {
                    ret.push(v[1]);
                }
            });
        } else if (typeof test === "string") {
            this.array().map(v => {
                if (strict) {
                    if (!caseSensitive) {
                        if (typeof v[1][test] === "string" && typeof value === "string") {
                            if (v[1][test].toLowerCase() === value.toLowerCase()) {
                                ret.push(v[1]);
                            }
                        } else {
                            if (v[1][test] === value) {
                                ret.push(v[1]);
                            }
                        }
                    } else {
                        if (v[1][test] === value) {
                            ret.push(v[1]);
                        }
                    }
                } else {
                    if (!caseSensitive) {
                        if (typeof v[1][test] === "string" && typeof value === "string") {
                            if (v[1][test].toLowerCase() == value.toLowerCase()) {
                                ret.push(v[1]);
                            }
                        } else {
                            if (v[1][test] == value) {
                                ret.push(v[1]);
                            }
                        }
                    } else {
                        if (v[1][test] == value) {
                            ret.push(v[1]);
                        }
                    }
                }
            });
        } else {
            throw new TypeError("test must be either string or function");
        }
        return ret;
    }
    findKeyAll(test, value, caseSensitive = true, strict = true) {
        var ret = [];
        if (test instanceof Function) {
            this.array().map(v => {
                if (test(v[1], v[0], this)) {
                    ret.push(v[0]);
                }
            });
        } else if (typeof test === "string") {
            this.array().map(v => {
                if (strict) {
                    if (!caseSensitive) {
                        if (typeof v[1][test] === "string" && typeof value === "string") {
                            if (v[1][test].toLowerCase() === value.toLowerCase()) {
                                ret.push(v[0]);
                            }
                        } else {
                            if (v[1][test] === value) {
                                ret.push(v[0]);
                            }
                        }
                    } else {
                        if (v[1][test] === value) {
                            ret.push(v[0]);
                        }
                    }
                } else {
                    if (!caseSensitive) {
                        if (typeof v[1][test] === "string" && typeof value === "string") {
                            if (v[1][test].toLowerCase() == value.toLowerCase()) {
                                ret.push(v[0]);
                            }
                        } else {
                            if (v[1][test] == value) {
                                ret.push(v[0]);
                            }
                        }
                    } else {
                        if (v[1][test] == value) {
                            ret.push(v[0]);
                        }
                    }
                }
            });
        } else {
            throw new TypeError("test must be either string or function");
        }
        return ret;
    }
    concat(...iterables) {
        iterables = iterables.map(it => Array.from(it)).map(it => it.filter(v => !this.keysArray().includes(v[0])));
        var array = this.array();
        iterables.map(v => array = array.concat(v));
        return new this.constructor(array);
    }
    concatOverwrite(...iterables) {
        iterables = iterables.map(it => Array.from(it));
        var array = this.array();
        iterables.map(v => array = array.concat(v));
        return new this.constructor(array);
    }
    first() {
        return this.valuesArray()[0];
    }
    firstKey() {
        return this.keysArray()[0];
    }
    last() {
        return this.valuesArray()[this.valuesArray().length - 1];
    }
    lastKey() {
        return this.keysArray()[this.keysArray().length - 1];
    }
    nth(n = 0) {
        return this.valuesArray()[n];
    }
    nthKey(n = 0) {
        return this.keysArray()[n];
    }
    nthRight(n = 0) {
        return this.valuesArray()[this.valuesArray().length - 1 - n];
    }
    nthKeyRight(n = 0) {
        return this.keysArray()[this.keysArray().length - 1 - n];
    }
    random() {
        return this.valuesArray()[Math.floor(Math.random() * this.valuesArray().length)];
    }
    randomKey() {
        return this.keysArray()[Math.floor(Math.random() * this.keysArray().length)];
    }
    exists(prop, value, caseSensitive = true, strict = true) {
        return this.find(prop, value, caseSensitive, strict) !== undefined;
    }
    reverse() {
        return new this.constructor(this.array().reverse());
    }
    equals(storage, order = true, strict = true) {
        if (!(storage instanceof this.constructor)) {
            return false;
        }
        if (storage.keysArray().length !== this.keysArray().length) {
            return false;
        }
        if (order) {
            if (strict) {
                var array = this.array();
                var storageArray = storage.array();
                var bool = true;
                storageArray.map((v, i) => {
                    if ((array[i][0] !== v[0]) || (array[i][1] !== v[1])) {
                        bool = false;
                    }
                });
                return bool;
            } else {
                var array = this.array();
                var storageArray = storage.array();
                var bool = true;
                storageArray.map((v, i) => {
                    if ((array[i][0] != v[0]) || (array[i][1] != v[1])) {
                        bool = false;
                    }
                });
                return bool;
            }
        } else {
            if (strict) {
                this.array().map(v => {
                    if (storage.get(v[0]) !== v[1]) {
                        return false;
                    }
                });
                return true;
            } else {
                this.array().map(v => {
                    if (storage.get(v[0]) != v[1]) {
                        return false;
                    }
                });
                return true;
            }
        }
    }
    every(test, value, caseSensitive = true, strict = true) {
        return this.findAll(test, value, caseSensitive, strict).length === this.size;
    }
    some(test, value, caseSensitive = true, strict = true) {
        return this.findAll(test, value, caseSensitive, strict).length > 0;
    }
    fill(value, start = 0, end) {
        if (end === undefined) {
            end = this.size;
        }
        return new this.constructor(this.array().map((v, i) => (i >= start && i < end) ? [v[0], value] : v));
    }
    map(callback) {
        if (callback instanceof Function) {
            return new this.constructor(this.array().map(v => [v[0], callback(v[1], v[0], this)]));
        } else if (typeof callback === "string") {
            return new this.constructor(this.array().map(v => [v[0], v[1][callback]]));
        } else {
            throw new TypeError("must give either a function or a string");
        }
    }
    forEach() {
        return this.map.apply(this, arguments);
    }
    includes(value, fromIndex = 0, caseSensitive = true, strict = true) {
        if (fromIndex < 0) {
            fromIndex = this.size - fromIndex;
        }
        var array = this.valuesArray().slice(Math.max(fromIndex, 0));
        return array.find(v => {
            if (strict) {
                if (!caseSensitive && typeof v === "string" && typeof value === "string") {
                    return v.toLowerCase() === value.toLowerCase();
                } else {
                    return v === value;
                }
            } else {
                if (!caseSensitive && typeof v === "string" && typeof value === "string") {
                    return v.toLowerCase() == value.toLowerCase();
                } else {
                    return v == value;
                }
            }
        }) !== undefined;
    }
    indexOf(value, caseSensitive = true, strict = true) {
        var array = this.array();
        return (array.find(v => {
            if (strict) {
                if (!caseSensitive && typeof v[1] === "string" && typeof value === "string") {
                    return v[1].toLowerCase() === value.toLowerCase();
                } else {
                    return v[1] === value;
                }
            } else {
                if (!caseSensitive && typeof v === "string" && typeof value === "string") {
                    return v[1].toLowerCase() == value.toLowerCase();
                } else {
                    return v[1] == value;
                }
            }
        }) || [-1])[0];
    }
    indexOfLast() {
        return this.indexOf.apply(this.reverse(), arguments);
    }
    pop() {
        var ret = this.last();
        this.delete(this.lastKey());
        return ret;
    }
    unshift() {
        var ret = this.first();
        this.delete(this.firstKey());
        return ret;
    }
    filter(test, value, caseSensitive = true, strict = true) {
        var values = this.findAll(test, value, caseSensitive, strict);
        var keys = this.findKeyAll(test, value, caseSensitive, strict);
        return new this.constructor(keys.map((v, i) => [v, values[i]]));
    }
    reduce(callback, initialValue) {
        let i = 0;
        var array = this.array();
        if (initialValue === undefined) {
            i++;
            initialValue = array[0][1];
        }
        var accumulator = initialValue;
        for (; i < array.length; i++) {
            accumulator = callback(accumulator, array[i][1], array[i][0], this);
        }
        return accumulator;
    }
    reduceRight() {
        return this.reduce.apply(this.reverse(), arguments);
    }
    slice(begin = 0, end) {
        if (end === undefined) {
            end = this.length;
        }
        return new this.constructor(this.array().slice(begin, end));
    }
    sort(func = (a, b) => a > b) {
        var sorted = this.array().sort(function(a, b) {
            return func(a[1], b[1]);
        });
        return new this.constructor(sorted);
    }
    splice(start = 0, delcount, ...items) {
        if (delcount === undefined) {
            delcount = this.size - start;
        }
        return new this.constructor(this.array().splice.apply(this.array(), [start, delcount].concat(items)));
    }
    toString() {
        return `[object ${this.constructor.name}]`;
    }
    toObject() {
        var obj = {};
        this.array().map(v => obj[v[0]] = v[1]);
        return obj;
    }
}

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
        array = Flatten.call(array.map(v => require(v)));
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

function LoadVariables(array, store) {
    if (!(array instanceof Array)) {
        throw new TypeError("did not give array");
    }
    if (array.length == 0) {
        throw new RangeError("array needs at least one element");
    }
    if (array.some(v => typeof v !== "string")) {
        throw new TypeError("array can have strings only");
    }
    try {
        array = Flatten.call(array.map(v => require(v)));
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

function ExportEvent(event, handler) {
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

function ExportVariable(name, value) {
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
    ExportVariable,
    Storage,
    Flatten
};
