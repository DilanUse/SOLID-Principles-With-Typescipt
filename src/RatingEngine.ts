import moment from 'moment';
import policyJson from './policy.json';
import { Policy } from './Policy';
import PolicyType from './PolicyType';

export default class RatingEngine
{
    public Rating: number;

    public Rate(): void
    {
        console.log("Starting rate.");

        console.log("Loading policy.");
        const policy: Policy = Object.assign(new Policy(), {
            Type: PolicyType[policyJson.type],
            Valuation: Number(policyJson.valuation),
            BondAmount: Number(policyJson.bondAmount),
        });

        switch (policy.Type)
        {
            case PolicyType.Auto:
                console.log("Rating AUTO policy...");
                console.log("Validating policy.");

                if (policy.Make)
                {
                    console.log("Auto policy must specify Make");
                    return;
                }
                if (policy.Make == "BMW")
                {
                    if (policy.Deductible < 500)
                    {
                        this.Rating = 1000;
                    }
                        this.Rating = 900;
                }
                break;

            case PolicyType.Land:
                console.log("Rating LAND policy...");
                console.log("Validating policy.");

                if (policy.BondAmount == 0 || policy.Valuation == 0)
                {
                    console.log("Land policy must specify Bond Amount and Valuation.");
                    return;
                }
                if (policy.BondAmount < (0.8 * policy.Valuation))
                {
                    console.log("Insufficient bond amount.");
                    return;
                }

                this.Rating = policy.BondAmount * 0.05;
                break;

            case PolicyType.Life:
                console.log("Rating LIFE policy...");
                console.log("Validating policy.");
                if (policy.DateOfBirth)
                {
                    console.log("Life policy must include Date of Birth.");
                    return;
                }

                if (policy.DateOfBirth < moment().subtract(100, 'days').toDate())
                {
                    console.log("Centenarians are not eligible for coverage.");
                    return;
                }

                if (policy.Amount == 0)
                {
                    console.log("Life policy must include an Amount.");
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
                    this.Rating = baseRate * 2;
                    break;
                }

                this.Rating = baseRate;
                break;

            default:
                console.log("Unknown policy type");
                break;
        }

        console.log("Rating completed.");
    }
}
