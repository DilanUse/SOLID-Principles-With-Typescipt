"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rater_1 = __importDefault(require("./Rater"));
class FloodPolicyRater extends Rater_1.default {
    constructor(engine, logger) {
        super(engine, logger);
    }
    Rate(policy) {
        this._logger.Log("Rating FLOOD policy...");
        this._logger.Log("Validating policy.");
        if (policy.BondAmount == 0 || policy.Valuation == 0) {
            this._logger.Log("Flood policy must specify Bond Amount and Valuation.");
            return;
        }
        if (policy.ElevationAboveSeaLevelFeet <= 0) {
            this._logger.Log("Flood policy is not available for elevations at or below sea level.");
            return;
        }
        if (policy.BondAmount < 0.8 * policy.Valuation) {
            this._logger.Log("Insufficient bond amount.");
            return;
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
        this._engine.Rating = policy.BondAmount * 0.05 * multiple;
    }
}
exports.default = FloodPolicyRater;
