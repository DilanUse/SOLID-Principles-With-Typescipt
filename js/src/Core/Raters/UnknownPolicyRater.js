"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rater_1 = __importDefault(require("./Rater"));
class UnknownPolicyRater extends Rater_1.default {
    constructor(logger) {
        super(logger);
    }
    Rate(policy) {
        this.Logger.Log('Unknown policy type');
        return 0;
    }
}
exports.default = UnknownPolicyRater;
