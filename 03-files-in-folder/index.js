const { readdir, stat } = require('node:fs/promises');
const path = require('path');

(async function () {
    const dirPath = path.join(__dirname, 'secret-folder')
    try {
        const files = (await readdir(dirPath, { withFileTypes: true })).filter((dirnt) => dirnt.isFile());
        for (const file of files) {
            const filePath = path.join(dirPath, file.name);

            const filename = path.basename(filePath, path.extname(filePath));
            const extension = path.extname(filePath);

            const stats = await stat(filePath);
            console.log(`${filename} - ${extension.slice(1)} - ${stats.size}b`);
        }
    } catch (err) {
        console.error(err);
    }
})()