const fs = require('fs');
const path = require('path');
const { exiftool } = require('exiftool-vendored');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegStatic.path);

// Function to encode video and modify metadata, returns a Promise
function processFile(filePath) {
    return new Promise((resolve, reject) => {
        const fileName = path.basename(filePath, path.extname(filePath));
        const outputPath = path.join(path.dirname(filePath), 'converted', `${fileName}.mp4`);

        // Ensure output directory exists
        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }

        // Use fluent-ffmpeg to encode video
        ffmpeg(filePath)
            .videoCodec('libx265')
            .addOption('-crf', '25')
            .audioCodec('copy')
            .outputOptions('-tag:v', 'hvc1')
            .output(outputPath)
            .on('end', async () => {
                console.log(`Encoded ${filePath} to ${outputPath}`);
                
                // Copy metadata using exiftool
                try {
                    const tags = await exiftool.read(filePath);
                    const writeTags = {
                        CreationDate: tags.CreationDate,
                        CreateDate: tags.CreateDate,
                        MediaCreateDate: tags.MediaCreateDate,
                        TrackCreateDate: tags.TrackCreateDate,
                        GPSCoordinates: tags.GPSCoordinates,
                        GPSPosition: tags.GPSPosition,
                        GPSLatitude: tags.GPSLatitude,
                        GPSLongitude: tags.GPSLongitude,
                        Make: tags.Make,
                        Model: tags.Model,
                        LensModel: tags.LensModel,
                        CameraFocalLength35mmEquivalent: tags.CameraFocalLength35mmEquivalent
                    };
                    await exiftool.write(outputPath, writeTags);
                    console.log(`Metadata written to ${outputPath}`);
                    resolve();
                } catch (err) {
                    console.error('Failed to write metadata:', err);
                    reject(err);
                }
            })
            .on('error', (err) => {
                console.error(`Failed to process ${filePath}:`, err);
                reject(err);
            })
            .run();
    });
}

// Process files in the current directory one at a time
async function processFilesSequentially() {
    const files = fs.readdirSync(process.cwd());
    for (const file of files) {
        const filePath = path.join(process.cwd(), file);
        if (fs.statSync(filePath).isFile()) {
            try {
                await processFile(filePath);
            } catch (err) {
                console.error('Error processing file:', err);
            }
        }
    }
}

processFilesSequentially().then(() => {
    console.log('All files processed.');
    exiftool.end();
}).catch(err => {
    console.error('Error during processing:', err);
    exiftool.end();
});