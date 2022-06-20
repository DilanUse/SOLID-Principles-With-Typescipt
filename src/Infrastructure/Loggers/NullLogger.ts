import ILogger from '../../Core/Interfaces/ILogger';

export default class NullLogger implements ILogger {
    public Log(message: string): void {
    }
}
