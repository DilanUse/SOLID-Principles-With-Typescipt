"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rater_1 = __importDefault(require("./Rater"));
class AutoPolicyRater extends Rater_1.default {
    constructor(logger) {
        super(logger);
    }
    Rate(policy) {
        this.Logger.Log("Rating AUTO policy...");
        this.Logger.Log("Validating policy.");
        if (!policy.Make) {
            this.Logger.Log("Auto policy must specify Make");
            return 0;
        }
        if (policy.Make == "BMW") {
            if (policy.Deductible < 500) {
                return 1000;
            }
            return 900;
        }
        return 0;
    }
}
exports.default = AutoPolicyRater;
