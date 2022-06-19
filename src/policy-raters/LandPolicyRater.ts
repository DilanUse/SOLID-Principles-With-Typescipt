import RatingEngine from '../RatingEngine';
import ConsoleLogger from '../ConsoleLogger';
import { Policy } from '../Policy';
import Rater from './Rater';

export default class LandPolicyRater extends Rater {
    public constructor(engine: RatingEngine, logger: ConsoleLogger) {
        super(engine, logger)
    }

    public override Rate(policy: Policy): void {
        this._logger.Log("Rating LAND policy...");
        this._logger.Log("Validating policy.");

        if (policy.BondAmount == 0 || policy.Valuation == 0)
        {
            this._logger.Log("Land policy must specify Bond Amount and Valuation.");
            return;
        }
        if (policy.BondAmount < (0.8 * policy.Valuation))
        {
            this._logger.Log("Insufficient bond amount.");
            return;
        }

        this._engine.Rating = policy.BondAmount * 0.05;
    }
}
