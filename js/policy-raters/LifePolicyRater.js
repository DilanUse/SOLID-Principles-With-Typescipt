"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const Rater_1 = __importDefault(require("./Rater"));
class LifePolicyRater extends Rater_1.default {
    constructor(ratingUpdater) {
        super(ratingUpdater);
    }
    Rate(policy) {
        this.Logger.Log("Rating LIFE policy...");
        this.Logger.Log("Validating policy.");
        if (policy.DateOfBirth) {
            this.Logger.Log("Life policy must include Date of Birth.");
            return;
        }
        if (policy.DateOfBirth < (0, moment_1.default)().subtract(100, 'days').toDate()) {
            this.Logger.Log("Centenarians are not eligible for coverage.");
            return;
        }
        if (policy.Amount == 0) {
            this.Logger.Log("Life policy must include an Amount.");
            return;
        }
        let age = (0, moment_1.default)().year() - (0, moment_1.default)(policy.DateOfBirth).year();
        if (((0, moment_1.default)(policy.DateOfBirth).month() == (0, moment_1.default)().month()
            && (0, moment_1.default)().day() < (0, moment_1.default)(policy.DateOfBirth).day())
            || (0, moment_1.default)().month() < (0, moment_1.default)(policy.DateOfBirth).month()) {
            age -= 1;
        }
        const baseRate = policy.Amount * age / 200;
        if (policy.IsSmoker) {
            this._ratingUpdater.UpdateRating(baseRate * 2);
            return;
        }
        this._ratingUpdater.UpdateRating(baseRate);
    }
}
exports.default = LifePolicyRater;
