import IRatingContext from './IRatingContext';
import RatingEngine from './RatingEngine';
import Rater from './policy-raters/Rater';
import { Policy } from './Policy'
import RaterFactory from './policy-raters/RaterFactory';
import JsonPolicySerializer from './JsonPolicySerializer';
import FilePolicySource from './FilePolicySource';
import ConsoleLogger from './ConsoleLogger';

export default class DefaultRatingContext implements IRatingContext {
    public Engine: RatingEngine;

    public CreateRaterForPolicy(policy: Policy, context: IRatingContext): Rater
    {
        return new RaterFactory().Create(policy, context);
    }

    public GetPolicyFromJsonString(policyJson: string): Policy
    {
        return new JsonPolicySerializer().GetPolicyFromJsonString(policyJson);
    }

    public GetPolicyFromXmlString(policyXml: string): Policy
    {
        throw new Error('Method not implemented.');
    }

    public LoadPolicyFromFile(): string
    {
        return new FilePolicySource().GetPolicyFromSource();
    }

    public LoadPolicyFromURI(uri: string): string
    {
        throw new Error('Method not implemented.');
    }

    public Log(message: string): void
    {
        new ConsoleLogger().Log(message);
    }
}
