"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RatingEngine_1 = __importDefault(require("./Core/RatingEngine"));
const ConsoleLogger_1 = __importDefault(require("./Infrastructure/Loggers/ConsoleLogger"));
const FilePolicySource_1 = __importDefault(require("./Infrastructure/PolicySources/FilePolicySource"));
const JsonPolicySerializer_1 = __importDefault(require("./Infrastructure/Serializers/JsonPolicySerializer"));
const RaterFactory_1 = __importDefault(require("./Core/Raters/RaterFactory"));
const FileLogger_1 = __importDefault(require("./Infrastructure/Loggers/FileLogger"));
const Logger = new ConsoleLogger_1.default();
Logger.Log("Insurance Rating System Starting...");
const logger = new FileLogger_1.default();
const engine = new RatingEngine_1.default(logger, new FilePolicySource_1.default(), new JsonPolicySerializer_1.default(), new RaterFactory_1.default(logger));
engine.Rate();
if (engine.Rating > 0) {
    Logger.Log(`Rating: ${engine.Rating}`);
}
else {
    Logger.Log("No rating produced.");
}
