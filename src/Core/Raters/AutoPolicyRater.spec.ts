import FakeLogger from '../../../test/FakeLogger';
import AutoPolicyRater from './AutoPolicyRater';
import {Policy} from '../Model/Policy';
import PolicyType from '../Model/PolicyType';

describe('Test Auto Policy Rater', () => {
    let _logger: FakeLogger;

    beforeEach(() => {
        _logger = new FakeLogger();
    });

    it('Logs Make Required Message Given Policy Without Make',  () => {
        const policy: Policy = { Type: PolicyType.Auto };
        const rater = new AutoPolicyRater(_logger);

        rater.Rate(policy);

        expect<string>("Auto policy must specify Make").toEqual(_logger.LoggedMessages.pop());
    });

    it('Sets Rating To 1000 For BMW With 250 Deductible',  () => {
        const policy: Policy =
        {
            Type: PolicyType.Auto,
            Make: "BMW",
            Deductible: 250,
        };
        const rater = new AutoPolicyRater(_logger);
        const result = rater.Rate(policy);

        expect<number>(result).toEqual(1000);
    });

    it('Sets Rating To 900 For BMW With 500 Deductible',  () => {
        const policy: Policy =
            {
                Type: PolicyType.Auto,
                Make: "BMW",
                Deductible: 500,
            };
        const rater = new AutoPolicyRater(_logger);
        const result = rater.Rate(policy);

        expect<number>(result).toEqual(900);
    });
});
