/**
 * @file Defines collection sorting using Schwartzian transform.
 * @author Junjie Chen <junjie.chen18@gmail.com>
 * @see {@link http://en.wikipedia.org/wiki/Schwartzian_transform | Schwartzian transform}
 */

/**
 * Returns a function that is called for every item of a collection.
 * @param {iterativeCallback} func - The callback that is called for every item of a collection.
 * @returns {iterativeCallback}
 */
const decorate = func => {
  return item => {
    return func(item);
  };
};

/**
 * Returns a function that defines the sort order.
 * @param {sortingCallback} sortingFunc - The callback that handles the sorting.
 * @throws {TypeError}
 * @returns {sortingCallback}
 */
const compare = sortingFunc => {
  if (typeof sortingFunc !== 'function') {
    throw new TypeError('The sorting callback is not a function! Please provide a function.');
  }

  return (a, b) => {
    return sortingFunc(a[0], b[0]);
  };
};

/**
 * Returns the second item in a collection.
 * @param {Object[]} item - A collection that contains the second item.
 * @returns {Object} The second item
 */
const undecorate = item => {
  return item[1];
};

/**
 * Sort a collection by date.
 * @param {Object[]} dataCollection - The collection that needs to be sorted.
 * @param {iterativeCallback} func - The callback that is called for every item of a collection.
 * @param {sortingCallback} sortingFunc - The callback that handles the sorting.
 * @returns {Object[]} A collection that is either sorted, the same or empty
 */
export const sortCollection = (dataCollection, func, sortingFunc) => {
  if (!dataCollection || !func || !sortingFunc) {
    throw new ReferenceError('One argument is missing! Please provide all the arguments.');
  }

  if (!dataCollection.length) {
    throw new TypeError('The data collection is empty! Please provide a non-empty collection.');
  }

  if (typeof func !== 'function') {
    throw new TypeError('The iterative callback is not a function! Please provide a function.');
  }

  if (typeof sortingFunc !== 'function') {
    throw new TypeError('The sorting callback is not a function! Please provide a function.');
  }

  return dataCollection.map(decorate(func))
    .sort(compare(sortingFunc))
    .map(undecorate);
};

/**
 * This callback type is called `iterativeCallback` and is displayed as a global symbol.
 *
 * @callback iterativeCallback
 * @param {*} item
 * @param {number} [index]
 */

/**
 * This callback type is called `sortingCallback` and is displayed as a global symbol.
 *
 * @callback sortingCallback
 * @param {number} a
 * @param {number} b
 */
