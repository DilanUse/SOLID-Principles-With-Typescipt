import RatingEngine from './RatingEngine';

console.log("Insurance Rating System Starting...");

const engine = new RatingEngine();
engine.Rate();

if (engine.Rating > 0)
{
    console.log(`Rating: ${engine.Rating}`);
}
else
{
    console.log("No rating produced.");
}
