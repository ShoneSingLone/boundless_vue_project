const UglifyJS = require("uglify-js");
const { fs, path, _n } = require("../preprocess.utils");
const { gzip } = require('./gzip');

async function uglify(inputPath, outputPath) {
    console.log("🚀 ~ i:", inputPath);
    const code = fs.readFileSync(inputPath, "utf8");
    const result = UglifyJS.minify(code);

    if (result.error) {
        console.error("压缩出错:", result.error);
    } else {
        await _n.asyncWriteFile(outputPath, result.code);
        console.log("压缩成功");
    }
    gzip(outputPath, outputPath + ".gz");
}

async function main(params) {

    const [, files] = await _n.asyncAllDirAndFile([
        path.resolve(__dirname, "../../static_vue2/common/libs")
    ]);
    _n.each(files, async filePathName => {
        const isNeedUgliy = /(.js|.ts)$/.test(filePathName) && !filePathName.split(path.sep).includes("min");
        if (isNeedUgliy) {
            await uglify(filePathName, filePathName.replace(['common', 'libs'].join(path.sep), ['common', 'libs', 'min'].join(path.sep)));
        }
    });
}

main();


async function sub(params) {
    const [, files] = await _n.asyncAllDirAndFile([
        path.resolve(__dirname, "../../static_vue2/common/ui-x")
    ]);

    for (const filePathName of files) {
        await gzip(filePathName, filePathName + ".gz");
    }
}