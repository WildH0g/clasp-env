const fs = require('fs/promises');
const path = require('path');

/**
 * Pipes the return values of functions into the next ones in a sequence
 * @param  {...function} fns The list of funcitions
 * @returns {function}
 */
const pipe =
  (...fns) =>
  init =>
    fns.reduce(async (v, f) => f(await v), init);

/**
 * Reads user input array and adds it to retuned object
 * @param {object} obj
 * @returns {object}
 */
const getInputs = (obj = {}) => ({ ...obj, input: process.argv.slice(2) });

/**
 * Converts input array to object and records any input errors in the process, adds it to returned object..
 * @param {object} obj
 * @returns {object}
 */
const inputsToObj = (obj = {}) => {
  const VALID_OPTIONS = ['--folder', '--scriptId'];
  const { input } = obj;
  const options = input.reduce(
    (acc, item, i) => {
      if (i % 2 === 0) {
        if (!VALID_OPTIONS.includes(item)) {
          const errorMessage = `Option ${item} is not recognized.`;
          acc.errorMessages.push(errorMessage);
          return { ...acc, hasErrors: true };
        }
        return acc;
      }
      return { ...acc, [input[i - 1].replace('--', '')]: item };
    },
    { hasErrors: false, errorMessages: [] }
  );
  return { ...obj, options };
};

/**
 * Reads the data from the .clasp.json file specified with the --folder option and adds it to returned object.
 * @param {object} obj
 * @returns {object}
 */
const readClaspFile = async (obj = {}) => {
  const { options } = obj;
  if (options?.hasErrors) return obj;
  const FILENAME = '.clasp.json';
  const filePath = path.join(options.folder, FILENAME);
  let currentData = {};
  try {
    currentData = JSON.parse((await fs.readFile(filePath)).toString());
  } catch (err) {
    obj.options.hasErrors = true;
    if (!obj.options.errorMessages) obj.options.errorMessages = [];
    obj.options.errorMessages.push(
      'Make sure the path is valid.'
    );
    return obj;
  }
  return { ...obj, currentData, filePath };
};

/**
 * Updates the .clasp.json file if it needs updating and returns final resulting object
 * @param {*} obj
 * @returns {object}
 */
const conditionallyUpdateFile = async (obj = {}) => {
  const { options, currentData, filePath } = obj;
  if (options?.hasErrors) return { ...obj, hasSucceded: false };
  if (currentData.scriptId === options.scriptId)
    return { ...obj, hasSucceeded: true, scriptIdUpdated: false };
  currentData.scriptId = options.scriptId;
  try {
    await fs.writeFile(filePath, JSON.stringify(currentData));
    return { ...obj, hasSucceeded: true, scriptIdUpdated: true };
  } catch (err) {
    return { ...obj, hasSucceded: false, errorMessage: err };
  }
};

module.exports = {
  getInputs,
  inputsToObj,
  readClaspFile,
  conditionallyUpdateFile,
  pipe,
};
