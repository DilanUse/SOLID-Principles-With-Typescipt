"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PolicyType_1 = __importDefault(require("./Model/PolicyType"));
const RatingEngine_1 = __importDefault(require("./RatingEngine"));
const JsonPolicySerializer_1 = __importDefault(require("../Infrastructure/Serializers/JsonPolicySerializer"));
const FakeLogger_1 = __importDefault(require("../../test/FakeLogger"));
const FakePolicySource_1 = __importDefault(require("../../test/FakePolicySource"));
const RaterFactory_1 = __importDefault(require("./Raters/RaterFactory"));
describe('Test rating land policies', () => {
    let _logger;
    let _policySource;
    let _engine;
    let _policySerializer;
    let _raterFactory;
    beforeEach(() => {
        _logger = new FakeLogger_1.default();
        _policySource = new FakePolicySource_1.default();
        _policySerializer = new JsonPolicySerializer_1.default();
        _raterFactory = new RaterFactory_1.default(_logger);
        _engine = new RatingEngine_1.default(_logger, _policySource, _policySerializer, _raterFactory);
    });
    it('Returns Rating Of 10000 For 200000 LandPolicy', () => {
        const policy = {
            Type: PolicyType_1.default.Land,
            BondAmount: 200000,
            Valuation: 200000
        };
        const policySerializer = new JsonPolicySerializer_1.default();
        _policySource.PolicyString = policySerializer.SerializePolicyToJson(policy);
        _engine.Rate();
        const result = _engine.Rating;
        expect(result).toBe(10000);
    });
    it('Returns Rating Of 0 For 200000 Bond On 260000 Land Policy', () => {
        const policy = {
            Type: PolicyType_1.default.Land,
            BondAmount: 200000,
            Valuation: 260000
        };
        const policySerializer = new JsonPolicySerializer_1.default();
        _policySource.PolicyString = policySerializer.SerializePolicyToJson(policy);
        _engine.Rate();
        const result = _engine.Rating;
        expect(result).toBe(0);
    });
    it('Logs Starting Loading And Completing', () => {
        const policy = {
            Type: PolicyType_1.default.Land,
            BondAmount: 200000,
            Valuation: 260000
        };
        const policySerializer = new JsonPolicySerializer_1.default();
        _policySource.PolicyString = policySerializer.SerializePolicyToJson(policy);
        _engine.Rate();
        const result = _engine.Rating;
        expect(_logger.LoggedMessages).toContain("Starting rate.");
        expect(_logger.LoggedMessages).toContain("Loading policy.");
        expect(_logger.LoggedMessages).toContain("Rating completed.");
    });
});
