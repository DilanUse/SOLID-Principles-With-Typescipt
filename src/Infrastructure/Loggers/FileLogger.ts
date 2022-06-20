import fs from 'fs';
import ILogger from '../../Core/Interfaces/ILogger';

export default class FileLogger implements ILogger {
    public Log(message: string): void {
        fs.appendFileSync('logs/log.txt', `${message}\n`);
    }
}
