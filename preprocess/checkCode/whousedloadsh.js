function findLodashUsage(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lodashUsage = fileContent.match(/_\.\w+/g);
    return lodashUsage || [];
}

function checkDirectory(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const fullPath = path.join(directoryPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            checkDirectory(fullPath);
        } else if (path.extname(fullPath) === '.js') {
            const usages = findLodashUsage(fullPath);
            if (usages.length > 0) {
                console.log(`Lodash usage found in ${fullPath}:`, usages);
            }
        }
    });
}

const directoryToCheck = '/path/to/your/source/code';
checkDirectory(directoryToCheck);