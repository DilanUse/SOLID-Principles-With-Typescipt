import { Policy } from '../Policy';
import Rater from './Rater';
import IRatingUpdater from '../IRatingUpdater';

export default class AutoPolicyRater extends Rater {
    public constructor(ratingUpdater: IRatingUpdater) {
        super(ratingUpdater)
    }

    public override Rate(policy: Policy): void {
        this.Logger.Log("Rating AUTO policy...");
        this.Logger.Log("Validating policy.");

        if (!policy.Make)
        {
            this.Logger.Log("Auto policy must specify Make");
            return;
        }
        if (policy.Make == "BMW")
        {
            if (policy.Deductible < 500)
            {
                this._ratingUpdater.UpdateRating(1000);
                return;
            }

            this._ratingUpdater.UpdateRating(900);
        }
    }
}
