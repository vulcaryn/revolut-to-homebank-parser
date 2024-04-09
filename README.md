# revolut-to-homebank-parser

A basic parser to transform a Revolut csv export into a homebank compatible csv.

Revolut basic format:
```csv
TRANSFER,Savings,2024-03-06 08:28:55,2024-03-06 08:28:59,To EUR holidays,115.00,0.00,EUR,COMPLETED,2000.00
```

Homebank compatible format:
```csv
2024-03-06;4;;To EUR Holidays;;115.00;;
```

All details of homebank format can be found [here](http://homebank.free.fr/help/misc-csvformat.html)