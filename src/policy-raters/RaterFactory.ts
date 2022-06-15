import { Policy } from '../Policy';
import RatingEngine from '../RatingEngine';
import PolicyType from '../PolicyType';
import AutoPolicyRater from './AutoPolicyRater';
import LandPolicyRater from './LandPolicyRater';
import LifePolicyRater from './LifePolicyRater';
import FloodPolicyRater from './FloodPolicyRater';
import Rater from './Rater';

const raters = {
    AutoPolicyRater,
    LandPolicyRater,
    LifePolicyRater,
    FloodPolicyRater,
};

export default class RaterFactory {
    public Create(policy: Policy, engine: RatingEngine): Rater {
        try {
            return new raters[`${PolicyType[policy.Type]}PolicyRater`](engine, engine.Logger);
        } catch (e) {
            return null;
        }
    }
}
