import RatingEngine from './RatingEngine';
import ConsoleLogger from'./ConsoleLogger';

const Logger: ConsoleLogger = new ConsoleLogger();

Logger.Log("Insurance Rating System Starting...");

const engine = new RatingEngine();
engine.Rate();

if (engine.Rating > 0)
{
    Logger.Log(`Rating: ${engine.Rating}`);
}
else
{
    Logger.Log("No rating produced.");
}
