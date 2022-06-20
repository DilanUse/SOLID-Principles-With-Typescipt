"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FakeLogger_1 = __importDefault(require("../../../test/FakeLogger"));
const AutoPolicyRater_1 = __importDefault(require("./AutoPolicyRater"));
const PolicyType_1 = __importDefault(require("../Model/PolicyType"));
describe('Test Auto Policy Rater', () => {
    let _logger;
    beforeEach(() => {
        _logger = new FakeLogger_1.default();
    });
    it('Logs Make Required Message Given Policy Without Make', () => {
        const policy = { Type: PolicyType_1.default.Auto };
        const rater = new AutoPolicyRater_1.default(_logger);
        rater.Rate(policy);
        expect("Auto policy must specify Make").toEqual(_logger.LoggedMessages.pop());
    });
    it('Sets Rating To 1000 For BMW With 250 Deductible', () => {
        const policy = {
            Type: PolicyType_1.default.Auto,
            Make: "BMW",
            Deductible: 250,
        };
        const rater = new AutoPolicyRater_1.default(_logger);
        const result = rater.Rate(policy);
        expect(result).toEqual(1000);
    });
    it('Sets Rating To 900 For BMW With 500 Deductible', () => {
        const policy = {
            Type: PolicyType_1.default.Auto,
            Make: "BMW",
            Deductible: 500,
        };
        const rater = new AutoPolicyRater_1.default(_logger);
        const result = rater.Rate(policy);
        expect(result).toEqual(900);
    });
});
