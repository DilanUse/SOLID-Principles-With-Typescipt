import FakeLogger from '../../test/FakeLogger';
import AutoPolicyRater from './AutoPolicyRater';
import FakeRatingUpdater from '../../test/FakeRatingUpdater';
import {Policy} from '../Policy';
import PolicyType from '../PolicyType';

describe('Test Auto Policy Rater', () => {
    it('Logs Make Required Message Given Policy Without Make',  () => {
        const policy: Policy = { Type: PolicyType.Auto };
        const logger = new FakeLogger();
        const rater = new AutoPolicyRater(null);
        rater.Logger = logger;

        rater.Rate(policy);

        expect<string>("Auto policy must specify Make").toEqual(logger.LoggedMessages.pop());
    });

    it('Sets Rating To 1000 For BMW With 250 Deductible',  () => {
        const policy: Policy =
        {
            Type: PolicyType.Auto,
            Make: "BMW",
            Deductible: 250,
        };
        const ratingUpdater = new FakeRatingUpdater();
        const rater = new AutoPolicyRater(ratingUpdater);

        rater.Rate(policy);

        expect<number>(ratingUpdater.NewRating).toEqual(1000);
    });

    it('Sets Rating To 900 For BMW With 500 Deductible',  () => {
        const policy: Policy =
            {
                Type: PolicyType.Auto,
                Make: "BMW",
                Deductible: 500,
            };
        const ratingUpdater = new FakeRatingUpdater();
        const rater = new AutoPolicyRater(ratingUpdater);

        rater.Rate(policy);

        expect<number>(ratingUpdater.NewRating).toEqual(900);
    });
});
