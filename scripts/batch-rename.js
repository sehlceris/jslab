/**
 * Batch renames all files in the current directory.
 * Define your custom rename logic inside the `customRename` function.
 * Running without the `-r` flag will perform a dry run.
 */

const fs = require('fs');
const validFilename = require('valid-filename');

const argv = require('yargs')
  .option('run', {
    alias: 'r',
    type: 'boolean',
    default: false,
    description: 'If true, will perform an actual run instead of a dry run'
  })
  .argv;

console.log(`arguments: ${JSON.stringify(argv, undefined, 2)}`);

const STARTNG_NUMBER = 1;

const originalFilenames = fs.readdirSync('.');
console.log(`original filenames:  ${JSON.stringify(originalFilenames, undefined, 2)}`);

const newFilenames = [];
let currentNumber = STARTNG_NUMBER;
let padLength = String(originalFilenames.length + currentNumber).length;
for (let i = 0; i < originalFilenames.length; i++) {
  let alteredFilename = customRename(originalFilenames[i], currentNumber, padLength);
  currentNumber++;
  if (validFilename(alteredFilename)) {
    newFilenames.push(alteredFilename);
  }
  else {
    const errorMessage = `ERROR: filename '${alteredFilename}' is not valid - aborting`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

console.log(`new filenames:  ${JSON.stringify(newFilenames, undefined, 2)}`);

for (let i = 0; i < originalFilenames.length; i++) {
  const originalFilename = originalFilenames[i];
  const newFilename = newFilenames[i];
  console.log(`rename: '${originalFilename}' to '${newFilename}'`);
}

if (argv.run) {
  for (let i = 0; i < originalFilenames.length; i++) {
    const originalFilename = originalFilenames[i];
    const newFilename = newFilenames[i];
    fs.renameSync(`./${originalFilename}`, `./${newFilename}`);
  }
}
else {
  console.log(`\nre-run with '--run' to perform a real rename (this was just a dry run)\n`);
}

function customRename(originalFilename, currentNumber, padLength) {
    return `My File - ${originalFilename}`;
}