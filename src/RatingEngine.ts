import moment from 'moment';
import { Policy } from './Policy';
import PolicyType from './PolicyType';
import ConsoleLogger from'./ConsoleLogger';
import FilePolicySource from './FilePolicySource'
import JsonPolicySerializer from './JsonPolicySerializer';
import AutoPolicyRater from './policies/AutoPolicyRater';
import LandPolicyRater from './policies/LandPolicyRater';
import LifePolicyRater from './policies/LifePolicyRater';
import RaterFactory from './policies/RaterFactory';

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

        const factory = new RaterFactory();

        const rater = factory.Create(policy, this);
        rater?.Rate(policy);

        this.Logger.Log("Rating completed.");
    }
}
