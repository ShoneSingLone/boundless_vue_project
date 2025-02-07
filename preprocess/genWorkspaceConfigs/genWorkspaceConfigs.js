const { fs, path, _, _n } = require("../preprocess.utils");
const targetJson = {
	folders: [
		{
			path: "******"
		}
	],
	settings: {
		"files.exclude": {}
	}
};

(async function () {
	const files = await fs.promises.readdir(path.resolve(__dirname, "../../static_vue2"));
	const _path = path.resolve(__dirname, "../..");
	targetJson.folders[0].path = _path;

	_.each(files, prop => {
		/* 排除 */
		targetJson.settings["files.exclude"][`**/${prop}`] = true;
	});
	targetJson.settings["files.exclude"]["**/common"] = false;

	_.each(files, fileName => {
		const [, _app_name] = fileName.match(/^business_(.*)/) || [];
		if (_app_name) {
			const _targetJson = _.cloneDeep(targetJson);
			_targetJson.settings["files.exclude"][`**/business_${_app_name}`] = false;
			fs.writeFileSync(
				path.resolve(__dirname, `../../vscode.workspace/n2one_${_app_name}.code-workspace`),
				JSON.stringify(_targetJson, null, 4)
			);
		}
	});
})();
