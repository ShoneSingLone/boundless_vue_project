/* node i18n.scan_all_used_word.js yapi
 * 扫描项目yapi用到的所有i18n，并保存到business_yapi/i18n/i18n.all.used.in.project.json中
 */
const { path, _, _n, fs, $val } = require("../preprocess.utils");
const axios = require("axios");
const { matchReg } = require("./i18n.utils");


const pathD = _n.getPathD(__dirname);

const [APP_NAME] = process.argv.slice(2);

const { ALL_I18N_CONTENT_IN } = require("./i18n.utils");
const allI18n = ALL_I18N_CONTENT_IN(APP_NAME);
let NEED_TO_TRANS = {};
const sourceCodeDir = pathD(`../../static_vue2/business_${APP_NAME}`);

async function processFile(fileurl) {
	try {
		const content = await fs.promises.readFile(fileurl, "utf-8");
		const replaceMatched = (match, manySuffix, quote, word) => {
			console.log("🚀 ~ replaceMatched ~ match:", match);
			/* el组件库的不用提取 */
			if (!/^el\./.test(word)) {
				NEED_TO_TRANS[word] = true;
			}
			return match;
		};
		String(content).replace(matchReg, replaceMatched);
	} catch (error) {
		console.error(`Error processing file ${fileurl}:`, error.message);
	}
}


(async () => {
	let [, files] = await _n.asyncAllDirAndFile([
		pathD(`../../static_vue2/common`),
		sourceCodeDir
	]);
	files = files.filter((file) => {
		return [`.js`, ".html", ".vue"].includes(path.extname(file));
	});
	let file;
	while ((file = files.pop())) {

		if (file.includes("opts")) {
			debugger;
			continue;
		}

		console.log("🚀 ~ files:", file, files.length);
		await processFile(file);
	}
	debugger;
	console.log("🚀 NEED_TO_TRANS:", NEED_TO_TRANS, Object.keys(NEED_TO_TRANS).length);

	const targetCodeDir = pathD(`../../static_vue2/business_${APP_NAME}/i18n/i18n.all.used.in.project.json`);
	let content = await Promise.all(
		_n.map(NEED_TO_TRANS, async (fileurl, prop) => {
			let item = {
				zhCn: $val(allI18n, `${prop}.0`) || prop,
				enUs: $val(allI18n, `${prop}.1`) || "unset_unset_unset_unset_unset_unset"
			};

			if (item.enUs === "unset_unset_unset_unset_unset_unset") {
				const res = await axios({
					url: "http://10.143.133.216:3001/api/i18n/get",
					method: "post",
					data: {
						key: prop
					}
				});
				if (res?.data?.data?.key) {
					item = res?.data?.data;
				}
			}

			const keyvalString = (() => {
				try {
					let a = {};
					a[prop] = [item.zhCn, item.enUs];
					let b = JSON.stringify(a);
					return b.slice(1, b.length - 1);
				} catch (error) {
					return item.zhCn;
				}
			})();

			if (fileurl.length > 1) {
				return `/*\n${fileurl.join("\n")}\n*/\n${keyvalString},`;
			} else {
				return `\n${keyvalString},`;
			}
		})
	);

	content = content.filter(Boolean).join("\n");

	await fs.promises.writeFile(targetCodeDir, `{${content}}`);
})();

