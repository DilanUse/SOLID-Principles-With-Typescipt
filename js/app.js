"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RatingEngine_1 = __importDefault(require("./RatingEngine"));
console.log("Insurance Rating System Starting...");
const engine = new RatingEngine_1.default();
engine.Rate();
if (engine.Rating > 0) {
    console.log(`Rating: ${engine.Rating}`);
}
else {
    console.log("No rating produced.");
}
