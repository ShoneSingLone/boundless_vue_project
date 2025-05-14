const { fs, path, _, _n, VueLoader } = require("../preprocess.utils");
const { DEEPSEEK_AUTH_TOKEN } = requie("../../../PRIVATE_CONFIGS.js");
const axios = require("axios");

// 添加响应拦截器
axios.interceptors.response.use(response => {
    console.log('收到响应...');
    console.log('响应状态码:', response.status);
    console.log('响应头:', response.headers);
    console.log('响应体:', response.data);
    return response;
}, error => {
    console.error('响应拦截器出错:', error);
    return Promise.reject(error);
});

async function replaceOptionalChaining({ } = {}) {
    const inputPath = path.resolve(__dirname, '../../static_vue2//business_internet_portal//i18n/all.i18n.js');
    const output_dir = path.resolve('./i18n_output');

    try {
        console.log('正在创建输出目录:', output_dir);
        await fs.promises.mkdir(output_dir, { recursive: true });
        const all_i18n = require(inputPath);
        // 后续会逐个处理分块文件

        const chunkSize = 10;
        const entries = Object.entries(all_i18n);

        for (let i = 0; i < entries.length; i += chunkSize) {
            const chunk = entries.slice(i, i + chunkSize);
            const chunkObj = {};

            chunk.forEach(([key, value]) => {
                chunkObj[key] = value;
            });

            const fileName = `i18n_chunk_${Math.floor(i / chunkSize)}.js`;
            const filePath = path.join(output_dir, fileName);

            // Write each chunk to a separate file
            fs.writeFileSync(
                filePath,
                `module.exports = ${JSON.stringify(chunkObj, null, 2)};`
            );
        }
        // Read all files in output directory and convert keys to English snake_case
        const files = fs.readdirSync(output_dir);


        _n.each(files, async file => {
            try {
                const filePath = path.join(output_dir, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                // 请求的 URL
                const url = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

                // 请求头
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DEEPSEEK_AUTH_TOKEN}`
                };

                // 请求体
                const data = {
                    "model": "deepseek-r1-250120",
                    "messages": [
                        {
                            role: "user",
                            content: `将中文转换为简洁的英文蛇形命名（仅返回转换后的文本）：${fileContent}`
                        }]
                };
                try {
                    console.log(data);
                    // 发送 POST 请求
                    const response = await axios.post(url, data, { headers });
                    const { content } = response.data.choices[0].message;
                    fs.writeFileSync(filePath, content);
                } catch (err) {
                    console.error(err);
                }
            } catch (error) {
                console.error(file);
                console.error('文件处理失败：', error.stack);
            }

        });
    } catch (error) {
        console.error('文件处理失败：', error.stack);
    }
}

module.exports = replaceOptionalChaining;

replaceOptionalChaining();