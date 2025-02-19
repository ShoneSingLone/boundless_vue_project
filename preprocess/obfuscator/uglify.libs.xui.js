const { fs, path, _n } = require("../preprocess.utils");
const { gzip } = require('./gzip');
const { getDiffFiles, uglify } = require("./uglify");

async function handle_common_libs() {
    const FOLDER_PATH = path.resolve(__dirname, "../../static_vue2/common/libs");
    const ZIP_PATH_LATEST = path.resolve(__dirname, "zips/common_libs_latest.zip");
    const ZIP_PATH_NEW = path.resolve(__dirname, "zips/common_libs.zip");

    const DIFF_FILES = await getDiffFiles({ FOLDER_PATH, ZIP_PATH_LATEST, ZIP_PATH_NEW });

    return Promise.all(_n.map(DIFF_FILES, async filePathName => {
        const isNeedUgliy = /(.js|.ts)$/.test(filePathName) && !filePathName.split(path.sep).includes("min");
        if (isNeedUgliy) {
            await uglify(filePathName, filePathName.replace(['common', 'libs'].join(path.sep), ['common', 'libs', 'min'].join(path.sep)));
        }
    }));
}

async function handle_ui_x() {
    const FOLDER_PATH = path.resolve(__dirname, "../../static_vue2/common/ui-x");
    const ZIP_PATH_LATEST = path.resolve(__dirname, "zips/common_ui_x_latest.zip");
    const ZIP_PATH_NEW = path.resolve(__dirname, "zips/common_ui_x.zip");

    const DIFF_FILES = await getDiffFiles({ FOLDER_PATH, ZIP_PATH_LATEST, ZIP_PATH_NEW });

    for (const filePathName of DIFF_FILES) {
        if (/.gz$/.test(filePathName)) {
            continue;
        } else {
            /* 大量 .vue文件，目前只需要压缩 */
            await gzip(filePathName, filePathName + ".gz");
        }
    }
}
// 

exports.handle_common_libs = handle_common_libs;
exports.handle_ui_x = handle_ui_x;