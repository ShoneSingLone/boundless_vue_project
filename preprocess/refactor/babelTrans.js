const { fs, path, _, _n, VueLoader } = require("../preprocess.utils");
const { processFile } = require('./babel_plugin/common.utils');
async function replaceOptionalChaining({
    // inputPath = path.resolve(__dirname, './test_input'),
    inputPath = path.resolve(__dirname, '../../static_vue2/common'),
    output_dir = path.resolve(__dirname, './test_output'),
} = {}) {
    try {
        console.log('正在创建输出目录:', output_dir);
        await fs.promises.mkdir(output_dir, { recursive: true });
        await processFile(inputPath, output_dir);
    } catch (error) {
        console.error('文件处理失败：', error.stack);
    }
}

module.exports = replaceOptionalChaining;

replaceOptionalChaining();