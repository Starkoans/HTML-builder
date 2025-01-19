const fs  = require('node:fs/promises');
const path = require('node:path');

async function copyDir(srcDirPath, destDirPath) {
    try {
        await fs.mkdir(destDirPath, { recursive: true });

        const items = await fs.readdir(srcDirPath, { withFileTypes: true });

        for (const item of items) {
            const srcItem = path.join(srcDirPath, item.name);
            const destItem = path.join(destDirPath, item.name);

            if (item.isDirectory()) {
                await copyDir(srcItem, destItem);
            } else {
                await fs.copyFile(srcItem, destItem);
            }
        }
    } catch (error) {
        console.error('Error copying directory:', error);
    }
}

const srcDirPath = path.join(__dirname, 'files');
const destDirPath = path.join(__dirname, 'files-copy');

copyDir(srcDirPath, destDirPath);

module.exports = { copyDir };