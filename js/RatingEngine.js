"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultRatingContext_1 = __importDefault(require("./DefaultRatingContext"));
class RatingEngine {
    constructor() {
        this.Context = new DefaultRatingContext_1.default();
        this.Rating = 0;
        this.Context.Engine = this;
    }
    Rate() {
        this.Context.Log("Starting rate.");
        this.Context.Log("Loading policy.");
        const policyJson = this.Context.LoadPolicyFromFile();
        const policy = this.Context.GetPolicyFromJsonString(policyJson);
        const rater = this.Context.CreateRaterForPolicy(policy, this.Context);
        rater.Rate(policy);
        this.Context.Log("Rating completed.");
    }
}
exports.default = RatingEngine;
