"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class FileLogger {
    Log(message) {
        fs_1.default.appendFileSync('logs/log.txt', `${message}\n`);
    }
}
exports.default = FileLogger;
