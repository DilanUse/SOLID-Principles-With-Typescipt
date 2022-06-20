import Rater from './Rater';
import { Policy } from '../Model/Policy';
import ILogger from '../Interfaces/ILogger';

export default class UnknownPolicyRater extends Rater {
    public constructor(logger: ILogger) {
        super(logger)
    }

    public override Rate(policy: Policy): number {
        this.Logger.Log('Unknown policy type');
        return 0;
    }
}
