/**
 * @file Creates tests for collection sorting using Schwartzian transform.
 * @author Junjie Chen <junjie.chen18@gmail.com>
 */

import { mockData, sortCollection, cloneDeep } from '../../setupTests';

let launches;

beforeEach(() => {
  launches = mockData.launches;
});

test('throws an error when a data collection is not provided', () => {
  expect(() => {
    sortCollection(
      () => [],
      (a, b) => a - b
    );
  }).toThrow();
});

test('throws an error when a iterative callback is not provided', () => {
  expect(() => {
    sortCollection(
      [{}],
      (a, b) => a - b
    );
  }).toThrow();
});

test('throws an error when a sorting callback is not provided', () => {
  expect(() => {
    sortCollection(
      [{}],
      () => []
    );
  }).toThrow();
});

test('throws an error when the data collection is empty', () => {
  expect(() => {
    sortCollection(
      [],
      () => [],
      (a, b) => a - b
    );
  }).toThrow();
});

test('throws an error when the iterative callback is not a function', () => {
  expect(() => {
    sortCollection(
      [{}],
      '',
      (a, b) => a - b
    );
  }).toThrow();
});

test('throws an error when the sorting callback is not a function', () => {
  expect(() => {
    sortCollection(
      [{}],
      () => [],
      ''
    );
  }).toThrow();
});

test('throws an error when a property cannot be found', () => {
  const launchesDeepClone = cloneDeep(launches);
  launchesDeepClone[1].launch_date_utc = '';

  expect(() => {
    sortCollection(
      launchesDeepClone,
      item => {
        if (!item.launch_date_utc) {
          throw new ReferenceError('The date cannot be found! Please check the corresponding property for the date.');
        }

        return [+new Date(item.launch_date_utc), item];
      },
      (a, b) => a - b
    );
  }).toThrow();
});

test('returns a sorted collection', () => {
  const launchesDeepClone = cloneDeep(launches);
  const launchDeepClone = launchesDeepClone[0];
  launchesDeepClone[0] = launchesDeepClone[1];
  launchesDeepClone[1] = launchDeepClone;

  expect(sortCollection(
    launches,
    item => {
      if (!item.launch_date_utc) {
        throw new ReferenceError('The date cannot be found! Please check the corresponding property for the date.');
      }

      return [+new Date(item.launch_date_utc), item];
    },
    (a, b) => a - b
  )).toEqual(launchesDeepClone);
});
