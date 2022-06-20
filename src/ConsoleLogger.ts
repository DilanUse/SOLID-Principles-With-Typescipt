import ILogger from './ILogger';

export default class ConsoleLogger implements ILogger {
    public Log(message: string): void {
        console.log(message);
    }
}
