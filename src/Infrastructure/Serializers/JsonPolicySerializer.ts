import { Policy } from '../../Core/Model/Policy';
import PolicyType from '../../Core/Model/PolicyType';
import * as _ from 'lodash';
import IPolicySerializer from '../../Core/Interfaces/IPolicySerializer';

export default class JsonPolicySerializer implements IPolicySerializer{
    public GetPolicyFromString(jsonString: string): Policy {
        const policyJson = JSON.parse(jsonString);
        const policy = new Policy();

        Object.keys(policyJson).forEach((key) => {
            const _key = _.startCase(_.camelCase(key)).replace(/ /g, '');

            if (_key === 'Type') {
                policy.Type = PolicyType[policyJson[key] as keyof typeof PolicyType];
            } else {
                switch (typeof policy[_key]) {
                    case 'number':
                        policy[_key] = Number(policyJson[key]);
                        break;
                    case 'boolean':
                        policy[_key] = Boolean(policyJson[key]);
                        break;
                    case 'object':
                        policy[_key] = new Date(policyJson[key]);
                        break;

                    default:
                        policy[_key] = policyJson[key];
                }
            }
        });

        return policy;
    }

    public SerializePolicyToJson(policy: Policy): string {
        const type: string = PolicyType[policy.Type];
        return JSON.stringify({
            ...policy,
            Type: type
        });
    }
}
