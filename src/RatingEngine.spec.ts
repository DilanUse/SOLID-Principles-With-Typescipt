import fs from 'fs';
import { Policy } from './Policy';
import PolicyType from './PolicyType';
import RatingEngine from './RatingEngine';
import * as assert from 'assert';

describe('Test rating land policies', () => {
    it('Returns Rating Of 10000 For 200000 LandPolicy', () => {
        const policy: Policy = {
            Type: PolicyType.Land,
            BondAmount: 200000,
            Valuation: 200000
        };

        const json: string = JSON.stringify(policy);
        fs.writeFileSync('policy.json', json);

        const engine = new RatingEngine();
        engine.Rate();
        const result: number = engine.Rating;

        expect<number>(result).toBe(10000);
    });

    it('Returns Rating Of 0 For 200000 Bond On 260000 Land Policy', () => {
        const policy: Policy = {
            Type: PolicyType.Land,
            BondAmount: 200000,
            Valuation: 260000
        };

        const json: string = JSON.stringify(policy);
        fs.writeFileSync('policy.json', json);

        const engine = new RatingEngine();
        engine.Rate();
        const result: number = engine.Rating;

        expect<number>(result).toBe(0);
    });
});
