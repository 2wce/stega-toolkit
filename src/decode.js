import {
  ZERO_WIDTH_JOINER,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
} from './constants.js';

/**
 * Decodes a string of zero-width characters into a regular string. The function
 * iterates over each character in the input string.
 * The function also handles the encoded data length, which is the first four
 * characters of the decoded string.
 * If there are remaining bits in the binary string after the loop,
 * it converts them to a character and adds them to the result.
 * @param {string} zeroWidthStr
 * @returns {{result: string, encodedDataLength: string}}
 */
export function decode(zeroWidthStr) {
  // Initialize an empty string to hold the binary representation
  let binaryStr = '';
  // Initialize an empty string to hold the result
  let result = '';
  let encodedDataLength = '';
  let isLength = true;

  // Iterate over each character in the zeroWidthStr
  for (let char of zeroWidthStr) {
    // If the character is a zero-width space, add '0' to the binary string
    if (char === ZERO_WIDTH_SPACE) {
      binaryStr += '0';
    }
    // If the character is a zero-width joiner, add '1' to the binary string
    else if (char === ZERO_WIDTH_JOINER) {
      binaryStr += '1';
    }
    // If the character is a zero-width non-joiner, convert the binary string to a character and add it to the result
    else if (char === ZERO_WIDTH_NON_JOINER && binaryStr) {
      let decodedChar = String.fromCharCode(parseInt(binaryStr, 2));

      if (isLength) {
        encodedDataLength += decodedChar;
        if (encodedDataLength.length === 4) {
          isLength = false;
          result += encodedDataLength;
        }
      } else {
        result += decodedChar;
      }
      // Reset the binary string
      binaryStr = '';
    } else {
      result += char;
    }
  }

  // If there are remaining bits in the binary string after the loop, convert them to a character and add it to the result
  if (binaryStr) {
    result += String.fromCharCode(parseInt(binaryStr, 2));
  }

  return { result, encodedDataLength };
}
