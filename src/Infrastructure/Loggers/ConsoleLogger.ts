import ILogger from '../../Core/Interfaces/ILogger';

export default class ConsoleLogger implements ILogger {
    public Log(message: string): void {
        console.log(message);
    }
}
