import { Policy } from '../Policy';
import Rater from './Rater';
import IRatingUpdater from '../IRatingUpdater';

export default class FloodPolicyRater extends Rater{
    public constructor(ratingUpdater: IRatingUpdater) {
        super(ratingUpdater)
    }

    public override Rate(policy: Policy): void {
        this.Logger.Log("Rating FLOOD policy...");
        this.Logger.Log("Validating policy.");

        if (policy.BondAmount == 0 || policy.Valuation == 0)
        {
            this.Logger.Log("Flood policy must specify Bond Amount and Valuation.");
            return;
        }

        if (policy.ElevationAboveSeaLevelFeet <= 0)
        {
            this.Logger.Log("Flood policy is not available for elevations at or below sea level.");
            return;
        }

        if (policy.BondAmount < 0.8 * policy.Valuation)
        {
            this.Logger.Log("Insufficient bond amount.");
            return;
        }

        let multiple = 1.0;

        if(policy.ElevationAboveSeaLevelFeet < 100)
        {
            multiple = 2.0;
        } else if (policy.ElevationAboveSeaLevelFeet < 500)
        {
            multiple = 1.5;
        } else if (policy.ElevationAboveSeaLevelFeet < 1000)
        {
            multiple = 1.1;
        }

        this._ratingUpdater.UpdateRating(policy.BondAmount * 0.05 * multiple);
    }
}
