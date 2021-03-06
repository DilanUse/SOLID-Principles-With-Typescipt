"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rater_1 = __importDefault(require("./Rater"));
class LandPolicyRater extends Rater_1.default {
    constructor(logger) {
        super(logger);
    }
    Rate(policy) {
        this.Logger.Log("Rating LAND policy...");
        this.Logger.Log("Validating policy.");
        if (policy.BondAmount == 0 || policy.Valuation == 0) {
            this.Logger.Log("Land policy must specify Bond Amount and Valuation.");
            return 0;
        }
        if (policy.BondAmount < (0.8 * policy.Valuation)) {
            this.Logger.Log("Insufficient bond amount.");
            return 0;
        }
        return policy.BondAmount * 0.05;
    }
}
exports.default = LandPolicyRater;
