import { Policy } from '../Model/Policy';
import Rater from './Rater';
import ILogger from '../Interfaces/ILogger';

export default class AutoPolicyRater extends Rater {
    public constructor(logger: ILogger) {
        super(logger)
    }

    public override Rate(policy: Policy): number {
        this.Logger.Log("Rating AUTO policy...");
        this.Logger.Log("Validating policy.");

        if (!policy.Make)
        {
            this.Logger.Log("Auto policy must specify Make");
            return 0;
        }

        if (policy.Make == "BMW")
        {
            if (policy.Deductible < 500)
            {
                return 1000;
            }

            return 900;
        }

        return 0;
    }
}
