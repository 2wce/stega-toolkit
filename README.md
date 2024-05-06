# stega-toolkit

A set of steganography utility functions for embedding JSON data in text

[![Version](https://img.shields.io/npm/v/stega-toolkit.svg)](https://www.npmjs.com/package/stega-toolkit)
[![License](https://img.shields.io/npm/l/stega-toolkit.svg)](https://github.com/2wce/stega-toolkit/blob/main/LICENSE)
![Build Status](https://github.com/2wce/stega-toolkit/actions/workflows/release.yml/badge.svg)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install stega-toolkit
```

## Usage

```javascript
// Example usage code here
```

## API

### `combine(params)`

This method combines a string with some JSON data and returns the result. The JSON data can be any value that can be JSON stringified. When the `skip` property is `true`, the original string will be returned without combining the JSON data. It supports boolean values and 'auto'. The default is 'auto', which will only skip encoding when the string is an ISO date string or a URL. If the `encodeDates` option is true, Date objects in the JSON data will be converted to ISO date strings before being combined with the text.

#### Parameters

- `params` (Object)
  - `text` (string): The text to combine with the JSON data.
  - `dataToEncode` (Record<string, any> | string): The JSON data to combine with the text.
  - `options` (Object): Options for the combine function.
    - `skip` (boolean | string): Whether to skip combining the JSON data with the text. Defaults to 'auto'.
    - `encodeDates` (boolean): Whether to encode dates. Defaults to `false`.

#### Returns

- (string): The combined text and JSON data, encoded as a string.

#### Example

```javascript
import { combine } from 'stega-toolkit';

let combined = combine({
  text: 'Hello, World!',
  dataToEncode: { name: 'John', age: 30, city: 'New York' },
  options: { skip: 'auto', encodeDates: false },
});
```

### `split(zeroWidthStr, options)`

This function decodes a string that was encoded using the `combine` function. It splits the string into the original text and the encoded data, and then attempts to parse the encoded data as JSON. If the `decodeDates` option is true, it checks the values of the parsed data for ISO date strings and converts them back to Date objects. Note: This function only checks one level down in the object for date strings. Nested objects are not supported.

#### Parameters

- `zeroWidthStr` (string): The string of zero-width characters to be decoded.
- `options` (Object): Options for the split function.
  - `decodeDates` (boolean): Whether to decode dates. Defaults to `false`.

#### Returns

- (Object): An object containing the original text and the decoded data.

#### Example

```javascript
import { split } from 'stega-toolkit';

let { text, data } = split(combined, { decodeDates: false });
```

### `decode(zeroWidthStr)`

This function decodes a string of zero-width characters into a regular string. It iterates over each character in the input string. If the character is a zero-width space, it adds '0' to a binary string. If the character is a zero-width joiner, it adds '1' to the binary string. If the character is a zero-width non-joiner, it converts the binary string to a character and adds it to the result. The function also handles the encoded data length, which is the first four characters of the decoded string. If there are remaining bits in the binary string after the loop, it converts them to a character and adds them to the result.

#### Parameters

- `zeroWidthStr` (string): The string of zero-width characters to be decoded.

#### Returns

- (Object): An object containing the decoded string (`result`) and the length of the encoded data (`encodedDataLength`).

#### Example

```javascript
import { decode } from 'stega-toolkit';

let { result, encodedDataLength } = decode(zeroWidthStr);
```

### `encode(dataToHide)`

This function encodes a string or JSON object into a string of zero-width characters. The function first converts the input data to a string, if it's not already a string. It then iterates over each character in the string, converting each character to a binary string. For each bit in the binary string, it adds a zero-width space to the result if the bit is '0', or a zero-width joiner if the bit is '1'. After each character, it adds a zero-width non-joiner to the result.

#### Parameters

- `dataToHide` (Record<string, any> | string): The data to be encoded. Can be a string or a JSON object.

#### Returns

- (string): The input data encoded as a string of zero-width characters.

#### Example

```javascript
import { encode } from 'stega-toolkit';

let hiddenString = encode({ name: 'John', age: 30, city: 'New York' });
```

## Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) before making a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
