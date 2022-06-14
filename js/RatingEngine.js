"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const PolicyType_1 = __importDefault(require("./PolicyType"));
const ConsoleLogger_1 = __importDefault(require("./ConsoleLogger"));
const FilePolicySource_1 = __importDefault(require("./FilePolicySource"));
const JsonPolicySerializer_1 = __importDefault(require("./JsonPolicySerializer"));
class RatingEngine {
    constructor() {
        this.Rating = 0;
        this.Logger = new ConsoleLogger_1.default();
        this.PolicySource = new FilePolicySource_1.default();
        this.PolicySerializer = new JsonPolicySerializer_1.default();
    }
    Rate() {
        this.Logger.Log("Starting rate.");
        this.Logger.Log("Loading policy.");
        const policyJson = this.PolicySource.GetPolicyFromSource();
        const policy = this.PolicySerializer.GetPolicyFromJsonString(policyJson);
        switch (policy.Type) {
            case PolicyType_1.default.Auto:
                this.Logger.Log("Rating AUTO policy...");
                this.Logger.Log("Validating policy.");
                if (policy.Make) {
                    this.Logger.Log("Auto policy must specify Make");
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
                this.Logger.Log("Rating LAND policy...");
                this.Logger.Log("Validating policy.");
                if (policy.BondAmount == 0 || policy.Valuation == 0) {
                    this.Logger.Log("Land policy must specify Bond Amount and Valuation.");
                    return;
                }
                if (policy.BondAmount < (0.8 * policy.Valuation)) {
                    this.Logger.Log("Insufficient bond amount.");
                    return;
                }
                this.Rating = policy.BondAmount * 0.05;
                break;
            case PolicyType_1.default.Life:
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
                    this.Rating = baseRate * 2;
                    break;
                }
                this.Rating = baseRate;
                break;
            default:
                this.Logger.Log("Unknown policy type");
                break;
        }
        this.Logger.Log("Rating completed.");
    }
}
exports.default = RatingEngine;
