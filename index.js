#!/usr/bin/env node
import parser from './parser.js';

const startDate = Date.now();
const result = await parser(process.argv[2], process.argv[3]);
console.log(`Lines parsed: ${result.parsedLines} / ${result.totalLines}`);
console.log(`Elapsed time: ${Date.now() - startDate} ms`);
