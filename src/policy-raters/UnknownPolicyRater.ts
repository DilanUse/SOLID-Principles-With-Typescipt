import Rater from './Rater';
import RatingEngine from '../RatingEngine';
import ConsoleLogger from '../ConsoleLogger';
import { Policy } from '../Policy';

export default class UnknownPolicyRater extends Rater {
    public constructor(engine: RatingEngine, logger: ConsoleLogger) {
        super(engine, logger)
    }

    public override Rate(policy: Policy): void {
        this._logger.Log('Unknown policy type');
    }
}
