import RatingEngine from './Core/RatingEngine';
import ConsoleLogger from './Infrastructure/Loggers/ConsoleLogger';
import FilePolicySource from './Infrastructure/PolicySources/FilePolicySource';
import JsonPolicySerializer from './Infrastructure/Serializers/JsonPolicySerializer';
import RaterFactory from './Core/Raters/RaterFactory';
import FileLogger from './Infrastructure/Loggers/FileLogger';

const Logger: ConsoleLogger = new ConsoleLogger();

Logger.Log("Insurance Rating System Starting...");
// const logger = new FileLogger();
const logger = new ConsoleLogger();

const engine = new RatingEngine(
    logger,
    new FilePolicySource(),
    new JsonPolicySerializer(),
    new RaterFactory(logger),
);
engine.Rate();

if (engine.Rating > 0)
{
    Logger.Log(`Rating: ${engine.Rating}`);
}
else
{
    Logger.Log("No rating produced.");
}
