const { fs, path, _, _n } = require("../preprocess.utils");
const axios = require("axios");
const https = require("https");
const dataConfigs = require("../../../privateConfigs_MoTokenDataCofnigs");
const [userInfoCconfigs] = process.argv.slice(2);
const currentConfigs = dataConfigs[userInfoCconfigs];
console.log(`🚀 get mo ${userInfoCconfigs} token `, currentConfigs);

if (!currentConfigs) {
    throw new Error("没有对应登录信息");
}
async function asyncGetXAuthToken() {
    const url = currentConfigs.url || dataConfigs.url;
    let xAuthToken;
    try {
        const axiosOptions = {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            method: "post",
            url,
            data: currentConfigs
        };

		try {
			const res = await axios(axiosOptions);
			const headers = res.headers;
			xAuthToken = headers["x-subject-token"];
		} catch (error) {
			console.log("🚀 ~ file: Interception.proxy.js ~ line 66 ~ asyncGetXAuthToken ~ error", error);
		}
		if (!xAuthToken) {
			throw new Error("获取token出错，可能是网络不通，vpn有问题");
		} else {
			console.log("🚀xAuthToken:\n", xAuthToken);
			fs.writeFileSync("./new_token.txt", xAuthToken);
		}
	} catch (error) {
		console.error(error);
	} finally {
		return xAuthToken || "no-X-Auth-Token";
	}
}

asyncGetXAuthToken();
