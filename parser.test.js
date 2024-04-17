import { expect, test, describe } from 'vitest';
import parser, { parseLine } from './parser.js';
import fs from 'node:fs/promises';

describe('parseLine', () => {
    test('valid transfer line', () => {
        const line = 'TRANSFER,Savings,2024-03-05 07:30:20,2024-03-05 07:30:20,To EUR savings,3.00,0.00,EUR,COMPLETED,32.02';
        const expectedResult = '2024-03-05;4;;To EUR savings;;3.00;;';
        expect(parseLine(line)).toBe(expectedResult);
    });

    test('valid payement list', () => {
        const line = 'CARD_PAYMENT,Current,2024-02-29 14:03:44,2024-03-01 03:48:15,Amazon,-35.00,0.00,EUR,COMPLETED,128.98';
        const expectedResult = '2024-03-01;6;;Amazon;;-35.00;;';
        expect(parseLine(line)).toBe(expectedResult);
    });

    test('ignore bad line', () => {
        const header = 'Type,Product,Started Date,Completed Date,Description,Amount,Fee,Currency,State,Balance';
        expect(parseLine(header)).toBe(false);

        const malformed = 'NOTHING,Current,2024-02-29 14:03:44,2024-03-01 03:48:15,35,Amazon,0.00,EUR,COMPLETED,128.98';
        expect(parseLine(malformed)).toBe(false);
    });
});

describe('parser', () => {
    test('should correctly read, parse and save the file', async () => {
        const result = await parser('./test/input.csv', './test/output.csv');
        const output = await fs.readFile('./test/output.csv', 'utf8');
        const outputExpected = await fs.readFile('./test/expected-output.csv', 'utf8');
        expect(result.totalLines).toBe(5);
        expect(result.parsedLines).toBe(4);
        expect(result.error).toBe(false);
        expect(result.success).toBe(true);
        expect(output).toEqual(outputExpected);
    });

    test('should correctly read, parse and save the file without output file', async () => {
        const result = await parser('./test/input.csv');
        const output = await fs.readFile('./test/output.csv', 'utf8');
        const outputExpected = await fs.readFile('./test/input-output.csv', 'utf8');
        expect(result.totalLines).toBe(5);
        expect(result.parsedLines).toBe(4);
        expect(result.error).toBe(false);
        expect(result.success).toBe(true);
        expect(output).toEqual(outputExpected);
    });

    test('should fail correctly', async () => {
        const result = await parser('./test/fail.csv');
        expect(result.error).toBe("ENOENT: no such file or directory, open './test/fail.csv'");
        expect(result.success).toBe(false);
    });
});
