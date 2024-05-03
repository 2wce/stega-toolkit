/**
 * Function to encode a string/JSON into zero-width characters
 * @param dataToHide data to be encoded
 * @returns A string with zero-width characters
 */
declare function encode(dataToHide: Record<string, any>): string;

/**
 * Function to decode a string of zero-width characters into a regular string
 * @param dataToHide data to be decoded
 * @returns A regular string/JSON & the encoded data length
 */
declare function decode(zeroWidthStr: string): {
  result: string;
  encodedDataLength: string;
};

/**
 * Function to combine text with JSON data to be encoded into zero-width characters
 * @param text Original string to be combined with the encoded data
 * @param dataToEncode data to be encoded
 * @param skip option to skip encoding (`auto` by default)
 * @returns A string with zero-width characters
 */
declare function combine(
  text: string,
  dataToEncode: Record<string, any>,
  skip: boolean | 'auto',
): string;

/**
 * Function to split zero-width characters into original text and JSON data
 * @param dataToHide data to be encoded
 * @returns A string with zero-width characters
 */
declare function split(zeroWidthStr: string): {
  text: string;
  data: Record<string, any>;
};
