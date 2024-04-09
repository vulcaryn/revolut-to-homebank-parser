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

//15-02-04;0;;;Some cash;-40,00;Bill:Withdrawal of cash;tag1 tag2
//15-02-04;1;;;Internet DSL;-45,00;Inline service/Internet;tag2 my-tag3
//date ; payment ; info ; payee ; memo ; amount ; category ; tags