import { Policy } from '../Policy';
import RatingEngine from '../RatingEngine';
import PolicyType from '../PolicyType';
import AutoPolicyRater from './AutoPolicyRater';
import LandPolicyRater from './LandPolicyRater';
import LifePolicyRater from './LifePolicyRater';
import FloodPolicyRater from './FloodPolicyRater';
import UnknownPolicyRater from './UnknownPolicyRater';
import Rater from './Rater';
import IRatingContext from '../IRatingContext';
import RatingUpdater from '../RatingUpdater';

const raters = {
    AutoPolicyRater,
    LandPolicyRater,
    LifePolicyRater,
    FloodPolicyRater,
};

export default class RaterFactory {
    public Create(policy: Policy, context: IRatingContext): Rater {
        try {
            return new raters[`${PolicyType[policy.Type]}PolicyRater`](new RatingUpdater(context.Engine));
        } catch (e) {
            return new UnknownPolicyRater(new RatingUpdater(context.Engine));
        }
    }
}
