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

module.exports = ExportEvent;