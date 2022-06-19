"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rater_1 = __importDefault(require("./Rater"));
class AutoPolicyRater extends Rater_1.default {
    constructor(ratingUpdater) {
        super(ratingUpdater);
    }
    Rate(policy) {
        this.Logger.Log("Rating AUTO policy...");
        this.Logger.Log("Validating policy.");
        if (!policy.Make) {
            this.Logger.Log("Auto policy must specify Make");
            return;
        }
        if (policy.Make == "BMW") {
            if (policy.Deductible < 500) {
                this._ratingUpdater.UpdateRating(1000);
            }
            this._ratingUpdater.UpdateRating(900);
        }
    }
}
exports.default = AutoPolicyRater;
