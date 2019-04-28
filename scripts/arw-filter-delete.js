// deletes all ARW if there is not a corresponding JPG

const arwRegex = /(.*?)\.(arw)$/ig
const jpgRegex = /(.*?)\.(jpg|jpeg)$/ig

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

const deleteFiles = async (filesToDelete, delay = 50, postDelay = 1000) => {
    for(let i = 0; i < filesToDelete.length; i++) {
        const filename = filesToDelete[i];
        console.log('delete ', filesToDelete[i]);
        try {
            await fs.promises.unlink(filename);
        } catch(e) {}
        await delayPromise(delay);
    }
    await delayPromise(postDelay);
};

const getFilesToDelete = ((filesToSaveSet) => {
    const filesToDelete = fs.readdirSync('.')
        .map((filename) => {
            const match = arwRegex.exec(filename);
            if (match && match[1] && !filesToSaveSet.has(match[1])) {
                return filename;
            }
            return null;
        })
        .filter((filename) => !!filename);
    return filesToDelete;
})

const go = async function() {

    const filesToSave = fs.readdirSync('.')
        .map((filename) => {
            const filenameWithoutExtensionOrNull = getFilenameWithoutJpgExtension(filename);
            return filenameWithoutExtensionOrNull;
        })
        .filter((filename) => !!filename);

    filesToSave.forEach((filename) => console.log('save', filename));

    const filesToSaveSet = new Set([...filesToSave]);

    let filesToDelete;

    // delete the files 10 times, because for some reason, sometimes deletes don't go through
    for (let i = 0; i < 10; i++) {
        console.log('pass', i);
        filesToDelete = getFilesToDelete(filesToSaveSet);
        await deleteFiles(filesToDelete, 10, 100);
    }

    console.log('done');
};

go();
