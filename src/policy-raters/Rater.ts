import RatingEngine from '../RatingEngine';
import ConsoleLogger from '../ConsoleLogger';
import { Policy } from '../Policy';
import ILogger from '../ILogger';
import IRatingUpdater from '../IRatingUpdater';

export default abstract class Rater {
    protected readonly _ratingUpdater: IRatingUpdater;
    public Logger: ILogger = new ConsoleLogger();

    protected constructor(ratingUpdater: IRatingUpdater) {
        this._ratingUpdater = ratingUpdater;
    }

    public abstract Rate(policy: Policy): void;
}
