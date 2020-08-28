/**
 * @file Defines url parsing.
 * @author Junjie Chen <junjie.chen18@gmail.com>
 */

/**
 * Parse an url.
 * @param {string} url - The url that needs to be parsed.
 * @param {string} base - An url that the parsed url will start with.
 * @param {parsingCallback} parsingFunc - The callback that handles the parsing.
 * @returns {string} A parsed url
 */
export const parseUrl = (url, base, parsingFunc) => {
  if (!url || !base || !parsingFunc) {
    throw new ReferenceError('One argument is missing! Please provide all the arguments.');
  }

  if (!new URL(url)) {
    throw new TypeError('The url is not valid! Please provide a valid url.');
  }

  if (!new URL(base)) {
    throw new TypeError('The base url is not valid! Please provide a valid url.');
  }

  if (typeof parsingFunc !== 'function') {
    throw new TypeError('The parsing callback is not a function! Please provide a function.');
  }

  return parsingFunc(url, base);
};

/**
 * This callback type is called `parsingCallback` and is displayed as a global symbol.
 *
 * @callback parsingCallback
 * @param {string} url
 * @param {string} base
 */
