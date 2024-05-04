#!/usr/bin/env node

const fs = require('fs');
const fsPromises = fs.promises
const path = require('path');
const { exiftool } = require('exiftool-vendored');

const validExtensions = ['.jpg', '.jpeg', '.heic', '.png', '.gif', '.tiff', '.mov', '.mp4', '.mkv'];

const isValidFile = (filename) => {
    return validExtensions.includes(path.extname(filename).toLowerCase());
};

function toExifDateString(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');
    let second = date.getSeconds().toString().padStart(2, '0');
    let millisecond = date.getMilliseconds().toString().padStart(3, '0');
    let timezoneOffset = -date.getTimezoneOffset();
    let offsetHours = Math.floor(Math.abs(timezoneOffset) / 60).toString().padStart(2, '0');
    let offsetMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, '0');
    let offsetSign = timezoneOffset > 0 ? '+' : '-';

    return `${year}:${month}:${day} ${hour}:${minute}:${second}.${millisecond}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

async function getTakenDate(filePath) {
    try {
        const metadata = await exiftool.read(filePath);
        const takenDate = metadata.DateTimeOriginal || metadata.GPSDateTime || metadata.CreateDate ||
        metadata.CreationDate || metadata.MediaCreateDate || metadata.TrackCreateDate;
        const birthTime = (await fsPromises.stat(filePath)).birthtime;
        const birthTimeStr = toExifDateString(birthTime);
        
        // console.log(`file ${filePath} has takenDate ${takenDate} and birthTime ${birthTimeStr}`)
        if (takenDate && !metadata.CreateDate) {
            console.log(`  trying to compensate for missing CreateDate for ${filePath} from metadata takenDate as ${takenDate}`)
            await exiftool.write(filePath, { CreateDate: birthTimeStr });
        }
        else if (!takenDate) {
            console.log(`  trying to compensate for missing CreateDate for ${filePath} from birthTime as ${birthTimeStr}`)
            await exiftool.write(filePath, { CreateDate: birthTimeStr });
        }

        return takenDate || birthTime;
    } catch (error) {
        console.error(`failed to read metadata for ${filePath}:`, error);
        return (await fsPromises.stat(filePath)).birthtime;
    }
}

async function moveAndRenameFile(filePath, takenDate) {
    const date = new Date(takenDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const baseDir = path.dirname(filePath);
    const directoryPath = path.join(baseDir, 'sorted', year.toString(), month);

    await fsPromises.mkdir(directoryPath, { recursive: true });

    const newFilename = `${date.toISOString().split('T')[0]} ${path.basename(filePath)}`;    const newFilePath = path.join(directoryPath, newFilename);
    await fsPromises.rename(filePath, newFilePath);

    console.log(`moved and renamed ${filePath} to ${newFilePath}`);
}

async function processFiles(directoryPath) {
    const files = await fsPromises.readdir(directoryPath);

    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        if (isValidFile(file) && fs.statSync(filePath).isFile()) {
            const takenDate = await getTakenDate(filePath);
            await moveAndRenameFile(filePath, takenDate);
        }
    }

    console.log('all files processed.');
    exiftool.end();
}

// Example usage, replace `directoryPath` with the path where the files are stored
const directoryPath = process.cwd();
processFiles(directoryPath);
