import IRatingUpdater from './IRatingUpdater';
import RatingEngine from './RatingEngine';

export default class RatingUpdater implements IRatingUpdater {
    private readonly _engine: RatingEngine;

    public constructor(engine: RatingEngine)
    {
        this._engine = engine;
    }

    public UpdateRating(rating: number): void
    {
        this._engine.Rating = rating;
    }
}
