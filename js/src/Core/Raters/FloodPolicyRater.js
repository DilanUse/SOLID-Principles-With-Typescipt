"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rater_1 = __importDefault(require("./Rater"));
class FloodPolicyRater extends Rater_1.default {
    constructor(logger) {
        super(logger);
    }
    Rate(policy) {
        this.Logger.Log("Rating FLOOD policy...");
        this.Logger.Log("Validating policy.");
        if (policy.BondAmount == 0 || policy.Valuation == 0) {
            this.Logger.Log("Flood policy must specify Bond Amount and Valuation.");
            return 0;
        }
        if (policy.ElevationAboveSeaLevelFeet <= 0) {
            this.Logger.Log("Flood policy is not available for elevations at or below sea level.");
            return 0;
        }
        if (policy.BondAmount < 0.8 * policy.Valuation) {
            this.Logger.Log("Insufficient bond amount.");
            return 0;
        }
        let multiple = 1.0;
        if (policy.ElevationAboveSeaLevelFeet < 100) {
            multiple = 2.0;
        }
        else if (policy.ElevationAboveSeaLevelFeet < 500) {
            multiple = 1.5;
        }
        else if (policy.ElevationAboveSeaLevelFeet < 1000) {
            multiple = 1.1;
        }
        return policy.BondAmount * 0.05 * multiple;
    }
}
exports.default = FloodPolicyRater;
