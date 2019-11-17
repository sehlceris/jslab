const os = require('os');
const util = require('util');
const fs = require('fs');
const streamPipeline = util.promisify(require('stream').pipeline);
const path = require('path');

const tar = require('tar');
const lzma = require('lzma-native');
const fetch = require('node-fetch');
const pgp = require('openpgp');
const rimraf = require('rimraf');
const {JSDOM} = require('jsdom');

const BASE_URL = 'https://www.torproject.org';
const DOWNLOAD_PAGE = BASE_URL + '/download/';
const DOWNLOAD_DIRECTORY = path.join('.', 'tmp');
const PUBLIC_KEY_FILE_PATH = path.join('.', 'res', 'tor-browser-developers.asc');
const BROWSER_DESTINATION_DIRECTORY_NAME = 'tor-browser_en-US';
const DESTINATION_DIRECTORY = path.join(os.homedir(), 'apps');

async function main() {
  console.log(`\n\n**********\ndownloading tor browser bundle\n**********\n`);

  // fetch the download page and parse it into a DOM
  const fetchDownloadPagePromise = fetch(DOWNLOAD_PAGE).then(response => response.text());
  const downloadPageText = await fetchDownloadPagePromise;
  const document = new JSDOM(downloadPageText).window.document;

  // grab the download links for the browser bundle and its signature
  let browserDownloadLink = getBundleLink(document);
  let signatureDownloadLink = getSignatureLink(document);

  if (!browserDownloadLink.startsWith(BASE_URL)) {
    browserDownloadLink = BASE_URL + browserDownloadLink;
  }
  if (!signatureDownloadLink.startsWith(BASE_URL)) {
    signatureDownloadLink = BASE_URL + signatureDownloadLink;
  }

  // create our download directory
  if (!fs.existsSync(DOWNLOAD_DIRECTORY)) {
    fs.mkdirSync(DOWNLOAD_DIRECTORY);
  }

  // figure out which path we want to write to
  const browserDownloadPath = getWritePath(DOWNLOAD_DIRECTORY, browserDownloadLink);
  const signatureDownloadPath = getWritePath(DOWNLOAD_DIRECTORY, signatureDownloadLink);

  // download the URLs to the specified paths
  await download(browserDownloadPath, browserDownloadLink);
  await download(signatureDownloadPath, signatureDownloadLink);

  // verify the signature of the downloaded file against the public key
  await verifySignature(browserDownloadPath, signatureDownloadPath, PUBLIC_KEY_FILE_PATH);

  // decompress and extract the browser bundle to the destination directory
  await extractToDestination(browserDownloadPath, DESTINATION_DIRECTORY, BROWSER_DESTINATION_DIRECTORY_NAME);

  console.log(`\n\n**********\nfinished!\n**********\n`);
}

function getBundleLink(ele) {
  const linkTags = [...ele.querySelectorAll('a.downloadLink')];
  const hrefs = linkTags.map((link) => link.getAttribute('href'));
  const filtered = hrefs.filter((href) => {
    const lowerHref = href.toLowerCase();
    return lowerHref.indexOf('linux') > -1 && lowerHref.endsWith('tar.xz');
  });
  if (filtered.length !== 1) {
    throw new Error(`unable to find download link from ${JSON.stringify(hrefs)}`);
  }
  return filtered[0];
}

function getSignatureLink(ele) {
  const linkTags = [...ele.querySelectorAll('a')];
  const hrefs = linkTags.map((link) => link.getAttribute('href'));
  const filtered = hrefs.filter((href) => {
    if (!href) {
      return false;
    }
    const lowerHref = href.toLowerCase();
    return lowerHref.indexOf('linux') > -1 && lowerHref.endsWith('tar.xz.asc');
  });
  if (filtered.length !== 1) {
    throw new Error(`unable to find signature link  from ${JSON.stringify(hrefs)}`);
  }
  return filtered[0];
}

function getWritePath(dir, url) {
  const filename = new URL(url).pathname.split('/').pop();
  const writePath = path.join(dir, filename);
  return writePath;
}

async function download(writePath, url, overwrite = true) {
  console.log(`downloading\n\turl ${url}\n\tto ${writePath}`);

  if (fs.existsSync(writePath)) {
    if (overwrite) {
      console.log(`overwriting existing file ${writePath}`);
      fs.unlinkSync(writePath);
    } else {
      throw new Error(`file ${writePath} already exists`);
    }
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  await streamPipeline(response.body, fs.createWriteStream(writePath));
}


async function verifySignature(browserDownloadPath, signatureDownloadPath, publicKeyFilePath) {
  console.log(`verifying signature\n\tof file ${browserDownloadPath}\n\twith signature ${signatureDownloadPath}\n\tagainst public key ${publicKeyFilePath}`);

  const armoredText = fs.readFileSync(publicKeyFilePath, 'utf8');
  const publicKeysResult = await pgp.key.readArmored(armoredText);
  const publicKeys = publicKeysResult.keys;

  const signatureText = fs.readFileSync(signatureDownloadPath, 'utf8');
  const signature = await pgp.signature.readArmored(signatureText);

  const browserBundleFile = fs.readFileSync(browserDownloadPath);
  const message = await pgp.message.fromBinary(browserBundleFile);

  const verificationResult = await pgp.verify({
    publicKeys,
    signature,
    message
  });

  const isValid = verificationResult.signatures.every((signature) => signature.valid);
  if (!isValid) {
    throw new Error(`signature is not valid`);
  }
  console.log(`signature is valid`);

}

async function extractToDestination(browserDownloadPath, destinationDir, browserDestinationDirectoryName) {
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
  }

  const existingDirToDelete = path.join(destinationDir, browserDestinationDirectoryName);
  if (fs.existsSync(existingDirToDelete)) {
    console.log(`removing existing directory ${existingDirToDelete}`);
    rimraf.sync(existingDirToDelete);
  }

  console.log(`extracting ${browserDownloadPath} to ${destinationDir}`);

  const decompressor = lzma.createDecompressor();

  const extractPromise = new Promise((resolve, reject) => {
    const stream = fs.createReadStream(browserDownloadPath)
      .pipe(decompressor)
      .pipe(
        tar.x({
          cwd: destinationDir
        })
      );
    stream.on('close', resolve);
    stream.on('error', reject);
  });

  await extractPromise;
}

main();