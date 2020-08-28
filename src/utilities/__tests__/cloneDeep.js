/**
 * @file Creates tests for deep clone.
 * @author Junjie Chen <junjie.chen18@gmail.com>
 */

import { mockData, cloneDeep } from '../../setupTests';

test('returns a deep clone of an object', () => {
  const mockDataDeepClone = cloneDeep(mockData);
  mockDataDeepClone.launches[1].rocket.rocket_name = '';

  expect(mockData.launches[1].rocket.rocket_name).toBe('Falcon 9');
  expect(mockDataDeepClone.launches[1].rocket.rocket_name).toBe('');
  expect(mockData).not.toEqual(mockDataDeepClone);
});
