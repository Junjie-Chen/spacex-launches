/**
 * @file Initializes test environment.
 * @author Junjie Chen <junjie.chen18@gmail.com>
 * @see {@link https://create-react-app.dev/docs/running-tests/#initializing-test-environment | Initializing Test Environment}
 */

import { mockData } from './mockData';

export * from './mockData';
export { sortCollection, handleError, cloneDeep } from './utilities';

/**
 * Mock the Fetch API.
 * @returns {Promise} A Promise that is resolved with mock data
 */
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData)
  })
);
