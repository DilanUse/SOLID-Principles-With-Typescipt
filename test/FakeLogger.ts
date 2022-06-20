import ILogger from '../src/Core/Interfaces/ILogger';

export default class FakeLogger implements ILogger {
    public LoggedMessages: Array<string> = [];

    Log(message: string): void {
        this.LoggedMessages.push(message);
    }
}
