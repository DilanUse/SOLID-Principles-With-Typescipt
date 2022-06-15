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
class RaterFactory {
    Create(policy, engine) {
        switch (policy.Type) {
            case PolicyType_1.default.Auto:
                return new AutoPolicyRater_1.default(engine, engine.Logger);
            case PolicyType_1.default.Flood:
                return new FloodPolicyRater_1.default(engine, engine.Logger);
            case PolicyType_1.default.Land:
                return new LandPolicyRater_1.default(engine, engine.Logger);
            case PolicyType_1.default.Life:
                return new LifePolicyRater_1.default(engine, engine.Logger);
            default:
                // Todo: Implement Null Object Patterns
                // engine.Logger.Log("Unknown policy type");
                return null;
        }
    }
}
exports.default = RaterFactory;
