module.exports = {};

var path = require("path");
var fs = require("fs");
for(let val of fs.readdirSync(path.join(__dirname, "src"))) {
    module.exports[val.replace(/\.js$/i, "")] = require(path.join(__dirname, "src", val));
}