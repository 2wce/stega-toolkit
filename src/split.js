// @ts-check

import { decode } from './utils.js';

/**
 * Split string was encoded using the combine function
 * @param {string} zeroWidthStr
 * @returns {{ text: string, data: Record<string, any> | string }}
 */
export function split(zeroWidthStr) {
  const { result, encodedDataLength } = decode(zeroWidthStr);

  // Extract the original text and the encoded data from the result
  let [text, encodedData] = result.split(encodedDataLength);

  // Try to parse the encodedData as JSON. If it fails, return the encodedData as a string.
  let data;
  try {
    data = JSON.parse(encodedData);
  } catch (err) {
    data = encodedData;
  }

  // Return the original text and the decoded data
  return { text, data };
}
