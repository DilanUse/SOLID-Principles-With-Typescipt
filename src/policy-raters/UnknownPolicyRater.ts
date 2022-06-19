import Rater from './Rater';
import { Policy } from '../Policy';
import IRatingUpdater from '../IRatingUpdater';

export default class UnknownPolicyRater extends Rater {
    public constructor(ratingUpdater: IRatingUpdater) {
        super(ratingUpdater)
    }

    public override Rate(policy: Policy): void {
        this.Logger.Log('Unknown policy type');
    }
}
