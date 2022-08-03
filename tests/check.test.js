const fs = require('fs/promises');
const path = require('path');

const {
  inputsToObj,
  readClaspFile,
  conditionallyUpdateFile,
  pipe,
} = require('../lib');

describe('Valid inputs', () => {
  const validInputs = [
    ['--folder', './', '--scriptId', 'abc'],
    { options: { folder: 'tests' } },
    { options: { folder: 'tests', scriptId: 'xyz' } },
    { options: { folder: 'tests', scriptId: 'abc' } },
  ];

  const validOutcomes = [
    {
      input: validInputs,
      options: {
        folder: './',
        scriptId: 'abc',
        hasErrors: false,
        errorMessages: [],
      },
      currentData: { scriptId: 'abc' },
      hasSucceeded: true,
      valueUpdated: true,
    },
    null,
    {
      hasSucceeded: true,
      scriptIdUpdated: false,
    },
    {
      hasSucceeded: true,
      scriptIdUpdated: true,
    },
  ];

  it('Inputs are properly converted to options', () => {
    const result = inputsToObj({ input: validInputs[0] });
    expect(result.options).toEqual(validOutcomes[0].options);
  });

  it('Reads .clasp.json file correctly', async () => {
    await fs.writeFile(
      path.join(__dirname, '.clasp.json'),
      '{"scriptId": "xyz"}'
    );
    const result = await readClaspFile(validInputs[1]);
    expect(result.currentData.scriptId).toBe('xyz');
  });

  it('File is not updated if scriptId does not change', async () => {
    const result = await pipe(
      readClaspFile,
      conditionallyUpdateFile
    )(validInputs[2]);
    expect(result).toEqual(expect.objectContaining(validOutcomes[2]));
  });

  it('File is updated if scriptId changes', async () => {
    const result = await pipe(
      readClaspFile,
      conditionallyUpdateFile
    )(validInputs[3]);
    expect(result).toEqual(expect.objectContaining(validOutcomes[3]));
  });
});

describe('Invalid iputs', () => {
  const invalidInputs = [
    ['--fler', './', '--scriptId', 'abc'],
    { options: { folder: 'thisfolderdoesnotexit', scriptId: 'aaabbbccc' } },
  ];
  const invalidOutcomes = [
    {
      options: {
        fler: './',
        scriptId: 'abc',
        hasErrors: true,
        errorMessages: ['Option --fler is not recognized'],
      },
    },
    {
      hasSucceeded: false,
    },
  ];
  it('Misspeled --fler is not a valid option', () => {
    const result = inputsToObj({ input: invalidInputs[0] });
    expect(result.options).toEqual(invalidOutcomes[0].options);
    expect(result.options.hasErrors).toBe(true);
  });
  it('.clasp.json does not exist at the given path', async () => {
    const result = await pipe(
      readClaspFile,
      conditionallyUpdateFile
    )(invalidInputs[1]);
    expect(result.hasSucceded).toBe(invalidOutcomes[1].hasSucceeded);
  });
});
