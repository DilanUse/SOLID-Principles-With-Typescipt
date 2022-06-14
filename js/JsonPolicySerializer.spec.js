"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Policy_1 = require("./Policy");
const JsonPolicySerializer_1 = __importDefault(require("./JsonPolicySerializer"));
const PolicyType_1 = __importDefault(require("./PolicyType"));
describe('Test JSON Serializer', () => {
    it('Returns Default Policy From Empty Json String', () => {
        const inputJson = "{}";
        const serializer = new JsonPolicySerializer_1.default();
        const result = serializer.GetPolicyFromJsonString(inputJson);
        const policy = new Policy_1.Policy();
        expect(result).toEqual(policy);
    });
    it('Returns Simple Auto Policy From Valid Json String', () => {
        const inputJson = `{
            "type": "Auto",
            "make": "BMW"
        }`;
        const serializer = new JsonPolicySerializer_1.default();
        const result = serializer.GetPolicyFromJsonString(inputJson);
        const policy = { Type: PolicyType_1.default.Auto, Make: "BMW" };
        expect(result).toEqual(policy);
    });
});
