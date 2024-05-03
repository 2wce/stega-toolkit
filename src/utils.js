// @ts-check

import {
  ZERO_WIDTH_JOINER,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
} from './constants.js';

/**
 *
 * @param {Record<string, any>} jsonObj
 * @returns {string} encodedJSONToBase64String
 */
export function encodeJSONToBase64(jsonObj) {
  return Buffer.from(JSON.stringify(jsonObj)).toString('base64');
}

/**
 *
 * @param {string} base64String
 * @returns {Record<string, any>} Decoded JSON object
 */
export function decodeBase64ToJSON(base64String) {
  if (!base64String) {
    throw new Error('base64String must not be empty');
  }

  let jsonString;
  try {
    jsonString = Buffer.from(base64String, 'base64').toString();
  } catch (err) {
    throw new Error('base64String must be a valid base64 string');
  }

  let jsonObj;
  try {
    jsonObj = JSON.parse(jsonString);
  } catch (err) {
    throw new Error('base64String must be a valid base64-encoded JSON string');
  }

  return jsonObj;
}

/**
 * Function to encode a string into zero-width characters
 * @param {Record<string, any> | string} dataToHide
 * @returns {string} hiddenString
 */
export function encode(dataToHide) {
  // Convert the JSON data to a string
  let stringToHide =
    typeof dataToHide === 'string' ? dataToHide : JSON.stringify(dataToHide);

  // Initialize an empty string to hold the result
  let result = '';

  // Iterate over each character in the input string
  for (let char of stringToHide) {
    // Convert the character to a binary string, padding with zeros to ensure it's 8 bits long
    let binary = char.charCodeAt(0).toString(2).padStart(8, '0');

    // Iterate over each bit in the binary string
    for (let bit of binary) {
      // If the bit is '0', add a zero-width space to the result
      // If the bit is '1', add a zero-width joiner to the result
      result += bit === '0' ? ZERO_WIDTH_SPACE : ZERO_WIDTH_JOINER;
    }

    // After each character, add a zero-width non-joiner to the result
    result += ZERO_WIDTH_NON_JOINER;
  }

  return result;
}

/**
 * Decode a string of zero-width characters into a regular string
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
