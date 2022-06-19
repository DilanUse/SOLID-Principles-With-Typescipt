import { Policy } from '../Policy';
import Rater from './Rater';
import IRatingUpdater from '../IRatingUpdater';

export default class LandPolicyRater extends Rater {
    public constructor(ratingUpdater: IRatingUpdater) {
        super(ratingUpdater)
    }

    public override Rate(policy: Policy): void {
        this.Logger.Log("Rating LAND policy...");
        this.Logger.Log("Validating policy.");

        if (policy.BondAmount == 0 || policy.Valuation == 0)
        {
            this.Logger.Log("Land policy must specify Bond Amount and Valuation.");
            return;
        }
        if (policy.BondAmount < (0.8 * policy.Valuation))
        {
            this.Logger.Log("Insufficient bond amount.");
            return;
        }

        this._ratingUpdater.UpdateRating(policy.BondAmount * 0.05) ;
    }
}
