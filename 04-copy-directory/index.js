const { copyFile, readdir, mkdir } = require('node:fs/promises');
const path = require('node:path');

async function copyDir() {
    try {
        const srcDirPath = path.join(__dirname, 'files');
        const destDirPath = path.join(__dirname, 'files-copy');
        
        await mkdir(destDirPath, { recursive: true });

        const filesToCopy = await readdir(srcDirPath);

        for (const file of filesToCopy) {
            copyFile(path.join(srcDirPath, file), path.join(destDirPath, file));
        }
    } catch (error) {
        console.log(error)
    }

}

copyDir();