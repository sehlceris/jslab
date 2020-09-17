const crypto = require('crypto');
const args = process.argv.slice(2);

function generateSecureRandom(bytes = 256) {
  return crypto.randomBytes(bytes).toString('base64').replace(/[^\w]/g, '');
}

let maxRandomLength = 256;
let countOfRandomsToGenerate = 1;

console.log('\n');

if (args.length) {
  const arg0 = parseInt(args[0], 10);
  const arg1 = parseInt(args[1], 10);
  if (typeof(arg0) === 'number' && Number.isFinite(arg0)) {
    maxRandomLength = Math.max(1, Math.min(arg0, maxRandomLength));
  }
  if (typeof(arg1) === 'number' && Number.isFinite(arg1)) {
    countOfRandomsToGenerate = arg1;
  }

  // fancy mode
  console.log(`Generating ${countOfRandomsToGenerate} random strings of length ${maxRandomLength}\n\n`);

  const countOfRandomsToGenerateStr = `${countOfRandomsToGenerate}`;
  const padLength = countOfRandomsToGenerateStr.length;
  for (let i = 0; i < countOfRandomsToGenerate; i++) {
    const randomString = generateSecureRandom(maxRandomLength);
    let randomStringTrimmed = randomString.substring(0, maxRandomLength);
    console.log(`${String(i).padStart(padLength, '0')}: ${randomStringTrimmed}`);
  }
}
else {
  console.log(generateSecureRandom(maxRandomLength));
}

console.log('\n');