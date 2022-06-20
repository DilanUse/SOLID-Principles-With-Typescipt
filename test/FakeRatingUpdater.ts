import IRatingUpdater from '../src/IRatingUpdater';

export default class FakeRatingUpdater implements IRatingUpdater
{
    private _NewRating?: number;

    get NewRating() {
        return this._NewRating;
    }

    public UpdateRating(rating: number): void
    {
        this._NewRating = rating;
    }
}
