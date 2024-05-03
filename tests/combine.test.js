import { strict as expect } from 'node:assert';
import { describe, test } from 'node:test';
import {
  ZERO_WIDTH_JOINER,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
} from '../src/constants.js';
import { combine } from '../src/index.js';

describe('combine', () => {
  test('should return the original text when skip is true', () => {
    const text = 'Hello, World!';
    const data = { name: 'John', age: 30, city: 'New York' };
    const skip = true;
    const result = combine(text, data, skip);
    expect.equal(result, text);
  });

  test('should return the original text when skip is "auto" and the text is an ISO date string', () => {
    const date = new Date().toISOString();
    const text = `Today is ${date}`;
    const data = { name: 'John', age: 30, city: 'New York' };
    const skip = 'auto';
    const result = combine(text, data, skip);
    expect.equal(result, text);
  });

  test('should return the original text when skip is "auto" and the text is a URL', () => {
    const text = 'https://example.com';
    const data = { name: 'John', age: 30, city: 'New York' };
    const skip = 'auto';
    const result = combine(text, data, skip);
    expect.equal(result, text);
  });

  test('should return an encoded message when skip is false', () => {
    const text = 'Hello, World!';
    const data = { name: 'John', age: 30, city: 'New York' };
    const skip = false;
    const result = combine(text, data, skip);
    expect.notEqual(result, text);

    const zeroWidthRegex = new RegExp(
      `[${ZERO_WIDTH_SPACE}${ZERO_WIDTH_JOINER}${ZERO_WIDTH_NON_JOINER}]`,
    );
    expect.match(result, zeroWidthRegex); // The result should contain zero-width characters
  });
});
