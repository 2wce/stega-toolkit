import { strict as expect } from 'node:assert';
import { describe, test } from 'node:test';
import { combine } from '../src/combine.js';
import { split } from '../src/split.js';

describe('split', () => {
  test('should return the original text and data when given a string encoded with the combine function', () => {
    const text = 'Hello, World!';
    const data = { name: 'John', age: 30, city: 'New York' };
    const encodedStr = combine(text, data);

    const result = split(encodedStr);

    expect.equal(result.text, text);
    expect.deepEqual(result.data, data);
  });

  // it("should return the original text as a string when the encoded data cannot be parsed as JSON", () => {
  //   const encodedStr = "Hello, World!This is not JSON";
  //   const result = split(encodedStr);
  //   expect(result.text).toBe("Hello, World!");
  //   expect(result.data).toBe("This is not JSON");
  // });

  // it("should throw an error when given a string that was not encoded with the combine function", () => {
  //   const notEncodedStr = "Hello, World!";
  //   expect(() => split(notEncodedStr)).toThrow();
  // });
});
