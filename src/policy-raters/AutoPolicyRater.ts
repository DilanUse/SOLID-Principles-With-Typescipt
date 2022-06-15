import RatingEngine from '../RatingEngine';
import ConsoleLogger from '../ConsoleLogger';
import { Policy } from '../Policy';
import Rater from './Rater';

export default class AutoPolicyRater extends Rater {
    public constructor(engine: RatingEngine, logger: ConsoleLogger) {
        super(engine, logger)
    }

    public override Rate(policy: Policy): void {
        this._logger.Log("Rating AUTO policy...");
        this._logger.Log("Validating policy.");

        if (!policy.Make)
        {
            this._logger.Log("Auto policy must specify Make");
            return;
        }
        if (policy.Make == "BMW")
        {
            if (policy.Deductible < 500)
            {
                this._engine.Rating = 1000;
            }
            this._engine.Rating = 900;
        }
    }
}
