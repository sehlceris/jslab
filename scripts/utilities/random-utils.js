import * as crypto from 'crypto';
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

export const randomNumberInsecure = function(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
};

export const randomIntegerInsecure = function(min = 0, max = 1) {
  return Math.floor(randomNumberInsecure(min, max));
};

export const randomAlphaInsecure = function(length) {
  const sb = [];
  for (let i = 0; i < length; i++) {
    sb.push(alphabet[randomIntegerInsecure(0, 25)]);
  }
  return sb.join('');
}

export const randomHex = function(byteLength = 16) {
  return new Promise(function(resolve) {
    crypto.randomBytes(byteLength, function(err, buffer) {
      const random = buffer.toString('hex');
      resolve(random);
    });
  });
};

export const randomBase64 = function(byteLength = 16) {
  return new Promise(function(resolve) {
    crypto.randomBytes(byteLength, function(err, buffer) {
      const random = buffer.toString('base64');
      resolve(random);
    });
  });
};

export const randomBase64Sync = function(byteLength = 16) {
  return crypto.randomBytes(byteLength).toString('base64');
};