import RatingEngine from '../RatingEngine';
import ConsoleLogger from '../ConsoleLogger';
import { Policy } from '../Policy';

export default abstract class Rater {
    protected readonly _engine: RatingEngine;
    protected readonly _logger: ConsoleLogger;

    protected constructor(engine: RatingEngine, logger: ConsoleLogger) {
        this._engine = engine;
        this._logger= logger;
    }

    public abstract Rate(policy: Policy): void;
}
