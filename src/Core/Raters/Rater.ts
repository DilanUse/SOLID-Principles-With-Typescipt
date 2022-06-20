import { Policy } from '../Model/Policy';
import ILogger from '../Interfaces/ILogger';

export default abstract class Rater {
    public Logger: ILogger;

    protected constructor(logger: ILogger) {
        this.Logger = logger;
    }

    public abstract Rate(policy: Policy): number;
}
