import { Policy } from '../Model/Policy';
import Rater from './Rater';
import ILogger from '../Interfaces/ILogger';

export default class FloodPolicyRater extends Rater{
    public constructor(logger: ILogger) {
        super(logger)
    }

    public override Rate(policy: Policy): number {
        this.Logger.Log("Rating FLOOD policy...");
        this.Logger.Log("Validating policy.");

        if (policy.BondAmount == 0 || policy.Valuation == 0)
        {
            this.Logger.Log("Flood policy must specify Bond Amount and Valuation.");
            return 0;
        }

        if (policy.ElevationAboveSeaLevelFeet <= 0)
        {
            this.Logger.Log("Flood policy is not available for elevations at or below sea level.");
            return 0;
        }

        if (policy.BondAmount < 0.8 * policy.Valuation)
        {
            this.Logger.Log("Insufficient bond amount.");
            return 0;
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

        return policy.BondAmount * 0.05 * multiple;
    }
}
