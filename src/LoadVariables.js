var _ = require("lodash");

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
        array = _.flattenDeep(array.map(v => require(v)));
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

module.exports = LoadVariables;