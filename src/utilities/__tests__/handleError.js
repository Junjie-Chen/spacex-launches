/**
 * @file Creates tests for error handling.
 * @author Junjie Chen <junjie.chen18@gmail.com>
 */

import { mockData, handleError } from '../../setupTests';

test('returns an object that contains an error message', () => {
  expect(handleError(() => {
    throw new Error('The date cannot be found! Please check the corresponding property for the date.');
  })).toEqual({ error: 'The date cannot be found! Please check the corresponding property for the date.' });
});

test('returns an object that contains a result', () => {
  expect(handleError(() => {
    return mockData;
  })).toEqual({ result: mockData });
});
