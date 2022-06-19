import ILogger from './ILogger';
import RatingEngine from './RatingEngine';
import { Policy } from './Policy';
import Rater from './policy-raters/Rater';

export default interface IRatingContext extends ILogger {
    LoadPolicyFromFile(): string;
    LoadPolicyFromURI(uri: string): string;
    GetPolicyFromJsonString(policyJson: string): Policy;
    GetPolicyFromXmlString(policyXml: string): Policy;
    CreateRaterForPolicy(policy: Policy, context: IRatingContext): Rater;
    Engine: RatingEngine;
}
