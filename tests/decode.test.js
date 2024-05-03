import { strict as expect } from 'node:assert';
import { describe, test } from 'node:test';
import { combine } from '../src/combine.js';
import { decode } from '../src/utils.js';

describe('decode', () => {
  test.only('should return the decoded string and the encoded data length when given a string encoded with zero-width characters', () => {
    const text = 'Hello, World!';
    const data = { name: 'John', age: 30, city: 'New York' };
    const encodedStr = combine(text, data, false);

    const result = decode(encodedStr);
    expect.equal(
      result.result,
      'Hello, World!0378{"name":"John","age":30,"city":"New York"}',
    );
    expect.equal(result.encodedDataLength, '0378');
  });

  // test("should return the decoded string and the encoded data length when given a string encoded with zero-width characters and the encoded data cannot be parsed as JSON", () => {
  //   const zeroWidthStr = "Hello, World!This is not JSON";
  //   const result = decode(zeroWidthStr);
  //   expect(result.result).toBe("Hello, World!This is not JSON");
  //   expect(result.encodedDataLength).toBe("0018");
  // });

  // test("should return the decoded string and the encoded data length when given a string that was not encoded with zero-width characters", () => {
  //   const notEncodedStr = "Hello, World!";
  //   const result = decode(notEncodedStr);
  //   expect(result.result).toBe("Hello, World!");
  //   expect(result.encodedDataLength).toBe("");
  // });
});
