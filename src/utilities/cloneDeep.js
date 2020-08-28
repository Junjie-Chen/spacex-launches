/**
 * @file Defines deep clone.
 * @author Junjie Chen <junjie.chen18@gmail.com>
 */

/**
 * Deep clone an object.
 * @param {Object} inObject - An object that needs to be deep cloned.
 * @returns {Object} A deep clone of an object
 */
export const cloneDeep = inObject => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    // Return the value if inObject is not an object
    return inObject;
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = cloneDeep(value);
  }

  return outObject;
};
