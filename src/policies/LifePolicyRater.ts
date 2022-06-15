import RatingEngine from '../RatingEngine';
import ConsoleLogger from '../ConsoleLogger';
import { Policy } from '../Policy';
import moment from 'moment';
import Rater from './Rater';

export default class LifePolicyRater extends Rater{
    public constructor(engine: RatingEngine, logger: ConsoleLogger) {
        super(engine, logger)
    }

    public override Rate(policy: Policy): void {
        this._logger.Log("Rating LIFE policy...");
        this._logger.Log("Validating policy.");
        if (policy.DateOfBirth)
        {
            this._logger.Log("Life policy must include Date of Birth.");
            return;
        }

        if (policy.DateOfBirth < moment().subtract(100, 'days').toDate())
        {
            this._logger.Log("Centenarians are not eligible for coverage.");
            return;
        }

        if (policy.Amount == 0)
        {
            this._logger.Log("Life policy must include an Amount.");
            return;
        }

        let age: number = moment().year() - moment(policy.DateOfBirth).year();

        if ((moment(policy.DateOfBirth).month() == moment().month()
                && moment().day() < moment(policy.DateOfBirth).day())
            || moment().month() < moment(policy.DateOfBirth).month())
        {
            age -= 1;
        }

        const baseRate: number = policy.Amount * age / 200;

        if (policy.IsSmoker)
        {
            this._engine.Rating = baseRate * 2;
            return;
        }

        this._engine.Rating = baseRate;
    }
}
