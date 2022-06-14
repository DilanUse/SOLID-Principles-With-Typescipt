import moment from 'moment';
import { Policy } from './Policy';
import PolicyType from './PolicyType';
import ConsoleLogger from'./ConsoleLogger';
import FilePolicySource from './FilePolicySource'
import JsonPolicySerializer from './JsonPolicySerializer';

export default class RatingEngine
{
    public Rating: number = 0;
    public Logger: ConsoleLogger = new ConsoleLogger();
    public PolicySource: FilePolicySource = new FilePolicySource();
    public PolicySerializer: JsonPolicySerializer = new JsonPolicySerializer();

    public Rate(): void
    {
        this.Logger.Log("Starting rate.");
        this.Logger.Log("Loading policy.");

        const policyJson = this.PolicySource.GetPolicyFromSource();
        const policy: Policy = this.PolicySerializer.GetPolicyFromJsonString(policyJson);

        switch (policy.Type)
        {
            case PolicyType.Auto:
                this.Logger.Log("Rating AUTO policy...");
                this.Logger.Log("Validating policy.");

                if (policy.Make)
                {
                    this.Logger.Log("Auto policy must specify Make");
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
                this.Logger.Log("Rating LAND policy...");
                this.Logger.Log("Validating policy.");

                if (policy.BondAmount == 0 || policy.Valuation == 0)
                {
                    this.Logger.Log("Land policy must specify Bond Amount and Valuation.");
                    return;
                }
                if (policy.BondAmount < (0.8 * policy.Valuation))
                {
                    this.Logger.Log("Insufficient bond amount.");
                    return;
                }

                this.Rating = policy.BondAmount * 0.05;
                break;

            case PolicyType.Life:
                this.Logger.Log("Rating LIFE policy...");
                this.Logger.Log("Validating policy.");
                if (policy.DateOfBirth)
                {
                    this.Logger.Log("Life policy must include Date of Birth.");
                    return;
                }

                if (policy.DateOfBirth < moment().subtract(100, 'days').toDate())
                {
                    this.Logger.Log("Centenarians are not eligible for coverage.");
                    return;
                }

                if (policy.Amount == 0)
                {
                    this.Logger.Log("Life policy must include an Amount.");
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
                this.Logger.Log("Unknown policy type");
                break;
        }

        this.Logger.Log("Rating completed.");
    }
}
