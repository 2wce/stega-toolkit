import {
  CHECK_IF_VALUE_IS_ISO_DATE,
  CHECK_IF_VALUE_IS_URL,
} from './constants.js';
import { encode } from './encode.js';

/**
 * This method combines a string with some JSON data and returns the result.
 * The json can be any value that can be JSON stringified. When the skip
 * property is true, the original string will be returned without combining
 * the json. It supports boolean values and 'auto'. The default is 'auto',
 * which will only skip encoding when the string is an ISO date string or a URL.
 * If the `encodeDates` option is true, Date objects in the JSON data will be
 * converted to ISO date strings before being combined with the text.
 * @param {Object} params
 * @param {string} params.text - The text to combine with the JSON data
 * @param {Record<string, any> | string} params.dataToEncode - The JSON data to combine with the text
 * @param {Object} [params.options] - Optional. Options for the combine function
 * @param {boolean | string} [params.options.skip='auto'] - Whether to skip combining the JSON data with the text. Defaults to 'auto'.
 * @param {boolean} [params.options.encodeDates=false] - Whether to encode dates. Defaults to `false`.
 * @returns string
 */
export function combine({
  text,
  dataToEncode,
  options = { skip: 'auto', encodeDates: false },
}) {
  const { skip, encodeDates } = options;

  // If the skip parameter is true, return the original string
  if (typeof skip === 'boolean' && skip) {
    return text;
  }

  // If the skip parameter is 'auto', check if the text is an ISO date string or a URL
  if (typeof skip === 'string' && skip === 'auto') {
    // If the dataToEncode is a Date object, convert it to an ISO string
    if (encodeDates && dataToEncode instanceof Date) {
      dataToEncode = dataToEncode.toISOString();
    }

    // If the dataToEncode is an object, check its values for Date objects
    if (typeof dataToEncode === 'object' && dataToEncode !== null) {
      // Note: This only checks one level down in the object. Nested objects are not supported.
      for (let key in dataToEncode) {
        if (dataToEncode[key] instanceof Date) {
          // If encodeDates is true, convert Date objects to ISO strings
          if (encodeDates) {
            dataToEncode[key] = dataToEncode[key].toISOString();
          }
        }
      }
    }

    if (!encodeDates) {
      const patterns = [CHECK_IF_VALUE_IS_ISO_DATE, CHECK_IF_VALUE_IS_URL];

      if (patterns.some((pattern) => pattern.test(text))) {
        return text;
      }
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
