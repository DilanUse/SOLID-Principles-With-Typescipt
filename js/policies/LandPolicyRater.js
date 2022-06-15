"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rater_1 = __importDefault(require("./Rater"));
class LandPolicyRater extends Rater_1.default {
    constructor(engine, logger) {
        super(engine, logger);
    }
    Rate(policy) {
        this._logger.Log("Rating LAND policy...");
        this._logger.Log("Validating policy.");
        if (policy.BondAmount == 0 || policy.Valuation == 0) {
            this._logger.Log("Land policy must specify Bond Amount and Valuation.");
            return;
        }
        if (policy.BondAmount < (0.8 * policy.Valuation)) {
            this._logger.Log("Insufficient bond amount.");
            return;
        }
        this._engine.Rating = policy.BondAmount * 0.05;
    }
}
exports.default = LandPolicyRater;
