const { path, _, fs } = require("../preprocess.utils");
const [, , , isMo] = process.argv;
console.log("🚀 ~ isMo:", isMo);

/* 对应语言文件 */
const LANGUAGE_FILE_ORDER = ["zh-CN", "en-US"];
exports.LANGUAGE_FILE_ORDER = LANGUAGE_FILE_ORDER;

const matchReg = /i18n(?<manySuffix>Many)?\(\s*(["'`])((?:[^\\]|\\.|\n)*?)\2\s*(?:,\s*\{[\s\S]*?\}\s*)?\)/gs;
exports.matchReg = matchReg;


function ALL_I18N_CONTENT_UPDATE(APP_NAME, content) {
	console.log("🚀 ~ APP_NAME:", APP_NAME);
	const project_i18n_dir_path = path.resolve(__dirname, `../../static_vue2/business_${APP_NAME}/i18n`);
	/* 读取对应项目i18n文件夹下文件 */
	const i18n_dir = fs.readdirSync(project_i18n_dir_path);
	/* 项目的i18n文件，前缀是all.i18n */
	const i18n_file_path = _.find(i18n_dir, (file) => /all.i18n/.test(file));
	console.log("🚀 ~ ALL_I18N_CONTENT_UPDATE ~ i18n_file_path:", i18n_file_path);
	fs.writeFileSync(path.resolve(project_i18n_dir_path, i18n_file_path), content);
};
exports.ALL_I18N_CONTENT_UPDATE = ALL_I18N_CONTENT_UPDATE;

function ALL_I18N_CONTENT_IN(APP_NAME) {
	console.log("🚀 ~ APP_NAME:", APP_NAME);
	const project_i18n_dir_path = path.resolve(__dirname, `../../static_vue2/business_${APP_NAME}/i18n`);
	/* 读取对应项目i18n文件夹下文件 */
	const i18n_dir = fs.readdirSync(project_i18n_dir_path);
	/* 项目的i18n文件，前缀是all.i18n */
	const i18n_file_path = _.find(i18n_dir, (file) => /all.i18n/.test(file));

	/* 通用的 + 项目自定义 */
	let I18N_CONTENT = _.merge(require(path.resolve(__dirname, "./i18n.common.js")), require(path.resolve(project_i18n_dir_path, i18n_file_path)));

	/* 其他默认文件 */
	/* mo */
	if (i18n_file_path.includes(".mo.")) {
		let I18N_COMMON_MO = require(path.resolve(__dirname, "./i18n.common.mo.js"));
		I18N_CONTENT = _.merge(I18N_COMMON_MO, I18N_CONTENT);
	}

	return I18N_CONTENT;
};

exports.ALL_I18N_CONTENT_IN = ALL_I18N_CONTENT_IN;
function ALL_I18N_USED_IN(APP_NAME) {
	console.log("🚀 ~ APP_NAME:", APP_NAME);
	const project_i18n_dir_path = path.resolve(__dirname, `../../static_vue2/business_${APP_NAME}/i18n/i18n.all.used.in.project.json`);
	/* 读取对应项目i18n文件夹下文件 */
	const i18n_dir = fs.readFileSync(project_i18n_dir_path);
	return JSON.parse(i18n_dir);
};
exports.ALL_I18N_USED_IN = ALL_I18N_USED_IN;
