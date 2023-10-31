const fs = require("fs");
const path = require("path");
const ALL_I18N_CONTENT = require(path.resolve(__dirname, "./all_i18n.js"));
const LANGUAGE_FILE_ORDER = ["zh-CN", "en-US"];

LANGUAGE_FILE_ORDER.forEach((fileName, index) => {
	const targetContent = Object.keys(ALL_I18N_CONTENT).reduce(
		(_content, prop) => {
			_content[prop] = ALL_I18N_CONTENT[prop][index];
			return _content;
		},
		{}
	);
	const content = JSON.stringify(targetContent);
	fs.writeFileSync(
		path.resolve(__dirname, `../../static_assets/i18n/${fileName}.js`),
		`window.i18n.options = ${content}`
	);
});
