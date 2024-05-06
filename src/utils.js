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
