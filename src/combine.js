// @ts-check

import {
  CHECK_IF_VALUE_IS_ISO_DATE,
  CHECK_IF_VALUE_IS_URL,
} from './constants.js';
import { encode } from './utils.js';

/**
 * This method combines a string with some JSON data and returns the result.
 * The json can be any value that can be JSON stringified. When the skip
 * property is true, the original string will be returned without combining
 * the json. It supports boolean values and 'auto'. The default is 'auto',
 * which will only skip encoding when the string is an ISO date string or a URL.
 * @param {string} text
 * @param {Record<string, any>} dataToEncode
 * @param {boolean | string} skip
 * @returns string
 */
export function combine(text, dataToEncode, skip = 'auto') {
  // If the skip parameter is true, return the original string
  if (typeof skip === 'boolean' && skip) {
    return text;
  }

  // If the skip parameter is 'auto', check if the text is an ISO date string or a URL
  if (typeof skip === 'string' && skip === 'auto') {
    const patterns = [CHECK_IF_VALUE_IS_ISO_DATE, CHECK_IF_VALUE_IS_URL];

    if (patterns.some((pattern) => pattern.test(text))) {
      return text;
    }
  }

  // Encode the JSON data to a base64 string
  let encodedData = encode(dataToEncode);

  // Encode the length of the encoded data to zero-width characters
  // Pad the length to 4 digits
  let encodedDataLength = encode(
    encodedData.length.toString().padStart(4, '0'),
  );

  // Combine the text with the encoded data
  let message = `${text}${encodedDataLength}${encodedData}`;

  // Return the encoded message
  return message;
}
