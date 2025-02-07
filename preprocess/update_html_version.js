const { _n, execCmd } = require("./preprocess.utils");
const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const VERSION_NUM = Date.now();
async function getChangedByGitStatus(params) {
	let msgArray = [];
	await execCmd(`git status`, {
		log(msg) {
			msgArray.push(msg);
		}
	});
	const infoArray = msgArray[0].split("\n");
	const diffSet = new Set();
	const sep = "static_vue2";

	let isChangeCommon = false;

	for (const info of infoArray) {
		if (_.includes(info, sep)) {
			const [, business, ...args] = info.split(sep)[1].split("/");
			if ("common" === business) {
				isChangeCommon = true;
				break;
			}
			diffSet.add(business);
		}
	}
	return {
		isChangeCommon,
		diff: Array.from(diffSet)
	};
}

async function removeDebugger(file_path) {
	const [, files] = await _n.asyncAllDirAndFile([file_path]);
	_n.each(files, async i => {
		if (path.extname(i) === ".vue") {
			const content = fs.readFileSync(i, "utf-8");
			if (/debugger/.test(content)) {
				const newContent = content.replace(/debugger;?/g, "");
				fs.writeFileSync(i, newContent, "utf-8");
			}
		}
	});
}

async function updateHtmlVersion(file_path) {
	const htmlString = await fs.promises.readFile(file_path, "utf-8");
	const $html = cheerio.load(htmlString);
	const version = $html("#src-root").attr("data-app-version");
	if (version) {
		$html("#src-root").attr("data-app-version", VERSION_NUM);
		const newHtmlContent = $html.html();
		await fs.promises.writeFile(file_path, newHtmlContent, "utf-8");
		console.log("update_html_version", file_path, VERSION_NUM);
	} else {
		console.log("update_html_version", file_path, "不需要缓存");
	}
}

async function main(params) {
	try {
		let file_path;

		let { isChangeCommon_1, diff: businessChanged_1 } = await getChangedByGitStatus();

		if (!isChangeCommon_1) {
			while ((file_path = businessChanged_1.pop())) {
				const target_path = path.resolve(__dirname, "../static_vue2", file_path);
				await removeDebugger(target_path);
				await execCmd(`prettier --write "${target_path}/**/*.vue"`);
				debugger;
			}
		}

		let { isChangeCommon, diff: businessChanged } = await getChangedByGitStatus();

		const [, files] = await _n.asyncAllDirAndFile([path.resolve(__dirname, "../static_vue2")]);

		while ((file_path = files.pop())) {
			/* 只处理html */
			if (path.extname(file_path) === ".html") {
				const isBusinessChanged = _.some(businessChanged, business =>
					String(file_path).includes(business)
				);
				/* 如果更改了通用文件，则更新每一个html */
				/* 或者更新有文件变动的业务的相关html */
				if (isChangeCommon || isBusinessChanged) {
					await updateHtmlVersion(file_path);
				}
			}
		}

		await execCmd(`prettier --write "**/*.html"`);
	} catch (error) {
		console.log("🚀 ~ main ~ error:", error);
	}
}

main();

exports.update_html_version = updateHtmlVersion;
