const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function gzip(inputFilePath, outputFilePath) {

    // 创建可读流来读取输入文件
    const readStream = fs.createReadStream(inputFilePath);
    // 创建可写流来写入压缩后的文件
    const writeStream = fs.createWriteStream(outputFilePath);
    // 创建 Gzip 转换流
    const gzip = zlib.createGzip();

    // 通过管道将读取的文件数据通过 Gzip 流进行压缩，并写入到输出文件中
    readStream.pipe(gzip).pipe(writeStream);

    // 监听可写流的 'finish' 事件，当压缩完成时触发
    writeStream.on('finish', () => {
        console.log('文件压缩完成，压缩后的文件为: ', outputFilePath);
    });

    // 监听错误事件，当读取、压缩或写入过程中出现错误时触发
    readStream.on('error', (err) => {
        console.error('读取文件时出错: ', err);
    });

    gzip.on('error', (err) => {
        console.error('Gzip 压缩时出错: ', err);
    });

    writeStream.on('error', (err) => {
        console.error('写入文件时出错: ', err);
    });

}


function main() {
    [
        'common/libs/VueRouter.vue',
        'common/libs/toastui-editor-all.js',
        'common/libs/vue.min.js',
        'common/libs/jquery/jquery-3.7.0.min.js',
        'common/libs/min/seed.js',
        'common/libs/lodash.min.js'
    ].forEach((input) => {
        const inputFilePath = path.resolve(__dirname, `../../static_vue2/${input}`);
        const outputFilePath = path.resolve(__dirname, `../../static_vue2/${input}.gz`);
        gzip(inputFilePath, outputFilePath);
    });
}

exports.gzip = gzip;