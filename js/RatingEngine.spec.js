"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const PolicyType_1 = __importDefault(require("./PolicyType"));
const RatingEngine_1 = __importDefault(require("./RatingEngine"));
const JsonPolicySerializer_1 = __importDefault(require("./JsonPolicySerializer"));
describe('Test rating land policies', () => {
    it('Returns Rating Of 10000 For 200000 LandPolicy', () => {
        const policy = {
            Type: PolicyType_1.default.Land,
            BondAmount: 200000,
            Valuation: 200000
        };
        const policySerializer = new JsonPolicySerializer_1.default();
        const json = policySerializer.SerializePolicyToJson(policy);
        fs_1.default.writeFileSync('assets/policy.json', json);
        const engine = new RatingEngine_1.default();
        engine.Rate();
        const result = engine.Rating;
        expect(result).toBe(10000);
    });
    it('Returns Rating Of 0 For 200000 Bond On 260000 Land Policy', () => {
        const policy = {
            Type: PolicyType_1.default.Land,
            BondAmount: 200000,
            Valuation: 260000
        };
        const policySerializer = new JsonPolicySerializer_1.default();
        const json = policySerializer.SerializePolicyToJson(policy);
        fs_1.default.writeFileSync('assets/policy.json', json);
        const engine = new RatingEngine_1.default();
        engine.Rate();
        const result = engine.Rating;
        expect(result).toBe(0);
    });
});
