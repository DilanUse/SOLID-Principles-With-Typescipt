import { Policy } from '../Model/Policy';
import PolicyType from '../Model/PolicyType';
import AutoPolicyRater from './AutoPolicyRater';
import LandPolicyRater from './LandPolicyRater';
import LifePolicyRater from './LifePolicyRater';
import FloodPolicyRater from './FloodPolicyRater';
import UnknownPolicyRater from './UnknownPolicyRater';
import Rater from './Rater';
import ILogger from '../Interfaces/ILogger';

const raters = {
    AutoPolicyRater,
    LandPolicyRater,
    LifePolicyRater,
    FloodPolicyRater,
};

export default class RaterFactory {
    private readonly _logger: ILogger;

    public constructor(logger: ILogger) {
        this._logger = logger;
    }

    public Create(policy: Policy): Rater {
        try {
            return new raters[`${PolicyType[policy.Type]}PolicyRater`](this._logger);
        } catch (e) {
            return new UnknownPolicyRater(this._logger);
        }
    }
}
