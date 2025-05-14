const { fs, path, _, _n, VueLoader } = require("../preprocess.utils");
const { DEEPSEEK_AUTH_TOKEN } = require("../../../PRIVATE_CONFIGS.js");
const axios = require("axios");

const inputPath = path.resolve(__dirname, '../../static_vue2/business_internet_portal/documents');

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
    const [, files] = await _n.asyncAllDirAndFile([inputPath]);
    files.filter(file => file.endsWith('.html')).forEach(async filePath => {
        console.log("🚀 正在处理:", filePath);
        try {
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
                        content: `这是一份html文件，将源码中的中文转换为英文，仅返回转换后的文本：${fileContent}`
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
            console.error(filePath);
            console.error('文件处理失败：', error.stack);
        }

    });
}

module.exports = replaceOptionalChaining;

replaceOptionalChaining();