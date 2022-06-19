"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLogger_1 = __importDefault(require("./ConsoleLogger"));
const FilePolicySource_1 = __importDefault(require("./FilePolicySource"));
const JsonPolicySerializer_1 = __importDefault(require("./JsonPolicySerializer"));
const RaterFactory_1 = __importDefault(require("./policy-raters/RaterFactory"));
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
        const factory = new RaterFactory_1.default();
        const rater = factory.Create(policy, this);
        rater.Rate(policy);
        this.Logger.Log("Rating completed.");
    }
}
exports.default = RatingEngine;
