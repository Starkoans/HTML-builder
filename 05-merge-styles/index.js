const fs = require('node:fs/promises');
const path = require('node:path');

const stylesDir = path.join(__dirname, 'styles');
const projectDist = path.join(__dirname, 'project-dist');
const bundlePath = path.join(projectDist, 'bundle.css');

(async function () {
    try {

        const files = await fs.readdir(stylesDir, { withFileTypes: true });
        const cssFiles = files.filter((file) => path.extname(file.name) === '.css');
    
    
        const arr = [];
        for (const file of cssFiles) {
            const filePath = path.join(stylesDir, file.name);
            const fileData = await fs.readFile(filePath, 'utf-8');
            arr.push(fileData);
        }
    
        const mergedStyles = arr.join('\n');
    
        await fs.writeFile(bundlePath, mergedStyles, 'utf-8');
    } catch (error) {
        console.log(error)
    }

})()
