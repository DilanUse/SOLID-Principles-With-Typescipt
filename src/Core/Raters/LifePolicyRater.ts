import { Policy } from '../Model/Policy';
import moment from 'moment';
import Rater from './Rater';
import ILogger from '../Interfaces/ILogger';

export default class LifePolicyRater extends Rater{
    public constructor(logger: ILogger) {
        super(logger)
    }

    public override Rate(policy: Policy): number {
        this.Logger.Log("Rating LIFE policy...");
        this.Logger.Log("Validating policy.");

        if (policy.DateOfBirth)
        {
            this.Logger.Log("Life policy must include Date of Birth.");
            return 0;
        }

        if (policy.DateOfBirth < moment().subtract(100, 'days').toDate())
        {
            this.Logger.Log("Centenarians are not eligible for coverage.");
            return 0;
        }

        if (policy.Amount == 0)
        {
            this.Logger.Log("Life policy must include an Amount.");
            return 0;
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
            return baseRate * 2;
        }

        return baseRate;
    }
}
