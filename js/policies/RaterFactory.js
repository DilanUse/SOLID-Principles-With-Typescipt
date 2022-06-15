"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PolicyType_1 = __importDefault(require("../PolicyType"));
const AutoPolicyRater_1 = __importDefault(require("./AutoPolicyRater"));
const LandPolicyRater_1 = __importDefault(require("./LandPolicyRater"));
const LifePolicyRater_1 = __importDefault(require("./LifePolicyRater"));
const FloodPolicyRater_1 = __importDefault(require("./FloodPolicyRater"));
const raters = {
    AutoPolicyRater: AutoPolicyRater_1.default,
    LandPolicyRater: LandPolicyRater_1.default,
    LifePolicyRater: LifePolicyRater_1.default,
    FloodPolicyRater: FloodPolicyRater_1.default,
};
class RaterFactory {
    Create(policy, engine) {
        try {
            return new raters[`${PolicyType_1.default[policy.Type]}PolicyRater`](engine, engine.Logger);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
}
exports.default = RaterFactory;
