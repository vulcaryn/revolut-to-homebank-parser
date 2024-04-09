function computeType(type) {
    switch (type) {
        case "CARD_PAYMENT":
            return 6;
        case "TRANSFER":
            return 4;
        case "EXCHANGE":
        case "TOPUP":
            return 0;
        default:
            console.log('unknown type', type);
            return 0;
    }
}
(async function () {
    const { FileReader, FileWriter } = require('./files.tools');
    const fileReader = new FileReader('./test.csv');
    const writeStream = new FileWriter('result.csv');
    const data = [];
    await fileReader.start((line, i) => {
        if (i !== 0) {
            const [type,,,date,description,amount] = line.split(',');
                data.push(`${date.split(' ')[0]};${computeType(type)};;${description};;${amount};;`);
        }
    });

    writeStream.insertLines(data);
    writeStream.close();
})();