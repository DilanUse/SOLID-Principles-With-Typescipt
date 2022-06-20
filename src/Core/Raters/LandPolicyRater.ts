import { Policy } from '../Model/Policy';
import Rater from './Rater';
import ILogger from '../Interfaces/ILogger';

export default class LandPolicyRater extends Rater {
    public constructor(logger: ILogger) {
        super(logger)
    }

    public override Rate(policy: Policy): number {
        this.Logger.Log("Rating LAND policy...");
        this.Logger.Log("Validating policy.");

        if (policy.BondAmount == 0 || policy.Valuation == 0)
        {
            this.Logger.Log("Land policy must specify Bond Amount and Valuation.");
            return 0;
        }
        if (policy.BondAmount < (0.8 * policy.Valuation))
        {
            this.Logger.Log("Insufficient bond amount.");
            return 0;
        }

        return policy.BondAmount * 0.05;
    }
}
