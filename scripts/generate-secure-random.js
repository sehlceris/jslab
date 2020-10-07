const crypto = require('crypto');
const args = process.argv.slice(2);

const MAXIMUM_RANDOM_LENGTH = 256;

function generateSecureRandom(bytes = 256) {
  return crypto.randomBytes(bytes).toString('base64').replace(/[^\w]/g, '');
}

let randomLength = 32;
let countOfRandomsToGenerate = 5;

console.log(`generateSecureRandom [randomLength=${randomLength}] [countOfRandomsToGenerate=${countOfRandomsToGenerate}]`)
console.log('\n');

if (args.length) {
  const arg0 = parseInt(args[0], 10);
  const arg1 = parseInt(args[1], 10);
  if (typeof(arg0) === 'number' && Number.isFinite(arg0)) {
    randomLength = Math.max(1, Math.min(arg0, MAXIMUM_RANDOM_LENGTH));
  }
  if (typeof(arg1) === 'number' && Number.isFinite(arg1)) {
    countOfRandomsToGenerate = arg1;
  }
}

console.log(`Generating ${countOfRandomsToGenerate} random strings of length ${randomLength}\n\n`);

const countOfRandomsToGenerateStr = `${countOfRandomsToGenerate}`;
const padLength = countOfRandomsToGenerateStr.length;
for (let i = 0; i < countOfRandomsToGenerate; i++) {
  const randomString = generateSecureRandom(randomLength);
  let randomStringTrimmed = randomString.substring(0, randomLength);
  console.log(`${String(i).padStart(padLength, '0')}: ${randomStringTrimmed}`);
}

console.log('\n');