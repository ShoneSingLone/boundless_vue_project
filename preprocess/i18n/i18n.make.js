const { fs, path, _, $val, _n } = require("../preprocess.utils");
const { ALL_I18N_CONTENT_IN, LANGUAGE_FILE_ORDER } = require("./i18n.utils");
const [APP_NAME] = process.argv.slice(2);

const I18N_CONTENT = ALL_I18N_CONTENT_IN(APP_NAME);
const LOG_PROPS_SET = new Set();


try {
	_n.each(LANGUAGE_FILE_ORDER, (file_name_i18n_path, index) => {
		const TARGET_CONTENT = {};
		function TraversalObject(_i18n_content, pre_prop_array = []) {
			_.each(_i18n_content, (obj_or_label_array, prop) => {
				pre_prop_array.push(prop);
				if (_.isPlainObject(obj_or_label_array)) {
					//递归遍历
					TraversalObject(obj_or_label_array, pre_prop_array);
				} else {
					const props = pre_prop_array.join(".");
					LOG_PROPS_SET.add(props);
					const currentLabel = obj_or_label_array[index];
					$val(TARGET_CONTENT, props, currentLabel);
				}
				pre_prop_array.pop();
			});
		}
		TraversalObject(I18N_CONTENT);
		const content = JSON.stringify(TARGET_CONTENT);
		const targetFilePath = `../../static_vue2/business_${APP_NAME}/i18n/${file_name_i18n_path}.js`;
		fs.writeFileSync(
			path.resolve(__dirname, targetFilePath),
			`window.i18n.options = ${content}`
		);
	});
	console.log("🚀count: ", LOG_PROPS_SET.size);
} catch (err) {
	console.log("err", err);
}
