import fs from 'node:fs';
import events from 'node:events';
import { createReadStream } from 'node:fs';
import readline from 'node:readline';

export class FileReader {
    constructor(path) {
        this.readStream = createReadStream(path);
    }

    async start(fn) {
        try {
            const rl = readline.createInterface({
                input: this.readStream,
                crlfDelay: Infinity
            });
            let lineNumber = 0;
            rl.on('line', (line) => {
                fn(line, lineNumber);
                lineNumber += 1;
            });

            await events.once(rl, 'close');

            console.log('Reading file line by line with readline done.');
            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
        } catch (err) {
            console.error(err);
        }
    }
}

export class FileWriter {
    constructor(filename) {
        this._filename = filename;
        if (!this._filename) {
            throw new Error('filename is required for creating a file');
        }
        if (fs.existsSync(this._filename)) {
            fs.unlinkSync(this._filename);
        }
        this.writeStream = fs.createWriteStream(this._filename, { flags: 'a' });
    }

    insertLines(lines) {
        lines.map((line) => this.insertLine(line));
    }

    insertLine(line) {
        if (line) {
            this.writeStream.write(`${line}\n`, 'utf-8');
        }
    }

    close() {
        this.writeStream.end();
    }
}
