"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rater_1 = __importDefault(require("./Rater"));
class AutoPolicyRater extends Rater_1.default {
    constructor(engine, logger) {
        super(engine, logger);
    }
    Rate(policy) {
        this._logger.Log("Rating AUTO policy...");
        this._logger.Log("Validating policy.");
        if (!policy.Make) {
            this._logger.Log("Auto policy must specify Make");
            return;
        }
        if (policy.Make == "BMW") {
            if (policy.Deductible < 500) {
                this._engine.Rating = 1000;
            }
            this._engine.Rating = 900;
        }
    }
}
exports.default = AutoPolicyRater;
