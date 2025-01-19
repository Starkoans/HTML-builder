const fs = require('node:fs/promises');
const path = require('node:path');

async function mergeStyles(stylesDir, bundleFilePath) {
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
    
        await fs.writeFile(bundleFilePath, mergedStyles, 'utf-8');

    } catch (error) {
        console.log(error)
    }

}

const stylesDir = path.join(__dirname, 'styles');
const projectDistDir = path.join(__dirname, 'project-dist');
const bundleFilePath = path.join(projectDistDir, 'bundle.css');

mergeStyles(stylesDir,bundleFilePath);

module.exports = {mergeStyles};