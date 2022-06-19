"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rater_1 = __importDefault(require("./Rater"));
class UnknownPolicyRater extends Rater_1.default {
    constructor(engine, logger) {
        super(engine, logger);
    }
    Rate(policy) {
        this._logger.Log('Unknown policy type');
    }
}
exports.default = UnknownPolicyRater;
