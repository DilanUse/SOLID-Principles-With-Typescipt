"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RaterFactory_1 = __importDefault(require("./policy-raters/RaterFactory"));
const JsonPolicySerializer_1 = __importDefault(require("./JsonPolicySerializer"));
const FilePolicySource_1 = __importDefault(require("./FilePolicySource"));
const ConsoleLogger_1 = __importDefault(require("./ConsoleLogger"));
class DefaultRatingContext {
    CreateRaterForPolicy(policy, context) {
        return new RaterFactory_1.default().Create(policy, context);
    }
    GetPolicyFromJsonString(policyJson) {
        return new JsonPolicySerializer_1.default().GetPolicyFromJsonString(policyJson);
    }
    GetPolicyFromXmlString(policyXml) {
        throw new Error('Method not implemented.');
    }
    LoadPolicyFromFile() {
        return new FilePolicySource_1.default().GetPolicyFromSource();
    }
    LoadPolicyFromURI(uri) {
        throw new Error('Method not implemented.');
    }
    Log(message) {
        new ConsoleLogger_1.default().Log(message);
    }
}
exports.default = DefaultRatingContext;
