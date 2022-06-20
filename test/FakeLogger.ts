import ILogger from '../src/ILogger';

export default class FakeLogger implements ILogger {
    public LoggedMessages: Array<string> = [];

    Log(message: string): void {
        this.LoggedMessages.push(message);
    }
}
