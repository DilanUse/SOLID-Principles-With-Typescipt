import { Policy } from '../../Core/Model/Policy';
import JsonPolicySerializer from './JsonPolicySerializer';
import PolicyType from '../../Core/Model/PolicyType';

describe('Test JSON Serializer', () => {
    it('Returns Default Policy From Empty Json String',  () => {
        const inputJson = "{}";
        const serializer = new JsonPolicySerializer();
        const result = serializer.GetPolicyFromString(inputJson);
        const policy = new Policy();

        expect<Policy>(result).toEqual(policy);
    });

    it('Returns Simple Auto Policy From Valid Json String',  () => {
        const inputJson = `{
            "type": "Auto",
            "make": "BMW"
        }`;
        const serializer = new JsonPolicySerializer();
        const result = serializer.GetPolicyFromString(inputJson);
        const policy = { Type: PolicyType.Auto, Make: "BMW" };

        expect<Policy>(result).toEqual(policy);
    });
});
