/**
 * @file Creates tests for url parsing.
 * @author Junjie Chen <junjie.chen18@gmail.com>
 */

import { parseUrl } from '../../setupTests';

test('throws an error when the url is not provided', () => {
  expect(() => {
    parseUrl(
      'https://www.youtube.com/embed/',
      () => ''
    );
  }).toThrow();
});

test('throws an error when a base url is not provided', () => {
  expect(() => {
    parseUrl(
      'https://youtu.be/ScYUA51-POQ',
      () => ''
    );
  }).toThrow();
});

test('throws an error when the parsing callback is not provided', () => {
  expect(() => {
    parseUrl(
      'https://youtu.be/ScYUA51-POQ',
      'https://www.youtube.com/embed/'
    );
  }).toThrow();
});

test('throws an error when the url is not valid', () => {
  expect(() => {
    parseUrl(
      'https://',
      'https://www.youtube.com/embed/',
      () => ''
    );
  }).toThrow();
});

test('throws an error when the base url is not valid', () => {
  expect(() => {
    parseUrl(
      'https://youtu.be/ScYUA51-POQ',
      'https://',
      () => ''
    );
  }).toThrow();
});

test('throws an error when the parsing callback is not a function', () => {
  expect(() => {
    parseUrl(
      'https://youtu.be/ScYUA51-POQ',
      'https://www.youtube.com/embed/',
      ''
    );
  }).toThrow();
});

test('throws an error when the url does not have an id', () => {
  expect(() => {
    parseUrl(
      'https://youtu.be/',
      'https://www.youtube.com/embed/',
      (url, base) => {
        const id = url.match(/(?<=v=|e\/)(?:(?!&).)*/)[0];

        if (!id) {
          throw new TypeError('The url does not have an id! Please provide an id.');
        }

        return `${base}${id}`;
      }
    );
  }).toThrow();
});

test('returns a parsed url', () => {
  const parsedUrl = parseUrl(
    'https://youtu.be/ScYUA51-POQ',
    'https://www.youtube.com/embed/',
    (url, base) => {
      const id = url.match(/(?<=v=|e\/)(?:(?!&).)*/)[0];

      if (!id) {
        throw new TypeError('The url does not have an id! Please provide an id.');
      }

      return `${base}${id}`;
    }
  );

  expect(parsedUrl).toBe('https://www.youtube.com/embed/ScYUA51-POQ');
});
