"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLogger_1 = __importDefault(require("../ConsoleLogger"));
class Rater {
    constructor(ratingUpdater) {
        this.Logger = new ConsoleLogger_1.default();
        this._ratingUpdater = ratingUpdater;
    }
}
exports.default = Rater;
