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

module.exports = Flatten;
