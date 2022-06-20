"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RatingEngine {
    constructor(logger, policySource, policySerializer, raterFactory) {
        this.Rating = 0;
        this._logger = logger;
        this._policySource = policySource;
        this._policySerializer = policySerializer;
        this._raterFactory = raterFactory;
    }
    Rate() {
        this._logger.Log("Starting rate.");
        this._logger.Log("Loading policy.");
        const policyString = this._policySource.GetPolicyFromSource();
        const policy = this._policySerializer.GetPolicyFromString(policyString);
        const rater = this._raterFactory.Create(policy);
        this.Rating = rater.Rate(policy);
        this._logger.Log("Rating completed.");
    }
}
exports.default = RatingEngine;
