# revolut-to-homebank-parser

## General
A basic parser to transform a Revolut csv export into a homebank compatible csv.

Revolut basic format:
```csv
TRANSFER,Savings,2024-03-06 08:28:55,2024-03-06 08:28:59,To EUR holidays,115.00,0.00,EUR,COMPLETED,2000.00
```

Homebank compatible format:
```csv
2024-03-06;0;;To EUR Holidays;;115.00;;
```

All details of homebank format can be found [here](http://homebank.free.fr/help/misc-csvformat.html)

## Usage

### CLI

Directly in a terminal when node is installed.
```bash
npx revolut-to-homebank-parser file.csv output.csv
```

### In a project
Install as dependency
```bash
npm i -s revolut-to-homebank-parser
```

Usage
```javascript
import revolutToHomebankParser from 'revolut-to-homebank-parser/parser';

const result = await revolutToHomebankParser('file.csv', 'output.csv');
if (result.success) {
    // do some interesting stuff
}
if (result.error) {
    // trace interesting informations
}
```