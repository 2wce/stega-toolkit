import {
  ZERO_WIDTH_JOINER,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
} from './constants.js';

/**
 * Encodes a string or JSON object into a string of zero-width characters.
 * The function first converts the input data to a string, if it's not already a string.
 * It then iterates over each character in the string, converting each character to a binary string.
 * For each bit in the binary string, it adds a zero-width space to the result if the bit is '0',
 * or a zero-width joiner if the bit is '1'. After each character, it adds a zero-width non-joiner to the result. * @param {Record<string, any> | string} dataToHide
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
