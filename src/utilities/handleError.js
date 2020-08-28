/**
 * @file Defines error handling.
 * @author Junjie Chen <junjie.chen18@gmail.com>
 */

/**
 * Handle an error.
 * @param {generalCallback} func - The callback that returns either a result or an error.
 * @returns {Object} An object that contains either a result or an error message
 */
export const handleError = func => {
  let result;

  try {
    result = func();
  } catch (error) {
    return { error: error.message };
  }

  return { result };
};

/**
 * This callback type is called `generalCallback` and is displayed as a global symbol.
 *
 * @callback generalCallback
 */
