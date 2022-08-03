#!/usr/bin/env node

const {
  getInputs,
  inputsToObj,
  readClaspFile,
  conditionallyUpdateFile,
  pipe,
} = require('./lib');

(async () => {
  const result = await pipe(
    getInputs,
    inputsToObj,
    readClaspFile,
    conditionallyUpdateFile
  )();

  if (result.hasSucceeded) return;
  
  let message = '';
  
  if (result?.options?.errorMessages.length)
    message += result.options.errorMessages.join(' ');

  if (result.errorMessage)
    message += message.length
      ? `\n${result.errorMessage}`
      : result.errorMessage;

  console.error('Could not update .clasp.json.', message);
})();
