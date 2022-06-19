"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RatingUpdater {
    constructor(engine) {
        this._engine = engine;
    }
    UpdateRating(rating) {
        this._engine.Rating = rating;
    }
}
exports.default = RatingUpdater;
