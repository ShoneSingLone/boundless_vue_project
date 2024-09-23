require("./baseConfigs");
const { _n } = require("@ventose/utils-node");
const puppeteer = require("puppeteer");
const pathD = _n.getPathD(__dirname);
const {
	URL,
	username,
	userpwd,
	userId,
	pwdId,
	submitId
} = require("d:/privateConfigs_n2one_azure.js");

async function main(currentSiteName) {
	// await runServer();
	global.CurrentSiteName = currentSiteName;

	const browser = await puppeteer.launch({
		ignoreHTTPSErrors: true,
		devtools: true,
		defaultViewport: {
			width: 1920,
			height: 1080
		}
	});
	const page = (await browser.pages())[0];
	await page.setRequestInterception(true);

	addPageListenr.shouldUpdateRequestHandler = true;
	addPageListenr(page);

	try {
		/* 模拟输入用户名密码 点击登录按钮 */
		// await page.goto("http://localhost:3000");
		await page.goto(URL);
		await page.waitForSelector(userId);
		await page.waitForSelector(pwdId);
		await page.waitForTimeout(500);
		page.type(userId, username);
		await page.waitForTimeout(500);
		page.type(pwdId, userpwd);
		await page.waitForTimeout(500);
		page.click(submitId);
		await page.waitForTimeout(500);
		await page.waitForTimeout(5000 * 1);
		// await page.goto("https://console.811rack36.com/azure/?agencyId=a3f748bc10c642c0aaa37332c0b00d27&region=AWS&locale=zh-cn#/console/serviceDirectory/networkCfg/firewall");
	} catch (error) {
		console.log("🚀:", "模拟输入失败");
	}
}

function addPageListenr(page) {
	page.on("load", async event => {
		/* 开发模式 */
		await page.evaluate(isDev => {
			if (isDev) {
				localStorage.CurrentIsDevModel = "CurrentIsDevModel";
			}
		}, process.argv[2]);
	});
	/*
	 * 在控制台打印
	 * console.info(`{"shouldUpdateRequestHandler":true}`)
	 * 可以重新加载puppeteer改动的代码
	 */
	console.info(`{"shouldUpdateRequestHandler":true}`);
	page.on("console", msg => {
		let infoString = msg.text();
		let type = msg.type();
		if (type === "info" && infoString.startsWith(`{`)) {
			let info = null;
			try {
				info = JSON.parse(infoString);
			} catch (error) {
				console.error(`msg-info:error=>${infoString}`);
			}
			console.log("msg-info", info);
			if (info) {
				if (info.shouldUpdateRequestHandler) {
					addPageListenr.shouldUpdateRequestHandler = true;
				}
			}
		}
	});

	page.on("request", async req => {
		const handlerPath = pathD("./handler.js");

		if (addPageListenr.shouldUpdateRequestHandler) {
			delete require.cache[handlerPath];
			addPageListenr.shouldUpdateRequestHandler = false;
		}
		const { handleRequest } = require(handlerPath);
		const isContinue = await handleRequest(req);
		if (isContinue) {
			await req.continue();
		}
	});
}

main("aws");
