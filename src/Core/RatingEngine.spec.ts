import fs from 'fs';
import {Policy} from './Model/Policy';
import PolicyType from './Model/PolicyType';
import RatingEngine from './RatingEngine';
import JsonPolicySerializer from '../Infrastructure/Serializers/JsonPolicySerializer';
import FakeLogger from '../../test/FakeLogger';
import FakePolicySource from '../../test/FakePolicySource';
import RaterFactory from './Raters/RaterFactory';

describe('Test rating land policies', () => {
    let _logger: FakeLogger;
    let _policySource: FakePolicySource;
    let _engine: RatingEngine;
    let _policySerializer: JsonPolicySerializer;
    let _raterFactory: RaterFactory;


    beforeEach(() => {
        _logger = new FakeLogger();
        _policySource = new FakePolicySource();
        _policySerializer = new JsonPolicySerializer();
        _raterFactory = new RaterFactory(_logger);
        _engine = new RatingEngine(
            _logger,
            _policySource,
            _policySerializer,
            _raterFactory
        );
    });

    it('Returns Rating Of 10000 For 200000 LandPolicy', () => {
        const policy: Policy = {
            Type: PolicyType.Land,
            BondAmount: 200000,
            Valuation: 200000
        };

        const policySerializer = new JsonPolicySerializer();
        _policySource.PolicyString = policySerializer.SerializePolicyToJson(policy);

        _engine.Rate();
        const result: number = _engine.Rating;

        expect<number>(result).toBe(10000);
    });

    it('Returns Rating Of 0 For 200000 Bond On 260000 Land Policy', () => {
        const policy: Policy = {
            Type: PolicyType.Land,
            BondAmount: 200000,
            Valuation: 260000
        };

        const policySerializer = new JsonPolicySerializer();
        _policySource.PolicyString = policySerializer.SerializePolicyToJson(policy);

        _engine.Rate();
        const result: number = _engine.Rating;

        expect<number>(result).toBe(0);
    });

    it('Logs Starting Loading And Completing', () => {
        const policy: Policy = {
            Type: PolicyType.Land,
            BondAmount: 200000,
            Valuation: 260000
        };

        const policySerializer = new JsonPolicySerializer();
        _policySource.PolicyString = policySerializer.SerializePolicyToJson(policy);

        _engine.Rate();
        const result: number = _engine.Rating;

        expect<string[]>(_logger.LoggedMessages).toContain("Starting rate.");
        expect<string[]>(_logger.LoggedMessages).toContain("Loading policy.");
        expect<string[]>(_logger.LoggedMessages).toContain("Rating completed.");
    });
});
