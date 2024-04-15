import { FileReader, FileWriter } from './files.tools.js';

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

export function parseLine(line) {
    const [type,,,date,description,amount] = line.split(',');
    if (isNaN(amount)) return false;
    return `${date.split(' ')[0]};${computeType(type)};;${description};;${amount};;`;
}

export default async function parser(inputFile, outputFile) {
    if (!inputFile) {
        return { error: 'An input file is required', success: false };
    }
    const outputDestination = outputFile || `${inputFile.replace(/.csv$/, '')}-output.csv`
    const fileReader = new FileReader(inputFile); // './test.csv'
    const writeStream = new FileWriter(outputDestination); // 'result.csv'
    const data = [];
    await fileReader.start((line) => {
        const parsedLine = parseLine(line);
        if (parsedLine) {
            data.push(parsedLine);
        }
    });

    writeStream.insertLines(data);
    writeStream.close();

    return { error: false, success: true };
}