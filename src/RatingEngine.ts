import moment from 'moment';
import { Policy } from './Policy';
import IRatingContext from './IRatingContext';
import DefaultRatingContext from './DefaultRatingContext';

export default class RatingEngine
{
    public Context: IRatingContext = new DefaultRatingContext();
    public Rating: number = 0;

    public constructor() {
        this.Context.Engine = this;
    }

    public Rate(): void
    {
        this.Context.Log("Starting rate.");
        this.Context.Log("Loading policy.");

        const policyJson = this.Context.LoadPolicyFromFile();
        const policy: Policy = this.Context.GetPolicyFromJsonString(policyJson);

        const rater = this.Context.CreateRaterForPolicy(policy, this.Context);
        rater.Rate(policy);

        this.Context.Log("Rating completed.");
    }
}
