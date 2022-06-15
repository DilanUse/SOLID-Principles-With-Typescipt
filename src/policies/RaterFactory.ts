import {Policy} from '../Policy';
import RatingEngine from '../RatingEngine';
import PolicyType from '../PolicyType';
import AutoPolicyRater from './AutoPolicyRater';
import LandPolicyRater from './LandPolicyRater';
import LifePolicyRater from './LifePolicyRater';
import FloodPolicyRater from './FloodPolicyRater';

export default class RaterFactory {
    public Create(policy: Policy, engine: RatingEngine) {
        switch (policy.Type)
        {
            case PolicyType.Auto:
                return new AutoPolicyRater(engine, engine.Logger);

            case PolicyType.Flood:
                return new FloodPolicyRater(engine, engine.Logger);

            case PolicyType.Land:
                return new LandPolicyRater(engine, engine.Logger);

            case PolicyType.Life:
                return new LifePolicyRater(engine, engine.Logger);

            default:
                // Todo: Implement Null Object Patterns
                // engine.Logger.Log("Unknown policy type");
                return null;
        }
    }
}
