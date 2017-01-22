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

module.exports = ExportVariable;