const { fs, path, _, _n, VueLoader } = require("../../preprocess.utils");
const babel = require('@babel/core');
const { optionalChainToValPlugin } = require('../babel_plugin/replaceOptionalChaining');
const { compileTemplate } = require('@vue/compiler-sfc');

const BABEL_OPTIONS = {
    plugins: [optionalChainToValPlugin],
    retainLines: true
};

// 转换单个文件的函数
async function transformFile(filePath) {
    const origin_code_string = fs.readFileSync(filePath, 'utf8');
    let scriptString, templateString;
    if (path.extname(filePath) === '.vue') {
        // 判断是否为Vue单文件
        let { templateSourceCode, scritpSourceCode, styleSourceCode } = VueLoader(origin_code_string);
        templateSourceCode = templateSourceCode.replace(/\\`/g, '`');
        let scriptRes = scritpSourceCode;
        // 处理script部分的代码
        if (scritpSourceCode) {
            scriptRes = await babel.transformAsync(scritpSourceCode, BABEL_OPTIONS);
        }
        // if (templateSourceCode) {
        //     // 处理template部分的代码
        //     /* templateSourceCode是Vue 的template 需要转换为js字符串，再用babel处理，再转换为template字符串 */
        //     // 使用Vue SFC编译器处理template
        //     const compiledTemplate = compileTemplate({
        //         source: templateSourceCode,
        //         id: path.basename(filePath) + Date.now()
        //     });
        //     // 将编译后的render函数转换为字符串进行babel处理
        //     let renderFunctionString = compiledTemplate.code;
        //     renderFunctionString = renderFunctionString.replace(/\\`/g, '`');
        //     console.log("🚀 ~ transformFile ~ renderFunctionString:", renderFunctionString);
        //     const transformedTemplate = await babel.transformAsync(renderFunctionString, BABEL_OPTIONS);
        //     const code = transformedTemplate.code;
        //     console.log("🚀 ~ transformFile ~ templateString:", code);
        // }
        scriptString = [templateSourceCode && `<template>${templateSourceCode}</template>`, scriptRes.code && `<script lang="ts">${scriptRes.code}</script>`, styleSourceCode && `<style lang="less">${styleSourceCode}</style>`].filter(Boolean).join("\n");
    } else {
        const res = await babel.transformAsync(origin_code_string, BABEL_OPTIONS);
        scriptString = res.code;
    }

    return scriptString;

}


const processFile = async (input_path, output_dir) => {
    const stat = await fs.promises.stat(input_path);
    const isDirectory = stat.isDirectory();

    if (isDirectory) {
        console.log('正在读取输入目录:', input_path);
        const dirname = path.basename(input_path);
        const _sub_outpust_dir = path.join(output_dir, dirname);
        const files = await fs.promises.readdir(input_path);
        await Promise.all(files.map(file => processFile(path.join(input_path, file), _sub_outpust_dir)));
    } else {
        try {
            const ext = path.extname(input_path);

            if (['.vue', '.js', '.ts'].includes(ext)) {
                console.log('\n正在处理文件:', input_path);
            } else {
                console.log('\n跳过非目标文件:', input_path);
                return;
            }

            const sourceCodeString = await transformFile(input_path);
            /* 确保输出目录存在 */
            await _n.asyncSafeMakeDir(output_dir);
            const output_path = path.join(output_dir, path.basename(input_path));
            await fs.promises.writeFile(output_path, sourceCodeString, 'utf-8');
            console.log('文件写入成功:', output_dir);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] 处理文件失败: ${input_path}\n`, error.stack);
            throw error;
        }
    };
    console.log('\n转换完成，输出目录：', output_dir);
};

exports.processFile = processFile;
