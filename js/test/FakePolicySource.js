"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FakePolicySource {
    constructor() {
        this.PolicyString = "";
    }
    GetPolicyFromSource() {
        return this.PolicyString;
    }
}
exports.default = FakePolicySource;
