#!/usr/bin/env node

// deletes all raw files if there is not a corresponding JPG

const rawRegex = /^(.*)\.(arw|raf|raw)$/i;
const jpgRegex = /^(.*)\.(jpg|jpeg)$/i;

const fs = require('fs');

const delayPromise = (ms = 500) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const getFilenameWithoutJpgExtension = (filename) => {
    const match = jpgRegex.exec(filename);
    if (match && match[1]) {
        const filenameWithoutExtension = match[1];
        return filenameWithoutExtension;
    }
    return null;
}

const deleteFiles = async (filesToDelete) => {
    for (let i = 0; i < filesToDelete.length; i++) {
        const filename = filesToDelete[i];
        console.log('delete ', filename);
        try {
            fs.unlinkSync(filename);
        } catch (e) {
        }
    }
};

const getFilesToDelete = ((filesToSaveSet) => {
    const filesToDelete = fs.readdirSync('.')
        .map((filename) => {
            const match = rawRegex.exec(filename);
            if (match && match[1] && !filesToSaveSet.has(match[1])) {
                return filename;
            }
            return null;
        })
        .filter((filename) => !!filename);
    return filesToDelete;
});

const go = async function () {

    const filesToSave = fs.readdirSync('.')
        .map((filename) => {
            const filenameWithoutExtensionOrNull = getFilenameWithoutJpgExtension(filename);
            return filenameWithoutExtensionOrNull;
        })
        .filter((filename) => !!filename);

    filesToSave.forEach((filename) => console.log('save', filename));

    const filesToSaveSet = new Set([...filesToSave]);

    let filesToDelete;

    filesToDelete = getFilesToDelete(filesToSaveSet);
    await deleteFiles(filesToDelete, 10, 100);
    console.log(`deleted ${filesToDelete.length} files`);
    console.log('done');
};

go();
