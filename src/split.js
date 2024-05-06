import { decode } from './decode.js';

/**
 * This function decodes a string that was encoded using the `combine` function.
 * It splits the string into the original text and the encoded data, and then
 * attempts to parse the encoded data as JSON.
 * If the `decodeDates` option is true, it checks the values of the parsed data
 * for ISO date strings and converts them back to Date objects.
 * Note: This function only checks one level down in the object for date strings.
 * Nested objects are not supported.
 * @param {string} zeroWidthStr - The string of zero-width characters to be decoded
 * @param {Object} [options={ decodeDates: false }] - Options for the split function
 * @param {boolean} options.decodeDates - Whether to decode dates
 * @returns {{ text: string, data: Record<string, any> | string }} - The original text and the decoded data
 */
export function split(zeroWidthStr, options = { decodeDates: false }) {
  const { decodeDates } = options;
  const { result, encodedDataLength } = decode(zeroWidthStr);

  // Extract the original text and the encoded data from the result
  let [text, encodedData] = result.split(encodedDataLength);

  // Try to parse the encodedData as JSON. If it fails, return the encodedData as a string.
  let data;
  try {
    data = JSON.parse(encodedData);

    // If data is an object, check its values for ISO date strings
    if (decodeDates && typeof data === 'object' && data !== null) {
      // Note: This only checks one level down in the object. Nested objects are not supported.
      for (let key in data) {
        if (Date.parse(data[key])) {
          // If the value can be parsed into a date
          data[key] = new Date(data[key]); // Convert it back to a Date object
        }
      }
    }
  } catch (err) {
    data = encodedData;
  }

  // Return the original text and the decoded data
  return { text, data };
}
