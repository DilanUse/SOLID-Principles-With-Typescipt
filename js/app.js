"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RatingEngine_1 = __importDefault(require("./RatingEngine"));
const ConsoleLogger_1 = __importDefault(require("./ConsoleLogger"));
const Logger = new ConsoleLogger_1.default();
Logger.Log("Insurance Rating System Starting...");
const engine = new RatingEngine_1.default();
engine.Rate();
if (engine.Rating > 0) {
    Logger.Log(`Rating: ${engine.Rating}`);
}
else {
    Logger.Log("No rating produced.");
}
