import { FileReader, FileWriter } from './files.tools.js';

/**
 * Transform the revolut type into the homebank value
 * @param {string} type
 * @returns {number}
 */
function computeType(type) {
    switch (type) {
        case "CARD_PAYMENT":
            return 6;
        case "TRANSFER":
            return 4;
        case "EXCHANGE":
        case "TOPUP":
        default:
            return 0;
    }
}

/**
 * Line parser
 * @param {string} line
 * @returns {string|boolean}
 */
export function parseLine(line) {
    const [type,,,date,description,amount] = line.split(',');
    if (isNaN(amount)) return false;
    return `${date.split(' ')[0]};${computeType(type)};;${description};;${amount};;`;
}

/**
 * File parser
 * @param {string} inputFile
 * @param {string} outputFile
 * @returns {Promise<{parsedLines: number, success: boolean, totalLines: number, error: (string|boolean)}>}
 */
export default async function parser(inputFile, outputFile) {
    let totalLines = 0;
    let parsedLines = 0;

    if (!inputFile) {
        return { error: 'An input file is required', success: false, parsedLines, totalLines };
    }

    try {
        const outputDestination = outputFile || `${inputFile.replace(/.csv$/, '')}-output.csv`;
        const fileReader = new FileReader(inputFile);
        const writeStream = new FileWriter(outputDestination);
        const data = [];
        await fileReader.start((line) => {
            if (line.length === 0) {
                return;
            }
            totalLines += 1;
            const parsedLine = parseLine(line);
            if (parsedLine) {
                parsedLines+=1;
                data.push(parsedLine);
            }
        });

        writeStream.insertLines(data);
        writeStream.close();

        return { error: false, success: true, parsedLines, totalLines };
    } catch (e) {
        return { error: e.message, success: false, parsedLines, totalLines };
    }
}