const UglifyJS = require("uglify-js");
const { fs, path, _n } = require("../preprocess.utils");
const { gzip } = require('./gzip');
var adm_zip = require("adm-zip");
const { compareZipFiles } = require("../deploy/compareZipFiles");

async function uglify(inputPath, outputPath) {
    console.log("🚀 ~ i:", inputPath);
    const code = fs.readFileSync(inputPath, "utf8");
    const result = UglifyJS.minify(code);

    if (result.error) {
        console.error("压缩出错:", result.error);
    } else {
        await _n.asyncWriteFile(outputPath, result.code);
    }
    gzip(outputPath, outputPath + ".gz");
}


async function archive_files(SOURCE_FOLDER, TARGET_PATH) {
    const AdmZip = new adm_zip();
    const ZIPS_FOLDER = path.resolve(__dirname, "zips");
    const fnFilterFiles = () => true;
    AdmZip.addLocalFolder(SOURCE_FOLDER, "", fnFilterFiles);
    await _n.asyncSafeMakeDir(ZIPS_FOLDER);
    AdmZip.writeZip(TARGET_PATH);
}

async function getDiffFiles({ FOLDER_PATH, ZIP_PATH_LATEST, ZIP_PATH_NEW }) {
    /* 压缩所有文件 */
    await archive_files(FOLDER_PATH, ZIP_PATH_NEW);
    const IS_LATEST_ZIP_FILE_EXISTS = fs.existsSync(ZIP_PATH_LATEST);
    let [, diff_files] = await _n.asyncAllDirAndFile([FOLDER_PATH]);
    if (IS_LATEST_ZIP_FILE_EXISTS) {
        diff_files = await compareZipFiles(ZIP_PATH_NEW, ZIP_PATH_LATEST);
        diff_files = diff_files.map(f => path.resolve(FOLDER_PATH, f));
    }

    if (diff_files.length) {
        /* 如果没有变化就保持 */
        fs.renameSync(ZIP_PATH_NEW, ZIP_PATH_LATEST);
    }
    return diff_files;
}

exports.getDiffFiles = getDiffFiles;
exports.uglify = uglify;

