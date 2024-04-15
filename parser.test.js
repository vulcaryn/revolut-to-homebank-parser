import { expect, test, describe } from 'vitest'
import {parseLine} from './parser.js'

describe('parseLine', () => {
    test('valid transfer line', () => {
        const line = 'TRANSFER,Savings,2024-03-05 07:30:20,2024-03-05 07:30:20,To EUR savings,3.00,0.00,EUR,COMPLETED,32.02';
        const expectedResult = '2024-03-05;4;;To EUR savings;;3.00;;';
        expect(parseLine(line)).toBe(expectedResult);
    });

    test('valid payement list', () => {
        const line ='CARD_PAYMENT,Current,2024-02-29 14:03:44,2024-03-01 03:48:15,Amazon,-35.00,0.00,EUR,COMPLETED,128.98';
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