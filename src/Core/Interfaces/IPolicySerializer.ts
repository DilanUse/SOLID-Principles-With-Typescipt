import { Policy } from '../Model/Policy';

export default interface IPolicySerializer {
    GetPolicyFromString(policyString: string): Policy;
}
