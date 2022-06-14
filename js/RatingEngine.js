"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const policy_json_1 = __importDefault(require("./policy.json"));
const Policy_1 = require("./Policy");
const PolicyType_1 = __importDefault(require("./PolicyType"));
class RatingEngine {
    Rate() {
        console.log("Starting rate.");
        console.log("Loading policy.");
        const policy = Object.assign(new Policy_1.Policy(), {
            Type: PolicyType_1.default[policy_json_1.default.type],
            Valuation: Number(policy_json_1.default.valuation),
            BondAmount: Number(policy_json_1.default.bondAmount),
        });
        switch (policy.Type) {
            case PolicyType_1.default.Auto:
                console.log("Rating AUTO policy...");
                console.log("Validating policy.");
                if (policy.Make) {
                    console.log("Auto policy must specify Make");
                    return;
                }
                if (policy.Make == "BMW") {
                    if (policy.Deductible < 500) {
                        this.Rating = 1000;
                    }
                    this.Rating = 900;
                }
                break;
            case PolicyType_1.default.Land:
                console.log("Rating LAND policy...");
                console.log("Validating policy.");
                if (policy.BondAmount == 0 || policy.Valuation == 0) {
                    console.log("Land policy must specify Bond Amount and Valuation.");
                    return;
                }
                if (policy.BondAmount < (0.8 * policy.Valuation)) {
                    console.log("Insufficient bond amount.");
                    return;
                }
                this.Rating = policy.BondAmount * 0.05;
                break;
            case PolicyType_1.default.Life:
                console.log("Rating LIFE policy...");
                console.log("Validating policy.");
                if (policy.DateOfBirth) {
                    console.log("Life policy must include Date of Birth.");
                    return;
                }
                if (policy.DateOfBirth < (0, moment_1.default)().subtract(100, 'days').toDate()) {
                    console.log("Centenarians are not eligible for coverage.");
                    return;
                }
                if (policy.Amount == 0) {
                    console.log("Life policy must include an Amount.");
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
                    this.Rating = baseRate * 2;
                    break;
                }
                this.Rating = baseRate;
                break;
            default:
                console.log("Unknown policy type");
                break;
        }
        console.log("Rating completed.");
    }
}
exports.default = RatingEngine;
