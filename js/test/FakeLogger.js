"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FakeLogger {
    constructor() {
        this.LoggedMessages = [];
    }
    Log(message) {
        this.LoggedMessages.push(message);
    }
}
exports.default = FakeLogger;
