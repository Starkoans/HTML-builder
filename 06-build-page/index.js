const path = require('node:path');
const fs = require('node:fs/promises');
const { mergeStyles } = require('../05-merge-styles/index.js');
const { copyDir } = require('../04-copy-directory/index.js');

const projectDistPath = path.join(__dirname, 'project-dist');

(async function () {
    try {
         //Создаем папку с именем project-dist

    await fs.mkdir(projectDistPath, { recursive: true });

    //читаем template.html
    let template = await fs.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf-8' });

    //ищем все имена тегов
    const tagRegex = /\{\{[\s\S]*?\}\}/g;
    const tags = template.match(tagRegex);

    //Заменяем теги содержимым файлов компонентов
    for (const tag of tags) {
        const tagName = tag.slice(2, -2);
        const tagComponentPath = path.join(__dirname, `components/${tagName}.html`);
        const tagComponent = await fs.readFile(tagComponentPath, { encoding: 'utf-8' });
        template = template.replace(tag, tagComponent);
    }

    //записываем измененный шаблон в index.html файл в project-dist папке
    await fs.writeFile(path.join(projectDistPath, 'index.html'), template, { encoding: 'utf-8' });

    const stylesDir = path.join(__dirname, 'styles');
    const bundleFilePath = path.join(projectDistPath, 'style.css');

    mergeStyles(stylesDir, bundleFilePath);

    const assetsDirSrc = path.join(__dirname, 'assets');
    const assetsDirDest = path.join(projectDistPath, 'assets');
    
    copyDir(assetsDirSrc, assetsDirDest);
    
    } catch (error) {
        console.log('Build page error:', error)
    }

   
})()