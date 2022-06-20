"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Policy_1 = require("../../Core/Model/Policy");
const PolicyType_1 = __importDefault(require("../../Core/Model/PolicyType"));
const _ = __importStar(require("lodash"));
class JsonPolicySerializer {
    GetPolicyFromString(jsonString) {
        const policyJson = JSON.parse(jsonString);
        const policy = new Policy_1.Policy();
        Object.keys(policyJson).forEach((key) => {
            const _key = _.startCase(_.camelCase(key)).replace(/ /g, '');
            if (_key === 'Type') {
                policy.Type = PolicyType_1.default[policyJson[key]];
            }
            else {
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
    SerializePolicyToJson(policy) {
        const type = PolicyType_1.default[policy.Type];
        return JSON.stringify(Object.assign(Object.assign({}, policy), { Type: type }));
    }
}
exports.default = JsonPolicySerializer;
